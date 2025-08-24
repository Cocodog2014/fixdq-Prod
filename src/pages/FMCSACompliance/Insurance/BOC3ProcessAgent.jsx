import React from 'react';
import './BOC3ProcessAgent.css';

/*
  BOC-3 Process Agent Landing Component
  - Uses existing global landing grid system (.landing-grid / .landing-card)
  - Presents key sections as cards with quick-scan summaries
  - Deep-dive content below for scroll reading
*/
export default function BOC3ProcessAgent() {
  return (
    <div className="boc3-page gradient-page">
      <div className="container boc3-container">
        <header className="boc3-hero">
          <h1>BOC-3 Process Agents</h1>
          <p className="boc3-sub">Designation of Process Agents (Form BOC‑3) – what it is, who needs it, how to file, and how to stay compliant.</p>
          <div className="boc3-hero-links">
            <a className="boc3-btn boc3-btn--fmcsa" href="https://www.fmcsa.dot.gov/registration/process-agents" target="_blank" rel="noopener noreferrer">Official FMCSA BOC‑3 Page</a>
            <a className="boc3-btn ghost" href="#boc3-faq">Jump to FAQ</a>
          </div>
        </header>

        {/* Overview Cards */}
        <section aria-labelledby="boc3-overview-heading" className="boc3-section">
          <h2 id="boc3-overview-heading" className="visually-hidden">Overview Highlights</h2>
          <div className="landing-grid">
            <div className="landing-card boc3-card-def">
              <h3>Definition</h3>
              <p>The BOC‑3 (Designation of Process Agents) lists a person/company in each state authorized to accept legal documents for you.</p>
              <span className="badge">Core</span>
            </div>
            <div className="landing-card boc3-card-who">
              <h3>Who Needs It</h3>
              <p>Motor carriers, brokers, and freight forwarders must have an active BOC‑3 on file before authority is granted.</p>
            </div>
            <div className="landing-card boc3-card-why">
              <h3>Why It Matters</h3>
              <p>Ensures lawsuits & official notices reach you. Missing or invalid agents can delay authority or jeopardize legal defense.</p>
            </div>
            <div className="landing-card boc3-card-how">
              <h3>How It’s Filed</h3>
              <p>Usually e‑filed by a blanket process agent company covering all 50 states + D.C.; you retain a copy.</p>
            </div>
            <div className="landing-card boc3-card-special">
              <h3>Special Case</h3>
              <p>Brokers who do not operate CMVs may self‑file, but most still use a blanket service for efficiency.</p>
            </div>
            <div className="landing-card boc3-card-updates">
              <h3>Updating</h3>
              <p>Change blanket company? New BOC‑3 must be filed promptly; keep prior copy in records for at least 3 years.</p>
            </div>
          </div>
        </section>

        {/* Deep Dive */}
        <section className="boc3-detail" aria-labelledby="boc3-detail-heading">
          <h2 id="boc3-detail-heading">In Depth</h2>
          <article className="boc3-article landing-card boc3-card-def" aria-labelledby="boc3-definition">
            <h3 id="boc3-definition">What Is a BOC‑3?</h3>
            <p>A federal filing (49 CFR §366) designating a process agent in each state where operations occur. For most interstate authorities, a blanket process agent service supplies all 50 states + D.C. with a single electronic filing.</p>
            <ul className="boc3-list">
              <li>Required before FMCSA grants operating authority (MC/FF number activation).</li>
              <li>Filed once, remains active unless revoked or replaced.</li>
              <li>Serves as legal service-of-process gateway for lawsuits, subpoenas, and official notices.</li>
            </ul>
          </article>

          <article className="boc3-article landing-card boc3-card-who" aria-labelledby="boc3-who">
            <h3 id="boc3-who">Who Must File</h3>
            <ul className="boc3-list">
              <li>For‑hire Motor Carriers (property or passenger)</li>
              <li>Brokers (property & household goods)</li>
              <li>Freight Forwarders (property & household goods)</li>
            </ul>
            <p><strong>Not usually required</strong> for purely intrastate carriers not seeking federal operating authority (check state law).</p>
          </article>

          <article className="boc3-article landing-card boc3-card-why" aria-labelledby="boc3-why">
            <h3 id="boc3-why">Why It Matters</h3>
            <p>Without a reliable process agent network you could miss time‑sensitive legal documents (summons, complaints). That can lead to default judgments or delayed authority issuance.</p>
            <ul className="boc3-list">
              <li>Authority won’t be granted until a valid BOC‑3 is on file.</li>
              <li>Helps maintain transparency & accountability.</li>
              <li>Supports due process in multi‑state operations.</li>
            </ul>
          </article>

          <article className="boc3-article landing-card boc3-card-how" aria-labelledby="boc3-how-filed">
            <h3 id="boc3-how-filed">How Filing Works</h3>
            <ol className="boc3-ordered">
              <li>Select a reputable blanket process agent company.</li>
              <li>Provide legal entity name, DBA (if any), principal address, MC/FF/Broker docket #, USDOT # (if assigned).</li>
              <li>Service e‑files BOC‑3 with FMCSA (usually within 24 hours).</li>
              <li>You receive a confirmation / copy (retain with compliance docs).</li>
              <li>Monitor Licensing & Insurance system to verify posting.</li>
            </ol>
            <p className="boc3-note">Self‑filing: Only brokers with no commercial motor vehicles may self‑file. Must still designate an agent in each state – manual and slower.</p>
          </article>

          <article className="boc3-article landing-card boc3-card-special" aria-labelledby="boc3-choosing">
            <h3 id="boc3-choosing">Choosing a Blanket Company</h3>
            <ul className="boc3-list">
              <li><strong>Transparency:</strong> Clear published pricing and service terms.</li>
              <li><strong>Coverage:</strong> All 50 states + D.C. – verify list.</li>
              <li><strong>Notifications:</strong> Prompt email forwarding of served documents.</li>
              <li><strong>Data accuracy:</strong> They validate entity name & address vs FMCSA records.</li>
              <li><strong>Support:</strong> Phone & email during business hours.</li>
            </ul>
            <p><strong>Typical costs:</strong> $20 – $60 one‑time or first year; some bundle with compliance packages. Beware of upsells masquerading as mandatory fees.</p>
            <p className="boc3-warning">Red flags: No physical address, high-pressure sales, refusal to send sample filing, or unreasonably high fees.</p>
          </article>

          <article className="boc3-article landing-card boc3-card-updates" aria-labelledby="boc3-maintenance">
            <h3 id="boc3-maintenance">Maintaining Compliance</h3>
            <ul className="boc3-list">
              <li>Keep BOC‑3 copy with corporate / compliance records.</li>
              <li>Update if legal name or principal address changes (coordinate with MCS‑150 updates).</li>
              <li>Switch blanket companies only after confirming new filing posted.</li>
              <li>Audit L&I docket annually to ensure agent data hasn’t lapsed.</li>
            </ul>
          </article>

          <article className="boc3-article landing-card boc3-card-faq" aria-labelledby="boc3-faq" id="boc3-faq">
            <h3 id="boc3-faq-heading">FAQ</h3>
            <details>
              <summary>Is the BOC‑3 the same as a Registered Agent?</summary>
              <p>No. Registered Agents are state corporate law requirements. BOC‑3 agents handle federal FMCSA service of process.</p>
            </details>
            <details>
              <summary>How long does filing take?</summary>
              <p>Most blanket services file the same or next business day; FMCSA L&I reflects it shortly after processing.</p>
            </details>
            <details>
              <summary>Do I refile annually?</summary>
              <p>Not unless you change blanket companies or data changes. Maintain current records.</p>
            </details>
            <details>
              <summary>Can I have multiple blanket companies?</summary>
              <p>Only one active designation; a new filing replaces the previous.</p>
            </details>
          </article>
        </section>

        <footer className="boc3-footer">
          <p>Always verify current requirements with the FMCSA. Regulations and portal procedures can change.</p>
          <p><a href="https://www.fmcsa.dot.gov/registration/process-agents" target="_blank" rel="noopener noreferrer">Official FMCSA Process Agents Page</a></p>
        </footer>
      </div>
    </div>
  );
}
