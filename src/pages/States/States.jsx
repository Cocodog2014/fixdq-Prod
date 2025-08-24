import React, { lazy, Suspense, useRef } from 'react'
import GlobalHeader from '../../components/GlobalHeader'
import { Link } from 'react-router-dom'
const StateRulesDrawer = lazy(()=>import('./StateByState/StateRulesDrawer'))
const WeightCalculatorDrawer = lazy(()=>import('./WeightCalculator/WeightCalculatorDrawer.jsx'))

/*
  States Landing Page
  - Provides hub for state-focused tools/resources: Oversize/Overweight permits guidance, Trip & Fuel permits, IFTA basics, IRP overview
  - Reuses existing grid & landing-card system per development.md conventions
*/
export default function States() {
  const drawerRef = useRef(null)
  const weightRef = useRef(null)
  return (
    <div className="states-page gradient-page">
      <GlobalHeader />
      <header className="states-hero container">
        <h1>State Permits & IFTA Hub</h1>
        <p className="states-sub">Oversize/overweight permitting, temporary trip & fuel permits, IFTA filing, IRP registration, and quick state-by-state research tools.</p>
      </header>

      {/* Overview Cards */}
      <section className="states-section container" aria-labelledby="states-overview">
        <h2 id="states-overview" className="visually-hidden">Overview</h2>
        <div className="landing-grid">
          <div className="landing-card states-card-permits">
            <h3>Oversize / Overweight</h3>
            <p>Key dimension & weight triggers plus how to request permits and routing.</p>
            <a className="mini-link" href="#oversize">Learn More</a>
          </div>
          <div className="landing-card states-card-trip">
            <h3>Trip & Fuel Permits</h3>
            <p>Short-term operating and fuel permits when IRP/IFTA are not yet active.</p>
            <a className="mini-link" href="#trip-fuel">Learn More</a>
          </div>
          <Link className="landing-card states-card-ifta" to="/states/ifta" data-track="open_ifta_page" aria-label="Open IFTA detailed page">
            <h3>IFTA Basics</h3>
            <p>Quarterly filings, distance & fuel records, common audit triggers.</p>
            <span className="mini-link" aria-hidden>Open IFTA Page</span>
          </Link>
          <div className="landing-card states-card-irp">
            <h3>IRP Registration</h3>
            <p>Fleet apportionment, cab cards, adding units, and recordkeeping.</p>
            <a className="mini-link" href="#irp">Learn More</a>
          </div>
          <div className="landing-card states-card-research" onClick={()=>drawerRef.current?.open()} role="button" tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter'||e.key===' ') { e.preventDefault(); drawerRef.current?.open(); } }} aria-label="Open State-by-State FMCSA Rules tool">
            <h3>State-by-State FMCSA Rules</h3>
            <p>Interactive finder for intrastate rules and enforcement contacts.</p>
            <span className="mini-link" aria-hidden>Open Tool</span>
          </div>
          <div className="landing-card states-card-weight" onClick={()=>weightRef.current?.open()} role="button" tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); weightRef.current?.open() } }} aria-label="Open Bridge & Axle Weight Planner">
            <h3>Bridge & Axle Weights</h3>
            <p>Plan axle groups & check federal bridge formula limits.</p>
            <span className="mini-link" aria-hidden>Open Tool</span>
          </div>
          <div className="landing-card states-card-tolling">
            <h3>Tolling & Transponders</h3>
            <p>Multi-region passes (EZPass, BestPass, PrePass) and cost control tactics.</p>
            <a className="mini-link" href="#tolling">Learn More</a>
          </div>
          <div className="landing-card states-card-ports">
            <h3>Port of Entry Prep</h3>
            <p>Documents & inspection expectations when entering new jurisdictions.</p>
            <a className="mini-link" href="#port-entry">Learn More</a>
          </div>
          <div className="landing-card states-card-escort">
            <h3>Escort / Pilot Cars</h3>
            <p>Width / length / overheight thresholds that trigger escorts & certifications.</p>
            <a className="mini-link" href="#escort">Learn More</a>
          </div>
        </div>
      </section>

      {/* Detail Sections */}
      <section className="states-detail container states-article states-card-permits" id="oversize">
        <h2>Oversize / Overweight Permitting</h2>
  <p className="lead">Typical state thresholds (verify locally): width &gt; 8&apos;6&quot;, height &gt; 13&apos;6&quot; (western states may allow higher), length combinations &amp; axle / gross weights exceeding federal limits.</p>
        <ul className="dash-list">
          <li>Gather dimensions (overall, trailer, load) & axle weights before requesting permits.</li>
          <li>Check holiday / weekend travel restrictions and curfews (metro areas).</li>
          <li>Escort / pilot car requirements escalate with width, length, or overheight.</li>
          <li>Route surveys or utility clearances may be required for extreme heights.</li>
        </ul>
      </section>

      <section className="states-detail container states-article states-card-trip" id="trip-fuel">
        <h2>Trip & Fuel Permits</h2>
        <ul className="dash-list">
          <li>Temporary permits allow operation while awaiting IRP plates or IFTA credentials.</li>
          <li>Usually valid 72 hours (trip) and set number of days (fuel) per jurisdiction.</li>
          <li>Retain receipts & copies; apply fees to permanent account once active.</li>
        </ul>
      </section>

      <section className="states-detail container states-article states-card-ifta" id="ifta">
        <h2>IFTA Filing Essentials</h2>
        <ul className="dash-list">
            <li>Quarterly deadlines: Apr 30, Jul 31, Oct 31, Jan 31 (most jurisdictions).</li>
            <li>Keep per-trip distance (ELD, GPS, or manual logs) + fuel receipts/invoices.</li>
            <li>Bulk fuel withdrawals must have inventory & vehicle allocation records.</li>
            <li>Late filings accrue interest & penalties; chronic issues trigger audits.</li>
        </ul>
      </section>

      <section className="states-detail container states-article states-card-irp" id="irp">
        <h2>IRP Apportioned Registration</h2>
        <ul className="dash-list">
          <li>Allocate distance by jurisdiction from previous period (or estimate new fleet).</li>
          <li>Maintain records supporting reported distance for each power unit.</li>
          <li>Cab cards must match actual plate / unit; update promptly when adding units.</li>
        </ul>
      </section>

      <section className="states-detail container states-article states-card-tolling" id="tolling">
        <h2>Tolling & Transponders</h2>
        <ul className="dash-list">
          <li>Coming soon: comparison of major toll & bypass programs with regional coverage.</li>
          <li>Best practices: consolidate passes, monitor statements, dispute misreads quickly.</li>
        </ul>
      </section>

      <section className="states-detail container states-article states-card-ports" id="port-entry">
        <h2>Port of Entry Preparation</h2>
        <ul className="dash-list">
          <li>Have registration, IFTA, authority, insurance, and permits immediately accessible.</li>
          <li>Document binder / digital folder structure guidance coming soon.</li>
        </ul>
      </section>

      <section className="states-detail container states-article states-card-escort" id="escort">
        <h2>Escort / Pilot Car Requirements</h2>
        <ul className="dash-list">
          <li>Threshold matrix (width / length / rear overhang / height) by state coming soon.</li>
          <li>Plan routing early to avoid last‑minute escort scheduling delays.</li>
        </ul>
      </section>

      <Suspense fallback={<div className="sr-loading">Loading tool…</div>}>
        <StateRulesDrawer ref={drawerRef} />
      </Suspense>

      <Suspense fallback={<div className="sr-loading">Loading tool…</div>}>
        <WeightCalculatorDrawer ref={weightRef} />
      </Suspense>

      <footer className="states-footer container">
        <p>Always verify current permitting & fuel tax requirements with the issuing state authority. This hub is for planning and education only.</p>
      </footer>
    </div>
  )
}
