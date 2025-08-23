import React from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalHeader from '../../../components/GlobalHeader'
import './MedicalRequirements.css'

export default function Violations(){
  const navigate = useNavigate()
  const violations = [
    { id:1, title:'No Valid Medical Certificate on File', severity:'Not Out-of-Service', points:'+4 CSA (Driver Fitness BASIC)', detail:'Driver may continue trip if otherwise qualified; however carrier accrues points and must produce current MEC promptly. Maintain digital + wallet card and verify state record updates.' },
    { id:2, title:'Operating with Expired Medical Certificate', severity:'Out-of-Service', points:'+8 CSA (Driver Fitness BASIC)', detail:'Driver cannot drive a CMV until re-certified. Dispatch systems should block assignment upon expiration. Implement 90/60/30 + daily final week reminders.' },
    { id:3, title:'Failed to Carry Corrective Lenses / Hearing Aid', severity:'Violation', points:'+2 CSA', detail:'Restriction codes require corrective devices while driving. Treat as preventable; training and pre-trip self-check reduce recurrence.' },
    { id:4, title:'Unreported Disqualifying Condition', severity:'Serious', points:'+8 CSA potential', detail:'Conditions like uncontrolled seizures, syncope episodes, or recent MI without clearance render driver medically unqualified until evaluated.' },
    { id:5, title:'Using Disqualifying Substance / Refusal', severity:'Immediate Removal', points:'Varies (Drug & Alcohol rules)', detail:'Outside scope of standard medical exam but intersects with qualification; strict removal and SAP process apply.' }
  ]
  return (
    <div className="med-page" data-page="medical-violations">
      <GlobalHeader />
      <header className="container med-hero" aria-labelledby="violations-title">
        <div className="med-hero-inner">
          <h1 id="violations-title">Medical Violations & Prevention</h1>
          <p className="lead">Understand which issues trigger points versus out-of-service so you can prioritize monitoring and proactive renewals.</p>
          <div className="med-backbar"><button className="med-back-btn" onClick={()=>navigate('/medical-requirements')}>← Back to Medical Requirements</button></div>
        </div>
      </header>
      <main className="container med-section" aria-label="Violations List">
        <div className="viol-grid">
          {violations.map(v => (
            <article key={v.id} className="viol-card" aria-labelledby={`viol-${v.id}-h`}> 
              <header className="viol-card-head">
                <h2 id={`viol-${v.id}-h`}>{v.id}. {v.title}</h2>
                <span className={`viol-badge ${v.severity.includes('Out-of-Service')?'is-oos':'is-info'}`}>{v.severity}</span>
              </header>
              <p className="viol-meta"><strong>Impact:</strong> {v.points}</p>
              <p>{v.detail}</p>
            </article>
          ))}
        </div>
        <section className="med-section" aria-labelledby="prevent-h">
          <h2 id="prevent-h">Prevention Program Essentials</h2>
          <ul className="med-bullets">
            <li><strong>Automated expiry tracking:</strong> Block dispatch once expired to avoid OOS moves.</li>
            <li><strong>Evidence vault:</strong> Store MEC, specialist letters, CPAP data for instant roadside / audit retrieval.</li>
            <li><strong>Driver education:</strong> Clarify difference between point-only vs OOS violations to drive urgency.</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
