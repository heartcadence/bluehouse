import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeView, setActiveView] = useState<'collection' | 'contact' | 'about' | 'portfolio'>('collection');
  
  // Toggle Body Background for a seamless feel
  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = '#002147'; // Deep Teal
      document.body.style.color = '#F2F2F2';
    } else {
      document.body.style.backgroundColor = '#F9FAFB'; // Light Bg
      document.body.style.color = '#4A5568';
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Theme Helpers for App container
  const appContainerClass = isDarkMode ? 'bg-deep-teal' : 'bg-light-bg';

  return (
    <div className={`min-h-screen font-body transition-colors duration-300 selection:bg-muted-gold selection:text-deep-teal ${appContainerClass}`}>
      
      {/* The Header now handles all navigation logic internally via setActiveView.
          This prevents "Prop Drilling" (passing 5 different handlers).
      */}
      <Header 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleTheme}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <main>
        <LandingPage 
          isDarkMode={isDarkMode} 
          activeView={activeView}
          setActiveView={setActiveView}
          toggleDarkMode={toggleTheme}
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