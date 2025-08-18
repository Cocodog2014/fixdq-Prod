import GlobalHeader from '../../components/GlobalHeader';
import { Link } from 'react-router-dom';

export default function WeatherRoad() {
  const modules = [
    { key: 'rain-hydroplaning', title: 'Rain & Hydroplaning', emoji: '🌧️', accent: 'blue' },
    { key: 'snow-ice', title: 'Snow/Ice', emoji: '❄️', accent: 'purple' },
    { key: 'wind-high-profile', title: 'Wind & High Profile', emoji: '🌬️', accent: 'teal' },
    { key: 'heat-grades', title: 'Heat & Grades', emoji: '🌡️', accent: 'orange' },
    { key: 'low-visibility', title: 'Low Visibility', emoji: '🌫️', accent: 'red' },
  ];

  return (
    <div className="app weather-road-page">
      <GlobalHeader />
      <section className="section-padding">
        <div className="container">
          <div className="wr-header">
            <span className="wr-icon" aria-hidden>🌦️</span>
            <h1 id="wr-title">Weather & Road Conditions</h1>
          </div>
          <p className="wr-sub">Choose a module to explore. Modules are being built out.</p>

          <section className="wr-grid" aria-labelledby="wr-title">
            {modules.map((m) => (
              <div key={m.key} className={`wr-card wr-tile tile-${m.accent}`} role="region" aria-label={m.title}>
                <div className={`wr-rail rail-${m.accent}`} aria-hidden></div>
                <div className="wr-body">
                  <div className="wr-emoji" aria-hidden>{m.emoji}</div>
                  <h2 className="wr-title">{m.title}</h2>
                  <p className="wr-note">Coming soon</p>
                </div>
              </div>
            ))}
          </section>

          <div className="wr-actions">
            <Link to="/safety-training" className="btn-link">← Back to Safety Training</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
