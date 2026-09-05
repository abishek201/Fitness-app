"use client"
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './exercise.css';

const STORAGE_KEY = 'userform';

const workoutPlans = {
  'weight gain': {
    title: 'Strength & Mass Builder',
    subtitle: 'Focus on compound lifts and progressive overload',
    days: [
      {
        day: 'Monday',
        focus: 'Chest & Triceps',
        exercises: [
          { name: 'Bench Press', sets: '4', reps: '6-8' },
          { name: 'Incline Dumbbell Press', sets: '3', reps: '8-10' },
          { name: 'Chest Flys', sets: '3', reps: '10-12' },
          { name: 'Tricep Dips', sets: '3', reps: '8-10' },
          { name: 'Skull Crushers', sets: '3', reps: '10-12' },
        ],
      },
      {
        day: 'Tuesday',
        focus: 'Back & Biceps',
        exercises: [
          { name: 'Deadlift', sets: '4', reps: '5-6' },
          { name: 'Pull-Ups', sets: '3', reps: '6-10' },
          { name: 'Barbell Rows', sets: '3', reps: '8-10' },
          { name: 'Barbell Curls', sets: '3', reps: '8-10' },
          { name: 'Hammer Curls', sets: '3', reps: '10-12' },
        ],
      },
      {
        day: 'Wednesday',
        focus: 'Rest Day',
        exercises: [{ name: 'Light walking or stretching', sets: '-', reps: '20 min' }],
      },
      {
        day: 'Thursday',
        focus: 'Legs & Core',
        exercises: [
          { name: 'Squats', sets: '4', reps: '6-8' },
          { name: 'Leg Press', sets: '3', reps: '10-12' },
          { name: 'Romanian Deadlift', sets: '3', reps: '8-10' },
          { name: 'Calf Raises', sets: '4', reps: '12-15' },
          { name: 'Plank', sets: '3', reps: '60 sec' },
        ],
      },
      {
        day: 'Friday',
        focus: 'Shoulders & Arms',
        exercises: [
          { name: 'Overhead Press', sets: '4', reps: '6-8' },
          { name: 'Lateral Raises', sets: '3', reps: '12-15' },
          { name: 'Rear Delt Flys', sets: '3', reps: '12-15' },
          { name: 'Close-Grip Bench', sets: '3', reps: '8-10' },
          { name: 'Preacher Curls', sets: '3', reps: '10-12' },
        ],
      },
      {
        day: 'Saturday',
        focus: 'Full Body Power',
        exercises: [
          { name: 'Clean & Press', sets: '3', reps: '5-6' },
          { name: 'Front Squats', sets: '3', reps: '6-8' },
          { name: 'Weighted Pull-Ups', sets: '3', reps: '5-8' },
          { name: 'Farmer Walks', sets: '3', reps: '40m' },
        ],
      },
      {
        day: 'Sunday',
        focus: 'Rest & Recovery',
        exercises: [{ name: 'Foam rolling, stretching, sleep 8+ hrs', sets: '-', reps: '-' }],
      },
    ],
  },
  'weight loss': {
    title: 'Cardio & Strength Burn',
    subtitle: 'High calorie burn with metabolic resistance training',
    days: [
      {
        day: 'Monday',
        focus: 'HIIT Cardio + Upper',
        exercises: [
          { name: 'Treadmill Sprints', sets: '8', reps: '30 sec on / 30 off' },
          { name: 'Push-Ups', sets: '3', reps: '15-20' },
          { name: 'Dumbbell Rows', sets: '3', reps: '12-15' },
          { name: 'Shoulder Press', sets: '3', reps: '12-15' },
          { name: 'Battle Ropes', sets: '3', reps: '30 sec' },
        ],
      },
      {
        day: 'Tuesday',
        focus: 'Steady State Cardio',
        exercises: [
          { name: 'Cycling or Swimming', sets: '-', reps: '45 min' },
          { name: 'Core Circuit', sets: '3', reps: '15 min' },
        ],
      },
      {
        day: 'Wednesday',
        focus: 'Lower Body Circuit',
        exercises: [
          { name: 'Jump Squats', sets: '3', reps: '15' },
          { name: 'Lunges', sets: '3', reps: '20 total' },
          { name: 'Kettlebell Swings', sets: '3', reps: '20' },
          { name: 'Box Jumps', sets: '3', reps: '12' },
          { name: 'Wall Sit', sets: '3', reps: '45 sec' },
        ],
      },
      {
        day: 'Thursday',
        focus: 'Active Recovery',
        exercises: [
          { name: 'Brisk Walking', sets: '-', reps: '60 min' },
          { name: 'Yoga / Stretching', sets: '-', reps: '20 min' },
        ],
      },
      {
        day: 'Friday',
        focus: 'Full Body Metabolic',
        exercises: [
          { name: 'Burpees', sets: '3', reps: '12' },
          { name: 'Mountain Climbers', sets: '3', reps: '30 sec' },
          { name: 'Goblet Squats', sets: '3', reps: '15' },
          { name: 'Renegade Rows', sets: '3', reps: '12 total' },
          { name: 'Jump Rope', sets: '5', reps: '1 min' },
        ],
      },
      {
        day: 'Saturday',
        focus: 'Long Cardio Session',
        exercises: [
          { name: 'Running / Jogging', sets: '-', reps: '60 min' },
          { name: 'Cool Down Walk', sets: '-', reps: '10 min' },
        ],
      },
      {
        day: 'Sunday',
        focus: 'Rest',
        exercises: [{ name: 'Complete rest or light stretching', sets: '-', reps: '-' }],
      },
    ],
  },
  'fat loss': {
    title: 'High Intensity Shred',
    subtitle: 'Maximize calorie burn and preserve lean muscle',
    days: [
      {
        day: 'Monday',
        focus: 'Upper Body Supersets',
        exercises: [
          { name: 'Bench Press', sets: '4', reps: '10-12' },
          { name: 'Bent Over Row', sets: '4', reps: '10-12' },
          { name: 'Incline Press', sets: '3', reps: '12-15' },
          { name: 'Lat Pulldown', sets: '3', reps: '12-15' },
          { name: 'Cable Crossover', sets: '3', reps: '15' },
        ],
      },
      {
        day: 'Tuesday',
        focus: 'HIIT Cardio',
        exercises: [
          { name: 'Sprint Intervals', sets: '10', reps: '30 sec' },
          { name: 'Jumping Jacks', sets: '3', reps: '45 sec' },
          { name: 'High Knees', sets: '3', reps: '30 sec' },
          { name: 'Box Jumps', sets: '3', reps: '15' },
        ],
      },
      {
        day: 'Wednesday',
        focus: 'Lower Body & Glutes',
        exercises: [
          { name: 'Goblet Squats', sets: '4', reps: '12-15' },
          { name: 'Romanian Deadlift', sets: '3', reps: '12' },
          { name: 'Walking Lunges', sets: '3', reps: '20 total' },
          { name: 'Leg Extensions', sets: '3', reps: '15' },
          { name: 'Hip Thrusts', sets: '3', reps: '15' },
        ],
      },
      {
        day: 'Thursday',
        focus: 'Cardio & Core',
        exercises: [
          { name: 'Rowing Machine', sets: '-', reps: '30 min' },
          { name: 'Bicycle Crunches', sets: '3', reps: '20' },
          { name: 'Leg Raises', sets: '3', reps: '15' },
          { name: 'Russian Twists', sets: '3', reps: '30' },
        ],
      },
      {
        day: 'Friday',
        focus: 'Full Body Circuit',
        exercises: [
          { name: 'Thrusters', sets: '3', reps: '12' },
          { name: 'Kettlebell Swings', sets: '3', reps: '20' },
          { name: 'Push Press', sets: '3', reps: '10' },
          { name: 'Row to Curl', sets: '3', reps: '12' },
          { name: 'Plank to Push-Up', sets: '3', reps: '10' },
        ],
      },
      {
        day: 'Saturday',
        focus: 'Steady Cardio',
        exercises: [
          { name: 'Incline Walk', sets: '-', reps: '45 min' },
          { name: 'Stretching', sets: '-', reps: '15 min' },
        ],
      },
      {
        day: 'Sunday',
        focus: 'Rest',
        exercises: [{ name: 'Rest, hydrate, meal prep', sets: '-', reps: '-' }],
      },
    ],
  },
  'lean body': {
    title: 'Toning & Definition',
    subtitle: 'Moderate weights, controlled reps, balanced conditioning',
    days: [
      {
        day: 'Monday',
        focus: 'Push Day',
        exercises: [
          { name: 'Overhead Press', sets: '3', reps: '10-12' },
          { name: 'Incline Bench', sets: '3', reps: '10-12' },
          { name: 'Lateral Raises', sets: '3', reps: '15' },
          { name: 'Tricep Pushdowns', sets: '3', reps: '12-15' },
          { name: 'Cable Flys', sets: '3', reps: '15' },
        ],
      },
      {
        day: 'Tuesday',
        focus: 'Pull Day',
        exercises: [
          { name: 'Lat Pulldowns', sets: '3', reps: '10-12' },
          { name: 'Seated Cable Row', sets: '3', reps: '12' },
          { name: 'Face Pulls', sets: '3', reps: '15' },
          { name: 'Barbell Curls', sets: '3', reps: '10-12' },
          { name: 'Hammer Curls', sets: '3', reps: '12' },
        ],
      },
      {
        day: 'Wednesday',
        focus: 'Cardio & Mobility',
        exercises: [
          { name: 'Light Jog', sets: '-', reps: '30 min' },
          { name: 'Dynamic Stretching', sets: '-', reps: '15 min' },
          { name: 'Foam Rolling', sets: '-', reps: '10 min' },
        ],
      },
      {
        day: 'Thursday',
        focus: 'Legs & Core',
        exercises: [
          { name: 'Front Squats', sets: '3', reps: '10-12' },
          { name: 'Bulgarian Split Squat', sets: '3', reps: '12 each' },
          { name: 'Leg Curls', sets: '3', reps: '12-15' },
          { name: 'Calf Raises', sets: '4', reps: '15-20' },
          { name: 'Hanging Leg Raise', sets: '3', reps: '12' },
        ],
      },
      {
        day: 'Friday',
        focus: 'Upper Body Pump',
        exercises: [
          { name: 'Dumbbell Press', sets: '3', reps: '10-12' },
          { name: 'Cable Rows', sets: '3', reps: '12' },
          { name: 'Lateral Raise Machine', sets: '3', reps: '15' },
          { name: 'Rope Pushdowns', sets: '3', reps: '15' },
          { name: 'Concentration Curls', sets: '3', reps: '12' },
        ],
      },
      {
        day: 'Saturday',
        focus: 'Full Body Conditioning',
        exercises: [
          { name: 'Kettlebell Complex', sets: '3', reps: '8 each' },
          { name: 'Medicine Ball Slams', sets: '3', reps: '12' },
          { name: 'Sled Push', sets: '3', reps: '20m' },
          { name: 'Farmer Carries', sets: '3', reps: '30m' },
        ],
      },
      {
        day: 'Sunday',
        focus: 'Rest & Recovery',
        exercises: [{ name: 'Yoga, stretching, or complete rest', sets: '-', reps: '-' }],
      },
    ],
  },
};

