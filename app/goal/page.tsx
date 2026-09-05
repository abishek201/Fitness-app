"use client"
import Head from 'next/head';
import Link from 'next/link';
import './goal.css';
import { useEffect, useState } from 'react';

export default function GoalPage() {
  const goals = ['lean body', 'weight gain', 'fat loss', 'weight loss'];

  const [goal, setGoal] = useState<string>("");

  const handleGoalClick = (value: string) => {
    setGoal(value);
  }

  useEffect(() => {
    const saved = localStorage.getItem('userform');
    if (saved){
      const parsed = JSON.parse(saved);
      if(parsed.goal !== undefined){
       console.log(parsed.goal);
      }
    }

   
  },[])


  const existing = localStorage.getItem('userform');
  const formData = existing ? JSON.parse(existing) : {};
  formData.goal = goal;
  localStorage.setItem("userform", JSON.stringify(formData));
  return (
    <>
      <Head>
        <title>Body Goal - TRACK MY FITNESS</title>
      </Head>
      <div className="goal-page">
        <h2 className="goal-logo">TRACK MY FITNESS</h2>
        <h1 className="goal-title">what is your body goal</h1>
        <div className="goal-list">
          <Link href="/age" className="goal-btn" onClick={() => handleGoalClick("lean body")}>
            lean body
          </Link>
          <Link href="/age" className="goal-btn" onClick={() => handleGoalClick("weight gain")}>
            weight gain
          </Link>
          <Link href="/age" className="goal-btn" onClick={() => handleGoalClick("fat loss")}>
            fat loss
          </Link>
          <Link href="/age" className="goal-btn" onClick={() => handleGoalClick("weight loss")}>
            weight loss
          </Link>
        </div>
      </div>
    </>
  );
}
