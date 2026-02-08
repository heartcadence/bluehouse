import React from 'react';
import { Mail, Phone, MapPin, Facebook } from 'lucide-react';

interface LandingPageProps {
  onSwitchToStore: () => void;
  isDarkMode: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSwitchToStore, isDarkMode }) => {
  const textColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  const mutedColor = isDarkMode ? 'text-off-white/70' : 'text-dark-text/70';

  return (
    <div className="animate-fade-in w-full">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2700&auto=format&fit=crop"
            alt="Modern Architectural House"
            className={`w-full h-full object-cover transition-opacity duration-700 ${isDarkMode ? 'opacity-30' : 'opacity-90'}`}
          />
           <div className={`absolute inset-0 bg-gradient-to-b ${isDarkMode ? 'from-deep-teal/90 via-deep-teal/50 to-deep-teal' : 'from-light-bg/80 via-light-bg/40 to-light-bg'}`}></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-[-80px]">
          <h2 className="text-muted-gold uppercase tracking-[0.3em] text-xs md:text-sm mb-6 animate-slide-up">
            Bluehouse Planning & Designs
          </h2>
          <h1 className={`font-display text-6xl md:text-8xl lg:text-9xl mb-10 leading-none ${textColor} animate-slide-up animation-delay-200`}>
            Visionary <br/> <span className="italic text-muted-gold">Architecture</span>
          </h1>
          <p className={`text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12 ${mutedColor} animate-slide-up animation-delay-400`}>
             Drafting the future of luxury living. We provide BCIN-compliant architectural drawings for the modern builder and homeowner.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center animate-slide-up animation-delay-600">
             <button
              onClick={onSwitchToStore}
              className="px-10 py-4 bg-muted-gold text-deep-teal font-bold tracking-widest uppercase hover:bg-off-white transition-all shadow-xl rounded-sm"
            >
              Enter Storefront
            </button>
            <a href="#contact" className={`px-10 py-4 border rounded-sm ${isDarkMode ? 'border-off-white text-off-white hover:bg-off-white hover:text-deep-teal' : 'border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-off-white'} font-bold tracking-widest uppercase transition-all`}>
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section - MOVED UP */}
      <section id="contact" className="py-24 px-6 relative">
         <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className={`font-display text-4xl md:text-5xl mb-6 ${textColor}`}>Start Your Project</h2>
            <p className={`text-lg font-light ${mutedColor}`}>
              Whether you are looking for a custom modification or have questions about our catalog, our team is ready to assist.
            </p>
         </div>

         <div className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 p-8 rounded-sm border ${isDarkMode ? 'bg-white/5 border-off-white/10' : 'bg-deep-teal/5 border-deep-teal/10'}`}>
            {/* Contact Info */}
            <div className="space-y-8 p-8">
                <div className="flex items-start space-x-4">
                    <Mail className="text-muted-gold mt-1" />
                    <div>
                        <h4 className={`text-lg font-bold uppercase tracking-wide mb-1 ${textColor}`}>Email Us</h4>
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
                        <h4 className={`text-lg font-bold uppercase tracking-wide mb-1 ${textColor}`}>Call Us</h4>
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
                        <h4 className={`text-lg font-bold uppercase tracking-wide mb-1 ${textColor}`}>Studio</h4>
                        <p className={mutedColor}>
                          <a 
                            href="https://www.google.com/maps/search/?api=1&query=Chestnut+Ave,+Brantford,+ON,+Canada" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-muted-gold transition-colors"
                          >
                            Chestnut Ave, Brantford<br/>ON N3T, Canada
                          </a>
                        </p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <Facebook className="text-muted-gold mt-1" />
                    <div>
                        <h4 className={`text-lg font-bold uppercase tracking-wide mb-1 ${textColor}`}>Social Media</h4>
                        <p className={mutedColor}>
                          <a 
                            href="https://www.facebook.com/profile.php?id=100078611357287" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-muted-gold transition-colors"
                          >
                            Follow on Facebook
                          </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form className="space-y-6 p-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" placeholder="FIRST NAME" className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-muted-gold transition-colors ${isDarkMode ? 'border-off-white/20 text-off-white placeholder-off-white/40' : 'border-deep-teal/20 text-deep-teal placeholder-deep-teal/40'}`} />
                    <input type="text" placeholder="LAST NAME" className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-muted-gold transition-colors ${isDarkMode ? 'border-off-white/20 text-off-white placeholder-off-white/40' : 'border-deep-teal/20 text-deep-teal placeholder-deep-teal/40'}`} />
                </div>
                <input type="email" placeholder="EMAIL ADDRESS" className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-muted-gold transition-colors ${isDarkMode ? 'border-off-white/20 text-off-white placeholder-off-white/40' : 'border-deep-teal/20 text-deep-teal placeholder-deep-teal/40'}`} />
                <input type="tel" placeholder="PHONE NUMBER" className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-muted-gold transition-colors ${isDarkMode ? 'border-off-white/20 text-off-white placeholder-off-white/40' : 'border-deep-teal/20 text-deep-teal placeholder-deep-teal/40'}`} />
                <textarea rows={4} placeholder="TELL US ABOUT YOUR PROJECT" className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-muted-gold transition-colors ${isDarkMode ? 'border-off-white/20 text-off-white placeholder-off-white/40' : 'border-deep-teal/20 text-deep-teal placeholder-deep-teal/40'}`}></textarea>
                
                <button className="w-full bg-deep-teal text-off-white py-4 font-bold tracking-widest uppercase hover:bg-muted-gold transition-colors shadow-lg mt-4 rounded-sm">
                    Send Inquiry
                </button>
            </form>
         </div>
      </section>

      {/* Philosophy / About - MOVED DOWN */}
      <section id="philosophy" className={`py-24 px-6 ${isDarkMode ? 'bg-deep-teal-dark' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
                <h3 className="text-muted-gold text-sm tracking-widest uppercase mb-4">Our Philosophy</h3>
                <h2 className={`font-display text-4xl md:text-5xl mb-8 leading-tight ${textColor}`}>
                    Precision in every line. <br/> beauty in every volume.
                </h2>
                <p className={`text-lg leading-relaxed mb-6 font-light ${mutedColor}`}>
                    At Bluehouse, we believe that a blueprint is more than a technical document—it is the seed of a legacy. Our designs balance the pragmatic needs of construction with the aesthetic desires of the modern dweller.
                </p>
                <p className={`text-lg leading-relaxed font-light ${mutedColor}`}>
                    Specializing in contemporary estates and modern farmhouses, our digital storefront offers immediate access to high-fidelity, BCIN-ready plans.
                </p>
            </div>
            <div className="relative h-[600px] w-full group overflow-hidden shadow-2xl">
                <img 
                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2670&auto=format&fit=crop" 
                    alt="Interior Design" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
                />
                <div className={`absolute inset-0 border-[1px] m-4 ${isDarkMode ? 'border-off-white/20' : 'border-deep-teal/20'}`}></div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;