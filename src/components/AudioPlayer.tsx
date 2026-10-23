import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { anbilAvanEngine } from '../utils/anbilAvanSynth';


export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check and setup MP3 audio
    const audio = new Audio('/audio/anbil_avan.mp3');
    audio.loop = true;
    audio.volume = 0.75;
    audioRef.current = audio;

    // Global listener for first user interaction to start BGM smoothly

    const handleFirstGesture = () => {
      startMusic();
      removeGestureListeners();
    };

    const removeGestureListeners = () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });

    return () => {
      removeGestureListeners();
      if (audioRef.current) {
        audioRef.current.pause();
      }
      anbilAvanEngine.pause();
    };
  }, []);


  const startMusic = async () => {
    setShowPrompt(false);
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        return;
      } catch {
        // Fallback to synthesized melody if direct play fails
      }
    }

    // Play synthesized "Anbil Avan" BGM
    try {
      await anbilAvanEngine.play();
      setIsPlaying(true);
    } catch {
      // Audio context error
    }
  };


  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    anbilAvanEngine.pause();
    setIsPlaying(false);
  };

  const toggleMusic = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (isPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  };

  return (
    <>
      {/* Floating Bottom-Right Player */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 select-none">
        
        {/* Floating Tooltip / Banner */}
        {showPrompt && !isPlaying && (
          <button
            onClick={toggleMusic}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#3B0910] via-[#230408] to-[#120204] border border-[#D4AF37]/80 text-[#F5E6A8] text-xs font-montserrat tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.3)] backdrop-blur-md animate-bounce hover:scale-105 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
            <span className="font-semibold text-gold-shimmer">
              Tap to Play Anbil Avan BGM ♪
            </span>
          </button>
        )}

        {/* Floating Audio Button */}
        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? "Mute Background Music" : "Play Anbil Avan Wedding Music"}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#3B0910] via-[#230408] to-[#120204] border-2 border-[#D4AF37]/80 text-[#F5E6A8] shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:scale-110 hover:border-[#D4AF37] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] cursor-pointer"
          title={isPlaying ? "Pause Music" : "Play Anbil Avan BGM"}
        >
          {/* Animated Equalizer Ring */}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full border-2 border-[#D4AF37] animate-ping opacity-30 pointer-events-none" />
          )}

          <div className="flex items-center justify-center">
            {isPlaying ? (
              <div className="flex items-end gap-[3px] h-5">
                <span className="w-[3.5px] bg-[#D4AF37] h-3.5 animate-[pulse_0.5s_ease-in-out_infinite]" />
                <span className="w-[3.5px] bg-[#FFF2BE] h-5 animate-[pulse_0.7s_ease-in-out_infinite_0.15s]" />
                <span className="w-[3.5px] bg-[#D4AF37] h-3 animate-[pulse_0.6s_ease-in-out_infinite_0.3s]" />
                <Volume2 className="w-4 h-4 ml-1 text-[#F5E6A8]" />
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Music className="w-5 h-5 text-[#D4AF37] group-hover:text-[#F5E6A8] transition-colors" />
                <VolumeX className="w-3.5 h-3.5 text-[#D4AF37]/70" />
              </div>
            )}
          </div>
        </button>

      </div>
    </>
  );
};
