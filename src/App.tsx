import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from './components/SEO';

// Lazy load LandingPage for code splitting
const LandingPage = lazy(() => import('../components/LandingPage'));

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  // Default activeView set to 'contact' per client requirement
  const [activeView, setActiveView] = useState<'collection' | 'contact' | 'about' | 'portfolio'>('contact');
  
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    document.body.className = isDarkMode ? 'bg-deep-teal text-off-white' : 'bg-light-bg text-deep-teal';
  }, [isDarkMode]);

  const handleViewChange = (view: 'collection' | 'contact' | 'about' | 'portfolio') => {
    setActiveView(view);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  // Generate dynamic SEO properties based on the active view
  const getSeoProps = () => {
    switch(activeView) {
      case 'collection': 
        return { 
          title: 'The Collection', 
          description: 'Explore our curated collection of architectural plans and designs.' 
        };
      case 'portfolio': 
        return { 
          title: 'Portfolio', 
          description: 'View our portfolio of executed visions and completed projects in Ontario.' 
        };
      case 'about': 
        return { 
          title: 'About Us', 
          description: 'Learn about our philosophy and 10+ years of architectural expertise.' 
        };
      case 'contact': 
        return { 
          title: 'Contact Us', 
          description: 'Get in touch to start your custom home or renovation journey.' 
        };
      default: 
        return {}; // Uses defaults defined in SEO.tsx
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-deep-teal' : 'bg-light-bg'}`}>
      <SEO {...getSeoProps()} />
      <Header 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleTheme}
        activeView={activeView}
        setActiveView={handleViewChange}
      />

      <main>
        <Suspense fallback={<div className="min-h-screen bg-deep-teal" />}>
          <LandingPage 
            isDarkMode={isDarkMode} 
            activeView={activeView}
            setActiveView={handleViewChange}
          />
        </Suspense>
      </main>

      <Footer 
        isDarkMode={isDarkMode} 
        onContactClick={() => handleViewChange('contact')}
        onAboutClick={() => handleViewChange('about')}
        onCollectionClick={() => handleViewChange('collection')}
        onPortfolioClick={() => handleViewChange('portfolio')}
      />
    </div>
  );
};

export default App;