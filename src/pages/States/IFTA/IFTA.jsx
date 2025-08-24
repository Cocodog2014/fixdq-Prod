import React from 'react';
import { Link } from 'react-router-dom';
import GlobalHeader from '../../../components/GlobalHeader';

function IFTA() {
  return (
    <div className="ifta-page bg-gradient-primary">
      <GlobalHeader />
      <div className="ifta-head">
        <h1>IFTA (International Fuel Tax Agreement)</h1>
        <p className="ifta-intro">
        The International Fuel Tax Agreement (IFTA) is a cooperative agreement among the lower 48 U.S. states and Canadian provinces
        that simplifies the reporting of fuel use taxes by interstate motor carriers. Instead of filing in every jurisdiction where
        you travel, you submit a single quarterly return to your base jurisdiction, which handles the distribution of taxes.
        </p>
      </div>

      <div className="ifta-grid">
        <div className="ifta-card ifta-card-register">
          <h3>Who Must Register?</h3>
          <ul>
            <li>Interstate carriers with a qualified motor vehicle</li>
            <li>GVW or registered weight &gt; 26,000 lbs (11,797 kg) OR</li>
            <li>3+ axles regardless of weight OR</li>
            <li>Used in combination &gt; 26,000 lbs GVW</li>
            <li>Non-exempt fuel (Diesel / Gas / Propane)</li>
          </ul>
        </div>
        <div className="ifta-card ifta-card-timeline">
          <h3>Quarterly Filing Timeline</h3>
          <table className="ifta-quarter-table" aria-label="IFTA quarterly due dates">
            <thead>
              <tr><th>Quarter</th><th>Period</th><th>Return Due</th></tr>
            </thead>
            <tbody>
              <tr><td>Q1</td><td>Jan 1 – Mar 31</td><td>Apr 30</td></tr>
              <tr><td>Q2</td><td>Apr 1 – Jun 30</td><td>Jul 31</td></tr>
              <tr><td>Q3</td><td>Jul 1 – Sep 30</td><td>Oct 31</td></tr>
              <tr><td>Q4</td><td>Oct 1 – Dec 31</td><td>Jan 31</td></tr>
            </tbody>
          </table>
          <p style={{margin: 0}}>Late filings can trigger penalties & interest—mark calendar reminders.</p>
        </div>
  <div className="ifta-card ifta-card-records">
          <h3>Records to Keep</h3>
          <ul>
            <li>Trip sheets or ELD-generated distance by jurisdiction</li>
            <li>Beginning & ending odometer for each trip</li>
            <li>Fuel receipts (date, seller, address, gallons, tax paid)</li>
            <li>Bulk fuel inventory & disbursement logs</li>
            <li>Vehicle identification (unit / VIN)</li>
          </ul>
        </div>
  <div className="ifta-card ifta-card-audit">
          <h3>Common Audit Triggers</h3>
          <ul>
            <li>Exact repeated MPG each quarter</li>
            <li>Unrealistic MPG (&lt; 3 or &gt; 9 for typical heavy duty)</li>
            <li>Missing or illegible fuel receipts</li>
            <li>Jurisdiction miles but zero fuel purchases anywhere</li>
            <li>Large unexplained bulk fuel variances</li>
          </ul>
        </div>
  <div className="ifta-card ifta-card-rates">
          <h3>Fuel Tax Rates</h3>
          <p style={{marginTop:0}}>Rates change frequently.</p>
          <ul>
            <li>Use official jurisdiction site or base state portal</li>
            <li>Never rely on year-old spreadsheets</li>
            <li>Track surcharge components separately (e.g. Indiana)</li>
            <li>Automate data pull if possible (API / vendor)</li>
          </ul>
        </div>
  <div className="ifta-card ifta-card-best">
          <h3>Best Practices</h3>
          <ul className="ifta-best-practices">
            <li>Cross-check total trip miles to odometer variance</li>
            <li>Reconcile fuel receipts to gallons reported</li>
            <li>Maintain raw ELD data (at least 4 years)</li>
            <li>Create quarterly MPG reasonableness file</li>
            <li>Retain prior returns + workpapers (audit trail)</li>
          </ul>
        </div>
      </div>

      <div className="ifta-callout" role="note">
        Reminder: Keep IFTA + IRP distance records aligned. Mileage gaps between your apportioned registration (IRP) and
        IFTA filings can produce letters or audits.
      </div>
      <div className="ifta-workflow">
        <h2>Filing Workflow (High Level)</h2>
        <ol>
          <li>Export jurisdictional distance (ELD / GPS / TMS)</li>
          <li>Compile fuel purchases and bulk withdrawals</li>
          <li>Compute total miles, taxable gallons, MPG</li>
          <li>Apply current rates per jurisdiction (tax + surcharge)</li>
          <li>Complete base jurisdiction e-file & remit payment</li>
          <li>Archive return package (PDF + spreadsheets + source)</li>
        </ol>
      </div>
      <p className="ifta-related">
        Looking for related state permits? Visit the <Link to="/states">State Permits Hub</Link>.
      </p>

      <footer className="ifta-local-footer" aria-label="IFTA page note">
        <p><strong>Note:</strong> Always verify current tax rates & filing instructions with your base jurisdiction before submission. This summary is for planning & training only.</p>
      </footer>
    </div>
  );
}

export default IFTA;
