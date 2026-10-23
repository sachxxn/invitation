import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { OrnamentalDivider } from './OrnamentalDivider';
import { Send, CheckCircle2, Heart } from 'lucide-react';


interface Props {
  isTamil: boolean;
}

interface RsvpState {
  name: string;
  contact: string;
  guests: number;
  attendance: 'accept' | 'decline';
  message: string;
}

export const RSVP: React.FC<Props> = ({ isTamil }) => {
  const [formData, setFormData] = useState<RsvpState>({
    name: '',
    contact: '',
    guests: 1,
    attendance: 'accept',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('wedding_rsvp_kaaviya_thyaneshwar');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
        setSubmitted(true);
      } catch {
        // invalid cache
      }
    }
  }, []);

  const triggerCelebrationConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFF2BE', '#996515', '#F5E6A8', '#FFD700'],
      });
    } catch {
      // fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    localStorage.setItem('wedding_rsvp_kaaviya_thyaneshwar', JSON.stringify(formData));
    setSubmitted(true);
    if (formData.attendance === 'accept') {
      triggerCelebrationConfetti();
    }
  };

  const handleReset = () => {
    localStorage.removeItem('wedding_rsvp_kaaviya_thyaneshwar');
    setSubmitted(false);
  };

  return (
    <section id="rsvp" className="relative py-24 sm:py-36 bg-[#0E0204] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3B0910]/30 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-montserrat">
            <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
            <span>{isTamil ? "வருகை உறுதிப்பாடு" : "RSVP & Blessings"}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl text-[#F9F6F0] font-semibold mt-2">
            Will You Join Us?
          </h2>
          <p className="font-cormorant text-base sm:text-lg text-[#F3E5AB]/85 mt-1 italic">
            Your presence would make our celebration even more special
          </p>
          <OrnamentalDivider variant="lotus" className="mt-4" />
        </div>

        {/* The Luxury Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl bg-gradient-to-b from-[#28050A] via-[#1D0306] to-[#140204] border-2 border-[#D4AF37]/40 p-6 sm:p-12 shadow-2xl relative"
        >
          {/* Inner Decorative Dashed Frame */}
          <div className="absolute inset-4 border border-dashed border-[#D4AF37]/20 rounded-xl pointer-events-none" />

          {submitted ? (
            /* Confirmation Screen */
            <div className="relative z-10 text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] bg-[#1A0306] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                <CheckCircle2 className="w-8 h-8 text-[#D4AF37]" />
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl text-gold-shimmer font-bold">
                {formData.attendance === 'accept'
                  ? "Thank You! We Can't Wait to Celebrate With You!"
                  : "Thank You for Sending Your Warm Wishes"}
              </h3>

              <p className="font-cormorant text-lg text-[#F3E5AB]/90 max-w-md mx-auto leading-relaxed">
                {formData.attendance === 'accept'
                  ? `Your RSVP for ${formData.guests} guest(s) has been recorded with honor for Kaaviya & Thyaneshwar's royal wedding.`
                  : `Your heartfelt wishes have reached Kaaviya & Thyaneshwar and their families.`}
              </p>

              <div className="p-4 rounded-xl bg-[#1A0306] border border-[#D4AF37]/20 max-w-sm mx-auto text-xs font-montserrat text-[#F3E5AB] space-y-1 text-left">
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Contact:</strong> {formData.contact || 'N/A'}</p>
                <p><strong>Attendance:</strong> {formData.attendance === 'accept' ? 'Joyfully Accept' : 'Regretfully Decline'}</p>
                {formData.message && <p><strong>Message:</strong> "{formData.message}"</p>}
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 rounded-full border border-[#D4AF37]/40 text-[#F5E6A8] text-xs font-montserrat uppercase tracking-wider hover:border-[#D4AF37] hover:bg-[#3B0910] transition-all"
                >
                  Edit Response
                </button>
              </div>
            </div>
          ) : (
            /* RSVP Input Form */
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-widest text-[#D4AF37] font-montserrat font-medium">
                  Full Name • முழு பெயர் *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl bg-[#150205] border border-[#D4AF37]/30 text-[#F9F6F0] placeholder-[#D4AF37]/40 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-sm font-montserrat"
                  />
                </div>
              </div>

              {/* Email or Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-widest text-[#D4AF37] font-montserrat font-medium">
                    Phone / Email • தொடர்பு விவரம்
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="Mobile number or email"
                      className="w-full px-4 py-3 rounded-xl bg-[#150205] border border-[#D4AF37]/30 text-[#F9F6F0] placeholder-[#D4AF37]/40 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-sm font-montserrat"
                    />
                  </div>
                </div>

                {/* Number of Guests */}
                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-widest text-[#D4AF37] font-montserrat font-medium">
                    Number of Guests • வருகை தரும் நபர்கள்
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-[#150205] border border-[#D4AF37]/30 text-[#F9F6F0] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-sm font-montserrat cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num} className="bg-[#150205] text-[#F9F6F0]">
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Attendance Selection */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-[#D4AF37] font-montserrat font-medium">
                  Will You Attend? • வருகை உறுதி
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendance: 'accept' })}
                    className={`py-3.5 px-4 rounded-xl border font-montserrat text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      formData.attendance === 'accept'
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#1A0306] border-[#D4AF37] shadow-lg'
                        : 'bg-[#150205] text-[#F3E5AB]/70 border-[#D4AF37]/30 hover:border-[#D4AF37]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${formData.attendance === 'accept' ? 'fill-[#1A0306]' : ''}`} />
                    <span>Joyfully Accept</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, attendance: 'decline' })}
                    className={`py-3.5 px-4 rounded-xl border font-montserrat text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      formData.attendance === 'decline'
                        ? 'bg-[#3B0910] text-[#F5E6A8] border-[#D4AF37]'
                        : 'bg-[#150205] text-[#F3E5AB]/70 border-[#D4AF37]/30 hover:border-[#D4AF37]'
                    }`}
                  >
                    <span>Regretfully Decline</span>
                  </button>
                </div>
              </div>

              {/* Message for Couple */}
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-widest text-[#D4AF37] font-montserrat font-medium">
                  Warm Wishes / Message • நல்வாழ்த்துக்கள்
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share your love, congratulations, or special notes for Kaaviya & Thyaneshwar..."
                  className="w-full px-4 py-3 rounded-xl bg-[#150205] border border-[#D4AF37]/30 text-[#F9F6F0] placeholder-[#D4AF37]/40 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-sm font-montserrat"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF2BE] to-[#D4AF37] text-[#1A0306] font-cinzel text-sm uppercase tracking-[0.25em] font-bold shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 fill-[#1A0306]" />
                  <span>Submit RSVP</span>
                </button>
              </div>

            </form>
          )}

        </motion.div>

      </div>
    </section>
  );
};
