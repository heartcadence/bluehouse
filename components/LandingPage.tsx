import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Facebook, CheckCircle, Quote, ArrowRight, ShieldCheck, ChevronDown } from 'lucide-react';
import { Product, Category } from '../src/types';
import { CATEGORIES } from '../src/constants';
import ProductCard from './ProductCard';
import { client } from '../lib/sanity.client';

interface LandingPageProps {
  isDarkMode: boolean;
  activeView: 'collection' | 'contact' | 'about';
  setActiveView: (view: 'collection' | 'contact' | 'about') => void;
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

const LandingPage: React.FC<LandingPageProps> = ({ isDarkMode, activeView, setActiveView }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [plans, setPlans] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isTestimonialVisible, setIsTestimonialVisible] = useState(true);
  
  // Pagination State
  const [visibleCount, setVisibleCount] = useState(6);
  const ITEMS_PER_LOAD = 6;

  const textColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  const mutedColor = isDarkMode ? 'text-off-white/70' : 'text-dark-text/70';
  const borderColor = isDarkMode ? 'border-off-white/20' : 'border-deep-teal/20';

  // Fetch Sanity Data with Category Filtering
  useEffect(() => {
    let isMounted = true;

    const fetchPlans = async () => {
      setIsLoading(true);
      // Reset pagination when category changes
      setVisibleCount(ITEMS_PER_LOAD);
      
      try {
        // Use 'ALL' as the sentinel value for the "All" category to bypass filtering.
        // Otherwise pass the active category name.
        const queryCategory = activeCategory === 'All' ? 'ALL' : activeCategory;

        // Query using the variable $category.
        // We use lower() for case-insensitive comparison to match Sanity data conventions.
        const query = `*[_type == "plan" && ($category == "ALL" || lower(category) == lower($category))]{
          _id,
          _type,
          title,
          price,
          category,
          slug,
          exteriorGallery,
          specs {
            sqft,
            beds,
            baths,
            width,
            depth
          },
          "technicalPlansUrl": technicalPlans.asset->url,
          floorPlanPreviews
        }`;
        
        // Pass the calculated queryCategory as the $category parameter
        const params = { category: queryCategory };
        const result = await client.fetch(query, params);
        
        if (isMounted) {
          if (result) {
            setPlans(result);
          } else {
            setPlans([]); 
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Sanity Fetch Error:", error);
        if (isMounted) {
            setPlans([]); 
            setIsLoading(false);
        }
      }
    };

    fetchPlans();

    return () => {
      isMounted = false;
    };
  }, [activeCategory]); 

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTestimonialVisible(false);
      setTimeout(() => {
        setCurrentTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        setIsTestimonialVisible(true);
      }, 1125); 
    }, 9000); 

