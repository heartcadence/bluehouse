import React, { useState, useEffect } from 'react';
import { Product, Category } from '../src/types';
import { CATEGORIES } from '../src/constants';
import { client } from '../lib/sanity.client';

// COMPONENT IMPORTS
// These look for "neighbor" files in the same src/components folder
import Header from './Header';
import Hero from './Hero';
import Portfolio from './Portfolio';
import Storefront from './Storefront';
import About from './About';

interface LandingPageProps {
  isDarkMode: boolean;
  activeView: 'collection' | 'contact' | 'about' | 'portfolio';
  setActiveView: (view: 'collection' | 'contact' | 'about' | 'portfolio') => void;
  toggleDarkMode: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ 
  isDarkMode, 
  activeView, 
  setActiveView,
  toggleDarkMode 
}) => {
  // --- STATE MANAGEMENT ---
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [plans, setPlans] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedPlanId, setHighlightedPlanId] = useState<string | null>(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const PLANS_PER_PAGE = 6;

  // --- DATA FETCHING (SANITY) ---
  useEffect(() => {
    let isMounted = true;
    const fetchPlans = async () => {
      setIsLoading(true);
      setCurrentPage(1); // Reset pagination on category change
      
      try {
        const queryCategory = activeCategory === 'All' ? 'ALL' : activeCategory;
        const query = `*[_type == "plan" && ($category == "ALL" || lower(category) == lower($category))]{
          _id,
          _type,
          title,
          price,
          category,
          slug,
          exteriorGallery,
          specs { sqft, beds, baths, width, depth },
          "technicalPlansUrl": technicalPlans.asset->url,
          floorPlanPreviews
        }`;
        
        const params = { category: queryCategory };
        const result = await client.fetch(query, params);
        
        if (isMounted) {
          setPlans(result || []);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Sanity Fetch Error:", error);
        if (isMounted) setIsLoading(false);
      }
    };

    fetchPlans();
    return () => { isMounted = false; };
  }, [activeCategory]);

  // --- THE PORTFOLIO HOOK ---
  // This scrolls the user and filters the shop when clicking "View Plans" in a project
  const handleViewLinkedPlan = (planId: string, category: string) => {
    setActiveView('collection');
    setActiveCategory(category as Category);
    setHighlightedPlanId(planId);
    
    const storefrontElement = document.getElementById('storefront');
    if (storefrontElement) {
      storefrontElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Remove pulse highlight after animation duration
    setTimeout(() => setHighlightedPlanId(null), 4000);
  };

  // --- PAGINATION HELPERS ---
  const totalPages = Math.ceil(plans.length / PLANS_PER_PAGE);
  const displayedPlans = plans.slice((currentPage - 1) * PLANS_PER_PAGE, currentPage * PLANS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      document.getElementById('storefront')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      document.getElementById('storefront')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-fade-in w-full min-h-screen">
      {/* 0. NAVIGATION / HEADER */}
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <main>
        {/* 1. HERO SECTION */}
        <Hero 
          isDarkMode={isDarkMode} 
          onCtaClick={() => setActiveView('collection')} 
        />

        {/* 2. DYNAMIC CONTENT AREA */}
        <section className="relative z-20 -mt-20">
          {/* Navigation Toggle Bar */}
          <div className="flex justify-center mb-16 px-4">
            <div className={`flex flex-wrap justify-center p-1 rounded-full backdrop-blur-md border shadow-2xl ${
              isDarkMode ? 'bg-deep-teal/80 border-white/10' : 'bg-light-bg/80 border-deep-teal/10'
            }`}>
              {['contact', 'collection', 'portfolio'].map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view as any)}
                  className={`px-6 md:px-8 py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all ${
                    activeView === view 
                      ? 'bg-muted-gold text-deep-teal shadow-lg' 
                      : `${isDarkMode ? 'text-off-white' : 'text-deep-teal'} opacity-60 hover:opacity-100`
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full">
            {/* --- COLLECTION / STOREFRONT VIEW --- */}
            {activeView === 'collection' && (
              <div id="storefront" className="scroll-mt-28">
                <Storefront 
                  isDarkMode={isDarkMode}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  plans={displayedPlans}
                  isLoading={isLoading}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPrevPage={handlePrevPage}
                  onNextPage={handleNextPage}
                  highlightedPlanId={highlightedPlanId}
                />
              </div>
            )}

            {/* --- PORTFOLIO VIEW --- */}
            {activeView === 'portfolio' && (
              <Portfolio 
                isDarkMode={isDarkMode} 
                onViewPlan={handleViewLinkedPlan}
              />
            )}

            {/* --- ABOUT VIEW --- */}
            {activeView === 'about' && (
              <About 
                isDarkMode={isDarkMode} 
                onCtaClick={() => setActiveView('collection')} 
              />
            )}
            
            {/* Note: Contact view logic is usually handled inside Header or a separate section */}
          </div>
        </section>
      </main>
      
      {/* GLOBAL CSS FOR PULSE HOOK */}
      <style>{`
        @keyframes plan-pulse {
          0% { box-shadow: 0 0 0 0 rgba(184, 134, 11, 0.7); transform: scale(1); }
          50% { box-shadow: 0 0 20px 10px rgba(184, 134, 11, 0.4); transform: scale(1.02); }
          100% { box-shadow: 0 0 0 0 rgba(184, 134, 11, 0); transform: scale(1); }
        }
        .highlight-pulse {
          animation: plan-pulse 2s infinite;
          border-color: #B8860B !important;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;