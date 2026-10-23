import React from 'react';
import { weddingData } from '../data/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';
import { Phone, ArrowUp } from 'lucide-react';


interface Props {
  isTamil: boolean;
}

export const Footer: React.FC<Props> = ({ isTamil }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-20 bg-gradient-to-b from-[#0F0204] via-[#1A0306] to-[#0A0102] text-[#F9F6F0] border-t border-[#D4AF37]/30 overflow-hidden text-center">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Royal Monogram Seal */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full border border-[#D4AF37]/60 bg-[#230408] flex items-center justify-center p-1 shadow-[0_0_25px_rgba(212,175,55,0.2)]">
            <div className="w-full h-full rounded-full border border-dashed border-[#D4AF37]/40 flex items-center justify-center">
              <span className="font-cinzel-dec text-lg text-gold-gradient font-bold">KT</span>
            </div>
          </div>
        </div>

        {/* Couple Names */}
        <div className="space-y-2">
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-gold-shimmer tracking-wide">
            {isTamil ? `${weddingData.brideTamilName} & ${weddingData.groomTamilName}` : `${weddingData.brideName} & ${weddingData.groomName}`}
          </h2>
          <p className="font-montserrat text-xs uppercase tracking-[0.3em] text-[#D4AF37]/80">
            {isTamil ? weddingData.weddingDateTamil : weddingData.weddingDateDisplay}
          </p>
          <p className="font-cormorant text-sm sm:text-base text-[#F3E5AB]/75 italic pt-1">
            {isTamil ? "ஸ்ரீ வெங்கடேஸ்வரா மஹால், காஞ்சிபுரம் பைபாஸ் சாலை, செங்கல்பட்டு" : "Shri Venkateswara Mahal • Chengalpattu"}
          </p>
        </div>

        <OrnamentalDivider variant="lotus" className="max-w-xs mx-auto" />

        {/* Thank You Note */}
        <div className="space-y-2 max-w-md mx-auto">
          <p className="font-alex text-3xl sm:text-4xl text-[#FFF2BE]">
            "Thank you for celebrating with us."
          </p>
          <p className="font-montserrat text-xs uppercase tracking-widest text-[#F3E5AB]/70">
            {isTamil ? "உங்கள் வருகை எங்கள் பாக்கியம்" : "Your blessings mean the world to us"}
          </p>
        </div>

        {/* Contact Numbers */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-montserrat text-[#F3E5AB]/85">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Cell: {weddingData.contactPhones.join(' / ')}</span>
          </div>
        </div>

        {/* Scroll Back To Top Button */}
        <div className="pt-6">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#1A0306] text-[#D4AF37] text-xs font-montserrat uppercase tracking-wider hover:border-[#D4AF37] hover:bg-[#3B0910] hover:text-[#F5E6A8] transition-all cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Footer Bottom Line */}
        <div className="pt-8 border-t border-[#D4AF37]/15 text-[11px] text-[#D4AF37]/60 font-montserrat space-y-2">
          <p>© 2026 N. Kaaviya & R.V. Thyaneshwar Royal Wedding Invitation. All rights reserved.</p>
          <p className="text-[#D4AF37]/50 tracking-widest uppercase text-[10px]">
            ✦ Created by <span className="text-[#D4AF37]/80 font-semibold">SY Creation</span> ✦
          </p>
        </div>

      </div>
    </footer>
  );
};
