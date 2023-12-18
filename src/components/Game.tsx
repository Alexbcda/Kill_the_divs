import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Game() {
  const navigate = useNavigate();
  const [divsClicked, setDivsClicked] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [targetPosition, setTargetPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [hasClicked, setHasClicked] = useState<boolean>(false);

  const handleClick = () => {
    setDivsClicked(divsClicked + 1);
    setHasClicked(false); // Marquer comme non cliqué

    // Faire disparaître la div actuelle et générer une nouvelle position après le clic
    setTargetPosition(generateRandomPosition());
  };

  useEffect(() => {
    // Générer la position initiale après le premier clic
    if (!hasClicked) {
      setTargetPosition(generateRandomPosition());
      setHasClicked(true); // Marquer comme cliqué
    }

    const interval = setInterval(() => {
      setTimeElapsed(timeElapsed + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [hasClicked, timeElapsed]);

  useEffect(() => {
    if (divsClicked === 10) {
      navigate('/end', { state: { totalTime: timeElapsed } });
    }
  }, [divsClicked, timeElapsed, navigate]);

  const generateRandomPosition = () => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    const top = Math.floor(Math.random() * (windowHeight - 50));
    const left = Math.floor(Math.random() * (windowWidth - 50));

    return { top, left };
  };

  return (
    <div>
      <div className="game-screen" style={{ height: '100vh', width: '100vw' }}>
        {/* Placer ici le code pour la div cible */}
        <div
          className={`target-div ${divsClicked === 10 ? 'hidden' : 'visible'}`}
          onClick={handleClick}
          style={{ top: targetPosition.top, left: targetPosition.left }}
        ></div>

        {/* Afficher le compteur de divs et le chrono */}
        <div className="counter">Divs cliquées : {divsClicked}</div>
        <div className="timer">Temps : {timeElapsed} sec</div>
      </div>
    </div>
  );
}

export default Game;
