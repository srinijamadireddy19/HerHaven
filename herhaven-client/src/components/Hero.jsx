import React from 'react'
import heroSec from '../assets/heroSec.png';
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    <div className='hero'>
      <img src={heroSec} alt="Logo" className='women' />
      <div className="hero-content">
        <h2>“Empowered women empower the world.”</h2>
        <h3>“Join us and be part of a supportive community.”</h3>
        <button className="join-btn" onClick={() => navigate("/signup")}>
          Join Now
        </button>
      </div>
        
    </div>
  )
}

export default Hero