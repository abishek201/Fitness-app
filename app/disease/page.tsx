"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./disease.css";

export default function DiseaseForm() {
  const [hasDisease, setHasDisease] = useState(""); // "", "yes", or "no"
  const [disease, setDisease] = useState("");

  // Load saved data from localStorage on first render
  useState(() => {
    const saved = localStorage.getItem("userform");
    if (saved) {
      const data = JSON.parse(saved);
      if (data.diseases) {
        setHasDisease("yes");
        setDisease(data.diseases);
      } else if (data.hasDisease === "no") {
        setHasDisease("no");
      }
    }
  });

  // Save to localStorage whenever hasDisease or disease changes
  useEffect(() => {
    // Read the existing userform so we keep the allergens data
    const saved = localStorage.getItem("userform");
    const data = saved ? JSON.parse(saved) : {};

    if (hasDisease === "no") {
      data.diseases = "";
      data.hasDisease = "no";
    } else if (hasDisease === "yes") {
      data.diseases = disease;
      data.hasDisease = "yes";
    }

    localStorage.setItem("userform", JSON.stringify(data));
  }, [hasDisease, disease]);

  return (
    <div className="page">
      <div className="card">
        <h1 className="brand">track my fitness</h1>
        <h2 className="subtitle">Common Diseases</h2>

        <p className="question">Do you have any common disease?</p>

        <div className="options">
          <button
            className={hasDisease === "yes" ? "option selected" : "option"}
            onClick={() => setHasDisease("yes")}
          >
            Yes
          </button>
          <button
            className={hasDisease === "no" ? "option selected" : "option"}
            onClick={() => setHasDisease("no")}
          >
            No
          </button>
        </div>

        {hasDisease === "yes" && (
          <input
            type="text"
            className="input"
            placeholder="Type your disease (e.g. Diabetes)"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
          />
        )}

        <p className="summary">
          {hasDisease === ""
            ? "Please select Yes or No"
            : hasDisease === "no"
            ? "No diseases recorded"
            : disease === ""
            ? "Please type your disease"
            : `Disease: ${disease}`}
        </p>

        <div>
        <Link href="/exerciseactivity" className="submit">submit</Link>
      </div>
      </div>
    </div>
  );
}