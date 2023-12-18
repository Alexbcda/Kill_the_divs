import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function End() {
  const navigate = useNavigate();
  const location = useLocation();
  const totalTime = location.state?.totalTime || 0; // Récupérer le temps total

  const handleReplay = () => {
    // Logique pour réinitialiser le jeu
    navigate('/game');
  };

  return (
    <div>
      <h2>Partie terminée!</h2>
      {/* Afficher le temps total et le bouton "Rejouer" */}
      <p>Temps total : {totalTime} sec</p>
      <button onClick={handleReplay}>Rejouer</button>
    </div>
  );
}

export default End;
