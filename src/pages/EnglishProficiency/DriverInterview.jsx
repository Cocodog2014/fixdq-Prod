import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalHeader from '../../components/GlobalHeader';
import data from './content/driverInterview.json';

const PROGRESS_KEY = 'ep_progress_driverInterview';
const SETTINGS = {
  language: 'ep_supportLanguage',
  textSize: 'ep_textSize',
  ttsRate: 'ep_ttsRate',
};

function speak(text, rate = 1, lang = 'en-US') {
  if (!('speechSynthesis' in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang || 'en-US';
  utter.rate = rate;
  window.speechSynthesis.cancel();
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
      try { recRef.current.start(); } catch (e) { /* already started */ }
    }
  };

  const stop = () => {
    if (recRef.current && listening) {
      recRef.current.stop();
    }
  };

  return { supported, listening, transcript, start, stop };
}

export default function DriverInterview() {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');

  const [ttsRate, setTtsRate] = useState(1);
  const [textSize, setTextSize] = useState('md');
  const [supportLanguage, setSupportLanguage] = useState('none');

  const SUPPORT_LABELS = {
    none: 'None',
    es: 'Español',
    uk: 'Українська',
    ru: 'Русский',
    zhCN: '中文（简体）',
    zhTW: '中文（繁體）',
  };

  // Map support languages to TTS BCP-47 language tags
  const SUPPORT_LANG_TAGS = {
    none: 'en-US',
    es: 'es-US', // fallback; browsers may choose available Spanish voice
    uk: 'uk-UA',
    ru: 'ru-RU',
    zhCN: 'zh-CN',
    zhTW: 'zh-TW',
  };

  // Load settings
  useEffect(() => {
    try {
      const r = parseFloat(localStorage.getItem(SETTINGS.ttsRate));
      if (r) setTtsRate(r);
      const s = localStorage.getItem(SETTINGS.textSize);
      if (s) setTextSize(s);
  const lang = localStorage.getItem(SETTINGS.language);
  if (lang) setSupportLanguage(lang);
    } catch (e) { console.debug('settings load', e); }
  }, []);

  // Load progress
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PROGRESS_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (typeof p.index === 'number') setIndex(Math.min(Math.max(p.index, 0), data.length - 1));
      }
    } catch (e) { console.debug('progress load', e); }
  }, []);

  // Save progress
  useEffect(() => {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify({ index })); } catch (e) { console.debug('progress save', e); }
  }, [index]);

  const item = data[index];
  const wrapperClass = useMemo(() => `ep-page text-${textSize}`, [textSize]);

  const { supported, listening, transcript, start, stop } = useSTT();

  useEffect(() => { if (transcript) setAnswer(transcript); }, [transcript]);

  const next = () => { setIndex((i) => Math.min(i + 1, data.length - 1)); setAnswer(''); };
  const prev = () => { setIndex((i) => Math.max(i - 1, 0)); setAnswer(''); };

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
                <div className="ep-progress">{index + 1} / {data.length}</div>
                <div className="ep-top-actions">
                  <button className="btn btn-ghost" onClick={() => speak(item.question, ttsRate)} aria-label="Play question">🔊</button>
                </div>
              </div>
              <h2 className="ep-fc-question">{item.question}</h2>
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

              {/* Definition replaces model answers; show localized definition if available */}
              {item.definition && (
                <div className="ep-fc-definition">
                  <button
                    className="btn btn-ghost ep-def-tts"
                    onClick={() => speak(item.definition, ttsRate, 'en-US')}
                    aria-label="Play definition"
                    title="Play definition"
                  >🔊</button>
                  <strong>Definition:</strong> {item.definition}
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

              {/* No automated feedback; practicing free response. */}
            </div>

            <div className="ep-fc-bottom">
              <button className="btn" onClick={prev} disabled={index === 0}>◀ Prev</button>
              <div className="ep-fc-bottom-actions">
                {supported ? (
                  listening ? (
                    <button className="btn" onClick={stop}>⏹️ Stop</button>
                  ) : (
                    <button className="btn" onClick={start}>🎙️ Speak</button>
                  )
                ) : (
                  <span className="ep-help">STT best in Chrome/Edge.</span>
                )}
              </div>
              <button className="btn" onClick={next} disabled={index === data.length - 1}>Next ▶</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
