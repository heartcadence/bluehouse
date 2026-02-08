import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AdminModal from './components/AdminModal';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';

type ViewMode = 'landing'; // Simplified as LandingPage handles internal views now

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeView, setActiveView] = useState<'store' | 'contact'>('contact');
  
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

  const handleNavigateToContact = () => {
    setActiveView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin Logic
  const handleLogin = (password: string) => {
    if (password === 'bluehouse') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAdmin(false);
    alert("Logged out of Admin Mode.");
  };

  const openAdminModal = () => {
    if (!isAdmin) {
      setIsAdminModalOpen(true);
    }
  };

  // Theme Helpers for App container
  const appContainerClass = isDarkMode ? 'bg-deep-teal' : 'bg-light-bg';

  return (
    <div className={`min-h-screen font-body transition-colors duration-300 selection:bg-muted-gold selection:text-deep-teal ${appContainerClass}`}>
      
      <Header 
        isAdmin={isAdmin} 
        onLoginClick={openAdminModal} 
        onLogoutClick={handleLogout}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        onContactClick={handleNavigateToContact}
      />

      <main className="pt-20">
        <LandingPage 
          isDarkMode={isDarkMode} 
          isAdmin={isAdmin} 
          activeView={activeView}
          setActiveView={setActiveView}
        />
      </main>

      <Footer 
        onAdminClick={openAdminModal} 
        isDarkMode={isDarkMode} 
        onContactClick={handleNavigateToContact}
      />
      
      <AdminModal 
        isOpen={isAdminModalOpen} 
        onClose={() => setIsAdminModalOpen(false)} 
        onLogin={handleLogin}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default App;