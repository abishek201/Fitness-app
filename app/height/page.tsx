"use client";
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import './height.css';

export default function HeightPage() {
  const [height, setHeight] = useState(65);
  const [unit, setUnit] = useState('cms');

  return (
    <>
      <Head>
        <title>Height - Brand Name</title>
      </Head>
      <div className="ht-page">
        <h2 className="ht-logo">BRAND NAME</h2>
        <h1 className="ht-title">what is your current height</h1>
        <div className="ht-display">
          <span className="ht-number">{height}</span>
          <span className="ht-unit">{unit}</span>
        </div>
        <input
          type="range"
          min="100"
          max="250"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="ht-slider"
        />
        <div className="ht-units">
          <button
            className={unit === 'cms' ? 'ht-unit-btn active' : 'ht-unit-btn'}
            onClick={() => setUnit('cms')}
          >
            cms
          </button>
          <button
            className={unit === 'ft' ? 'ht-unit-btn active' : 'ht-unit-btn'}
            onClick={() => setUnit('ft')}
          >
            ft
          </button>
        </div>
        <Link href="/main" className="ht-next">submit</Link>
      </div>
    </>
  );
}
