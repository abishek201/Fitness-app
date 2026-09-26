"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./allrgen.css";

const allergens = ["Eggs", "Gluten", "Chicken", "Dairy", "Soy"];

export default function AllergenMenu() {
  // Load saved selections from localStorage on first render (or start empty)
  const [selected, setSelected] = useState(() => {
  // ✅ Always return a valid array
  if (typeof window === "undefined") return []; // SSR safety for Next.js
  try {
    const saved = localStorage.getItem("userform");
    if (saved) {
      const data = JSON.parse(saved);
      return Array.isArray(data.allergens) ? data.allergens : [];
    }
  } catch (e) {
    console.error("Failed to read localStorage:", e);
  }
  return []; // ✅ default fallback
});

// Save to localStorage whenever "selected" changes
useEffect(() => {
  // ✅ Merge with existing data instead of replacing it
  const existing = JSON.parse(localStorage.getItem("userform") || "{}");
  const updated = { ...existing, allergens: selected };
  localStorage.setItem("userform", JSON.stringify(updated));
}, [selected]);

// Toggle an item in/out of the selection (multi-select)
const toggleItem = (item) => {
  if (selected.includes(item)) {
    setSelected(selected.filter((i) => i !== item));
  } else {
    setSelected([...selected, item]);
  }
};

  return (
    <div className="page">
      <div className="card">
        <h1 className="brand">track my fitness</h1>
        <h2 className="subtitle">Allergens</h2>

        <div className="grid">
          {allergens.map((item) => (
            <button
              key={item}
              className={
                selected.includes(item) ? "item selected" : "item"
              }
              onClick={() => toggleItem(item)}
            >
              {selected.includes(item) && (
                <span className="check">✓</span>
              )}
              {item}
            </button>
          ))}
        </div>

        <p className="summary">
          {selected.length === 0
            ? "No allergens selected"
            : `Selected: ${selected.join(", ")}`}
        </p>
         <div>
        <Link href="/disease" className="submit">submit</Link>
      </div>
      </div>
    </div>
  );
}