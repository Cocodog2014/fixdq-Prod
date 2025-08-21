import { useMemo, useState } from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import flashcards from './content/rodsFlashcards.json';

function speak(text, rate = 1, lang = 'en-US') {
  if (!('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = rate;
  try { window.speechSynthesis.cancel(); } catch {}
  window.speechSynthesis.speak(u);
}

function DecisionFlow() {
  const [region, setRegion] = useState('us');
  const [needRods, setNeedRods] = useState(null); // true | false | null
  const [paperReasons, setPaperReasons] = useState({ tow: false, pre2000: false, malfunction: false });
  const [hadMalfunction, setHadMalfunction] = useState(false);
  const [usFarmCFV, setUsFarmCFV] = useState(false); // U.S. CFV within 150 air miles
  const [caAg160, setCaAg160] = useState(false); // Canada agriculture within 160 km

  const anyPaper = paperReasons.tow || paperReasons.pre2000 || paperReasons.malfunction;

  const summary = useMemo(() => {
    if (region === 'us') {
      if (usFarmCFV) return 'U.S. Covered Farm Vehicle within 150 air miles: exempt from HOS/CDL/ELD. No RODS/ELD required.';
      if (needRods === false) return 'Short-haul exemption (≤150 air miles, return to terminal). No RODS/ELD.';
      if (needRods === true) {
        if (anyPaper) return 'Paper allowed: driveaway-towaway, pre-2000 vehicle, or ELD malfunction (≤8 days).';
        return 'ELD required (no qualifying paper exception).';
      }
      return 'Answer the questions to see what applies.';
    }
    if (region === 'ca') {
      if (caAg160) return 'Canada agriculture exemption: within 160 km of home terminal. No daily log/ELD required.';
      return 'Canada: 160 km short-haul; malfunction period up to 14 days (with conditions).';
    }
    if (region === 'mx') return 'Mexico: Paper domestically; follow U.S./Canada rules upon cross-border operations.';
    return '';
  }, [region, needRods, anyPaper, usFarmCFV, caAg160]);

  return (
    <div className="rds-flow card">
      <h3>Interactive Decision Flow</h3>
      <div className="rds-field">
        <label>Home terminal region</label>
        <div className="rds-options">
          <label><input type="radio" name="region" value="us" checked={region==='us'} onChange={() => { setRegion('us'); setNeedRods(null); }} /> U.S.</label>
          <label><input type="radio" name="region" value="ca" checked={region==='ca'} onChange={() => { setRegion('ca'); setNeedRods(null); }} /> Canada</label>
          <label><input type="radio" name="region" value="mx" checked={region==='mx'} onChange={() => { setRegion('mx'); setNeedRods(null); }} /> Mexico</label>
        </div>
      </div>

      {region === 'us' && (
        <div className="rds-block">
          <div className="rds-field">
            <label>Do you need a logbook (RODS)?</label>
            <div className="rds-options">
              <button className={`btn ${needRods===true?'btn-primary':''}`} onClick={() => setNeedRods(true)}>Yes</button>
              <button className={`btn ${needRods===false?'btn-primary':''}`} onClick={() => setNeedRods(false)}>No</button>
            </div>
          </div>

          <div className="rds-field">
            <label>Are you operating a farm-plated Covered Farm Vehicle (CFV) within 150 air miles of the farm?</label>
            <div className="rds-options">
              <button className={`btn ${usFarmCFV?'btn-primary':''}`} onClick={()=> setUsFarmCFV(true)}>Yes</button>
              <button className={`btn ${!usFarmCFV?'btn-primary':''}`} onClick={()=> setUsFarmCFV(false)}>No</button>
            </div>
          </div>

          {usFarmCFV && (
            <div className="rds-result good">CFV within 150 air miles: exempt from HOS/CDL/ELD. No RODS/ELD required.</div>
          )}

          {needRods === false && (
            <div className="rds-result good">Short-haul exemption (≤150 air miles, return to terminal).</div>
          )}

          {needRods === true && (
            <>
              <div className="rds-field">
                <label>Paper RODS exception? (check any that apply)</label>
                <div className="rds-options rds-checks">
                  <label><input type="checkbox" checked={paperReasons.tow} onChange={e=>setPaperReasons(p=>({...p,tow:e.target.checked}))}/> Driveaway–towaway</label>
                  <label><input type="checkbox" checked={paperReasons.pre2000} onChange={e=>setPaperReasons(p=>({...p,pre2000:e.target.checked}))}/> Vehicle model year &lt; 2000</label>
                  <label><input type="checkbox" checked={paperReasons.malfunction} onChange={e=>setPaperReasons(p=>({...p,malfunction:e.target.checked}))}/> ELD malfunction (≤8 days)</label>
                </div>
              </div>
              <div className={`rds-result ${anyPaper?'info':'warn'}`}>
                {anyPaper ? 'Paper allowed for the selected reason(s). Keep documentation.' : 'ELD required (no paper exception checked).'}
              </div>

              <div className="rds-field">
                <label>Did an ELD malfunction occur?</label>
                <div className="rds-options">
                  <button className={`btn ${hadMalfunction?'btn-primary':''}`} onClick={()=>setHadMalfunction(true)}>Yes</button>
                  <button className={`btn ${!hadMalfunction?'btn-primary':''}`} onClick={()=>setHadMalfunction(false)}>No</button>
                </div>
              </div>
              {hadMalfunction && (
                <ul className="rds-steps">
                  <li>Switch to paper immediately and annotate.</li>
                  <li>Repair/replace within 8 days or request FMCSA extension.</li>
                  <li>Keep malfunction and repair records.</li>
                </ul>
              )}
            </>
          )}
        </div>
      )}

      {region !== 'us' && (
        region === 'ca' ? (
          <div className="rds-block">
            <div className="rds-field">
              <label>Canada: Agriculture operations within 160 km of home terminal?</label>
              <div className="rds-options">
                <button className={`btn ${caAg160?'btn-primary':''}`} onClick={()=> setCaAg160(true)}>Yes</button>
                <button className={`btn ${!caAg160?'btn-primary':''}`} onClick={()=> setCaAg160(false)}>No</button>
              </div>
            </div>
            <div className={`rds-result ${caAg160?'good':'info'}`}>{summary}</div>
          </div>
        ) : (
          <div className="rds-result info">{summary}</div>
        )
      )}

  <div className="rds-summary">{summary}</div>
  <div className="rds-actions"><button className="btn btn-reset" onClick={() => { setNeedRods(null); setPaperReasons({tow:false,pre2000:false,malfunction:false}); setHadMalfunction(false); setUsFarmCFV(false); setCaAg160(false); }}>Reset</button></div>
    </div>
  );
}

function RDSFlashcards() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  const item = flashcards[i] || {};
  const next = () => { setI((v)=> (v+1) % flashcards.length); setShow(false); };
  const prev = () => { setI((v)=> (v-1+flashcards.length) % flashcards.length); setShow(false); };
  return (
    <div className="rds-fc card">
      <div className="rds-fc-top">
        <div className="rds-fc-progress">{i+1} / {flashcards.length}</div>
        <div className="rds-fc-actions">
          <button className="btn btn-ghost" onClick={()=> speak(show ? item.answer : item.question)}>🔊</button>
          <button className="btn" onClick={()=> setShow(s=>!s)}>{show?'Hide answer':'Show answer'}</button>
        </div>
      </div>
      <h4 className="rds-fc-q">{item.question}</h4>
      {show && <p className="rds-fc-a">{item.answer}</p>}
      <div className="rds-fc-bottom">
        <button className="btn btn-prev" onClick={prev}>◀ Prev</button>
        <button className="btn btn-next" onClick={next}>Next ▶</button>
      </div>
    </div>
  );
}

function RDS() {
  return (
    <div className="rds-page app">
      <GlobalHeader />

      <section className="rds-hero">
        <div className="container">
          <h1>Records of Duty Status (RODS)</h1>
          <p className="subtitle">ELD vs Paper: When each is allowed or not allowed</p>
        </div>
      </section>

      <section className="rds-content">
        <div className="container">
          <div className="grid">
            <div className="card blue-border">
              <h3>Electronic Logging Device (ELD)</h3>
              <ul className="allowed">
                <li>Property-carrying CMVs operating in interstate commerce (general rule)</li>
                <li>Short-haul drivers who exceed limits and must use RODS for &gt; 8 days in any 30-day period</li>
                <li>Drivers previously exempt who no longer qualify under an exception</li>
              </ul>
              <ul className="not-allowed">
                <li>When the ELD is malfunctioning and a paper log is required temporarily</li>
                <li>For drivers who qualify for paper RODS exceptions (see Paper section)</li>
              </ul>
            </div>

            <div className="card green-border">
              <h3>Paper RODS</h3>
              <ul className="allowed">
                <li>Short-haul exception (150 air-mile radius) when no RODS are required</li>
                <li>Drivers using paper for not more than 8 days in any 30-day period due to ELD malfunction</li>
                <li>Driveaway-towaway operations where the vehicle driven is part of the shipment</li>
                <li>Vehicles manufactured before model year 2000</li>
              </ul>
              <ul className="not-allowed">
                <li>When driver is required to use an ELD and no qualifying exception applies</li>
              </ul>
            </div>
          </div>

          <DecisionFlow />
          <RDSFlashcards />

          <div className="notes">
            <p className="disclaimer">Always verify current FMCSA, Transport Canada, and company policy. This guide is informational only.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RDS;
