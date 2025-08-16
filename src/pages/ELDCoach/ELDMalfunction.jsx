import GlobalHeader from '../../components/GlobalHeader';

function ELDMalfunction() {
  return (
    <div className="eld-malfunction app">
      <GlobalHeader />
      <section className="container">
        <h1>Malfunction & Diagnostics</h1>
        <div className="card">
          <h3>What to do</h3>
          <ol>
            <li>Notify carrier within 24 hours of malfunction or diagnostic event.</li>
            <li>Reconstruct the record for the current 24-hour period if possible.</li>
            <li>Use paper logs if necessary for up to 8 days.</li>
            <li>Keep a copy of this instruction with the vehicle.</li>
          </ol>
          <div className="actions">
            <button className="btn" onClick={() => window.print()}>Print Instructions</button>
            <button className="btn" onClick={() => window.open('/eld-coach/paper-log', '_self')}>Open Paper Log</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ELDMalfunction;
