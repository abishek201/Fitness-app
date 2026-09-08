// pages/protein-foods.js
import Head from 'next/head';
import Link from 'next/link';
import './protein.css';

const proteinFoods = [
  {
    category: 'Meat & Poultry',
    items: [
      { name: 'Chicken Breast', protein: 31, per: '100g', calories: 165 },
      { name: 'Turkey Breast', protein: 29, per: '100g', calories: 135 },
      { name: 'Lean Beef', protein: 26, per: '100g', calories: 250 },
      { name: 'Pork Loin', protein: 25, per: '100g', calories: 200 },
      { name: 'Lamb', protein: 25, per: '100g', calories: 294 },
    ],
  },
  {
    category: 'Seafood',
    items: [
      { name: 'Tuna (canned)', protein: 26, per: '100g', calories: 116 },
      { name: 'Salmon', protein: 25, per: '100g', calories: 208 },
      { name: 'Shrimp', protein: 24, per: '100g', calories: 99 },
      { name: 'Cod', protein: 18, per: '100g', calories: 82 },
      { name: 'Tilapia', protein: 20, per: '100g', calories: 96 },
    ],
  },
  {
    category: 'Eggs & Dairy',
    items: [
      { name: 'Egg (whole)', protein: 13, per: '100g', calories: 155 },
      { name: 'Egg White', protein: 11, per: '100g', calories: 52 },
      { name: 'Greek Yogurt', protein: 10, per: '100g', calories: 59 },
      { name: 'Cottage Cheese', protein: 11, per: '100g', calories: 98 },
      { name: 'Milk', protein: 3.4, per: '100g', calories: 42 },
    ],
  },
  {
    category: 'Plant Based',
    items: [
      { name: 'Tofu (firm)', protein: 15, per: '100g', calories: 144 },
      { name: 'Lentils (cooked)', protein: 9, per: '100g', calories: 116 },
      { name: 'Chickpeas (cooked)', protein: 9, per: '100g', calories: 164 },
      { name: 'Black Beans', protein: 9, per: '100g', calories: 132 },
      { name: 'Quinoa (cooked)', protein: 4.4, per: '100g', calories: 120 },
    ],
  },
  {
    category: 'Nuts & Seeds',
    items: [
      { name: 'Peanuts', protein: 26, per: '100g', calories: 567 },
      { name: 'Almonds', protein: 21, per: '100g', calories: 579 },
      { name: 'Pumpkin Seeds', protein: 30, per: '100g', calories: 559 },
      { name: 'Chia Seeds', protein: 17, per: '100g', calories: 486 },
      { name: 'Peanut Butter', protein: 25, per: '100g', calories: 588 },
    ],
  },
  {
    category: 'Supplements',
    items: [
      { name: 'Whey Protein', protein: 82, per: '100g', calories: 400 },
      { name: 'Casein Protein', protein: 80, per: '100g', calories: 370 },
      { name: 'Soy Protein', protein: 80, per: '100g', calories: 335 },
      { name: 'Pea Protein', protein: 80, per: '100g', calories: 380 },
      { name: 'Protein Bar (avg)', protein: 20, per: '60g', calories: 220 },
    ],
  },
];

export default function ProteinFoodsPage() {
  return (
    <>
      <Head>
        <title>Protein Rich Foods - Brand Name</title>
      </Head>
      <div className="prot-page">
        <nav className="prot-nav">
          <span className="prot-logo">TRACK MY FITNESS</span>
          <Link href="/main" className="prot-nav-link">Back to Dashboard</Link>
        </nav>

        <header className="prot-header">
          <h1 className="prot-title">Protein Rich Foods</h1>
          <p className="prot-sub">Grams of protein per grams of product</p>
        </header>

        <main className="prot-main">
          {proteinFoods.map((group, gIndex) => (
            <section
              key={group.category}
              className="prot-group"
              style={{ animationDelay: `${gIndex * 100}ms` }}
            >
              <h2 className="prot-cat-title">{group.category}</h2>
              <div className="prot-grid">
                {group.items.map((item) => (
                  <div key={item.name} className="prot-card">
                    <div className="prot-top">
                      <h3 className="prot-name">{item.name}</h3>
                      <span className="prot-badge">{item.protein}g</span>
                    </div>
                    <div className="prot-bottom">
                      <span>per {item.per}</span>
                      <span>{item.calories} cal</span>
                    </div>
                    <div className="prot-bar">
                      <div
                        className="prot-fill"
                        style={{ width: `${Math.min((item.protein / 100) * 100, 100)}%` }}
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