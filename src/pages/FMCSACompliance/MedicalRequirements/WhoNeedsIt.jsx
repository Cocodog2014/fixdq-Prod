import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalHeader from '../../../components/GlobalHeader'
import '../MedicalRequirements/MedicalRequirements.css'
import './WhoNeedsIt.css'

export default function WhoNeedsIt() {
  const navigate = useNavigate()
  return (
    <div className="who-page med-page" data-page="medical-who-needs">
      <GlobalHeader />
      <header className="container who-hero" aria-labelledby="who-needs-title">
        <h1 id="who-needs-title">Who Needs a DOT Medical Exam?</h1>
        <p className="lead">Determine whether you (or your drivers) must hold a valid Medical Examiner's Certificate (MEC) under FMCSA rules or state‑adopted equivalents.</p>
        <div className="who-backbar">
          <button className="med-back-btn" onClick={() => navigate('/medical-requirements')}>← Back to Medical Requirements</button>
        </div>
      </header>

      <main className="container who-section" aria-label="Eligibility Details">
        <ul className="med-bullets">
          <li>Drivers operating a <strong>commercial motor vehicle (CMV) in interstate commerce</strong> that requires a CDL (Class A, B, or C with endorsements).</li>
          <li>Certain <strong>non‑CDL CMVs ≥ 10,001 lbs. GVWR/GCWR</strong> engaged in interstate commerce (state adoption varies).</li>
          <li><strong>Passenger-carrying</strong> (9–15 for compensation, or 16+ passengers including driver) and <strong>hazmat placarded</strong> operations subject to Part 391.</li>
          <li><strong>School bus and shuttle</strong> drivers when state or district adopts FMCSR medical standards.</li>
          <li><strong>Intrastate only</strong> operations: follow your state's medical certification adoption (many mirror federal standards; some allow intrastate-only medical waivers).</li>
        </ul>
        <p className="note">Limited exemptions may apply (e.g., certain farm vehicle drivers, occasional emergency response, or covered farm vehicles). Always confirm with your state DMV and carrier policy before assuming exemption.</p>

        <section className="who-callouts">
            <div className="panel panel--glass-dark" aria-labelledby="flow-title">
              <h2 id="flow-title">Interactive Quick Self‑Check</h2>
              <DecisionFlow />
            </div>
          <div className="panel panel--solid-light">
            <h3>Common Misunderstandings</h3>
            <ul className="who-misunderstandings">
              <li>"I only drive part-time" – Part-time CMV drivers still need qualification.</li>
              <li>"We stay within one state" – Intrastate may still require it if state adopted 391.</li>
              <li>"My truck is 9,900 lbs but trailer pushes us over" – Combined GCWR counts.</li>
              <li>"I’m exempt because of farm plates" – Only specific covered farm use qualifies.</li>
            </ul>
          </div>
        </section>

        <section className="who-next">
          <h2>Next Steps</h2>
            <p>If you determine a medical exam is required, schedule with a <strong>NRCME certified examiner</strong> and gather your documentation (medications, corrective lenses, CPAP compliance, prior MEC). Then continue to the <button className="inline-link" onClick={() => navigate('/medical-requirements/certification-flow')}>Certification Flow</button>.</p>
        </section>
      </main>
    </div>
  )
    function DecisionFlow() {
      const steps = [
        { id: 'interstate', question: 'Do you cross a state line OR haul freight under an interstate bill of lading/contract? (Interstate commerce)', yes: 'need-mec', no: 'weight' },
        { id: 'weight', question: 'Is the power unit or combination (GCWR) ≥ 10,001 lbs?', help: 'Use manufacturer GVWR values, not current scale weight.', yes: 'need-mec', no: 'passenger' },
        { id: 'passenger', question: 'Do you transport passengers (9–15 for compensation OR 16+ including driver)?', yes: 'need-mec', no: 'hazmat' },
        { id: 'hazmat', question: 'Do you haul placarded hazardous materials?', yes: 'need-mec', no: 'intrastate' },
        { id: 'intrastate', question: 'Purely intrastate AND below state threshold / qualified exemption?', yes: 'maybe-exempt', no: 'need-mec' }
      ]
      const [history, setHistory] = useState([])
      const [currentId, setCurrentId] = useState(steps[0].id)
      const current = steps.find(s => s.id === currentId)
      const terminal = ['need-mec', 'maybe-exempt'].includes(currentId)
      function go(answer) { if (!terminal) { const next = current[answer]; setHistory(h => [...h, currentId]); setCurrentId(next) } }
      function restart() { setHistory([]); setCurrentId(steps[0].id) }
      function back() { setHistory(h => { if (!h.length) return h; const copy = [...h]; const prev = copy.pop(); setCurrentId(prev); return copy }) }
      return (
        <div className="flow" data-step={currentId}>
          {!terminal && (
            <>
              <p className="flow-q"><strong>Q:</strong> {current.question}</p>
              {current.help && <p className="flow-help">{current.help}</p>}
              <div className="flow-actions">
                <button type="button" className="flow-btn yes" onClick={() => go('yes')}>Yes</button>
                <button type="button" className="flow-btn no" onClick={() => go('no')}>No</button>
              </div>
            </>
          )}
          {currentId === 'need-mec' && (
            <div className="flow-result need">
              <h3>You Likely Need a MEC</h3>
              <ul>
                  <li>Proceed to <button className="inline-link" onClick={() => navigate('/medical-requirements/certification-flow')}>Certification Flow</button></li>
                <li>Begin gathering medical documents now.</li>
              </ul>
            </div>
          )}
          {currentId === 'maybe-exempt' && (
            <div className="flow-result maybe">
              <h3>Potential Intrastate / Limited Exemption</h3>
              <p>Confirm state adoption & retain proof of exemption criteria (e.g., covered farm vehicle, intrastate waiver).</p>
            </div>
          )}
          <div className="flow-nav">
            <button type="button" className="flow-small" onClick={back} disabled={!history.length}>Back</button>
            <button type="button" className="flow-small" onClick={restart}>Restart</button>
          </div>
        </div>
      )
    }
}
