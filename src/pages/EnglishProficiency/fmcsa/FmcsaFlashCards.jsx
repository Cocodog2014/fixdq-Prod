import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import GlobalHeader from '../../../components/GlobalHeader';
// Statically import known datasets for reliability with Vite
import driverInterview from '../content/driverInterview.json';
import trafficSigns from '../content/trafficSigns.json';
// Import sign images from src so bundler resolves URLs reliably
import stopSign from '../../../assets/images/traffic-signs/stop.svg';
import yieldSign from '../../../assets/images/traffic-signs/yield.svg';
import speed55Sign from '../../../assets/images/traffic-signs/speed-55.svg';

const SETTINGS = {
  language: 'ep_supportLanguage',
  textSize: 'ep_textSize',
  ttsRate: 'ep_ttsRate',
  category: 'ep_category',
};

const CATEGORY_DATA = {
  interview: { title: 'Driver Interview (CVSA)', items: driverInterview, type: 'qa' },
  cvsa: { title: 'CVSA Inspection (Q&A)', items: driverInterview, type: 'qa' },
  'traffic-signs': { title: 'Traffic Signs', items: trafficSigns, type: 'concept' },
};

function speak(text, rate = 1, lang = 'en-US') {
  if (!('speechSynthesis' in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang || 'en-US';
  utter.rate = rate;
  try { window.speechSynthesis.cancel(); } catch {}
  window.speechSynthesis.speak(utter);
}

function useSTT() {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recRef = useRef(null);

  useEffect(() => {
    const R = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (R) {
      setSupported(true);
      const r = new R();
      r.lang = 'en-US';
      r.interimResults = true;
      r.maxAlternatives = 1;
      r.onresult = (e) => {
        let str = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          str += e.results[i][0].transcript;
        }
        setTranscript(str.trim());
      };
      r.onend = () => setListening(false);
      recRef.current = r;
    }
  }, []);

  const start = () => {
    if (recRef.current && !listening) {
      setTranscript('');
      setListening(true);
      try { recRef.current.start(); } catch {}
    }
  };

  const stop = () => { if (recRef.current && listening) recRef.current.stop(); };

  return { supported, listening, transcript, start, stop };
}

export default function FmcsaFlashCards() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlCategory = searchParams.get('category');

  const [category, setCategory] = useState(urlCategory || localStorage.getItem('ep_category') || 'interview');
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [flipped, setFlipped] = useState(false);
  const [showTrafficInput, setShowTrafficInput] = useState(false);

  const [ttsRate, setTtsRate] = useState(1);
  const [textSize, setTextSize] = useState('md');
  const [supportLanguage, setSupportLanguage] = useState('none');

  const SUPPORT_LABELS = {
    none: 'None', es: 'Español', uk: 'Українська', ru: 'Русский', zhCN: '中文（简体）', zhTW: '中文（繁體）',
  };
  const SUPPORT_LANG_TAGS = {
    none: 'en-US', es: 'es-US', uk: 'uk-UA', ru: 'ru-RU', zhCN: 'zh-CN', zhTW: 'zh-TW',
  };

  useEffect(() => {
    try { localStorage.setItem('ep_category', category); } catch {}
  }, [category]);

  useEffect(() => {
    try {
      const r = parseFloat(localStorage.getItem('ep_ttsRate'));
      if (r) setTtsRate(r);
      const s = localStorage.getItem('ep_textSize');
      if (s) setTextSize(s);
      const lang = localStorage.getItem('ep_supportLanguage');
      if (lang) setSupportLanguage(lang);
    } catch (e) { console.debug('settings load', e); }
  }, []);

  const dataPack = CATEGORY_DATA[category] || CATEGORY_DATA['interview'];
  const data = dataPack.items || [];

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`ep_progress_${category}`);
      if (raw) {
        const p = JSON.parse(raw);
        if (typeof p.index === 'number') setIndex(Math.min(Math.max(p.index, 0), Math.max(0, data.length - 1)));
      } else {
        setIndex(0);
      }
    } catch (e) { console.debug('progress load', e); setIndex(0); }
  }, [category, data.length]);

  useEffect(() => {
    try { localStorage.setItem(`ep_progress_${category}`, JSON.stringify({ index })); } catch (e) { console.debug('progress save', e); }
  }, [category, index]);

  const item = data[index] || {};
  const wrapperClass = useMemo(() => `ep-page text-${textSize}`, [textSize]);

  const { supported, listening, transcript, start, stop } = useSTT();
  useEffect(() => { if (transcript) setAnswer(transcript); }, [transcript]);

  const next = () => { setIndex((i) => Math.min(i + 1, Math.max(0, data.length - 1))); setAnswer(''); setFlipped(false); setShowTrafficInput(false); };
  const prev = () => { setIndex((i) => Math.max(i - 1, 0)); setAnswer(''); setFlipped(false); setShowTrafficInput(false); };

  const displayQuestion = item.question || item.title || item.prompt || 'Practice';
  const definition = item.definition || item.meaning || item.answer || '';
  const isTraffic = category === 'traffic-signs';
  const TRAFFIC_IMG_BY_ANSWER = {
    'STOP': stopSign,
    'YIELD': yieldSign,
    'SPEED LIMIT 55': speed55Sign,
  };
  const frontImage = isTraffic ? (TRAFFIC_IMG_BY_ANSWER[item.answer] || item.image || null) : null;

  // Auto-read the traffic sign name and definition when flipped to back
  useEffect(() => {
    if (isTraffic && flipped) {
      const backText = [item?.answer, definition].filter(Boolean).join('. ');
      if (backText) speak(backText, ttsRate, 'en-US');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTraffic, flipped, index, ttsRate]);

  return (
    <div className={wrapperClass}>
      <GlobalHeader />
      <section className="section-padding">
        <div className="container">
          <div className="ep-flashcard">
            <div className="ep-back">
              <Link to="/english-proficiency" className="ep-back-link">← English Proficiency</Link>
            </div>

            <div className="ep-fc-card">
              <div className="ep-fc-toprow">
                <div className="ep-progress">{index + 1} / {data.length || 0}</div>
                <div className="ep-top-actions">
                  <button
                    className="btn btn-ghost"
                    onClick={() => {
                      const topSpeakText = isTraffic
                        ? (flipped ? [item?.answer, definition].filter(Boolean).join('. ') : (item?.answer || 'Traffic sign'))
                        : displayQuestion;
                      speak(topSpeakText, ttsRate);
                    }}
                    aria-label={isTraffic ? (flipped ? 'Play sign name and definition' : `Play ${item?.answer || 'sign'}`) : 'Play prompt'}
                    title={isTraffic ? (flipped ? 'Play sign name and definition' : (item?.answer || 'Traffic sign')) : displayQuestion}
                  >🔊</button>
                </div>
              </div>
              {!isTraffic && (
                <h2 className="ep-fc-question">{dataPack.title}</h2>
              )}

              {isTraffic ? (
                <div className="ep-fc-traffic">
                  {!flipped ? (
                    <div className="ep-traffic-front" aria-label="Traffic sign front">
                      {frontImage ? (
                        <img src={frontImage} alt={item.answer || 'Traffic sign'} style={{maxWidth: '260px', width: '100%', height: 'auto', display: 'block', margin: '0 auto'}} />
                      ) : (
                        <div className="ep-help">No image</div>
                      )}
                      {(showTrafficInput || listening || (answer && answer.trim())) && (
                        <div className="ep-fc-answer" style={{marginTop: '12px'}}>
                          <button
                            className="btn btn-ghost ep-answer-tts"
                            onClick={() => { if (answer.trim()) speak(answer.trim(), ttsRate); }}
                            disabled={!answer.trim()}
                            aria-label="Play back my answer"
                            title={answer.trim() ? 'Play your answer' : 'Type or speak an answer first'}
                          >🔊</button>
                          <label htmlFor="traffic-answer" className="sr-only">Your answer</label>
                          <input
                            id="traffic-answer"
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder={`Type your answer${item?.answer ? ` (e.g., ${item.answer})` : ''}`}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="ep-traffic-back" aria-label="Traffic sign back">
                      {frontImage && (
                        <img
                          src={frontImage}
                          alt={item.answer || 'Traffic sign'}
                          style={{maxWidth: '200px', width: '100%', height: 'auto', display: 'block', margin: '0 auto 8px'}}
                        />
                      )}
                      <h3 style={{textAlign: 'center', marginBottom: '8px'}}>{item.answer || 'Sign'}</h3>
                      {definition && (
                        <div className="ep-fc-translation" style={{textAlign: 'center'}}>
                          <button
                            className="btn btn-ghost ep-def-tts"
                            onClick={() => speak(definition, ttsRate, 'en-US')}
                            aria-label="Play definition"
                            title="Play definition"
                          >🔊</button>
                          {definition}
                        </div>
                      )}
                      {supportLanguage !== 'none' && item.translations?.[supportLanguage] && (
                        <div className="ep-fc-translation" style={{textAlign: 'center', marginTop: '6px'}}>
                          <button
                            className="btn btn-ghost ep-def-tts"
                            onClick={() => speak(item.translations[supportLanguage], ttsRate, SUPPORT_LANG_TAGS[supportLanguage])}
                            aria-label="Play translated definition"
                            title="Play translated definition"
                          >🔊</button>
                          <span className="ep-support-chip">{SUPPORT_LABELS[supportLanguage]}</span>
                          {item.translations[supportLanguage]}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {item.paraphrases?.length ? (
                    <p className="ep-fc-paraphrase">Possible: {item.paraphrases[0]}</p>
                  ) : null}

                  {supportLanguage !== 'none' && (
                    item.translations?.[supportLanguage] ? (
                      <p className="ep-fc-translation"><span className="ep-support-chip">{SUPPORT_LABELS[supportLanguage]}</span> {item.translations[supportLanguage]}</p>
                    ) : (
                      <p className="ep-support-chip">Support: {SUPPORT_LABELS[supportLanguage]}</p>
                    )
                  )}

                  <div className="ep-fc-answer">
                    <button
                      className="btn btn-ghost ep-answer-tts"
                      onClick={() => { if (answer.trim()) speak(answer.trim(), ttsRate); }}
                      disabled={!answer.trim()}
                      aria-label="Play back my answer"
                      title={answer.trim() ? 'Play your answer' : 'Type or speak an answer first'}
                    >🔊</button>
                    <label htmlFor="answer" className="sr-only">Your answer</label>
                    <textarea id="answer" rows={4} value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Type your answer in English..." />
                  </div>

                  {definition && (
                    <div className="ep-fc-definition">
                      <button
                        className="btn btn-ghost ep-def-tts"
                        onClick={() => speak(definition, ttsRate, 'en-US')}
                        aria-label="Play definition"
                        title="Play definition"
                      >🔊</button>
                      <strong>Definition:</strong> {definition}
                      {supportLanguage !== 'none' && item.definitionTranslations?.[supportLanguage] && (
                        <div className="ep-fc-translation">
                          <button
                            className="btn btn-ghost ep-def-tts"
                            onClick={() => speak(item.definitionTranslations[supportLanguage], ttsRate, SUPPORT_LANG_TAGS[supportLanguage])}
                            aria-label="Play translated definition"
                            title="Play translated definition"
                          >🔊</button>
                          <span className="ep-support-chip">{SUPPORT_LABELS[supportLanguage]}</span>
                          {item.definitionTranslations[supportLanguage]}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="ep-fc-bottom">
              <button className="btn btn-prev" onClick={prev} disabled={index === 0}>◀ Prev</button>
              <div className="ep-fc-bottom-actions">
                {isTraffic && (
                  <button
                    className="btn"
                    onClick={() => setFlipped((f) => !f)}
                    aria-label={flipped ? 'Flip back' : 'Flip'}
                    title={flipped ? 'Flip back' : 'Flip'}
                    style={{marginRight: '8px'}}
                  >
                    {flipped ? 'Flip back' : 'Flip'}
                  </button>
                )}
        {supported ? (
                  listening ? (
                    <button className="btn" onClick={stop}>⏹️ Stop</button>
                  ) : (
          <button className="btn" onClick={() => { if (isTraffic && !flipped) setShowTrafficInput(true); start(); }}>🎙️ Speak</button>
                  )
                ) : (
                  <span className="ep-help">STT best in Chrome/Edge.</span>
                )}
              </div>
              <button className="btn btn-next" onClick={next} disabled={index === Math.max(0, data.length - 1)}>Next ▶</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
