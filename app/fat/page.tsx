"use client"
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import './body-fat.css';
import { useEffect } from 'react';
export default function BodyFatPage() {
  const [percent, setPercent] = useState(65);

    const handlepercent = (value: number) => {
        setPercent(value);
      }
    
      useEffect(() => {
        const saved = localStorage.getItem('userform');
        if (saved){
          const parsed = JSON.parse(saved);
          if(parsed.fat !== undefined){
            console.log(parsed.fat);
          }
        }
    
       
      },[])

      useEffect(() => {
        const existing = localStorage.getItem('userform');
        const formData = existing ? JSON.parse(existing) : {};
        formData.fat = percent;
        localStorage.setItem("userform", JSON.stringify(formData));
      }, [percent]);
    
    
      

  return (
    <>
      <Head>
        <title>Body Fat - Brand Name</title>
      </Head>
      <div className="bf-page">
        <h2 className="bf-logo">TRACK MY FITNESS</h2>
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
          onChange={(e) =>handlepercent(Number(e.target.value))}
          className="bf-slider"
        />
        <Link href="/height" className="bf-next">Next</Link>
      </div>
    </>
  );
}