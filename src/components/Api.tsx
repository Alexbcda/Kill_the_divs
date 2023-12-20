import { useEffect } from 'react';

const Api = ({ setUserCountry, setTimeElapsed }: { setUserCountry: Function, setTimeElapsed: Function }) => {

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((prevTime: number) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [setTimeElapsed]);

  useEffect(() => {
    const fetchCountryFromApi = async (latitude: number, longitude: number) => {
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
  }, [setUserCountry]);

  return null; 
}

export default Api;
