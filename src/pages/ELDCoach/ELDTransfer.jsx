import GlobalHeader from '../../components/GlobalHeader';

const get = (k, fallback) => { try { return JSON.parse(localStorage.getItem(k)) || fallback; } catch { return fallback; } };

function ELDTransfer() {
  const setup = get('eld.setup', {});
  const dayStart = get('eld.dayStart', {});
  const logs = get('eld.logs', {});

  const exportAll = () => {
    const data = { setup, dayStart, logs };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'eld_data.json'; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="eld-transfer app">
      <GlobalHeader />
      <section className="container">
        <h1>Transfer & Roadside</h1>

        <div className="grid">
          <div className="card">
            <h3>ELD Instruction Card</h3>
            <ol>
              <li>Login to your ELD as the driver.</li>
              <li>Show the officer the last 7/8 days from the ELD display.</li>
              <li>Use the Data Transfer function to send logs via telematics or local transfer.</li>
            </ol>
          </div>

          <div className="card">
            <h3>Data Transfer Tutorial</h3>
            <p>Steps vary by ELD brand/model. Typical flow:</p>
            <ol>
              <li>Menu → Roadside → Data Transfer</li>
              <li>Choose Telematics (Web Services/Email) or Local (USB/Bluetooth)</li>
              <li>Ask the officer for their unique transfer PIN/code (each officer has their own).</li>
              <li>When prompted, enter that PIN in the Comment/Remarks or Code field. This is how the transfer is routed to FMCSA for that officer.</li>
              <li>Enter any additional destination info if your ELD requires it</li>
              <li>Confirm and send; wait for success confirmation</li>
            </ol>
            <p className="note">Note: Don’t attempt a transfer without the officer-provided PIN/code. Many ELDs place the PIN in a Comment/Remarks box during the transfer step.</p>
          </div>

          <div className="card">
            <h3>Last 7/8 Days Preview</h3>
            <p>This preview shows locally saved days (training only).</p>
            <pre className="preview">{JSON.stringify({ setup, dayStart, logs }, null, 2)}</pre>
          </div>
        </div>

        <div className="actions">
          <button className="btn" onClick={() => window.print()}>Print Instruction Packet</button>
          <button className="btn" onClick={exportAll}>Export JSON</button>
        </div>
      </section>
    </div>
  );
}

export default ELDTransfer;
