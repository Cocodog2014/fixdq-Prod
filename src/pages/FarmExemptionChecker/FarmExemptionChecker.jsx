import { useMemo, useState } from 'react'
import GlobalHeader from '../../components/GlobalHeader'

// State-specific override registry. Add states here as their custom notes/rules are implemented.
// Keep notes informational and advise users to verify with state DMV.
const STATE_OVERRIDES = {
  AZ: ({ res }) => {
    if (res.applies) {
      res.notes.push('Arizona: Within 150 air‑miles, non‑for‑hire Covered Farm Vehicles often receive CDL/med/HOS relief; verify current ARS/ADOT guidance.')
    }
  },
  CA: ({ res }) => {
    if (res.applies) {
      res.notes.push('California: CFV/Farm exemptions can differ (e.g., intrastate treatment, documentation); confirm with CA DMV/CHP before operating.')
    }
  },
  UT: ({ res }) => {
    if (res.applies) {
      res.notes.push('Utah: CFV recognition generally follows federal concepts; check UDOT/DMV for current distance/weight nuances.')
    }
  },
  CO: ({ res }) => {
    if (res.applies) {
      res.notes.push('Colorado: Agricultural vehicle allowances exist with limits (distance/for‑hire); confirm with CDOR/CDOT guidance.')
    }
  },
  NM: ({ res }) => {
    if (res.applies) {
      res.notes.push('New Mexico: State adoption and enforcement details vary; check NM DMV/MVD resources for CFV specifics.')
    }
  },
  TX: ({ res }) => {
    if (res.applies) {
      res.notes.push('Texas: Farm/Ranch vehicle relief is common but conditional; verify with TxDMV/DPS (distance, hazmat, for‑hire exclusions).')
    }
  },
}

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

