"use client"
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './meal.css';

const STORAGE_KEY = 'userform';

// Macros per 100g for each food
const foodDB = {
  oats: { name: 'Oatmeal', p: 16.9, c: 66, f: 6.9, cal: 389 },
  milk: { name: 'Whole Milk', p: 3.4, c: 5, f: 3.2, cal: 65 },
  banana: { name: 'Banana', p: 1.1, c: 23, f: 0.3, cal: 89 },
  peanut: { name: 'Peanut Butter', p: 25, c: 20, f: 50, cal: 588 },
  shake: { name: 'Whey Protein', p: 82, c: 8, f: 3.5, cal: 400 },
  yogurt: { name: 'Greek Yogurt', p: 10, c: 3.6, f: 0.7, cal: 59 },
  almonds: { name: 'Almonds', p: 21, c: 22, f: 49, cal: 579 },
  chicken: { name: 'Chicken Breast', p: 31, c: 0, f: 3.6, cal: 165 },
  rice: { name: 'Brown Rice (cooked)', p: 2.7, c: 23, f: 0.9, cal: 112 },
  broccoli: { name: 'Broccoli', p: 2.8, c: 7, f: 0.4, cal: 34 },
  oil: { name: 'Olive Oil', p: 0, c: 0, f: 100, cal: 884 },
  egg: { name: 'Whole Eggs', p: 13, c: 1, f: 11, cal: 155 },
  bread: { name: 'Whole Wheat Bread', p: 13, c: 41, f: 3.5, cal: 265 },
  turkey: { name: ' Breast chicken', p: 45, c: 0, f: 1, cal: 135 },
  avocado: { name: 'Avocado', p: 2, c: 9, f: 15, cal: 160 },
  salmon: { name: 'Salmon Fillet', p: 20, c: 0, f: 13, cal: 208 },
  potato: { name: 'Sweet Potato', p: 1.6, c: 20, f: 0.1, cal: 86 },
  quinoa: { name: 'Quinoa (cooked)', p: 4.4, c: 21, f: 1.9, cal: 120 },
  tuna: { name: 'Tuna (canned)', p: 26, c: 0, f: 1, cal: 116 },
  cheese: { name: 'Cottage Cheese', p: 11, c: 3.4, f: 4.3, cal: 98 },
  cod: { name: 'Cod Fillet', p: 18, c: 0, f: 0.7, cal: 82 },
  spinach: { name: 'Spinach', p: 2.9, c: 3.6, f: 0.4, cal: 23 },
  tomato: { name: 'Tomato', p: 0.9, c: 3.9, f: 0.2, cal: 18 },
  beans: { name: 'Black Beans (cooked)', p: 9, c: 24, f: 0.5, cal: 132 },
  shrimp: { name: 'Shrimp', p: 24, c: 0, f: 0.3, cal: 99 },
  beef: { name: 'Lean Beef', p: 26, c: 0, f: 15, cal: 250 },
};

