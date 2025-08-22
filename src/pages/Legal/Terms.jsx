import GlobalHeader from '../../components/GlobalHeader';

function Terms() {
  return (
    <div className="terms-page gradient-page">
      <GlobalHeader />
      <main className="terms-content container" aria-labelledby="terms-heading">
        <h1 id="terms-heading">Terms & Conditions</h1>
        <p className="intro">These Terms & Conditions ("Terms") govern your use of the FixDQ application and related content. By accessing or using the site you agree to these Terms.</p>
        <section>
          <h2>1. Not Legal Advice</h2>
          <p>Content provided by FixDQ is for educational and informational purposes only and does not constitute legal advice. For official regulatory interpretation consult the Federal Motor Carrier Safety Administration (FMCSA) or qualified counsel.</p>
        </section>
        <section>
          <h2>2. FMCSA Official Resources</h2>
          <p>We link to authoritative FMCSA resources to help you verify and deepen understanding. Key portals include:</p>
          <ul className="terms-fmcsa-links">
            <li><a href="https://www.fmcsa.dot.gov" target="_blank" rel="noopener noreferrer">FMCSA Home</a></li>
            <li><a href="https://www.fmcsa.dot.gov/regulations" target="_blank" rel="noopener noreferrer">Federal Regulations</a></li>
            <li><a href="https://www.fmcsa.dot.gov/registration" target="_blank" rel="noopener noreferrer">Registration</a></li>
            <li><a href="https://ai.fmcsa.dot.gov/sms/" target="_blank" rel="noopener noreferrer">Safety Measurement System (SMS)</a></li>
            <li><a href="https://csa.fmcsa.dot.gov/" target="_blank" rel="noopener noreferrer">CSA Program</a></li>
            <li><a href="https://dataqs.fmcsa.dot.gov/" target="_blank" rel="noopener noreferrer">DataQs Portal</a></li>
            <li><a href="https://www.fmcsa.dot.gov/regulations/hours-service" target="_blank" rel="noopener noreferrer">Hours of Service</a></li>
            <li><a href="https://www.fmcsa.dot.gov/regulations/medical" target="_blank" rel="noopener noreferrer">Medical Requirements</a></li>
          </ul>
        </section>
        <section>
          <h2>3. User Responsibility</h2>
          <p>You are responsible for verifying any operational or compliance decision against current FMCSA regulations and official guidance.</p>
        </section>
        <section>
          <h2>4. Changes</h2>
          <p>We may update these Terms periodically. Continued use after changes constitutes acceptance.</p>
        </section>
        <section>
          <h2>5. Contact</h2>
          <p>Questions about these Terms? Contact us via the FAQ or About page.</p>
        </section>
      </main>
  {/* GlobalFooter added automatically via route wrapper */}
    </div>
  );
}

export default Terms;
