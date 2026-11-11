"use client";
import Head from "next/head";
import "./main.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  const [data, setdata] = useState({});
  useEffect(() => {
    const saved = localStorage.getItem("userform");
    if (saved) {
      const userdata = JSON.parse(saved);
      if (userdata !== undefined) {
        setdata(userdata);
      }
    }
  }, []);

  function useCountUp(target: number, duration: number = 1600) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
      if (!target) return;

      let startTime: number | null = null;
      let animationFrame: number;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setDisplay(Math.round(target * progress));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        }
      };

      animationFrame = requestAnimationFrame(step);

      // Cleanup when component unmounts
      return () => cancelAnimationFrame(animationFrame);
    }, [target, duration]);

    return display;
  }
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userform");
    localStorage.removeItem("lastSyncedEmail");

    router.push("/");
  };

  const BMR = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
  const BMI = data.weight / ((data.height / 100) * (data.height / 100));
  const fatpercentage =
    Math.round(1.2 * BMI) + Math.round(0.23 * data.age) - 16.2;

  let dailyCal = 0;
  if (data.activity === "weekly 2 - 3 times") {
    dailyCal = Math.round(BMR * 1.375);
  } else if (data.activity === "weekly 3-4 times") {
    dailyCal = Math.round(BMR * 1.55);
  } else if (data.activity === "6 days a week") {
    dailyCal = Math.round(BMR * 1.725);
  } else if (data.activity === "No physical activity") {
    dailyCal = Math.round(BMR * 1.2);
  }

  let protien = 0;
  let carbs = 0;
  let fats = 0;
  if (data.goal === "weight gain") {
    protien = Math.round(data.weight * 1.6);
    carbs = Math.round((dailyCal * 0.5) / 4);
    fats = Math.round((dailyCal * 0.3) / 9);
  } else if (data.goal === "weight loss") {
    protien = Math.round(data.weight * 1.8);
    carbs = Math.round((dailyCal * 0.4) / 4);
    fats = Math.round((dailyCal * 0.3) / 9);
  } else {
    protien = Math.round(data.weight * 2.0);
    carbs = Math.round((dailyCal * 0.4) / 4);
    fats = Math.round((dailyCal * 0.3) / 9);
  }

  const fatmass = data.weight * (data.fat / 100);
  const leanmuscle = data.weight - fatmass;
  let steps = 0;
  if (data.goal === "weight gain") {
    steps = 5000;
  } else if (data.goal === "weight loss") {
    steps = 10000;
  } else if (data.goal === "lean body") {
    steps = 8000;
  } else if (data.goal === "fat loss") {
    steps = 12000;
  }

  // Animated versions of your calculated values
  const animatedCal = useCountUp(Math.round(dailyCal));
  const animatedProtein = useCountUp(protien);
  const animatedCarbs = useCountUp(carbs);
  const animatedFats = useCountUp(fats);
  const animatedSteps = useCountUp(steps);
  const animatedage = useCountUp(data.age);
  const animatedheight = useCountUp(data.height);
  const animatedweight = useCountUp(data.weight);
  const animatedname = useCountUp(data.name);

  useEffect(() => {
    const existing = localStorage.getItem("userform");
    const formData = existing ? JSON.parse(existing) : {};
    formData.caloriesTarget = Math.round(dailyCal);

    formData.caloriesTarget = Math.round(dailyCal);
    formData.proteinTarget = protien;
    formData.carbsTarget = carbs;
    formData.fatsTarget = fats;
    localStorage.setItem("userform", JSON.stringify(formData));
  }, [protien, carbs, fats, dailyCal]);

  useEffect(() => {
    const saved = localStorage.getItem("userform");
    if (saved) {
      const userdata = JSON.parse(saved);
      if (userdata !== undefined) {
        setdata(userdata);
      }
    }
  }, []);

  // Sync to MongoDB only after data & calculations are ready
  useEffect(() => {
    if (data && data.weight && data.email) {
      const lastSyncedEmail = localStorage.getItem("lastSyncedEmail");

      // Build payload including the newly calculated targets
      const payload = {
        ...data,
        caloriesTarget: Math.round(dailyCal),
        proteinTarget: protien,
        carbsTarget: carbs,
        fatsTarget: fats,
      };

      // Only sync if the email hasn't been synced yet
      if (data.email !== lastSyncedEmail) {
        fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((res) => res.json())
          .then((resData) => {
            console.log("Database sync successful:", resData);
            localStorage.setItem("lastSyncedEmail", data.email);
          })
          .catch((err) => console.error("Database sync failed:", err));
      }
    }
  }, [data, dailyCal, protien, carbs, fats]);

  return (
    <>
      <Head>
        <title>Dashboard - TRACK MY FITNESS</title>
      </Head>
      <div className="dash-page">
        <nav className="dash-nav">
          <span className="dash-logo">TRACK MY FITNESS</span>
          <div className="dash-nav-links">
            <a href="/exerciseplanner">exercise planner</a>
            <a href="/mealplanner">meal planner</a>
            <a href="/foodscanner">food scanner</a>
          </div>
          <button onClick={handleLogout} className="logout-button">
            🚪 Logout
          </button>
        </nav>

        <main className="dash-main">
          <section className="dash-section">
            <h2 className="dash-section-title">CLIENT DETAILS</h2>
            <div className="dash-details">
              <div className="detail-row">
                <span>user name</span>
                <strong>{data.name}</strong>
              </div>
              <div className="detail-row">
                <span>age</span>
                <strong>{animatedage}</strong>
              </div>
              <div className="detail-row">
                <span>height in Cms</span>
                <strong>{animatedheight}</strong>
              </div>
              <div className="detail-row">
                <span>weight in kg</span>
                <strong>{animatedweight}</strong>
              </div>
              <div className="detail-row">
                <span>allergies from</span>
                <strong  className="detail-row-txt">
                  {data.allergens && data.allergens.length > 0
                    ? data.allergens.map((item, i) => (
                        <span key={i} >
                          {item}{i !== data.allergens.length - 1 ? ", " : ""}
                        </span>
                      ))
                    : "None"}
                </strong>
              </div>
            </div>
          </section>

          <section className="dash-section">
            <h2 className="dash-section-title">CLIENTS CALCULATED RESULTS</h2>
            <div className="dash-results">
              {/* Maintenance calories always shown */}
              <div className="result-card">
                <span className="result-number">
                  {Math.round(animatedCal)}
                  <Image src="/cal.svg" alt="Calories" width={20} height={20} />
                </span>
                <span className="result-label">DAILY MAINTENANCE CALORIES</span>
              </div>

              {/* Weight Gain: +500 */}
              {data.goal === "weight gain" && (
                <div className="result-card highlight">
                  <span className="result-number animate-num">
                    {Math.round(animatedCal + 500)}
                    <Image
                      src="/cal.svg"
                      alt="Calories"
                      width={20}
                      height={20}
                    />
                  </span>
                  <span className="result-label">
                    DAILY CALORIE REQUIREMENT FOR WEIGHT GAIN
                  </span>
                </div>
              )}

              {/* Weight Loss: -300 */}
              {data.goal === "weight loss" && (
                <div className="result-card highlight">
                  <span className="result-number animate-num">
                    {Math.round(animatedCal - 300)}
                    <Image
                      src="/cal.svg"
                      alt="Calories"
                      width={20}
                      height={20}
                    />
                  </span>
                  <span className="result-label">
                    DAILY CALORIE REQUIREMENT FOR WEIGHT LOSS
                  </span>
                </div>
              )}

              {/* Fat Loss: -300 */}
              {data.goal === "fat loss" && (
                <div className="result-card highlight">
                  <span className="result-number animate-num">
                    {Math.round(animatedCal - 300)}
                    <Image
                      src="/cal.svg"
                      alt="Calories"
                      width={20}
                      height={20}
                    />
                  </span>
                  <span className="result-label">
                    DAILY CALORIE REQUIREMENT FOR FAT LOSS
                  </span>
                </div>
              )}

              {/* Lean Body: slight deficit */}
              {data.goal === "lean body" && (
                <div className="result-card highlight">
                  <span className="result-number">
                    {Math.round(animatedCal - 200)}
                    <Image
                      src="/cal.svg"
                      alt="Calories"
                      width={30}
                      height={25}
                    />
                  </span>
                  <span className="result-label">
                    DAILY CALORIE REQUIREMENT FOR LEAN BODY
                  </span>
                </div>
              )}
            </div>
          </section>

          <section className="dash-section">
            <h2 className="dash-section-title">MACROS FOR DAILY INTAKE</h2>
            <div className="dash-macros">
              <Link href="/carbs">
                <div className="macro-item">
                  <span>Carbohydrates</span>
                  <strong>{animatedCarbs}g</strong>
                </div>
              </Link>
              <Link href="/protein">
                <div className="macro-item">
                  <span>Protein</span>
                  <strong>{animatedProtein}g</strong>
                </div>
              </Link>
              <Link href="/fats">
                <div className="macro-item">
                  <span>Fats</span>
                  <strong>{animatedFats}g</strong>
                </div>
              </Link>
            </div>
          </section>

          <section className="dash-section">
            <h2 className="dash-section-title">
              STEPS TO COMPLETE DAILY FOR {data.goal}
            </h2>
            <div className="dash-steps">
              <span className="steps-number">
                {animatedSteps}
                <Image src="/steps.svg" alt="Steps" width={50} height={25} />
              </span>
            </div>
          </section>

          {/* <section className="dash-section">
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
          </section> */}
        </main>
      </div>
    </>
  );
}
