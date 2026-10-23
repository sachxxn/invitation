import React from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';
import { Heart, Users } from 'lucide-react';

interface Props {
  isTamil: boolean;
}

export const FamilySection: React.FC<Props> = ({ isTamil }) => {
  return (
    <section id="family" className="relative py-24 sm:py-36 bg-[#110204] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#3B0910]/25 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-montserrat">
            <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{isTamil ? "குடும்பத்தினர் நல்வாழ்த்துக்கள்" : "Family Lineage & Blessings"}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl text-[#F9F6F0] font-semibold mt-2">
            With the Blessings of Our Families
          </h2>
          <p className="font-cormorant text-base sm:text-lg text-[#F3E5AB]/80 mt-1 italic">
            Honoring our esteemed elders, lineage, and beloved relations
          </p>
          <OrnamentalDivider variant="ganesha" className="mt-4" />
        </div>

        {/* Royal Symmetrical Invitation Lineage Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative rounded-2xl bg-gradient-to-b from-[#250509] via-[#1D0306] to-[#120204] border-2 border-[#D4AF37]/40 p-8 sm:p-14 shadow-2xl overflow-hidden"
        >
          {/* Ornamental Inner Gold Frame */}
          <div className="absolute inset-4 border border-dashed border-[#D4AF37]/25 rounded-xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 relative z-10">

            {/* Bride's Lineage (Right Column) */}
            <div className="text-center space-y-6">
              <div className="pb-3 border-b border-[#D4AF37]/30">
                <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-montserrat">
                  Bride's Family • மணமகள் வீட்டார்
                </span>
                <h3 className="font-cinzel text-2xl text-gold-shimmer font-bold mt-1">
                  N. Kaaviya
                </h3>
              </div>

              <div className="space-y-5 text-xs sm:text-sm font-montserrat text-[#F3E5AB]">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block mb-1.5 font-montserrat">
                    Parents • பெற்றோர்
                  </span>
                  <div className="font-semibold text-[#F9F6F0] text-sm sm:text-base font-tamil space-y-0.5">
                    <p>திரு. A. நடராஜன்</p>
                    <p>திருமதி. N. சுதா</p>
                  </div>
                  <div className="text-xs text-[#F3E5AB]/75 mt-1 font-montserrat space-y-0.5">
                    <p>Mr. A. Natarajan</p>
                    <p>Mrs. N. Sudha</p>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block mb-1.5 font-montserrat">
                    Grandparents • பாட்டனார் - பாட்டியார்
                  </span>
                  <div className="font-tamil text-xs sm:text-sm leading-relaxed text-[#F3E5AB]/90 space-y-0.5">
                    <p>திரு. P.A. அழகேச முதலியார்</p>
                    <p>தெய்வத்திருமதி. A. பொன்னம்மாள்</p>
                    <p className="text-[#F3E5AB]/75 text-[11px] sm:text-xs pt-0.5">(ஒரக்காட்டுப்பேட்டை)</p>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block mb-1.5 font-montserrat">
                    Great Grandparents • கொள்ளுப் பாட்டனார்
                  </span>
                  <div className="font-tamil text-xs sm:text-sm leading-relaxed text-[#F3E5AB]/80 space-y-0.5">
                    <p>தெய்வத்திருவாளர்கள் பரமானந்த முதலியார்</p>
                    <p>பாக்கியம்மாள்</p>
                  </div>
                </div>

                <div className="pt-2 text-xs sm:text-sm text-[#D4AF37] font-tamil font-medium">
                  <span>📍 {weddingData.brideLineage.location}</span>
                </div>
              </div>
            </div>

            {/* Groom's Lineage (Right Column) */}
            <div className="text-center space-y-6">
              <div className="pb-3 border-b border-[#D4AF37]/30">
                <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-montserrat">
                  Groom's Family • மணமகன் வீட்டார்
                </span>
                <h3 className="font-cinzel text-2xl text-gold-shimmer font-bold mt-1">
                  R.V. Thyaneshwar
                </h3>
              </div>

              <div className="space-y-5 text-xs sm:text-sm font-montserrat text-[#F3E5AB]">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block mb-1.5 font-montserrat">
                    Parents • பெற்றோர்
                  </span>
                  <div className="font-semibold text-[#F9F6F0] text-sm sm:text-base font-tamil space-y-0.5">
                    <p>திரு. T.R. வெங்கடேஷ்</p>
                    <p>திருமதி. D.R. உமாசங்கரி</p>
                  </div>
                  <div className="text-xs text-[#F3E5AB]/75 mt-1 font-montserrat space-y-0.5">
                    <p>Mr. T.R. Venkatesh</p>
                    <p>Mrs. D.R. Umashankari</p>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block mb-1.5 font-montserrat">
                    Grandparents • பாட்டனார் - பாட்டியார்
                  </span>
                  <div className="font-tamil text-xs sm:text-sm leading-relaxed text-[#F3E5AB]/90 space-y-0.5">
                    <p>தெய்வத்திரு. D.V. ராமலிங்கம் முதலியார்</p>
                    <p>தெய்வத்திருமதி. ராணியம்மாள்</p>
                    <p className="text-[#F3E5AB]/75 text-[11px] sm:text-xs pt-0.5">(அச்சரப்பாக்கம்)</p>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block mb-1.5 font-montserrat">
                    Great Grandparents • கொள்ளுப் பாட்டனார்
                  </span>
                  <div className="font-tamil text-xs sm:text-sm leading-relaxed text-[#F3E5AB]/80 space-y-0.5">
                    <p>தெய்வத்திருவாளர்கள் Ve.Ra. ராஜமாணிக்கம் முதலியார்</p>
                    <p>கண்ணம்மாள்</p>
                  </div>
                </div>

                <div className="pt-2 text-xs sm:text-sm text-[#D4AF37] font-tamil font-medium">
                  <span>📍 {weddingData.groomLineage.location}</span>
                </div>
              </div>
            </div>



          </div>

          <OrnamentalDivider variant="lotus" className="my-8" />

          {/* Compliments & Family Relatives Banner */}
          <div className="text-center space-y-3.5 max-w-2xl mx-auto">
            <p className="font-cinzel text-sm sm:text-base text-gold-shimmer font-semibold uppercase tracking-widest">
              {weddingData.bestCompliments.closing}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-tamil text-[#F3E5AB]/90">
              {weddingData.bestCompliments.youth.map((name, i) => (
                <span key={i} className="px-4 py-1.5 rounded-full bg-[#1A0306] border border-[#D4AF37]/35 shadow-md">
                  {name}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-[#D4AF37] font-montserrat pt-2">
              <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]/40" />
              <span>{weddingData.bestCompliments.subClosing || "With Love & Regards from All Relatives & Friends"}</span>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
