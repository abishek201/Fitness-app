"use client";

import Link from "next/link";
import {useEffect, useState } from "react";

export default function weight() {


  const [weight, setWeight] = useState<number>();

  useEffect(() => {
     const saved = localStorage.getItem('userForm');
    if(saved){
      const data = JSON.parse(saved);
      if(data.weight !== undefined){
        setWeight(data.weight);
      
    }
  }
   
  },[]);


    

   
  
  

  const handleSubmit = (value: number) => {

    setWeight(value);
    

    const existing = localStorage.getItem("userForm");
    const formData = existing ? JSON.parse(existing) : {};
    formData.weight = value === '' ? '' : Number(value); 
    localStorage.setItem("userForm", JSON.stringify(formData));
  
  }

    return (
        <>
       <div className="brand-layout">
        <h1>BRAND NAME</h1>
      </div>
      <div className="center-cont">
        <h2>What is your current weight</h2>
          <input  className="input-field" type="number" placeholder="weight in kg"  onChange={(e) => handleSubmit(Number(e.target.value))}></input>
          <br></br>
           <Link href="/fat"><button type="submit">submit</button></Link>
         
      </div>
      
        </>
    )
}