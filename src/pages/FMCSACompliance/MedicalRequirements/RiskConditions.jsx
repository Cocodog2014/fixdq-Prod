import React from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalHeader from '../../../components/GlobalHeader'
import './MedicalRequirements.css'

export default function RiskConditions(){
  const navigate = useNavigate()
  const risks = [
    { title:'Epilepsy / Seizure Disorders', desc:'Active, uncontrolled seizures generally disqualify. Seizure-free intervals or exemptions required depending on history.'},
    { title:'Severe Hypoglycemic Episodes', desc:'Recent insulin shock or episodes causing loss of consciousness/disorientation need evaluation and stability before qualification.'},
    { title:'Vision / Hearing Below Standard', desc:'Failure to meet acuity, field, or hearing thresholds without exemption/corrective measures.'},
    { title:'Unmanaged Cardiovascular Disease', desc:'Recent MI without clearance, unstable angina, uncontrolled arrhythmias, symptomatic heart failure.'},
    { title:'Obstructive Sleep Apnea (Untreated)', desc:'Moderate–severe OSA without effective treatment & documented compliance elevates crash risk.'},
    { title:'Poorly Controlled Hypertension', desc:'Stage 2/3 BP without improvement; repeated short-term cards signal inadequate management.'},
    { title:'Substance Abuse / Positive Tests', desc:'Current alcoholism, illicit drug use, or misuse of controlled meds without successful treatment & monitoring.'},
    { title:'Neurological Deficits', desc:'Post-stroke, TBI with lingering deficits affecting reaction time, coordination, cognition.'},
    { title:'Severe Psychiatric Instability', desc:'Psychosis, severe mood instability, suicidal behavior without documented stability.'},
    { title:'Medication Impairment Risk', desc:'Sedating meds (opioids, benzos) or polypharmacy causing drowsiness or slowed reaction.'},
  ]
  return (
    <div className="med-page" data-page="medical-risk-conditions">
      <GlobalHeader />
      <header className="container med-hero" aria-labelledby="risk-title">
        <div className="med-hero-inner">
          <h1 id="risk-title">Disqualifying & Conditional Risk Conditions</h1>
          <p className="lead">Key medical situations that can disqualify or restrict a driver until properly evaluated, treated, and documented.</p>
          <div className="med-backbar"><button className="med-back-btn" onClick={()=>navigate('/medical-requirements')}>← Back to Medical Requirements</button></div>
        </div>
      </header>
      <main className="container med-section" aria-label="Risk Condition Grid">
        <div className="risk-grid">
          {risks.map(r => (
            <div key={r.title} className="risk-card">
              <h2>{r.title}</h2>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
        <section className="med-section" aria-labelledby="risk-next">
          <h2 id="risk-next">Next Steps</h2>
          <ul className="med-bullets">
            <li>Gather specialist reports (cardiology, neurology, endocrinology) early for monitored conditions.</li>
            <li>Document treatment compliance (CPAP data, BP logs, A1C labs) before renewal.</li>
            <li>Use proactive reminders to avoid last‑minute disqualification surprises.</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
