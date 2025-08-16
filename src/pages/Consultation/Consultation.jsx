import React from 'react'
import GlobalHeader from '../../components/GlobalHeader'

export default function Consultation() {
  return (
    <div className="page">
      <GlobalHeader />

      <section className="consult-hero">
        <div className="container">
          <h1>Book a Compliance Consultation</h1>
          <p>FixDQ’s advisory team includes former CVSA inspectors, carrier safety/CSR officers, and transportation attorneys. We blend real-world enforcement insight with practical fleet operations.</p>
        </div>
      </section>

      <section className="consult-canvas">
        <div className="consult-content">
        <div className="pitch-grid">
          <div className="pitch card-rose">
            <h2>Why FixDQ</h2>
            <p>
              We’ve sat on both sides of the table—roadside, back-office, and in the hearing room. Our experts have led audits,
              defended carriers, and run safety programs. You get rapid diagnosis and clear, actionable fixes.
            </p>
            <div className="badges">
              <span className="badge blue">Former CVSA Inspectors</span>
              <span className="badge green">Carrier Safety (CSR) Officers</span>
              <span className="badge purple">Transportation Attorneys</span>
              <span className="badge rose">ELD & HOS Specialists</span>
            </div>
            <div className="value card-amber" style={{marginTop:12}}>
              <h3>What We Cover</h3>
              <ul>
                <li>FMCSA audits (focused or full): prep, walkthrough, and remediation plans</li>
                <li>CSA/SMS score recovery and BASICs action plans</li>
                <li>HOS/ELD program tune‑ups: policies, supporting docs, unassigned driving SOP</li>
                <li>Vehicle Maintenance: DVIR, annuals, OOS repair tracking</li>
                <li>DQF/Part 391 and Clearinghouse compliance</li>
                <li>Drug & Alcohol (Part 40/382): randoms, post‑accident, supervisor training</li>
                <li>Hazmat training and registration (if applicable)</li>
              </ul>
            </div>
          </div>
          <div className="team card-sky">
            <h3>Who You’ll Work With</h3>
            <div className="team-list">
              <div className="team-card">
                <strong>Former CVSA Inspector</strong>
                <p>Roadside enforcement experience, inspection trends, OOS criteria, and CRASH preventability insights.</p>
              </div>
              <div className="team-card">
                <strong>Carrier Safety/CSR Officer</strong>
                <p>Builds safety systems that pass audits—policy, training, and corrective action workflows.</p>
              </div>
              <div className="team-card">
                <strong>Transportation Attorney</strong>
                <p>Advises on enforcement, appeals, and DataQs; helps align practices with CFR and case law.</p>
              </div>
              <div className="team-card">
                <strong>ELD & HOS Specialist</strong>
                <p>Optimizes your ELD configuration, exception policies, and supporting documents process.</p>
              </div>
            </div>
          </div>
        </div>

  <div className="value card-green" style={{marginTop:18}}>
          <h3>Scheduling</h3>
          <p>
            Online booking is coming soon. In the meantime, explore our FMCSA Compliance resources and quiz to identify
            priorities. When scheduling opens, you’ll be able to request time with former CVSA inspectors, CSR officers,
            and transportation attorneys.
          </p>
        </div>
        </div>
      </section>
    </div>
  )
}
