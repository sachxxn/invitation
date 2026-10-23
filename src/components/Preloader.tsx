import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
  brideName: string;
  groomName: string;
}

export const Preloader: React.FC<Props> = ({ onComplete, brideName, groomName }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800);
    }, 2400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#150205] text-[#F9F6F0] overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

          {/* Traditional Ganesha Seal / Royal Monogram */}
          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative flex flex-col items-center justify-center p-8"
          >
            {/* Ornate Gold Border Ring */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-[#D4AF37]/50 flex items-center justify-center p-2 shadow-[0_0_40px_rgba(212,175,55,0.2)]">
              <div className="w-full h-full rounded-full border border-dashed border-[#D4AF37]/70 flex flex-col items-center justify-center bg-gradient-to-b from-[#2E070C] to-[#150205]">
                <span className="text-[#D4AF37] text-2xl font-serif mb-1">ॐ</span>
                <span className="font-cinzel-dec text-2xl sm:text-3xl text-gold-gradient font-bold tracking-widest">
                  K & T
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]/80 mt-1 font-montserrat">
                  Weddings
                </span>
              </div>
            </div>

            {/* Couple Names */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-8 text-center"
            >
              <h2 className="font-cinzel text-xl sm:text-2xl text-gold-shimmer font-medium tracking-wide">
                {brideName} & {groomName}
              </h2>
              <p className="font-montserrat text-xs uppercase tracking-[0.35em] text-[#D4AF37]/70 mt-2">
                The Royal Wedding Celebration
              </p>
            </motion.div>

            {/* Subtle Loading Progress Bar */}
            <motion.div
              className="mt-6 w-36 h-[2px] bg-[#3B0910] rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFF2BE] to-[#D4AF37]"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
