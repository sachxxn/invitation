import React, { useEffect, useRef } from 'react';

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let unlocked = false;

    // Step 1: Play muted immediately (always allowed by every browser)
    audio.muted = true;
    audio.volume = 0.75;
    audio.play().catch(() => {});

    // Step 2: Unmute on first scroll
    const onScroll = () => {
      if (unlocked) return;
      unlocked = true;

      audio.muted = false;

      if (audio.paused) {
        audio.play().catch(() => {});
      }

      window.removeEventListener('scroll', onScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      audio.pause();
      audio.src = '';
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