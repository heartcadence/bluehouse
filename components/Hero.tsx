import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface HeroProps {
  isDarkMode: boolean;
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ isDarkMode, onCtaClick }) => {
  const textColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  
  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="https://pub-698e84d3fce74dc6b4b08c5f5d041da0.r2.dev/hero2.avif" media="(min-width: 769px)" type="image/avif" />
          <img
            src="https://pub-698e84d3fce74dc6b4b08c5f5d041da0.r2.dev/hero2.avif"
            alt="Modern Architectural House"
            className={`w-full h-full object-cover transition-opacity duration-700 ${isDarkMode ? 'opacity-30' : 'opacity-90'}`}
          />
        </picture>
        <div className={`absolute inset-0 bg-gradient-to-b ${isDarkMode ? 'from-deep-teal/90 via-deep-teal/50 to-deep-teal' : 'from-light-bg/80 via-light-bg/40 to-light-bg'}`}></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-[-40px]">
        <h2 className="text-muted-gold uppercase tracking-[0.3em] text-xs md:text-sm mb-6 animate-slide-up">Bluehouse Planning & Designs</h2>
        <h1 className={`font-display text-6xl md:text-8xl lg:text-9xl mb-10 leading-none ${textColor} animate-slide-up animation-delay-200`}>
          Visionary <br/> <span className="italic text-muted-gold">Architecture</span>
        </h1>
        <div className="mt-8 animate-slide-up animation-delay-400 flex flex-col items-center">
          <button onClick={onCtaClick} className="px-10 py-4 bg-muted-gold text-deep-teal font-bold tracking-[0.2em] uppercase text-xs rounded-sm hover:bg-off-white transition-all duration-300 shadow-lg">
            Find My Dream Home
          </button>
          <div className="mt-8 flex flex-col items-center space-y-2">
            <span className={`text-[10px] uppercase tracking-widest font-bold ${isDarkMode ? 'text-muted-gold' : 'text-deep-teal'}`}>BCIN Registered • Ontario Building Code Compliant</span>
            <div className="flex items-center space-x-2 opacity-70">
              <ShieldCheck className="w-3 h-3 text-muted-gold" />
              <span className={`text-[9px] uppercase tracking-widest font-light ${isDarkMode ? 'text-off-white' : 'text-deep-teal'}`}>Verified Local Expertise</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;