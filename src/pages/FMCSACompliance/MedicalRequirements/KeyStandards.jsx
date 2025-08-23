import React from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalHeader from '../../../components/GlobalHeader'
// Shared base styles in MedicalRequirements.css; page-specific styles in KeyStandards.css (imported via global.css)
// Base styles already loaded via global.css; avoid re-importing MedicalRequirements.css to prevent overriding KeyStandards gradients.

export default function KeyStandards(){
  const navigate = useNavigate()
  return (
    <div className="med-page" data-page="medical-key-standards">
      <GlobalHeader />
      <header className="container med-hero" aria-labelledby="ks-title">
        <div className="med-hero-inner">
          <h1 id="ks-title">Key Qualification Standards</h1>
          <p className="lead">Core physical qualification areas evaluated in the DOT medical exam.</p>
          <div className="med-backbar"><button className="med-back-btn" onClick={()=>navigate('/medical-requirements')}>← Back to Medical Requirements</button></div>
        </div>
      </header>
      <main className="container med-section" aria-label="Key Standards Grid">
        <div className="key-standards-grid standards-grid">
          <div className="med-card standard ks-vision"><h2>Vision</h2><p>At least 20/40 acuity (corrected or uncorrected) in each eye & both eyes, horizontal field ≥70° each eye, ability to recognize red/green/amber. New alternative vision standard allows monocular drivers meeting specific parameters + annual eye & medical examiner eval.</p></div>
          <div className="med-card standard ks-hearing"><h2>Hearing</h2><p>Whisper test at ≥5 ft in one ear or audiometric criteria (≤40 dB average at 500/1000/2000 Hz in better ear). Hearing aids permitted; must be used while driving if needed to meet standard.</p></div>
          <div className="med-card standard ks-bp"><h2>Blood Pressure</h2><p>Normal (&lt;140/90) – 24 mo. Stage 1 (140–159/90–99) – 12 mo. Stage 2 (160–179/100–109) – 3 mo one-time; must reduce to &lt;140/90. Stage 3 (≥180/110) – disqualifying until controlled (&lt;140/90), then 6 mo intervals.</p></div>
          <div className="med-card standard ks-diabetes"><h2>Diabetes</h2><p>Insulin-treated drivers need treating clinician assessment (ITDM MCSA-5870). Must demonstrate stable regimen & control (recent A1C typically ≤10, no severe hypoglycemia events). Oral meds assessed for complications & hypoglycemia risk.</p></div>
          <div className="med-card standard ks-osa"><h2>Sleep Apnea</h2><p>Moderate–severe OSA requires effective treatment (e.g., CPAP). Compliance usually ≥4 hrs/night on ≥70% nights. Untreated or non-compliant moderate/severe OSA generally disqualifying until controlled.</p></div>
          <div className="med-card standard ks-cardio"><h2>Cardiovascular</h2><p>Post-MI, stent, CABG, or certain arrhythmias require waiting periods, specialist clearance, functional capacity, and possible stress testing. Anticoagulation must be stable (e.g., INR range if warfarin).</p></div>
          <div className="med-card standard ks-neuro"><h2>Neurological</h2><p>Seizure disorders, TBI with LOC, or CVA require defined seizure-free / deficit-free intervals. Some conditions may need exemption program (e.g., epilepsy) or specialist neurology evaluation.</p></div>
          <div className="med-card standard ks-substance"><h2>Substance Use</h2><p>No current diagnosis of alcoholism or uncontrolled substance use disorder. Schedule I drugs disqualifying. Controlled meds (opioids, benzos, stimulants) need prescribing provider stability & no impairment.</p></div>
          <div className="med-card standard ks-psych"><h2>Psychiatric</h2><p>Stable mood, anxiety, or ADHD disorders generally acceptable if treatment doesn’t impair. Severe disorders (psychosis, suicidal behavior) require documentation of stability and possibly specialist input.</p></div>
          <div className="med-card standard ks-exempt"><h2>Vision & Hearing Exemptions</h2><p>Legacy federal exemption programs replaced for vision by alternative standard; hearing exemption still exists for drivers not meeting hearing threshold but otherwise safe—requires periodic reevaluation.</p></div>
        </div>
        <section className="med-section" aria-labelledby="next-links">
          <h2 id="next-links">Next Steps</h2>
          <p>See the detailed <button className="inline-link" onClick={()=>navigate('/medical-requirements/certification-flow')}>Certification Flow</button> or return to the <button className="inline-link" onClick={()=>navigate('/medical-requirements/who-needs')}>Who Needs It</button> page.</p>
        </section>
      </main>
    </div>
  )
}
