import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './global.css'
import HomePage from './pages/HomePage'
import FMCSACompliance from './pages/FMCSACompliance'
import FMCSARegulations from './pages/FMCSACompliance/FMCSARegulations'
import HoursOfService from './pages/FMCSACompliance/HoursOfService'
import SafetyManagement from './pages/FMCSACompliance/SafetyManagement'
import SafetyTraining from './pages/SafetyTraining/SafetyTraining'
import DefensiveDriving from './pages/SafetyTraining/DefensiveDriving'
import Hazmat from './pages/SafetyTraining/Hazmat'
import WeatherRoad from './pages/SafetyTraining/WeatherRoad'
import EmergencyProcedures from './pages/SafetyTraining/EmergencyProcedures'
import AccidentPrevention from './pages/SafetyTraining/AccidentPrevention'
import ViolationManagement from './pages/ViolationManagement/ViolationManagement'
import CitationTypes from './pages/ViolationManagement/CitationTypes'
import DataQNavigation from './pages/ViolationManagement/DataQNavigation'
import DriverScore from './pages/ViolationManagement/DriverScore'
import AppealProcess from './pages/ViolationManagement/AppealProcess'
import CSA from './pages/FMCSACompliance/CSA'
import PreventionManagement from './pages/FMCSACompliance/PreventionManagement'
import FarmExemptionChecker from './pages/FarmExemptionChecker'
import VehicleInspections from './pages/VehicleInspections'
import PreTrip from './pages/VehicleInspections/PreTrip'
import PostTrip from './pages/VehicleInspections/PostTrip'
import DotRoadside from './pages/VehicleInspections/DotRoadside'
import MaintenanceRepair from './pages/VehicleInspections/MaintenanceRepair'
import EnglishProficiency from './pages/EnglishProficiency'
import DriverInterviewPlaceholder from './pages/EnglishProficiency/DriverInterview'
import RDS from './pages/RDS/RDS'
import ELDCoach from './pages/ELDCoach/ELDCoach'
import ELDSetup from './pages/ELDCoach/ELDSetup'
import ELDDayStart from './pages/ELDCoach/ELDDayStart'
import ELDStatusPad from './pages/ELDCoach/ELDStatusPad'
import ELDRiskPanel from './pages/ELDCoach/ELDRiskPanel'
import ELDTransfer from './pages/ELDCoach/ELDTransfer'
import ELDMalfunction from './pages/ELDCoach/ELDMalfunction'
import ELDLessons from './pages/ELDCoach/ELDLessons'
import ELDDevice from './pages/ELDCoach/ELDDevice'
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
  <Route path="/safety-training" element={<SafetyTraining />} />
  <Route path="/safety-training/defensive-driving" element={<DefensiveDriving />} />
  <Route path="/safety-training/hazmat" element={<Hazmat />} />
  <Route path="/safety-training/weather-road" element={<WeatherRoad />} />
  <Route path="/safety-training/emergency-procedures" element={<EmergencyProcedures />} />
  <Route path="/safety-training/accident-prevention" element={<AccidentPrevention />} />
  <Route path="/violations-management" element={<ViolationManagement />} />
  <Route path="/violations-management/citation-types" element={<CitationTypes />} />
  <Route path="/violations-management/dataq-navigation" element={<DataQNavigation />} />
  <Route path="/violations-management/driver-score" element={<DriverScore />} />
  <Route path="/violations-management/appeal-process" element={<AppealProcess />} />
  <Route path="/csa" element={<CSA />} />
  <Route path="/prevention-management" element={<PreventionManagement />} />
  <Route path="/farm-exemption-checker" element={<FarmExemptionChecker />} />
  <Route path="/vehicle-inspections" element={<VehicleInspections />} />
  <Route path="/vehicle-inspections/pre-trip" element={<PreTrip />} />
  <Route path="/vehicle-inspections/post-trip" element={<PostTrip />} />
  <Route path="/vehicle-inspections/dot-roadside" element={<DotRoadside />} />
  <Route path="/vehicle-inspections/english-proficiency" element={<EnglishProficiency />} />
  <Route path="/english-proficiency" element={<EnglishProficiency />} />
  <Route path="/english-proficiency/driver-interview" element={<DriverInterviewPlaceholder />} />
  <Route path="/vehicle-inspections/dvir" element={<PostTrip />} />
  <Route path="/vehicle-inspections/maintenance-repair" element={<MaintenanceRepair />} />
  <Route path="/records-of-duty" element={<RDS />} />
  <Route path="/rds" element={<RDS />} />
  <Route path="/eld-coach" element={<ELDCoach />} />
  <Route path="/eld-coach/setup" element={<ELDSetup />} />
  <Route path="/eld-coach/day-start" element={<ELDDayStart />} />
  <Route path="/eld-coach/status" element={<ELDStatusPad />} />
  <Route path="/eld-coach/risk" element={<ELDRiskPanel />} />
  <Route path="/eld-coach/transfer" element={<ELDTransfer />} />
  <Route path="/eld-coach/malfunction" element={<ELDMalfunction />} />
  <Route path="/eld-coach/lessons" element={<ELDLessons />} />
  <Route path="/eld-coach/device" element={<ELDDevice />} />
  <Route path="/faq" element={<FAQ />} />
  <Route path="/about" element={<About />} />
  <Route path="/consultation" element={<Consultation />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
