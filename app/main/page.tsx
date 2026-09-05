"use client"
import Head from 'next/head';
import './main.css';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
const [ data , setdata] = useState({})
    useEffect(() => {
    const saved = localStorage.getItem('userform');
    if (saved){
      const userdata = JSON.parse(saved);
      if(userdata !== undefined){
        setdata(userdata)
      }
    }
    
   }, [])


   const BMR = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
   let dailyCal = 0;
   if(data.activity === "weekly 2 - 3 times"){
     dailyCal = Math.round(BMR * 1.375);
   }else if(data.activity === "weekly 3-4 times"){
    dailyCal = Math.round(BMR * 1.55);
   }else if(data.activity === "6 days a week"){
     dailyCal = Math.round(BMR * 1.725);
   }else if(data.activity === "No physical activity")
    {
     dailyCal = Math.round(BMR * 1.2);
   }

   let protien = 0;
   let carbs = 0;
   let fats = 0;
   if(data.goal === "weight gain"){
    protien = Math.round(data.weight * 1.6);
    carbs = Math.round((dailyCal * 0.5) / 4);
    fats = Math.round((dailyCal * 0.3) / 9);
   }else if(data.goal === "weight loss"){
    protien = Math.round(data.weight * 1.8);
    carbs = Math.round((dailyCal * 0.4) / 4);
    fats = Math.round((dailyCal * 0.3) / 9);
   }else{
    protien = Math.round(data.weight * 2.0);
    carbs = Math.round((dailyCal * 0.4) / 4);
    fats = Math.round((dailyCal * 0.3) / 9);
   }

const fatmass = (data.weight)*(data.fat/100);
const leanmuscle = (data.weight) - fatmass;
   


  return (
    <>
      <Head>
        <title>Dashboard - Brand Name</title>
      </Head>
      <div className="dash-page">
        <nav className="dash-nav">
          <span className="dash-logo">TRACK MY FITNESS</span>
          <div className="dash-nav-links">
            <a href="/exerciseplanner">exercise planner</a>
            <a href="#">about us</a>
          </div>
        </nav>

        <main className="dash-main">
          <section className="dash-section">
            <h2 className="dash-section-title">CLIENT DETAILS</h2>
            <div className="dash-details">
              <div className="detail-row"><span>user name</span><strong>abishek</strong></div>
              <div className="detail-row"><span>age</span><strong>{data.age}</strong></div>
              <div className="detail-row"><span>height</span><strong>{data.height}</strong></div>
              <div className="detail-row"><span>weight</span><strong>{data.weight}</strong></div>
              <div className="detail-row"><span>body fat</span><strong>{data.fat}</strong></div>
            </div>
          </section>

         <section className="dash-section">
  <h2 className="dash-section-title">CLIENTS CALCULATED RESULTS</h2>
  <div className="dash-results">
    
    {/* Maintenance calories always shown */}
    <div className="result-card">
      <span className="result-number">{Math.round(dailyCal)}</span>
      <span className="result-label">DAILY MAINTENANCE CALORIES</span>
    </div>

    {/* Weight Gain: +500 */}
    {data.goal === 'weight gain' && (
      <div className="result-card highlight">
        <span className="result-number animate-num">{Math.round(dailyCal + 500)}</span>
        <span className="result-label">DAILY CALORIE REQUIREMENT FOR WEIGHT GAIN</span>
      </div>
    )}

    {/* Weight Loss: -300 */}
    {data.goal === 'weight loss' && (
      <div className="result-card highlight">
        <span className="result-number animate-num">{Math.round(dailyCal - 300)}</span>
        <span className="result-label">DAILY CALORIE REQUIREMENT FOR WEIGHT LOSS</span>
      </div>
    )}

    {/* Fat Loss: -300 */}
    {data.goal === 'fat loss' && (
      <div className="result-card highlight">
        <span className="result-number animate-num">{Math.round(dailyCal - 300)}</span>
        <span className="result-label">DAILY CALORIE REQUIREMENT FOR FAT LOSS</span>
      </div>
    )}

    {/* Lean Body: slight deficit */}
    {data.goal === 'lean body' && (
      <div className="result-card highlight">
        <span className="result-number">{Math.round(dailyCal - 200)}</span>
        <span className="result-label">DAILY CALORIE REQUIREMENT FOR LEAN BODY</span>
      </div>
    )}

  </div>
</section>

          <section className="dash-section">
            <h2 className="dash-section-title">MACROS FOR DAILY INTAKE</h2>
            <div className="dash-macros">
              <div className="macro-item"><span>Carbohydrates</span><strong>{carbs}g</strong></div>
              <div className="macro-item"><span>Protein</span><strong>{protien}g</strong></div>
              <div className="macro-item"><span>Fats</span><strong>{fats}g</strong></div>
            </div>
          </section>

          <section className="dash-section">
            <h2 className="dash-section-title">STEPS TO COMPLETE DAILY</h2>
            <div className="dash-steps">
              <span className="steps-number">2000</span>
            </div>
          </section>

          <section className="dash-section">
            <h2 className="dash-section-title">MUSCLE AND FAT RESULT</h2>
            <div className="dash-control">
              <div className="control-item up">
                <span>LEAN MUSCLE MASS</span>
                <strong>{leanmuscle.toFixed(1)} kg</strong>
              </div>
              <div className="control-item down">
                <span> BODY FAT MASS</span>
                <strong>{fatmass.toFixed(1)} kg</strong>
              </div>
            </div>
          </section>

          
        </main>
      </div>
    </>
  );
}
