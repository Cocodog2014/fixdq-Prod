import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './global.css'
import HomePage from './pages/HomePage'
import FMCSACompliance from './pages/FMCSACompliance'
import FarmExemptionChecker from './pages/FarmExemptionChecker'
import About from './pages/About/About'
import FAQ from './pages/FAQ/FAQ'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
  <Route path="/fmcsa-compliance" element={<FMCSACompliance />} />
  <Route path="/farm-exemption-checker" element={<FarmExemptionChecker />} />
  <Route path="/faq" element={<FAQ />} />
  <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
