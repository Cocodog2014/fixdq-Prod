import GlobalHeader from '../../components/GlobalHeader'

export default function About() {
  return (
    <div className="about-page">
      <GlobalHeader />

      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-inner">
            <h1>About FixDQ</h1>
            <p>We turn FMCSA compliance into simple daily habits that lower risk and win cleaner inspections.</p>
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="about-section">
        <div className="container">
          <div className="about-card accent-green">
            <h2>Our promise</h2>
            <p>
              We make FMCSA compliance simple so small fleets and owner-operators can lower their CSA percentiles,
              win cleaner inspections, and pay less for risk.
            </p>
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="about-section">
        <div className="container">
          <div className="about-card accent-blue">
            <h2>Who we are</h2>
            <p>
              FixDQ is a driver-first safety team built by people who’ve worked inspections, training, and carrier ops.
              We translate the rulebook into plain English, fix bad data, and install daily habits that prevent violations.
            </p>
          </div>
        </div>
      </section>

      {/* Why we exist */}
      <section className="about-section">
        <div className="container">
          <div className="about-card accent-orange">
            <h2>Why we exist</h2>
            <ul className="about-list">
              <li>Most carriers don’t struggle because they’re unsafe—they struggle because:</li>
              <li>• drivers fear roadside inspections,</li>
              <li>• small mistakes snowball into BASIC alerts, and</li>
              <li>• nobody has time to clean up DataQs or coach the next trip.</li>
            </ul>
            <p className="about-strong">We change that.</p>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="about-section">
        <div className="container">
          <h2 className="about-h2">What we do (three pillars)</h2>
          <div className="about-grid three">
            <div className="about-card mini">
              <div className="about-chip green">1) Prevent</div>
              <p>
                Tight pre-trip/DVIR habits, maintenance blitzes on the top OOS items (brakes, tires, lights), and smart
                HOS planning.
              </p>
            </div>
            <div className="about-card mini">
              <div className="about-chip purple">2) Train</div>
              <p>
                Short, mobile modules that teach drivers to welcome inspections—because clean inspections add “good data”
                and help drive percentiles down. Scripts, checklists, and practice walk-arounds remove the fear.
              </p>
            </div>
            <div className="about-card mini">
              <div className="about-chip orange">3) Correct</div>
              <p>
                We run DataQs on bad or outdated records and guide CPDP crash submissions when eligible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 90-day plan */}
      <section className="about-section">
        <div className="container">
          <h2 className="about-h2">Our game plan (90 days)</h2>
          <div className="about-timeline">
            <div className="tl-item">
              <div className="tl-badge">Day 0–7</div>
              <h3>Baseline & quick wins</h3>
              <p>
                Pull SMS, PSP samples, ELD/maintenance snapshots. Fix obvious issues (missing med cards, expired stickers,
                lighting/air leaks).
              </p>
            </div>
            <div className="tl-item">
              <div className="tl-badge">Week 2–4</div>
              <h3>Clean Inspection Campaign</h3>
              <p>
                Driver briefings, pocket checklists, staged mock inspections, DVIR photo proof. Goal: stack clean Level
                3s/2s.
              </p>
            </div>
            <div className="tl-item">
              <div className="tl-badge">Month 2</div>
              <h3>Systems that last</h3>
              <p>PM schedule you’ll actually follow, HOS coaching, simple KPI board (clean-inspection %, OOS rate, late DVIRs).</p>
            </div>
            <div className="tl-item">
              <div className="tl-badge">Month 3</div>
              <h3>Data hygiene & proof</h3>
              <p>
                File DataQs/adjudicated updates, document training and corrective actions for underwriters and shippers.
              </p>
              <p className="about-note">
                (Results vary, but most carriers see BASIC percentiles start to soften within 1–3 SMS cycles once clean
                inspections stack and recent violations age.)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lower your safety score */}
      <section className="about-section">
        <div className="container">
          <h2 className="about-h2">How we help lower your safety score (percentiles)</h2>
          <ul className="about-list bullets">
            <li>Reduce new violations (prevention habits).</li>
            <li>Add clean inspections to strengthen the denominator.</li>
            <li>Time works for you when the pipeline stays clean (older violations decay).</li>
            <li>Remove/adjust incorrect data via DataQs and Crash Preventability when applicable.</li>
          </ul>
        </div>
      </section>

      {/* Driver message */}
      <section className="about-section">
        <div className="container">
          <div className="about-card accent-sky">
            <h2>Driver message: Inspections are opportunities</h2>
            <ul className="about-list bullets">
              <li>Be polite, be ready, be organized.</li>
              <li>Use the same pre-trip routine every day.</li>
              <li>Keep required docs in one sleeve (registration, insurance/MCS-90, med card, ELD how-to).</li>
              <li>A clean inspection today helps the whole fleet tomorrow.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Success metrics */}
      <section className="about-section">
        <div className="container">
          <h2 className="about-h2">What success looks like</h2>
          <ul className="about-list bullets">
            <li>Fewer BASIC alerts; trending down in Unsafe Driving, HOS, Vehicle Maintenance.</li>
            <li>More green “no violation” inspections in your last 90 days.</li>
            <li>Tighter DVIR/PM compliance and cleaner log audits.</li>
            <li>Better conversations with insurers, brokers, and shippers.</li>
          </ul>
        </div>
      </section>

      {/* How we work */}
      <section className="about-section">
        <div className="container">
          <div className="about-grid three">
            <div className="about-card mini accent-blue">
              <h3>Transparent</h3>
              <p>Plain-English dashboards and weekly touchpoints.</p>
            </div>
            <div className="about-card mini accent-green">
              <h3>Practical</h3>
              <p>Checklists and five-minute videos drivers will actually use.</p>
            </div>
            <div className="about-card mini accent-orange">
              <h3>Ethical</h3>
              <p>We don’t “game” logs or cut corners. We build a safety culture that lasts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <div className="about-cta-inner">
            <h2>Ready to start?</h2>
            <p>Begin with a free CSA health check and a 15-minute plan to your first clean-inspection sprint.</p>
            <div className="about-cta-actions">
              <a className="cta-btn primary" href="mailto:team@fixdq.com?subject=Free%20CSA%20Health%20Check">Free CSA Health Check</a>
              <a className="cta-btn ghost" href="/faq">Explore FAQs</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
