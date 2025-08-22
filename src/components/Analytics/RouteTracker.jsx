import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, enableAutoClickTracking } from '../../analytics/initGA';

// Map route paths to human friendly titles (extend as new routes are added)
const TITLE_MAP = {
  '/': 'Home',
  '/fmcsa-compliance': 'FMCSA Compliance',
  '/fmcsa-regulations': 'FMCSA Regulations',
  '/hours-of-service': 'Hours of Service',
  '/medical-requirements': 'Medical Requirements',
  '/safety-management': 'Safety Management',
  '/safety-training': 'Safety Training',
  '/safety-training/defensive-driving': 'Defensive Driving',
  '/safety-training/hazmat': 'Hazmat Safety',
  '/safety-training/weather-road': 'Weather & Road Conditions',
  '/safety-training/emergency-procedures': 'Emergency Procedures',
  '/safety-training/accident-prevention': 'Accident Prevention',
  '/violations-management': 'Violation Management',
  '/violations-management/citation-types': 'Citation Types',
  '/violations-management/dataq-navigation': 'DataQ Navigation',
  '/violations-management/driver-score': 'Driver Score',
  '/violations-management/most-common': 'Most Common Violations',
  '/violations-management/appeal-process': 'Appeal Process',
  '/csa': 'CSA',
  '/prevention-management': 'Prevention Management',
  '/farm-exemption-checker': 'Farm Exemption Checker',
  '/vehicle-inspections': 'Vehicle Inspections',
  '/vehicle-inspections/pre-trip': 'Pre-Trip Inspection',
  '/vehicle-inspections/post-trip': 'Post-Trip Inspection',
  '/vehicle-inspections/dot-roadside': 'DOT Roadside Inspection',
  '/vehicle-inspections/english-proficiency': 'English Proficiency (Legacy)',
  '/english-proficiency': 'English Proficiency',
  '/english-proficiency/driver-interview': 'Driver Interview',
  '/english-proficiency/flashcards': 'FMCSA Flash Cards',
  '/vehicle-inspections/dvir': 'DVIR',
  '/vehicle-inspections/maintenance-repair': 'Maintenance & Repair',
  '/records-of-duty': 'Records of Duty',
  '/rds': 'Records of Duty',
  '/eld-coach': 'ELD Coach',
  '/eld-coach/setup': 'ELD Setup',
  '/eld-coach/day-start': 'ELD Day Start',
  '/eld-coach/status': 'ELD Status Pad',
  '/eld-coach/risk': 'ELD Risk Panel',
  '/eld-coach/transfer': 'ELD Data Transfer',
  '/eld-coach/malfunction': 'ELD Malfunction',
  '/eld-coach/lessons': 'ELD Lessons',
  '/eld-coach/device': 'ELD Device',
  '/faq': 'FAQ',
  '/about': 'About',
  '/consultation': 'Consultation',
  '/getting-started': 'Getting Started',
  '/terms': 'Terms & Conditions',
  '/privacy': 'Privacy Policy',
  '/data-handling': 'Data Handling Policy',
  '/acceptable-use': 'Acceptable Use Policy',
  '/cookies': 'Cookies Notice',
  '/disclaimer': 'Disclaimer'
};

function toTitleFromPath(path) {
  if (TITLE_MAP[path]) return TITLE_MAP[path];
  // Fallback: turn "/some-path/example" -> "Some Path Example"
  const slug = path.split('?')[0].split('#')[0];
  const parts = slug.replace(/\/+/, '/').split('/').filter(Boolean);
  if (!parts.length) return 'Home';
  return parts[parts.length - 1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// Listens for route changes and fires page_view events. Also turns on delegated click tracking once.
export default function RouteTracker() {
  const location = useLocation();
  useEffect(() => {
    const baseTitle = toTitleFromPath(location.pathname);
    const fullTitle = baseTitle === 'Home' ? 'FixDQ' : `FixDQ | ${baseTitle}`;
    if (document.title !== fullTitle) document.title = fullTitle;
    trackPageView(location.pathname + location.search, baseTitle);
  }, [location.pathname, location.search]);

  useEffect(() => {
    enableAutoClickTracking();
  }, []);
  return null;
}
