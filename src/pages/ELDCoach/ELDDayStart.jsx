import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/GlobalHeader';

const LS_KEY = 'eld.dayStart';
const load = () => { try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch { return {}; } };
const save = (data) => {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
  try { window.dispatchEvent(new Event('eld:day-updated')); } catch {}
};

function ELDDayStart() {
  const [form, setForm] = useState(load());
  const navigate = useNavigate();
  useEffect(() => { save(form); }, [form]);
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="eld-day-start app">
      <GlobalHeader />
      <section className="container">
        <div className="card">
          <h1 className="card-title">Daily Start</h1>
          <label>Date<input type="date" name="date" value={form.date||''} onChange={update} /></label>
          <label>Vehicle Unit #<input name="unit" value={form.unit||''} onChange={update} /></label>
          <label>Trailer #<input name="trailer" value={form.trailer||''} onChange={update} /></label>
          <label>BOL / Shipping Doc #<input name="bol" value={form.bol||''} onChange={update} /></label>
          <label>Odometer Start<input name="odometer" value={form.odometer||''} onChange={update} /></label>
          <label>Start Location<input name="location" value={form.location||''} onChange={update} /></label>
          <label>Co-driver<input name="codriver" value={form.codriver||''} onChange={update} /></label>
          <div className="actions">
            <button className="btn btn-primary" onClick={() => { save(form); navigate('/eld-coach'); }}>Done</button>
            <Link to="/eld-coach/device" className="btn">Open Device</Link>
            <Link to="/eld-coach" className="btn">Back to ELD Coach</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ELDDayStart;
