import React from 'react';

interface FooterProps {
  onAdminClick: () => void;
  isDarkMode: boolean;
  onContactClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick, isDarkMode, onContactClick }) => {
  const bgClass = isDarkMode ? 'bg-deep-teal-dark border-white/5' : 'bg-white border-deep-teal/10';
  const headingColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  const textColor = isDarkMode ? 'text-off-white/50' : 'text-dark-text/60';
  const linkColor = isDarkMode ? 'text-off-white/70' : 'text-dark-text/80';
  const inputBorder = isDarkMode ? 'border-off-white/20 placeholder-off-white/30 text-off-white' : 'border-deep-teal/20 placeholder-deep-teal/30 text-deep-teal';

  return (
    <footer className={`border-t py-16 transition-colors duration-300 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className={`font-display text-xl tracking-wider ${headingColor}`}>BLUEHOUSE</h3>
            <p className={`text-sm leading-relaxed max-w-xs ${textColor}`}>
              Curating the world's most exceptional architectural plans for the discerning individual.
            </p>
          </div>

          <div>
            <h4 className="text-muted-gold text-xs uppercase tracking-widest mb-6">Explore</h4>
            <ul className={`space-y-3 text-sm font-light ${linkColor}`}>
              <li><a href="#" className="hover:text-muted-gold transition-colors">Collection</a></li>
              <li><a href="#" className="hover:text-muted-gold transition-colors">Architects</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-muted-gold text-xs uppercase tracking-widest mb-6">Support</h4>
            <ul className={`space-y-3 text-sm font-light ${linkColor}`}>
              <li><a href="#" className="hover:text-muted-gold transition-colors">Licensing</a></li>
              <li><button onClick={onContactClick} className="hover:text-muted-gold transition-colors text-left">Contact Us</button></li>
            </ul>
          </div>

          <div>
             <h4 className="text-muted-gold text-xs uppercase tracking-widest mb-6">Newsletter</h4>
             <div className={`flex border-b pb-2 ${inputBorder}`}>
               <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="bg-transparent border-none focus:outline-none text-sm w-full"
                />
               <button className="text-muted-gold hover:text-muted-gold/70 uppercase text-xs tracking-widest">Join</button>
             </div>
          </div>
        </div>

        <div className={`mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center ${isDarkMode ? 'border-white/5' : 'border-deep-teal/5'}`}>
          <p className={`text-xs tracking-wide ${isDarkMode ? 'text-off-white/30' : 'text-deep-teal/30'}`}>
            © {new Date().getFullYear()} Bluehouse Planning & Designs Inc. All rights reserved.
          </p>
          
          <button 
            onClick={onAdminClick}
            className={`mt-4 md:mt-0 text-[10px] uppercase tracking-widest transition-colors cursor-pointer ${isDarkMode ? 'text-off-white/10 hover:text-off-white/30' : 'text-deep-teal/10 hover:text-deep-teal/30'}`}
          >
            Admin Access
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;