import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { BeforeInstallPromptEvent } from './types';  
import Share from './Share';
import FullscreenButton from './FullscreenButton';


function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {

  }, []);

  const handleInstallClick = () => {
    
  };

  return (
    <div className="home-center">
      <h1>Bienvenue!</h1>
      <Link to="/game">
        <button>Start</button>
      </Link>
      
      {deferredPrompt && (
        <button onClick={handleInstallClick}>Installer l'application</button>
      )}
      
      {/* Utilisation du composant Share pour le partage */}
      <Share 
        title="kill-the-divs"
        text="Cliques le plus vite possible"
        url={window.location.href}
      />

     
    </div>
  );
}

export default Home;
