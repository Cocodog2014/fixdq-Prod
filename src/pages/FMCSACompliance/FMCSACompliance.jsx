import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalHeader from '../../components/GlobalHeader'
import FMCSARegulations from './FMCSARegulations'
import CdlClassComparison from './CdlClassComparison'
import StateRules from './StateRules'

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

function computeResult({ vehicleType, gvwr, operatingArea, cargoType, trailer, passengerCount, tankLiquids, placardedHazmat, farmExemption, schoolBus }) {
  // Very simplified, informational-only logic. Always verify with official FMCSA rules.
  let cdlClass = 'No CDL Required'
  let endorsements = new Set()

  // Endorsements by cargo/vehicle
  const isPassengerScenario = vehicleType === 'bus' || vehicleType === 'passenger' || passengerCount === '16_plus'
  if (isPassengerScenario) endorsements.add('Passenger (P)')
  if (schoolBus === 'yes') endorsements.add('School Bus (S)')

  // Hazmat / Tank endorsement combos
  const wantsHazmat = placardedHazmat === 'yes' || cargoType === 'hazmat'
  const wantsTank = tankLiquids === 'yes'
  if (wantsTank && wantsHazmat) {
    endorsements.add('Tank + HazMat (X)')
  } else if (wantsHazmat) {
    endorsements.add('HazMat (H)')
  } else if (wantsTank) {
    endorsements.add('Tank (N)')
  }

  // CDL Class by GVWR and special cases
  if (gvwr === 'over_26001') {
    // Heavy power unit. Trailer >10k makes this Class A; otherwise Class B.
    cdlClass = trailer === 'trailer_over_10000' ? 'Class A' : 'Class B'
  } else if (gvwr === '10001_26000') {
    // Mid-weight. Trailer >10k likely bumps to Class A if GCWR ≥ 26,001.
    if (trailer === 'trailer_over_10000') {
      cdlClass = 'Class A (likely; verify GCWR ≥ 26,001)'
    } else if (endorsements.size > 0) {
      cdlClass = 'Class C'
    } else {
      cdlClass = 'No CDL Required'
    }
  } else if (gvwr === 'under_10000') {
    // Under 10k generally non‑CDL; passenger/hazmat/tank scenarios may require Class C in some states.
    if (isPassengerScenario || wantsHazmat || wantsTank) {
      cdlClass = 'Class C (check state-specific thresholds)'
    } else {
      cdlClass = 'No CDL Required'
    }
  }

  const notes = []
  if (operatingArea === 'interstate') {
    notes.push('Interstate operations may require USDOT number and Medical Examiner’s Certificate.')
  } else if (operatingArea === 'intrastate') {
    notes.push('Intrastate rules vary by state; verify additional state requirements.')
  }

  if (trailer === 'trailer_over_10000' && gvwr !== 'over_26001') {
    notes.push('If GCWR ≥ 26,001 and trailer > 10,000 lbs, Class A applies.')
  }

  if (farmExemption === 'yes' && operatingArea === 'intrastate' && !wantsHazmat && passengerCount !== '16_plus' && schoolBus !== 'yes') {
    notes.push('Farm Vehicle Driver (FVD) exemption may apply within 150 air-miles; CDL may not be required. Confirm with your state DMV.')
  }

  return {
    cdlClass,
    endorsements: Array.from(endorsements),
    notes,
    references: [
      { label: 'FMCSA: Do I Need a CDL?', href: 'https://www.fmcsa.dot.gov/registration/commercial-drivers-license' },
      { label: 'FMCSA: Medical Requirements', href: 'https://www.fmcsa.dot.gov/medical/driver-medical-requirements/medical-requirements' },
      { label: 'FMCSA: Tank Vehicle (N) & HazMat (H/X)', href: 'https://www.fmcsa.dot.gov/registration/commercial-drivers-license/endorsements' },
      { label: 'FMCSA: Farm Vehicle Driver Exemptions', href: 'https://www.fmcsa.dot.gov/registration/commercial-drivers-license/farm-vehicle-driver-exemptions' },
    ],
  }
}

