import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { Product, Category } from '../src/types';
import { client } from '../lib/sanity.client';
import Hero from './Hero';

// LAZY LOAD COMPONENT IMPORTS
// Hero is now static for performance (LCP)
const Portfolio = lazy(() => import('./Portfolio'));
const Storefront = lazy(() => import('./Storefront'));
const About = lazy(() => import('./About'));
const Contact = lazy(() => import('./Contact'));

interface LandingPageProps {
  isDarkMode: boolean;
  activeView: 'collection' | 'contact' | 'about' | 'portfolio';
  setActiveView: (view: 'collection' | 'contact' | 'about' | 'portfolio') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ 
  isDarkMode, 
  activeView, 
  setActiveView
}) => {
  // --- STATE MANAGEMENT ---
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [plans, setPlans] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedPlanId, setHighlightedPlanId] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const PLANS_PER_PAGE = 6;

  // --- DATA FETCHING (SANITY) ---
  useEffect(() => {
    let isMounted = true;
    const fetchPlans = async () => {
      setIsLoading(true);
      setCurrentPage(1); 
      
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
  const handleViewLinkedPlan = (planId: string, category: string) => {
    setActiveView('collection');
    setActiveCategory(category as Category);
    setHighlightedPlanId(planId);
    
    // Add timeout to ensure the Storefront DOM element is mounted after state change
    setTimeout(() => {
        const storefrontElement = document.getElementById('storefront');
        if (storefrontElement) {
          storefrontElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);

    setTimeout(() => setHighlightedPlanId(null), 4000);
  };

  const totalPages = Math.ceil(plans.length / PLANS_PER_PAGE);
  const displayedPlans = plans.slice((currentPage - 1) * PLANS_PER_PAGE, currentPage * PLANS_PER_PAGE);

  // Common loading fallback for sections
  const SectionLoader = () => (
    <div className="w-full h-96 flex items-center justify-center opacity-50">
      <Loader2 className="w-8 h-8 animate-spin text-muted-gold" />
    </div>
  );

  return (
    <div className="animate-fade-in w-full min-h-screen">
      
      {/* Static Hero Render (No Suspense) */}
      <Hero isDarkMode={isDarkMode} onCtaClick={() => setActiveView('collection')} />

      <section className="relative z-20 -mt-20">
        {/* Inner Toggle Bar: Contact vs Collection (Portfolio removed) */}
        <div className="flex justify-center mb-16 px-4">
          <div className={`flex flex-wrap justify-center p-1 rounded-full backdrop-blur-md border shadow-2xl ${
            isDarkMode ? 'bg-deep-teal/80 border-white/10' : 'bg-light-bg/80 border-deep-teal/10'
          }`}>
            {[
              { id: 'contact', label: 'Contact Us' },
              { id: 'collection', label: 'The Collection' }
            ].map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id as any)}
                className={`px-8 md:px-12 py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all ${
                  activeView === view.id 
                    ? 'bg-muted-gold text-deep-teal shadow-lg' 
                    : `${isDarkMode ? 'text-off-white' : 'text-deep-teal'} opacity-60 hover:opacity-100`
                }`}
              >
                {view.label}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full min-h-[50vh]">
          {activeView === 'contact' && (
            <Suspense fallback={<SectionLoader />}>
              <div className="animate-fade-in">
                <Contact isDarkMode={isDarkMode} />
              </div>
            </Suspense>
          )}

          {activeView === 'collection' && (
            <Suspense fallback={<SectionLoader />}>
              <div id="storefront" className="scroll-mt-28 animate-fade-in">
                <Storefront 
                  isDarkMode={isDarkMode}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  plans={displayedPlans}
                  isLoading={isLoading}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPrevPage={() => setCurrentPage(p => p - 1)}
                  onNextPage={() => setCurrentPage(p => p + 1)}
                  highlightedPlanId={highlightedPlanId}
                />
              </div>
            </Suspense>
          )}

          {activeView === 'portfolio' && (
            <Suspense fallback={<SectionLoader />}>
              <div className="animate-fade-in">
                <Portfolio isDarkMode={isDarkMode} onViewPlan={handleViewLinkedPlan} />
              </div>
            </Suspense>
          )}

          {activeView === 'about' && (
            <Suspense fallback={<SectionLoader />}>
              <div className="animate-fade-in">
                <About isDarkMode={isDarkMode} onCtaClick={() => setActiveView('collection')} />
              </div>
            </Suspense>
          )}
        </div>
      </section>

      <style>{`
        @keyframes plan-pulse {
          0% { box-shadow: 0 0 0 0 rgba(184, 134, 11, 0.7); transform: scale(1); }
          50% { box-shadow: 0 0 25px 10px rgba(184, 134, 11, 0.4); transform: scale(1.02); }
          100% { box-shadow: 0 0 0 0 rgba(184, 134, 11, 0); transform: scale(1); }
        }
        .highlight-pulse {
          animation: plan-pulse 2s infinite !important;
          border: 2px solid #B8860B !important;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;