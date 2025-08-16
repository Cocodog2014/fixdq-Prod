import { useEffect, useState } from 'react';
import GlobalHeader from '../../components/GlobalHeader';

const LS_KEY = 'eld.dayStart';
const load = () => { try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch { return {}; } };
const save = (data) => localStorage.setItem(LS_KEY, JSON.stringify(data));

function ELDDayStart() {
  const [form, setForm] = useState(load());
  useEffect(() => { save(form); }, [form]);
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="eld-day-start app">
      <GlobalHeader />
      <section className="container">
        <h1>Daily Start</h1>
        <div className="card">
          <label>Date<input type="date" name="date" value={form.date||''} onChange={update} /></label>
          <label>Vehicle Unit #<input name="unit" value={form.unit||''} onChange={update} /></label>
          <label>Trailer #<input name="trailer" value={form.trailer||''} onChange={update} /></label>
          <label>BOL / Shipping Doc #<input name="bol" value={form.bol||''} onChange={update} /></label>
          <label>Odometer Start<input name="odometer" value={form.odometer||''} onChange={update} /></label>
          <label>Start Location<input name="location" value={form.location||''} onChange={update} /></label>
          <label>Co-driver<input name="codriver" value={form.codriver||''} onChange={update} /></label>
        </div>
      </section>
    </div>
  );
}

export default ELDDayStart;
