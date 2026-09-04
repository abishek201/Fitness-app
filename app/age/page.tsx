"use client"
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import './age.css';

export default function AgePage() {
  const [age, setAge] = useState('20');

  return (
    <>
      <Head>
        <title>Age - Brand Name</title>
      </Head>
      <div className="age-page">
        <h2 className="age-logo">BRAND NAME</h2>
        <h1 className="age-title">what is your age</h1>
        <div className="age-input-wrap">
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="age-input"
            min="1"
            max="120"
          />
        </div>
        <Link href="/fat" className="age-submit">submit</Link>
      </div>
    </>
  );
}