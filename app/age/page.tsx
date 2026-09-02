"use client"

import Link from "next/link";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { stringify } from "querystring";

export default function Age() {
  const [age, setAge] = useState<number>();

    useEffect(() => {
    const saved = localStorage.getItem('userForm');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.age !== undefined) {
        setAge(Number(data.age));
      }
    }
  }, []);

  function handleSubmit(value:number) {

    setAge(value);
  
   const existing = localStorage.getItem('userForm');
    const formData = existing ? JSON.parse(existing) : {};

     
    formData.age = value === '' ? '' : Number(value); 
    
    localStorage.setItem('userForm', JSON.stringify(formData)); 
  }
 
  

    return (
        <>
       <div className="brand-layout">
        <h1>BRAND NAME</h1>
      </div>
      <div className="center-cont">
        <h2>What is your current age</h2>
          <input  className="input-field" type="number"  value={age}  placeholder="age in years"
         onChange={(e) => handleSubmit(Number(e.target.value))} ></input>
          <div className="submit-btn">
            <Link href="/height"><button>Submit</button></Link>
          </div>
      </div>
        </>
    )
}