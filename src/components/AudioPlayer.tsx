import React, { useEffect, useRef } from 'react';

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.75;

    const startMusic = async () => {
      if (hasStarted.current) return;

      // Prevent multiple playback attempts.
      hasStarted.current = true;

      try {
        audio.muted = false;
        await audio.play();
      } catch (error) {
        hasStarted.current = false;
        console.error('Unable to start music:', error);
      }
    };

    // Play music when the user clicks anywhere on the website.
    document.addEventListener('click', startMusic, true);

    // Also support the first tap on mobile devices.
    document.addEventListener('touchstart', startMusic, {
      capture: true,
      passive: true,
    });

    return () => {
      document.removeEventListener('click', startMusic, true);
      document.removeEventListener('touchstart', startMusic, true);
      audio.pause();
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/audio/anbil_avan.mp3"
      loop
      playsInline
      preload="auto"
      style={{ display: 'none' }}
    />
  );
};

export default AudioPlayer;