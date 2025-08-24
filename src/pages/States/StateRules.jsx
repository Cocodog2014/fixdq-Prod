// Moved from FMCSACompliance folder to States folder
import React, { useMemo, useState, useEffect } from 'react'

const STATES = [
  { abbr: 'AL', name: 'Alabama' }, { abbr: 'AK', name: 'Alaska' }, { abbr: 'AZ', name: 'Arizona' }, { abbr: 'AR', name: 'Arkansas' },
  { abbr: 'CA', name: 'California' }, { abbr: 'CO', name: 'Colorado' }, { abbr: 'CT', name: 'Connecticut' }, { abbr: 'DE', name: 'Delaware' },
  { abbr: 'FL', name: 'Florida' }, { abbr: 'GA', name: 'Georgia' }, { abbr: 'HI', name: 'Hawaii' }, { abbr: 'ID', name: 'Idaho' },
  { abbr: 'IL', name: 'Illinois' }, { abbr: 'IN', name: 'Indiana' }, { abbr: 'IA', name: 'Iowa' }, { abbr: 'KS', name: 'Kansas' },
  { abbr: 'KY', name: 'Kentucky' }, { abbr: 'LA', name: 'Louisiana' }, { abbr: 'ME', name: 'Maine' }, { abbr: 'MD', name: 'Maryland' },
  { abbr: 'MA', name: 'Massachusetts' }, { abbr: 'MI', name: 'Michigan' }, { abbr: 'MN', name: 'Minnesota' }, { abbr: 'MS', name: 'Mississippi' },
  { abbr: 'MO', name: 'Missouri' }, { abbr: 'MT', name: 'Montana' }, { abbr: 'NE', name: 'Nebraska' }, { abbr: 'NV', name: 'Nevada' },
  { abbr: 'NH', name: 'New Hampshire' }, { abbr: 'NJ', name: 'New Jersey' }, { abbr: 'NM', name: 'New Mexico' }, { abbr: 'NY', name: 'New York' },
  { abbr: 'NC', name: 'North Carolina' }, { abbr: 'ND', name: 'North Dakota' }, { abbr: 'OH', name: 'Ohio' }, { abbr: 'OK', name: 'Oklahoma' },
  { abbr: 'OR', name: 'Oregon' }, { abbr: 'PA', name: 'Pennsylvania' }, { abbr: 'RI', name: 'Rhode Island' }, { abbr: 'SC', name: 'South Carolina' },
  { abbr: 'SD', name: 'South Dakota' }, { abbr: 'TN', name: 'Tennessee' }, { abbr: 'TX', name: 'Texas' }, { abbr: 'UT', name: 'Utah' },
  { abbr: 'VT', name: 'Vermont' }, { abbr: 'VA', name: 'Virginia' }, { abbr: 'WA', name: 'Washington' }, { abbr: 'WV', name: 'West Virginia' },
  { abbr: 'WI', name: 'Wisconsin' }, { abbr: 'WY', name: 'Wyoming' }
]

export default function StateRules({ onClose }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash || ''
      const m = hash.match(/state-rules=([A-Z]{2})/)
      if (m) {
        const st = STATES.find((s) => s.abbr === m[1])
        if (st) setSelected(st)
      }
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return STATES
    return STATES.filter((s) => s.name.toLowerCase().includes(q) || s.abbr.toLowerCase() === q)
  }, [query])

  const st = selected
  const makeSearch = (term) => {
    if (!st) return '#'
    const q = encodeURIComponent(`${st.name} ${term}`)
    return `https://www.google.com/search?q=${q}`
  }

  return (
    <section className="state-wrap" aria-label="State-by-State FMCSA and intrastate rules">
      {onClose && (
        <button type="button" className="state-close" aria-label="Close State Rules" onClick={onClose}>✕</button>
      )}
      <header className="state-header">
        <div className="state-title">
          <span className="state-dot" aria-hidden></span>
          <h2>State-by-State FMCSA Rules</h2>
        </div>
        <p className="state-sub">Intrastate details vary by state. Use this quick finder to jump to official guidance.</p>
      </header>

      <div className="state-controls">
        <input
          className="state-input"
          type="search"
          placeholder="Search state (e.g., Texas or TX)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search state"
        />
        <div className="state-grid">
          {filtered.map((s) => (
            <button
              key={s.abbr}
              type="button"
              className={`state-pill ${selected?.abbr === s.abbr ? 'active' : ''}`}
              onClick={() => setSelected(s)}
              aria-pressed={selected?.abbr === s.abbr}
            >
              {s.name} ({s.abbr})
            </button>
          ))}
        </div>
      </div>

      {st ? (
        <div className="state-detail">
          <h3>{st.name} ({st.abbr})</h3>
          <p className="state-note">These links search authoritative sources for intrastate rules, CDL, and CMV guidance.</p>
          <div className="state-links">
            <a href={makeSearch('Department of Transportation commercial motor vehicle rules')} target="_blank" rel="noopener noreferrer">DOT / CMV Regulations</a>
            <a href={makeSearch('DMV CDL intrastate medical waiver')} target="_blank" rel="noopener noreferrer">CDL & Medical (intrastate)</a>
            <a href={makeSearch('commercial vehicle enforcement handbook PDF')} target="_blank" rel="noopener noreferrer">Enforcement Handbook (PDF)</a>
            <a href={makeSearch('oversize overweight permits commercial vehicle')} target="_blank" rel="noopener noreferrer">Oversize/Overweight Permits</a>
          </div>
          <ul className="state-tips">
            <li>Verify intrastate thresholds (weight, medical, ELD short-haul) versus federal interstate rules.</li>
            <li>Check state-specific endorsements, exemptions, and agricultural FVD policies.</li>
            <li>When in doubt, call the state’s CMV enforcement or DMV CDL desk.</li>
          </ul>
        </div>
      ) : (
        <p className="state-empty">Select a state above to see quick links and tips.</p>
      )}
    </section>
  )
}
