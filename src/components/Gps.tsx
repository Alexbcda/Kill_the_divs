// Gps.tsx
import React, { useEffect, useState } from 'react';

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

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.error("La géolocalisation n'est pas prise en charge par ce navigateur.");
    }
  }, [onCountryChange, onError]);

  return null;
};

export default Gps;
