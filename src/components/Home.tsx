// src/components/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


function Home() {
  return (
    <div className="home-center">
 
      <h1>Bienvenue!</h1>
      <Link to="/game">
        <button>Start</button>
      </Link>
    </div>
  );
}

export default Home;
