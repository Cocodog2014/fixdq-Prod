import GlobalHeader from '../../components/GlobalHeader';

export default function Privacy() {
  return (
    <div className="privacy-page gradient-page">
      <GlobalHeader />
      <main className="legal-generic container" aria-labelledby="privacy-heading">
        <h1 id="privacy-heading">Privacy Policy (Draft)</h1>
        <p>This placeholder outlines how FixDQ intends to handle user data. Replace with finalized policy text before production launch.</p>
        <h2>1. Data We Collect</h2>
        <p>Minimal analytics and voluntary contact submissions. No ELD log ingestion at this stage.</p>
        <h2>2. How We Use Data</h2>
        <p>To improve educational content, respond to inquiries, and measure feature usage.</p>
        <h2>3. Data Sharing</h2>
        <p>No sale of personal data. Limited service provider access (hosting, error monitoring) under duty-of-care agreements.</p>
        <h2>4. Security</h2>
        <p>Industry-standard encryption in transit (HTTPS). Broader security controls will be documented as features expand.</p>
        <h2>5. Contact</h2>
        <p>Questions? Reach out via the FAQ or About page contacts.</p>
      </main>
    </div>
  );
}
