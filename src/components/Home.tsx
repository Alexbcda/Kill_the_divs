// src/components/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Bienvenue!</h1>
      <Link to="/game">
        <button>Start</button>
      </Link>
    </div>
  );
}

export default Home;
