import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';

type ViewMode = 'landing'; // Simplified as LandingPage handles internal views now

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeView, setActiveView] = useState<'collection' | 'contact' | 'about' | 'portfolio'>('contact');
  
  // Toggle Body Background
  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = '#002147';
      document.body.style.color = '#F2F2F2';
    } else {
      document.body.style.backgroundColor = '#F9FAFB';
      document.body.style.color = '#4A5568';
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollToContent = () => {
    const element = document.getElementById('dynamic-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToContact = () => {
    setActiveView('contact');
    scrollToContent();
  };

  const handleNavigateToCollection = () => {
    setActiveView('collection');
    scrollToContent();
  };

  const handleNavigateToAbout = () => {
    setActiveView('about');
    scrollToContent();
  };

  // Theme Helpers for App container
  const appContainerClass = isDarkMode ? 'bg-deep-teal' : 'bg-light-bg';

  return (
    <div className={`min-h-screen font-body transition-colors duration-300 selection:bg-muted-gold selection:text-deep-teal ${appContainerClass}`}>
      
      <Header 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        onContactClick={handleNavigateToContact}
        onCollectionClick={handleNavigateToCollection}
        onAboutClick={handleNavigateToAbout}
      />

      <main className="pt-20">
        <LandingPage 
          isDarkMode={isDarkMode} 
          activeView={activeView}
          setActiveView={setActiveView}
        />
      </main>

      <Footer 
        isDarkMode={isDarkMode} 
        onContactClick={handleNavigateToContact}
        onAboutClick={handleNavigateToAbout}
      />
      
    </div>
  );
};

export default App;