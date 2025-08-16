import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './global.css'
import HomePage from './pages/HomePage'
import FMCSACompliance from './pages/FMCSACompliance'
import FMCSARegulations from './pages/FMCSACompliance/FMCSARegulations'
import HoursOfService from './pages/FMCSACompliance/HoursOfService'
import SafetyManagement from './pages/FMCSACompliance/SafetyManagement'
import CSA from './pages/FMCSACompliance/CSA'
import PreventionManagement from './pages/FMCSACompliance/PreventionManagement'
import FarmExemptionChecker from './pages/FarmExemptionChecker'
import About from './pages/About/About'
import FAQ from './pages/FAQ/FAQ'
import Consultation from './pages/Consultation/Consultation'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
  <Route path="/fmcsa-compliance" element={<FMCSACompliance />} />
  <Route path="/fmcsa-regulations" element={<FMCSARegulations />} />
  <Route path="/hours-of-service" element={<HoursOfService />} />
  <Route path="/safety-management" element={<SafetyManagement />} />
  <Route path="/csa" element={<CSA />} />
  <Route path="/prevention-management" element={<PreventionManagement />} />
  <Route path="/farm-exemption-checker" element={<FarmExemptionChecker />} />
  <Route path="/faq" element={<FAQ />} />
  <Route path="/about" element={<About />} />
  <Route path="/consultation" element={<Consultation />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
