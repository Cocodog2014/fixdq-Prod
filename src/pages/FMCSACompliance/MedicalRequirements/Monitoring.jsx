import React from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalHeader from '../../../components/GlobalHeader'
import './MedicalRequirements.css'

export default function Monitoring(){
  const navigate = useNavigate()
  const items = [
    { title:'Standard Max 24 Months', detail:'Full 24‑month certification only when no monitored conditions (well-controlled, low risk).' },
    { title:'Shorter Terms (3 / 6 / 12)', detail:'Hypertension stages, diabetes, OSA, cardiac events often receive limited cards requiring re-evaluation.' },
    { title:'90 / 60 / 30 Day Tracking', detail:'Automated reminders reduce lapse risk; escalate urgency as expiration approaches.' },
    { title:'Condition Data Collection', detail:'Collect BP logs, A1C results, CPAP compliance, cardiology reports ahead of renewal.' },
    { title:'State / Carrier Updates', detail:'Some states require status updates or risk CDL downgrade notices if certificate expires.' },
    { title:'Post-Event Rechecks', detail:'After hospitalization, MI, surgery, or med changes, requalification may be required before driving.' }
  ]
  return (
    <div className="med-page" data-page="medical-monitoring">
      <GlobalHeader />
      <header className="container med-hero" aria-labelledby="monitoring-title">
        <div className="med-hero-inner">
          <h1 id="monitoring-title">Monitoring & Validity Management</h1>
          <p className="lead">How to track certification cycles, manage limited cards, and prevent lapses that trigger violations or downgrades.</p>
          <div className="med-backbar"><button className="med-back-btn" onClick={()=>navigate('/medical-requirements')}>← Back to Medical Requirements</button></div>
        </div>
      </header>
      <main className="container med-section" aria-label="Monitoring Concepts">
        <div className="monitor-grid">
          {items.map(it => (
            <div key={it.title} className="monitor-card">
              <h2>{it.title}</h2>
              <p>{it.detail}</p>
            </div>
          ))}
        </div>
        <section className="med-section" aria-labelledby="mon-next">
          <h2 id="mon-next">Building a Monitoring Program</h2>
          <ul className="med-bullets">
            <li><strong>Central dashboard:</strong> Maintain expiration dates, condition flags, and required follow-up documents.</li>
            <li><strong>Escalating reminders:</strong> 90/60/30 → daily last 7 days → lockout if expired.</li>
            <li><strong>Evidence capture:</strong> Upload scans of MEC, specialist clearances, CPAP reports for audit readiness.</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
