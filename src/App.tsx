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
import AudioPlayer from './components/AudioPlayer';

export function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTamil, setIsTamil] = useState(false);

  const handlePreloaderComplete = () => {
    setIsLoaded(true);
  };

  return (
    <div className="min-h-screen bg-[#0D0204] text-[#F9F6F0] selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
      {/* Background Music — starts on the first user click */}
      <AudioPlayer />

      {/* Royal Preloader */}
      {!isLoaded && (
        <Preloader
          brideName={weddingData.brideName}
          groomName={weddingData.groomName}
          onComplete={handlePreloaderComplete}
        />
      )}

      {/* Main Website Content */}
      <div
        className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <Navbar
          isTamil={isTamil}
          onToggleLanguage={() => setIsTamil(!isTamil)}
        />

        <HeroSection isTamil={isTamil} />

        <InvitationReveal isTamil={isTamil} />

        <Countdown isTamil={isTamil} />

        <CoupleSection isTamil={isTamil} />

        <EventsTimeline isTamil={isTamil} />

        <FamilySection isTamil={isTamil} />

        <VenueSection isTamil={isTamil} />

        <RSVP isTamil={isTamil} />

        <Footer isTamil={isTamil} />
      </div>
    </div>
  );
}

export default App;