import React, { useState, useEffect } from 'react';

// Standardized imports matching your file explorer casing
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeView, setActiveView] = useState<'collection' | 'contact' | 'about' | 'portfolio'>('collection');
  
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Apply theme-specific body styles for a seamless experience
  useEffect(() => {
    document.body.className = isDarkMode ? 'bg-deep-teal text-off-white' : 'bg-light-bg text-deep-teal';
  }, [isDarkMode]);

  // Unified handler to ensure every view change resets scroll to the top
  const handleViewChange = (view: 'collection' | 'contact' | 'about' | 'portfolio') => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-deep-teal' : 'bg-light-bg'}`}>
      <Header 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleTheme}
        activeView={activeView}
        setActiveView={handleViewChange}
      />

      <main>
        <LandingPage 
          isDarkMode={isDarkMode} 
          activeView={activeView}
          setActiveView={handleViewChange}
          toggleDarkMode={toggleTheme}
        />
      </main>

      <Footer 
        isDarkMode={isDarkMode} 
        onContactClick={() => handleViewChange('contact')}
        onAboutClick={() => handleViewChange('about')}
        onCollectionClick={() => handleViewChange('collection')}
      />
    </div>
  );
};

export default App;