export default function FMCSACompliance() {
  const navigate = useNavigate()
  const [vehicleType, setVehicleType] = useState('truck')
  const [gvwr, setGvwr] = useState('over_26001')
  const [operatingArea, setOperatingArea] = useState('interstate')
  const [cargoType, setCargoType] = useState('general')
  const [trailer, setTrailer] = useState('trailer_10000_or_less')
  const [passengerCount, setPassengerCount] = useState('under16')
  const [tankLiquids, setTankLiquids] = useState('no')
  const [placardedHazmat, setPlacardedHazmat] = useState('no')
  const [farmExemption, setFarmExemption] = useState('no')
  const [schoolBus, setSchoolBus] = useState('no')
  const [showCdlChart, setShowCdlChart] = useState(false)
  const [showStateRules, setShowStateRules] = useState(false)

  const result = useMemo(
    () => computeResult({ vehicleType, gvwr, operatingArea, cargoType, trailer, passengerCount, tankLiquids, placardedHazmat, farmExemption, schoolBus }),
    [vehicleType, gvwr, operatingArea, cargoType, trailer, passengerCount, tankLiquids, placardedHazmat, farmExemption, schoolBus]
  )
  const cdlRequired = useMemo(() => !/^No CDL Required/i.test(result.cdlClass), [result.cdlClass])

  // If user navigates with #cdl-chart, reveal and scroll to it
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location?.hash === '#cdl-chart') {
      setShowCdlChart(true)
      setTimeout(() => {
        document.getElementById('cdl-chart')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 0)
    }
    if (typeof window !== 'undefined' && window.location?.hash === '#state-rules') {
      setShowStateRules(true)
      setTimeout(() => {
        document.getElementById('state-rules')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 0)
    }
  }, [])

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
                label="Operating Area"
                value={operatingArea}
                onChange={setOperatingArea}
                options={[
                  { label: 'Interstate', value: 'interstate' },
                  { label: 'Intrastate', value: 'intrastate' },
                ]}
              />

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
                label="Is the Vehicle(s) GVW, GVWR, and GCWR"
                value={gvwr}
                onChange={setGvwr}
                options={[
                  { label: 'Under 10,001 lbs', value: 'under_10000' },
                  { label: '10,001 – 26,000 lbs', value: '10001_26000' },
                  { label: 'Over 26,000 lbs', value: 'over_26001' },
                ]}
              />

              <StepSelect
                label="Towing / Trailer"
                value={trailer}
                onChange={setTrailer}
                options={[
                  { label: 'No trailer or ≤ 10,000 lbs', value: 'trailer_10000_or_less' },
                  { label: 'Trailer > 10,000 lbs', value: 'trailer_over_10000' },
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

              {/* Passengers & Special Cases */}
              <StepSelect
                label="Passenger Count"
                value={passengerCount}
                onChange={setPassengerCount}
                options={[
                  { label: 'Under 16 (including driver)', value: 'under16' },
                  { label: '16 or more (including driver)', value: '16_plus' },
                ]}
              />

              {/* Endorsement detail toggles */}
              <StepSelect
                label="Bulk Liquids / Tank Vehicle"
                value={tankLiquids}
                onChange={setTankLiquids}
                options={[
                  { label: 'No', value: 'no' },
                  { label: 'Yes', value: 'yes' },
                ]}
              />

              <StepSelect
                label="Placarded Hazardous Materials"
                value={placardedHazmat}
                onChange={setPlacardedHazmat}
                options={[
                  { label: 'No', value: 'no' },
                  { label: 'Yes', value: 'yes' },
                ]}
              />

              <StepSelect
                label="School Bus"
                value={schoolBus}
                onChange={setSchoolBus}
                options={[
                  { label: 'No', value: 'no' },
                  { label: 'Yes', value: 'yes' },
                ]}
              />

              <StepSelect
                label="Farm Exemption (FVD)"
                value={farmExemption}
                onChange={(val) => {
                  if (val === 'unknown') {
                    navigate('/farm-exemption-checker')
                  } else {
                    setFarmExemption(val)
                  }
                }}
                options={[
                  { label: 'No', value: 'no' },
                  { label: 'Yes', value: 'yes' },
                  { label: 'Unknown', value: 'unknown' },
                ]}
              />
            </div>

            <div className="fc-panel fc-result">
              <h3>Your Result</h3>
              <div className={`result-callout ${cdlRequired ? 'cdl-required' : ''}`}>
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
            <FMCSARegulations />
            {/* Hours of Service dedicated card */}
            <div
              className="fmcsa-reg-card"
              role="link"
              tabIndex={0}
              aria-label={`Hours of Service (HOS) Rules - Limits, examples, and calculators for common scenarios.`}
              onClick={() => navigate('/hours-of-service')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  navigate('/hours-of-service')
                }
              }}
            >
              <div className="fmcsa-reg-body">
                <h3 className="fmcsa-reg-title">Hours of Service (HOS) Rules</h3>
                <p className="fmcsa-reg-desc">Limits, examples, and calculators for common scenarios.</p>
              </div>
              <div className="fmcsa-reg-footer">
                <a
                  className="fmcsa-reg-btn"
                  href="/hours-of-service"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    navigate('/hours-of-service')
                  }}
                >
                  Explore
                </a>
              </div>
            </div>

            {/* Safety Management Cycles */}
            <div
              className="fmcsa-reg-card"
              role="link"
              tabIndex={0}
              aria-label={`Safety Management Cycles - Methods to track and maintain compliance over time.`}
              onClick={() => navigate('/safety-management')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  navigate('/safety-management')
                }
              }}
            >
              <div className="fmcsa-reg-body">
                <h3 className="fmcsa-reg-title">Safety Management Cycles</h3>
                <p className="fmcsa-reg-desc">Methods to track and maintain compliance over time.</p>
              </div>
              <div className="fmcsa-reg-footer">
                <a
                  className="fmcsa-reg-btn"
                  href="/safety-management"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    navigate('/safety-management')
                  }}
                >
                  Explore
                </a>
              </div>
            </div>

            {/* CSA */}
            <div
              className="fmcsa-reg-card csa-highlight"
              role="link"
              tabIndex={0}
              aria-label={`CSA (Compliance, Safety, Accountability) - Driver scores, inspections, and how to improve.`}
              onClick={() => navigate('/csa')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  navigate('/csa')
                }
              }}
            >
              <div className="fmcsa-reg-body">
                <h3 className="fmcsa-reg-title">CSA (Compliance, Safety, Accountability)</h3>
                <p className="fmcsa-reg-desc">Driver scores, inspections, and how to improve.</p>
              </div>
              <div className="fmcsa-reg-footer">
                <a
                  className="fmcsa-reg-btn fmcsa-reg-btn--red"
                  href="/csa"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    navigate('/csa')
                  }}
                >
                  Explore
                </a>
              </div>
            </div>

            {/* Violation Prevention & Management */}
            <div
              className="fmcsa-reg-card"
              role="link"
              tabIndex={0}
              aria-label={`Violation Prevention & Management - Avoiding, documenting, and contesting violations.`}
              onClick={() => navigate('/prevention-management')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  navigate('/prevention-management')
                }
              }}
            >
              <div className="fmcsa-reg-body">
                <h3 className="fmcsa-reg-title">Violation Prevention & Management</h3>
                <p className="fmcsa-reg-desc">Avoiding, documenting, and contesting violations.</p>
              </div>
              <div className="fmcsa-reg-footer">
                <a
                  className="fmcsa-reg-btn"
                  href="/prevention-management"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    navigate('/prevention-management')
                  }}
                >
                  Explore
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4) Quick Reference Tools */}
      <section className="fmcsa-tools">
        <div className="container">
          <h2>Quick Reference</h2>
          <ul className="quick-list">
            <li>
              <a
                href="#cdl-chart"
                onClick={(e) => {
                  e.preventDefault()
                  setShowCdlChart(true)
                  setTimeout(() => {
                    document.getElementById('cdl-chart')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }, 0)
                }}
              >
                CDL Class Comparison Chart (A, B, C)
              </a>
            </li>
            <li><a href="#weight-endorsement">Weight & Endorsement Guide</a></li>
            <li>
              <a
                href="#state-rules"
                onClick={(e) => {
                  e.preventDefault()
                  setShowStateRules(true)
                  setTimeout(() => {
                    document.getElementById('state-rules')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }, 0)
                }}
              >
                State-by-State FMCSA Rules
              </a>
            </li>
            <li><a href="#printable-checklist">Printable Pre-trip Checklist</a></li>
          </ul>
          <div id="cdl-chart" style={{ marginTop: '1rem', display: showCdlChart ? 'block' : 'none' }}>
            <CdlClassComparison
              onClose={() => {
                setShowCdlChart(false)
                // Clean hash without reload for a smoother UX
                if (typeof window !== 'undefined') {
                  const { pathname, search } = window.location
                  window.history.replaceState(null, '', pathname + search)
                }
              }}
            />
          </div>
        </div>
      </section>

      {/* State-by-State Rules (show on click) */}
      <section className="fmcsa-tools" id="state-rules" style={{ display: showStateRules ? 'block' : 'none' }}>
        <div className="container">
          <StateRules onClose={() => {
            setShowStateRules(false)
            if (typeof window !== 'undefined') {
              const { pathname, search } = window.location
              window.history.replaceState(null, '', pathname + search)
            }
          }} />
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
