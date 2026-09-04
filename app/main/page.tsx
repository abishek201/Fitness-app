// pages/dashboard.js
import Head from 'next/head';
import './main.css';

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard - Brand Name</title>
      </Head>
      <div className="dash-page">
        <nav className="dash-nav">
          <span className="dash-logo">BRAND NAME</span>
          <div className="dash-nav-links">
            <a href="#">exercise planner</a>
            <a href="#">about us</a>
          </div>
        </nav>

        <main className="dash-main">
          <section className="dash-section">
            <h2 className="dash-section-title">CLIENT DETAILS</h2>
            <div className="dash-details">
              <div className="detail-row"><span>user name</span><strong>abishek</strong></div>
              <div className="detail-row"><span>age</span><strong>20</strong></div>
              <div className="detail-row"><span>height</span><strong>177cm</strong></div>
              <div className="detail-row"><span>weight</span><strong>65</strong></div>
              <div className="detail-row"><span>body fat</span><strong>20%</strong></div>
            </div>
          </section>

          <section className="dash-section">
            <h2 className="dash-section-title">CLIENTS CALCULATED RESULTS</h2>
            <div className="dash-results">
              <div className="result-card highlight">
                <span className="result-number">3100</span>
                <span className="result-label">DAILY CAL REQUIREMENT FOR WEIGHT GAIN</span>
              </div>
              <div className="result-card">
                <span className="result-number">2600</span>
                <span className="result-label">DAILY MAINTENANCE CALORIES</span>
              </div>
            </div>
          </section>

          <section className="dash-section">
            <h2 className="dash-section-title">MACROS FOR DAILY INTAKE</h2>
            <div className="dash-macros">
              <div className="macro-item"><span>carbohydrates</span><strong>—</strong></div>
              <div className="macro-item"><span>protein</span><strong>—</strong></div>
              <div className="macro-item"><span>fats</span><strong>—</strong></div>
            </div>
          </section>

          <section className="dash-section">
            <h2 className="dash-section-title">STEPS TO COMPLETE DAILY</h2>
            <div className="dash-steps">
              <span className="steps-number">2000</span>
            </div>
          </section>

          <section className="dash-section">
            <h2 className="dash-section-title">MUSCLE - FAT CONTROL</h2>
            <div className="dash-control">
              <div className="control-item up">
                <span>muscle control</span>
                <strong>+4.5 kg</strong>
              </div>
              <div className="control-item down">
                <span>fat control</span>
                <strong>-2.5 kg</strong>
              </div>
            </div>
          </section>

          <section className="dash-section">
            <h2 className="dash-section-title">FITNESS SCORE</h2>
            <div className="dash-score">
              <div className="score-ring">
                <span className="score-number">70</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
