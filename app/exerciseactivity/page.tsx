"use client"
import Head from 'next/head';
import Link from 'next/link';
import './exercise.css';
import { useState , useEffect } from 'react';

export default function ExerciseActivityPage() {
  const [act , setact] = useState<string>("")
   const handleactClick = (value: string) => {
      setact(value);
    }
  
    useEffect(() => {
      const saved = localStorage.getItem('userform');
      if (saved){
        const parsed = JSON.parse(saved);
        if(parsed.activity !== undefined){
         console.log(parsed.activity);
        }
      }
  
     
    },[])
  
  
    const existing = localStorage.getItem('userform');
    const formData = existing ? JSON.parse(existing) : {};
    formData.activity = act;
    localStorage.setItem("userform", JSON.stringify(formData));

  return (
    <>
      <Head>
        <title>Exercise Activity - TRACK MY FITNESS</title>
      </Head>
      <div className="ex-page">
        <h2 className="ex-logo">TRACK MY FITNESS</h2>
        <h1 className="ex-title">exercise activity</h1>
        <div className="ex-list">
              <Link href="/main" className="ex-btn" onClick={() => handleactClick("weekly 2 - 3 times")}>
            weekly 2 - 3 times
          </Link>
          <Link href="/main" className="ex-btn" onClick={() => handleactClick("weekly 3-4 times")}>
            weekly 3-4 times
          </Link>
        
          <Link href="/main" className="ex-btn" onClick={() => handleactClick("6 days a week")}>
            6 days a week
          </Link>
          <Link href="/main" className="ex-btn" onClick={() => handleactClick("No physical activity")}>
            no physical activity
          </Link>
         
        </div>
      </div>
    </>
  );
}