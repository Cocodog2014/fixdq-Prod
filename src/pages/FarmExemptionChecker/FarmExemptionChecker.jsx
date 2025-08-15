import { useMemo, useState } from 'react'
import GlobalHeader from '../../components/GlobalHeader'

function StepSelect({ label, options, value, onChange }) {
  return (
    <div className="fc-field">
      <label className="fc-label">{label}</label>
      <div className="fc-options">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`fc-option ${value === opt.value ? 'selected' : ''}`}
            onClick={() => onChange(opt.value)}
            aria-pressed={value === opt.value}
          >
            <span className="fc-option-label">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function computeFvdResult({ operatingArea, vehicleUse, driverType, distance, forHire, hazmatPlacarded, passenger, vehicleWeight }) {
  // Simplified, informational-only logic. Always verify with FMCSA and your state DMV.
  let applies = true
  const reasons = []

  if (vehicleUse !== 'agriculture') { applies = false; reasons.push('Vehicle use must directly support agricultural operations.'); }
  if (driverType !== 'farmer_family_employee') { applies = false; reasons.push('Driver should be a farmer, family member, or farm employee.'); }
  if (distance !== 'within_150_air_miles') { applies = false; reasons.push('Trips typically must remain within 150 air-miles from the farm.'); }
  if (forHire === 'yes') { applies = false; reasons.push('For-hire carriage generally disqualifies the Farm Exemption.'); }
  if (hazmatPlacarded === 'yes') { applies = false; reasons.push('Placarded hazardous materials are not covered by the exemption.'); }
  if (passenger === 'yes') { applies = false; reasons.push('Passenger transport is not covered by the Farm Exemption.'); }

  const notes = []
  if (operatingArea === 'interstate') {
    notes.push('Interstate use of Covered Farm Vehicles varies by state adoption; check current rules.')
  } else if (operatingArea === 'intrastate') {
    notes.push('Intrastate rules depend on your state DMV; confirm local provisions.')
  }

  if (vehicleWeight === '26001_plus') {
    notes.push('For vehicles 26,001 lbs or more, CDL may be waived if it qualifies as a Covered Farm Vehicle. Documentation may be required.')
  } else {
    notes.push('Vehicles under 26,001 lbs used as Covered Farm Vehicles are commonly exempt from CDL.')
  }

  // Derive statuses (high-level, informational only)
  const statuses = []
  // CDL
  if (applies) {
    statuses.push({ label: 'CDL', value: 'Possibly Not Required (CFV)', tone: 'ok' })
  } else if (vehicleWeight === '26001_plus') {
    statuses.push({ label: 'CDL', value: 'May Be Required (≥26,001 lbs)', tone: 'warn' })
  } else {
    statuses.push({ label: 'CDL', value: 'State‑Dependent', tone: 'info' })
  }
  // Hours of Service
  statuses.push({ label: 'HOS', value: applies ? 'Possibly Exempt (CFV)' : 'Standard HOS Apply', tone: applies ? 'ok' : 'info' })
  // USDOT
  statuses.push({ label: 'USDOT Number', value: operatingArea === 'interstate' ? 'Likely Required' : 'State‑Dependent', tone: operatingArea === 'interstate' ? 'warn' : 'info' })
  // Medical
  statuses.push({ label: 'Medical Card', value: applies ? 'Check State (often not required for CFV non‑CDL)' : 'Likely Required with CDL', tone: applies ? 'info' : 'warn' })

  return {
    applies,
    headline: applies ? 'Farm Exemption May Apply' : 'Farm Exemption Unlikely',
    reasons,
    statuses,
    references: [
      { label: 'FMCSA: Farm Vehicle Driver Exemptions', href: 'https://www.fmcsa.dot.gov/registration/commercial-drivers-license/farm-vehicle-driver-exemptions' },
      { label: 'State DMV Farm/CFV Guidance', href: 'https://duckduckgo.com/?q=state+dmv+covered+farm+vehicle' },
    ],
    notes,
  }
}

export default function FarmExemptionChecker() {
  const [operatingArea, setOperatingArea] = useState('intrastate')
  const [vehicleUse, setVehicleUse] = useState('agriculture')
  const [driverType, setDriverType] = useState('farmer_family_employee')
  const [distance, setDistance] = useState('within_150_air_miles')
  const [forHire, setForHire] = useState('no')
  const [hazmatPlacarded, setHazmatPlacarded] = useState('no')
  const [passenger, setPassenger] = useState('no')
  const [vehicleWeight, setVehicleWeight] = useState('under_26001')

  const result = useMemo(() => computeFvdResult({ operatingArea, vehicleUse, driverType, distance, forHire, hazmatPlacarded, passenger, vehicleWeight }), [operatingArea, vehicleUse, driverType, distance, forHire, hazmatPlacarded, passenger, vehicleWeight])

  const [showStatutes, setShowStatutes] = useState(false)

  return (
    <div className="fmcsa-page">
      <GlobalHeader />
      <section className="fmcsa-flowchart">
        <div className="container">
          <h2>Farm Vehicle Driver (FVD) Exemption Checker</h2>
          <p className="fc-disclaimer">Answer a few quick questions to see if the Farm Exemption may apply. Always confirm with your state DMV.</p>

          <div className="fc-grid">
            <div className="fc-panel">
              <StepSelect
                label="Operating Area"
                value={operatingArea}
                onChange={setOperatingArea}
                options={[
                  { label: 'Intrastate', value: 'intrastate' },
                  { label: 'Interstate', value: 'interstate' },
                ]}
              />

              <StepSelect
                label="Vehicle Use"
                value={vehicleUse}
                onChange={setVehicleUse}
                options={[
                  { label: 'Agriculture / Farm Support', value: 'agriculture' },
                  { label: 'Other / Non‑Agricultural', value: 'non_agriculture' },
                ]}
              />

              <StepSelect
                label="Driver is"
                value={driverType}
                onChange={setDriverType}
                options={[
                  { label: 'Farmer / Family / Employee', value: 'farmer_family_employee' },
                  { label: 'Other', value: 'other' },
                ]}
              />

              <StepSelect
                label="Distance From Farm"
                value={distance}
                onChange={setDistance}
                options={[
                  { label: 'Within 150 air‑miles', value: 'within_150_air_miles' },
                  { label: 'Beyond 150 air‑miles', value: 'beyond_150' },
                ]}
              />

              <StepSelect
                label="For‑Hire?"
                value={forHire}
                onChange={setForHire}
                options={[
                  { label: 'No', value: 'no' },
                  { label: 'Yes', value: 'yes' },
                ]}
              />

              <StepSelect
                label="Placarded HazMat?"
                value={hazmatPlacarded}
                onChange={setHazmatPlacarded}
                options={[
                  { label: 'No', value: 'no' },
                  { label: 'Yes', value: 'yes' },
                ]}
              />

              <StepSelect
                label="Passenger Transport?"
                value={passenger}
                onChange={setPassenger}
                options={[
                  { label: 'No', value: 'no' },
                  { label: 'Yes', value: 'yes' },
                ]}
              />

              <StepSelect
                label="Vehicle Weight"
                value={vehicleWeight}
                onChange={setVehicleWeight}
                options={[
                  { label: 'Under 26,001 lbs', value: 'under_26001' },
                  { label: '26,001 lbs or more', value: '26001_plus' },
                ]}
              />
            </div>

            <div className="fc-panel fc-result">
              <h3>Your Result</h3>
              <div className={`result-callout ${result.applies ? 'has-endorsements' : ''}`} aria-live="polite">
                <div className="result-item">
                  <span className="result-label">Status</span>
                  <span className="result-value">{result.headline}</span>
                </div>
              </div>
              {result.statuses?.length ? (
                <div className="status-grid">
                  {result.statuses.map((s, i) => (
                    <div key={i} className={`status-pill ${s.tone}`}>
                      <span className="k">{s.label}</span>
                      <span className="v">{s.value}</span>
                    </div>
                  ))}
                </div>
              ) : null}
              {!!result.reasons.length && (
                <ul className="result-notes">
                  {result.reasons.map((r, i) => (<li key={i}>{r}</li>))}
                </ul>
              )}
              {!!result.notes.length && (
                <ul className="result-notes">
                  {result.notes.map((n, i) => (<li key={i}>{n}</li>))}
                </ul>
              )}
              <div className="result-links">
                {result.references.map((r) => (
                  <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer">{r.label}</a>
                ))}
              </div>

              <details className="statutes" open={showStatutes} onToggle={(e) => setShowStatutes(e.currentTarget.open)}>
                <summary>Statutes & References</summary>
                <ul className="result-notes">
                  <li>49 CFR 390.5T — Definitions; Covered Farm Vehicle (CFV)</li>
                  <li>49 CFR 390.39 — Exemptions for Covered Farm Vehicles</li>
                  <li>State adoptions vary; check your State DMV CFV guidance.</li>
                </ul>
              </details>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
