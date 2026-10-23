import React, { useEffect, useRef } from 'react';

interface Props {
  unlocked: boolean;
}

const AudioPlayer: React.FC<Props> = ({ unlocked }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const unlockedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Ensure volume is set
    audio.volume = 0.75;

    // Try to start playing immediately (muted via HTML attribute)
    audio.play().catch(() => {
      // Silently ignore — interaction listeners will handle it
    });

    const unmute = () => {
      if (unlockedRef.current) return;
      unlockedRef.current = true;

      audio.muted = false;
      audio.volume = 0.75;

      if (audio.paused) {
        audio.play().catch(() => {});
      }

      // Remove all listeners after first unlock
      document.removeEventListener('click',       unmute, true);
      document.removeEventListener('touchstart',  unmute, true);
      document.removeEventListener('touchend',    unmute, true);
      document.removeEventListener('pointerdown', unmute, true);
      document.removeEventListener('keydown',     unmute, true);
      window.removeEventListener('scroll',        unmute);
    };

    // Use capture:true so events are caught BEFORE any element handles them
    document.addEventListener('click',       unmute, { capture: true });
    document.addEventListener('touchstart',  unmute, { capture: true, passive: true });
    document.addEventListener('touchend',    unmute, { capture: true, passive: true });
    document.addEventListener('pointerdown', unmute, { capture: true });
    document.addEventListener('keydown',     unmute, { capture: true });
    window.addEventListener('scroll',        unmute, { passive: true });

    return () => {
      document.removeEventListener('click',       unmute, true);
      document.removeEventListener('touchstart',  unmute, true);
      document.removeEventListener('touchend',    unmute, true);
      document.removeEventListener('pointerdown', unmute, true);
      document.removeEventListener('keydown',     unmute, true);
      window.removeEventListener('scroll',        unmute);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Unmute when preloader signals done (works even without interaction)
  useEffect(() => {
    if (!unlocked) return;
    const audio = audioRef.current;
    if (!audio || unlockedRef.current) return;

    unlockedRef.current = true;
    audio.muted = false;
    audio.volume = 0.75;
    if (audio.paused) audio.play().catch(() => {});
  }, [unlocked]);

  return (
    // autoPlay + muted are HTML-level attributes — most trusted by browsers
    // playsInline prevents fullscreen on iOS Safari
    <audio
      ref={audioRef}
      src="/audio/anbil_avan.mp3"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      style={{ display: 'none' }}
    />
  );
};

export default AudioPlayer;