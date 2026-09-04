"use client"; 
import { useEffect, useRef } from 'react';
import Head from 'next/head';
import './landing.css';
import Link from 'next/link';

export default function LandingPage() {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Brand Name - Tracking App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">GET FIT</div>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#about">About</a></li>
          </ul>
          <button className="nav-cta">START FOR FREE</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content scroll-animate">
          <p className="hero-label">INTRODUCING</p>
          <h1 className="hero-title">
            <span className="brand-highlight">GET FIT</span>
            <br />
            TRACKING APP
          </h1>
          <p className="hero-subtitle">
            JOIN THE COMMUNITY OF FITNESS JOURNEY AND REACH YOUR GOAL FASTER
          </p>
          <Link href="/login"><button className="hero-cta">START FOR FREE</button></Link>
        </div>
        <div className="hero-decoration">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="reviews">
        <h2 className="section-title scroll-animate">REVIEWS FROM CLIENTS</h2>
        <div className="reviews-grid">
          {[
            {
              name: 'ABISHEK LOKSEH.',
              text: 'This app completely transformed my fitness journey. The calorie tracker is incredibly accurate!',
              rating: 5,
            },
            {
              name: 'kishor',
              text: 'The macro tracking feature helped me gain 10 lbs of muscle in 3 months. Highly recommended!',
              rating: 5,
            },
            {
              name: 'tejas',
              text: 'Best exercise planner I have ever used. It adapts perfectly to my body type and goals.',
              rating: 5,
            },
          ].map((review, i) => (
            <div key={i} className="review-card scroll-animate" style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="stars">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <span key={j}>★</span>
                ))}
              </div>
              <p className="review-text">"{review.text}"</p>
              <p className="reviewer-name">— {review.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2 className="section-title scroll-animate">FEATURES OF APP</h2>
        <div className="features-grid">
          <div className="feature-card scroll-animate">
            <div className="feature-icon">🍎</div>
            <h3>PERSONALISED CALORIE TRACKER</h3>
            <p>This provides the daily calorie requirement for weight gain and weight loss</p>
          </div>
          <div className="feature-card scroll-animate" style={{ transitionDelay: '150ms' }}>
            <div className="feature-icon">📊</div>
            <h3>DAILY MACRO INTAKE</h3>
            <p>This feature provides daily macros according to body weight and goal of body</p>
          </div>
          <div className="feature-card scroll-animate" style={{ transitionDelay: '300ms' }}>
            <div className="feature-icon">💪</div>
            <h3>EXERCISE PLANNER</h3>
            <p>Exercise planner for every body type and body goal</p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner scroll-animate">
        <h2>Nutrition tracking for real life.</h2>
        <button className="cta-banner-btn">START FOR FREE</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>BRAND NAME</h3>
            <p>Nutrition tracking for real life.</p>
          </div>
          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
             
              
              <li><a href="#">Advertise With Us</a></li>
             
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 BRAND NAME. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}