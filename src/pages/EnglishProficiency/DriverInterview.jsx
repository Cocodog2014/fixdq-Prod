import { useEffect, useMemo, useRef, useState } from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import data from './content/driverInterview.json';

const PROGRESS_KEY = 'ep_progress_driverInterview';
const SETTINGS = {
  language: 'ep_supportLanguage',
  textSize: 'ep_textSize',
  ttsRate: 'ep_ttsRate',
};

// Basic keyword groups for rule checks
const KEYWORDS = {
  destinationWords: ['to', 'going', 'go', 'destination', 'city', 'state'],
  cargoWords: ['load', 'cargo', 'freight', 'trailer', 'pallet', 'pallets', 'boxes'],
};

function speak(text, rate = 1) {
  if (!('speechSynthesis' in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
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

function evaluateAnswer(item, text) {
  const t = (text || '').toLowerCase();
  const words = t.split(/[^a-z0-9]+/).filter(Boolean);
  const hasAny = (arr) => arr.some((w) => t.includes(w));

  // Completeness/clarity
  if (words.length < 3) {
    return { level: 'hint', message: 'Try a full sentence (3+ words).', offTopic: false };
  }

  // Off-topic checks per outline
  if (item.intent === 'destination' && hasAny(KEYWORDS.cargoWords)) {
    return { level: 'warn', message: 'Off topic: answer the destination (place).', offTopic: true };
  }
  if (item.intent === 'cargo' && hasAny(KEYWORDS.destinationWords)) {
    return { level: 'warn', message: 'Off topic: answer the cargo (what is in the truck).', offTopic: true };
  }

  // Minimal keyword include check
  if (item.keywords?.include?.length) {
    const ok = item.keywords.include.some((k) => t.includes(k));
    if (!ok) return { level: 'hint', message: 'Add a key detail for this question.', offTopic: false };
  }

  // Intent-specific gentle nudges
  switch (item.intent) {
    case 'destination':
      return { level: 'ok', message: 'Good. Include city and state if you can.', offTopic: false };
    case 'origin':
      return { level: 'ok', message: 'Good. Include where you started today.', offTopic: false };
    case 'duration':
      return { level: 'ok', message: 'Good. Include start time or hours driven.', offTopic: false };
    case 'cargo':
      return { level: 'ok', message: 'Good. Name the cargo type (e.g., lumber, produce).', offTopic: false };
    default:
      return { level: 'ok', message: 'Looks clear.', offTopic: false };
  }
}

export default function DriverInterview() {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  const [ttsRate, setTtsRate] = useState(1);
  const [textSize, setTextSize] = useState('md');

  // Load settings
  useEffect(() => {
    try {
      const r = parseFloat(localStorage.getItem(SETTINGS.ttsRate));
      if (r) setTtsRate(r);
      const s = localStorage.getItem(SETTINGS.textSize);
      if (s) setTextSize(s);
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

  const onCheck = () => {
    const fb = evaluateAnswer(item, answer);
    setFeedback(fb);
    setShowBack(true);
  };

  const next = () => { setIndex((i) => Math.min(i + 1, data.length - 1)); setShowBack(false); setAnswer(''); setFeedback(null); };
  const prev = () => { setIndex((i) => Math.max(i - 1, 0)); setShowBack(false); setAnswer(''); setFeedback(null); };

  return (
    <div className={wrapperClass}>
      <GlobalHeader />
      <section className="section-padding">
        <div className="container">
          <div className="ep-card">
            <div className="ep-toprow">
              <div className="ep-progress">Question {index + 1} / {data.length}</div>
              <div className="ep-controls">
                <button className="btn" onClick={() => speak(item.question, ttsRate)}>🔊 Question</button>
                <button className="btn" onClick={() => speak(item.modelAnswers?.[0] || '', ttsRate)}>🔊 Model</button>
              </div>
            </div>

            <h2 className="ep-question">{item.question}</h2>
            {item.paraphrases?.length ? (
              <p className="ep-paraphrase">Possible: {item.paraphrases[0]}</p>
            ) : null}

            <div className="ep-answerbox">
              <label htmlFor="answer" className="sr-only">Your answer</label>
              <textarea id="answer" rows={3} value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Type your answer in English..." />
              <div className="ep-row">
                {supported ? (
                  listening ? (
                    <button className="btn" onClick={stop}>⏹️ Stop</button>
                  ) : (
                    <button className="btn" onClick={start}>🎙️ Speak</button>
                  )
                ) : (
                  <span className="ep-help">Speech-to-text works best in Chrome/Edge.</span>
                )}
                <button className="btn btn-primary" onClick={onCheck}>✅ Check</button>
              </div>
            </div>

            {feedback && (
              <div className={`ep-feedback level-${feedback.level}`}>
                {feedback.message}
              </div>
            )}

            {showBack && (
              <div className="ep-model">
                <div className="ep-model-label">Model answer</div>
                <p>{item.modelAnswers?.[0]}</p>
              </div>
            )}

            <div className="ep-nav">
              <button className="btn" onClick={prev} disabled={index === 0}>◀ Prev</button>
              <button className="btn" onClick={next} disabled={index === data.length - 1}>Next ▶</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
