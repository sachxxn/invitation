import React, { useEffect } from 'react';

const AudioPlayer: React.FC = () => {
  useEffect(() => {
    const audio = new Audio('/audio/anbil_avan.mp3');
    audio.loop = true;
    audio.preload = 'auto';

    // Start muted — browsers always allow muted autoplay
    audio.muted = true;

    audio
      .play()
      .then(() => {
        // Unmute immediately after playback starts
        audio.muted = false;
        audio.volume = 0.75;
      })
      .catch((err) => {
        console.warn('Autoplay failed:', err);
      });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  return null;
};

export default AudioPlayer;