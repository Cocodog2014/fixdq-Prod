import { useMemo, useState } from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import { Link } from 'react-router-dom';

// Lightweight Soundex (American) implementation for "sound alike" matching
function soundex(str) {
  if (!str) return '';
  const s = str.toUpperCase().replace(/[^A-Z]/g, '');
  if (!s) return '';
  const map = { B:1, F:1, P:1, V:1, C:2, G:2, J:2, K:2, Q:2, S:2, X:2, Z:2, D:3, T:3, L:4, M:5, N:5, R:6 };
  const first = s[0];
  let prev = map[first] || 0;
  let out = first;
  for (let i = 1; i < s.length && out.length < 4; i++) {
    const code = map[s[i]] || 0;
    if (code !== 0 && code !== prev) out += code;
    prev = code;
  }
  return (out + '0000').slice(0, 4);
}

export default function MostCommonViolations() {
  // Eagerly import all JSON in content folder
  const modules = import.meta.glob('./content/*.json', { eager: true });
  const items = useMemo(() => {
    const out = [];
    for (const [path, mod] of Object.entries(modules)) {
      if (path.endsWith('MostCommon.json')) continue; // curated list excluded to avoid duplicates
      const obj = (mod && mod.default) || mod;
      if (!obj || typeof obj !== 'object') continue;
      for (const [category, arr] of Object.entries(obj)) {
        if (Array.isArray(arr)) {
          for (const entry of arr) {
            const rec = { ...entry, category, title: category };
            out.push(rec);
          }
        }
      }
    }
    return out;
  }, [modules]);

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category));
    return ['All', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [items]);

  const [category, setCategory] = useState(''); // empty = none selected
  const [query, setQuery] = useState('');

  const querySX = useMemo(() => soundex(query), [query]);

  const filtered = useMemo(() => {
    // When no category is chosen and no query, hide all results
    if (!query.trim() && category === '') return [];
    const base = category === '' || category === 'All' ? items : items.filter((i) => i.category === category);
    if (!query.trim()) return base;
    const q = query.trim().toLowerCase();
    return base.filter((i) => {
      const hay = `${i.category} ${i.code} ${i.description} ${i.recommendedAction}`.toLowerCase();
      if (hay.includes(q)) return true;
      // sound-alike compare on words
      const hx = new Set(hay.split(/\s+/).map(soundex));
      return q.split(/\s+/).some((tok) => hx.has(soundex(tok)) || (querySX && hx.has(querySX)));
    });
  }, [items, category, query, querySX]);

  return (
    <div className="app violation-management-page most-common-page">
      <GlobalHeader />
      <section className="section-padding">
        <div className="container">
          <div className="vm-header">
            <span className="vm-icon" aria-hidden>📌</span>
            <h1 id="mc-title">Most Common Violations</h1>
          </div>
          <p className="vm-sub">How they affect your safety score — and how to fix them.</p>

          <div className="vm-card vm-tile tile-green" role="region" aria-labelledby="mc-title">
            <div className="vm-rail rail-green" aria-hidden></div>
            <div className="vm-body">
              <div className="mc-controls" role="group" aria-label="Filters and search">
                <label className="sr-only" htmlFor="mc-category">Category</label>
                <select id="mc-category" value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Category" className="mc-select">
                  <option value="" disabled>Select a category</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <label className="sr-only" htmlFor="mc-search">Search</label>
                <input
                  id="mc-search"
                  type="search"
                  placeholder="Search (includes sound‑alike)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="mc-search"
                  aria-label="Search violations"
                />
              </div>

              <ul className="mc-list" aria-live="polite">
                {filtered.length === 0 && (
                  <li className="mc-item">
                    <p className="vm-note">
                      {category === '' && !query.trim() ? 'Select a category or start typing to search.' : 'No matches. Try a different term.'}
                    </p>
                  </li>
                )}
                {filtered.map((b, i) => (
                  <li key={`${b.code}-${i}`} className="mc-item">
                    <div className="mc-violation">
                      <div className="mc-row">
                        <h3 className="mc-item-title">{b.title}</h3>
                        <span className="mc-code mc-code-pill">{b.code}</span>
                      </div>
                      <p className="mc-item-desc"><strong>Description:</strong> {b.description}</p>
                      <p className="mc-item-impact"><strong>Severity:</strong> {b.severity} <span className="mc-severity-note">(higher = greater CSA impact)</span></p>
                      <p className="mc-item-fix"><strong>Recommended:</strong> {b.recommendedAction}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="vm-note">Tip: search is phonetic-aware (e.g., "breeks" ≈ "brakes").</p>
            </div>
          </div>

          <div className="vm-actions">
            <Link to="/violations-management" className="btn-link">← Back to Violations Management</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
