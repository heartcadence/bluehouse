import React, { useState, useEffect } from 'react';
// Corrected paths for src/App.tsx
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeView, setActiveView] = useState<'collection' | 'contact' | 'about' | 'portfolio'>('collection');
  
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Apply theme-specific body styles for seamless transitions
  useEffect(() => {
    document.body.className = isDarkMode ? 'bg-deep-teal text-off-white' : 'bg-light-bg text-deep-teal';
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-deep-teal' : 'bg-light-bg'}`}>
      <Header 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleTheme} // The prop name Header expects
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <main>
        <LandingPage 
          isDarkMode={isDarkMode} 
          activeView={activeView}
          setActiveView={setActiveView}
          toggleDarkMode={toggleTheme} // The prop name LandingPage expects
        />
      </main>

      <Footer 
        isDarkMode={isDarkMode} 
        onContactClick={() => setActiveView('contact')}
        onAboutClick={() => setActiveView('about')}
      />
    </div>
  );
};

export default App;