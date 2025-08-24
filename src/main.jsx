import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './global.css'
import HomePage from './pages/HomePage'
import FMCSACompliance from './pages/FMCSACompliance'
import FMCSARegulations from './pages/FMCSACompliance/FMCSARegulations'
import HoursOfService from './pages/FMCSACompliance/HoursOfService'
import MedicalRequirements from './pages/FMCSACompliance/MedicalRequirements/MedicalRequirements'
import WhoNeedsIt from './pages/FMCSACompliance/MedicalRequirements/WhoNeedsIt'
import CertificationFlow from './pages/FMCSACompliance/MedicalRequirements/CertificationFlow'
import KeyStandards from './pages/FMCSACompliance/MedicalRequirements/KeyStandards'
import RiskConditions from './pages/FMCSACompliance/MedicalRequirements/RiskConditions'
import FarmVehicleDriverExemptions from './pages/FMCSACompliance/FarmVehicleDriverExemptions/FarmVehicleDriverExemptions'
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
import MostCommonViolations from './pages/ViolationManagement/MostCommon'
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
import FmcsaFlashCards from './pages/EnglishProficiency/fmcsa/FmcsaFlashCards'
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
import GettingStarted from './pages/GettingStarted/GettingStarted'
import Terms from './pages/Legal/Terms'
import Privacy from './pages/Legal/Privacy'
import DataHandling from './pages/Legal/DataHandling'
import AcceptableUse from './pages/Legal/AcceptableUse'
import Cookies from './pages/Legal/Cookies'
import Disclaimer from './pages/Legal/Disclaimer'
import GlobalFooter from './components/GlobalFooter/GlobalFooter'
import { initGA } from './analytics/initGA'
import RouteTracker from './components/Analytics/RouteTracker'
import Monitoring from './pages/FMCSACompliance/MedicalRequirements/Monitoring'
import Violations from './pages/FMCSACompliance/MedicalRequirements/Violations'
import OfficialLinks from './pages/FMCSACompliance/MedicalRequirements/OfficialLinks'
import BOC3ProcessAgent from './pages/FMCSACompliance/Insurance/BOC3ProcessAgent'

// Small helper to append the GlobalFooter to any page component without editing each file.
const withFooter = (Component) => (
  <>
    <Component />
    <GlobalFooter />
  </>
);

// Initialize GA early (non-blocking)
initGA(import.meta.env.VITE_GA_MEASUREMENT_ID);

