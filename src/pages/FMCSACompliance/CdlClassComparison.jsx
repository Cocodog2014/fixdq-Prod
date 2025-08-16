import React from 'react'
import './CdlClassComparison.css'

const ROWS = [
  {
    cls: 'Class A',
    vehicle: 'Combination vehicles',
    requirement: 'GCWR ≥ 26,001 lbs AND the towed unit(s) has GVWR > 10,000 lbs',
    examples: 'Tractor‑trailers, truck + trailer combos, tankers, livestock carriers, flatbeds',
  },
  {
    cls: 'Class B',
    vehicle: 'Single vehicles',
    requirement: 'GVWR ≥ 26,001 lbs OR towing a vehicle with GVWR ≤ 10,000 lbs',
    examples: 'Straight trucks, large buses (city/tour/school), box trucks, dump trucks with small trailers',
  },
  {
    cls: 'Class C',
    vehicle: 'Specialized smaller vehicles',
    requirement: 'GVWR < 26,001 lbs BUT carries 16+ passengers (incl. driver) OR placarded HazMat',
    examples: 'Passenger vans/shuttles, small HazMat vehicles, airport shuttles',
  },
]

const NOTES = [
  'Endorsements may be required: Tanker (N), Doubles/Triples (T), Passenger (P), School Bus (S), HazMat (H/X).',
  'Class A typically covers many Class B/C vehicles if you hold the right endorsements.',
  'Class B does NOT authorize operation of large tractor‑trailers; some Class C (P/H) may be allowed.',
  'State‑specific rules can vary; always verify with your DMV.',
]

export default function CdlClassComparison({ title = 'CDL Class Comparison (A, B, C)', showNotes = true }) {
  return (
    <section className="cdl-wrap" aria-label="CDL classes A, B, and C comparison">
      <header className="cdl-header">
        <span className="cdl-dot" aria-hidden></span>
        <div>
          <h2 className="cdl-title">{title}</h2>
          <div className="cdl-sub">Quick reference for drivers and dispatch</div>
        </div>
      </header>

      <table className="cdl-table" role="table">
        <thead>
          <tr>
            <th scope="col">CDL Class</th>
            <th scope="col">Vehicle Type</th>
            <th scope="col">Weight / Requirement</th>
            <th scope="col">Examples</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.cls}>
              <td><span className="cdl-chip" aria-label={`Class ${r.cls}`}>{r.cls}</span></td>
              <td className="cdl-muted">{r.vehicle}</td>
              <td>{r.requirement}</td>
              <td className="cdl-muted">{r.examples}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cdl-cards" aria-hidden>
        {ROWS.map((r) => (
          <article className="cdl-card" key={r.cls}>
            <h3><span className="cdl-chip">{r.cls}</span></h3>
            <div className="cdl-row"><span className="key">Type</span><span>{r.vehicle}</span></div>
            <div className="cdl-row"><span className="key">Requirement</span><span>{r.requirement}</span></div>
            <div className="cdl-row"><span className="key">Examples</span><span>{r.examples}</span></div>
          </article>
        ))}
      </div>

      {showNotes && (
        <ul className="cdl-notes">
          {NOTES.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      )}
    </section>
  )
}
