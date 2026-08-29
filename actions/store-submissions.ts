"use server"

import fs from "fs"
import path from "path"

type StorageFailureReason = "ephemeral-filesystem" | "read-only-filesystem" | "write-failed"

type SubmissionStorageResult =
  | { stored: true; location: string }
  | { stored: false; reason: StorageFailureReason; detail: string }

// Vercel serves the deployment from a read-only bundle; only /tmp is writable and
// /tmp is thrown away when the instance is recycled. Writing there would "succeed"
// and still lose the submission, so we refuse to treat this host as storage at all
// rather than discovering the failure from a swallowed exception.
function hasDurableFilesystem(): boolean {
  return !(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NEXT_RUNTIME === "edge")
}

// EROFS is the read-only mount; EACCES/EPERM are the same situation behind a
// different errno depending on the host.
const READ_ONLY_ERROR_CODES = new Set(["EROFS", "EACCES", "EPERM"])

function safeStringify(data: any): string {
  try {
    return JSON.stringify(data)
  } catch {
    return "<unserialisable payload>"
  }
}

// The record-keeping calls hand us the Resend response; the fallback path (email
// could not be sent) does not. That distinction decides whether this write is the
// only copy of the customer's enquiry or merely a convenience.
function emailWasDelivered(data: any): boolean {
  return Boolean(data) && typeof data === "object" && "emailResponse" in data
}

function writeSubmission(type: "contact" | "reservation", data: any): SubmissionStorageResult {
  if (!hasDurableFilesystem()) {
    return {
      stored: false,
      reason: "ephemeral-filesystem",
      detail: "Serverless host has no durable filesystem; no submission store is configured.",
    }
  }

  try {
    const dir = path.join(process.cwd(), "submissions")
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    const timestamp = new Date().toISOString().replace(/:/g, "-")
    const filePath = path.join(dir, `${type}_${timestamp}.json`)

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    return { stored: true, location: filePath }
  } catch (error) {
    const code = (error as NodeJS.ErrnoException)?.code
    return {
      stored: false,
      reason: code && READ_ONLY_ERROR_CODES.has(code) ? "read-only-filesystem" : "write-failed",
      detail: `${code ?? "UNKNOWN"}: ${(error as Error)?.message ?? String(error)}`,
    }
  }
}

/**
 * Best-effort local record of a form submission.
 *
 * Returns an accurate result — it never reports a write that did not happen. When
 * nothing could be stored the full payload is logged so the enquiry is at least
 * recoverable from the runtime log, and if no email went out either, this throws so
 * the caller cannot tell the customer their details were saved.
 */
export async function storeSubmission(
  type: "contact" | "reservation",
  data: any,
): Promise<SubmissionStorageResult> {
  const result = writeSubmission(type, data)
  if (result.stored) {
    return result
  }

  const delivered = emailWasDelivered(data)

  if (delivered) {
    // The email carried the enquiry, so this write was only ever a convenience copy.
    // Record that storage is unconfigured WITHOUT the payload: on a serverless host
    // writeSubmission never succeeds, so logging the body here would dump the
    // customer's name, email and phone into the runtime logs on every successful
    // submission. Diagnostics are not worth standing up a PII store by accident.
    console.warn(`SUBMISSION_NOT_PERSISTED type=${type} reason=${result.reason} (delivered by email)`)
    return result
  }

  // Neither stored nor emailed. This log line is now the only remaining copy of the
  // enquiry, so it carries the payload deliberately — losing a booking outright is
  // the worse failure. Search the runtime logs for SUBMISSION_LOST to recover one.
  console.error(
    `SUBMISSION_LOST type=${type} reason=${result.reason} detail=${result.detail} payload=${safeStringify(data)}`,
  )

  {
    // No email and no storage means the submission is gone. Throwing is what stops
    // the caller's fallback from answering the customer with "your information has
    // been saved" — a claim that would be false.
    throw new Error(
      `Submission could not be delivered or stored (${result.reason}). The customer must not be told it was received.`,
    )
  }

  return result
}
