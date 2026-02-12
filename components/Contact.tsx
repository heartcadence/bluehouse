import React from 'react';
import { Mail, Phone, MapPin, Facebook } from 'lucide-react';

interface ContactProps {
  isDarkMode: boolean;
}

const Contact: React.FC<ContactProps> = ({ isDarkMode }) => {
  const textColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  const mutedColor = isDarkMode ? 'text-off-white/70' : 'text-dark-text/70';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 p-12 rounded-sm border backdrop-blur-md ${
        isDarkMode ? 'bg-deep-teal/90 border-off-white/10' : 'bg-light-bg/90 border-deep-teal/10 shadow-2xl'
      }`}>
        
        {/* Left Side: Contact Info extracted from original code */}
        <div className="space-y-10">
          <div>
            <h3 className={`font-display text-3xl mb-2 ${textColor}`}>Get in Touch</h3>
            <p className={`text-sm font-light ${mutedColor}`}>We are ready to start your journey.</p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <Mail className="text-muted-gold mt-1" />
              <div>
                <h4 className={`text-xs font-bold uppercase tracking-widest mb-1 ${textColor}`}>Email Us</h4>
                <p className={mutedColor}>
                  <a href="mailto:sales@bluehouseplanning.ca" className="hover:text-muted-gold transition-colors">
                    sales@bluehouseplanning.ca
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Phone className="text-muted-gold mt-1" />
              <div>
                <h4 className={`text-xs font-bold uppercase tracking-widest mb-1 ${textColor}`}>Call Us</h4>
                <p className={mutedColor}>
                  <a href="tel:5197742047" className="hover:text-muted-gold transition-colors">
                    (519) 774-2047
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <MapPin className="text-muted-gold mt-1" />
              <div>
                <h4 className={`text-xs font-bold uppercase tracking-widest mb-1 ${textColor}`}>Studio</h4>
                <p className={mutedColor}>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Chestnut+Ave+Brantford+ON+N3T+Canada"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-muted-gold transition-colors"
                    aria-label="View our Brantford studio on Google Maps"
                  >
                    Chestnut Ave, Brantford<br/>ON N3T, Canada
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Facebook className="text-muted-gold mt-1" />
              <div>
                <h4 className={`text-xs font-bold uppercase tracking-widest mb-1 ${textColor}`}>Social</h4>
                <p className={mutedColor}>
                  <a href="https://www.facebook.com/profile.php?id=100078611357287" target="_blank" rel="noopener noreferrer" className="hover:text-muted-gold transition-colors">
                    Follow Progress
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Rebuilt Original Form */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="text" 
              placeholder="FIRST NAME" 
              aria-label="First Name"
              className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-muted-gold transition-colors ${
                isDarkMode ? 'border-off-white/20 text-off-white placeholder-off-white/40' : 'border-deep-teal/20 text-deep-teal placeholder-deep-teal/40'
              }`} 
            />
            <input 
              type="text" 
              placeholder="LAST NAME" 
              aria-label="Last Name"
              className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-muted-gold transition-colors ${
                isDarkMode ? 'border-off-white/20 text-off-white placeholder-off-white/40' : 'border-deep-teal/20 text-deep-teal placeholder-deep-teal/40'
              }`} 
            />
          </div>
          <input 
            type="email" 
            placeholder="EMAIL ADDRESS" 
            aria-label="Email Address"
            className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-muted-gold transition-colors ${
              isDarkMode ? 'border-off-white/20 text-off-white placeholder-off-white/40' : 'border-deep-teal/20 text-deep-teal placeholder-deep-teal/40'
            }`} 
          />
          <textarea 
            rows={4} 
            placeholder="TELL US ABOUT YOUR PROJECT" 
            aria-label="Tell us about your project"
            className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-muted-gold transition-colors ${
              isDarkMode ? 'border-off-white/20 text-off-white placeholder-off-white/40' : 'border-deep-teal/20 text-deep-teal placeholder-deep-teal/40'
            }`}
          ></textarea>
          
          <button className="w-full bg-deep-teal text-off-white py-4 font-bold tracking-widest uppercase hover:bg-muted-gold transition-colors shadow-lg mt-4 rounded-sm">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;