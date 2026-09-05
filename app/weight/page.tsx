"use client";
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import './weight.css';

const STORAGE_KEY = 'userform';

export default function WeightPage() {
  const [weight, setWeight] = useState(65);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.weight !== undefined) setWeight(parsed.weight);
    }
  }, []);

  const handleSave = () => {
    const existing = localStorage.getItem(STORAGE_KEY);
    const formData = existing ? JSON.parse(existing) : {};
    formData.weight = Number(weight);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  };

  return (
    <>
      <Head>
        <title>Weight - TRACK MY FITNESS</title>
      </Head>
      <div className="wt-page">
        <h2 className="wt-logo">TRACK MY FITNESS</h2>
        <h1 className="wt-title">what is your current weight</h1>
        <div className="wt-display">
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="wt-input"
            min="1"
            max="300"
          />
          <span className="wt-unit">kg</span>
        </div>
        <Link href="/exerciseactivity" className="wt-submit" onClick={handleSave}>
          submit
        </Link>
      </div>
    </>
  );
}