import React from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalHeader from '../../../components/GlobalHeader'
import './MedicalRequirements.css'
import './CertificationLanding.css'

export default function CertificationLanding(){
  const navigate = useNavigate()
  return (
    <div className="med-page cert-page" data-page="medical-certification">
      <GlobalHeader />
      <header className="container med-hero" aria-labelledby="cert-title">
        <div className="med-hero-inner">
          <h1 id="cert-title">Certification Process</h1>
          <p className="lead">Step-by-step: scheduling, exam expectations, documentation, validity periods, and managing renewals proactively.</p>
          <div className="med-backbar">
            <button className="med-back-btn" onClick={()=>navigate('/medical-requirements')}>← Medical Requirements</button>
          </div>
        </div>
      </header>
      <main className="container cert-body" aria-label="Certification Steps">
        <ol className="med-steps">
          <li><strong>Book with NRCME Examiner:</strong> Only providers listed in the National Registry may issue a valid MEC.</li>
          <li><strong>Prepare Documentation:</strong> Photo ID, medication list (dose/freq), prior MEC, corrective lenses, CPAP compliance (≥70% nights &gt;4 hrs), condition specialist letters.</li>
          <li><strong>Exam Components:</strong> History, vitals, height/weight, vision & hearing, urinalysis (not drug test), focused exam of body systems, review of chronic condition control.</li>
          <li><strong>Determination:</strong> Examiner issues MEC (up to 24 mo) or shorter monitoring interval; may request additional records or temporary disqualification pending data.</li>
          <li><strong>Carrier / State Recording:</strong> Submit to state if required; carrier logs in qualification file. Monitor expiration at 90/60/30 day checkpoints.</li>
        </ol>
        <section className="panel panel--solid-light cert-tips">
          <h2>Optimization Tips</h2>
          <ul className="med-bullets">
            <li>Bring recent BP logs if hypertension history; white coat spikes cause short cards.</li>
            <li>Maintain CPAP download access (SD card / portal) before appointment.</li>
            <li>Avoid large caffeine / nicotine right before vitals.</li>
            <li>Label all prescription containers clearly; keep list updated.</li>
            <li>Schedule renewal 45–60 days before expiration.</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
