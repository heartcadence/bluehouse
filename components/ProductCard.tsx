import React, { useState } from 'react';
import { Pencil, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, RotateCw, X, ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { urlFor } from '../lib/sanity.client';

interface ProductCardProps {
  plan: Product;
  isAdmin: boolean;
  isDarkMode: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ plan, isAdmin, isDarkMode }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use exteriorGallery if available, otherwise fallback to images (Dummy data)
  const images = plan.exteriorGallery || plan.images || [];

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (plan.isPlaceholder) return;
    alert(`Initiating Stripe Checkout for: ${plan.title}. Price: $${plan.price}`);
  };

  const handleComplianceCheck = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (plan.isPlaceholder) return;
    alert(`Checking BCIN Compliance for ${plan.title}...\n\nStatus: VALID\nZone: ON, CA`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (plan.isPlaceholder) return;
    alert(`Opening CMS editor for: ${plan.title}`);
  };

  // Styling based on mode
  const cardBgColor = isDarkMode ? 'bg-deep-teal-dark' : 'bg-white shadow-xl';
  const textColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  const subTextColor = isDarkMode ? 'text-off-white/70' : 'text-deep-teal/70';
  const backBgColor = isDarkMode ? 'bg-deep-teal' : 'bg-off-white';
  const backTextColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  
  // Image container background to match card (for seamless object-contain)
  const imageContainerBg = isDarkMode ? 'bg-deep-teal-dark' : 'bg-white';

  // Check for floor plans
  const hasFloorPlans = plan.floorPlanPreviews && plan.floorPlanPreviews.length > 0;

  return (
    <div className={`group relative w-full h-[600px] perspective-1000 ${plan.isPlaceholder ? 'opacity-80' : ''}`}>
      {/* 3D Container */}
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* --- FRONT SIDE (Carousel) --- */}
        <div className={`absolute w-full h-full backface-hidden ${cardBgColor} rounded-sm overflow-hidden flex flex-col`}>
          
          {/* Badge for Placeholders */}
          {plan.isPlaceholder && (
            <div className="absolute top-4 left-4 z-20 bg-deep-teal/80 border border-muted-gold/50 backdrop-blur-md text-muted-gold text-[10px] uppercase tracking-widest px-3 py-1 rounded-sm shadow-lg">
                Coming Soon
            </div>
          )}

          {/* Admin Edit Trigger */}
          {isAdmin && !plan.isPlaceholder && (
            <button 
              onClick={handleEdit}
              className="absolute top-4 right-4 z-20 bg-muted-gold text-deep-teal p-2 rounded-full hover:bg-off-white transition-colors shadow-lg"
            >
              <Pencil size={16} />
            </button>
          )}

          {/* Carousel Container */}
          <div className={`relative h-3/4 w-full ${imageContainerBg}`}>
            {images.map((img, index) => {
                // Handle both Sanity object and string (dummy)
                const imgSrc = typeof img === 'string' 
                  ? img 
                  : urlFor(img).width(800).height(600).fit('max').auto('format').url();

                return (
                  <img 
                    key={index}
                    src={imgSrc} 
                    alt={`${plan.title} view ${index + 1}`} 
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'} ${plan.isPlaceholder ? 'grayscale sepia-[.3]' : ''}`}
                  />
                );
            })}
            
            {/* Overlay Gradient (Subtler now that we use object-contain, mainly for text readability if image overlaps) */}
            <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-deep-teal-dark via-transparent' : 'from-white via-transparent'} opacity-50 pointer-events-none`}></div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                <button 
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-muted-gold/80 text-white rounded-full transition-colors backdrop-blur-sm z-10"
                >
                    <ChevronLeft size={20} />
                </button>
                <button 
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-muted-gold/80 text-white rounded-full transition-colors backdrop-blur-sm z-10"
                >
                    <ChevronRight size={20} />
                </button>
                </>
            )}

            {/* Pagination Dots */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={(e) => handleDotClick(e, index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                currentImageIndex === index ? 'bg-muted-gold w-4' : 'bg-gray-400/50 hover:bg-gray-400'
                            }`}
                        />
                    ))}
                </div>
            )}
          </div>

          {/* Content & Action */}
          <div className="relative flex-1 p-6 flex flex-col justify-between">
             <div>
                <div className="flex justify-between items-start mb-2">
                    <span className="inline-block px-3 py-1 text-[10px] tracking-widest uppercase border border-muted-gold/50 text-muted-gold rounded-full backdrop-blur-sm">
                        {plan.category || 'All'}
                    </span>
                    <span className={`font-display text-xl ${textColor}`}>
                       {plan.isPlaceholder ? '---' : `$${plan.price ? plan.price.toLocaleString() : '0'}`}
                    </span>
                </div>
                
                <h3 className={`font-display text-2xl md:text-3xl mb-1 ${textColor}`}>
                  {plan.title || 'Placeholder Name'}
                </h3>
                <div className={`flex items-center text-xs uppercase tracking-widest space-x-4 ${subTextColor}`}>
                  <span>{plan.specs?.sqft ? plan.specs.sqft.toLocaleString() : '---'} Sq Ft</span>
                  <span>•</span>
                  <span>{plan.specs?.beds || 0} Bed</span>
                  <span>•</span>
                  <span>{plan.specs?.baths || 0} Bath</span>
                </div>
             </div>

             <div className="mt-4">
                <button 
                    onClick={handleFlip}
                    disabled={!!plan.isPlaceholder}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-sm uppercase tracking-widest text-xs font-bold transition-colors shadow-lg ${plan.isPlaceholder ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed' : 'bg-muted-gold text-deep-teal hover:bg-opacity-90'}`}
                >
                    <RotateCw size={14} />
                    <span>View Technical Plans</span>
                </button>
             </div>
          </div>
        </div>

        {/* --- BACK SIDE (Blueprints) --- */}
        <div className={`absolute w-full h-full backface-hidden rotate-y-180 ${backBgColor} ${backTextColor} rounded-sm overflow-hidden flex flex-col`}>
          
          {/* Header */}
          <div className={`flex justify-between items-center p-4 border-b ${isDarkMode ? 'border-off-white/10' : 'border-deep-teal/10'} bg-opacity-50 backdrop-blur-sm z-10 relative`}>
             <h4 className="font-display text-lg tracking-wide">Technical Plans</h4>
             <button 
                onClick={handleFlip}
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-gold hover:text-opacity-80 transition-colors"
             >
                <ArrowLeft size={14} />
                <span>Back to Gallery</span>
             </button>
          </div>

          {/* Scrollable Blueprints */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-muted-gold scrollbar-track-transparent">
             
             {/* Plan Details Summary */}
             <div className="space-y-2 mb-6 border-b border-opacity-10 border-gray-400 pb-4">
                 <h5 className="text-xs uppercase tracking-widest opacity-70">Plan Overview</h5>
                 <div className="grid grid-cols-2 gap-2 text-sm font-light opacity-90">
                     <p>Bedrooms: <span className="font-bold">{plan.specs?.beds || 0}</span></p>
                     <p>Bathrooms: <span className="font-bold">{plan.specs?.baths || 0}</span></p>
                     <p>Format: <span className="font-bold">{plan.fileFormat || 'PDF'}</span></p>
                     <p>Est. Build Cost: <span className="font-bold">$$$</span></p>
                 </div>
             </div>
             
             {/* Floor Plan Previews Section */}
             <div>
                <h5 className="text-xs uppercase tracking-widest opacity-70 mb-3">Floor Plan Previews</h5>
                
                <div className="space-y-4">
                    {hasFloorPlans ? (
                        plan.floorPlanPreviews?.map((preview, idx) => (
                            <div key={idx} className={`rounded-sm overflow-hidden border ${isDarkMode ? 'border-off-white/10' : 'border-deep-teal/10'} shadow-sm`}>
                                <div className={`relative aspect-[3/4] w-full flex items-center justify-center ${imageContainerBg}`}>
                                    <img 
                                        src={preview.url} 
                                        alt={`Floor Plan ${idx + 1}`} 
                                        className="w-full h-full object-contain" 
                                    />
                                </div>
                                <div className={`px-3 py-2 text-[10px] uppercase tracking-widest text-center ${isDarkMode ? 'bg-deep-teal-dark' : 'bg-gray-100'} opacity-80`}>
                                    Sheet {idx + 1}
                                </div>
                            </div>
                        ))
                    ) : (
                        // Empty State Placeholders
                        <>
                           <div className={`h-40 rounded-sm border-2 border-dashed flex items-center justify-center ${isDarkMode ? 'border-off-white/10 bg-white/5' : 'border-deep-teal/10 bg-deep-teal/5'}`}>
                                <span className="text-[10px] uppercase tracking-widest opacity-40">Preview Coming Soon</span>
                           </div>
                           <div className={`h-40 rounded-sm border-2 border-dashed flex items-center justify-center ${isDarkMode ? 'border-off-white/10 bg-white/5' : 'border-deep-teal/10 bg-deep-teal/5'}`}>
                                <span className="text-[10px] uppercase tracking-widest opacity-40">Preview Coming Soon</span>
                           </div>
                        </>
                    )}
                </div>
             </div>

             <div className="pt-4 pb-2">
                 <button 
                    onClick={handleComplianceCheck}
                    disabled={!!plan.isPlaceholder}
                    className={`w-full flex items-center justify-center gap-2 py-3 border border-dashed rounded transition-colors text-xs uppercase tracking-widest ${isDarkMode ? 'border-off-white/30 text-off-white/70' : 'border-deep-teal/30 text-deep-teal/70'} ${plan.isPlaceholder ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted-gold/10'}`}
                 >
                    <ShieldCheck size={14} />
                    <span>Check Zoning Compliance</span>
                 </button>
             </div>
          </div>

          {/* Footer Action */}
          <div className={`p-4 border-t ${isDarkMode ? 'border-off-white/10' : 'border-deep-teal/10'} bg-opacity-90 backdrop-blur-md`}>
             <button
                onClick={handleBuyNow}
                disabled={!!plan.isPlaceholder}
                className={`w-full py-3 rounded-sm transition-colors duration-300 uppercase tracking-widest text-xs font-bold shadow-lg ${plan.isPlaceholder ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed' : 'bg-deep-teal text-off-white hover:bg-muted-gold'}`}
             >
                {plan.isPlaceholder ? 'Not Available' : `Purchase Complete Set - $${plan.price ? plan.price.toLocaleString() : '0'}`}
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;