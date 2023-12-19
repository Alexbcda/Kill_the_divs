import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const audio = new Audio('/Sons/vaiana.mp3');
const navigatorWithVibrate = navigator as Navigator & { vibrate: (pattern: number | number[]) => boolean };

function Game() {
  const navigate = useNavigate();
  const [totalClicks, setTotalClicks] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [targetPosition, setTargetPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const handleClick = useCallback(() => {
    // Ajoutez la vibration lors du clic
    if (navigatorWithVibrate && navigatorWithVibrate.vibrate) {
      navigatorWithVibrate.vibrate([200, 100, 200]);
    }

    // Reste de votre code de clic existantes
    audio.pause();
    audio.currentTime = 0;
    audio.play();
    setTotalClicks((prevClicks) => prevClicks + 1);
    setTargetPosition(generateRandomPosition());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (totalClicks === 4) {
      navigate('/end', { state: { totalTime: timeElapsed } });
    }
  }, [totalClicks, timeElapsed, navigate]);

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
        {/* cible */}
        <div
          className={`target-div ${totalClicks === 10 ? 'hidden' : 'visible'}`}
          onClick={handleClick}
          style={{ top: targetPosition.top, left: targetPosition.left }}
        ></div>

        {/* Afficher le compteur de clics et le chrono */}
        <div className="counter">Clics : {totalClicks}</div>
        <div className="timer">Temps : {timeElapsed} sec</div>
      </div>
    </div>
  );
}

export default Game;
