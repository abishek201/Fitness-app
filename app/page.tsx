import Image from "next/image";
import Card1 from "./components/card1";

export default function Home() {
  return (
    <>
      <div className="brand-layout">
        <h1>BRAND NAME</h1>
      </div>
      <div className="hero-content">
        <div className="info">
          <h2>INTRODUCING</h2>
          <h2>BRAND NAME</h2>
          <h2>TRACKING APP</h2>
          <p>
            JOIN THE COMMUNITY OF FITNESS JOURNEY AND REACH YOUR GOAL FASTER
          </p>
          <button className="enter-btn">startforfree</button>
        </div>
        <div className="-hero-image">
          <div>
            <Image
              src="/image1.png"
              alt="image"
              width={300}
              height={300}
            ></Image>
          </div>
        </div>
      </div>

      <div className="review-content">
        <h1>REVIEW FROM CUSTOMERS</h1>
      </div>
      <div>
        <Card1/>
      </div>
    </>
  );
}
