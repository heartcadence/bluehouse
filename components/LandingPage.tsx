import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Facebook, Plus, CheckCircle, Quote, ArrowRight } from 'lucide-react';
import { Product, Category } from '../types';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import ProductCard from './ProductCard';

interface LandingPageProps {
  isDarkMode: boolean;
  isAdmin: boolean;
  activeView: 'collection' | 'contact' | 'philosophy';
  setActiveView: (view: 'collection' | 'contact' | 'philosophy') => void;
}

const TESTIMONIALS = [
  {
    text: "It has been a privilege partnering with Bluehouse Planning & Designs Inc. over the last few years; we eagerly anticipate our upcoming projects this season!",
    author: "Nailed It Fencing & Decks",
    role: "Strategic Partner",
    initial: "N"
  },
  {
    text: "If you are building a deck, putting in a beam or building a new house Bluehouse Planning and Designs Inc. is very highly recommended.",
    author: "Dan B",
    role: "House Reconstruction",
    initial: "D"
  }
];

const LandingPage: React.FC<LandingPageProps> = ({ isDarkMode, isAdmin, activeView, setActiveView }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isTestimonialVisible, setIsTestimonialVisible] = useState(true);

  const textColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  const mutedColor = isDarkMode ? 'text-off-white/70' : 'text-dark-text/70';
  const borderColor = isDarkMode ? 'border-off-white/20' : 'border-deep-teal/20';

  // Collection Logic
  const filteredProducts = activeCategory === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTestimonialVisible(false);
      setTimeout(() => {
        setCurrentTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        setIsTestimonialVisible(true);
      }, 500); // Wait for fade out
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, []);

  const handleAddNewPlan = () => {
    alert("Admin Action: Opening 'Add New Product' form in CMS...");
  };

  const scrollToContent = () => {
    const contentElement = document.getElementById('dynamic-content');
    if (contentElement) {
        contentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroCta = () => {
    setActiveView('collection');
    scrollToContent();
  };

  const handlePhilosophyCta = () => {
    setActiveView('collection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentTestimonial = TESTIMONIALS[currentTestimonialIndex];

  return (
    <div className="animate-fade-in w-full">
      {/* Hero */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://pub-698e84d3fce74dc6b4b08c5f5d041da0.r2.dev/hero2.webp"
            alt="Modern Architectural House"
            className={`w-full h-full object-cover transition-opacity duration-700 ${isDarkMode ? 'opacity-30' : 'opacity-90'}`}
          />
           <div className={`absolute inset-0 bg-gradient-to-b ${isDarkMode ? 'from-deep-teal/90 via-deep-teal/50 to-deep-teal' : 'from-light-bg/80 via-light-bg/40 to-light-bg'}`}></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-[-40px]">
          <h2 className="text-muted-gold uppercase tracking-[0.3em] text-xs md:text-sm mb-6 animate-slide-up">
            Bluehouse Planning & Designs
          </h2>
          <h1 className={`font-display text-6xl md:text-8xl lg:text-9xl mb-10 leading-none ${textColor} animate-slide-up animation-delay-200`}>
            Visionary <br/> <span className="italic text-muted-gold">Architecture</span>
          </h1>

          <div className="mt-8 animate-slide-up animation-delay-400">
             <button 
               onClick={handleHeroCta}
               className="px-10 py-4 bg-muted-gold text-deep-teal font-bold tracking-[0.2em] uppercase text-xs rounded-sm hover:bg-off-white transition-all duration-300 shadow-[0_0_20px_rgba(166,133,98,0.3)] hover:shadow-[0_0_30px_rgba(166,133,98,0.5)]"
             >
               Find My Dream Home
             </button>
          </div>
        </div>
      </section>

      {/* Dynamic Content Section */}
      <section id="dynamic-content" className="min-h-[600px] relative z-20 -mt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Toggle Bar */}
            <div className="flex justify-center mb-16 animate-slide-up animation-delay-400 pointer-events-none">
                 <div className={`pointer-events-auto flex p-1 rounded-full backdrop-blur-md border shadow-2xl ${isDarkMode ? 'bg-deep-teal/80 border-white/10' : 'bg-light-bg/80 border-deep-teal/10'}`}>
                    <button
                        onClick={() => setActiveView('contact')}
                        className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                            activeView === 'contact'
                            ? 'bg-muted-gold text-deep-teal shadow-lg'
                            : `${textColor} hover:bg-white/10`
                        }`}
                    >
                        Contact Us
                    </button>
                    <button
                        onClick={() => setActiveView('collection')}
                        className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                            activeView === 'collection'
                            ? 'bg-muted-gold text-deep-teal shadow-lg'
                            : `${textColor} hover:bg-white/10`
                        }`}
                    >
                        Collection
                    </button>
                </div>
            </div>

            {/* --- COLLECTION VIEW --- */}
            <div className={`transition-all duration-500 ease-in-out ${activeView === 'collection' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
                {/* Controls Bar */}
                <div className={`flex flex-col md:flex-row justify-between items-center mb-12 p-6 rounded-sm backdrop-blur-md border ${isDarkMode ? 'bg-deep-teal/80 border-white/10' : 'bg-light-bg/80 border-deep-teal/10 shadow-lg'}`}>
                    
                    {/* Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-2">
                    {CATEGORIES.map(category => (
                        <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 rounded-sm text-[10px] uppercase tracking-widest transition-all duration-300 border ${
                            activeCategory === category
                            ? 'bg-deep-teal text-off-white border-deep-teal'
                            : `bg-transparent hover:border-muted-gold hover:text-muted-gold ${isDarkMode ? 'text-off-white/60 border-transparent' : 'text-deep-teal/60 border-transparent'}`
                        }`}
                        >
                        {category}
                        </button>
                    ))}
                    </div>

                    {/* Admin Add Button */}
                    {isAdmin && (
                    <button 
                        onClick={handleAddNewPlan}
                        className={`mt-4 md:mt-0 flex items-center space-x-2 px-5 py-2 rounded-sm border border-dashed border-muted-gold transition-all hover:bg-muted-gold hover:text-deep-teal text-muted-gold`}
                    >
                        <Plus size={16} />
                        <span className="uppercase text-xs tracking-widest font-bold">Add New Plan</span>
                    </button>
                    )}
                </div>

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                    {filteredProducts.map(product => (
                        <ProductCard 
                        key={product._id} 
                        product={product} 
                        isAdmin={isAdmin} 
                        />
                    ))}
                    </div>
                ) : (
                    <div className={`text-center py-20 font-display italic text-xl ${isDarkMode ? 'text-off-white/40' : 'text-deep-teal/40'}`}>
                    No architectural plans found in this category.
                    </div>
                )}
            </div>

            {/* --- CONTACT VIEW --- */}
            <div className={`transition-all duration-500 ease-in-out ${activeView === 'contact' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
                 <div className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 p-12 rounded-sm border backdrop-blur-md ${isDarkMode ? 'bg-deep-teal/90 border-off-white/10' : 'bg-light-bg/90 border-deep-teal/10 shadow-2xl'}`}>
                    {/* Contact Info */}
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
                                    <h4 className={`text-xs font-bold uppercase tracking-widest mb-1 ${textColor}`}>Social Media</h4>
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
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" placeholder="FIRST NAME" className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-muted-gold transition-colors ${isDarkMode ? 'border-off-white/20 text-off-white placeholder-off-white/40' : 'border-deep-teal/20 text-deep-teal placeholder-deep-teal/40'}`} />
                            <input type="text" placeholder="LAST NAME" className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-muted-gold transition-colors ${isDarkMode ? 'border-off-white/20 text-off-white placeholder-off-white/40' : 'border-deep-teal/20 text-deep-teal placeholder-deep-teal/40'}`} />
                        </div>
                        <input type="email" placeholder="EMAIL ADDRESS" className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-muted-gold transition-colors ${isDarkMode ? 'border-off-white/20 text-off-white placeholder-off-white/40' : 'border-deep-teal/20 text-deep-teal placeholder-deep-teal/40'}`} />
                        <input type="tel" placeholder="PHONE NUMBER" className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-muted-gold transition-colors ${isDarkMode ? 'border-off-white/20 text-off-white placeholder-off-white/40' : 'border-deep-teal/20 text-deep-teal placeholder-deep-teal/40'}`} />
                        <textarea rows={4} placeholder="TELL US ABOUT YOUR PROJECT" className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-muted-gold transition-colors ${isDarkMode ? 'border-off-white/20 text-off-white placeholder-off-white/40' : 'border-deep-teal/20 text-deep-teal placeholder-deep-teal/40'}`}></textarea>
                        
                        <button className="w-full bg-deep-teal text-off-white py-4 font-bold tracking-widest uppercase hover:bg-muted-gold transition-colors shadow-lg mt-4 rounded-sm">
                            Send Message
                        </button>
                    </form>
                 </div>
            </div>

            {/* --- PHILOSOPHY VIEW --- */}
            <div className={`transition-all duration-500 ease-in-out ${activeView === 'philosophy' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
               <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div>
                        <h3 className="text-muted-gold text-sm tracking-[0.2em] uppercase mb-4">Our Philosophy</h3>
                        <h2 className={`font-display text-4xl md:text-5xl leading-tight ${textColor}`}>
                            The DNA of a Home.
                        </h2>
                        </div>
                        
                        <div className={`space-y-6 text-lg font-light leading-relaxed ${mutedColor}`}>
                        <p>
                            At Bluehouse, we provide more than just blueprints; we engineer the very DNA of your sanctuary. Our process transcends simple drafting, bridging the delicate divide between your ethereal vision and the rigid technical reality of construction.
                        </p>
                        <p>
                            We have pioneered the use of <span className="text-muted-gold">animated contour renders</span>, a technique that offers superior spatial accuracy over traditional static imagery. This ensures that what you see is exactly what your builder delivers—precision in every line, beauty in every volume.
                        </p>
                        <p>
                            True luxury is peace of mind. Our designs are not merely artistic expressions but rigorous technical documents, crafted to reduce friction and ensure a seamless path from permit to occupancy.
                        </p>
                        </div>

                        {/* Hard Proof / Certifications */}
                        <div className={`pt-6 border-t ${borderColor}`}>
                            <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${textColor}`}>Technical Assurance</h4>
                            <ul className="space-y-3">
                                <li className="flex items-center space-x-3">
                                    <CheckCircle className="text-muted-gold w-5 h-5 flex-shrink-0" />
                                    <span className={`text-sm tracking-wide ${isDarkMode ? 'text-off-white/90' : 'text-deep-teal/90'}`}>BCIN Registered Designers (Ontario Compliant)</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <CheckCircle className="text-muted-gold w-5 h-5 flex-shrink-0" />
                                    <span className={`text-sm tracking-wide ${isDarkMode ? 'text-off-white/90' : 'text-deep-teal/90'}`}>Permit-Ready Architectural Drawings</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <CheckCircle className="text-muted-gold w-5 h-5 flex-shrink-0" />
                                    <span className={`text-sm tracking-wide ${isDarkMode ? 'text-off-white/90' : 'text-deep-teal/90'}`}>High-Fidelity 3D Contour Visualization</span>
                                </li>
                            </ul>
                        </div>

                        <button 
                        onClick={handlePhilosophyCta}
                        className={`mt-8 flex items-center gap-3 uppercase tracking-widest text-sm font-bold transition-colors group ${isDarkMode ? 'text-muted-gold hover:text-white' : 'text-muted-gold hover:text-deep-teal'}`}
                        >
                        <span>View BCIN-Ready Plans</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>

                    {/* Right Visuals */}
                    <div className="space-y-8">
                        {/* Image */}
                        <div className={`relative h-[500px] w-full group overflow-hidden shadow-2xl rounded-sm border ${borderColor}`}>
                            <img 
                                src="https://pub-698e84d3fce74dc6b4b08c5f5d041da0.r2.dev/about1.webp" 
                                alt="Interior Design" 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
                            />
                            <div className={`absolute inset-0 mix-blend-multiply ${isDarkMode ? 'bg-deep-teal/20' : 'bg-deep-teal/5'}`}></div>
                        </div>

                        {/* Testimonial Placeholder */}
                        <div className={`p-8 rounded-sm border backdrop-blur-sm relative transition-colors duration-300 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-deep-teal/5 border-deep-teal/5'}`}>
                            <Quote className="absolute top-6 left-6 text-muted-gold opacity-30 w-10 h-10" />
                            
                            <div className={`transition-opacity duration-500 ease-in-out ${isTestimonialVisible ? 'opacity-100' : 'opacity-0'}`}>
                              <p className={`relative z-10 italic font-display text-xl leading-relaxed mb-6 pt-4 ${isDarkMode ? 'text-off-white/90' : 'text-deep-teal/90'}`}>
                              "{currentTestimonial.text}"
                              </p>
                              <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-muted-gold rounded-full flex items-center justify-center text-deep-teal font-bold text-xs">
                                    {currentTestimonial.initial}
                                  </div>
                                  <div>
                                      <p className={`text-xs font-bold uppercase tracking-widest ${textColor}`}>{currentTestimonial.author}</p>
                                      <p className="text-[10px] uppercase tracking-wide text-muted-gold">{currentTestimonial.role}</p>
                                  </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </section>
    </div>
  );
};

export default LandingPage;