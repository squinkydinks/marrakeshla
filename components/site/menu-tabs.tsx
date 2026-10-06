"use client"

import { useRef, useState } from "react"
import { MENUS } from "@/lib/menu"

/**
 * Dinner / Drinks / Wine & beer tabs with the two-column carte.
 * Keyboard: Left/Right arrows move between tabs (WAI-ARIA tabs pattern).
 * Prices are intentionally not shown online.
 */
export function MenuTabs() {
  const [active, setActive] = useState(MENUS[0].id)
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  function onKey(e: React.KeyboardEvent, i: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return
    e.preventDefault()
    const n = (i + (e.key === "ArrowRight" ? 1 : MENUS.length - 1)) % MENUS.length
    setActive(MENUS[n].id)
    refs.current[n]?.focus()
  }

  return (
    <>
      <div className="tabs" role="tablist" aria-label="Menus">
        {MENUS.map((m, i) => (
          <button
            key={m.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            className="tab"
            role="tab"
            id={`t-${m.id}`}
            aria-controls={`p-${m.id}`}
            aria-selected={active === m.id}
            tabIndex={active === m.id ? 0 : -1}
            type="button"
            onClick={() => setActive(m.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {m.label}
          </button>
        ))}
      </div>
      {MENUS.map((m) => (
        <div key={m.id} role="tabpanel" id={`p-${m.id}`} aria-labelledby={`t-${m.id}`} hidden={active !== m.id}>
          <div className="carte">
            {m.columns.map((col, ci) => (
              <div className="carte__col" key={ci}>
                {col.map((course) => (
                  <div className="course" key={course.title}>
                    <h3 className="label">{course.title}</h3>
                    {course.items.map((it) => (
                      <div className="dish" key={it.name + (it.style ?? "")}>
                        <div className="dish__row">
                          <span className="dish__name">
                            {it.name}
                            {it.style ? <> <i>{it.style}</i></> : null}
                          </span>
                        </div>
                        {it.note ? <p className="dish__note">{it.note}</p> : null}
                      </div>
                    ))}
                    {course.add ? (
                      <p className="add">
                        <b>Add</b>
                        {course.add}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
