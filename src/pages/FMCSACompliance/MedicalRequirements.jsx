import React from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalHeader from '../../components/GlobalHeader'
import './MedicalRequirements.css'

export default function MedicalRequirements() {
  const navigate = useNavigate()
  return (
    <div className="med-page" data-page="medical-requirements">
      <GlobalHeader />
      <section className="container med-hero" aria-labelledby="med-title">
        <h1 id="med-title">DOT Medical Requirements</h1>
        <p className="lead">Understand when a Medical Examiner's Certificate (MEC) is required, key qualification standards, disqualifying / monitored conditions, and how to stay compliant.</p>
        <div className="med-backbar">
          <button type="button" className="med-back-btn" onClick={() => navigate('/fmcsa-compliance')} aria-label="Back to FMCSA Compliance">← Back to FMCSA Compliance</button>
        </div>
      </section>

      <section className="container med-section" aria-labelledby="who-needs">
        <h2 id="who-needs">Who Needs a DOT Medical Exam?</h2>
        <ul className="med-bullets">
          <li>Drivers operating a <strong>commercial motor vehicle (CMV) in interstate commerce</strong> that requires a CDL (Class A, B, or C with endorsements).</li>
          <li>Certain <strong>non‑CDL CMVs ≥ 10,001 lbs. GVWR/GCWR</strong> engaged in interstate commerce (state adoption varies).</li>
          <li>School bus, passenger, or hazmat drivers subject to Part 391 qualification rules.</li>
          <li>Intrastate only: follow state adoption of FMCSR—many mirror federal medical standards.</li>
        </ul>
        <p className="note">Farm or occasional use exemptions may apply in limited cases; always confirm with state DMV + carrier policy.</p>
      </section>

      <section className="container med-section" aria-labelledby="process">
        <h2 id="process">Certification Process</h2>
        <ol className="med-steps">
          <li>Schedule with a <strong>FMCSA National Registry (NRCME) Certified Medical Examiner</strong>.</li>
          <li>Bring photo ID, medication list (dosages), vision correction, CPAP compliance data (if applicable), and prior MEC if renewing.</li>
          <li>Exam evaluates history, vitals, vision, hearing, urinalysis (not drug screen), and condition management documentation.</li>
          <li>If qualified, examiner issues a Medical Examiner's Certificate (MEC) with validity period (up to 24 months).</li>
          <li>Carrier (or state licensing agency) must retain / record status; CDL downgrade can occur if certificate lapses.</li>
        </ol>
      </section>

      <section className="container med-section" aria-labelledby="standards">
        <h2 id="standards">Key Qualification Standards</h2>
        <div className="med-grid">
          <div className="med-card">
            <h3>Vision</h3>
            <p>At least <strong>20/40</strong> in each eye (corrected okay) and field of vision ≥ 70° in each eye; ability to recognize standard traffic signal colors (red, green, amber). Vision exemption / alternative standard possible.</p>
          </div>
          <div className="med-card">
            <h3>Hearing</h3>
            <p>Forced whisper test at &le;5 feet in one ear OR audiometric average &le;40 dB. Hearing aids permissible—carry spare batteries.</p>
          </div>
          <div className="med-card">
            <h3>Blood Pressure</h3>
            <p>&lt;140/90: up to 24-month cert. Stage 1 (140–159/90–99): 1-year. Stage 2 (160–179/100–109): one-time 3-month to reduce. Stage 3 (≥180/110): disqualified until controlled.</p>
          </div>
          <div className="med-card">
            <h3>Diabetes (Insulin)</h3>
            <p>Insulin-treated allowed with treating clinician form + stability; monitor for severe hypoglycemia episodes. Provide A1C & logs as requested.</p>
          </div>
          <div className="med-card">
            <h3>Sleep Apnea</h3>
            <p>Moderate/severe OSA must show effective treatment (CPAP usage &gt;4 hrs/night on ≥70% nights). Non‑compliance risks disqualification.</p>
          </div>
          <div className="med-card">
            <h3>Cardiac</h3>
            <p>Post MI, stent, CABG, or arrhythmia requires waiting periods, cardiologist clearance, stress testing intervals as per guidance.</p>
          </div>
        </div>
      </section>

      <section className="container med-section" aria-labelledby="conditions">
        <h2 id="conditions">Disqualifying / Conditional Conditions</h2>
        <ul className="med-bullets">
          <li><strong>Epilepsy (uncontrolled seizures):</strong> Generally disqualifying without an exemption.</li>
          <li><strong>Insulin shock / severe hypoglycemic episodes:</strong> Needs evaluation and stability period.</li>
          <li><strong>Vision / hearing below standards</strong> without exemption or corrective measures.</li>
          <li><strong>Unmanaged cardiovascular disease</strong> (recent MI without clearance, uncontrolled arrhythmias).</li>
          <li><strong>Substance abuse / positive tests</strong> without successful treatment & follow-up program.</li>
        </ul>
        <p className="note">Exemptions exist for certain drivers meeting alternative criteria (vision, diabetes). Maintain documentation onboard if required.</p>
      </section>

      <section className="container med-section" aria-labelledby="monitoring">
        <h2 id="monitoring">Monitoring & Expiration</h2>
        <ul className="med-bullets">
          <li><strong>Standard maximum validity:</strong> 24 months.</li>
          <li><strong>More frequent (3, 6, or 12 months)</strong> if condition requires monitoring (hypertension, diabetes, OSA, cardiac recovery).</li>
          <li>Carrier best practice: track expirations at <strong>90 / 60 / 30 days</strong> out; remove from dispatch if expired.</li>
          <li>Upload status to state (if state requires) to prevent CDL downgrade notices.</li>
        </ul>
      </section>

      <section className="container med-section" aria-labelledby="violations">
        <h2 id="violations">Common Violations & Prevention</h2>
        <ul className="med-bullets">
          <li><strong>No valid MEC on file:</strong> Keep digital + wallet card; verify DMV record reflects status.</li>
          <li><strong>Expired hypertension short-term card:</strong> Set calendar alerts + carrier dashboard monitoring.</li>
          <li><strong>Failure to carry corrective lenses / hearing aids:</strong> Follow restriction codes.</li>
          <li><strong>Operating with disqualifying untreated condition:</strong> Report changes (syncope, chest pain) immediately.</li>
        </ul>
      </section>

      <section className="container med-section" aria-labelledby="links">
        <h2 id="links">Helpful Links</h2>
        <ul className="med-links">
          <li><a href="https://nationalregistry.fmcsa.dot.gov/NRPublicUI/home.seam" target="_blank" rel="noopener noreferrer">National Registry (Find Examiner)</a></li>
          <li><a href="https://www.fmcsa.dot.gov/medical/driver-medical-requirements/medical-requirements" target="_blank" rel="noopener noreferrer">FMCSA: Medical Requirements</a></li>
          <li><a href="https://www.fmcsa.dot.gov/regulations/medical" target="_blank" rel="noopener noreferrer">FMCSA Medical Programs</a></li>
          <li><a href="https://www.fmcsa.dot.gov/regulations/medical/diabetes" target="_blank" rel="noopener noreferrer">Diabetes Standard / Forms</a></li>
        </ul>
        <p className="note">This guide is informational and not a substitute for official FMCSR or medical professional judgment.</p>
      </section>
    </div>
  )
}
