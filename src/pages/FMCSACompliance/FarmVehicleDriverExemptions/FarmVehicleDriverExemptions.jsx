import React from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalHeader from '../../../components/GlobalHeader'

export default function FarmVehicleDriverExemptions() {
  const navigate = useNavigate()
  return (
  <div className="fvdx-page bg-gradient-primary" data-page="farm-vehicle-driver-exemptions">
      <GlobalHeader />
      <section className="container fvdx-hero" aria-labelledby="fvdx-title">
        <h1 id="fvdx-title">Farm Vehicle Driver Exemptions (FVD)</h1>
        <p className="lead">Understand when the Farm Vehicle Driver (FVD) exemptions apply for CDL, Hours of Service, and other FMCSR requirements. Always verify with your state DMV—state adoption and implementation can vary.</p>
        <div className="fvdx-backbar">
          <button type="button" className="fvdx-back-btn" onClick={() => navigate('/fmcsa-compliance')} aria-label="Back to FMCSA Compliance">← Back to FMCSA Compliance</button>
        </div>
      </section>

      <section className="container fvdx-section" aria-labelledby="grid-title">
        <h2 id="grid-title">Key Exemption Areas</h2>
        <div className="landing-grid">
          <div className="landing-card theme-orange" aria-labelledby="def-cfv">
            <h3 id="def-cfv">Definitions & Covered Farm Vehicles</h3>
            <p>FMCSA (49 CFR § 390.5) defines a Covered Farm Vehicle (CFV). A vehicle qualifies if ALL apply:</p>
            <ul className="fvdx-bullets">
              <li>Operated by a farmer, rancher, or their family member / employee.</li>
              <li>Transports ag commodities, livestock, machinery, or supplies to / from a farm or ranch.</li>
              <li>Displays a license/plate identifying it as a farm vehicle.</li>
              <li>Not used for for‑hire operations.</li>
              <li>EITHER weighs ≤ 26,001 lbs (any distance) OR if heavier, operates within 150 air‑miles of the farm (when out of state).</li>
            </ul>
          </div>
          <div className="landing-card theme-sky" aria-labelledby="hos-eld">
            <h3 id="hos-eld">Hours of Service (HOS) & ELD</h3>
            <ul className="fvdx-bullets">
              <li>49 CFR § 395.1(k)(4): Ag commodity transport within 150 air‑miles of the source is exempt from HOS (incl. ELD & logbooks).</li>
              <li>Livestock haulers: 30‑minute break exemption; ELD relief inside radius.</li>
              <li>Other ELD exemptions: pre‑2000 engines; driving ≤ 8 days outside radius in 30‑day period (paper logs those days).</li>
            </ul>
          </div>
          <div className="landing-card theme-purple" aria-labelledby="cdl-qual">
            <h3 id="cdl-qual">CDL & Driver Qualification</h3>
            <ul className="fvdx-bullets">
              <li>49 CFR § 383.3(d): Farmers / family / employees within 150 air‑miles (not for‑hire) may be CDL‑exempt.</li>
              <li>CDL exemption often also removes Part 382 drug & alcohol testing applicability.</li>
              <li>49 CFR § 391.2: Straight trucks—most Part 391 qualification rules waived (except distracted driving prohibitions). Articulated CMVs: limited waiver only.</li>
            </ul>
          </div>
            <div className="landing-card theme-green" aria-labelledby="quick-ref">
              <h3 id="quick-ref">Quick Reference</h3>
              <table className="fvdx-table" aria-label="Quick Reference Table">
                <thead>
                  <tr><th>Regulation Area</th><th>CFV Exemption Summary</th></tr>
                </thead>
                <tbody>
                  <tr><td>HOS & ELD</td><td>Inside 150 air‑miles: HOS & ELD not required; certain break rules waived.</td></tr>
                  <tr><td>CDL</td><td>Waived for qualifying farm operators within 150 air‑miles (non for‑hire).</td></tr>
                  <tr><td>Driver Qualification</td><td>Straight trucks: broad Part 391 waiver; Articulated: limited elements waived.</td></tr>
                </tbody>
              </table>
            </div>
        </div>
      </section>

      <section className="container fvdx-section" aria-labelledby="addl-notes">
        <h2 id="addl-notes">Additional Notes</h2>
        <ul className="fvdx-bullets">
          <li>Exemptions generally apply only to U.S.-registered farm vehicles (not Canada/Mexico).</li>
          <li>State-declared planting & harvest periods may extend certain HOS flexibilities.</li>
          <li>Placarded hazardous materials transportation voids CFV exemptions.</li>
          <li>Maintain documentation: farm registration, commodity proof, distance tracking near 150 air‑mile limit.</li>
        </ul>
        <p className="note">Informational only—verify specifics with FMCSA regulations & state enforcement.</p>
      </section>

      <section className="container fvdx-section" aria-labelledby="links">
        <h2 id="links">Helpful Links</h2>
        <ul className="fvdx-links">
          <li><a href="https://www.fmcsa.dot.gov/faq/what-covered-farm-vehicle-cfv" target="_blank" rel="noopener noreferrer">FMCSA: Farm Vehicle Driver Exemptions</a></li>
          <li><a href="https://www.fmcsa.dot.gov/regulations/hours-service/summary-hours-service-regulations" target="_blank" rel="noopener noreferrer">FMCSA: Summary of HOS</a></li>
          <li><a href="https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-390" target="_blank" rel="noopener noreferrer">49 CFR Part 390 (Scope & Definitions)</a></li>
        </ul>
        <p className="note">This page is informational. Confirm applicability with your state enforcement agency.</p>
      </section>
    </div>
  )
}
