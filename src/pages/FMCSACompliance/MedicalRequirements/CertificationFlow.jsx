import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalHeader from '../../../components/GlobalHeader'
import './MedicalRequirements.css'

export default function CertificationFlow(){
  const navigate = useNavigate()
  const steps = [
    {
      id: 'schedule',
      title: 'Schedule Exam',
      short: 'Book with NRCME certified examiner.',
      detail: 'Schedule with a FMCSA National Registry (NRCME) Certified Medical Examiner. Verify they are active on the registry.'
    },
    {
      id: 'prepare',
      title: 'Prepare Docs',
      short: 'Gather ID, meds, prior MEC, corrections.',
      detail: 'Photo ID, full medication list (name / dose / frequency), prior MEC, vision correction, CPAP compliance data (if applicable), specialist clearances.'
    },
    {
      id: 'exam',
      title: 'Exam Day',
      short: 'History, vitals, vision & hearing, urine.',
      detail: 'History interview, vitals (BP / pulse), vision & hearing tests, urinalysis (not drug test), focused assessments for conditions.'
    },
    {
      id: 'conditional',
      title: 'Conditional Card?',
      short: 'May shorten for monitored conditions.',
      detail: 'Examiner may issue shorter-term card (3 / 6 / 12 mo) if monitoring required (hypertension, diabetes, OSA, cardiac).'
    },
    {
      id: 'issuance',
      title: 'Certificate Issued',
      short: 'MEC up to 24 months (or limited).',
      detail: 'Qualified drivers receive Medical Examiner\'s Certificate (MEC) valid up to 24 months unless limited by condition.'
    },
    {
      id: 'carrier',
      title: 'Carrier / State File',
      short: 'Record & update status reminders.',
      detail: 'Upload / submit status per state rules; update driver qualification file; configure 90 / 60 / 30 day automated reminders.'
    },
    {
      id: 'follow',
      title: 'Follow-Up',
      short: 'Track labs, compliance data.',
      detail: 'Track pending specialty reports, CPAP usage, A1C results and set next renewal planning earlier if monitored.'
    }
  ]

  const storageKey = 'certFlowChecklist'
  const [done, setDone] = useState(()=>{
    try { return JSON.parse(localStorage.getItem(storageKey)) || {} } catch { return {} }
  })
  useEffect(()=>{ localStorage.setItem(storageKey, JSON.stringify(done)) },[done])
  const completed = Object.values(done).filter(Boolean).length
  function toggle(id){ setDone(d => ({...d, [id]: !d[id]})) }
  function reset(){ if(window.confirm('Reset checklist progress?')) setDone({}) }

  return (
    <div className="med-page" data-page="medical-cert-flow">
      <GlobalHeader />
      <header className="container med-hero" aria-labelledby="cert-title">
        <div className="med-hero-inner">
          <h1 id="cert-title">Certification Flow</h1>
          <p className="lead">Step-by-step DOT medical exam process from scheduling to carrier recordkeeping.</p>
          <div className="med-backbar"><button className="med-back-btn" onClick={()=>navigate('/medical-requirements')}>← Back to Medical Requirements</button></div>
        </div>
      </header>
      <main className="container" aria-label="Certification Flow Content">
        {/* Grid Overview */}
        <section className="cert-grid-section" aria-labelledby="grid-head">
          <h2 id="grid-head" className="visually-hidden">Flow Overview</h2>
          <div className="cert-grid">
            {steps.map((s,i)=>(
              <div key={s.id} className={`cert-card ${done[s.id] ? 'is-done': ''}`}> 
                <div className="cert-step-num">{i+1}</div>
                <h3>{s.title}</h3>
                <p className="cert-short">{s.short}</p>
                <p className="cert-detail">{s.detail}</p>
                <button type="button" className="cert-check-toggle" onClick={()=>toggle(s.id)} aria-pressed={!!done[s.id]}>
                  {done[s.id] ? '✓ Completed' : 'Mark Done'}
                </button>
              </div>
            ))}
          </div>
        </section>
        {/* Interactive Checklist */}
        <section className="cert-checklist-section med-section" aria-labelledby="check-head">
          <div className="cert-checklist-head">
            <h2 id="check-head">Interactive Checklist</h2>
            <div className="cert-progress" aria-live="polite">{completed} / {steps.length} complete</div>
          </div>
          <ul className="cert-checklist" role="list">
            {steps.map(s => (
              <li key={s.id} className={done[s.id] ? 'done': ''}>
                <label className="cert-chk-label">
                  <input type="checkbox" checked={!!done[s.id]} onChange={()=>toggle(s.id)} />
                  <span className="cert-chk-text"><strong>{s.title}:</strong> {s.detail}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className="cert-actions">
            <button type="button" className="cert-reset" onClick={reset}>Reset Progress</button>
          </div>
        </section>
        <section className="med-section" aria-labelledby="tips-head">
          <h2 id="tips-head">Pro Tips</h2>
          <ul className="med-bullets">
            <li>Enter meds into a simple printed list (name, dose, frequency).</li>
            <li>Bring most recent A1C (diabetes) and CPAP compliance printout (last 90 days).</li>
            <li>Schedule early (45–60 days prior) if you have monitored conditions needing labs.</li>
            <li>Log blood pressure readings if white coat hypertension is suspected.</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
