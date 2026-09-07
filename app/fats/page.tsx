// pages/fats-foods.js
import Head from 'next/head';
import Link from 'next/link';
import './fats.css';

const fatsFoods = [
  {
    category: 'Oils',
    items: [
      { name: 'Olive Oil', fats: 100, per: '100g', calories: 884 },
      { name: 'Coconut Oil', fats: 99, per: '100g', calories: 862 },
      { name: 'Avocado Oil', fats: 100, per: '100g', calories: 884 },
      { name: 'Flaxseed Oil', fats: 100, per: '100g', calories: 884 },
      { name: 'Butter', fats: 81, per: '100g', calories: 717 },
    ],
  },
  {
    category: 'Nuts & Seeds',
    items: [
      { name: 'Walnuts', fats: 65, per: '100g', calories: 654 },
      { name: 'Macadamia', fats: 76, per: '100g', calories: 718 },
      { name: 'Almonds', fats: 49, per: '100g', calories: 579 },
      { name: 'Peanuts', fats: 49, per: '100g', calories: 567 },
      { name: 'Chia Seeds', fats: 31, per: '100g', calories: 486 },
    ],
  },
  {
    category: 'Fatty Fish',
    items: [
      { name: 'Salmon', fats: 13, per: '100g', calories: 208 },
      { name: 'Mackerel', fats: 14, per: '100g', calories: 205 },
      { name: 'Sardines', fats: 11, per: '100g', calories: 208 },
      { name: 'Herring', fats: 12, per: '100g', calories: 158 },
      { name: 'Trout', fats: 7, per: '100g', calories: 148 },
    ],
  },
  {
    category: 'Dairy & Eggs',
    items: [
      { name: 'Cheddar Cheese', fats: 33, per: '100g', calories: 402 },
      { name: 'Whole Egg', fats: 11, per: '100g', calories: 155 },
      { name: 'Egg Yolk', fats: 27, per: '100g', calories: 322 },
      { name: 'Cream Cheese', fats: 34, per: '100g', calories: 342 },
      { name: 'Greek Yogurt (full)', fats: 5, per: '100g', calories: 97 },
    ],
  },
  {
    category: 'Plant Sources',
    items: [
      { name: 'Avocado', fats: 15, per: '100g', calories: 160 },
      { name: 'Dark Chocolate', fats: 43, per: '100g', calories: 598 },
      { name: 'Olives', fats: 11, per: '100g', calories: 115 },
      { name: 'Tahini', fats: 53, per: '100g', calories: 595 },
      { name: 'Peanut Butter', fats: 50, per: '100g', calories: 588 },
    ],
  },
  {
    category: 'Meat',
    items: [
      { name: 'Bacon', fats: 42, per: '100g', calories: 541 },
      { name: 'Pork Belly', fats: 53, per: '100g', calories: 518 },
      { name: 'Beef Ribeye', fats: 22, per: '100g', calories: 291 },
      { name: 'Lamb Chop', fats: 22, per: '100g', calories: 258 },
      { name: 'Chicken Thigh', fats: 11, per: '100g', calories: 177 },
    ],
  },
];

export default function FatsFoodsPage() {
  return (
    <>
      <Head>
        <title>Fat Rich Foods - Brand Name</title>
      </Head>
      <div className="fat-page">
        <nav className="fat-nav">
          <span className="fat-logo">BRAND NAME</span>
          <Link href="/dashboard" className="fat-nav-link">Back to Dashboard</Link>
        </nav>

        <header className="fat-header">
          <h1 className="fat-title">Fat Rich Foods</h1>
          <p className="fat-sub">Grams of fat per grams of product</p>
        </header>

        <main className="fat-main">
          {fatsFoods.map((group, gIndex) => (
            <section
              key={group.category}
              className="fat-group"
              style={{ animationDelay: `${gIndex * 100}ms` }}
            >
              <h2 className="fat-cat-title">{group.category}</h2>
              <div className="fat-grid">
                {group.items.map((item) => (
                  <div key={item.name} className="fat-card">
                    <div className="fat-top">
                      <h3 className="fat-name">{item.name}</h3>
                      <span className="fat-badge">{item.fats}g</span>
                    </div>
                    <div className="fat-bottom">
                      <span>per {item.per}</span>
                      <span>{item.calories} cal</span>
                    </div>
                    <div className="fat-bar">
                      <div
                        className="fat-fill"
                        style={{ width: `${Math.min((item.fats / 100) * 100, 100)}%` }}
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