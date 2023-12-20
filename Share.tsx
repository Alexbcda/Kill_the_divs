import React from 'react';

interface ShareProps {
  title: string;
  text: string;
  url: string;
}

const Share: React.FC<ShareProps> = ({ title, text, url }) => {
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text,
        url,
      })
      .then(() => console.log('Partagé avec succès'))
      .catch((error) => console.error('Erreur lors du partage:', error));
    } else {
      alert('La fonctionnalité de partage n\'est pas prise en charge par votre navigateur.');
    }
  };

  return (
    <button onClick={handleShareClick}>Partager</button>
  );
}

export default Share;