export default function ExercisePlannerPage() {
  const [goal, setGoal] = useState('');
  const [plan, setPlan] = useState('' as any);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.goal) {
        const userGoal = parsed.goal.toLowerCase();
        setGoal(userGoal);
        setPlan(workoutPlans[userGoal] || workoutPlans['lean body']);
      }
    }
  }, []);

  if (!plan) {
    return (
      <div className="ex-page">
        <h2 className="ex-logo">BRAND NAME</h2>
        <p className="ex-loading">Loading your plan...</p>
        <Link href="/goal" className="ex-back">Set Your Goal</Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Exercise Planner - Brand Name</title>
      </Head>
      <div className="ex-page">
        <nav className="ex-nav">
          <span className="ex-logo">BRAND NAME</span>
          <Link href="/main" className="ex-nav-link">Back to Dashboard</Link>
        </nav>

        <header className="ex-header">
          <h1 className="ex-title">{plan.title}</h1>
          <p className="ex-subtitle">{plan.subtitle}</p>
          <span className="ex-goal-badge">Goal: {goal}</span>
        </header>

        <main className="ex-grid">
          {plan.days.map((day, index) => (
            <div
              key={day.day}
              className="ex-day-card"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="ex-day-header">
                <h3>{day.day}</h3>
                <span>{day.focus}</span>
              </div>
              <ul className="ex-list">
                {day.exercises.map((ex, i) => (
                  <li key={i} className="ex-item">
                    <span className="ex-name">{ex.name}</span>
                    <span className="ex-meta">
                      {ex.sets !== '-' && `${ex.sets} sets`}
                      {ex.sets !== '-' && ex.reps !== '-' && ' × '}
                      {ex.reps !== '-' && `${ex.reps}`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </main>
      </div>
    </>
  );
}