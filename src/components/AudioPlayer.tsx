import React, { useEffect, useRef } from 'react';

interface Props {
  unlocked: boolean;
}

const AudioPlayer: React.FC<Props> = ({ unlocked }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const unlockedRef = useRef(false);

  // Step 1: Start playing MUTED immediately (always allowed by browsers)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = true;
    audio.volume = 0.75;
    audio.play().catch(() => {});

    // Scroll fallback: if preloader signal never arrives, scroll unmutes
    const onScroll = () => {
      if (unlockedRef.current) return;
      unlockedRef.current = true;
      audio.muted = false;
      if (audio.paused) audio.play().catch(() => {});
      window.removeEventListener('scroll', onScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Step 2: Unmute as soon as preloader signals it's done
  useEffect(() => {
    if (!unlocked) return;
    const audio = audioRef.current;
    if (!audio || unlockedRef.current) return;

    unlockedRef.current = true;
    audio.muted = false;

    if (audio.paused) {
      audio.play().catch(() => {});
    }
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