import React, { useEffect, useRef } from 'react';

interface Props {
  unlocked: boolean;
}

const AudioPlayer: React.FC<Props> = ({ unlocked }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const unlockedRef = useRef(false);

  // Step 1: Start MUTED immediately on mount (always allowed by every browser)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = true;
    audio.volume = 0.75;
    audio.play().catch(() => {});

    const unmute = () => {
      if (unlockedRef.current) return;
      unlockedRef.current = true;
      audio.muted = false;
      if (audio.paused) audio.play().catch(() => {});
      // Remove all listeners once unlocked
      window.removeEventListener('scroll', unmute);
      window.removeEventListener('click', unmute);
      window.removeEventListener('touchstart', unmute);
      window.removeEventListener('pointerdown', unmute);
    };

    // Step 2: Unmute on ANY user interaction — click, scroll, touch, pointer
    window.addEventListener('scroll',      unmute, { passive: true });
    window.addEventListener('click',       unmute);
    window.addEventListener('touchstart',  unmute, { passive: true });
    window.addEventListener('pointerdown', unmute);

    return () => {
      window.removeEventListener('scroll',      unmute);
      window.removeEventListener('click',       unmute);
      window.removeEventListener('touchstart',  unmute);
      window.removeEventListener('pointerdown', unmute);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Step 3: Unmute when preloader finishes (no interaction needed)
  useEffect(() => {
    if (!unlocked) return;
    const audio = audioRef.current;
    if (!audio || unlockedRef.current) return;

    unlockedRef.current = true;
    audio.muted = false;
    if (audio.paused) audio.play().catch(() => {});
  }, [unlocked]);

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