import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullscreenButton from './FullscreenButton';  
import Api from './Api'; 

const audio = new Audio('/Sons/Beretta.mp3');
const navigatorWithVibrate = navigator as Navigator & { vibrate: (pattern: number | number[]) => boolean };

function Game() {
  const navigate = useNavigate();
  const [totalClicks, setTotalClicks] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [targetPosition, setTargetPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [userCountry, setUserCountry] = useState<string | null>(null);

  const handleClick = () => {
    if (navigatorWithVibrate && navigatorWithVibrate.vibrate) {
      navigatorWithVibrate.vibrate([200, 100, 200]);
    }
    audio.pause();
    audio.currentTime = 0;
    audio.play();
    setTotalClicks((prevClicks) => prevClicks + 1);
    setTargetPosition(generateRandomPosition());
  };

  useEffect(() => {
    if (totalClicks === 10) {
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
      <Api setUserCountry={setUserCountry} setTimeElapsed={setTimeElapsed} />
      <div className="game-screen" id="gameScreen" style={{ height: '100vh', width: '100vw' }}>
        <div
          className={`target-div ${totalClicks === 4 ? 'hidden' : 'visible'}`}
          onClick={handleClick}
          style={{ top: targetPosition.top, left: targetPosition.left }}
        ></div>

        <div className="counter">Clics : {totalClicks}</div>
        <div className="timer">Temps : {timeElapsed} sec</div>
        <div className="user-country">Pays : {userCountry}</div>

        {/* Bouton de plein écran */}
        <FullscreenButton targetElementId="gameScreen" />
        
      </div>
    </div>
  );
}

export default Game;
