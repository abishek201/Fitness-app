"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function height() {
  const [height, setHeight] = useState<number>();

   useEffect(() => {
    const saved = localStorage.getItem('userForm');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.height !== undefined) {
        setHeight(data.height);
      }
    }
  }, []);

  function handleSubmit(value: number) {
    setHeight(value);

    const existing = localStorage.getItem("userForm");
    const formData = existing ? JSON.parse(existing) : {};
     formData.height = value === '' ? '' : Number(value); 

     localStorage.setItem('userForm', JSON.stringify(formData)); 
    
   

  

  }

  return (
    <>
      <div className="brand-layout">
        <h1>BRAND NAME</h1>
      </div>
      <div className="center-cont">
        <h2>What is your current height</h2>
        <input
          className="input-field"
          type="number"
          value={height}
          placeholder="height in cms"
          onChange={(e) => handleSubmit(Number(e.target.value))}
        ></input>
        <br></br>
        <div className="submit-btn">
          <Link href="/weight">
            <button type="submit">submit</button>
          </Link>
        </div>
      </div>
    </>
  );
}