// Meal templates: base portions in grams (these get scaled to match user targets)
const mealTemplates = {
  'weight gain': [
    {
      name: 'Breakfast', time: '7:00 AM',
      items: [
        { key: 'oats', baseG: 80 },
        { key: 'milk', baseG: 250 },
        { key: 'banana', baseG: 120 },
        { key: 'peanut', baseG: 32 },
      ],
    },
    {
      name: 'Mid-Morning Snack', time: '10:00 AM',
      items: [
        { key: 'yogurt', baseG: 200 },
        { key: 'almonds', baseG: 30 },
        { key: 'shake', baseG: 30 },
      ],
    },
    {
      name: 'Lunch', time: '1:00 PM',
      items: [
        { key: 'chicken', baseG: 200 },
        { key: 'rice', baseG: 150 },
        { key: 'broccoli', baseG: 100 },
        { key: 'oil', baseG: 10 },
      ],
    },
    {
      name: 'Pre-Workout', time: '4:00 PM',
      items: [
        { key: 'bread', baseG: 60 },
        { key: 'turkey', baseG: 100 },
        { key: 'avocado', baseG: 80 },
      ],
    },
    {
      name: 'Dinner', time: '8:00 PM',
      items: [
        { key: 'salmon', baseG: 200 },
        { key: 'potato', baseG: 200 },
        { key: 'quinoa', baseG: 100 },
        { key: 'oil', baseG: 10 },
      ],
    },
    {
      name: 'Before Bed', time: '10:00 PM',
      items: [
        { key: 'cheese', baseG: 150 },
        { key: 'shake', baseG: 30 },
        { key: 'almonds', baseG: 15 },
      ],
    },
  ],
  'weight loss': [
    {
      name: 'Breakfast', time: '7:00 AM',
      items: [
        { key: 'egg', baseG: 150 },
        { key: 'spinach', baseG: 50 },
        { key: 'bread', baseG: 30 },
      ],
    },
    {
      name: 'Mid-Morning Snack', time: '10:00 AM',
      items: [
        { key: 'yogurt', baseG: 150 },
        { key: 'banana', baseG: 50 },
      ],
    },
    {
      name: 'Lunch', time: '1:00 PM',
      items: [
        { key: 'chicken', baseG: 150 },
        { key: 'broccoli', baseG: 150 },
        { key: 'oil', baseG: 5 },
        { key: 'tomato', baseG: 50 },
      ],
    },
    {
      name: 'Afternoon Snack', time: '4:00 PM',
      items: [
        { key: 'shake', baseG: 30 },
        { key: 'banana', baseG: 50 },
      ],
    },
    {
      name: 'Dinner', time: '7:30 PM',
      items: [
        { key: 'cod', baseG: 180 },
        { key: 'spinach', baseG: 100 },
        { key: 'oil', baseG: 5 },
      ],
    },
    {
      name: 'Evening Snack', time: '9:00 PM',
      items: [
        { key: 'cheese', baseG: 100 },
        { key: 'tomato', baseG: 50 },
      ],
    },
  ],
  'fat loss': [
    {
      name: 'Breakfast', time: '7:00 AM',
      items: [
        { key: 'egg', baseG: 150 },
        { key: 'avocado', baseG: 80 },
      ],
    },
    {
      name: 'Mid-Morning Snack', time: '10:00 AM',
      items: [
        { key: 'cheese', baseG: 100 },
        { key: 'almonds', baseG: 15 },
      ],
    },
    {
      name: 'Lunch', time: '1:00 PM',
      items: [
        { key: 'turkey', baseG: 180 },
        { key: 'broccoli', baseG: 150 },
        { key: 'oil', baseG: 8 },
      ],
    },
    {
      name: 'Pre-Workout', time: '4:00 PM',
      items: [
        { key: 'chicken', baseG: 100 },
        { key: 'bread', baseG: 30 },
      ],
    },
    {
      name: 'Dinner', time: '7:30 PM',
      items: [
        { key: 'beef', baseG: 150 },
        { key: 'broccoli', baseG: 150 },
        { key: 'oil', baseG: 8 },
      ],
    },
    {
      name: 'Before Bed', time: '9:30 PM',
      items: [
        { key: 'shake', baseG: 30 },
        { key: 'almonds', baseG: 10 },
      ],
    },
  ],
  'lean body': [
    {
      name: 'Breakfast', time: '7:00 AM',
      items: [
        { key: 'oats', baseG: 60 },
        { key: 'shake', baseG: 15 },
        { key: 'egg', baseG: 100 },
        { key: 'banana', baseG: 50 },
      ],
    },
    {
      name: 'Mid-Morning Snack', time: '10:00 AM',
      items: [
        { key: 'yogurt', baseG: 150 },
        { key: 'almonds', baseG: 20 },
      ],
    },
    {
      name: 'Lunch', time: '1:00 PM',
      items: [
        { key: 'chicken', baseG: 150 },
        { key: 'quinoa', baseG: 100 },
        { key: 'broccoli', baseG: 100 },
        { key: 'oil', baseG: 8 },
      ],
    },
    {
      name: 'Pre-Workout', time: '4:00 PM',
      items: [
        { key: 'bread', baseG: 50 },
        { key: 'turkey', baseG: 80 },
        { key: 'banana', baseG: 50 },
      ],
    },
    {
      name: 'Dinner', time: '7:30 PM',
      items: [
        { key: 'salmon', baseG: 150 },
        { key: 'potato', baseG: 150 },
        { key: 'avocado', baseG: 50 },
      ],
    },
    {
      name: 'Evening Snack', time: '9:00 PM',
      items: [
        { key: 'cheese', baseG: 100 },
        { key: 'tomato', baseG: 50 },
      ],
    },
  ],
};

