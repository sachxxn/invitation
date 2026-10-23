import React from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';
import { Calendar, Clock, MapPin } from 'lucide-react';


interface Props {
  isTamil: boolean;
}

export const InvitationReveal: React.FC<Props> = ({ isTamil }) => {
  return (
    <section id="invitation" className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0F0204] overflow-hidden">
      {/* Background Ambience Texture */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3B0910]/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        {/* The Luxury Traditional Letterpress Invitation Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-gradient-to-b from-[#2E070C] via-[#230408] to-[#170204] rounded-2xl p-6 sm:p-12 md:p-16 border-2 border-[#D4AF37]/50 shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden"
        >
          {/* Ornate Corner Gold Accents */}
          <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-[#D4AF37]" />
          <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-[#D4AF37]" />

          {/* Inner Dashed Foil Border */}
          <div className="absolute inset-4 sm:inset-6 border border-dashed border-[#D4AF37]/30 rounded-xl pointer-events-none" />

          {/* Invitation Content */}
          <div className="relative z-10 text-center space-y-6 sm:space-y-8">
            
            {/* Top Deity Blessing / Shloka */}
            <div className="space-y-2">
              <div className="inline-flex items-center justify-center gap-2 text-[#D4AF37]">
                <span className="text-3xl font-serif">ॐ</span>
                <span className="text-sm tracking-widest font-cinzel">ஸ்ரீ கணேசாய நமஹ</span>
              </div>
              
              <div className="text-sm sm:text-base font-tamil text-[#F3E5AB]/95 max-w-lg mx-auto italic leading-relaxed py-1">
                <p>“அன்பும் அறனும் உடைத்தாயின் இல்வாழ்க்கை</p>
                <p className="mt-0.5">பண்பும் பயனும் அது.”</p>
              </div>
              <p className="text-[10px] sm:text-xs text-[#D4AF37]/75 font-montserrat uppercase tracking-wider">
                — {weddingData.sacredQuoteMeaning}
              </p>
            </div>

            <OrnamentalDivider variant="ganesha" />

            {/* Parents Cordial Solicitations */}
            <div className="space-y-2 max-w-xl mx-auto">
              <p className="font-montserrat text-xs sm:text-sm uppercase tracking-[0.25em] text-[#F3E5AB]">
                {isTamil ? "அன்புடையீர், வணக்கம்." : "With the blessings of our elders and Almighty"}
              </p>
              <h3 className="font-cinzel text-lg sm:text-2xl text-[#F9F6F0] font-semibold tracking-wide">
                {isTamil ? weddingData.brideTamilParents : weddingData.brideParents}
              </h3>
              <p className="font-cormorant text-base sm:text-lg text-[#F3E5AB]/85 italic">
                {isTamil
                  ? "தங்கள் குடும்ப சமேதராய் வருகை தந்து மணமக்களை வாழ்த்தியருளுமாறு அன்புடன் அழைக்கின்றோம்."
                  : "cordially solicit your esteemed presence and blessings, along with your family and friends, at the wedding of"}
              </p>
            </div>

            {/* Bride & Groom Centerpiece */}
            <div className="py-4 space-y-3">
              <div>
                <h2 className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-bold text-gold-shimmer tracking-wide">
                  {isTamil ? weddingData.brideTamilName : weddingData.brideName}
                </h2>
                <p className="font-montserrat text-xs sm:text-sm uppercase tracking-widest text-[#F5E6A8]/80 mt-1">
                  {weddingData.brideQualification} • {weddingData.brideCompany}
                </p>
                <p className="font-montserrat text-[11px] text-[#D4AF37]/75">
                  {isTamil ? "திரு. A. நடராஜன் - திருமதி. N. சுதா தம்பதியரின் குமாரத்தி" : "Daughter of Mr. A. Natarajan & Mrs. N. Sudha"}
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 py-1">
                <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                <span className="font-alex text-3xl sm:text-4xl text-[#FFF2BE]">&</span>
                <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
              </div>

              <div>
                <h2 className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-bold text-gold-shimmer tracking-wide">
                  {isTamil ? weddingData.groomTamilName : weddingData.groomName}
                </h2>
                <p className="font-montserrat text-xs sm:text-sm uppercase tracking-widest text-[#F5E6A8]/80 mt-1">
                  {weddingData.groomQualification} • {weddingData.groomCompany}
                </p>
                <p className="font-montserrat text-[11px] text-[#D4AF37]/75">
                  {isTamil ? "திரு. T.R. வெங்கடேஷ் - திருமதி. D.R. உமாசங்கரி தம்பதியரின் குமாரன்" : "Son of Mr. T.R. Venkatesh & Mrs. D.R. Umashankari"}
                </p>
              </div>
            </div>

            <OrnamentalDivider variant="lotus" />

            {/* Muhurtham & Venue Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-center">
              <div className="p-4 rounded-xl bg-[#1A0306]/70 border border-[#D4AF37]/20 flex flex-col items-center justify-center">
                <Calendar className="w-5 h-5 text-[#D4AF37] mb-2" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">Wedding Dates</span>
                <div className="font-cinzel text-xs sm:text-sm font-semibold text-[#F9F6F0] mt-1 text-center space-y-0.5">
                  <p>Saturday, 14th November 2026</p>
                  <p className="text-[#D4AF37] text-[11px] font-sans">&</p>
                  <p>Sunday, 15th November 2026</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#1A0306]/70 border border-[#D4AF37]/20 flex flex-col items-center">
                <Clock className="w-5 h-5 text-[#D4AF37] mb-2" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">Muhurtham Time</span>
                <p className="font-cinzel text-sm sm:text-base font-semibold text-[#F9F6F0] mt-1">
                  {weddingData.muhurthamTime}
                </p>
                <span className="text-[10px] text-[#F3E5AB]/70 font-tamil mt-0.5">
                  {weddingData.muhurthamLagnam}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#1A0306]/70 border border-[#D4AF37]/20 flex flex-col items-center">
                <MapPin className="w-5 h-5 text-[#D4AF37] mb-2" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">Venue</span>
                <p className="font-cinzel text-sm sm:text-base font-semibold text-[#F9F6F0] mt-1">
                  {isTamil ? weddingData.venueTamilName : weddingData.venueName}
                </p>
                <span className="text-[10px] text-[#F3E5AB]/70 font-montserrat mt-0.5">
                  Chengalpattu
                </span>
              </div>
            </div>

            {/* Best Compliments */}
            <div className="pt-4 text-xs font-montserrat text-[#F3E5AB]/80 tracking-wider">
              <span className="text-[#D4AF37] font-serif italic text-sm">
                "{weddingData.bestCompliments.closing}"
              </span>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
