import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, RotateCw, X, ArrowLeft, Loader2 } from 'lucide-react';
import { Product } from '../src/types';
import { urlFor } from '../lib/sanity.client';

interface ProductCardProps {
  plan: Product;
  isDarkMode: boolean;
  isHighlighted?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ plan, isDarkMode, isHighlighted }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [includeBCIN, setIncludeBCIN] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // New loading state

  const BCIN_PRICE = 150;
  const basePrice = plan.price || 0;
  const totalPrice = basePrice + (includeBCIN ? BCIN_PRICE : 0);

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

  /**
   * REPLACED: Initiates real Stripe Checkout
   */
  const handleBuyNow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (plan.isPlaceholder || isProcessing) return;

    setIsProcessing(true);

    try {
      // 1. Call your backend API to create a checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: plan.slug?.current,
          includeBCIN: includeBCIN,
          totalPrice: totalPrice,
          planTitle: plan.title,
        }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const session = await response.json();

      // 2. Redirect to Stripe's secure hosted checkout page
      if (session?.url) {
        window.location.href = session.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong with the checkout process. Please try again.");
      setIsProcessing(false);
    }
  };

  // Styling based on mode
  const cardBgColor = isDarkMode ? 'bg-deep-teal-dark' : 'bg-white shadow-xl';
  const textColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  const subTextColor = isDarkMode ? 'text-off-white/70' : 'text-deep-teal/70';
  const backBgColor = isDarkMode ? 'bg-deep-teal' : 'bg-off-white';
  const backTextColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  const imageContainerBg = isDarkMode ? 'bg-deep-teal-dark' : 'bg-white';

  const hasFloorPlans = plan.floorPlanPreviews && plan.floorPlanPreviews.length > 0;

  return (
    <div className={`group relative w-full h-[540px] perspective-1000 ${plan.isPlaceholder ? 'opacity-80' : ''}`}>
      <div
        className={`relative w-full h-full transition-all duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''
          } ${isHighlighted ? 'scale-[1.02]' : ''}`}
      >
        {isHighlighted && (
          <div className="absolute -inset-2 rounded-lg bg-muted-gold opacity-50 blur-lg animate-pulse z-0"></div>
        )}

        {/* --- FRONT SIDE --- */}
        <div className={`absolute w-full h-full backface-hidden ${cardBgColor} rounded-sm overflow-hidden flex flex-col z-10 ${isHighlighted ? 'ring-2 ring-muted-gold' : ''}`}>

          {plan.isPlaceholder && (
            <div className="absolute top-4 left-4 z-20 bg-deep-teal/80 border border-muted-gold/50 backdrop-blur-md text-muted-gold text-[10px] uppercase tracking-widest px-3 py-1 rounded-sm shadow-lg">
              Coming Soon
            </div>
          )}

          <div className={`relative w-full aspect-[4/3] ${imageContainerBg}`}>
            {images.map((img, index) => {
              const imgSrc = typeof img === 'string'
                ? img
                : urlFor(img).width(800).height(600).quality(80).fit('crop').auto('format').url();

              return (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`${plan.title} view ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'} ${plan.isPlaceholder ? 'grayscale sepia-[.3]' : ''}`}
                />
              );
            })}

            <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-deep-teal-dark via-transparent' : 'from-white via-transparent'} opacity-50 pointer-events-none`}></div>

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

            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => handleDotClick(e, index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentImageIndex === index ? 'bg-muted-gold w-4' : 'bg-gray-400/50 hover:bg-gray-400'
                      }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="relative flex-1 p-5 flex flex-col">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="inline-block px-3 py-1 text-[10px] tracking-widest uppercase border border-muted-gold/50 text-muted-gold rounded-full backdrop-blur-sm">
                  {plan.category || 'All'}
                </span>
                <span className={`font-display text-xl ${textColor}`}>
                  {plan.isPlaceholder ? '---' : `$${basePrice.toLocaleString()}`}
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

            <div className="flex-grow flex items-end pb-1">
              <p className={`text-[10px] uppercase tracking-widest opacity-60 ${subTextColor}`}>
                DIMENSIONS: {plan.specs?.width || '—'}’ x {plan.specs?.depth || '—'}’
              </p>
            </div>

            <div className="mt-3">
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

        {/* --- BACK SIDE --- */}
        <div className={`absolute w-full h-full backface-hidden rotate-y-180 ${backBgColor} ${backTextColor} rounded-sm overflow-hidden flex flex-col z-10`}>

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

          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-muted-gold scrollbar-track-transparent">
            <div className="space-y-2 mb-6 border-b border-opacity-10 border-gray-400 pb-4">
              <h5 className="text-xs uppercase tracking-widest opacity-70">Plan Overview</h5>
              <div className="grid grid-cols-2 gap-2 text-sm font-light opacity-90">
                <p>Bedrooms: <span className="font-bold">{plan.specs?.beds || 0}</span></p>
                <p>Bathrooms: <span className="font-bold">{plan.specs?.baths || 0}</span></p>
                <p>Format: <span className="font-bold">{plan.fileFormat || 'PDF'}</span></p>
                <p>Est. Build Cost: <span className="font-bold">$$$</span></p>
                <p>Width: <span className="font-bold">{plan.specs?.width || '-'}’</span></p>
                <p>Depth: <span className="font-bold">{plan.specs?.depth || '-'}’</span></p>
              </div>
            </div>

            <div>
              <h5 className="text-xs uppercase tracking-widest opacity-70 mb-3">Floor Plan Previews</h5>
              <div className="space-y-4">
                {hasFloorPlans ? (
                  plan.floorPlanPreviews?.map((preview: any, idx) => {
                    const previewSrc = (preview.asset || preview._type === 'image')
                      ? urlFor(preview).width(800).quality(80).auto('format').url()
                      : preview.url;

                    return (
                      <div key={idx} className={`rounded-sm overflow-hidden border ${isDarkMode ? 'border-off-white/10' : 'border-deep-teal/10'} shadow-sm`}>
                        <div className={`relative aspect-[4/3] w-full flex items-center justify-center ${imageContainerBg}`}>
                          <img
                            src={previewSrc}
                            alt={`Floor Plan ${idx + 1}`}
                            loading="lazy"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className={`px-3 py-2 text-[10px] uppercase tracking-widest text-center ${isDarkMode ? 'bg-deep-teal-dark' : 'bg-gray-100'} opacity-80`}>
                          Sheet {idx + 1}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className={`h-40 rounded-sm border-2 border-dashed flex items-center justify-center ${isDarkMode ? 'border-off-white/10 bg-white/5' : 'border-deep-teal/10 bg-deep-teal/5'}`}>
                    <span className="text-[10px] uppercase tracking-widest opacity-40">Preview Coming Soon</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 pb-2">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (!plan.isPlaceholder) setIncludeBCIN(!includeBCIN);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 border border-dashed rounded transition-colors cursor-pointer select-none ${isDarkMode ? 'border-off-white/30 hover:bg-white/5' : 'border-deep-teal/30 hover:bg-deep-teal/5'} ${plan.isPlaceholder ? 'opacity-50 pointer-events-none' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-full transition-colors ${includeBCIN ? 'bg-muted-gold text-deep-teal' : (isDarkMode ? 'bg-white/10 text-off-white/50' : 'bg-deep-teal/10 text-deep-teal/50')}`}>
                    <ShieldCheck size={14} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className={`text-[10px] uppercase tracking-widest font-bold ${isDarkMode ? 'text-off-white' : 'text-deep-teal'}`}>
                      Add BCIN Designation
                    </span>
                    <span className={`text-[9px] uppercase tracking-wide opacity-70 ${isDarkMode ? 'text-off-white' : 'text-deep-teal'}`}>
                      Ontario Compliant +${BCIN_PRICE}
                    </span>
                  </div>
                </div>

                <div className={`relative w-8 h-4 rounded-full transition-colors duration-300 ${includeBCIN ? 'bg-muted-gold' : 'bg-gray-400/50'}`}>
                  <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-300 ${includeBCIN ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-4 border-t ${isDarkMode ? 'border-off-white/10' : 'border-deep-teal/10'} bg-opacity-90 backdrop-blur-md`}>
            <button
              onClick={handleBuyNow}
              disabled={!!plan.isPlaceholder || isProcessing}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-sm transition-colors duration-300 uppercase tracking-widest text-xs font-bold shadow-lg ${plan.isPlaceholder || isProcessing ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed' : 'bg-deep-teal text-off-white hover:bg-muted-gold'}`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" size={14} />
                  <span>Preparing Secure Checkout...</span>
                </>
              ) : (
                plan.isPlaceholder ? 'Not Available' : `Purchase Complete Set - $${totalPrice.toLocaleString()}`
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;