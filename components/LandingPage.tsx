import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Storefront from './components/Storefront';
import About from './components/About';
import Footer from './components/Footer';

const LandingPage: React.FC = () => {
  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Storefront Filtering & Portfolio Hook State
  const [activeCategory, setActiveCategory] = useState('All');
  const [highlightedPlanId, setHighlightedPlanId] = useState<string | null>(null);

  // Toggle Dark Mode
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  /**
   * The "Portfolio Hook" Function
   * Triggered when a user clicks "Get These Plans" inside a Portfolio Project.
   */
  const handleViewPlan = (planId: string, category: string) => {
    // 1. Set the shop filter so the specific plan is visible
    setActiveCategory(category);
    
    // 2. Set the ID to trigger the 'Pulse' animation in Storefront/ProductCard
    setHighlightedPlanId(planId);
    
    // 3. Smooth scroll to the storefront section
    const storefrontSection = document.getElementById('storefront');
    if (storefrontSection) {
      storefrontSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // 4. Clear the highlight after 4 seconds so it doesn't stay forever
    setTimeout(() => {
      setHighlightedPlanId(null);
    }, 4000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode ? 'bg-deep-teal-dark text-off-white' : 'bg-light-bg text-deep-teal'
    }`}>
      {/* Navigation Layer */}
      <Navigation 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
      />

      <main>
        {/* Hero Section */}
        <section id="hero">
          <Hero isDarkMode={isDarkMode} />
        </section>

        {/* Portfolio Section (Vision to Reality) */}
        <section id="portfolio" className="py-20 border-t border-muted-gold/10">
          <Portfolio 
            isDarkMode={isDarkMode} 
            onViewPlan={handleViewPlan} 
          />
        </section>

        {/* Storefront Section (The Shop) */}
        <section id="storefront" className="py-20 bg-opacity-50">
          <Storefront 
            isDarkMode={isDarkMode}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            highlightedPlanId={highlightedPlanId}
          />
        </section>

        {/* About Section (The Real Person Bio) */}
        <section id="about" className="py-20 border-t border-muted-gold/10">
          <About isDarkMode={isDarkMode} />
        </section>
      </main>

      {/* Footer Layer */}
      <Footer isDarkMode={isDarkMode} />

      {/* Global CSS for the Pulse Animation Hook */}
      <style jsx global>{`
        @keyframes plan-pulse {
          0% { box-shadow: 0 0 0 0 rgba(184, 134, 11, 0.7); transform: scale(1); }
          50% { box-shadow: 0 0 25px 10px rgba(184, 134, 11, 0.4); transform: scale(1.02); }
          100% { box-shadow: 0 0 0 0 rgba(184, 134, 11, 0); transform: scale(1); }
        }
        .animate-pulse-gold {
          animation: plan-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          border: 2px solid #B8860B !important;
          z-index: 10;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;