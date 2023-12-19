import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      // Empêcher le navigateur de gérer automatiquement l'événement
      event.preventDefault();
      // Stocker l'événement pour l'utiliser ultérieurement
      setDeferredPrompt(event);
    };

    // Écouter l'événement beforeinstallprompt
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      // Nettoyer l'écouteur d'événement lors du démontage du composant
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Définir explicitement le type comme BeforeInstallPromptEvent
      const promptEvent = deferredPrompt as Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }> };

      // Afficher la boîte de dialogue d'installation
      promptEvent.prompt();
      // Attendre la réponse de l'utilisateur
      promptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('L\'utilisateur a installé l\'application');
        } else {
          console.log('L\'utilisateur a refusé l\'installation de l\'application');
        }
        // Réinitialiser deferredPrompt après utilisation
        setDeferredPrompt(null);
      });
    }
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
    </div>
  );
}

export default Home;
