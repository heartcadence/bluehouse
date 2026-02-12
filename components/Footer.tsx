import React from 'react';

interface FooterProps {
  isDarkMode: boolean;
  onContactClick: () => void;
  onAboutClick: () => void;
  onCollectionClick: () => void;
  onPortfolioClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ 
  isDarkMode, 
  onContactClick, 
  onAboutClick,
  onCollectionClick,
  onPortfolioClick
}) => {
  const bgClass = isDarkMode ? 'bg-deep-teal-dark border-white/5' : 'bg-white border-deep-teal/10';
  const headingColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  // Increased opacity for better contrast/accessibility
  const textColor = isDarkMode ? 'text-off-white/80' : 'text-dark-text/80';
  const linkColor = isDarkMode ? 'text-off-white/70' : 'text-dark-text/80';
  const inputBorder = isDarkMode ? 'border-off-white/20 placeholder-off-white/30 text-off-white' : 'border-deep-teal/20 placeholder-deep-teal/30 text-deep-teal';

  const handleLinkClick = (handler: () => void) => {
    handler();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t py-16 transition-colors duration-300 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <h3 className={`font-display text-xl tracking-wider leading-none ${headingColor}`}>
                BLUEHOUSE<span className="text-muted-gold">.</span>
              </h3>
              <span className="text-muted-gold text-[10px] tracking-[0.2em] font-bold uppercase mt-1">
                Planning and Designs Inc.
              </span>
            </div>
            <p className={`text-sm leading-relaxed max-w-xs ${textColor}`}>
              Expert architectural design and permit-ready plans for custom homes and renovations across Brantford and Ontario.
            </p>
            
            {/* Studio Address Link */}
            <div className="pt-2">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Chestnut+Ave+Brantford+ON+N3T+Canada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs leading-relaxed block hover:text-muted-gold transition-colors ${textColor}`}
                  aria-label="View our Brantford studio on Google Maps"
                >
                  <span className="font-bold uppercase tracking-widest text-[10px] block mb-1 opacity-70">Studio</span>
                  Chestnut Ave, Brantford<br/>ON N3T, Canada
                </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-muted-gold text-xs uppercase tracking-widest mb-6">Explore</h4>
            <ul className={`space-y-3 text-sm font-light ${linkColor}`}>
              <li>
                <button 
                  onClick={() => handleLinkClick(onCollectionClick)} 
                  className="hover:text-muted-gold transition-colors text-left"
                >
                  Collection
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick(onPortfolioClick)} 
                  className="hover:text-muted-gold transition-colors text-left"
                >
                  Portfolio
                </button>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-muted-gold text-xs uppercase tracking-widest mb-6">Support</h4>
            <ul className={`space-y-3 text-sm font-light ${linkColor}`}>
              <li>
                <button 
                  onClick={() => handleLinkClick(onAboutClick)} 
                  className="hover:text-muted-gold transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick(onContactClick)} 
                  className="hover:text-muted-gold transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
             <h4 className="text-muted-gold text-xs uppercase tracking-widest mb-6">Newsletter</h4>
             <div className={`flex border-b pb-2 ${inputBorder}`}>
               <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="bg-transparent border-none focus:outline-none text-sm w-full placeholder:text-inherit"
                  aria-label="Email Address for Newsletter"
                />
               <button className="text-muted-gold hover:text-muted-gold/70 uppercase text-xs tracking-widest font-bold">Join</button>
             </div>
          </div>
        </div>

        {/* Legal & Social */}
        <div className={`mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center ${isDarkMode ? 'border-white/5' : 'border-deep-teal/5'}`}>
          <p className={`text-xs tracking-wide ${isDarkMode ? 'text-off-white/30' : 'text-deep-teal/30'}`}>
            © {new Date().getFullYear()} Bluehouse Planning & Designs Inc. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-8 mt-4 md:mt-0">
            <a
              href="https://bluehouse-portal.sanity.studio/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[10px] uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity duration-300 ${isDarkMode ? 'text-off-white' : 'text-deep-teal'}`}
            >
              Studio Login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;