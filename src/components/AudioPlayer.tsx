import React, { useEffect, useRef, useState } from 'react';

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const [unlocked, setUnlocked] = useState(false);

  // Step 1: Start playing MUTED immediately on mount (always works in every browser)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = true;
    audio.volume = 0.75;

    audio.play().catch(() => {
      // Even muted play failed — overlay will handle it
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Step 2: Unmute on first user interaction
  const unlock = () => {
    const audio = audioRef.current;
    if (!audio || unlocked) return;

    const doUnlock = () => {
      audio.muted = false;
      if (audio.paused) {
        audio.play().catch(() => {});
      }
      setUnlocked(true);
      setShowOverlay(false);
    };

    if (!audio.paused) {
      doUnlock();
    } else {
      audio.play().then(doUnlock).catch(() => {});
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/anbil_avan.mp3"
        loop
        playsInline
        preload="auto"
        style={{ display: 'none' }}
      />

      {/* Full-screen tap overlay — captures first interaction seamlessly */}
      {showOverlay && (
        <div
          onClick={unlock}
          onTouchStart={unlock}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: '32px',
            pointerEvents: 'all',
            // Transparent — doesn't block visuals
            background: 'transparent',
          }}
        >
          {/* Small pulsing music badge at bottom */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, rgba(59,9,16,0.92), rgba(18,2,4,0.92))',
              border: '1px solid rgba(212,175,55,0.7)',
              color: '#F5E6A8',
              fontSize: '12px',
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '0.12em',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 0 28px rgba(212,175,55,0.3)',
              animation: 'sgPulse 2s ease-in-out infinite',
              cursor: 'pointer',
              userSelect: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontSize: '16px' }}>🎵</span>
            <span>Tap anywhere to play wedding music</span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes sgPulse {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50%       { opacity: 0.75; transform: translateY(-4px); }
        }
      `}</style>
    </>
  );
};

export default AudioPlayer;