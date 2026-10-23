import React, { useEffect } from 'react';

const AudioPlayer: React.FC = () => {
  useEffect(() => {
    const audio = new Audio(
      `${import.meta.env.BASE_URL}audio/anbil_avan.mp3`
    );

    audio.loop = true;
    audio.volume = 0.75;
    audio.preload = 'auto';

    let isPlaying = false;
    let isStarting = false;
    let isMounted = true;

    const removeListeners = () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('pointerdown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    const startMusic = async () => {
      if (!isMounted || isPlaying || isStarting) return;

      isStarting = true;

      try {
        await audio.play();

        if (!isMounted) {
          audio.pause();
          return;
        }

        isPlaying = true;
        removeListeners();

        console.log('Background music is playing.');
      } catch (error) {
        console.warn(
          'Autoplay was blocked. Waiting for user interaction.',
          error
        );
      } finally {
        isStarting = false;
      }
    };

    const handleInteraction = () => {
      void startMusic();
    };

    // Try autoplay as soon as the component mounts.
    void startMusic();

    // If autoplay is blocked, start on the first interaction.
    window.addEventListener('scroll', handleInteraction, {
      passive: true,
    });
    window.addEventListener('click', handleInteraction);
    window.addEventListener('pointerdown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction, {
      passive: true,
    });
    window.addEventListener('keydown', handleInteraction);

    // Clean up when the component unmounts.
    return () => {
      isMounted = false;
      removeListeners();
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // No music button or visible player.
  return null;
};

export default AudioPlayer;