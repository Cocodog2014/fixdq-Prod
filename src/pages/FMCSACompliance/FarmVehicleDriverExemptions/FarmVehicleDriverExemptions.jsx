import React from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalHeader from '../../../components/GlobalHeader'
import './FarmVehicleDriverExemptions.css'

export default function FarmVehicleDriverExemptions() {
  const navigate = useNavigate()
  return (
    <div className="fvdx-page" data-page="farm-vehicle-driver-exemptions">
      <GlobalHeader />
      <section className="container fvdx-hero" aria-labelledby="fvdx-title">
        <h1 id="fvdx-title">Farm Vehicle Driver Exemptions (FVD)</h1>
        <p className="lead">Understand when the Farm Vehicle Driver (FVD) exemptions apply for CDL, Hours of Service, and other FMCSR requirements. Always verify with your state DMV—state adoption and implementation can vary.</p>
        <div className="fvdx-backbar">
          <button type="button" className="fvdx-back-btn" onClick={() => navigate('/fmcsa-compliance')} aria-label="Back to FMCSA Compliance">← Back to FMCSA Compliance</button>
        </div>
      </section>

      <section className="container fvdx-section" aria-labelledby="definition">
        <h2 id="definition">What is a Covered Farm Vehicle?</h2>
        <ul className="fvdx-bullets">
          <li>Registered in a state with a special farm plate or similar designation.</li>
          <li>Operated by the owner or operator of a farm or ranch (or a family member / employee).</li>
          <li>Transporting agricultural commodities, livestock, machinery, or supplies to or from a farm/ranch.</li>
          <li>Not for-hire (except certain limited exceptions for livestock transport between farm and market).</li>
          <li>Not transporting hazardous materials requiring placarding (limited diesel / ag chemicals may be allowed under other exemptions).</li>
        </ul>
      </section>

      <section className="container fvdx-section" aria-labelledby="distance-limits">
        <h2 id="distance-limits">Distance Limits</h2>
        <p>Federal FVD exemptions commonly apply within <strong>150 air-miles</strong> (approx. 172 land miles) of the farm/ranch. Some provisions differ when crossing state lines or exceeding weight thresholds.</p>
        <ul className="fvdx-bullets">
          <li><strong>Intrastate:</strong> Usually honored statewide subject to state adoption.</li>
          <li><strong>Interstate within 150 air-miles:</strong> CDL not required for covered farm vehicle (depending on weight class).</li>
          <li>Beyond 150 air-miles: standard CDL / HOS rules generally resume.</li>
        </ul>
      </section>

      <section className="container fvdx-section" aria-labelledby="cdl-impact">
        <h2 id="cdl-impact">Impact on CDL Requirements</h2>
        <p>Drivers of qualifying covered farm vehicles may be exempt from holding a CDL when:</p>
        <ul className="fvdx-bullets">
          <li>The vehicle is a straight truck or combination used strictly for farm operations.</li>
          <li>Operation stays within the authorized air-mile radius.</li>
          <li>No placarded hazardous materials are transported.</li>
        </ul>
        <p className="note">States can narrow or expand conditions; some require a Class D with farm designation. Always document applicability.</p>
      </section>

      <section className="container fvdx-section" aria-labelledby="hos-impact">
        <h2 id="hos-impact">Impact on Hours of Service (HOS)</h2>
        <ul className="fvdx-bullets">
          <li>Covered farm vehicles may have relief from certain HOS provisions during planting & harvest seasons as declared by the state.</li>
          <li>Short-haul (150 air-mile) exceptions can layer with agricultural commodity exemptions.</li>
          <li>Maintain records showing commodity type, origin, destination, and qualifying dates.</li>
        </ul>
      </section>

      <section className="container fvdx-section" aria-labelledby="documentation">
        <h2 id="documentation">Documentation & Best Practices</h2>
        <ul className="fvdx-bullets">
          <li>Carry state-issued farm registration / plate documentation.</li>
          <li>Keep evidence of commodity purpose (invoices, bills of lading, coop receipts).</li>
          <li>Log distance traveled when near boundary of 150 air-miles.</li>
          <li>Train seasonal drivers on limitations (no placarded hazmat, non for-hire).</li>
        </ul>
      </section>

      <section className="container fvdx-section" aria-labelledby="limitations">
        <h2 id="limitations">Key Limitations</h2>
        <ul className="fvdx-bullets">
          <li>Does not exempt from drug/alcohol testing if otherwise required by carrier operations.</li>
          <li>Does not waive vehicle maintenance / inspection requirements (Parts 393/396).</li>
          <li>Weight limits, bridge formulas, and state size restrictions still apply.</li>
          <li>Placarded hazmat breaks the exemption.</li>
        </ul>
      </section>

      <section className="container fvdx-section" aria-labelledby="links">
        <h2 id="links">Helpful Links</h2>
        <ul className="fvdx-links">
          <li><a href="https://www.fmcsa.dot.gov/registration/commercial-drivers-license/farm-vehicle-driver-exemptions" target="_blank" rel="noopener noreferrer">FMCSA: Farm Vehicle Driver Exemptions</a></li>
          <li><a href="https://www.fmcsa.dot.gov/regulations/hours-service/summary-hours-service-regulations" target="_blank" rel="noopener noreferrer">FMCSA: Summary of HOS</a></li>
          <li><a href="https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-390" target="_blank" rel="noopener noreferrer">49 CFR Part 390 (Scope & Definitions)</a></li>
        </ul>
        <p className="note">This page is informational. Confirm applicability with your state enforcement agency.</p>
      </section>
    </div>
  )
}
