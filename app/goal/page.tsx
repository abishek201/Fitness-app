// pages/goal.js
import Head from 'next/head';
import Link from 'next/link';
import './goal.css';

export default function GoalPage() {
  const goals = ['lean body', 'weight gain', 'fat loss', 'weight loss'];

  return (
    <>
      <Head>
        <title>Body Goal - Brand Name</title>
      </Head>
      <div className="goal-page">
        <h2 className="goal-logo">BRAND NAME</h2>
        <h1 className="goal-title">what is your body goal</h1>
        <div className="goal-list">
          {goals.map((g) => (
            <Link key={g} href="/age" className="goal-btn">
              {g}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
