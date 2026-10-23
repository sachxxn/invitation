import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';
import { MapPin, Navigation, Copy, Check, ExternalLink, Building2 } from 'lucide-react';

interface Props {
  isTamil: boolean;
}

export const VenueSection: React.FC<Props> = ({ isTamil }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${weddingData.venueName}, ${weddingData.venueAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="venue" className="relative py-24 sm:py-36 bg-[#0E0204] overflow-hidden">
      {/* Background Decorative Gradient */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-montserrat">
            <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{isTamil ? "திருமண மண்டபம்" : "The Venue & Location"}</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl text-[#F9F6F0] font-semibold mt-2">
            {isTamil ? weddingData.venueTamilName : weddingData.venueName}
          </h2>
          <p className="font-cormorant text-base sm:text-lg text-[#F3E5AB]/80 mt-1 italic">
            Kanchipuram Bypass Road, Chengalpattu, Tamil Nadu
          </p>
          <OrnamentalDivider variant="lotus" className="mt-4" />
        </div>

        {/* Layout: Venue Exterior Image & Map Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Venue Details & Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-6 rounded-2xl bg-gradient-to-b from-[#28050A] to-[#140204] border border-[#D4AF37]/40 p-6 sm:p-10 shadow-2xl flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="relative rounded-xl overflow-hidden border border-[#D4AF37]/30 h-56 sm:h-64 shadow-inner">
                <img
                  src="/images/venue.jpg"
                  alt="Shri Venkateswara Mahal Facade"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#150205] via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="font-cinzel text-lg text-gold-shimmer font-bold">
                    {weddingData.venueName}
                  </span>
                  <span className="block text-xs text-[#F3E5AB] font-montserrat">
                    Chengalpattu
                  </span>
                </div>
              </div>

              <div className="space-y-4 font-montserrat text-sm text-[#F3E5AB]">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#1A0306] border border-[#D4AF37]/20">
                  <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block font-bold">
                      Address • முகவரி
                    </span>
                    <p className="text-sm font-medium text-[#F9F6F0] mt-0.5">
                      {isTamil ? weddingData.venueTamilAddress : weddingData.venueAddress}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#1A0306] border border-[#D4AF37]/20">
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block">
                      Landmark
                    </span>
                    <span className="text-xs text-[#F9F6F0] font-semibold mt-0.5 block">
                      Kanchipuram Bypass Rd
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#1A0306] border border-[#D4AF37]/20">
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block">
                      City / District
                    </span>
                    <span className="text-xs text-[#F9F6F0] font-semibold mt-0.5 block">
                      Chengalpattu
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 mt-6 border-t border-[#D4AF37]/20 flex flex-wrap items-center gap-3">
              <a
                href={weddingData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#1A0306] font-cinzel text-xs uppercase tracking-[0.2em] font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 transition-all"
              >
                <Navigation className="w-4 h-4 fill-[#1A0306]" />
                <span>Open in Google Maps</span>
              </a>

              <button
                onClick={handleCopyAddress}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-[#D4AF37]/50 bg-[#1A0306] text-[#F5E6A8] text-xs font-montserrat tracking-wider hover:border-[#D4AF37] transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-[#D4AF37]" />}
                <span>{copied ? "Copied!" : "Copy Address"}</span>
              </button>
            </div>

          </motion.div>

          {/* Right Column: Google Maps Embed Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-6 rounded-2xl border border-[#D4AF37]/40 bg-[#1A0306] p-2 shadow-2xl relative overflow-hidden min-h-[400px]"
          >
            <iframe
              title="Shri Venkateswara Mahal Location"
              src={weddingData.googleMapsEmbedUrl}
              className="w-full h-full min-h-[400px] rounded-xl border-0 grayscale opacity-90 hover:grayscale-0 transition-all duration-500"
              loading="lazy"
              allowFullScreen
            />
            
            <div className="absolute bottom-4 right-4 bg-[#150205]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 text-[11px] text-[#F5E6A8] flex items-center gap-1.5 shadow-lg">
              <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Interactive Navigation Map</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
