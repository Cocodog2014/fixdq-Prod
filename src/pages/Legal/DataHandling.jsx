import GlobalHeader from '../../components/GlobalHeader';

export default function DataHandling() {
  return (
    <div className="data-handling-page gradient-page">
      <GlobalHeader />
      <main className="legal-generic container" aria-labelledby="data-heading">
        <h1 id="data-heading">Data Handling Policy</h1>
        <p className="intro"><strong>FixDQ</strong> is a client‑side (GitPages) application. All data stays local in your browser; nothing is sent to FixDQ servers because we don’t run a server for this app yet.</p>

        <section>
          <h2>Overview</h2>
          <p>FixDQ is built to operate fully in the user’s browser. Any preferences, lightweight notes, or calculated outputs exist only on your device. We do not receive, process, or retain that data remotely.</p>
        </section>

        <section>
          <h2>Data Lifecycle</h2>
          <h3>Storage</h3>
          <ul className="legal-list">
            <li><strong>Local Only:</strong> Data (e.g., preferences, progress flags, recent choices) is stored in browser storage (LocalStorage and/or IndexedDB).</li>
            <li><strong>No Server Collection:</strong> Nothing is transmitted to FixDQ or any cloud provider.</li>
          </ul>
          <h3>Retention</h3>
          <ul className="legal-list">
            <li><strong>Browser-Controlled:</strong> Data persists only while it remains in your browser’s storage.</li>
            <li><strong>User-Cleared:</strong> Clear site data (cache / storage) in browser settings to remove everything instantly.</li>
            <li><strong>Session Only (ephemeral values):</strong> Some temporary calculations may exist only for the active tab/session (in-memory) and disappear on refresh or close.</li>
          </ul>
          <h3>Deletion</h3>
          <ul className="legal-list">
            <li><strong>User-Initiated:</strong> You fully control deletion by clearing site storage.</li>
            <li><strong>Automatic:</strong> Browser resets, profile removals, or storage purges (including private browsing session end) erase all FixDQ data.</li>
          </ul>
        </section>

        <section>
          <h2>Future Enhancements</h2>
          <ul className="legal-list">
            <li><strong>Optional Cloud Sync:</strong> If we later add authentication or syncing, we will publish a detailed update covering what is stored, retention schedules, and user deletion controls.</li>
            <li><strong>Timers & Expiry:</strong> Planned features may introduce automatic expiry for transient operational data (e.g., recent calculators or draft inputs).</li>
          </ul>
        </section>

        <section>
          <h2>Key Point for Users</h2>
          <p><strong>Everything stays on your device. We don’t see or store your data.</strong> If/when this changes, the policy will be versioned and clearly highlighted.</p>
        </section>
      </main>
    </div>
  );
}
