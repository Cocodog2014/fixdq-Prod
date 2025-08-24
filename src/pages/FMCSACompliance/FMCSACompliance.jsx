import { useMemo, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalHeader from '../../components/GlobalHeader'
import FMCSARegulations from './FMCSARegulations'
import CdlClassComparison from './CdlClassComparison'
import { lazy, Suspense } from 'react'
const ComplianceQuiz = lazy(() => import('./ComplianceQuiz'))
import License from './HeroButton/License'
import Usdot from './HeroButton/Usdot'
import NewReg, { NewRegPanel } from './HeroButton/NewReg'
import ManageReg from './HeroButton/ManageReg'
import Insurance, { InsurancePanel } from './Insurance/Insurance'
import { LicensePanel } from './HeroButton/License'

// License tool state packaged for WhatLicense component

export default function FMCSACompliance() {
  const navigate = useNavigate()
  const [heroMenuOpen, setHeroMenuOpen] = useState(false)
  const [licenseState, setLicenseState] = useState({
    vehicleType: 'truck',
    gvwr: 'over_26001',
    operatingArea: 'interstate',
    cargoType: 'general',
    trailer: 'trailer_10000_or_less',
    passengerCount: 'under16',
    tankLiquids: 'no',
    placardedHazmat: 'no',
    farmExemption: 'no',
    schoolBus: 'no'
  })
  const [showCdlChart, setShowCdlChart] = useState(false)
  // Removed state rules & weight calculator tools
  const [showQuiz, setShowQuiz] = useState(false)
  // Dynamic hero panel selection
  const [activePanel, setActivePanel] = useState(null) // null = slideshow default
  const [slideIndex, setSlideIndex] = useState(0)


  // If user navigates with #cdl-chart, reveal and scroll to it
  useEffect(() => {
    // legacy hash support: license tool
    if (typeof window !== 'undefined' && window.location?.hash === '#flowchart') {
      setActivePanel('license')
    }
  }, [])

  // Slideshow auto-rotate only when no activePanel selected
  useEffect(() => {
    if (activePanel !== null) return
    const id = setInterval(() => {
      setSlideIndex((i) => (i + 1) % slideshowSlides.length)
    }, 5000)
    return () => clearInterval(id)
  }, [activePanel])

  const slideshowSlides = useMemo(() => ([
    { title: 'Start Your USDOT / MC Registration', body: 'Understand core FMCSA registration steps before you begin.' },
    { title: 'Do You Need a USDOT Number?', body: 'Know thresholds: interstate commerce, vehicle weight, passengers, hazmat.' },
    { title: 'MC Authority vs USDOT', body: 'MC = for-hire authority. USDOT = safety tracking identifier.' },
    { title: 'Insurance & BOC-3', body: 'File Form BOC-3 and meet minimum insurance to activate authority.' },
    { title: 'Maintain Compliance', body: 'Update MCS-150, maintain driver qualification, hours-of-service, inspections.' },
  ]), [])

  const openPanel = useCallback((panel) => {
    setActivePanel((curr) => (curr === panel ? null : panel))
    // Auto-close the mobile hero menu after selecting an item
    if (typeof window !== 'undefined' && window.innerWidth < 600) {
      setHeroMenuOpen(false)
    }
  }, [])

  return (
    <div className="fmcsa-page">
      <GlobalHeader />
      {/* 1) Hero / Intro */}
      <section className="fmcsa-hero">
        <div className="container">
          <div className="hero-inner">
            <button
              className="hero-menu-toggle"
              aria-label={heroMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={heroMenuOpen}
              aria-controls="hero-top-actions"
              onClick={() => setHeroMenuOpen(o => !o)}
            >
              <span className="hamburger" aria-hidden="true">
                <span></span><span></span><span></span>
              </span>
              <span className="hero-menu-label">FMCSA Tools</span>
            </button>
            <div id="hero-top-actions" className={`hero-top-actions ${heroMenuOpen ? 'open' : ''}`}>
              <License active={activePanel==='license'} onClick={() => openPanel('license')} />
              <Usdot active={activePanel==='usdot'} onClick={() => openPanel('usdot')} />
              <NewReg active={activePanel==='newReg'} onClick={() => openPanel('newReg')} />
              <ManageReg active={activePanel==='manageReg'} onClick={() => openPanel('manageReg')} />
              <Insurance active={activePanel==='insurance'} onClick={() => openPanel('insurance')} />
            </div>
            <h1>FMCSA Compliance Made Simple</h1>
            <p>
              FMCSA compliance helps keep drivers and roads safe, avoids costly fines, and protects your CDL.
              Use this page to understand your requirements and get up to speed fast.
            </p>
            <div className="hero-dynamic" aria-live="polite">
              {activePanel === null && (
                <div className="slideshow" role="region" aria-label="FMCSA Registration Highlights">
                  <div className="slides-track" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
                    {slideshowSlides.map((s, i) => (
                      <div className="slide" key={i} aria-hidden={slideIndex!==i}>
                        <h3>{s.title}</h3>
                        <p>{s.body}</p>
                      </div>
                    ))}
                  </div>
                  <div className="slide-dots" role="tablist">
                    {slideshowSlides.map((_, i) => (
                      <button key={i} className={`dot ${slideIndex===i?'active':''}`} aria-label={`Show slide ${i+1}`} onClick={() => setSlideIndex(i)} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* External panels block (below hero) */}
      {activePanel && (
        <section className="fmcsa-panels" aria-label="FMCSA Detailed Panel">
          <div className="container">
            {activePanel === 'license' && (
              <LicensePanel state={licenseState} setState={setLicenseState} onClose={() => setActivePanel(null)} />
            )}
            {activePanel === 'usdot' && (
              <div className="info-panel" role="region" aria-label="USDOT Requirements">
                <h2 style={{marginTop:0}}>Do I Need a USDOT Number?</h2>
                <ul>
                  <li>Operate in interstate commerce OR transport passengers / property across state lines.</li>
                  <li>Operate a vehicle with GVWR/GCWR/Actual weight ≥ 10,001 lbs.</li>
                  <li>Transport 9+ passengers (compensated) or 16+ (not for compensation).</li>
                  <li>Transport placarded hazardous materials.</li>
                </ul>
                <p><a href="https://www.fmcsa.dot.gov/registration/do-i-need-usdot-number" target="_blank" rel="noopener noreferrer">Official FMCSA Guidance</a></p>
              </div>
            )}
            {activePanel === 'newReg' && (
              <NewRegPanel onClose={() => setActivePanel(null)} />
            )}
            {activePanel === 'manageReg' && (
              <div className="info-panel" role="region" aria-label="Manage Registration">
                <h2 style={{marginTop:0}}>Manage / Update Registration</h2>
                <ul>
                  <li>Update MCS-150 (USDOT) every 24 months or when data changes.</li>
                  <li>File name/address changes promptly.</li>
                  <li>Maintain process agent (BOC-3) & insurance filings.</li>
                  <li>Deactivate unused authority to reduce fees & exposure.</li>
                </ul>
                <p><a href="https://www.fmcsa.dot.gov/registration/updating-your-registration" target="_blank" rel="noopener noreferrer">Updating Your Registration</a></p>
              </div>
            )}
            {activePanel === 'insurance' && (
              <InsurancePanel onClose={() => setActivePanel(null)} />
            )}
          </div>
        </section>
      )}

      {/* 3) Subsection Cards */}
      <section className="fmcsa-cards">
        <div className="container">
          <h2>Learn the Essentials</h2>
          <div className="cards-grid">
            <FMCSARegulations />
            {/* Hours of Service dedicated card */}
            <div
              className="fmcsa-reg-card"
              role="link"
              tabIndex={0}
              aria-label={`Hours of Service (HOS) Rules - Limits, examples, and calculators for common scenarios.`}
              onClick={() => navigate('/hours-of-service')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  navigate('/hours-of-service')
                }
              }}
            >
              <div className="fmcsa-reg-body">
                <h3 className="fmcsa-reg-title">Hours of Service (HOS) Rules</h3>
                <p className="fmcsa-reg-desc">Limits, examples, and calculators for common scenarios.</p>
              </div>
              <div className="fmcsa-reg-footer">
                <a
                  className="fmcsa-reg-btn"
                  href="/hours-of-service"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    navigate('/hours-of-service')
                  }}
                >
                  Explore
                </a>
              </div>
            </div>

            {/* Safety Management Cycles */}
            <div
              className="fmcsa-reg-card"
              role="link"
              tabIndex={0}
              aria-label={`Safety Management Cycles - Methods to track and maintain compliance over time.`}
              onClick={() => navigate('/safety-management')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  navigate('/safety-management')
                }
              }}
            >
              <div className="fmcsa-reg-body">
                <h3 className="fmcsa-reg-title">Safety Management Cycles</h3>
                <p className="fmcsa-reg-desc">Methods to track and maintain compliance over time.</p>
              </div>
              <div className="fmcsa-reg-footer">
                <a
                  className="fmcsa-reg-btn"
                  href="/safety-management"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    navigate('/safety-management')
                  }}
                >
                  Explore
                </a>
              </div>
            </div>

            {/* CSA */}
            <div
              className="fmcsa-reg-card csa-highlight"
              role="link"
              tabIndex={0}
              aria-label={`CSA (Compliance, Safety, Accountability) - Driver scores, inspections, and how to improve.`}
              onClick={() => navigate('/csa')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  navigate('/csa')
                }
              }}
            >
              <div className="fmcsa-reg-body">
                <h3 className="fmcsa-reg-title">CSA (Compliance, Safety, Accountability)</h3>
                <p className="fmcsa-reg-desc">Driver scores, inspections, and how to improve.</p>
              </div>
              <div className="fmcsa-reg-footer">
                <a
                  className="fmcsa-reg-btn fmcsa-reg-btn--red"
                  href="/csa"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    navigate('/csa')
                  }}
                >
                  Explore
                </a>
              </div>
            </div>

            {/* Violation Prevention & Management */}
            <div
              className="fmcsa-reg-card"
              role="link"
              tabIndex={0}
              aria-label={`Violation Prevention & Management - Avoiding, documenting, and contesting violations.`}
              onClick={() => navigate('/prevention-management')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  navigate('/prevention-management')
                }
              }}
            >
              <div className="fmcsa-reg-body">
                <h3 className="fmcsa-reg-title">Violation Prevention & Management</h3>
                <p className="fmcsa-reg-desc">Avoiding, documenting, and contesting violations.</p>
              </div>
              <div className="fmcsa-reg-footer">
                <a
                  className="fmcsa-reg-btn"
                  href="/prevention-management"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    navigate('/prevention-management')
                  }}
                >
                  Explore
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4) Quick Reference Tools */}
      <section className="fmcsa-tools">
        <div className="container">
          <h2>Quick Reference</h2>
          <ul className="quick-list">
            <li>
              <a
                href="#compliance-quiz"
                onClick={(e) => {
                  e.preventDefault()
                  setShowQuiz(true)
                  setTimeout(() => {
                    document.getElementById('compliance-quiz')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }, 0)
                }}
              >
                Take the Compliance Quiz
              </a>
            </li>
            <li>
              <a
                href="#cdl-chart"
                onClick={(e) => {
                  e.preventDefault()
                  setShowCdlChart(true)
                  setTimeout(() => {
                    document.getElementById('cdl-chart')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }, 0)
                }}
              >
                CDL Class Comparison Chart (A, B, C)
              </a>
            </li>
            {/* Removed Weight & Endorsement Guide and State-by-State Rules links */}
          </ul>
          <div id="cdl-chart" style={{ marginTop: '1rem', display: showCdlChart ? 'block' : 'none' }}>
            <CdlClassComparison
              onClose={() => {
                setShowCdlChart(false)
                // Clean hash without reload for a smoother UX
                if (typeof window !== 'undefined') {
                  const { pathname, search } = window.location
                  window.history.replaceState(null, '', pathname + search)
                }
              }}
            />
          </div>
        </div>
      </section>

      {/* Compliance Quiz (show on click) */}
      <section className="fmcsa-tools" id="compliance-quiz" style={{ display: showQuiz ? 'block' : 'none' }}>
        <div className="container">
          <Suspense fallback={<div style={{color:'#fff'}}>Loading quiz…</div>}>
          <ComplianceQuiz
            companyName="FixDQ"
            includeHazmat={true}
            onClose={() => {
              setShowQuiz(false)
              if (typeof window !== 'undefined') {
                const { pathname, search } = window.location
                window.history.replaceState(null, '', pathname + search)
              }
            }}
          />
          </Suspense>
        </div>
      </section>

  {/* Removed Weight Calculator and State-by-State Rules sections */}

      {/* 5) Call-to-Action */}
      <section className="fmcsa-cta">
        <div className="container">
          <div className="cta-grid">
            <div
              className="cta-card"
              role="link"
              tabIndex={0}
              aria-label="Open the Compliance Quiz"
              onClick={() => {
                setShowQuiz(true)
                setTimeout(() => {
                  document.getElementById('compliance-quiz')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }, 0)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setShowQuiz(true)
                  setTimeout(() => {
                    document.getElementById('compliance-quiz')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }, 0)
                }
              }}
            >
              <h3>Take the Compliance Quiz</h3>
              <p>Check your understanding and find gaps to study.</p>
              <a
                className="cta-btn"
                href="#compliance-quiz"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setShowQuiz(true)
                  setTimeout(() => {
                    document.getElementById('compliance-quiz')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }, 0)
                }}
              >
                Start Quiz
              </a>
            </div>
            <div
              className="cta-card"
              role="link"
              tabIndex={0}
              aria-label="Book a Compliance Consultation"
              onClick={() => navigate('/consultation')}
              onKeyDown={(e) => { if (e.key==='Enter'||e.key===' ') { e.preventDefault(); navigate('/consultation') } }}
            >
              <h3>Book a Compliance Consultation</h3>
              <p>Get personalized guidance for your fleet or career.</p>
              <a
                className="cta-btn"
                href="/consultation"
                onClick={(e)=>{ e.preventDefault(); e.stopPropagation(); navigate('/consultation') }}
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
