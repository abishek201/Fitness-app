"use client"
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import './age.css';
import { useEffect } from 'react';

export default function AgePage() {
  const [age, setAge] = useState<number>(20);
  const handleageClick = (value: number) => {
      setAge(value);
    }
  
    useEffect(() => {
      const saved = localStorage.getItem('userform');
      if (saved){
        const parsed = JSON.parse(saved);
        if(parsed.age !== undefined){
          console.log(parsed.age);
        }
      }
  
     
    },[])


   useEffect(() => {
    const existing = localStorage.getItem('userform');
    const formData = existing ? JSON.parse(existing) : {};
    formData.age = age;
    localStorage.setItem("userform", JSON.stringify(formData));
  }, [age]);
  
  
   
  return (
    <>
      <Head>
        <title>Age - TRACK MY FITNESS</title>
      </Head>
      <div className="age-page">
        <h2 className="age-logo">TRACK MY FITNESS</h2>
        <h1 className="age-title">what is your age</h1>
        <div className="age-input-wrap">
          <input
            type="number"
            value={age}
            onChange={(e) => handleageClick(Number(e.target.value))}
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