    return () => clearInterval(interval);
  }, []);

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

  const handleAboutCta = () => {
    setActiveView('collection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_LOAD);
  };

  const currentTestimonial = TESTIMONIALS[currentTestimonialIndex];
  const displayedPlans = plans.slice(0, visibleCount);

  return (
    <div className="animate-fade-in w-full">
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <picture>
             {/* AVIF Sources (Primary) */}
             <source 
                srcSet="https://pub-698e84d3fce74dc6b4b08c5f5d041da0.r2.dev/hero2.avif" 
                media="(min-width: 769px)" 
                type="image/avif" 
             />
             <source 
                srcSet="https://pub-698e84d3fce74dc6b4b08c5f5d041da0.r2.dev/hero2.avif?w=800" 
                media="(max-width: 768px)" 
                type="image/avif" 
             />
             
             {/* Fallback */}
             <img
                src="https://pub-698e84d3fce74dc6b4b08c5f5d041da0.r2.dev/hero2.avif"
                alt="Modern Architectural House"
                loading="eager"
                // @ts-ignore
                fetchPriority="high"
                decoding="async"
                className={`w-full h-full object-cover transition-opacity duration-700 ${isDarkMode ? 'opacity-30' : 'opacity-90'}`}
             />
          </picture>
          <div className={`absolute inset-0 bg-gradient-to-b ${isDarkMode ? 'from-deep-teal/90 via-deep-teal/50 to-deep-teal' : 'from-light-bg/80 via-light-bg/40 to-light-bg'}`}></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-[-40px]">
          <h2 className="text-muted-gold uppercase tracking-[0.3em] text-xs md:text-sm mb-6 animate-slide-up">
            Bluehouse Planning & Designs
          </h2>
          <h1 className={`font-display text-6xl md:text-8xl lg:text-9xl mb-10 leading-none ${textColor} animate-slide-up animation-delay-200`}>
            Visionary <br/> <span className="italic text-muted-gold">Architecture</span>
          </h1>

          <div className="mt-8 animate-slide-up animation-delay-400 flex flex-col items-center">
             <button 
               onClick={handleHeroCta}
               className="px-10 py-4 bg-muted-gold text-deep-teal font-bold tracking-[0.2em] uppercase text-xs rounded-sm hover:bg-off-white transition-all duration-300 shadow-[0_0_20px_rgba(166,133,98,0.3)] hover:shadow-[0_0_30px_rgba(166,133,98,0.5)]"
             >
               Find My Dream Home
             </button>
             
             {/* Trust & Legal Indicators */}
             <div className="mt-8 flex flex-col items-center animate-fade-in animation-delay-600 space-y-2">
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                    <span className={`text-[10px] uppercase tracking-widest font-bold ${isDarkMode ? 'text-muted-gold' : 'text-deep-teal'}`}>
                        BCIN Registered
                    </span>
                    <span className={`hidden md:block w-1 h-1 rounded-full ${isDarkMode ? 'bg-white/20' : 'bg-deep-teal/20'}`}></span>
                    <span className={`text-[10px] uppercase tracking-widest font-bold ${isDarkMode ? 'text-muted-gold' : 'text-deep-teal'}`}>
                        Ontario Building Code Compliant
                    </span>
                </div>
                
                <div className="flex items-center space-x-2 opacity-70">
                    <ShieldCheck className="w-3 h-3 text-muted-gold" />
                    <span className={`text-[9px] uppercase tracking-widest font-light ${isDarkMode ? 'text-off-white' : 'text-deep-teal'}`}>
                        Verified Local Expertise
                    </span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Dynamic Content Section */}
      <section id="dynamic-content" className="min-h-[600px] relative z-20 -mt-20 scroll-mt-28">
          
            {/* Toggle Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 mb-16">
                <div className="flex justify-center animate-slide-up animation-delay-400 pointer-events-none">
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
            </div>

            <div className="w-full">

                {/* --- COLLECTION VIEW --- */}
                <div className={`transition-all duration-500 ease-in-out ${activeView === 'collection' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
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
                                    ? 'bg-muted-gold text-deep-teal border-muted-gold font-bold shadow-md'
                                    : `bg-transparent hover:border-muted-gold hover:text-muted-gold ${isDarkMode ? 'text-off-white/60 border-transparent' : 'text-deep-teal/60 border-transparent'}`
                                }`}
                                >
                                {category}
                                </button>
                            ))}
                            </div>
                        </div>

                        {/* Product Grid */}
                        {plans.length > 0 ? (
                            <>
                                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                                    {displayedPlans.map(plan => (
                                        <ProductCard 
                                        key={plan._id} 
                                        plan={plan} 
                                        isDarkMode={isDarkMode}
                                        />
                                    ))}
                                </div>

                                {/* Pagination Button */}
                                {plans.length > displayedPlans.length && (
                                    <div className="mt-16 flex justify-center">
                                        <button 
                                            onClick={handleLoadMore}
                                            className={`group flex items-center gap-3 px-8 py-3 rounded-sm border transition-all duration-300 ${
                                                isDarkMode 
                                                ? 'border-muted-gold text-muted-gold hover:bg-muted-gold hover:text-deep-teal' 
                                                : 'border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-white'
                                            }`}
                                        >
                                            <span className="text-xs font-bold uppercase tracking-widest">View More Designs</span>
                                            <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            !isLoading && (
                                <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
                                    <div className={`text-xl font-display italic ${mutedColor}`}>
                                        New designs coming soon to the {activeCategory} collection.
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* --- CONTACT VIEW --- */}
                <div className={`transition-all duration-500 ease-in-out ${activeView === 'contact' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
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
                </div>

                {/* --- ABOUT VIEW (Full Width Sections) --- */}
                <div className={`transition-all duration-500 ease-in-out ${activeView === 'about' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
                    
                        {/* Who We Are Section */}
                        <section id="about" className={`pb-20 pt-8 transition-colors duration-300 ${isDarkMode ? 'bg-deep-teal' : 'bg-slate-50 border-t border-slate-200/50'}`}>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="max-w-3xl mx-auto text-center">
                                    <h2 className="text-muted-gold text-sm tracking-[0.2em] uppercase mb-8">Who We Are</h2>
                                    <p className={`text-lg md:text-xl font-light leading-relaxed ${mutedColor} italic`}>
                                        "Bluehouse Planning & Designs Inc. is led by a dedicated, <span className={isDarkMode ? 'text-off-white' : 'text-deep-teal'}>real person</span> with over a decade of hands-on, local architectural expertise. We bridge the gap between visionary aesthetics and practical construction, offering BCIN Registered, Ontario-compliant solutions that ensure your dream home becomes a reality without the red tape."
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Our Philosophy Section */}
                        <section id="philosophy" className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-deep-teal-dark' : 'bg-slate-200'}`}>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                                    {/* Left Content */}
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-muted-gold text-sm tracking-[0.2em] uppercase mb-4">Our Philosophy</h3>
                                            <h4 className={`font-display text-3xl md:text-4xl leading-tight ${textColor} mb-6`}>
                                            Great Homes Start with Great Planning.
                                            </h4>
                                            <p className={`font-display text-xl leading-relaxed italic ${mutedColor}`}>
                                                We turn your ideas into clear, high-quality plans, so you can build with confidence.
                                            </p>
                                        </div>
                                        
                                        <div className={`space-y-6 text-lg font-light leading-relaxed ${mutedColor}`}>
                                            <p>
                                            At Bluehouse, we know that building a home is a big deal. You shouldn’t have to guess if what’s on paper will actually look good when it's finished. We use high-quality imagery to show you exactly how your rooms will look and feel before you ever break ground.
                                            </p>
                                            <p>
                                            By getting every detail right at the start, we help you avoid mistakes and keep your project on track. We specialize in navigating local requirements to get your <span className="text-muted-gold">building permits approved quickly and easily</span>. We handle the technical headaches and paperwork so you can focus on the excitement of finally moving into a home that fits your life perfectly.
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
                                            onClick={handleAboutCta}
                                            className={`mt-8 flex items-center gap-3 uppercase tracking-widest text-sm font-bold transition-colors group ${isDarkMode ? 'text-muted-gold hover:text-white' : 'text-muted-gold hover:text-deep-teal'}`}
                                        >
                                            <span>View BCIN-Ready Plans</span>
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </button>
                                    </div>

                                    {/* Right Visuals */}
                                    <div className="space-y-8 lg:sticky lg:top-32">
                                        {/* Image - Optimized with AVIF & Lazy Loading */}
                                        <div className={`relative h-[500px] w-full group overflow-hidden shadow-2xl rounded-sm border ${borderColor}`}>
                                            <picture>
                                                <source srcSet="https://pub-698e84d3fce74dc6b4b08c5f5d041da0.r2.dev/about1.avif" type="image/avif" />
                                                <img 
                                                    src="https://pub-698e84d3fce74dc6b4b08c5f5d041da0.r2.dev/about1.webp" 
                                                    alt="Interior Design" 
                                                    width="800"
                                                    height="1000"
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
                                                />
                                            </picture>
                                            <div className={`absolute inset-0 mix-blend-multiply ${isDarkMode ? 'bg-deep-teal/20' : 'bg-deep-teal/5'}`}></div>
                                        </div>

                                        {/* Testimonial Placeholder */}
                                        <div className={`p-8 rounded-sm border backdrop-blur-sm relative transition-colors duration-300 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-deep-teal/5 border-deep-teal/5'}`}>
                                            <Quote className="absolute top-6 left-6 text-muted-gold opacity-30 w-10 h-10" />
                                            
                                            <div className={`transition-opacity duration-[1125ms] ease-in-out ${isTestimonialVisible ? 'opacity-100' : 'opacity-0'}`}>
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
                        </section>
                </div>

            </div>
      </section>
    </div>
  );
};

export default LandingPage;