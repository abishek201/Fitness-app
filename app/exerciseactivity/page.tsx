"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function exerciseactivity() {
    const [ activity , setactivity]= useState<string>();
    useEffect(()=>{
        const saved = localStorage.getItem('userForm');
        if(saved){
            const data = JSON.parse(saved);
            if(data.exerciseactivity !== undefined){
                console.log(data.exerciseactivity)
            }
        }

    },[])


    const handleSubmit = (value: string) => {
        setactivity(value);
    }

   
        const existing = localStorage.getItem("userForm");
        const formData = existing ? JSON.parse(existing) : {};
        formData.exerciseactivity = activity;
        localStorage.setItem("userForm", JSON.stringify(formData));
    

    return (
        <>
        <div className="brand-layout">
        <h1>BRAND NAME</h1>
        </div>
        <div className="center-cont">
            <h2>what is your exercise activity</h2>
            <Link href="/goal">
                <button type="submit" onClick={() => handleSubmit("weakly 2 -3 times")}>
                    weakly 2 -3 times
                </button>
            </Link>
            <br></br>
            <Link href="/goal">
                <button type="submit" onClick={() => handleSubmit("weakly 3 -4 times")}>
                    weakly 3 -4 times
                </button>
            </Link>
            <br></br>
            <Link href="/goal">
                <button type="submit" onClick={() => handleSubmit("6 days a week")}>
                    6 days a week
                </button>
            </Link>
            <br></br>
            <Link href="/goal">
                <button type="submit" onClick={() => handleSubmit("No physical activity")}>
                    No physical activity
                </button>
            </Link>
        </div>

        
        </>
    )
}