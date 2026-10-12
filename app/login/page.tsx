"use client"
import './login.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Load saved name on mount (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem('userform');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name !== undefined) {
          setName(parsed.name);
        }
      }
    } catch (e) {
      console.error('Failed to read localStorage:', e);
    }
  }, []);

  // Save name to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const existing = localStorage.getItem('userform');
      const formData = existing ? JSON.parse(existing) : {};
      formData.name = name;
      localStorage.setItem("userform", JSON.stringify(formData));
    } catch (e) {
      console.error('Failed to save name:', e);
    }
  }, [name]);

  // ✅ Validation + navigation (replaces the old <Link>)
  const handleLogin = () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    // Save email too (merged with existing data)
    try {
      const existing = localStorage.getItem('userform');
      const formData = existing ? JSON.parse(existing) : {};
      formData.name = name.trim();
      formData.email = email.trim();
      localStorage.setItem("userform", JSON.stringify(formData));
    } catch (e) {
      console.error('Failed to save email:', e);
    }

    // ✅ Route to /goal only after validation passes

    // if(FormData.name || FormData.email) {
    // router.push('/mail');
    // } else {
      router.push('/goal');
    // } 
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-logo">TRACK MY FITNESS</h2>
        <h1 className="login-title">welcome to fitness</h1>
        <p className="login-sub">create account to get started</p>

        <input
          type="text"
          placeholder="Type your name"
          className="login-input"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
        />

        <div className="login-divider">
          <span>and</span>
        </div>

        <input
          type="text"
          placeholder="Type your email"
          className="login-input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
        />

        {/* ✅ Error message shown when validation fails */}
        {error && <p className="login-error">{error}</p>}

        <button className="email-btn" onClick={handleLogin}>
          login
        </button>
      </div>
    </div>
  );
}