// End.tsx
import React, { useEffect } from 'react';
import './End.css';
import { useNavigate, useLocation } from 'react-router-dom';

function End() {
  const navigate = useNavigate();
  const location = useLocation();
  const totalTime = location.state?.totalTime || 0; // Récupérer le temps total

  const handleReplay = () => {
    // Logique pour réinitialiser le jeu
    navigate('/game');
  };

  useEffect(() => {
    const container = document.querySelector('.fireworks-container');
    if (container) {
      createFireworks(container);
    }
  }, []);

  const createFireworks = (container: Element) => {
    const numberOfFireworks = 10;

    for (let i = 0; i < numberOfFireworks; i++) {
      const firework = document.createElement('div');
      firework.className = 'firework';
      firework.style.backgroundColor = getRandomColor();
      container.appendChild(firework);

      animateFirework(firework);
    }
  };

  const getRandomColor = () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#ff9900', '#ffff00'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const animateFirework = (firework: Element) => {
    const animationDuration = Math.random() * 2 + 1;
    const animationDelay = Math.random();
    const initialX = Math.random() * window.innerWidth;
    const initialY = Math.random() * window.innerHeight;

    firework.style.left = `${initialX}px`;
    firework
    .style.top = `${initialY}px`;
    firework.style.animationDuration = `${animationDuration}s`;
    firework.style.animationDelay = `-${animationDelay}s`;

    firework.addEventListener('animationiteration', () => {
      // Réinitialiser la position après chaque itération de l'animation
      const newX = Math.random() * window.innerWidth;
      const newY = Math.random() * window.innerHeight;
      firework.style.left = `${newX}px`;
      firework.style.top = `${newY}px`;
    });
  };

  return (
    <div className="end-center">
      <h2>Partie terminée!</h2>
      {/* Afficher le temps total et le bouton "Rejouer" */}
      <p>Temps total : {totalTime} sec</p>
      <button onClick={handleReplay}>Rejouer</button>
      <div className="fireworks-container"></div>
    </div>
  );
}

export default End;
