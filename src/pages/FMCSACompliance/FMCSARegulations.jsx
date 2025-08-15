import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import GlobalHeader from '../../components/GlobalHeader'
import './FMCSARegulations.css'

export default function FMCSARegulations() {
  const title = 'Federal Motor Carrier Safety Regulations'
  const description = 'Overview of key FMCSR parts that affect daily operations.'
  const href = '/fmcsa-regulations'
  const navigate = useNavigate()
  const location = useLocation()
  const isDetailPage = location?.pathname === '/fmcsa-regulations'

  const handleNavigate = () => {
    if (!href) return
    navigate(href)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleNavigate()
    }
  }

  // If we're on the dedicated route, render a full info page; otherwise render the compact card.
  if (isDetailPage) {
    return (
      <div className="fmcsa-regulations-page">
        <GlobalHeader />
        <section className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
          <h1 style={{ marginTop: 0 }}>{title}</h1>
          <p style={{ maxWidth: 880 }}>{description}</p>
          <div className="fmcsa-backbar" style={{ marginTop: '0.5rem' }}>
            <button
              type="button"
              className="fmcsa-back-btn"
              onClick={() => navigate('/fmcsa-compliance')}
              aria-label="Back to FMCSA Compliance"
            >
              ← Back to FMCSA Compliance
            </button>
          </div>

          <div id="fmcsr-overview" style={{ marginTop: '2rem' }}>
            <h2>Key FMCSR Parts to Know</h2>
            <p>
              These summaries are for quick reference only. Always consult the official FMCSA regulations and your
              state requirements before making compliance decisions.
            </p>

            <ul style={{ lineHeight: 1.7 }}>
              <li>
                <strong>Part 383 — Commercial Driver&apos;s License (CDL)</strong>: Who needs a CDL, classes (A/B/C), and
                endorsement rules (H, N, X, P, S, T).
              </li>
              <li>
                <strong>Part 391 — Qualifications of Drivers</strong>: Age/medical qualifications, Motor Vehicle Record (MVR)
                checks, road test documentation, and driver qualification files.
              </li>
              <li>
                <strong>Part 392 — Driving of Commercial Motor Vehicles</strong>: Rules of the road, substance prohibitions,
                phone use, and emergency equipment.
              </li>
              <li>
                <strong>Part 393 — Parts and Accessories Necessary for Safe Operation</strong>: Lighting, brakes, tires,
                load securement, and equipment condition.
              </li>
              <li>
                <strong>Part 395 — Hours of Service (HOS)</strong>: 11/14-hour rules, 30-minute break, 60/70-hour limits,
                short-haul exemptions, and ELD basics.
              </li>
              {/* Part 396 temporarily removed */}
              <li>
                <strong>Part 397 — Transportation of Hazardous Materials</strong>: Routing, parking, attendance, and
                communication requirements for placarded HM.
              </li>
            </ul>

            <h2 style={{ marginTop: '2rem' }}>Quick Links</h2>
            <ul>
              <li><a href="https://www.fmcsa.dot.gov/regulations" target="_blank" rel="noreferrer noopener">FMCSA Regulations</a></li>
              {/* Removed: Do I Need a CDL? */}
              <li><a href="https://www.fmcsa.dot.gov/medical/driver-medical-requirements/medical-requirements" target="_blank" rel="noreferrer noopener">Medical Requirements</a></li>
              <li><a href="https://www.fmcsa.dot.gov/regulations/hours-of-service" target="_blank" rel="noreferrer noopener">Hours of Service</a></li>
              {/* Vehicle Inspections & Maintenance link temporarily removed */}
            </ul>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div
      className="fmcsa-reg-card"
      role="link"
      tabIndex={0}
      aria-label={`${title} - ${description}`}
      onClick={handleNavigate}
      onKeyDown={onKeyDown}
    >
      <div className="fmcsa-reg-body">
        <h3 className="fmcsa-reg-title">{title}</h3>
        <p className="fmcsa-reg-desc">{description}</p>
      </div>
      <div className="fmcsa-reg-footer">
        <a
          className="fmcsa-reg-btn"
          href={href}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleNavigate()
          }}
        >
          Explore
        </a>
      </div>
    </div>
  )
}
