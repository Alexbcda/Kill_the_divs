import React, { useEffect } from 'react';

interface GpsProps {
  onCountryChange: (country: string) => void;
  onError: (error: GeolocationPositionError) => void;
}

const Gps: React.FC<GpsProps> = ({ onCountryChange, onError }) => {
  useEffect(() => {
    const fetchCountryFromApi = (latitude: number, longitude: number) => {
      fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        .then((response) => response.json())
        .then((data) => onCountryChange(data.countryName))
        .catch((error) => console.error('Erreur lors de la récupération du pays:', error));
    };

    const successCallback = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      fetchCountryFromApi(latitude, longitude);
    };

    const errorCallback = (error: GeolocationPositionError) => {
      onError(error);
    };

    const askForGeolocationPermission = async () => {
      try {
        // Vérifier si l'utilisateur a déjà autorisé la géolocalisation
        const result = await navigator.permissions.query({ name: 'geolocation' });
        const isGeolocationEnabled = result.state === 'granted';

        if (isGeolocationEnabled) {
          // Si l'utilisateur a déjà autorisé, obtenir la position
          navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        } else {
          // Sinon, demander la permission
          const permissionGranted = await new Promise<boolean>((resolve) => {
            if (window.confirm("Pour utiliser cette application, veuillez autoriser l'accès à votre position.")) {
              resolve(true);
            } else {
              resolve(false);
            }
          });

          if (permissionGranted) {
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
          } else {
            console.error("Permission refusée pour accéder à la géolocalisation.");
          }
        }
      } catch (error) {
        console.error("Erreur lors de la demande de permission de géolocalisation:", error);
      }
    };

    askForGeolocationPermission();
  }, [onCountryChange, onError]);

  return null;
};

export default Gps;
