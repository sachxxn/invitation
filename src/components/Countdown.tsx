import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import { Clock, Heart } from 'lucide-react';

interface Props {
  isTamil: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown: React.FC<Props> = ({ isTamil }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(weddingData.weddingIsoDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { labelEn: "Days", labelTa: "நாட்கள்", value: timeLeft.days },
    { labelEn: "Hours", labelTa: "மணி", value: timeLeft.hours },
    { labelEn: "Minutes", labelTa: "நிமிடங்கள்", value: timeLeft.minutes },
    { labelEn: "Seconds", labelTa: "விநாடிகள்", value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="relative py-16 sm:py-24 bg-[#120306] border-y border-[#D4AF37]/20 overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-2 mb-10"
        >
          <div className="inline-flex items-center gap-2 text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-montserrat">
            <Clock className="w-3.5 h-3.5" />
            <span>{isTamil ? "சுபமுகூர்த்த தருணம் நோக்கி" : "Counting Down to the Auspicious Hour"}</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-4xl text-[#F9F6F0] font-semibold">
            {isTamil ? "திருமண நாள் நெருங்குகிறது" : "The Sacred Union Awaits"}
          </h2>
          <p className="font-cormorant text-sm sm:text-base text-[#F3E5AB]/90 italic">
            Saturday, 14th & Sunday, 15th November 2026 • Muhurtham: 15th Nov, 7:30 AM
          </p>
        </motion.div>

        {/* Countdown Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {timeUnits.map((unit, idx) => (
            <motion.div
              key={unit.labelEn}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative p-5 sm:p-7 rounded-2xl bg-gradient-to-b from-[#2E070C] to-[#170204] border border-[#D4AF37]/40 shadow-[0_0_30px_rgba(0,0,0,0.5)] group hover:border-[#D4AF37] transition-all"
            >
              {/* Corner decorative dots */}
              <span className="absolute top-2 left-2 w-1 h-1 rounded-full bg-[#D4AF37]/50" />
              <span className="absolute top-2 right-2 w-1 h-1 rounded-full bg-[#D4AF37]/50" />
              <span className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-[#D4AF37]/50" />
              <span className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-[#D4AF37]/50" />

              <div className="flex flex-col items-center">
                <span className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold text-gold-shimmer tabular-nums">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#F3E5AB]/85 font-montserrat mt-2">
                  {isTamil ? unit.labelTa : unit.labelEn}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Supporting Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-2 text-xs sm:text-sm text-[#D4AF37]/80 font-montserrat"
        >
          <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]/30" />
          <span>Every second brings us closer to forever</span>
        </motion.div>

      </div>
    </section>
  );
};
