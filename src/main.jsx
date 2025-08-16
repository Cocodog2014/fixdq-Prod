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
import VehicleInspections from './pages/VehicleInspections'
import PreTrip from './pages/VehicleInspections/PreTrip'
import PostTrip from './pages/VehicleInspections/PostTrip'
import DotRoadside from './pages/VehicleInspections/DotRoadside'
import MaintenanceRepair from './pages/VehicleInspections/MaintenanceRepair'
import EnglishProficiency from './pages/VehicleInspections/EnglishProficiency'
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
  <Route path="/vehicle-inspections" element={<VehicleInspections />} />
  <Route path="/vehicle-inspections/pre-trip" element={<PreTrip />} />
  <Route path="/vehicle-inspections/post-trip" element={<PostTrip />} />
  <Route path="/vehicle-inspections/dot-roadside" element={<DotRoadside />} />
  <Route path="/vehicle-inspections/english-proficiency" element={<EnglishProficiency />} />
  <Route path="/vehicle-inspections/dvir" element={<PostTrip />} />
  <Route path="/vehicle-inspections/maintenance-repair" element={<MaintenanceRepair />} />
  <Route path="/faq" element={<FAQ />} />
  <Route path="/about" element={<About />} />
  <Route path="/consultation" element={<Consultation />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
