import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { BeforeInstallPromptEvent } from './types';  
import Share from './Share';


function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // ... (Votre code pour gérer l'installation différée)
  }, []);

  const handleInstallClick = () => {
    // ... (Votre code pour gérer l'installation)
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
        title="Nom de votre application"
        text="Description de votre application"
        url={window.location.href}
      />

     
    </div>
  );
}

export default Home;
