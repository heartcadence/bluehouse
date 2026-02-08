import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Plus } from 'lucide-react';
import { Product, Category } from '../types';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import ProductCard from './ProductCard';

interface LandingPageProps {
  isDarkMode: boolean;
  isAdmin: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ isDarkMode, isAdmin }) => {
  const [activeView, setActiveView] = useState<'store' | 'contact'>('store');
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const textColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  const mutedColor = isDarkMode ? 'text-off-white/70' : 'text-dark-text/70';
  const borderColor = isDarkMode ? 'border-off-white/20' : 'border-deep-teal/20';

  // Storefront Logic
  const filteredProducts = activeCategory === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  const handleAddNewPlan = () => {
    alert("Admin Action: Opening 'Add New Product' form in CMS...");
  };

  return (
    <div className="animate-fade-in w-full">
      {/* Hero */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2700&auto=format&fit=crop"
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
          
          {/* Main Toggles */}
          <div className="flex justify-center items-center animate-slide-up animation-delay-400">
            <div className={`flex p-1 rounded-full backdrop-blur-md border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-deep-teal/5 border-deep-teal/10'}`}>
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
                    onClick={() => setActiveView('store')}
                    className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                        activeView === 'store'
                        ? 'bg-muted-gold text-deep-teal shadow-lg'
                        : `${textColor} hover:bg-white/10`
                    }`}
                >
                    Storefront
                </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Content Section */}
      <section className="min-h-[600px] relative z-20 -mt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* --- STOREFRONT VIEW --- */}
            <div className={`transition-all duration-500 ease-in-out ${activeView === 'store' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
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
                            Send Inquiry
                        </button>
                    </form>
                 </div>
            </div>

        </div>
      </section>

      {/* Philosophy / About */}
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