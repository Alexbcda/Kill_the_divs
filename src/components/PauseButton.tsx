import React, { useEffect, useState } from 'react';

const PauseButton: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Mettre le jeu en pause lorsque la page devient invisible
        setIsPaused(true);
        // Vous pouvez ajouter d'autres logiques de mise en pause ici si nécessaire
      } else {
        // Reprendre le jeu lorsque la page redevient visible
        setIsPaused(false);
        // Vous pouvez ajouter d'autres logiques de reprise ici si nécessaire
      }
    };

    // Écoutez l'événement de changement de visibilité de la page
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Nettoyez l'écouteur d'événement lors du démontage du composant
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handlePauseClick = () => {
    setIsPaused(!isPaused); // Inverse l'état de la pause
    // Ajoutez d'autres logiques de mise en pause ou de reprise ici si nécessaire
  };

  return (
    <div>
      <button onClick={handlePauseClick}>
        {isPaused ? 'Reprendre' : 'Pause'}
      </button>
    </div>
  );
};

export default PauseButton;
