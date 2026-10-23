import React from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/weddingData';
import type { EventItem } from '../types/wedding';

import { OrnamentalDivider } from './OrnamentalDivider';
import { createGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';
import { Calendar, Clock, MapPin, Sparkles, HeartHandshake, Flame, Crown, ExternalLink, Download } from 'lucide-react';

interface Props {
  isTamil: boolean;
}

export const EventsTimeline: React.FC<Props> = ({ isTamil }) => {
  const getEventIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-6 h-6 text-[#D4AF37]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-[#D4AF37]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#D4AF37]" />;
      case 'Crown':
        return <Crown className="w-6 h-6 text-[#D4AF37]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="events" className="relative py-24 sm:py-36 bg-[#0E0204] overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-montserrat">
            {isTamil ? "நிகழ்ச்சி நிரல்" : "Program of Celebrations"}
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl text-[#F9F6F0] font-semibold mt-2">
            {isTamil ? "மங்கல நிகழ்ச்சிகள்" : "The Sacred Ceremonies"}
          </h2>
          <p className="font-cormorant text-base sm:text-lg text-[#F3E5AB]/80 mt-2 italic">
            Join us in honoring centuries of South Indian royal tradition, music, and festivities
          </p>
          <OrnamentalDivider variant="mandala" className="mt-4" />
        </div>

        {/* 4 Events Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {weddingData.events.map((event: EventItem, index: number) => {
            const isMuhurtham = event.id === 'muhurtham';
            const googleCalUrl = createGoogleCalendarUrl(event, weddingData.venueName);

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`relative rounded-2xl overflow-hidden border ${
                  isMuhurtham
                    ? 'border-[#D4AF37] bg-gradient-to-b from-[#3B0910] via-[#230408] to-[#170204] shadow-[0_0_40px_rgba(212,175,55,0.25)]'
                    : 'border-[#D4AF37]/35 bg-gradient-to-b from-[#230408] to-[#120204]'
                } p-6 sm:p-8 flex flex-col justify-between group hover:border-[#D4AF37] transition-all duration-500`}
              >
                {/* Highlight Badge for Muhurtham */}
                {isMuhurtham && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-[#D4AF37] to-[#B8860B] text-[#1A0306] px-4 py-1 rounded-bl-xl text-[10px] uppercase font-bold tracking-widest font-montserrat shadow-md">
                    Subha Muhurtham • சுபமுகூர்த்தம்
                  </div>
                )}

                <div>
                  {/* Header & Icon */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full border border-[#D4AF37]/50 bg-[#1A0306] flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getEventIcon(event.iconName)}
                    </div>
                    <div>
                      <h3 className="font-cinzel text-xl sm:text-2xl text-gold-shimmer font-bold">
                        {isTamil ? event.tamilTitle : event.title}
                      </h3>
                      <p className="text-xs text-[#D4AF37]/80 font-montserrat tracking-wider">
                        {event.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Date & Time Pills */}
                  <div className="space-y-2 my-4 text-xs sm:text-sm font-montserrat text-[#F3E5AB]">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-[#D4AF37]" />
                      <span className="font-semibold">{isTamil ? event.tamilDate : event.date}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#D4AF37]" />
                      <span>{event.time}</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span>{isTamil ? event.tamilVenue : event.venue} ({event.address})</span>
                    </div>
                  </div>

                  {/* Event Image Banner */}
                  <div className="relative rounded-xl overflow-hidden my-4 border border-[#D4AF37]/30 h-44">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#150205] via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Description */}
                  <p className="font-cormorant text-base sm:text-lg text-[#F3E5AB]/90 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Add to Calendar Actions */}
                <div className="pt-6 mt-6 border-t border-[#D4AF37]/20 flex flex-wrap items-center gap-3">
                  <a
                    href={googleCalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#D4AF37]/50 bg-[#2E070C]/80 text-[#F5E6A8] text-xs font-montserrat font-semibold tracking-wider hover:bg-[#3B0910] hover:border-[#D4AF37] transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Google Calendar</span>
                  </a>

                  <button
                    onClick={() => downloadIcsFile(event, weddingData.venueName)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#D4AF37]/30 bg-[#1A0306]/80 text-[#F3E5AB]/85 text-xs font-montserrat hover:border-[#D4AF37] hover:text-[#F5E6A8] transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>iCal / Outlook</span>
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
