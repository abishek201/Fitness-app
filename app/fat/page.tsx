"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function fat() {
  const [fat, setFat] = useState<number>();

  useEffect(() => {
    const saved = localStorage.getItem("userForm");
    if (saved) {
      const data = JSON.parse(saved);
      if (data.fat !== undefined) {
        setFat(data.fat);
      }
    }
  }, []);

  const handleSubmit = (value: number) => {
    setFat(value);

    const existing = localStorage.getItem("userForm");
    const formData = existing ? JSON.parse(existing) : {};
    formData.fat = value === "" ? "" : Number(value);
    localStorage.setItem("userForm", JSON.stringify(formData));
  };

  return (
    <>
      <div className="brand-layout">
        <h1>BRAND NAME</h1>
      </div>
      <div className="center-cont">
        <h2>What is your current body fat percentage % </h2>
        <input
          className="input-field"
          type="number"
          placeholder="%"
          onChange={(e) => handleSubmit(Number(e.target.value))}
        ></input>
        <br></br>
        <div className="submit-btn">
          <Link href="/exerciseactivity">
            <button type="submit">submit</button>
          </Link>
        </div>
      </div>
    </>
  );
}
