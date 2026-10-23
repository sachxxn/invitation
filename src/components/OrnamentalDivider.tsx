import React from 'react';

interface Props {
  className?: string;
  variant?: 'lotus' | 'mandala' | 'ganesha' | 'simple';
}

export const OrnamentalDivider: React.FC<Props> = ({ className = '', variant = 'lotus' }) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-6 select-none ${className}`}>
      {/* Left Gold Line */}
      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
      
      {/* Center Motif */}
      {variant === 'ganesha' && (
        <div className="text-[#D4AF37] px-2 flex items-center gap-2">
          <span className="text-xl">ॐ</span>
          <svg className="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
          <span className="text-xl">卐</span>
        </div>
      )}

      {variant === 'lotus' && (
        <div className="text-[#D4AF37] flex items-center gap-1.5 px-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <svg className="w-6 h-6 text-[#D4AF37] animate-pulse-glow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18C8.5 7 4 11 4 15a8 8 0 0016 0c0-4-4.5-8-8-12zM12 21c-2.5-2-4.5-5-4.5-7.5a4.5 4.5 0 019 0c0 2.5-2 5.5-4.5 7.5z" />
          </svg>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
        </div>
      )}

      {variant === 'mandala' && (
        <div className="text-[#D4AF37] flex items-center gap-2">
          <span className="rotate-45 block w-2 h-2 border border-[#D4AF37] bg-[#D4AF37]/20" />
          <span className="rotate-45 block w-3 h-3 border border-[#D4AF37] bg-[#D4AF37]" />
          <span className="rotate-45 block w-2 h-2 border border-[#D4AF37] bg-[#D4AF37]/20" />
        </div>
      )}

      {variant === 'simple' && (
        <div className="text-[#D4AF37] px-2">
          <span className="rotate-45 block w-2 h-2 border border-[#D4AF37] bg-[#D4AF37]" />
        </div>
      )}

      {/* Right Gold Line */}
      <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-[#D4AF37]/60 to-[#D4AF37]" />
    </div>
  );
};
