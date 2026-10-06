/**
 * "11:00" -> "11 am" (short) or "11:00 am" (long); "23:00" -> "11 pm" / "11:00 pm".
 * Lets the home page print HOURS from lib/business-info.ts instead of retyping them.
 */
export function formatTime(hhmm: string, long = false) {
  const [h, m] = hhmm.split(":").map(Number)
  const suffix = h >= 12 && h < 24 ? "pm" : "am"
  const h12 = h % 12 === 0 ? 12 : h % 12
  const mm = String(m).padStart(2, "0")
  return long || m !== 0 ? `${h12}:${mm} ${suffix}` : `${h12} ${suffix}`
}
