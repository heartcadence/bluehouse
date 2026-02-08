import React, { useState } from 'react';
import { Menu, X, ShoppingBag, User, Compass, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isAdmin: boolean;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  onContactClick: () => void;
  onCollectionClick: () => void;
  onAboutClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isAdmin, 
  onLoginClick, 
  onLogoutClick, 
  isDarkMode, 
  toggleTheme,
  onContactClick,
  onCollectionClick,
  onAboutClick
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Dynamic Styles
  const headerBg = isDarkMode ? 'bg-deep-teal/90 border-off-white/10' : 'bg-light-bg/90 border-deep-teal/10 shadow-sm';
  const textColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  const navHover = 'hover:text-muted-gold';
  const logoColor = 'text-muted-gold';
  const logoTextMain = isDarkMode ? 'text-off-white' : 'text-deep-teal';

  // Navigation Items
  const navItems = ['Contact', 'Collection', 'About'];

  return (
    <header className={`fixed w-full top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer">
            <Compass className={`${logoColor} h-8 w-8`} strokeWidth={1} />
            <div className="flex flex-col">
              <span className={`font-display font-bold text-2xl tracking-wider leading-none transition-colors ${logoTextMain}`}>
                BLUEHOUSE
              </span>
              <span className={`text-[9px] md:text-[10px] uppercase tracking-[0.15em] font-light mt-0.5 ${logoColor}`}>
                Planning and Designs Inc.
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-12 items-center">
            {navItems.map((item) => {
               if (item === 'Contact') {
                  return (
                    <button 
                        key={item} 
                        onClick={onContactClick}
                        className={`text-sm uppercase tracking-widest transition-colors duration-300 ${isDarkMode ? 'text-off-white/70' : 'text-dark-text/70'} ${navHover}`}
                    >
                        {item}
                    </button>
                  );
               }
               if (item === 'Collection') {
                  return (
                    <button 
                        key={item} 
                        onClick={onCollectionClick}
                        className={`text-sm uppercase tracking-widest transition-colors duration-300 ${isDarkMode ? 'text-off-white/70' : 'text-dark-text/70'} ${navHover}`}
                    >
                        {item}
                    </button>
                  );
               }
               if (item === 'About') {
                  return (
                    <button 
                        key={item} 
                        onClick={onAboutClick}
                        className={`text-sm uppercase tracking-widest transition-colors duration-300 ${isDarkMode ? 'text-off-white/70' : 'text-dark-text/70'} ${navHover}`}
                    >
                        {item}
                    </button>
                  );
               }
               return (
                <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    className={`text-sm uppercase tracking-widest transition-colors duration-300 ${isDarkMode ? 'text-off-white/70' : 'text-dark-text/70'} ${navHover}`}
                >
                    {item}
                </a>
               );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-off-white/70 hover:text-muted-gold hover:bg-white/10' : 'text-deep-teal/70 hover:text-muted-gold hover:bg-deep-teal/5'}`}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAdmin ? (
               <button 
               onClick={onLogoutClick} 
               className="text-xs text-muted-gold uppercase tracking-widest border border-muted-gold px-3 py-1 rounded hover:bg-muted-gold hover:text-deep-teal transition-all"
             >
               Admin Active
             </button>
            ) : (
              <button 
                onClick={onLoginClick} 
                className={`transition-colors ${isDarkMode ? 'text-off-white/70' : 'text-deep-teal/70'} ${navHover}`}
                aria-label="Login"
              >
                <User size={20} />
              </button>
            )}
            
            <button className={`transition-colors relative ${isDarkMode ? 'text-off-white/70' : 'text-deep-teal/70'} ${navHover}`}>
                <ShoppingBag size={20} />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-muted-gold rounded-full"></span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
             <button 
              onClick={toggleTheme}
              className={`p-1 ${isDarkMode ? 'text-off-white' : 'text-deep-teal'}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={toggleMenu} 
              className={`focus:outline-none hover:text-muted-gold ${textColor}`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-over */}
      <div 
        className={`fixed inset-y-0 right-0 w-64 shadow-2xl transform transition-transform duration-500 ease-in-out z-50 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } ${isDarkMode ? 'bg-deep-teal' : 'bg-light-bg'}`}
      >
        <div className="flex flex-col h-full pt-20 px-8 space-y-8">
           {navItems.map((item) => {
              if (item === 'Contact') {
                 return (
                    <button 
                        key={item} 
                        onClick={() => {
                            onContactClick();
                            setIsMobileMenuOpen(false);
                        }}
                        className={`font-display text-2xl hover:text-muted-gold transition-colors text-left ${textColor}`}
                    >
                        {item}
                    </button>
                 );
              }
              if (item === 'Collection') {
                 return (
                    <button 
                        key={item} 
                        onClick={() => {
                            onCollectionClick();
                            setIsMobileMenuOpen(false);
                        }}
                        className={`font-display text-2xl hover:text-muted-gold transition-colors text-left ${textColor}`}
                    >
                        {item}
                    </button>
                 );
              }
              if (item === 'About') {
                 return (
                    <button 
                        key={item} 
                        onClick={() => {
                            onAboutClick();
                            setIsMobileMenuOpen(false);
                        }}
                        className={`font-display text-2xl hover:text-muted-gold transition-colors text-left ${textColor}`}
                    >
                        {item}
                    </button>
                 );
              }
              return (
                <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-display text-2xl hover:text-muted-gold transition-colors ${textColor}`}
                >
                    {item}
                </a>
              );
            })}
            
            <div className={`border-t pt-8 mt-auto mb-8 ${isDarkMode ? 'border-off-white/10' : 'border-deep-teal/10'}`}>
               {isAdmin ? (
                 <button onClick={onLogoutClick} className="text-muted-gold w-full text-left mb-4">Logout (Admin)</button>
               ) : (
                 <button onClick={() => { onLoginClick(); setIsMobileMenuOpen(false); }} className={`w-full text-left mb-4 ${textColor}`}>Login</button>
               )}
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;