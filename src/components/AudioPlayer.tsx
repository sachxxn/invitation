import React, { useEffect, useRef } from 'react';

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // The <audio autoplay muted> HTML attributes trigger browser-level autoplay
    // (always allowed). Once playing, we unmute to restore full audio.
    const unmute = () => {
      audio.muted = false;
      audio.volume = 0.75;
    };

    if (audio.paused) {
      // Not yet playing (e.g. browser deferred it) — play then unmute
      audio
        .play()
        .then(unmute)
        .catch(() => {
          // Still blocked: unmute on first user gesture
          const resume = () => {
            audio.play().then(unmute).catch(() => {});
            document.removeEventListener('click', resume, true);
            document.removeEventListener('touchstart', resume, true);
          };
          document.addEventListener('click', resume, { capture: true, once: true });
          document.addEventListener('touchstart', resume, { capture: true, once: true, passive: true });
        });
    } else {
      // Already playing via autoplay attribute — just unmute
      unmute();
    }
  }, []);

  return (
    // Native HTML autoplay+muted is allowed by ALL browsers including Safari/Chrome on Vercel
    <audio
      ref={audioRef}
      src="/audio/anbil_avan.mp3"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      style={{ display: 'none' }}
    />
  );
};

export default AudioPlayer;