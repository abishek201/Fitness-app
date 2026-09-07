// pages/carbs-foods.js
import Head from 'next/head';
import Link from 'next/link';
import './carbs.css';

const carbsFoods = [
  {
    category: 'Grains & Cereals',
    items: [
      { name: 'Oats', carbs: 66, per: '100g', calories: 389 },
      { name: 'White Rice (cooked)', carbs: 28, per: '100g', calories: 130 },
      { name: 'Brown Rice (cooked)', carbs: 23, per: '100g', calories: 112 },
      { name: 'Whole Wheat Bread', carbs: 49, per: '100g', calories: 265 },
      { name: 'Pasta (cooked)', carbs: 25, per: '100g', calories: 131 },
    ],
  },
  {
    category: 'Starchy Vegetables',
    items: [
      { name: 'Sweet Potato', carbs: 20, per: '100g', calories: 86 },
      { name: 'White Potato', carbs: 17, per: '100g', calories: 77 },
      { name: 'Corn', carbs: 19, per: '100g', calories: 86 },
      { name: 'Green Peas', carbs: 14, per: '100g', calories: 81 },
      { name: 'Plantain', carbs: 32, per: '100g', calories: 122 },
    ],
  },
  {
    category: 'Fruits',
    items: [
      { name: 'Banana', carbs: 23, per: '100g', calories: 89 },
      { name: 'Dates', carbs: 75, per: '100g', calories: 282 },
      { name: 'Raisins', carbs: 79, per: '100g', calories: 299 },
      { name: 'Mango', carbs: 15, per: '100g', calories: 60 },
      { name: 'Apple', carbs: 14, per: '100g', calories: 52 },
    ],
  },
  {
    category: 'Legumes',
    items: [
      { name: 'Lentils (cooked)', carbs: 20, per: '100g', calories: 116 },
      { name: 'Chickpeas (cooked)', carbs: 27, per: '100g', calories: 164 },
      { name: 'Black Beans', carbs: 24, per: '100g', calories: 132 },
      { name: 'Kidney Beans', carbs: 22, per: '100g', calories: 127 },
      { name: 'Quinoa (cooked)', carbs: 21, per: '100g', calories: 120 },
    ],
  },
  {
    category: 'Sugars & Sweeteners',
    items: [
      { name: 'Honey', carbs: 82, per: '100g', calories: 304 },
      { name: 'Maple Syrup', carbs: 67, per: '100g', calories: 260 },
      { name: 'Brown Sugar', carbs: 98, per: '100g', calories: 380 },
      { name: 'Agave Nectar', carbs: 76, per: '100g', calories: 310 },
    ],
  },
  {
    category: 'Snacks',
    items: [
      { name: 'Rice Cakes', carbs: 81, per: '100g', calories: 387 },
      { name: 'Pretzels', carbs: 80, per: '100g', calories: 380 },
      { name: 'Popcorn (plain)', carbs: 78, per: '100g', calories: 387 },
      { name: 'Rice Crackers', carbs: 82, per: '100g', calories: 392 },
    ],
  },
];

export default function CarbsFoodsPage() {
  return (
    <>
      <Head>
        <title>Carb Rich Foods - Brand Name</title>
      </Head>
      <div className="carb-page">
        <nav className="carb-nav">
          <span className="carb-logo">BRAND NAME</span>
          <Link href="/dashboard" className="carb-nav-link">Back to Dashboard</Link>
        </nav>

        <header className="carb-header">
          <h1 className="carb-title">Carb Rich Foods</h1>
          <p className="carb-sub">Grams of carbs per grams of product</p>
        </header>

        <main className="carb-main">
          {carbsFoods.map((group, gIndex) => (
            <section
              key={group.category}
              className="carb-group"
              style={{ animationDelay: `${gIndex * 100}ms` }}
            >
              <h2 className="carb-cat-title">{group.category}</h2>
              <div className="carb-grid">
                {group.items.map((item) => (
                  <div key={item.name} className="carb-card">
                    <div className="carb-top">
                      <h3 className="carb-name">{item.name}</h3>
                      <span className="carb-badge">{item.carbs}g</span>
                    </div>
                    <div className="carb-bottom">
                      <span>per {item.per}</span>
                      <span>{item.calories} cal</span>
                    </div>
                    <div className="carb-bar">
                      <div
                        className="carb-fill"
                        style={{ width: `${Math.min((item.carbs / 100) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </>
  );
}