import GlobalHeader from '../../components/GlobalHeader';
import { Link } from 'react-router-dom';

function TopicCard({ title, icon, lessons, to, accent }) {
  return (
    <Link to={to} className={`topic-card card-${accent || 'green'}`} role="region" aria-labelledby={`${title}-title`}>
      <div className={`topic-rail rail-${accent || 'green'}`} aria-hidden="true"></div>
      <div className="topic-body">
        <h3 id={`${title}-title`} className="topic-title"><span className="icon" aria-hidden>{icon}</span>{title}</h3>
        <ul className="lesson-list">
          {lessons.map((t, i) => (
            <li key={i} className="lesson-item">
              <span className="lesson-check" aria-hidden>✓</span>
              <span className="lesson-text">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

function SafetyTraining() {
  const topics = [
    {
      title: 'Defensive Driving Techniques',
      icon: '🛣️',
  to: '/safety-training/defensive-driving',
  accent: 'orange',
      lessons: [
        'Scan & Space',
        'Speed & Following Distance',
        'High-Risk Zones',
        'Incident Avoidance & Recovery',
        'Night & Fatigue (optional)'
      ],
    },
    {
      title: 'Hazmat Transportation',
      icon: '♻️',
  to: '/safety-training/hazmat',
  accent: 'purple',
      lessons: [
        'Intro & Classes',
        'Segregation & Loading',
        'Route & Parking Restrictions',
        'Incident Response Basics',
        'Docs & Inspections'
      ],
    },
    {
      title: 'Weather & Road Conditions',
      icon: '🌦️',
  to: '/safety-training/weather-road',
  accent: 'blue',
      lessons: [
        'Rain & Hydroplaning',
        'Snow/Ice',
        'Wind & High Profile',
        'Heat & Grades',
        'Low Visibility'
      ],
    },
    {
      title: 'Emergency Procedures',
      icon: '🚨',
  to: '/safety-training/emergency-procedures',
  accent: 'red',
      lessons: [
        'Immediate Actions',
        'Fire Basics',
        'Medical Emergencies',
        'Breakdowns',
        'Reporting & Documentation'
      ],
    },
    {
      title: 'Accident Prevention',
      icon: '🛡️',
  to: '/safety-training/accident-prevention',
  accent: 'teal',
      lessons: [
        'Top FMCSA Violations',
        'Backing & Yard Safety',
        'Load Securement Basics',
        'Fatigue & Scheduling',
        'Near-Miss Program'
      ],
    },
  ];

  return (
    <div className="app safety-page">
      <GlobalHeader />
      <section className="section-padding">
        <div className="container">
          <main className="safety-container" aria-labelledby="safety-title">
            <header className="safety-header">
              <span className="icon" aria-hidden>🛡️</span>
              <div>
                <h1 id="safety-title">Safety Training</h1>
                <p className="safety-sub">Core safety modules for commercial drivers.</p>
              </div>
            </header>
            <section className="topic-grid">
              {topics.map((t) => (
                <TopicCard key={t.title} title={t.title} icon={t.icon} lessons={t.lessons} to={t.to} accent={t.accent} />
              ))}
            </section>
          </main>
        </div>
      </section>
    </div>
  );
}

export default SafetyTraining;
