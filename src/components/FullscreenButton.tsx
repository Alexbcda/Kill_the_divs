import React from 'react';

interface FullscreenButtonProps {
  targetElementId: string;
}

const FullscreenButton: React.FC<FullscreenButtonProps> = ({ targetElementId }) => {
  
  const handleFullscreenClick = () => {
    const elem = document.getElementById(targetElementId);
    
    if (elem && elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem && (elem as any).webkitRequestFullscreen) {  // Pour Safari
      (elem as any).webkitRequestFullscreen();
    } else if (elem && (elem as any).mozRequestFullScreen) {      // Pour Firefox
      (elem as any).mozRequestFullScreen();
    } else if (elem && (elem as any).msRequestFullscreen) {       // Pour Edge
      (elem as any).msRequestFullscreen();
    }
  };

  return (
    <button onClick={handleFullscreenClick}>Fullscreen</button>
  );
};

export default FullscreenButton;
