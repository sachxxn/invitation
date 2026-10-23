import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import type { GalleryItem } from '../types/wedding';

import { OrnamentalDivider } from './OrnamentalDivider';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface Props {
  isTamil: boolean;
}

export const GalleryLightbox: React.FC<Props> = ({ isTamil }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % weddingData.gallery.length);
    }
  }, [selectedIndex]);

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        (selectedIndex - 1 + weddingData.gallery.length) % weddingData.gallery.length
      );
    }
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  return (
    <section id="gallery" className="relative py-24 sm:py-36 bg-[#130306] overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-montserrat">
            <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{isTamil ? "புகைப்படத்தொகுப்பு" : "Memories & Portraits"}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl text-[#F9F6F0] font-semibold mt-2">
            {isTamil ? "அழகிய தருணங்கள்" : "The Editorial Gallery"}
          </h2>
          <p className="font-cormorant text-base sm:text-lg text-[#F3E5AB]/80 mt-1 italic">
            Visual moments celebrating tradition, love, and sacred matrimony
          </p>
          <OrnamentalDivider variant="lotus" className="mt-4" />
        </div>

        {/* Masonry / Composition Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {weddingData.gallery.map((item: GalleryItem, idx: number) => {
            const isWide = item.aspect === 'landscape' && idx % 3 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                onClick={() => setSelectedIndex(idx)}
                className={`relative group rounded-2xl overflow-hidden border border-[#D4AF37]/35 bg-[#1F0408] cursor-pointer shadow-xl ${
                  isWide ? 'sm:col-span-2' : ''
                }`}
              >
                {/* Image Container with Smooth Zoom */}
                <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#150205] via-[#150205]/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                </div>

                {/* Hover Caption Card */}
                <div className="absolute bottom-0 inset-x-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-cinzel text-lg text-gold-shimmer font-bold">
                        {item.title}
                      </h4>
                      <p className="font-montserrat text-xs text-[#F3E5AB]/80 line-clamp-1 mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full border border-[#D4AF37]/60 bg-[#28050A]/80 flex items-center justify-center text-[#F5E6A8] group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#1A0306] transition-all">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0A0102]/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8 select-none"
          >
            {/* Top Toolbar */}
            <div className="w-full max-w-7xl flex items-center justify-between z-10">
              <div className="flex items-center gap-2 text-[#D4AF37] text-xs uppercase tracking-widest font-montserrat">
                <span>{selectedIndex + 1} / {weddingData.gallery.length}</span>
                <span>•</span>
                <span>{weddingData.gallery[selectedIndex].title}</span>
              </div>

              <button
                onClick={() => setSelectedIndex(null)}
                className="p-2.5 rounded-full border border-[#D4AF37]/50 bg-[#230408] text-[#F5E6A8] hover:bg-[#3B0910] hover:text-[#D4AF37] transition-all focus:outline-none"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Central Large Image View */}
            <div className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-4">
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full border border-[#D4AF37]/40 bg-[#1A0306]/80 text-[#F5E6A8] hover:border-[#D4AF37] hover:bg-[#3B0910] transition-all"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                src={weddingData.gallery[selectedIndex].url}
                alt={weddingData.gallery[selectedIndex].title}
                className="max-h-[75vh] max-w-full object-contain rounded-xl border border-[#D4AF37]/40 shadow-2xl"
              />

              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full border border-[#D4AF37]/40 bg-[#1A0306]/80 text-[#F5E6A8] hover:border-[#D4AF37] hover:bg-[#3B0910] transition-all"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div className="w-full max-w-xl text-center space-y-1 z-10">
              <h3 className="font-cinzel text-xl text-gold-shimmer font-bold">
                {weddingData.gallery[selectedIndex].title}
              </h3>
              <p className="font-montserrat text-xs text-[#F3E5AB]/85">
                {weddingData.gallery[selectedIndex].subtitle}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
