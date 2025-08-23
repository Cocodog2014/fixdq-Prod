import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import GlobalHeader from '../../../components/GlobalHeader'
import './MedicalRequirements.css'

export default function MedicalRequirements() {
  const navigate = useNavigate()
  return (
    <div className="med-page" data-page="medical-requirements">
      <GlobalHeader />
      {/* Hero */}
      <header className="container med-hero" aria-labelledby="med-title">
        <div className="med-hero-inner">
          <h1 id="med-title">DOT Medical Requirements</h1>
          <p className="lead">Know who needs a DOT physical, how certification works, medical standards, monitored conditions, and how to prevent violations.</p>
          <div className="med-backbar">
            <button type="button" className="med-back-btn" onClick={() => navigate('/fmcsa-compliance')} aria-label="Back to FMCSA Compliance">← FMCSA Compliance</button>
          </div>
        </div>
      </header>
      {/* Summary Grid (landing style similar to HomePage feature grid) */}
      <section className="med-summary-grid features-grid" aria-label="Medical Requirements Overview">
        <div className="container">
          <div className="grid">
            <Link to="/medical-requirements/who-needs" className="feature-card blue-border feature-link-card" aria-describedby="who-desc">
              <div className="feature-header"><span className="icon">❓</span><h3>Who Needs A Medical Certificate</h3></div>
              <ul id="who-desc">
                <li>CDL CMVs (A/B/C)</li>
                <li>Some ≥10,001 lb non-CDL</li>
                <li>Passenger / Hazmat</li>
                <li>State adoption varies</li>
                <li>Limited exemptions</li>
              </ul>
              <div className="feature-footer"><span className="card-cta">View Detail</span></div>
            </Link>
            <Link to="/medical-requirements/certification-flow" className="feature-card orange-border feature-link-card" aria-describedby="proc-desc">
              <div className="feature-header"><span className="icon">🩺</span><h3>Certification Flow</h3></div>
              <ul id="proc-desc">
                <li>NRCME examiner only</li>
                <li>Bring meds & history</li>
                <li>Vitals & vision/hearing</li>
                <li>MEC up to 24 months</li>
                <li>Track expiration</li>
              </ul>
              <div className="feature-footer"><span className="card-cta">View Steps</span></div>
            </Link>
            <Link to="/medical-requirements/key-standards" className="feature-card green-border feature-link-card" aria-describedby="std-desc">
              <div className="feature-header"><span className="icon">📋</span><h3>Key Standards</h3></div>
              <ul id="std-desc">
                <li>Vision 20/40 each eye</li>
                <li>Hearing ≤40 dB</li>
                <li>BP stages matter</li>
                <li>OSA treatment usage</li>
                <li>Cardiac clearance</li>
              </ul>
              <div className="feature-footer"><span className="card-cta">Review</span></div>
            </Link>
            <a href="#conditions" className="feature-card red-border feature-link-card" aria-describedby="cond-desc">
              <div className="feature-header"><span className="icon">⚠️</span><h3>Risk Conditions</h3></div>
              <ul id="cond-desc">
                <li>Epilepsy</li>
                <li>Severe hypo events</li>
                <li>Unmanaged cardio</li>
                <li>Vision / hearing fail</li>
                <li>Substance abuse</li>
              </ul>
              <div className="feature-footer"><span className="card-cta">See List</span></div>
            </a>
            <a href="#monitoring" className="feature-card teal-border feature-link-card" aria-describedby="mon-desc">
              <div className="feature-header"><span className="icon">⏱️</span><h3>Monitoring</h3></div>
              <ul id="mon-desc">
                <li>24 mo max</li>
                <li>3/6/12 mo followups</li>
                <li>Track 90-60-30</li>
                <li>State status uploads</li>
                <li>Carrier dashboard</li>
              </ul>
              <div className="feature-footer"><span className="card-cta">Learn</span></div>
            </a>
            <a href="#violations" className="feature-card purple-border feature-link-card" aria-describedby="vio-desc">
              <div className="feature-header"><span className="icon">🔍</span><h3>Violations</h3></div>
              <ul id="vio-desc">
                <li>Expired MEC</li>
                <li>Short-term lapse</li>
                <li>No lenses / aids</li>
                <li>Untreated condition</li>
                <li>Poor documentation</li>
              </ul>
              <div className="feature-footer"><span className="card-cta">Prevent</span></div>
            </a>
            <a href="#links" className="feature-card blue-border feature-link-card" aria-describedby="link-desc">
              <div className="feature-header"><span className="icon">🔗</span><h3>Official Links</h3></div>
              <ul id="link-desc">
                <li>NRCME Lookup</li>
                <li>FMCSA Medical</li>
                <li>Programs page</li>
                <li>Diabetes forms</li>
                <li>Reference docs</li>
              </ul>
              <div className="feature-footer"><span className="card-cta">Open</span></div>
            </a>
          </div>
        </div>
      </section>
      {/* Detailed sections */}
      <div className="med-detail-wrapper" aria-label="Detailed Medical Guidance">
  {/* Removed inline 'Who Needs' section now its own dedicated page */}
  {/* Certification Process & Key Standards moved to dedicated pages */}
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
    </div>
  )
}
