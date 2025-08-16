import GlobalHeader from '../../components/GlobalHeader';

function ELDLessons() {
  return (
    <div className="eld-lessons app">
      <GlobalHeader />
      <section className="container">
        <h1>Lessons</h1>
        <div className="card">
          <ul>
            <li>PC vs YM fundamentals</li>
            <li>Edits & annotations: who/why</li>
            <li>Split sleeper basics</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default ELDLessons;
