import GlobalHeader from '../../components/GlobalHeader'
import { Link } from 'react-router-dom'

const steps = [
  { step: 1, title: 'Pre-Trip Inspection Procedures', to: '/vehicle-inspections/pre-trip', color: 'orange', icon: '🧭' },
  { step: 2, title: 'Post-Trip Inspection Reports', to: '/vehicle-inspections/post-trip', color: 'blue', icon: '📝' },
  { step: 3, title: 'DOT Roadside Inspections', to: '/vehicle-inspections/dot-roadside', color: 'red', icon: '🚨' },
  { step: 4, title: 'Driver Vehicle Inspection Report (DVIR)', to: '/vehicle-inspections/dvir', color: 'purple', icon: '📋' },
  { step: 5, title: 'Maintenance & Repair Documentation', to: '/vehicle-inspections/maintenance-repair', color: 'green', icon: '🛠️' },
]

export default function VehicleInspections() {
  return (
    <div className="vehicle-inspections-page">
      <GlobalHeader />

      <section className="section-padding">
        <div className="container">
          <div className="vi-card" aria-labelledby="vi-title">
            <div className="vi-card-header">
              <div className="vi-icon" aria-hidden>❓</div>
              <h1 id="vi-title">Vehicle Inspections</h1>
            </div>

            <div className="vi-steps-grid">
              {steps.map((s) => (
                <Link key={s.to} to={s.to} className={`vi-step-card vi-${s.color}`} aria-label={`${s.title} (Step ${s.step})`}>
                  <div className="vi-step-header">
                    <span className="vi-step-badge">Step {s.step}</span>
                    <span className="vi-step-icon" aria-hidden>{s.icon}</span>
                  </div>
                  <h3 className="vi-step-title">{s.title}</h3>
                  <div className="vi-step-footer">
                    <span className="vi-step-cta">Open</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
