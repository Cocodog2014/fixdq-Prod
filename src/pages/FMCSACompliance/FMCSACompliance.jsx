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

function computeResult({ vehicleType, gvwr, operatingArea, cargoType }) {
  // Very simplified, informational-only logic. Always verify with official FMCSA rules.
  let cdlClass = 'No CDL Required'
  let endorsements = new Set()

  // Endorsements by cargo/vehicle
  if (cargoType === 'hazmat') endorsements.add('HazMat (H)')
  if (vehicleType === 'bus' || vehicleType === 'passenger') endorsements.add('Passenger (P)')

  // CDL Class by GVWR and special cases
  if (gvwr === 'over_26001') {
    // Without combination/trailer details we default to Class B for single heavy vehicles
    cdlClass = 'Class B'
  } else if (gvwr === '10001_26000') {
    // Class C if transporting passengers or hazmat, else typically non‑CDL
    if (endorsements.size > 0) cdlClass = 'Class C'
  } else if (gvwr === 'under_10000') {
    // Under 10k generally non‑CDL, except passenger/hazmat scenarios can push to C in some states
    if (vehicleType === 'bus' || vehicleType === 'passenger' || cargoType === 'hazmat') {
      cdlClass = 'Class C (check state-specific thresholds)'
    }
  }

  const notes = []
  if (operatingArea === 'interstate') {
    notes.push('Interstate operations may require USDOT number and Medical Examiner’s Certificate.')
  } else if (operatingArea === 'intrastate') {
    notes.push('Intrastate rules vary by state; verify additional state requirements.')
  }

  return {
    cdlClass,
    endorsements: Array.from(endorsements),
    notes,
    references: [
      { label: 'FMCSA: Do I Need a CDL?', href: 'https://www.fmcsa.dot.gov/registration/commercial-drivers-license' },
      { label: 'FMCSA: Medical Requirements', href: 'https://www.fmcsa.dot.gov/medical/driver-medical-requirements/medical-requirements' },
    ],
  }
}

export default function FMCSACompliance() {
  const [vehicleType, setVehicleType] = useState('truck')
  const [gvwr, setGvwr] = useState('over_26001')
  const [operatingArea, setOperatingArea] = useState('interstate')
  const [cargoType, setCargoType] = useState('general')

  const result = useMemo(
    () => computeResult({ vehicleType, gvwr, operatingArea, cargoType }),
    [vehicleType, gvwr, operatingArea, cargoType]
  )

  return (
    <div className="fmcsa-page">
      <GlobalHeader />
      {/* 1) Hero / Intro */}
      <section className="fmcsa-hero">
        <div className="container">
          <div className="hero-inner">
            <span className="hero-icon" role="img" aria-label="clipboard">📋</span>
            <h1>FMCSA Compliance Made Simple</h1>
            <p>
              FMCSA compliance helps keep drivers and roads safe, avoids costly fines, and protects your CDL.
              Use this page to understand your requirements and get up to speed fast.
            </p>
            <a className="quick-start-btn" href="#flowchart">Find Out What You Need</a>
          </div>
        </div>
      </section>

      {/* 2) Interactive Flowchart / Decision Tool */}
      <section id="flowchart" className="fmcsa-flowchart">
        <div className="container">
          <h2>What License Do I Need?</h2>
          <p className="fc-disclaimer">This is a simplified guide. Always confirm with FMCSA and your state DMV.</p>

          <div className="fc-grid">
            <div className="fc-panel">
              <StepSelect
                label="Type of Vehicle"
                value={vehicleType}
                onChange={setVehicleType}
                options={[
                  { label: 'Commercial Truck', value: 'truck' },
                  { label: 'Bus', value: 'bus' },
                  { label: 'Passenger Van', value: 'passenger' },
                  { label: 'Specialty Vehicle', value: 'specialty' },
                ]}
              />

              <StepSelect
                label="Gross Vehicle Weight Rating (GVWR)"
                value={gvwr}
                onChange={setGvwr}
                options={[
                  { label: 'Over 26,001 lbs', value: 'over_26001' },
                  { label: '10,001 – 26,000 lbs', value: '10001_26000' },
                  { label: 'Under 10,000 lbs', value: 'under_10000' },
                ]}
              />

              <StepSelect
                label="Operating Area"
                value={operatingArea}
                onChange={setOperatingArea}
                options={[
                  { label: 'Interstate', value: 'interstate' },
                  { label: 'Intrastate', value: 'intrastate' },
                ]}
              />

              <StepSelect
                label="Cargo Type"
                value={cargoType}
                onChange={setCargoType}
                options={[
                  { label: 'General Freight', value: 'general' },
                  { label: 'Hazardous Materials', value: 'hazmat' },
                  { label: 'Passenger Transport', value: 'passenger' },
                ]}
              />
            </div>

            <div className="fc-panel fc-result">
              <h3>Your Result</h3>
              <div className="result-callout">
                <div className="result-item">
                  <span className="result-label">CDL Class</span>
                  <span className="result-value">{result.cdlClass}</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Endorsements</span>
                  <span className="result-value">
                    {result.endorsements.length ? result.endorsements.join(', ') : 'None'}
                  </span>
                </div>
              </div>
              {!!result.notes.length && (
                <ul className="result-notes">
                  {result.notes.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              )}
              <div className="result-links">
                {result.references.map((r) => (
                  <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer">
                    {r.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3) Subsection Cards */}
      <section className="fmcsa-cards">
        <div className="container">
          <h2>Learn the Essentials</h2>
          <div className="cards-grid">
            <a className="card" href="#fmcsr-overview">
              <h3>Federal Motor Carrier Safety Regulations</h3>
              <p>Overview of key FMCSR parts that affect daily operations.</p>
            </a>
            <a className="card" href="#hos-rules">
              <h3>Hours of Service (HOS) Rules</h3>
              <p>Limits, examples, and calculators for common scenarios.</p>
            </a>
            <a className="card" href="#smc">
              <h3>Safety Management Cycles</h3>
              <p>Methods to track and maintain compliance over time.</p>
            </a>
            <a className="card" href="#csa">
              <h3>CSA (Compliance, Safety, Accountability)</h3>
              <p>Driver scores, inspections, and how to improve.</p>
            </a>
            <a className="card" href="#violations">
              <h3>Violation Prevention & Management</h3>
              <p>Avoiding, documenting, and contesting violations.</p>
            </a>
          </div>
        </div>
      </section>

      {/* 4) Quick Reference Tools */}
      <section className="fmcsa-tools">
        <div className="container">
          <h2>Quick Reference</h2>
          <ul className="quick-list">
            <li><a href="#cdl-chart">CDL Class Comparison Chart (A, B, C)</a></li>
            <li><a href="#weight-endorsement">Weight & Endorsement Guide</a></li>
            <li><a href="#state-rules">State-by-State FMCSA Rules</a></li>
            <li><a href="#printable-checklist">Printable Pre-trip Checklist</a></li>
          </ul>
        </div>
      </section>

      {/* 5) Call-to-Action */}
      <section className="fmcsa-cta">
        <div className="container">
          <div className="cta-grid">
            <div className="cta-card">
              <h3>Take the Compliance Quiz</h3>
              <p>Check your understanding and find gaps to study.</p>
              <button type="button" className="cta-btn" disabled>Coming Soon</button>
            </div>
            <div className="cta-card">
              <h3>Book a Compliance Consultation</h3>
              <p>Get personalized guidance for your fleet or career.</p>
              <button type="button" className="cta-btn" disabled>Coming Soon</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
