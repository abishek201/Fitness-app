"use client";

import { useState } from "react";
import Link from "next/link";
import "./food.css";

export default function FoodScanner() {
  const [image, setImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [nutrition, setNutrition] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        const base64 = canvas.toDataURL("image/jpeg", 0.8);
        setImage(base64);
        setPreview(base64);
        setError("");
        setNutrition(null);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const analyzeFood = async () => {
    if (!image) return;
    setIsLoading(true);
    setError("");
    setNutrition(null);

    try {
      const response = await fetch("/api/analyze-food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();

      // Backend returns validated object directly (result.output)
      if (data && data.foodName) {
        setNutrition(data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetScanner = () => {
    setImage(null);
    setPreview(null);
    setNutrition(null);
    setError("");
  };

  return (
    <>
      <nav className="mp-nav">
        <span className="mp-logo">Track my fitness</span>
        <Link href="/main" className="mp-nav-link">
          Back to Dashboard
        </Link>
      </nav>

      <div className="scanner-container">
        <div className="scanner-card">
          <h1 className="scanner-title">🥗 AI Food Scanner</h1>
          <p className="scanner-subtitle">
            Upload a photo of your meal to get instant nutrition facts
          </p>

          {/* Upload area */}
          <div className="upload-section">
            <label className="upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
              />
              {preview ? (
                <div className="preview-container">
                  <img
                    src={preview}
                    alt="Food preview"
                    className="preview-image"
                  />
                  <div className="preview-overlay">
                    <span>Click to change photo</span>
                  </div>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">📸</div>
                  <p className="upload-text">Click to upload food photo</p>
                  <p className="upload-hint">JPG, PNG supported</p>
                </div>
              )}
            </label>
          </div>

          {/* Error message */}
          {error && <div className="error-message">⚠️ {error}</div>}

          {/* Action buttons */}
          <div className="button-group">
            <button
              onClick={analyzeFood}
              disabled={!image || isLoading}
              className="scan-button"
            >
              {isLoading ? "Analyzing..." : "🔍 Scan Macros"}
            </button>

            {(image || nutrition) && (
              <button onClick={resetScanner} className="reset-button">
                🔄 Reset
              </button>
            )}
          </div>

          {/* Results */}
          {nutrition && (
            <div className="results-section">
              <div className="food-header">
                <h2 className="food-name">{nutrition.foodName}</h2>
                <span className="confidence-badge">
                  {nutrition.confidence}% confident
                </span>
              </div>

              {/* Macro cards */}
              <div className="macros-grid">
                <div className="macro-card">
                  <div className="macro-label">Calories</div>
                  <div className="macro-value">
                    {nutrition.macros?.calories}
                    <span className="macro-unit">kcal</span>
                  </div>
                </div>
                <div className="macro-card">
                  <div className="macro-label">Protein</div>
                  <div className="macro-value">
                    {nutrition.macros?.protein}
                    <span className="macro-unit">g</span>
                  </div>
                </div>
                <div className="macro-card">
                  <div className="macro-label">Carbs</div>
                  <div className="macro-value">
                    {nutrition.macros?.carbs}
                    <span className="macro-unit">g</span>
                  </div>
                </div>
                <div className="macro-card">
                  <div className="macro-label">Fat</div>
                  <div className="macro-value">
                    {nutrition.macros?.fat}
                    <span className="macro-unit">g</span>
                  </div>
                </div>
              </div>

              {/* Detected ingredients (read-only tags) */}
              {nutrition.ingredients && nutrition.ingredients.length > 0 && (
                <div className="ingredients-section">
                  <h3 className="section-title">Detected Ingredients</h3>
                  <div className="ingredients-list">
                    {nutrition.ingredients.map((ing: string, index: number) => (
                      <span key={index} className="ingredient-tag">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* AI advice */}
              {nutrition.advice && (
                <div className="advice-box">💡 {nutrition.advice}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
