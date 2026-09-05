"use client";
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import './height.css';
import { useEffect } from 'react';

export default function HeightPage() {
  const [height, setHeight] = useState(65);
  
   const handleHeightClick = (value: number) => {
        setHeight(value);
      }
    
      useEffect(() => {
        const saved = localStorage.getItem('userform');
        if (saved){
          const parsed = JSON.parse(saved);
          if(parsed.height !== undefined){
            console.log(parsed.height);
          }
        }
    
       
      },[])
      
      useEffect(() => {
        const existing = localStorage.getItem('userform');
        const formData = existing ? JSON.parse(existing) : {};
        formData.height = height;
        localStorage.setItem("userform", JSON.stringify(formData));
      }, [height]);
    
    
      

  return (
    <>
      <Head>
        <title>Height - TRACK MY FITNESS</title>
      </Head>
      <div className="ht-page">
        <h2 className="ht-logo">TRACK MY FITNESS</h2>
        <h1 className="ht-title">what is your current height</h1>
        <div className="ht-display">
          <span className="ht-number">{height}</span>
          <span className="cms">cm</span>
         
        </div>
        <input
          type="range"
          min="100"
          max="250"
          value={height}
          onChange={(e) => handleHeightClick(Number(e.target.value))}
          className="ht-slider" placeholder="Enter your height in cm"
        />
       
          
          
        
        <Link href="/weight" className="ht-next">submit</Link>
      </div>
    </>
  );
}
