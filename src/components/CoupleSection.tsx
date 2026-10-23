import React from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';
import { Briefcase, Award } from 'lucide-react';

interface Props {
  isTamil: boolean;
}

export const CoupleSection: React.FC<Props> = ({ isTamil }) => {
  return (
    <section id="couple" className="relative py-24 sm:py-36 bg-[#0E0204] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-montserrat">
            {isTamil ? "மணமக்கள் அறிமுகம்" : "The Blessed Couple"}
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl text-[#F9F6F0] font-semibold mt-2">
            {isTamil ? "இருமனம் இணையும் நன்னாள்" : "Two Souls, One Sacred Destiny"}
          </h2>
          <OrnamentalDivider variant="lotus" className="mt-4" />
        </div>

        {/* Editorial Layout: Groom on Left, Couple Portrait Center, Bride on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Groom Card (Desktop Left, matching Groom in photo) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-4 p-8 rounded-2xl bg-gradient-to-br from-[#2B070B]/90 via-[#1D0306]/90 to-[#120204]/90 border border-[#D4AF37]/35 shadow-2xl relative order-2 lg:order-1 text-center lg:text-right space-y-4"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F5E6A8] text-[11px] uppercase tracking-widest font-montserrat">
              The Groom • மணமகன்
            </div>
            
            <h3 className="font-cinzel text-2xl sm:text-3xl text-gold-shimmer font-bold">
              {isTamil ? weddingData.groomTamilName : weddingData.groomName}
            </h3>

            <div className="flex items-center justify-center lg:justify-end gap-2 text-xs sm:text-sm text-[#F3E5AB]">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-medium">{weddingData.groomQualification}</span>
            </div>

            <div className="flex items-center justify-center lg:justify-end gap-2 text-xs text-[#F3E5AB]/80">
              <Briefcase className="w-4 h-4 text-[#D4AF37]" />
              <span>{weddingData.groomCompany}</span>
            </div>

            <div className="pt-4 border-t border-[#D4AF37]/15 space-y-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] block font-montserrat">
                Parents • பெற்றோர்
              </span>
              <div className="font-semibold text-sm sm:text-base text-[#F9F6F0] font-tamil leading-snug">
                <p>திரு. T.R. வெங்கடேஷ்</p>
                <p>திருமதி. D.R. உமாசங்கரி</p>
              </div>
              <div className="text-xs text-[#F3E5AB]/80 font-montserrat leading-snug pt-0.5">
                <p>Mr. T.R. Venkatesh</p>
                <p>Mrs. D.R. Umashankari</p>
              </div>
              <p className="text-xs text-[#D4AF37]/90 font-tamil pt-1">
                📍 {weddingData.groomLineage.location}
              </p>
            </div>
          </motion.div>

          {/* Central Portrait Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-4 relative flex justify-center order-1 lg:order-2"
          >
            <div className="relative group max-w-sm sm:max-w-md w-full">
              {/* Gold Glow & Frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#D4AF37] via-[#FFF2BE] to-[#996515] opacity-40 blur-lg group-hover:opacity-70 transition duration-1000" />
              
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37] bg-[#1F0408] aspect-[3/4] shadow-2xl">
                <img
                  src="/images/couple.jpg"
                  alt="Kaaviya & Thyaneshwar"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#150205] via-transparent to-transparent opacity-80" />

                {/* Bottom Overlay Quote */}
                <div className="absolute bottom-6 left-4 right-4 text-center">
                  <p className="font-alex text-2xl sm:text-3xl text-[#FFF2BE] drop-shadow-md">
                    "Two hearts, one beautiful journey."
                  </p>
                  <p className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#D4AF37] mt-1">
                    Thyaneshwar & Kaaviya
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bride Card (Desktop Right, matching Bride in photo) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-4 p-8 rounded-2xl bg-gradient-to-br from-[#2B070B]/90 via-[#1D0306]/90 to-[#120204]/90 border border-[#D4AF37]/35 shadow-2xl relative order-3 text-center lg:text-left space-y-4"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#F5E6A8] text-[11px] uppercase tracking-widest font-montserrat">
              The Bride • மணமகள்
            </div>
            
            <h3 className="font-cinzel text-2xl sm:text-3xl text-gold-shimmer font-bold">
              {isTamil ? weddingData.brideTamilName : weddingData.brideName}
            </h3>

            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-[#F3E5AB]">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-medium">{weddingData.brideQualification}</span>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-[#F3E5AB]/80">
              <Briefcase className="w-4 h-4 text-[#D4AF37]" />
              <span>{weddingData.brideCompany}</span>
            </div>

            <div className="pt-4 border-t border-[#D4AF37]/15 space-y-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] block font-montserrat">
                Parents • பெற்றோர்
              </span>
              <div className="font-semibold text-sm sm:text-base text-[#F9F6F0] font-tamil leading-snug">
                <p>திரு. A. நடராஜன்</p>
                <p>திருமதி. N. சுதா</p>
              </div>
              <div className="text-xs text-[#F3E5AB]/80 font-montserrat leading-snug pt-0.5">
                <p>Mr. A. Natarajan</p>
                <p>Mrs. N. Sudha</p>
              </div>
              <p className="text-xs text-[#D4AF37]/90 font-tamil pt-1">
                📍 {weddingData.brideLineage.location}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
