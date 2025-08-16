import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import GlobalHeader from '../../components/GlobalHeader'

export default function CSA() {
  const navigate = useNavigate()
  return (
    <div className="csa-page">
      <GlobalHeader />
      <section className="container csa-hero">
        <h1>CSA (Compliance, Safety, Accountability)</h1>
        <p className="lead">How violations impact your safety score and insurance — and how FixDQ helps you control both.</p>
        <div className="csa-backbar">
          <button
            type="button"
            className="csa-back-btn"
            onClick={() => navigate('/fmcsa-compliance')}
            aria-label="Back to FMCSA Compliance"
          >
            ← Back to FMCSA Compliance
          </button>
        </div>
      </section>

      <section className="container csa-section">
        <h2>How Violations Affect Your Score</h2>
        <div className="csa-grid">
          <div className="csa-card">
            <h3>BASICs and Weights</h3>
            <p>Roadside inspection violations roll into BASIC categories (Unsafe, HOS, Vehicle Maint, HM, Crash Indicator, etc.). Each has severity weights and time decay (most recent carry more impact).</p>
          </div>
          <div className="csa-card">
            <h3>Inspections vs. Crashes</h3>
            <p>Clean inspections improve your denominator and stabilize measures; crashes (reportable) can raise Crash Indicator regardless of fault in some cases.</p>
          </div>
          <div className="csa-card">
            <h3>Out-of-Service (OOS)</h3>
            <p>OOS violations spike Vehicle Maintenance and HOS BASICs, increasing intervention risk and insurance scrutiny.</p>
          </div>
        </div>
      </section>

      <section className="container csa-section">
        <h2>Insurance Impact</h2>
        <ul className="csa-bullets">
          <li>Underwriters review inspection and crash history; poor trends drive <strong>higher premiums</strong> and deductibles.</li>
          <li>Increased <strong>loss-control requirements</strong> and policy exclusions may follow repeat violations.</li>
          <li>Demonstrating <strong>corrective action</strong> and clean inspection streaks can improve terms at renewal.</li>
        </ul>
      </section>

      <section className="container csa-section">
        <h2>FixDQ Can Help</h2>
        <div className="csa-grid">
          <div className="csa-card">
            <h3>Prevent</h3>
            <p>Driver coaching, HOS checks, and DVIR follow-through reduce common citations before they occur.</p>
          </div>
          <div className="csa-card">
            <h3>Respond</h3>
            <p>Guidance on documentation, corrective-action forms, and timelines to address findings promptly.</p>
          </div>
          <div className="csa-card">
            <h3>Prove</h3>
            <p>Track clean inspections, training completions, and maintenance closeouts to show improvement to insurers.</p>
          </div>
        </div>
      </section>

      <section className="container csa-section">
        <h2>Related Links</h2>
        <ul className="csa-links">
          <li><Link to="/hours-of-service">Hours of Service (HOS)</Link></li>
          <li><Link to="/prevention-management">Violations</Link></li>
          <li><a href="https://csa.fmcsa.dot.gov" target="_blank" rel="noreferrer noopener">FMCSA: CSA</a></li>
        </ul>
        <p className="note">We keep it practical here — no deep dive into violation weights tables or insurance legalities.</p>
      </section>
    </div>
  )
}
