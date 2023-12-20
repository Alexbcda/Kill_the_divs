import React from 'react';

interface ShareProps {
  title: string;
  text: string;
  url: string;
}

const Share: React.FC<ShareProps> = ({ title, text, url }) => {

  const handleShare = async () => {
    const shareData = {
      title: title,
      text: text,
      url: url,
    };

    try {
      await navigator.share(shareData);
      console.log("Partagé avec succès");
    } catch (err) {
      console.error('Erreur lors du partage:', err);
    }
  };

  return (
    <button onClick={handleShare}>Partager</button>
  );
};

export default Share;