// Optional: basic page view tracking on route changes via history listener
// React Router v6 doesn't expose a global history object directly here; a more
// robust solution would use a Layout component with useLocation(). For now,
// developers can call trackPageView() manually inside pages if needed.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <RouteTracker />
      <Routes>
        <Route path="/" element={withFooter(HomePage)} />
        <Route path="/fmcsa-compliance" element={withFooter(FMCSACompliance)} />
        <Route path="/fmcsa-regulations" element={withFooter(FMCSARegulations)} />
        <Route path="/hours-of-service" element={withFooter(HoursOfService)} />
        <Route path="/medical-requirements" element={withFooter(MedicalRequirements)} />
        <Route path="/medical-requirements/who-needs" element={withFooter(WhoNeedsIt)} />
  <Route path="/medical-requirements/certification-flow" element={withFooter(CertificationFlow)} />
  <Route path="/medical-requirements/key-standards" element={withFooter(KeyStandards)} />
  <Route path="/medical-requirements/risk-conditions" element={withFooter(RiskConditions)} />
        <Route path="/medical-requirements/monitoring" element={withFooter(Monitoring)} />
        <Route path="/medical-requirements/violations" element={withFooter(Violations)} />
        <Route path="/medical-requirements/official-links" element={withFooter(OfficialLinks)} />
        <Route path="/farm-vehicle-driver-exemptions" element={withFooter(FarmVehicleDriverExemptions)} />
        <Route path="/safety-management" element={withFooter(SafetyManagement)} />
        <Route path="/safety-training" element={withFooter(SafetyTraining)} />
        <Route path="/safety-training/defensive-driving" element={withFooter(DefensiveDriving)} />
        <Route path="/safety-training/hazmat" element={withFooter(Hazmat)} />
        <Route path="/safety-training/weather-road" element={withFooter(WeatherRoad)} />
        <Route path="/safety-training/emergency-procedures" element={withFooter(EmergencyProcedures)} />
        <Route path="/safety-training/accident-prevention" element={withFooter(AccidentPrevention)} />
        <Route path="/violations-management" element={withFooter(ViolationManagement)} />
        <Route path="/violations-management/citation-types" element={withFooter(CitationTypes)} />
        <Route path="/violations-management/dataq-navigation" element={withFooter(DataQNavigation)} />
        <Route path="/violations-management/driver-score" element={withFooter(DriverScore)} />
        <Route path="/violations-management/most-common" element={withFooter(MostCommonViolations)} />
        <Route path="/violations-management/appeal-process" element={withFooter(AppealProcess)} />
        <Route path="/csa" element={withFooter(CSA)} />
        <Route path="/prevention-management" element={withFooter(PreventionManagement)} />
        <Route path="/farm-exemption-checker" element={withFooter(FarmExemptionChecker)} />
        <Route path="/vehicle-inspections" element={withFooter(VehicleInspections)} />
        <Route path="/vehicle-inspections/pre-trip" element={withFooter(PreTrip)} />
        <Route path="/vehicle-inspections/post-trip" element={withFooter(PostTrip)} />
        <Route path="/vehicle-inspections/dot-roadside" element={withFooter(DotRoadside)} />
        <Route path="/vehicle-inspections/english-proficiency" element={withFooter(EnglishProficiency)} />
        <Route path="/english-proficiency" element={withFooter(EnglishProficiency)} />
        <Route path="/english-proficiency/driver-interview" element={withFooter(DriverInterviewPlaceholder)} />
        <Route path="/english-proficiency/flashcards" element={withFooter(FmcsaFlashCards)} />
        <Route path="/vehicle-inspections/dvir" element={withFooter(PostTrip)} />
        <Route path="/vehicle-inspections/maintenance-repair" element={withFooter(MaintenanceRepair)} />
        <Route path="/records-of-duty" element={withFooter(RDS)} />
        <Route path="/rds" element={withFooter(RDS)} />
        <Route path="/eld-coach" element={withFooter(ELDCoach)} />
        <Route path="/eld-coach/setup" element={withFooter(ELDSetup)} />
        <Route path="/eld-coach/day-start" element={withFooter(ELDDayStart)} />
        <Route path="/eld-coach/status" element={withFooter(ELDStatusPad)} />
        <Route path="/eld-coach/risk" element={withFooter(ELDRiskPanel)} />
        <Route path="/eld-coach/transfer" element={withFooter(ELDTransfer)} />
        <Route path="/eld-coach/malfunction" element={withFooter(ELDMalfunction)} />
        <Route path="/eld-coach/lessons" element={withFooter(ELDLessons)} />
        <Route path="/eld-coach/device" element={withFooter(ELDDevice)} />
        <Route path="/faq" element={withFooter(FAQ)} />
        <Route path="/about" element={withFooter(About)} />
        <Route path="/consultation" element={withFooter(Consultation)} />
        <Route path="/getting-started" element={withFooter(GettingStarted)} />
        <Route path="/terms" element={withFooter(Terms)} />
  <Route path="/privacy" element={withFooter(Privacy)} />
  <Route path="/data-handling" element={withFooter(DataHandling)} />
  <Route path="/acceptable-use" element={withFooter(AcceptableUse)} />
  <Route path="/cookies" element={withFooter(Cookies)} />
  <Route path="/disclaimer" element={withFooter(Disclaimer)} />
  <Route path="/boc-3" element={withFooter(BOC3ProcessAgent)} />
  <Route path="/boc-3-process-agents" element={withFooter(BOC3ProcessAgent)} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