function StepDropdown({ label, value, onChange, options }) {
  return (
    <div className="fc-field fc-select">
      <label className="fc-label">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={label}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

function computeFvdResult({ stateCode, stateName, operatingArea, vehicleUse, driverType, distance, forHire, hazmatPlacarded, passenger, vehicleWeight, articulated, cfvDefinition }) {
  // Simplified, informational-only logic. Always verify with FMCSA and your state DMV.
  let applies = true
  const reasons = []

  // Determine if it meets the CFV definition (390.5 / 390.39). Use explicit answer or infer from other fields.
  const inferredCfv = vehicleUse === 'agriculture' && driverType === 'farmer_family_employee' && forHire === 'no' && hazmatPlacarded === 'no' && passenger === 'no'
  const meetsCFV = cfvDefinition === 'meets' || (cfvDefinition === 'unknown' ? inferredCfv : cfvDefinition === 'meets') || (cfvDefinition === 'no' ? false : inferredCfv)

  if (!meetsCFV) {
    applies = false
    reasons.push('Does not meet the Covered Farm Vehicle (CFV) definition in 49 CFR 390.5/390.39.')
  }
  if (vehicleUse !== 'agriculture') { applies = false; reasons.push('Vehicle use must directly support agricultural operations.'); }
  if (driverType !== 'farmer_family_employee') { applies = false; reasons.push('Driver should be a farmer, family member, or farm employee.'); }
  if (distance !== 'within_150_air_miles') { applies = false; reasons.push('Trips typically must remain within 150 air-miles from the farm.'); }
  if (forHire === 'yes') { applies = false; reasons.push('For-hire carriage generally disqualifies the Farm Exemption.'); }
  if (hazmatPlacarded === 'yes') { applies = false; reasons.push('Placarded hazardous materials are not covered by the exemption.'); }
  if (passenger === 'yes') { applies = false; reasons.push('Passenger transport is not covered by the Farm Exemption.'); }
  if (articulated === 'yes') { reasons.push('Articulated combination vehicles may not receive certain roadside inspection exemptions; verify locally.') }

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

  // Exemption matrix approximation based on CFV rules
  const exemptions = {
    part383: false, // CDL
    part391: false, // Medical/Qualifications
    part395: false, // Hours of Service
    part396: false, // Inspections
  }

  // Determine base eligibility window for heavy CFVs (>= 26,001): intrastate or within 150 air-miles
  const heavyWindowOk = operatingArea === 'intrastate' || distance === 'within_150_air_miles'
  const cfvWindowOk = vehicleWeight === 'under_26001' ? true : heavyWindowOk

  if (meetsCFV && cfvWindowOk) {
    exemptions.part383 = true
    exemptions.part391 = true
    exemptions.part395 = true
    exemptions.part396 = articulated === 'yes' ? false : true
  }

  // When our earlier conditions made applies false, still keep the matrix consistent
  applies = applies && meetsCFV && cfvWindowOk

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

  // State-specific overrides framework
  function applyStateOverrides(code, ctx, res) {
    const handler = STATE_OVERRIDES[code]
    if (typeof handler === 'function') {
      handler({ stateCode: code, stateName, ctx, res })
    }
  }

  const resultPayload = {
    applies,
    headline: applies ? 'Farm Exemption May Apply' : 'Farm Exemption Unlikely',
    reasons,
  statuses,
  exemptions,
    references: [
      { label: 'FMCSA: Farm Vehicle Driver Exemptions', href: 'https://www.fmcsa.dot.gov/registration/commercial-drivers-license/farm-vehicle-driver-exemptions' },
  { label: `${stateName} DMV Farm/CFV Guidance`, href: `https://duckduckgo.com/?q=${encodeURIComponent(stateName + ' DMV covered farm vehicle')}` },
    ],
    notes,
  }

  applyStateOverrides(stateCode, { operatingArea, distance, vehicleWeight, articulated }, resultPayload)
  return resultPayload
}

export default function FarmExemptionChecker() {
  const US_STATES = [
    { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' }, { value: 'AZ', label: 'Arizona' }, { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' }, { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' },
    { value: 'DC', label: 'District of Columbia' }, { value: 'FL', label: 'Florida' }, { value: 'GA', label: 'Georgia' }, { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' }, { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' }, { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' }, { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' }, { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' }, { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' }, { value: 'ND', label: 'North Dakota' }, { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' }, { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' }, { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' }, { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' }, { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' }
  ]

  const [stateCode, setStateCode] = useState('AZ')
  const [operatingArea, setOperatingArea] = useState('intrastate')
  const [vehicleUse, setVehicleUse] = useState('agriculture')
  const [driverType, setDriverType] = useState('farmer_family_employee')
  const [distance, setDistance] = useState('within_150_air_miles')
  const [forHire, setForHire] = useState('no')
  const [hazmatPlacarded, setHazmatPlacarded] = useState('no')
  const [passenger, setPassenger] = useState('no')
  const [vehicleWeight, setVehicleWeight] = useState('under_26001')
  const [articulated, setArticulated] = useState('no')
  const [cfvDefinition, setCfvDefinition] = useState('unknown')
  const [showCfvHelp, setShowCfvHelp] = useState(false)

  const stateName = US_STATES.find((s) => s.value === stateCode)?.label || 'Your State'
  const result = useMemo(() => computeFvdResult({ stateCode, stateName, operatingArea, vehicleUse, driverType, distance, forHire, hazmatPlacarded, passenger, vehicleWeight, articulated, cfvDefinition }), [stateCode, stateName, operatingArea, vehicleUse, driverType, distance, forHire, hazmatPlacarded, passenger, vehicleWeight, articulated, cfvDefinition])

  const [showStatutes, setShowStatutes] = useState(false)

  // Coverage helpers
  const implementedStates = useMemo(() => Object.keys(STATE_OVERRIDES).sort(), [])
  const pendingStates = useMemo(
    () => US_STATES.map((s) => s.value).filter((code) => !STATE_OVERRIDES[code]),
    [US_STATES]
  )
  const hasCustomOverride = !!STATE_OVERRIDES[stateCode]

  return (
    <div className="fmcsa-page">
      <GlobalHeader />
      {showCfvHelp && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="cfv-help-title">
          <div className="modal-dialog">
            <div className="modal-header">
              <h3 id="cfv-help-title">What is a Covered Farm Vehicle (CFV)?</h3>
              <button type="button" className="modal-close" aria-label="Close" onClick={() => setShowCfvHelp(false)}>×</button>
            </div>
            <div className="modal-body">
              <p><strong>Covered Farm Vehicle (CFV)</strong> generally refers to a farm vehicle operated by a farmer, family member, or farm employee, used to transport agricultural commodities, machinery, or supplies to or from a farm, not used for-hire, and not transporting placarded hazardous materials (with limited exceptions). Special distance and weight conditions may apply.</p>
              <ul className="result-notes">
                <li>Often recognized with a special farm plate or designation issued by the state.</li>
                <li>Typical limits include operation within 150 air-miles and non for-hire use.</li>
                <li>States can vary in adoption and documentation requirements.</li>
              </ul>
              <p>
                For the official definition, see the
                {' '}<a href="https://www.fmcsa.dot.gov/faq/what-covered-farm-vehicle-cfv" target="_blank" rel="noopener noreferrer">FMCSA CFV FAQ</a>.
                {' '}For broader program details, see the
                {' '}<a href="https://www.fmcsa.dot.gov/registration/commercial-drivers-license/farm-vehicle-driver-exemptions" target="_blank" rel="noopener noreferrer">Farm Vehicle Driver Exemptions overview</a>.
              </p>
            </div>
            <div className="modal-actions">
              <a
                href="https://www.fmcsa.dot.gov/faq/what-covered-farm-vehicle-cfv"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn"
              >Open CFV FAQ</a>
              <button type="button" className="cta-btn" onClick={() => setShowCfvHelp(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
      <section className="fmcsa-flowchart">
        <div className="container">
          <h2>Farm Vehicle Driver (FVD) Exemption Checker</h2>
          <p className="fc-disclaimer">Answer a few quick questions to see if the Farm Exemption may apply. Always confirm with your state DMV.</p>

          <div className="fc-grid">
            <div className="fc-panel">
              <StepDropdown
                label="Select your state"
                value={stateCode}
                onChange={setStateCode}
                options={US_STATES}
              />
              <div className="fc-coverage" aria-live="polite">
                <div className={`status-pill ${hasCustomOverride ? 'ok' : 'info'}`}>
                  <span className="k">State rules</span>
                  <span className="v">{hasCustomOverride ? 'Custom override' : 'Generic (TODO)'}</span>
                </div>
                <details className="state-coverage">
                  <summary>Coverage ({implementedStates.length}/{US_STATES.length})</summary>
                  <div className="result-notes">
                    <div><strong>Implemented:</strong> {implementedStates.join(', ') || 'None'}</div>
                    <div><strong>Pending:</strong> {pendingStates.join(', ') || 'None'}</div>
                  </div>
                </details>
              </div>
              <StepSelect
                label="Covered Farm Vehicle (CFV) definition?"
                value={cfvDefinition}
                onChange={(val) => {
                  if (val === 'learn') {
                    setShowCfvHelp(true)
                    return
                  }
                  setCfvDefinition(val)
                }}
                options={[
                  { label: 'Yes, meets CFV definition', value: 'meets' },
                  { label: 'No / Not a CFV', value: 'no' },
                  { label: 'Not sure (learn)', value: 'learn' },
                  { label: 'Unknown (infer from answers)', value: 'unknown' },
                ]}
              />
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

              <StepSelect
                label="Articulated Vehicle (tractor + trailer)?"
                value={articulated}
                onChange={setArticulated}
                options={[
                  { label: 'No', value: 'no' },
                  { label: 'Yes', value: 'yes' },
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

              {/* CFR Exemption Matrix */}
              <div className="exemption-table">
                <div className="row head"><div>Reg Part</div><div>Status</div></div>
                <div className="row"><div>Part 383 — CDL</div><div className={result.exemptions.part383 ? 'ok' : 'no'}>{result.exemptions.part383 ? 'Exempt' : 'Not Exempt'}</div></div>
                <div className="row"><div>Part 391 — Qualifications/Med</div><div className={result.exemptions.part391 ? 'ok' : 'no'}>{result.exemptions.part391 ? 'Exempt' : 'Not Exempt'}</div></div>
                <div className="row"><div>Part 395 — Hours of Service</div><div className={result.exemptions.part395 ? 'ok' : 'no'}>{result.exemptions.part395 ? 'Exempt' : 'Not Exempt'}</div></div>
                <div className="row"><div>Part 396 — Inspection</div><div className={result.exemptions.part396 ? 'ok' : 'no'}>{result.exemptions.part396 ? 'Exempt' : 'Not Exempt'}</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
