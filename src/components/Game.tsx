// Game.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const audio = new Audio('/Sons/vaiana.mp3');
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

  const handleCountryChange = (country: string) => {
    setUserCountry(country);
  };

  const handleCoordsError = (error: GeolocationPositionError) => {
    console.error('Erreur de géolocalisation:', error);
  };

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

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchCountryFromApi = async (latitude, longitude) => {
      try {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        const data = await response.json();
        setUserCountry(data.countryName);
      } catch (error) {
        console.error('Erreur lors de la récupération du pays:', error);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchCountryFromApi(latitude, longitude);
      },
      (error) => {
        console.error('Erreur de géolocalisation:', error);
      }
    );
  }, []); // Le tableau vide assure que le useEffect est exécuté une seule fois au montage

  return (
    <div>
      <div className="game-screen" style={{ height: '100vh', width: '100vw' }}>
        {/* cible */}
        <div
          className={`target-div ${totalClicks === 4 ? 'hidden' : 'visible'}`}
          onClick={handleClick}
          style={{ top: targetPosition.top, left: targetPosition.left }}
        ></div>

        <div className="counter">Clics : {totalClicks}</div>
        <div className="timer">Temps : {timeElapsed} sec</div>
        <div className="user-country">Pays : {userCountry}</div>
      </div>
    </div>
  );
}

export default Game;
