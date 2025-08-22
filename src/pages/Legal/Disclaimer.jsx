import GlobalHeader from '../../components/GlobalHeader';

export default function Disclaimer() {
  return (
    <div className="disclaimer-page gradient-page">
      <GlobalHeader />
      <main className="legal-generic container" aria-labelledby="disclaimer-heading">
        <h1 id="disclaimer-heading">Disclaimer (Draft)</h1>
        <p>Educational content only; not legal, medical, or professional safety certification advice. Always cross-check with official FMCSA publications.</p>
        <h2>No Warranty</h2>
        <p>Information is provided “as is” without warranties of accuracy, completeness, or fitness for a particular purpose.</p>
        <h2>Limitation of Liability</h2>
        <p>FixDQ is not liable for decisions made solely on the basis of content provided within the application.</p>
      </main>
    </div>
  );
}
