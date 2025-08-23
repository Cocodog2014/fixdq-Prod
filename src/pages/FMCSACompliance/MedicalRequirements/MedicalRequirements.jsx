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
            <Link to="/medical-requirements/risk-conditions" className="feature-card red-border feature-link-card" aria-describedby="cond-desc">
              <div className="feature-header"><span className="icon">⚠️</span><h3>Risk Conditions</h3></div>
              <ul id="cond-desc">
                <li>Epilepsy</li>
                <li>Severe hypo events</li>
                <li>Unmanaged cardio</li>
                <li>Vision / hearing fail</li>
                <li>Substance abuse</li>
              </ul>
              <div className="feature-footer"><span className="card-cta">See List</span></div>
            </Link>
            <Link to="/medical-requirements/monitoring" className="feature-card teal-border feature-link-card" aria-describedby="mon-desc">
              <div className="feature-header"><span className="icon">⏱️</span><h3>Monitoring</h3></div>
              <ul id="mon-desc">
                <li>24 mo max</li>
                <li>3/6/12 mo followups</li>
                <li>Track 90-60-30</li>
                <li>State status uploads</li>
                <li>Carrier dashboard</li>
              </ul>
              <div className="feature-footer"><span className="card-cta">Learn</span></div>
            </Link>
            <Link to="/medical-requirements/violations" className="feature-card purple-border feature-link-card" aria-describedby="vio-desc">
              <div className="feature-header"><span className="icon">🔍</span><h3>Violations</h3></div>
              <ul id="vio-desc">
                <li>Expired MEC</li>
                <li>Short-term lapse</li>
                <li>No lenses / aids</li>
                <li>Untreated condition</li>
                <li>Poor documentation</li>
              </ul>
              <div className="feature-footer"><span className="card-cta">Prevent</span></div>
            </Link>
            <Link to="/medical-requirements/official-links" className="feature-card blue-border feature-link-card" aria-describedby="link-desc">
              <div className="feature-header"><span className="icon">🔗</span><h3>Official Links</h3></div>
              <ul id="link-desc">
                <li>NRCME Lookup</li>
                <li>FMCSA Medical</li>
                <li>Programs page</li>
                <li>Diabetes forms</li>
                <li>Reference docs</li>
              </ul>
              <div className="feature-footer"><span className="card-cta">Open</span></div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
