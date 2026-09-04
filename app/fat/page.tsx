"use client"
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import './body-fat.css';

export default function BodyFatPage() {
  const [percent, setPercent] = useState(65);

  return (
    <>
      <Head>
        <title>Body Fat - Brand Name</title>
      </Head>
      <div className="bf-page">
        <h2 className="bf-logo">BRAND NAME</h2>
        <h1 className="bf-title">body fat percentage</h1>
        <div className="bf-display">
          <span className="bf-number">{percent}</span>
          <span className="bf-unit">%</span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
          className="bf-slider"
        />
        <Link href="/height" className="bf-next">Next</Link>
      </div>
    </>
  );
}