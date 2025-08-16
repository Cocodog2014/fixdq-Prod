import React from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalHeader from '../../components/GlobalHeader'

export default function HoursOfService() {
  const navigate = useNavigate()
  return (
    <div className="hos-page">
      <GlobalHeader />
      <section className="container hos-hero">
        <h1>Hours of Service (HOS)</h1>
        <p className="lead">Purpose: rules, practical examples, and common traps to avoid.</p>
        <div className="hos-backbar">
          <button
            type="button"
            className="hos-back-btn"
            onClick={() => navigate('/fmcsa-compliance')}
            aria-label="Back to FMCSA Compliance"
          >
            ← Back to FMCSA Compliance
          </button>
        </div>
      </section>

      <section className="container hos-section">
        <h2>Core Limits</h2>
        <ul className="hos-bullets">
          <li><strong>Property-carrying:</strong> 11-hour driving limit inside a 14-hour on-duty window, then 10 hours off-duty.</li>
          <li><strong>30-minute break:</strong> After 8 cumulative driving hours, take 30 minutes off-duty or on-duty not driving.</li>
          <li><strong>60/70-hour limit:</strong> Max on-duty is 60 hours in 7 days or 70 hours in 8 days (carrier policy decides).</li>
          <li><strong>34-hour restart (property-carrying):</strong> 34 consecutive hours off resets the 60/70-hour calculation.</li>
          <li><strong>Passenger-carrying:</strong> 10-hour driving limit within a 15-hour on-duty window; different break rules apply.</li>
        </ul>
      </section>

      <section className="container hos-section">
        <h2>Split Sleeper Options</h2>
        <p>Drivers may split the 10-hour off-duty period as either <strong>8/2</strong> or <strong>7/3</strong> (in any order). The two periods must total 10 hours and neither counts against the 14-hour window when used properly.</p>
        <div className="hos-examples">
          <div className="hos-example">
            <h3>Example A (8/2)</h3>
            <p>Start duty 06:00 → Drive/on-duty → <strong>8 hours sleeper</strong> 13:00–21:00 → More driving → <strong>2 hours off-duty</strong> before midnight. The time between the two qualifying periods does not expand the original 14-hour window; it is effectively paused by the first qualifying segment.</p>
          </div>
          <div className="hos-example">
            <h3>Example B (7/3)</h3>
            <p>Start duty 05:00 → <strong>7 hours sleeper</strong> 10:00–17:00 → Work/drive → <strong>3 hours off-duty</strong> later that shift. The pair creates a valid split and allows legal driving provided each segment meets the minimums and the pair totals 10 hours.</p>
          </div>
          <div className="hos-example">
            <h3>Common Trap</h3>
            <p>Taking a <em>non-qualifying</em> 6-hour sleeper segment does not start a valid split. Ensure segments are 8/2 or 7/3 and log them correctly.</p>
          </div>
        </div>
      </section>

      <section className="container hos-section">
        <h2>Exceptions</h2>
        <ul className="hos-bullets">
          <li>
            <strong>Short-haul exception:</strong> CDL drivers operating within <strong>150 air-miles</strong> and released within
            <strong> 14 hours</strong> may use time records instead of RODS (meets conditions in 49 CFR 395.1(e)).
          </li>
          <li>
            <strong>Adverse driving conditions:</strong> If unexpected weather or incidents slow travel, property-carrying drivers may extend driving time by up to 2 hours and extend the 14-hour window accordingly; passenger-carrying may extend driving up to 2 hours but the 15-hour window does not extend.
          </li>
        </ul>
      </section>

      <section className="container hos-section">
        <h2>ELD / RODS Basics</h2>
        <ul className="hos-bullets">
          <li>Use an <strong>ELD</strong> when RODS are required unless an exception applies.</li>
          <li><strong>Not required</strong> when: operating under the short-haul exception; using paper RODS for no more than <strong>8 days in any 30-day period</strong>; <strong>drive-away–tow-away</strong> operations; or when using a vehicle with a model year <strong>older than 2000</strong>.</li>
          <li>Keep supporting documents (fuel, tolls, BOLs) to match RODS.</li>
        </ul>
      </section>

      <section className="container hos-section">
        <h2>Top Violations & How to Avoid</h2>
        <ul className="hos-bullets">
          <li><strong>Falsification/Incorrect logs:</strong> Reconcile ELD events with bills of lading and fuel receipts daily.</li>
          <li><strong>No 30-minute break:</strong> Set a reminder once <em>driving</em> time nears 8 hours.</li>
          <li><strong>Driving after 11/14 (10/15 passenger):</strong> Plan routes with buffers; use sleeper splits correctly.</li>
          <li><strong>Missing certification/notations:</strong> Certify each day and annotate ELD edits.</li>
          <li><strong>Improper personal conveyance:</strong> Off-route yard moves or repositioning freight is not PC.</li>
        </ul>
      </section>

      <section className="container hos-section">
        <h2>Mini Examples</h2>
        <div className="hos-card">
          <p><strong>8-hour break timing:</strong> If you start driving at 07:00 and accumulate 8 hours of driving by 14:45, you must take a 30-minute break before driving again.</p>
        </div>
        <div className="hos-card">
          <p><strong>Weekly limit snapshot:</strong> If at 58 hours on-duty in a 7-day schedule, you only have 2 on-duty hours left today without a restart.</p>
        </div>
      </section>

      <section className="container hos-section">
        <h2>Helpful Links</h2>
        <ul className="hos-links">
          <li><a href="https://www.fmcsa.dot.gov/regulations/hours-of-service" target="_blank" rel="noreferrer noopener">FMCSA: Hours of Service</a></li>
          <li><a href="https://www.fmcsa.dot.gov/regulations" target="_blank" rel="noreferrer noopener">FMCSR Regulations</a></li>
          <li><a href="https://www.fmcsa.dot.gov/safety/violations" target="_blank" rel="noreferrer noopener">What happens if cited (violations)</a></li>
        </ul>
        <p className="note">We intentionally do not cover CSA methodology or the DataQs process here.</p>
      </section>
    </div>
  )
}
