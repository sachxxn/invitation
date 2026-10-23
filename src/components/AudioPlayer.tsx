
import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const playingRef = useRef(false);
  const startingRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(
      `${import.meta.env.BASE_URL}audio/anbil_avan.mp3`
    );

    audio.loop = true;
    audio.volume = 0.75;
    audio.preload = 'auto';
    audioRef.current = audio;

    let mounted = true;

    const updatePlaying = (playing: boolean) => {
      if (!mounted) return;
      playingRef.current = playing;
      setIsPlaying(playing);
    };

    const startMusic = async () => {
      if (!mounted || playingRef.current || startingRef.current) {
        return;
      }

      startingRef.current = true;

      try {
        await audio.play();
        updatePlaying(true);
        setAudioError(false);
      } catch (error) {
        console.warn('Audio playback was blocked or failed:', error);
      } finally {
        startingRef.current = false;
      }
    };

    // Attempt autoplay. The browser may block audible autoplay.
    void startMusic();

    // Start music on the first interaction elsewhere on the page.
    // The music button handles its own click separately.
    const handleFirstInteraction = (event: Event) => {
      const target = event.target;

      if (
        target instanceof Node &&
        buttonRef.current?.contains(target)
      ) {
        return;
      }

      void startMusic();
    };

    window.addEventListener('pointerdown', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    const handleEnded = () => updatePlaying(false);

    const handleError = () => {
      if (mounted) {
        setAudioError(true);
        updatePlaying(false);
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      mounted = false;

      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);

      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);

      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();

    const audio = audioRef.current;
    if (!audio || startingRef.current) return;

    if (!audio.paused) {
      audio.pause();
      playingRef.current = false;
      setIsPlaying(false);
      return;
    }

    startingRef.current = true;

    try {
      await audio.play();
      playingRef.current = true;
      setIsPlaying(true);
      setAudioError(false);
    } catch (error) {
      console.error('Could not play background music:', error);
      setAudioError(true);
      playingRef.current = false;
      setIsPlaying(false);
    } finally {
      startingRef.current = false;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        aria-pressed={isPlaying}
        title={isPlaying ? 'Pause Music' : 'Play Anbil Avan BGM'}
        className="group relative flex items-center justify-center
          w-14 h-14 rounded-full
          bg-gradient-to-br from-[#3B0910] via-[#230408] to-[#120204]
          border-2 border-[#D4AF37]/80 text-[#F5E6A8]
          shadow-[0_0_30px_rgba(212,175,55,0.35)]
          hover:scale-110 hover:border-[#D4AF37]
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-[#D4AF37]
          cursor-pointer"
      >
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border-2
            border-[#D4AF37] animate-ping opacity-30
            pointer-events-none"
          />
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
            <Music className="w-5 h-5 text-[#D4AF37]
              group-hover:text-[#F5E6A8] transition-colors"
            />
            <VolumeX className="w-3.5 h-3.5 text-[#D4AF37]/70" />
          </div>
        )}
      </button>

      {audioError && (
        <p className="absolute bottom-16 right-0 w-56 rounded-lg
          bg-[#230408] p-3 text-xs text-[#F5E6A8] shadow-lg">
          Music could not be played. Please check your browser
          settings and try again.
        </p>
      )}
    </div>
  );
};
