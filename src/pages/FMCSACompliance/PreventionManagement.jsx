import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import GlobalHeader from '../../components/GlobalHeader'

export default function PreventionManagement() {
  const navigate = useNavigate()
  return (
    <div className="pm-page">
      <GlobalHeader />

      <section className="container pm-hero">
        <h1>Violation Prevention & Management</h1>
        <p className="lead">Purpose: avoid violations, and fix bad data fast.</p>
        <div className="pm-backbar">
          <button
            type="button"
            className="pm-back-btn"
            onClick={() => navigate('/fmcsa-compliance')}
            aria-label="Back to FMCSA Compliance"
          >
            ← Back to FMCSA Compliance
          </button>
        </div>
      </section>

      <section className="container pm-section">
        <h2>Prevention Playbook</h2>
        <div className="pm-grid">
          <div className="pm-card">
            <h3>Top Out-of-Service (OOS) Items</h3>
            <ul>
              <li>Brakes: air leaks, out-of-adjustment, inoperative service or parking brakes.</li>
              <li>Tires/Wheels: tread depth, exposed cord, flat/underinflated, loose/missing lugs.</li>
              <li>Lights: inoperative lamps, reflectors, turn signals, brake lights, conspicuity tape.</li>
            </ul>
          </div>
          <div className="pm-card">
            <h3>Pre-trip & DVIR Discipline</h3>
            <ul>
              <li>Daily walkaround with a consistent pattern; photo defects before leaving the yard.</li>
              <li>Submit DVIRs every day used; resolve and document repairs with unit/odometer.</li>
              <li>Driver signs off on corrected defects prior to next dispatch when required.</li>
            </ul>
          </div>
          <div className="pm-card">
            <h3>Roadside Documentation – Must Haves</h3>
            <ul>
              <li>Driver license, med card, registration, insurance, shipping papers/BOL.</li>
              <li>ELD user manual, malfunction sheet, and instruction card; blank RODS if on paper.</li>
              <li>Annual inspection proof, permits, and company contact for safety/dispatch.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container pm-section">
        <h2>Roadside Inspection Guide</h2>
        <div className="pm-grid">
          <div className="pm-card">
            <h3>What to Expect</h3>
            <ul>
              <li>Inspection level explained; produce ID, registration, HOS/ELD, and shipping docs.</li>
              <li>Vehicle walkaround; inspector may measure brakes, check tires, lights, securement.</li>
              <li>Possible citations or OOS orders; sign to acknowledge receipt (not guilt).</li>
            </ul>
          </div>
          <div className="pm-card">
            <h3>Polite Script</h3>
            <ul>
              <li>“Good morning officer. Here are my license, med card, registration, and insurance.”</li>
              <li>“I’ll retrieve my HOS and ELD transfer instructions. Would you like a printout or transfer?”</li>
              <li>“If there’s a defect, I’ll document and notify maintenance right away.”</li>
            </ul>
          </div>
          <div className="pm-card">
            <h3>What NOT to Say/Do</h3>
            <ul>
              <li>Don’t debate or argue roadside—save explanations for the record or review.</li>
              <li>Don’t guess on facts; avoid statements that admit fault beyond what’s observed.</li>
              <li>Don’t refuse orders; comply safely and escalate with your company afterward.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container pm-section">
        <h2>After a Citation or Inspection</h2>
        <div className="pm-grid">
          <div className="pm-card">
            <h3>Timelines & Copies</h3>
            <ul>
              <li>Secure copies of the inspection, citation, and any photos immediately.</li>
              <li>Record deadlines for court dates and company response steps.</li>
              <li>Repair defects promptly; keep repair orders and before/after photos.</li>
            </ul>
          </div>
          <div className="pm-card">
            <h3>Company Response Plan</h3>
            <ul>
              <li>Notify safety/management; open an incident record with evidence checklist.</li>
              <li>Coach the driver if policy gaps exist; document corrective action.</li>
              <li>Decide on DataQs challenge and legal options as appropriate.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container pm-section">
        <h2>DataQs How‑to</h2>
        <div className="pm-grid">
          <div className="pm-card">
            <h3>When to File</h3>
            <ul>
              <li>Incorrect violation details, wrong vehicle/driver, duplicate inspections.</li>
              <li>Crash reports that qualify for review or correction.</li>
              <li>Adjudicated citations (dismissed, not guilty, amended).</li>
            </ul>
          </div>
          <div className="pm-card">
            <h3>Evidence Checklist</h3>
            <ul>
              <li>Photos, repair orders, affidavits, training records, calibration reports.</li>
              <li>Court documents: docket, dismissal, not guilty, amended charge.</li>
              <li>Inspection/citation copies; supporting telematics/ELD data if relevant.</li>
            </ul>
          </div>
          <div className="pm-card">
            <h3>Status & Outcomes</h3>
            <ul>
              <li>Track state and FMCSA responses; respond to requests for info on time.</li>
              <li>Outcomes may include removal, correction, or severity change of violations.</li>
              <li>Document results in the incident record and update training if needed.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container pm-section">
        <h2>Adjudicated Citations</h2>
        <div className="pm-card">
          <p>Court outcomes can affect how violations appear in SMS. If a citation is dismissed, not guilty, or amended, submit those documents in DataQs so the record can reflect the adjudication per policy. Results vary by jurisdiction and violation type.</p>
        </div>
      </section>

      <section className="container pm-section">
        <h2>Recordkeeping – Quick Reference</h2>
        <div className="pm-grid">
          <div className="pm-card">
            <h3>Driver & HOS</h3>
            <ul>
              <li>RODS/ELD logs and supporting documents: typically keep for 6 months.</li>
              <li>Driver qualification file and training: maintain current; archive on separation.</li>
            </ul>
          </div>
          <div className="pm-card">
            <h3>Vehicle & Maintenance</h3>
            <ul>
              <li>Maintenance, inspections, and repair records: maintain while in service; retain for a period after disposal per regulation/policy.</li>
              <li>DVIRs: keep submitted reports and corrections according to current requirements.</li>
            </ul>
          </div>
          <div className="pm-card">
            <h3>Incidents & Evidence</h3>
            <ul>
              <li>Inspection/citation copies, photos, and repair orders attached to incident records.</li>
              <li>DataQs filings and decisions stored with the case for future audits.</li>
            </ul>
          </div>
        </div>
        <p className="pm-note">Note: Retention specifics vary by rule and operation; consult current FMCSR and company policy.</p>
      </section>

      <section className="container pm-section">
        <h2>Appeals & Escalation (High‑level)</h2>
        <div className="pm-card">
          <ol>
            <li>Warning letter.</li>
            <li>Focused or comprehensive audit (compliance review).</li>
            <li>Notice of Claim and follow‑up actions if issued.</li>
          </ol>
        </div>
      </section>

      <section className="container pm-section pm-links">
        <h2>Related Links</h2>
        <ul>
          <li><Link to="/csa">CSA – how violations affect percentiles</Link></li>
          <li><Link to="/hours-of-service">Hours of Service (HOS)</Link></li>
          <li><Link to="/fmcsa-regulations">FMCSR references</Link></li>
        </ul>
        <p className="pm-note">We don’t duplicate CSA math or broad regulation summaries here—see the linked pages for those details.</p>
      </section>
    </div>
  )
}
