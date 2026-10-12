'use client';

import { useState, useEffect } from 'react';
import './meal.css';

export default function MealPlanner() {
  const [userData, setUserData] = useState<any>(null);
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeDay, setActiveDay] = useState(0);

  // Load user data from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('userform');
      if (saved) {
        const data = JSON.parse(saved);
        setUserData({
          name: data.name || 'User',
          allergens: data.allergens || [],
          diseases: data.diseases || '',
          hasDisease: data.hasDisease || 'no',
          goal: data.goal  || 'null',
          caloriesTarget: data.caloriesTarget || 0,
          proteinTarget: data.proteinTarget || 0,
          carbsTarget: data.carbsTarget || 0,
          fatsTarget: data.fatsTarget || 0,
          activity: data.activity|| 'No physical activity',
          weight: data.weight || "-" ,
          height: data.height || "-" ,
          age: data.age || "-"
        });
      }
    } catch (e) {
      console.error('Failed to load user data:', e);
    }
  }, []);
  const dataa = userData;

  // Generate meal plan
  const generatePlan = async () => {
    if (!userData) return;

    setIsLoading(true);
    setError('');
    setMealPlan(null);

    try {
      const response = await fetch('/api/mealplan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to generate plan');
      }

      const data = await response.json();
      setMealPlan(data);
      setActiveDay(0);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
    const [dataa, setDataa] = useState(null);

useEffect(() => {
  const saved = localStorage.getItem('userform');
  if (saved) setDataa(JSON.parse(saved));
}, []);


  };

  // No data state
  if (!userData) {
    return (
      <div className="planner-container">
        <div className="planner-card">
          <h1 className="planner-title">Meal Planner</h1>
          <div className="no-data-box">
            <p>Please complete your profile first.</p>
            <a href="/goal" className="link-button">Go to Profile</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="planner-container">
      <div className="planner-card">
        <h1 className="planner-title">Meal Planner</h1>
        <p className="planner-subtitle">Personalized for {userData.name}</p>

        {/* User Profile Summary */}
        <div className="profile-summary">
          <h3 className="summary-title">Your Health Profile</h3>
          
          {/* Goal & Targets */}
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Goal</span>
              <span className="stat-value">{userData.goal}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Daily Calories</span>
              <span className="stat-value">{userData.caloriesTarget} kcal</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Protein</span>
              <span className="stat-value">{userData.proteinTarget}g</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Carbs</span>
              <span className="stat-value">{userData.carbsTarget}g</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Fats</span>
              <span className="stat-value">{userData.fatsTarget}g</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Activity</span>
              <span className="stat-value">{userData.activity}</span>
            </div>
          </div>

          {/* Allergens */}
          <div className="summary-section">
            <span className="summary-label">⚠️ Allergens to Avoid:</span>
            <div className="tag-list">
              {userData.allergens.length > 0 ? (
                userData.allergens.map((item: string, i: number) => (
                  <span key={i} className="tag tag-allergen">{item}</span>
                ))
              ) : (
                <span className="tag tag-none">None</span>
              )}
            </div>
          </div>

          {/* Health Conditions */}
          {userData.hasDisease === 'yes' && userData.diseases && (
            <div className="summary-section">
              <span className="summary-label">🏥 Health Conditions:</span>
              <div className="tag-list">
                <span className="tag tag-health">{userData.diseases}</span>
              </div>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <button 
          onClick={generatePlan}
          disabled={isLoading}
          className="generate-button"
        >
          {isLoading ? '⏳ Generating your meal plan...' : 'Generate 7-Day Meal Plan'}
        </button>

        {/* Error */}
        {error && <div className="error-box">⚠️ {error}</div>}

        {/* Meal Plan Display */}
        {mealPlan && (
          <div className="meal-plan-display">
            
            {/* Day Tabs */}
            <div className="day-tabs">
              {mealPlan.days?.map((day: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setActiveDay(index)}
                  className={activeDay === index ? 'day-tab active' : 'day-tab'}
                >
                  {day.day?.substring(0, 3)}
                </button>
              ))}
            </div>

            {/* Active Day */}
            <div className="day-content">
              <div className="day-header">
                <h2 className="day-title">{mealPlan.days[activeDay]?.day}</h2>
                <span className="day-calories">
                  {mealPlan.days[activeDay]?.totalCalories} kcal total
                </span>
              </div>
              
              <div className="meals-list">
                {mealPlan.days[activeDay]?.meals?.map((meal: any, idx: number) => (
                  <div key={idx} className="meal-item">
                    <div className="meal-header">
                      <span className="meal-type">{meal.type}</span>
                      <span className="meal-calories">{meal.calories} kcal</span>
                    </div>
                    <h4 className="meal-name">{meal.name}</h4>
                    <p className="meal-desc">{meal.description}</p>
                    
                    <div className="meal-macros">
                      <span className="macro-pill">P: {meal.protein}g</span>
                      <span className="macro-pill">C: {meal.carbs}g</span>
                      <span className="macro-pill">F: {meal.fat}g</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            {mealPlan.tips && mealPlan.tips.length > 0 && (
              <div className="tips-section">
                <h3 className="section-title">💡 Tips for Your Goal</h3>
                <ul className="tips-list">
                  {mealPlan.tips.map((tip: string, i: number) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warnings */}
            {mealPlan.warnings && mealPlan.warnings.length > 0 && (
              <div className="warnings-section">
                <h3 className="section-title">⚠️ Important</h3>
                <ul className="warnings-list">
                  {mealPlan.warnings.map((warning: string, i: number) => (
                    <li key={i}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            <button 
              onClick={generatePlan}
              disabled={isLoading}
              className="regenerate-button"
            >
              🔄 Generate New Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}