import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { anbilAvanEngine } from '../utils/anbilAvanSynth';


export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Setup MP3 audio
    const audio = new Audio('/audio/anbil_avan.mp3');
    audio.loop = true;
    audio.volume = 0.75;
    audioRef.current = audio;

    // Auto-play immediately on mount
    const autoPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Browser blocked autoplay — fallback to synthesized melody
        try {
          await anbilAvanEngine.play();
          setIsPlaying(true);
        } catch {
          // Silently fail if both are blocked
        }
      }
    };

    autoPlay();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      anbilAvanEngine.pause();
    };
  }, []);


  const toggleMusic = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      anbilAvanEngine.pause();
      setIsPlaying(false);
    } else {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
        } else {
          await anbilAvanEngine.play();
        }
        setIsPlaying(true);
      } catch {
        // Silently fail
      }
    }
  };

  return (
    <>
      {/* Floating Bottom-Right Player */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 select-none">

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
