

"use client"
import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef } from 'react';
import './food.css';

export default function FoodScannerPage() {
  const [image, setImage] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImage(url);
    setScanned(false);
    setResults(null);
    startScan();
  };

  const startScan = () => {
    setScanning(true);
    // Simulate AI processing delay
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
      setResults({
        foods: [
          { name: 'Grilled Chicken Breast', grams: 150, confidence: 96 },
          { name: 'Steamed Broccoli', grams: 80, confidence: 92 },
          { name: 'Brown Rice', grams: 120, confidence: 88 },
          { name: 'Cherry Tomatoes', grams: 40, confidence: 85 },
        ],
        nutrients: {
          calories: 485,
          protein: 42,
          carbs: 48,
          fats: 12,
          fiber: 6,
          sugar: 4,
          sodium: 320,
        },
      });
    }, 2800);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Head>
        <title>Food Scanner - Brand Name</title>
      </Head>
      <div className="scan-page">
        <nav className="scan-nav">
          <span className="scan-logo">BRAND NAME</span>
          <Link href="/dashboard" className="scan-nav-link">Back to Dashboard</Link>
        </nav>

        <header className="scan-header">
          <h1 className="scan-title">Food Scanner</h1>
          <p className="scan-sub">Snap or upload a photo of your plate</p>
        </header>

        <main className="scan-main">
          {/* Upload Area */}
          {!image && (
            <div
              className="scan-upload"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="scan-upload-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <p className="scan-upload-text">Tap to upload or drop an image here</p>
              <span className="scan-upload-hint">JPG, PNG up to 10MB</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="scan-file-input"
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </div>
          )}

          {/* Image Preview with Scanner */}
          {image && (
            <div className="scan-preview">
              <div className="scan-frame">
                <img src={image} alt="Plate" className="scan-img" />
                {scanning && (
                  <>
                    <div className="scan-overlay" />
                    <div className="scan-line" />
                    <div className="scan-grid">
                      <div className="scan-dot" style={{ top: '20%', left: '30%' }} />
                      <div className="scan-dot" style={{ top: '45%', left: '60%' }} />
                      <div className="scan-dot" style={{ top: '70%', left: '25%' }} />
                    </div>
                    <div className="scan-label">Analyzing plate...</div>
                  </>
                )}
                {scanned && !scanning && (
                  <div className="scan-badge">Analysis Complete</div>
                )}
              </div>

              {!scanning && (
                <button
                  className="scan-again"
                  onClick={() => {
                    setImage(null);
                    setScanned(false);
                    setResults(null);
                  }}
                >
                  Scan Another Plate
                </button>
              )}
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="scan-results">
              {/* Detected Foods */}
              <section className="scan-section">
                <h2 className="scan-section-title">Detected Foods</h2>
                <div className="scan-foods">
                  {results.foods.map((food, i) => (
                    <div key={i} className="scan-food" style={{ animationDelay: `${i * 100}ms` }}>
                      <div className="scan-food-info">
                        <span className="scan-food-name">{food.name}</span>
                        <span className="scan-food-grams">~{food.grams}g</span>
                      </div>
                      <div className="scan-confidence">
                        <div className="scan-confidence-bar">
                          <div
                            className="scan-confidence-fill"
                            style={{ width: `${food.confidence}%` }}
                          />
                        </div>
                        <span className="scan-confidence-num">{food.confidence}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Macro Cards */}
              <section className="scan-section">
                <h2 className="scan-section-title">Nutrition Breakdown</h2>
                <div className="scan-macro-grid">
                  <div className="scan-macro-card cal">
                    <span className="scan-macro-value">{results.nutrients.calories}</span>
                    <span className="scan-macro-unit">kcal</span>
                    <span className="scan-macro-label">Calories</span>
                  </div>
                  <div className="scan-macro-card p">
                    <span className="scan-macro-value">{results.nutrients.protein}g</span>
                    <span className="scan-macro-label">Protein</span>
                  </div>
                  <div className="scan-macro-card c">
                    <span className="scan-macro-value">{results.nutrients.carbs}g</span>
                    <span className="scan-macro-label">Carbs</span>
                  </div>
                  <div className="scan-macro-card f">
                    <span className="scan-macro-value">{results.nutrients.fats}g</span>
                    <span className="scan-macro-label">Fats</span>
                  </div>
                </div>
              </section>

              {/* Micronutrients */}
              <section className="scan-section">
                <h2 className="scan-section-title">Additional Nutrients</h2>
                <div className="scan-micros">
                  <div className="scan-micro">
                    <span>Fiber</span>
                    <strong>{results.nutrients.fiber}g</strong>
                  </div>
                  <div className="scan-micro">
                    <span>Sugar</span>
                    <strong>{results.nutrients.sugar}g</strong>
                  </div>
                  <div className="scan-micro">
                    <span>Sodium</span>
                    <strong>{results.nutrients.sodium}mg</strong>
                  </div>
                </div>
              </section>

              {/* Add to Log Button */}
              <button className="scan-log-btn">Add to Daily Log</button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}