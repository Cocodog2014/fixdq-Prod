import React from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalHeader from '../../../components/GlobalHeader'
import './MedicalRequirements.css'

export default function OfficialLinks(){
  const navigate = useNavigate()
  const sections = [
    {
      id:'core',
      title:'Core FMCSA Medical Resources',
      links:[
        {label:'FMCSA: Driver Medical Fitness for Duty (Overview)', url:'https://www.fmcsa.dot.gov/medical/driver-medical-requirements/driver-medical-fitness-duty'},
        {label:'FMCSA Medical Programs (Portal)', url:'https://www.fmcsa.dot.gov/regulations/medical'},
        {label:'National Registry (Find Certified Examiner)', url:'https://nationalregistry.fmcsa.dot.gov/search-medical-examiners'},
        {label:'Medical Advisory Criteria / Guidance', url:'https://www.fmcsa.dot.gov/regulations/medical/medical-regulations-and-guidance-resource-links'}
      ]
    },
    {
      id:'conditions',
      title:'Condition-Specific Standards & Forms',
      links:[
        {label:'Diabetes Standard & Forms', url:'https://www.fmcsa.dot.gov/medical/driver-medical-requirements/qualifications-drivers-diabetes-standard-83-fr-47486-sept-19'},
        {label:'Vision Evaluation Report (Form MCSA-5871)', url:'https://www.fmcsa.dot.gov/regulations/medical/vision-evaluation-report-form-mcsa-5871'},
        {label:'Seizure / Epilepsy Guidance', url:'https://www.fmcsa.dot.gov/medical/driver-medical-requirements/new-seizure-applicant-doc-email-version'},
        {label:'Cardiovascular Guidance', url:'https://www.fmcsa.dot.gov/regulations/medical/cardiovascular-advisory-panel-guidelines-medical-examination-commercial-motor'}
      ]
    },
    {
      id:'forms',
      title:'Common Medical Forms',
      links:[
        {label:'Medical Examination Report (MCSA-5875)', url:'https://www.fmcsa.dot.gov/regulations/medical/medical-examination-report-form-commercial-driver-medical-certification'},
        {label:'Medical Examiner Certificate (MEC) (MCSA-5876)', url:'https://www.fmcsa.dot.gov/regulations/medical/medical-examiners-certificate-commercial-driver-medical-certification'},
        {label:'Insulin-Treated Diabetes Mellitus Assessment (MCSA-5870)', url:'https://www.fmcsa.dot.gov/regulations/medical/insulin-treated-diabetes-mellitus-assessment-form-mcsa-5870'},
        {label:'Skill Performance Evaluation (SPE) Program', url:'https://www.fmcsa.dot.gov/medical/driver-medical-requirements/skill-performance-evaluation-certificate-program'}
      ]
    },
    {
      id:'state',
      title:'State & Administrative',
      links:[
        {label:'State Resources & Programs', url:'https://www.fmcsa.dot.gov/registration/commercial-drivers-license/state-resources-and-programs'},
        {label:'CDL Downgrade / Medical Certification FAQ', url:'https://www.fmcsa.dot.gov/faq?keywords=medical%20certificate'},
        {label:'Drug & Alcohol Clearinghouse', url:'https://clearinghouse.fmcsa.dot.gov/'}
      ]
    }
  ]
  return (
    <div className="med-page" data-page="medical-official-links">
      <GlobalHeader />
      <header className="container med-hero" aria-labelledby="off-links-title">
        <div className="med-hero-inner">
          <h1 id="off-links-title">Official FMCSA Medical Links</h1>
          <p className="lead">Authoritative sources for standards, certified examiners, medical forms, and condition guidance. Always verify you are using the latest form revision.</p>
          <div className="med-backbar"><button className="med-back-btn" onClick={()=>navigate('/medical-requirements')}>← Back to Medical Requirements</button></div>
        </div>
      </header>
      <main className="container med-section" aria-label="Official Resources">
        <div className="offlink-grid" role="list">
          {sections.map(sec => (
            <section key={sec.id} className="offlink-card" aria-labelledby={`sec-${sec.id}`}> 
              <h2 id={`sec-${sec.id}`}>{sec.title}</h2>
              <ul>
                {sec.links.map(l => (
                  <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer" data-track={`open_${sec.id}_${l.label.replace(/[^a-z0-9]+/gi,'_').toLowerCase()}`}>{l.label}</a></li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <section className="med-section" aria-labelledby="usage-note">
          <h2 id="usage-note">Usage Notes</h2>
          <ul className="med-bullets">
            <li><strong>Always download forms from FMCSA:</strong> Avoid stale 3rd-party copies missing updates.</li>
            <li><strong>Cross-check expiry cycles:</strong> Some condition guidance changes—revalidate internal SOP yearly.</li>
            <li><strong>Link monitoring:</strong> Add automated uptime / change detection for critical forms (hash watch).</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
