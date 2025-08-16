import { useEffect, useState } from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import { useNavigate } from 'react-router-dom';

const LS_KEY = 'eld.setup';
const load = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch { return {}; }
};
const save = (data) => {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
  try { window.dispatchEvent(new Event('eld:setup-updated')); } catch {}
};

function ELDSetup() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(load());
  const navigate = useNavigate();

  useEffect(() => { save(form); }, [form]);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="eld-setup app">
      <GlobalHeader />
      <section className="container">
        <h1>Setup Wizard</h1>

        <div className="wizard">
          <div className="steps">Step {step} of 6</div>

          {step === 1 && (
            <div className="card">
              <h3>Driver Profile</h3>
              <label>Driver Name<input name="driverName" value={form.driverName||''} onChange={update} /></label>
              <label>License #<input name="license" value={form.license||''} onChange={update} /></label>
              <label>Medical Status<input name="med" value={form.med||''} onChange={update} /></label>
            </div>
          )}

          {step === 2 && (
            <div className="card">
              <h3>Home Terminal & Time Zone</h3>
              <label>Home Terminal<input name="homeTerminal" value={form.homeTerminal||''} onChange={update} /></label>
              <label>Time Zone<select name="tz" value={form.tz||''} onChange={update}>
                <option value="">Select…</option>
                <option value="PT">PT</option>
                <option value="MT">MT</option>
                <option value="CT">CT</option>
                <option value="ET">ET</option>
              </select></label>
            </div>
          )}

          {step === 3 && (
            <div className="card">
              <h3>Carrier & Cycle</h3>
              <label>Carrier Name<input name="carrier" value={form.carrier||''} onChange={update} /></label>
              <label>USDOT<input name="usdot" value={form.usdot||''} onChange={update} /></label>
              <label>Operating Type<select name="opType" value={form.opType||''} onChange={update}>
                <option value="">Select…</option>
                <option value="property">Property</option>
                <option value="passenger">Passenger</option>
              </select></label>
              <label>Cycle<select name="cycle" value={form.cycle||''} onChange={update}>
                <option value="">Select…</option>
                <option value="60">60-hour / 7 days</option>
                <option value="70">70-hour / 8 days</option>
              </select></label>
            </div>
          )}

          {step === 4 && (
            <div className="card">
              <h3>Vehicle & Trailer Defaults</h3>
              <label>Vehicle Unit #<input name="unit" value={form.unit||''} onChange={update} /></label>
              <label>Trailer #<input name="trailer" value={form.trailer||''} onChange={update} /></label>
              <label>ELD Brand/Model<input name="eldModel" value={form.eldModel||''} onChange={update} /></label>
            </div>
          )}

          {step === 5 && (
            <div className="card">
              <h3>Exceptions</h3>
              <label>Short-haul<select name="shortHaul" value={form.shortHaul||''} onChange={update}>
                <option value="no">No</option>
                <option value="100">100 air-mile</option>
                <option value="150">150 air-mile</option>
              </select></label>
              <label>Passenger Carrier<select name="isPassenger" value={form.isPassenger||'no'} onChange={update}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select></label>
            </div>
          )}

          {step === 6 && (
            <div className="card">
              <h3>Instruction Packet</h3>
              <p>Generate the instruction packet containing: ELD instruction card, malfunction procedure, and transfer how‑to.</p>
              <div className="actions">
                <button className="btn" onClick={() => window.print()}>Print Packet</button>
                <button className="btn" onClick={() => {
                  const data = { setup: form, dayStart: JSON.parse(localStorage.getItem('eld.dayStart')||'{}'), logs: JSON.parse(localStorage.getItem('eld.logs')||'{}') };
                  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url; a.download = 'eld_instruction_packet.json'; a.click(); URL.revokeObjectURL(url);
                }}>Export JSON</button>
              </div>
            </div>
          )}

          <div className="nav">
            <button className="btn" disabled={step===1} onClick={() => setStep(step-1)}>Back</button>
            <button className="btn" onClick={() => {
              if (step < 6) {
                setStep(step + 1);
              } else {
                navigate('/eld-coach');
              }
            }}>{step<6? 'Next' : 'Done'}</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ELDSetup;
