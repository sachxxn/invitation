import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Heart } from 'lucide-react';

interface Props {
  isTamil: boolean;
  onToggleLanguage: () => void;
}

export const Navbar: React.FC<Props> = ({ isTamil, onToggleLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#hero", labelEn: "Home", labelTa: "முகப்பு" },
    { href: "#invitation", labelEn: "Invitation", labelTa: "அழைப்பிதழ்" },
    { href: "#couple", labelEn: "Couple", labelTa: "மணமக்கள்" },
    { href: "#events", labelEn: "Events", labelTa: "நிகழ்ச்சிகள்" },
    { href: "#countdown", labelEn: "Muhurtham", labelTa: "முகூர்த்தம்" },
    { href: "#family", labelEn: "Family", labelTa: "குடும்பம்" },
    { href: "#venue", labelEn: "Venue", labelTa: "மண்டபம்" },
    { href: "#rsvp", labelEn: "RSVP", labelTa: "வருகை பதிவு" },
  ];


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "glass-gold-nav py-3.5 shadow-2xl shadow-black/60"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monogram Brand */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full border border-[#D4AF37]/60 flex items-center justify-center bg-[#230408]/80 group-hover:border-[#D4AF37] transition-all">
            <span className="font-cinzel-dec text-sm text-gold-gradient font-bold">KT</span>
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-sm sm:text-base tracking-widest text-[#F9F6F0] group-hover:text-[#F3E5AB] transition-colors">
              KAAVIYA & THYANESHWAR
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37]/80 font-montserrat">
              Nov 14 & 15, 2026 • Chengalpattu
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] text-[#F3E5AB]/85 hover:text-[#D4AF37] transition-colors font-montserrat relative group py-1"
            >
              {isTamil ? link.labelTa : link.labelEn}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#D4AF37] to-transparent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Language Switcher & Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#28050A]/70 text-[#F5E6A8] text-xs font-montserrat tracking-wider hover:border-[#D4AF37] hover:bg-[#3B0910] transition-all"
            title="Toggle English / தமிழ்"
          >
            <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-medium">{isTamil ? "English" : "தமிழ்"}</span>
          </button>

          <a
            href="#rsvp"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#1A0306] text-xs uppercase tracking-widest font-semibold font-montserrat shadow-md hover:brightness-110 transition-all"
          >
            <Heart className="w-3.5 h-3.5 fill-[#1A0306]" />
            <span>RSVP</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#F5E6A8] hover:text-[#D4AF37] focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-gold-nav border-t border-[#D4AF37]/20 px-6 py-6 mt-3 space-y-4 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-[0.2em] text-[#F3E5AB] hover:text-[#D4AF37] py-2 border-b border-[#D4AF37]/10"
            >
              {isTamil ? link.labelTa : link.labelEn}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#rsvp"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#1A0306] text-xs uppercase tracking-widest font-bold"
            >
              <Heart className="w-4 h-4 fill-[#1A0306]" />
              <span>RSVP Now</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
