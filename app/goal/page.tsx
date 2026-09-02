"use client";

import { useEffect, useState } from "react";

export default function goal() {
  const [goal, setgoal] = useState<string>();
  useEffect(() => {
    const saved = localStorage.getItem("userForm");
    if (saved) {
      const data = JSON.parse(saved);
      if (data.goal !== undefined) {
        setgoal(data.goal);
      }
    }
  }, []);

  const handleSubmit = (value: string) => {
    setgoal(value);
   
  };

  const existing = localStorage.getItem("userForm");
  const formData = existing ? JSON.parse(existing) : {};
  formData.goal = goal;
  localStorage.setItem("userForm", JSON.stringify(formData));

  return (
    <>
      <div className="brand-layout">
        <h1>BRAND NAME</h1>
      </div>
      <div className="center-cont">
        <h2>what is your body goal</h2>
        <button type="submit" onClick={() => handleSubmit("lean body")}>
          lean body
        </button>
        <br></br>
        <button type="submit" onClick={() => handleSubmit("weight gain")}>
          weight gain
        </button>
        <br></br>
        <button type="submit" onClick={() => handleSubmit("fat loss")}>
          fat loss
        </button>
        <br></br>
      </div>
    </>
  );
}
