import './Insurance.css'
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Insurance({ active, onClick }) {
  return (
    <button type="button" className={`hero-top-btn hero-top-btn--outline hero-btn--insurance ${active ? 'active' : ''}`} aria-pressed={active} onClick={onClick}>
      <span className="hero-top-emoji" aria-hidden="true">🛡️</span>
      <span>Insurance Requirements</span>
    </button>
  )
}

export function InsurancePanel({ onClose }) {
  return (
    <div className="insurance-flow-panel" role="region" aria-label="FMCSA Insurance & Filings">
      <FMCSAInsuranceFlow onClose={onClose} />
    </div>
  )
}

// New interactive flow (framework-free, plain CSS classes)
function FMCSAInsuranceFlow({ onClose }) {
  const navigate = useNavigate()
  const [role, setRole] = useState(null) // 'carrier' | 'broker' | 'freight' | 'filer'
  const [carrierKind, setCarrierKind] = useState(null) // 'property' | 'passenger'
  const [interstate, setInterstate] = useState(null) // boolean
  const [passengerSeats16Plus, setPassengerSeats16Plus] = useState(null) // boolean
  const [ffOperatesCMVs, setFfOperatesCMVs] = useState(null) // boolean

  function resetAll() {
    setRole(null); setCarrierKind(null); setInterstate(null); setPassengerSeats16Plus(null); setFfOperatesCMVs(null)
  }

  const carrierChecklist = useMemo(() => {
    const list = [
      'Company identifiers (USDOT / MC / FF docket as applicable)',
      'Legal name & address consistency',
      'Insurance producer contact info',
      'Process agent (BOC-3) details'
    ]
    if (carrierKind === 'passenger') list.push('Seating capacity documentation (≤15 or 16+)')
    return list
  }, [carrierKind])

  const brokerChecklist = [
    'Select BMC-84 (bond) OR BMC-85 (trust)',
    'Process agent (BOC-3) covering all states',
    'Identifiers (USDOT if any, MC/Broker docket)'
  ]

  const ffChecklist = useMemo(() => {
    const list = ['BMC-84 (bond) OR BMC-85 (trust)', 'Process agent (BOC-3)']
    if (ffOperatesCMVs) list.unshift('BMC-91/91X (BI/PD) via insurer')
    return list
  }, [ffOperatesCMVs])

  const filerChecklist = [
    'Login.gov account (email used for Portal)',
    'FMCSA Portal registration (filer role)',
    'e-Filer account activation steps (insurer / surety / agent)'
  ]

  return (
    <div className="ins-flow-app">
      <div className="ins-flow-head">
        <h2>FMCSA Insurance & Filings – Interactive Guide</h2>
        <div className="ins-flow-head-actions">
          {onClose && <button type="button" className="ins-btn ghost" onClick={onClose}>Back</button>}
          <button type="button" className="ins-btn" onClick={resetAll}>Reset</button>
        </div>
      </div>
      <p className="ins-intro">Minimum financial responsibility (49 CFR Part 387) depends on your role and operations. Use the path below to see what to file and what to prepare.</p>

      {/* Key change highlight */}
  <div className="ins-card info theme-selector">
        <h3 className="ins-h3">Key Login Change (Dec 2024 → now)</h3>
        <ul className="ins-list-disc">
          <li>Filers (insurers, sureties, BOC-3 blanket agents) use <a href="https://login.gov/" target="_blank" rel="noopener noreferrer">Login.gov</a> + FMCSA Portal (MFA) to reach L&amp;I e-Filer.</li>
          <li>Most BMC forms are filed by your insurer / surety — you monitor status in L&amp;I.</li>
        </ul>
        <div className="ins-link-row">
          <a className="ins-link-btn" href="https://login.gov/" target="_blank" rel="noopener noreferrer">Login.gov</a>
          <a className="ins-link-btn" href="https://portal.fmcsa.dot.gov/" target="_blank" rel="noopener noreferrer">FMCSA Portal</a>
          <a className="ins-link-btn" href="https://www.fmcsa.dot.gov/registration/licensing-and-insurance-electronic-filing-account" target="_blank" rel="noopener noreferrer">e‑Filer Instructions</a>
        </div>
      </div>

      {/* Role selection */}
  <div className="ins-card theme-selector">
        <h3 className="ins-h3">Who are you?</h3>
        <div className="ins-pills">
          {['carrier','broker','freight','filer'].map(r => (
            <button key={r} type="button" className={`ins-pill ${role===r?'active':''}`} onClick={()=>setRole(r)}>
              {r==='carrier' && 'Motor Carrier'}
              {r==='broker' && 'Broker'}
              {r==='freight' && 'Freight Forwarder'}
              {r==='filer' && 'Insurer / Surety / Agent Filer'}
            </button>
          ))}
        </div>
      </div>

      {/* Carrier branch */}
      {role==='carrier' && (
        <div className="ins-branch-grid">
          <div className="ins-branch-main">
            <div className="ins-card theme-carrier">
              <h4 className="ins-h4">Carrier Details</h4>
              <div className="ins-field">
                <div className="ins-label">1) Carrier type</div>
                <div className="ins-pills small">
                  <button type="button" className={`ins-pill ${carrierKind==='property'?'active':''}`} onClick={()=>setCarrierKind('property')}>Property</button>
                  <button type="button" className={`ins-pill ${carrierKind==='passenger'?'active':''}`} onClick={()=>setCarrierKind('passenger')}>Passenger</button>
                </div>
              </div>
              <div className="ins-field">
                <div className="ins-label">2) Interstate / foreign commerce?</div>
                <div className="ins-pills small">
                  <button type="button" className={`ins-pill ${interstate===true?'active':''}`} onClick={()=>setInterstate(true)}>Yes</button>
                  <button type="button" className={`ins-pill ${interstate===false?'active':''}`} onClick={()=>setInterstate(false)}>Intrastate only</button>
                </div>
                <p className="ins-hint">Intrastate only may have state variations; confirm local rules.</p>
              </div>
              {carrierKind==='passenger' && (
                <div className="ins-field">
                  <div className="ins-label">3) Seating capacity</div>
                  <div className="ins-pills small">
                    <button type="button" className={`ins-pill ${passengerSeats16Plus===false?'active':''}`} onClick={()=>setPassengerSeats16Plus(false)}>≤15</button>
                    <button type="button" className={`ins-pill ${passengerSeats16Plus===true?'active':''}`} onClick={()=>setPassengerSeats16Plus(true)}>16+</button>
                  </div>
                  <p className="ins-hint">Passenger minimums scale with seating (see FMCSA tables).</p>
                </div>
              )}
            </div>

            <TimelineStep n={1} title="Confirm minimum financial responsibility" subtitle="Part 387 amounts" variant="carrier">
              <p>Verify the minimum coverage your operation requires (seating & commodity can change amounts).</p>
              <div className="ins-link-row">
                <a className="ins-link-btn" href="https://www.fmcsa.dot.gov/registration/insurance-requirements" target="_blank" rel="noopener noreferrer">FMCSA Overview</a>
                <a className="ins-link-btn" href="https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-387" target="_blank" rel="noopener noreferrer">49 CFR 387</a>
                {carrierKind==='passenger' && <a className="ins-link-btn" href="https://www.fmcsa.dot.gov/safety/passenger-safety/passenger-carrier-minimum-insurance-requirements" target="_blank" rel="noopener noreferrer">Passenger Minimums</a>}
              </div>
            </TimelineStep>
            <TimelineStep n={2} title="Insurer e‑files BMC‑91/91X" subtitle="BI/PD liability" variant="carrier">
              <p>Your insurance company submits the form; you monitor status in L&amp;I.</p>
              <div className="ins-link-row">
                <a className="ins-link-btn" href="https://www.fmcsa.dot.gov/registration/licensing-and-insurance-electronic-filing-account" target="_blank" rel="noopener noreferrer">e‑Filer (Insurers)</a>
                <a className="ins-link-btn" href="https://portal.fmcsa.dot.gov/" target="_blank" rel="noopener noreferrer">Portal</a>
                <a className="ins-link-btn" href="https://li-public.fmcsa.dot.gov/" target="_blank" rel="noopener noreferrer">L&amp;I Lookup</a>
              </div>
            </TimelineStep>
            <TimelineStep n={3} title="Designate process agent (BOC‑3)" variant="carrier">
              <p>Process agent (or blanket company) files BOC‑3; brokers without CMVs may self‑file.</p>
              <div className="ins-link-row">
                <a className="ins-link-btn" href="https://www.fmcsa.dot.gov/registration/process-agents" target="_blank" rel="noopener noreferrer">About BOC‑3</a>
              </div>
            </TimelineStep>
            <TimelineStep n={4} title="Create accounts to view status" subtitle="Login.gov → Portal → L&I" variant="carrier">
              <p>Create / login to Login.gov then register Portal access to view L&amp;I docket filings.</p>
              <div className="ins-link-row">
                <a className="ins-link-btn" href="https://login.gov/" target="_blank" rel="noopener noreferrer">Login.gov</a>
                <a className="ins-link-btn" href="https://www.fmcsa.dot.gov/registration/fmcsa-portal" target="_blank" rel="noopener noreferrer">Portal Help</a>
              </div>
            </TimelineStep>
          </div>
          <aside className="ins-branch-side">
            <div className="ins-card theme-checklist-carrier">
              <h4 className="ins-h4">Carrier Checklist</h4>
              <ul className="ins-list-disc">
                {carrierChecklist.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="ins-card theme-tips">
              <h4 className="ins-h4">Tips</h4>
              <ul className="ins-list-disc">
                <li>Match legal name/address across all systems.</li>
                <li>Confirm correct form (BMC‑91 vs 91X).</li>
                <li>Wait for filings to show before operating.</li>
              </ul>
            </div>
          </aside>
        </div>
      )}

      {/* Broker branch */}
      {role==='broker' && (
        <div className="ins-branch-grid">
          <div className="ins-branch-main">
            <TimelineStep n={1} title="Choose financial responsibility" subtitle="$75K bond (BMC‑84) or trust (BMC‑85)" variant="broker">
              <div className="ins-link-row">
                <a className="ins-link-btn" href="https://www.fmcsa.dot.gov/registration/insurance-requirements/surety-bond-trust-fund-requirements-broker-freight-forwarder" target="_blank" rel="noopener noreferrer">Bond / Trust Details</a>
              </div>
            </TimelineStep>
            <TimelineStep n={2} title="Designate process agent (BOC‑3)" variant="broker">
              <p>Process agent files BOC‑3; maintain coverage for all states.</p>
              <div className="ins-link-row"><a className="ins-link-btn" href="https://www.fmcsa.dot.gov/registration/process-agents" target="_blank" rel="noopener noreferrer">About BOC‑3</a></div>
            </TimelineStep>
            <TimelineStep n={3} title="Create accounts to view L&I status" subtitle="Login.gov → Portal" variant="broker">
              <div className="ins-link-row">
                <a className="ins-link-btn" href="https://login.gov/" target="_blank" rel="noopener noreferrer">Login.gov</a>
                <a className="ins-link-btn" href="https://portal.fmcsa.dot.gov/" target="_blank" rel="noopener noreferrer">Portal</a>
                <a className="ins-link-btn" href="https://li-public.fmcsa.dot.gov/" target="_blank" rel="noopener noreferrer">L&amp;I Lookup</a>
              </div>
            </TimelineStep>
          </div>
          <aside className="ins-branch-side">
            <div className="ins-card"><h4 className="ins-h4">Broker Checklist</h4><ul className="ins-list-disc">{brokerChecklist.map(i=> <li key={i}>{i}</li>)}</ul></div>
          </aside>
        </div>
      )}

      {/* Freight Forwarder */}
      {role==='freight' && (
        <div className="ins-branch-grid">
          <div className="ins-branch-main">
            <div className="ins-card theme-freight">
              <h4 className="ins-h4">Operate CMVs for forwarding?</h4>
              <div className="ins-pills small">
                <button type="button" className={`ins-pill ${ffOperatesCMVs===true?'active':''}`} onClick={()=>setFfOperatesCMVs(true)}>Yes</button>
                <button type="button" className={`ins-pill ${ffOperatesCMVs===false?'active':''}`} onClick={()=>setFfOperatesCMVs(false)}>No</button>
              </div>
              <p className="ins-hint">Operating CMVs adds BI/PD (BMC‑91/91X) requirement.</p>
            </div>
            <TimelineStep n={1} title="Select bond or trust" subtitle="BMC‑84 or BMC‑85" variant="freight">
              <div className="ins-link-row"><a className="ins-link-btn" href="https://www.fmcsa.dot.gov/registration/insurance-requirements/surety-bond-trust-fund-requirements-broker-freight-forwarder" target="_blank" rel="noopener noreferrer">Bond / Trust Details</a></div>
            </TimelineStep>
            {ffOperatesCMVs && (
              <TimelineStep n={2} title="Have insurer e‑file BI/PD" subtitle="BMC‑91/91X" variant="freight">
                <div className="ins-link-row">
                  <a className="ins-link-btn" href="https://www.fmcsa.dot.gov/registration/licensing-and-insurance-electronic-filing-account" target="_blank" rel="noopener noreferrer">e‑Filer (Insurers)</a>
                  <a className="ins-link-btn" href="https://portal.fmcsa.dot.gov/" target="_blank" rel="noopener noreferrer">Portal</a>
                </div>
              </TimelineStep>
            )}
            <TimelineStep n={ffOperatesCMVs?3:2} title="Designate process agent" subtitle="BOC‑3" variant="freight">
              <div className="ins-link-row"><a className="ins-link-btn" href="https://www.fmcsa.dot.gov/registration/process-agents" target="_blank" rel="noopener noreferrer">About BOC‑3</a></div>
            </TimelineStep>
            <TimelineStep n={ffOperatesCMVs?4:3} title="Create accounts / view status" subtitle="Login.gov → Portal" variant="freight">
              <div className="ins-link-row">
                <a className="ins-link-btn" href="https://login.gov/" target="_blank" rel="noopener noreferrer">Login.gov</a>
                <a className="ins-link-btn" href="https://portal.fmcsa.dot.gov/" target="_blank" rel="noopener noreferrer">Portal</a>
                <a className="ins-link-btn" href="https://li-public.fmcsa.dot.gov/" target="_blank" rel="noopener noreferrer">L&amp;I Lookup</a>
              </div>
            </TimelineStep>
          </div>
          <aside className="ins-branch-side">
            <div className="ins-card"><h4 className="ins-h4">Freight Forwarder Checklist</h4><ul className="ins-list-disc">{ffChecklist.map(i=> <li key={i}>{i}</li>)}</ul></div>
          </aside>
        </div>
      )}

      {/* Filer */}
      {role==='filer' && (
        <div className="ins-branch-grid">
          <div className="ins-branch-main">
            <TimelineStep n={1} title="Create accounts" subtitle="Login.gov → Portal" variant="filer">
              <p>Register Login.gov then Portal with same email (select correct filer role).</p>
              <div className="ins-link-row">
                <a className="ins-link-btn" href="https://login.gov/" target="_blank" rel="noopener noreferrer">Login.gov</a>
                <a className="ins-link-btn" href="https://www.fmcsa.dot.gov/registration/fmcsa-portal" target="_blank" rel="noopener noreferrer">Portal Help</a>
              </div>
            </TimelineStep>
            <TimelineStep n={2} title="Request L&I e‑Filer access" subtitle="Submit activation" variant="filer">
              <p>Follow FMCSA guidance to enable e‑Filer then submit BMC / BOC‑3 forms.</p>
              <div className="ins-link-row">
                <a className="ins-link-btn" href="https://www.fmcsa.dot.gov/registration/licensing-and-insurance-electronic-filing-account" target="_blank" rel="noopener noreferrer">e‑Filer Instructions</a>
                <a className="ins-link-btn" href="https://portal.fmcsa.dot.gov/" target="_blank" rel="noopener noreferrer">Portal</a>
              </div>
            </TimelineStep>
            <TimelineStep n={3} title="Submit & verify filings" subtitle="Use L&I + Public Lookup" variant="filer">
              <div className="ins-link-row">
                <a className="ins-link-btn" href="https://li-public.fmcsa.dot.gov/" target="_blank" rel="noopener noreferrer">L&I Lookup</a>
                <a className="ins-link-btn" href="https://www.fmcsa.dot.gov/registration/insurance-requirements" target="_blank" rel="noopener noreferrer">Insurance Overview</a>
              </div>
            </TimelineStep>
          </div>
          <aside className="ins-branch-side">
            <div className="ins-card"><h4 className="ins-h4">Filer Checklist</h4><ul className="ins-list-disc">{filerChecklist.map(i=> <li key={i}>{i}</li>)}</ul></div>
          </aside>
        </div>
      )}

      {/* Footer resources */}
      <div className="ins-footer-links">
        <a className="ins-resource res-fm" href="https://www.fmcsa.dot.gov/registration/insurance-requirements" target="_blank" rel="noopener noreferrer"><span className="res-title">FMCSA Insurance Requirements</span><span className="res-desc">Official overview & forms</span></a>
        <a className="ins-resource res-387" href="https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-387" target="_blank" rel="noopener noreferrer"><span className="res-title">49 CFR Part 387</span><span className="res-desc">Minimum financial responsibility</span></a>
  <a className="ins-resource res-boc3" href="/boc-3" onClick={(e)=>{ e.preventDefault(); navigate('/boc-3')}}><span className="res-title">BOC‑3 Process Agents</span><span className="res-desc">Designation guidance</span></a>
      </div>
      <p className="ins-disclaimer">Always verify current requirements with FMCSA – amounts & processes can change.</p>
    </div>
  )
}

function TimelineStep({ n, title, subtitle, variant, children }) {
  return (
    <div className="ins-step">
      <div className="ins-step-index" aria-hidden="true">{n}</div>
  <div className={`ins-step-body ${variant?`theme-${variant}`:''}`}>
        <div className="ins-step-head">
          <strong>{title}</strong>{subtitle && <span className="ins-step-sub">{subtitle}</span>}
        </div>
        <div className="ins-step-content">{children}</div>
      </div>
    </div>
  )
}
