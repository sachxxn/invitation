import { useState } from 'react';

import { weddingData } from './data/weddingData';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InvitationReveal } from './components/InvitationReveal';
import { CoupleSection } from './components/CoupleSection';
import { EventsTimeline } from './components/EventsTimeline';

import { Countdown } from './components/Countdown';
import { FamilySection } from './components/FamilySection';
import { VenueSection } from './components/VenueSection';
import { RSVP } from './components/RSVP';
import { Footer } from './components/Footer';
import { AudioPlayer } from './components/AudioPlayer';

export function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTamil, setIsTamil] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D0204] text-[#F9F6F0] selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
      {/* Royal Preloader */}
      {!isLoaded && (
        <Preloader
          brideName={weddingData.brideName}
          groomName={weddingData.groomName}
          onComplete={() => setIsLoaded(true)}
        />
      )}

      {/* Main Website Content */}
      <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Navigation Bar */}
        <Navbar
          isTamil={isTamil}
          onToggleLanguage={() => setIsTamil(!isTamil)}
        />

        {/* Hero Landing */}
        <HeroSection isTamil={isTamil} />

        {/* Unfolding Invitation Card */}
        <InvitationReveal isTamil={isTamil} />

        {/* Live Muhurtham Countdown */}
        <Countdown isTamil={isTamil} />

        {/* Bride & Groom Spotlight */}
        <CoupleSection isTamil={isTamil} />

        {/* 4 Sacred Events Timeline */}
        <EventsTimeline isTamil={isTamil} />


        {/* Family Lineage & Blessings */}
        <FamilySection isTamil={isTamil} />

        {/* Venue & Interactive Map */}
        <VenueSection isTamil={isTamil} />

        {/* Interactive RSVP Form */}
        <RSVP isTamil={isTamil} />

        {/* Footer */}
        <Footer isTamil={isTamil} />

        {/* Floating Classical Shehnai / Flute Audio Player */}
        <AudioPlayer />
      </div>
    </div>
  );
}

export default App;
