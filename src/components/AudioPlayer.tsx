
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { anbilAvanEngine } from '../utils/anbilAvanSynth';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playingRef = useRef(false);
  const startingRef = useRef(false);
  const sourceRef = useRef<'mp3' | 'synth' | null>(null);

  useEffect(() => {
    const audio = new Audio('/audio/anbil_avan.mp3');
    audio.loop = true;
    audio.volume = 0.75;
    audio.preload = 'auto';
    audioRef.current = audio;

    const startMusic = async () => {
      if (playingRef.current || startingRef.current) return;

      startingRef.current = true;

      try {
        await audio.play();
        sourceRef.current = 'mp3';
        playingRef.current = true;
        setIsPlaying(true);
      } catch {
        try {
          await anbilAvanEngine.play();
          sourceRef.current = 'synth';
          playingRef.current = true;
          setIsPlaying(true);
        } catch {
          // Browser requires user interaction.
        }
      } finally {
        startingRef.current = false;
      }
    };

    // Attempt autoplay on page load.
    void startMusic();

    // Retry when the visitor first interacts with the page.
    const handleInteraction = () => {
      void startMusic();
    };

    window.addEventListener('pointerdown', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('pointerdown', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);

      audio.pause();
      audioRef.current = null;
      void anbilAvanEngine.pause();

      playingRef.current = false;
      startingRef.current = false;
      sourceRef.current = null;
    };
  }, []);

  const toggleMusic = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    if (playingRef.current) {
      if (sourceRef.current === 'mp3') {
        audioRef.current?.pause();
      } else {
        await anbilAvanEngine.pause();
      }

      playingRef.current = false;
      sourceRef.current = null;
      setIsPlaying(false);
      return;
    }

    // Try the MP3 first, then the synthesizer.
    try {
      if (!audioRef.current) return;

      await audioRef.current.play();
      sourceRef.current = 'mp3';
    } catch {
      try {
        await anbilAvanEngine.play();
        sourceRef.current = 'synth';
      } catch {
        setIsPlaying(false);
        return;
      }
    }

    playingRef.current = true;
    setIsPlaying(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 select-none">
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
        title={isPlaying ? 'Pause Music' : 'Play Anbil Avan BGM'}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#3B0910] via-[#230408] to-[#120204] border-2 border-[#D4AF37]/80 text-[#F5E6A8] shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:scale-110 hover:border-[#D4AF37] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] cursor-pointer"
      >
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border-2 border-[#D4AF37] animate-ping opacity-30 pointer-events-none" />
        )}

        {isPlaying ? (
          <div className="flex items-end gap-[3px] h-5">
            <span className="w-[3.5px] bg-[#D4AF37] h-3.5 animate-pulse" />
            <span className="w-[3.5px] bg-[#FFF2BE] h-5 animate-pulse" />
            <span className="w-[3.5px] bg-[#D4AF37] h-3 animate-pulse" />
            <Volume2 className="w-4 h-4 ml-1 text-[#F5E6A8]" />
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Music className="w-5 h-5 text-[#D4AF37]" />
            <VolumeX className="w-3.5 h-3.5 text-[#D4AF37]/70" />
          </div>
        )}
      </button>
    </div>
  );
};
