import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import GlobalHeader from '../../components/GlobalHeader'
import './SafetyManagement.css'

export default function SafetyManagement() {
  const navigate = useNavigate()
  return (
    <div className="smc-page">
      <GlobalHeader />
      <section className="container smc-hero">
        <h1>Safety Management Cycles (SMC)</h1>
        <p className="lead">Purpose: how a carrier actually stays compliant day-to-day.</p>
        <div className="smc-backbar">
          <button
            type="button"
            className="smc-back-btn"
            onClick={() => navigate('/fmcsa-compliance')}
            aria-label="Back to FMCSA Compliance"
          >
            ← Back to FMCSA Compliance
          </button>
        </div>
      </section>

      <section className="container smc-section">
        <h2>The SMC Framework</h2>
        <ol className="smc-steps">
          <li><strong>Policies</strong> – Clear, written rules that reflect FMCSR and your operations.</li>
          <li><strong>Roles</strong> – Who owns what (safety manager, dispatch, maintenance, drivers).</li>
          <li><strong>Training</strong> – Onboarding and recurring; targeted refreshers after incidents.</li>
          <li><strong>Monitoring</strong> – Daily/weekly checks (logs, DVIRs, inspection results, citations).</li>
          <li><strong>Meaningful Action</strong> – Coaching, corrective action forms, process changes.</li>
        </ol>
      </section>

      <section className="container smc-section">
        <h2>Checklists</h2>
        <div className="smc-grid">
          <div className="smc-card">
            <h3>DVIR Workflow</h3>
            <ul>
              <li>Pre-trip walkaround; note defects with photos.</li>
              <li>Submit DVIR daily; maintenance reviews within 24 hours.</li>
              <li>Repairs documented; driver signs off on corrected defects.</li>
            </ul>
          </div>
          <div className="smc-card">
            <h3>Maintenance Plan</h3>
            <ul>
              <li>PM intervals by OEM and usage; calendar in advance.</li>
              <li>Parts/repair records tied to unit number and odometer.</li>
              <li>Annual inspection schedule with proof of inspection.</li>
            </ul>
          </div>
          <div className="smc-card">
            <h3>HOS Audit Cadence</h3>
            <ul>
              <li>Daily: missing certs, unassigned driving events.</li>
              <li>Weekly: 30-min break, 11/14 compliance, ELD edits with notes.</li>
              <li>Monthly: 60/70-hour review; coach repeat offenders.</li>
            </ul>
          </div>
          <div className="smc-card">
            <h3>Driver Qualification Files</h3>
            <ul>
              <li>MVR + medical card monitoring; expirations dashboard.</li>
              <li>Road test or equivalent; application completeness.</li>
              <li>Annual review + violation certification.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container smc-section">
        <h2>Simple KPI Dashboard Ideas</h2>
        <ul className="smc-bullets">
          <li>Clean inspections % (no violations).</li>
          <li>Out-of-service (OOS) rate.</li>
          <li>Late/missing DVIRs.</li>
          <li>HOS audit findings (per driver / per week).</li>
        </ul>
      </section>

      <section className="container smc-section">
        <h2>Templates (Coming Soon)</h2>
        <div className="smc-grid">
          <div className="smc-card">
            <h3>Safety Policy (PDF)</h3>
            <p>Downloadable policy template to adapt for your fleet.</p>
          </div>
          <div className="smc-card">
            <h3>Orientation Checklist</h3>
            <p>Step-by-step onboarding for drivers and office staff.</p>
          </div>
          <div className="smc-card">
            <h3>Corrective Action Form</h3>
            <p>Document coaching and follow-up actions after issues.</p>
          </div>
        </div>
      </section>

      <section className="container smc-section">
        <h2>Related Links</h2>
        <ul className="smc-links">
          <li><Link to="/hours-of-service">Hours of Service (HOS)</Link></li>
          <li><a href="/fmcsa-compliance#violations">Violations</a></li>
          <li><a href="/fmcsa-compliance#csa">CSA</a></li>
        </ul>
        <p className="note">We intentionally do not duplicate violation weights or insurance topics here.</p>
      </section>
    </div>
  )
}