export default function MealPlannerPage() {
  const [data, setData] = useState({});
  const [meals, setMeals] = useState([]);
  const [totals, setTotals] = useState({ cal: 0, p: 0, c: 0, f: 0 });
  const [targets, setTargets] = useState({ cal: 0, p: 0, c: 0, f: 0 });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const parsed = JSON.parse(saved);
    setData(parsed);

    // Read targets from dashboard calculations
    const userTargets = {
      cal: parsed.caloriesTarget || 2500,
      p: parsed.proteinTarget || 150,
      c: parsed.carbsTarget || 250,
      f: parsed.fatsTarget || 80,
    };
    setTargets(userTargets);

    // Pick template based on goal
    const userGoal = parsed.goal?.toLowerCase() || 'lean body';
    const template = mealTemplates[userGoal] || mealTemplates['lean body'];

    // Calculate base totals from template
    let baseCal = 0;
    template.forEach((meal) => {
      meal.items.forEach((item) => {
        const food = foodDB[item.key];
        baseCal += (food.cal * item.baseG) / 100;
      });
    });

    // Scale ratio based on calories (this scales all portions proportionally)
    const ratio = userTargets.cal / baseCal;

    // Build scaled meals
    let tCal = 0, tP = 0, tC = 0, tF = 0;
    const scaled = template.map((meal) => {
      const mealItems = meal.items.map((item) => {
        const food = foodDB[item.key];
        const actualG = Math.round(item.baseG * ratio);
        const cal = Math.round((food.cal * actualG) / 100);
        const p = Math.round((food.p * actualG) / 100);
        const c = Math.round((food.c * actualG) / 100);
        const f = Math.round((food.f * actualG) / 100);

        tCal += cal;
        tP += p;
        tC += c;
        tF += f;

        return {
          name: food.name,
          portion: `${actualG}g`,
          cal,
          p,
          c,
          f,
        };
      });

      return {
        name: meal.name,
        time: meal.time,
        items: mealItems,
      };
    });

    setMeals(scaled);
    setTotals({ cal: tCal, p: tP, c: tC, f: tF });
  }, []);

  if (!meals.length) {
    return (
      <div className="mp-page">
        <h2 className="mp-logo">BRAND NAME</h2>
        <p className="mp-loading">Loading your meal plan...</p>
        <Link href="/main" className="mp-back">Go to Dashboard</Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Meal Planner - Brand Name</title>
      </Head>
      <div className="mp-page">
        <nav className="mp-nav">
          <span className="mp-logo">BRAND NAME</span>
          <Link href="/dashboard" className="mp-nav-link">Back to Dashboard</Link>
        </nav>

        <header className="mp-header">
          <h1 className="mp-title">Your Meal Plan</h1>
          <p className="mp-sub">Portions calculated for your exact macros</p>
          <span className="mp-goal-badge">Goal: {data.goal || 'lean body'}</span>
        </header>

        {/* Targets vs Actual */}
        <section className="mp-totals">
          <div className="mp-total-card target">
            <span className="mp-total-label">Target Calories</span>
            <span className="mp-total-num">{targets.cal}</span>
          </div>
          <div className="mp-total-card target">
            <span className="mp-total-label">Target Protein</span>
            <span className="mp-total-num">{targets.p}g</span>
          </div>
          <div className="mp-total-card target">
            <span className="mp-total-label">Target Carbs</span>
            <span className="mp-total-num">{targets.c}g</span>
          </div>
          <div className="mp-total-card target">
            <span className="mp-total-label">Target Fats</span>
            <span className="mp-total-num">{targets.f}g</span>
          </div>
        </section>

        <section className="mp-totals actual">
          <div className="mp-total-card">
            <span className="mp-total-label">Plan Calories</span>
            <span className="mp-total-num">{totals.cal}</span>
          </div>
          <div className="mp-total-card">
            <span className="mp-total-label">Plan Protein</span>
            <span className="mp-total-num">{totals.p}g</span>
          </div>
          <div className="mp-total-card">
            <span className="mp-total-label">Plan Carbs</span>
            <span className="mp-total-num">{totals.c}g</span>
          </div>
          <div className="mp-total-card">
            <span className="mp-total-label">Plan Fats</span>
            <span className="mp-total-num">{totals.f}g</span>
          </div>
        </section>

        <main className="mp-main">
          {meals.map((meal, mIndex) => (
            <div
              key={meal.name}
              className="mp-meal"
              style={{ animationDelay: `${mIndex * 100}ms` }}
            >
              <div className="mp-meal-header">
                <h2>{meal.name}</h2>
                <span>{meal.time}</span>
              </div>
              <div className="mp-meal-items">
                {meal.items.map((item, i) => (
                  <div key={i} className="mp-item">
                    <div className="mp-item-info">
                      <span className="mp-item-name">{item.name}</span>
                      <span className="mp-item-portion">{item.portion}</span>
                    </div>
                    <div className="mp-item-macros">
                      <span className="mp-macro cal">{item.cal}</span>
                      <span className="mp-macro p">{item.p}P</span>
                      <span className="mp-macro c">{item.c}C</span>
                      <span className="mp-macro f">{item.f}F</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>
    </>
  );
}