import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Calendar, MapPin } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';

interface Props {
  isTamil: boolean;
}

export const HeroSection: React.FC<Props> = ({ isTamil }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Slow Parallax / Zoom */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/hero.jpg')` }}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        {/* Layered Overlays for Optimal Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#150205] via-[#1F0408]/65 to-[#0F0204]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#150205]/40 to-[#0F0204]/90" />
      </motion.div>

      {/* Floating Gold Sparkle Particles / Ambiance */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-[#FFF2BE] blur-[1px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-[#D4AF37] blur-[2px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 rounded-full bg-[#F5E6A8] blur-[1px] animate-float-slow" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center flex flex-col items-center">
        
        {/* Divine Invocation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-4"
        >
          <span className="text-[#D4AF37] text-2xl font-serif">ॐ</span>
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.4em] text-[#F3E5AB]/90 font-montserrat mt-1">
            {isTamil ? "திரு முருகப்பெருமான் துணை • ஸ்ரீ அழகியம்மன் துணை" : "Under Divine Blessings & Grace"}
          </p>
        </motion.div>

        {/* Wedding Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mb-2"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#28050A]/60 backdrop-blur-md text-[#F5E6A8] font-montserrat text-xs uppercase tracking-[0.3em] mb-4">
            {isTamil ? "திருமண அழைப்பிதழ்" : weddingData.weddingTitle}
          </span>
        </motion.div>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="space-y-2 sm:space-y-4 my-2"
        >
          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F9F6F0] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            <span className="text-gold-shimmer">
              {isTamil ? weddingData.brideTamilName : weddingData.brideName}
            </span>
          </h1>

          <div className="flex items-center justify-center gap-4 text-[#D4AF37]">
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="font-alex text-4xl sm:text-5xl md:text-6xl text-[#FFF2BE]">&</span>
            <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F9F6F0] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            <span className="text-gold-shimmer">
              {isTamil ? weddingData.groomTamilName : weddingData.groomName}
            </span>
          </h1>
        </motion.div>

        {/* Ornamental Motif */}
        <OrnamentalDivider variant="lotus" className="my-4 sm:my-6" />

        {/* Date, Time & Venue Bar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm sm:text-base text-[#F3E5AB] font-montserrat tracking-wider"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <span>{isTamil ? weddingData.weddingDateTamil : weddingData.weddingDateDisplay}</span>
          </div>
          <span className="hidden sm:inline text-[#D4AF37]">•</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <span>{isTamil ? weddingData.venueTamilName : weddingData.venueName}, Chengalpattu</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#invitation"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-[#1A0306] font-cinzel text-xs sm:text-sm uppercase tracking-[0.25em] font-bold shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-105 transition-all duration-300"
          >
            {isTamil ? "அழைப்பிதழை காண்க" : "View Invitation Card"}
          </a>
          <a
            href="#events"
            className="px-8 py-3 rounded-full border border-[#D4AF37]/60 bg-[#28050A]/60 backdrop-blur-md text-[#F5E6A8] font-cinzel text-xs sm:text-sm uppercase tracking-[0.25em] hover:bg-[#3B0910] hover:border-[#D4AF37] transition-all duration-300"
          >
            {isTamil ? "நிகழ்ச்சி நிரல்" : "Event Schedule"}
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 cursor-pointer text-[#D4AF37]/80 hover:text-[#D4AF37]"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      >
        <a href="#invitation" className="flex flex-col items-center">
          <span className="text-[9px] uppercase tracking-[0.3em] font-montserrat">
            {isTamil ? "கீழே உருட்டவும்" : "Scroll to Open"}
          </span>
          <ChevronDown className="w-5 h-5 text-[#D4AF37]" />
        </a>
      </motion.div>
    </section>
  );
};
