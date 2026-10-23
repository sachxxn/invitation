import React, { useEffect, useRef, useState } from 'react';

export const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    // Create audio element once
    const audio = new Audio('/audio/anbil_avan.mp3');
    audio.loop = true;
    audio.volume = 0.7;
    audio.preload = 'auto';
    audioRef.current = audio;

    let started = false;

    const startAudio = () => {
      if (started) return;
      audio
        .play()
        .then(() => {
          started = true;
          setShowHint(false);
          removeAll();
        })
        .catch(() => {
          // Still blocked — keep listeners alive
        });
    };

    const removeAll = () => {
      document.removeEventListener('click', startAudio, true);
      document.removeEventListener('touchstart', startAudio, true);
      document.removeEventListener('keydown', startAudio, true);
      document.removeEventListener('scroll', startAudio, true);
    };

    // Try autoplay immediately (works if browser allows)
    audio
      .play()
      .then(() => {
        started = true;
        setShowHint(false);
      })
      .catch(() => {
        // Autoplay blocked — wait for first user gesture
        document.addEventListener('click', startAudio, { capture: true, once: true });
        document.addEventListener('touchstart', startAudio, { capture: true, once: true, passive: true });
        document.addEventListener('keydown', startAudio, { capture: true, once: true });
        document.addEventListener('scroll', startAudio, { capture: true, once: true, passive: true });
      });

    // Auto-hide hint after 8s regardless
    const hintTimer = setTimeout(() => setShowHint(false), 8000);

    return () => {
      clearTimeout(hintTimer);
      removeAll();
      audio.pause();
      audio.src = '';
    };
  }, []);

  return (
    <>
      {showHint && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            background: 'linear-gradient(135deg, #3B0910cc, #120204cc)',
            border: '1px solid rgba(212,175,55,0.6)',
            borderRadius: '999px',
            padding: '8px 20px',
            color: '#F5E6A8',
            fontSize: '12px',
            fontFamily: 'Montserrat, sans-serif',
            letterSpacing: '0.1em',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 20px rgba(212,175,55,0.25)',
            pointerEvents: 'none',
            animation: 'fadeInUp 0.5s ease',
            whiteSpace: 'nowrap',
          }}
        >
          {/* 🎵 Tap anywhere to play Anbil Avan BGM */}
        </div>
      )}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </>
  );
};

export default AudioPlayer;