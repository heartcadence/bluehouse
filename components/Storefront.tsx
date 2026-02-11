import React from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Product, Category } from '../src/types';
import { CATEGORIES } from '../src/constants';
import ProductCard from './ProductCard';

interface StorefrontProps {
  isDarkMode: boolean;
  activeCategory: Category;
  setActiveCategory: (cat: Category) => void;
  plans: Product[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  highlightedPlanId: string | null;
}

const Storefront: React.FC<StorefrontProps> = ({
  isDarkMode, activeCategory, setActiveCategory, plans, isLoading,
  currentPage, totalPages, onPrevPage, onNextPage, highlightedPlanId
}) => {
  const textColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  const mutedColor = isDarkMode ? 'text-off-white/70' : 'text-dark-text/70';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      {/* Category Filter Bar */}
      <div id="product-grid-top" className={`flex flex-col md:flex-row justify-between items-center mb-12 p-6 rounded-sm backdrop-blur-md border ${isDarkMode ? 'bg-deep-teal/80 border-white/10' : 'bg-light-bg/80 border-deep-teal/10 shadow-lg'}`}>
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-sm text-[10px] uppercase tracking-widest transition-all duration-300 border ${
                activeCategory === category
                  ? 'bg-muted-gold text-deep-teal border-muted-gold font-bold shadow-md'
                  : `bg-transparent hover:border-muted-gold hover:text-muted-gold ${isDarkMode ? 'text-off-white/60' : 'text-deep-teal/60'}`
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-muted-gold" /></div>
      ) : plans.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map(plan => (
              <ProductCard 
                key={plan._id} 
                plan={plan} 
                isDarkMode={isDarkMode}
                isHighlighted={highlightedPlanId === plan._id}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-12">
              <button 
                onClick={onPrevPage} 
                disabled={currentPage === 1} 
                className="disabled:opacity-30 p-2 hover:text-muted-gold transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <span className={`text-[10px] uppercase tracking-widest ${mutedColor}`}>
                Page {currentPage} of {totalPages}
              </span>
              <button 
                onClick={onNextPage} 
                disabled={currentPage === totalPages} 
                className="disabled:opacity-30 p-2 hover:text-muted-gold transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 opacity-50 italic">No plans found in this category.</div>
      )}
    </div>
  );
};

export default Storefront;