import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/GlobalHeader';

// Local storage helpers
const LS_KEYS = {
  language: 'ep_supportLanguage',
  textSize: 'ep_textSize',
  ttsRate: 'ep_ttsRate',
};

const LANGUAGES = [
  { value: 'none', label: 'None' },
  { value: 'es', label: 'Español' },
  { value: 'uk', label: 'Українська' },
  { value: 'ru', label: 'Русский' },
  { value: 'zhCN', label: '中文（简体）' },
  { value: 'zhTW', label: '中文（繁體）' },
];

const TEXT_SIZES = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
];

const CATEGORIES = [
  { value: 'cvsa', label: 'CVSA Inspection' },
  { value: 'interview', label: 'Driver Interview (Q&A)' },
  { value: 'commands', label: 'Officer Commands → Driver Responses' },
  { value: 'pretrip', label: 'Pre-Trip phrases' },
  { value: 'vehicledocs', label: 'Vehicle & Documents' },
  { value: 'violations', label: 'Common Violations (Simple English)' },
  { value: 'safety', label: 'Safety & Score Impact (CSA basics)' },
  { value: 'dataqs', label: 'DataQs / Appeal Process (6-step English)' },
];

export default function EnglishProficiency() {
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [supportLanguage, setSupportLanguage] = useState('none');
  const [textSize, setTextSize] = useState('md');
  const [ttsRate, setTtsRate] = useState(1.0);
  const [category, setCategory] = useState('cvsa');

  // Load persisted settings
  useEffect(() => {
    try {
      const lsLang = localStorage.getItem(LS_KEYS.language);
      const lsSize = localStorage.getItem(LS_KEYS.textSize);
      const lsRate = localStorage.getItem(LS_KEYS.ttsRate);
      if (lsLang) setSupportLanguage(lsLang);
      if (lsSize) setTextSize(lsSize);
      if (lsRate) setTtsRate(parseFloat(lsRate) || 1.0);
    } catch (e) { console.debug('Load settings failed', e); }
  }, []);

  // Persist settings
  useEffect(() => {
    try { localStorage.setItem(LS_KEYS.language, supportLanguage); } catch (e) { console.debug('Save lang failed', e); }
  }, [supportLanguage]);
  useEffect(() => {
    try { localStorage.setItem(LS_KEYS.textSize, textSize); } catch (e) { console.debug('Save size failed', e); }
  }, [textSize]);
  useEffect(() => {
    try { localStorage.setItem(LS_KEYS.ttsRate, String(ttsRate)); } catch (e) { console.debug('Save rate failed', e); }
  }, [ttsRate]);

  const wrapperClass = useMemo(() => `ep-page text-${textSize}`, [textSize]);

  const handleStart = () => {
    // For M1 preview, lead to Driver Interview placeholder route
    navigate('/english-proficiency/driver-interview');
  };

  return (
    <div className={wrapperClass}>
      <GlobalHeader />

      {/* Hero / Landing */}
      <header className="ep-hero section-padding">
        <div className="container">
          <h1 className="ep-tagline">Safe Drivers. Clear English. Strong America.</h1>
          <p className="ep-subtext">Prepare for CVSA inspections with English you can understand and speak confidently.</p>

          <div className="ep-actions">
            <button className="btn btn-primary" onClick={() => setSettingsOpen(true)} aria-haspopup="dialog">
              ⚙️ Settings
            </button>
          </div>
        </div>
      </header>

      {/* Why sections */}
      <section className="ep-why section-padding">
        <div className="container">
          <div className="ep-card">
            <h2>Why English Matters on the Road</h2>
            <ul>
              <li>CVSA officers interview drivers in English.</li>
              <li>Clear answers mean fewer violations, less stress, faster inspections.</li>
              <li>English helps you handle documents, safety checks, and officer commands.</li>
            </ul>
          </div>

          <div className="ep-card">
            <h2>Drivers Keep America Rolling</h2>
            <p>
              Professional drivers move the food, medicine, and supplies that keep our country running. Skilled, safe,
              and prepared drivers protect families, communities, and the economy. By learning inspection English, you’re
              not just helping yourself—you’re helping America.
            </p>
          </div>
        </div>
      </section>

      {/* Category + CTA */}
      <section className="ep-category section-padding">
        <div className="container">
          <div className="ep-card">
            <h2>Choose a Practice Area</h2>
            <div className="ep-row">
              <label className="sr-only" htmlFor="ep-category">Category</label>
              <select id="ep-category" value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <button className="btn btn-primary" onClick={handleStart}>▶ Start Training</button>
            </div>
            {supportLanguage !== 'none' && (
              <p className="ep-lang-reminder">Support language: {LANGUAGES.find(l => l.value === supportLanguage)?.label}</p>
            )}
          </div>
        </div>
      </section>

      {/* Closing banner */}
      <section className="ep-banner section-padding">
        <div className="container">
          <p className="ep-banner-text">You’re not just driving a truck—you’re driving America forward.</p>
          <button className="btn btn-primary" onClick={handleStart}>🚚 Begin Practice</button>
        </div>
      </section>

      {/* Settings Modal */}
      {settingsOpen && (
        <div className="ep-modal" role="dialog" aria-modal="true" aria-label="Settings">
          <div className="ep-modal-content">
            <div className="ep-modal-header">
              <h3>Settings</h3>
              <button className="ep-close" onClick={() => setSettingsOpen(false)} aria-label="Close">✖</button>
            </div>
            <div className="ep-modal-body">
              <div className="ep-field">
                <label htmlFor="ep-language">Support language</label>
                <select id="ep-language" value={supportLanguage} onChange={(e) => setSupportLanguage(e.target.value)}>
                  {LANGUAGES.map((l) => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </select>
                <p className="ep-help">Shows an optional translation under English. English TTS/STT only.</p>
              </div>

              <div className="ep-field">
                <label htmlFor="ep-text-size">Text size</label>
                <select id="ep-text-size" value={textSize} onChange={(e) => setTextSize(e.target.value)}>
                  {TEXT_SIZES.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div className="ep-field">
                <label htmlFor="ep-tts-rate">Speech rate (English TTS)</label>
                <input
                  id="ep-tts-rate"
                  type="range"
                  min={0.6}
                  max={1.4}
                  step={0.05}
                  value={ttsRate}
                  onChange={(e) => setTtsRate(parseFloat(e.target.value))}
                />
                <div className="ep-range-readout">{ttsRate.toFixed(2)}×</div>
              </div>

              <div className="ep-divider" />
              <button className="btn" onClick={() => {
                try {
                  localStorage.removeItem(LS_KEYS.language);
                  localStorage.removeItem(LS_KEYS.textSize);
                  localStorage.removeItem(LS_KEYS.ttsRate);
                } catch (e) { console.debug('Reset failed', e); }
                setSupportLanguage('none');
                setTextSize('md');
                setTtsRate(1.0);
              }}>Reset settings</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
