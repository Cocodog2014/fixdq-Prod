import GlobalHeader from '../../components/GlobalHeader';

export default function AcceptableUse({
  companyName = 'FixDQ',
  contactEmail = 'support@fixdq.org',
  policyVersion = '1.0',
  lastUpdated = '2025-08-22',
  onAccept,
}) {
  return (
    <div className="acceptable-use-page gradient-page">
      <GlobalHeader />
      <main className="legal-generic container" aria-labelledby="aup-heading">
        <header>
          <h1 id="aup-heading">{companyName} – Acceptable Use Policy</h1>
          <p className="legal-meta">Version {policyVersion} • Last updated {lastUpdated}</p>
        </header>

        <nav className="legal-toc" aria-label="Contents">
          <a href="#overview">Overview</a>
          <a href="#prohibited">Prohibited Use</a>
          <a href="#allowed">Allowed Examples</a>
          <a href="#enforcement">Enforcement</a>
          <a href="#reporting">Reporting</a>
          <a href="#definitions">Definitions</a>
        </nav>

        <section id="overview" className="legal-section">
          <h2>Overview</h2>
          <p>This Acceptable Use Policy (AUP) defines boundaries for appropriate application use to protect drivers, data integrity, and the platform. By using {companyName}, you agree to comply with this AUP.</p>
          <p className="legal-note">This AUP applies to all users and all features of the site.</p>
        </section>

        <section id="prohibited" className="legal-section">
          <h2>Prohibited Use</h2>
          <ul className="legal-list">
            <li><strong>Automated scraping without consent.</strong> Using bots, crawlers, or scripts to extract data, overwhelm services, or degrade performance.</li>
            <li><strong>Misrepresentation of data sources.</strong> Presenting third‑party content as your own, falsifying inspection, safety, or compliance information, or manipulating outputs.</li>
            <li><strong>Bypassing security controls.</strong> Attempting to access hidden features, circumvent rate limits, tamper with storage, or probe for vulnerabilities.</li>
            <li><strong>Uploading unlawful or infringing content.</strong> Including material that is illegal, defamatory, harassing, private/sensitive without consent, or violates intellectual property.</li>
            <li><strong>Malware or harmful code.</strong> Uploading or linking to code that exploits browsers, injects ads, or collects data without permission.</li>
            <li><strong>Abuse of communication features.</strong> Spam, phishing, deceptive promotions, or misusing contact forms to harass others.</li>
          </ul>
          <details className="legal-details">
            <summary>Clarifying examples</summary>
            <ul className="legal-list tight">
              <li>Running a headless browser to copy entire modules or datasets.</li>
              <li>Editing local storage to fake training/inspection outcomes.</li>
              <li>Sharing copyrighted manuals without permission.</li>
              <li>Posting someone else’s DOT/medical information without consent.</li>
            </ul>
          </details>
        </section>

        <section id="allowed" className="legal-section">
          <h2>Allowed Examples</h2>
            <ul className="legal-list">
              <li>Personal, educational, and business use by drivers and fleets.</li>
              <li>Saving preferences locally in your browser for your own use.</li>
              <li>Linking to official sources (FMCSA, state DMVs) with attribution.</li>
              <li>Providing feedback and requesting features via the contact channel.</li>
            </ul>
            <p className="legal-note">{companyName} is a static, client‑side app. Data stays local; we do not receive or host your personal data. See the Data Handling Policy for details.</p>
        </section>

        <section id="enforcement" className="legal-section">
          <h2>Enforcement</h2>
          <ol className="legal-ordered">
            <li>We may warn, restrict features, or block access for violations.</li>
            <li>Minimal technical logs (if later enabled) may be preserved to investigate abuse.</li>
            <li>We may cooperate with lawful requests from authorities where required.</li>
          </ol>
        </section>

        <section id="reporting" className="legal-section">
          <h2>Reporting Violations</h2>
          <p>Report abuse or suspected violations: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. Include a description, screenshots, and relevant URLs.</p>
        </section>

        <section id="definitions" className="legal-section">
          <h2>Key Definitions</h2>
          <dl className="legal-defs">
            <dt>Automated Scraping</dt>
            <dd>Programmatic extraction of content or metadata without express permission.</dd>
            <dt>Security Controls</dt>
            <dd>Technical or process safeguards that protect users and the application.</dd>
            <dt>Unlawful Content</dt>
            <dd>Material that violates laws or infringes intellectual property or privacy.</dd>
          </dl>
        </section>

        <form className="legal-ack" onSubmit={(e) => { e.preventDefault(); onAccept && onAccept(); }}>
          <label className="legal-ack-label">
            <input type="checkbox" onChange={(e) => e.target.checked && onAccept && onAccept()} />
            <span>I have read and agree to the {companyName} Acceptable Use Policy.</span>
          </label>
        </form>
      </main>
    </div>
  );
}
