import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  activeView: 'collection' | 'contact' | 'about' | 'portfolio';
  setActiveView: (view: 'collection' | 'contact' | 'about' | 'portfolio') => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isDarkMode, 
  toggleDarkMode, 
  activeView, 
  setActiveView 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'collection', label: 'The Collection' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (view: any) => {
    setActiveView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const textColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  const headerBg = isScrolled 
    ? (isDarkMode ? 'bg-deep-teal/90 backdrop-blur-md shadow-2xl' : 'bg-white/90 backdrop-blur-md shadow-lg')
    : 'bg-transparent';

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${headerBg} ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* LOGO */}
          <div 
            className="cursor-pointer group"
            onClick={() => handleNavClick('collection')}
          >
            <h1 className={`font-display text-2xl tracking-[0.2em] uppercase transition-colors ${textColor} group-hover:text-muted-gold`}>
              Bluehouse<span className="text-muted-gold font-light">.</span>
            </h1>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 relative py-2 ${
                  activeView === item.id 
                    ? 'text-muted-gold' 
                    : `${textColor} opacity-60 hover:opacity-100 hover:text-muted-gold`
                }`}
              >
                {item.label}
                {activeView === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-muted-gold animate-scale-x" />
                )}
              </button>
            ))}

            {/* THEME TOGGLE */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-500 ${isDarkMode ? 'bg-white/5 text-muted-gold hover:bg-white/10' : 'bg-deep-teal/5 text-deep-teal hover:bg-deep-teal/10'}`}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden flex items-center space-x-4">
             <button onClick={toggleDarkMode} className={textColor}>
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={textColor}
             >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      
      <div className={`fixed inset-0 z-[-1] bg-deep-teal transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden flex flex-col items-center justify-center space-y-8`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`text-lg uppercase tracking-[0.4em] font-display ${activeView === item.id ? 'text-muted-gold' : 'text-off-white'}`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;