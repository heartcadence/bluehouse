import React, { useState } from 'react';
import { ShieldCheck, ChevronLeft, ChevronRight, RotateCw, ArrowLeft, Loader2 } from 'lucide-react';
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
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const BCIN_PRICE = 150;
  const basePrice = plan.price || 0;
  const totalPrice = basePrice + (includeBCIN ? BCIN_PRICE : 0);

  // Restore correct image source priority
  const images = plan.exteriorGallery || plan.images || [];
  const hasFloorPlans = plan.floorPlanPreviews && plan.floorPlanPreviews.length > 0;

  const handleNextImage = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentImageIndex((p) => (p + 1) % images.length); };
  const handlePrevImage = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentImageIndex((p) => (p - 1 + images.length) % images.length); };
  const handleFlip = (e: React.MouseEvent) => { e.stopPropagation(); setIsFlipped(!isFlipped); };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (plan.isPlaceholder || isProcessing || !agreedToTerms) return;
    setIsProcessing(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: plan.slug?.current, includeBCIN }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error);
    } catch (err: any) {
      alert(err.message);
      setIsProcessing(false);
    }
  };

  const cardBgColor = isDarkMode ? 'bg-deep-teal-dark' : 'bg-white shadow-xl';
  const textColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  const subTextColor = isDarkMode ? 'text-off-white/70' : 'text-deep-teal/70';
  const backBgColor = isDarkMode ? 'bg-deep-teal' : 'bg-off-white';

  return (
    <div className={`group relative w-full h-[540px] perspective-1000 ${plan.isPlaceholder ? 'opacity-80' : ''}`}>
      <div className={`relative w-full h-full transition-all duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>

        {/* --- FRONT SIDE --- */}
        <div className={`absolute inset-0 w-full h-full backface-hidden ${cardBgColor} rounded-sm overflow-hidden flex flex-col z-10`}>

          <div className="relative w-full aspect-[4/3] bg-gray-200">
            {images.map((img, index) => (
              <img
                key={index}
                src={urlFor(img).width(800).height(600).url()}
                alt={plan.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            {images.length > 1 && (
              <>
                <button onClick={handlePrevImage} aria-label="Previous image" className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-muted-gold text-white rounded-full z-10"><ChevronLeft size={20} /></button>
                <button onClick={handleNextImage} aria-label="Next image" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-muted-gold text-white rounded-full z-10"><ChevronRight size={20} /></button>
              </>
            )}
          </div>

          <div className="p-5 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] tracking-widest uppercase border border-muted-gold/50 text-muted-gold px-2 py-1 rounded-full">{plan.category || 'Plan'}</span>
              <span className={`font-display text-xl ${textColor}`}>${basePrice.toLocaleString()}</span>
            </div>
            <h3 className={`font-display text-2xl mb-1 ${textColor}`}>{plan.title}</h3>
            <div className={`flex items-center text-[10px] uppercase tracking-widest space-x-4 ${subTextColor}`}>
              <span>{plan.specs?.sqft} SQ FT</span>
              <span>{plan.specs?.beds} BED</span>
              <span>{plan.specs?.baths} BATH</span>
            </div>

            <div className="mt-auto">
              <button onClick={handleFlip} className="w-full py-3 bg-muted-gold text-deep-teal uppercase text-xs font-bold rounded-sm shadow-md hover:bg-opacity-90">
                <RotateCw size={14} className="inline mr-2" /> View Technical Plans
              </button>
            </div>
          </div>
        </div>

        {/* --- BACK SIDE --- */}
        <div className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 ${backBgColor} rounded-sm overflow-hidden flex flex-col z-10`}>
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/5">
            <h4 className={`font-display tracking-wide ${isDarkMode ? 'text-white' : 'text-deep-teal'}`}>Technical Plans</h4>
            <button onClick={handleFlip} className="text-xs uppercase text-muted-gold flex items-center gap-1"><ArrowLeft size={14} /> Back</button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Restored Specs Table */}
            <div className="grid grid-cols-2 gap-y-2 text-[11px] uppercase tracking-wide opacity-80">
              <p>Width: <span className="font-bold">{plan.specs?.width || '-'}’</span></p>
              <p>Depth: <span className="font-bold">{plan.specs?.depth || '-'}’</span></p>
              <p>Format: <span className="font-bold">{plan.fileFormat || 'PDF'}</span></p>
            </div>

            {/* RESTORED FLOOR PLAN PREVIEWS */}
            <div className="space-y-4">
              <h5 className="text-[10px] uppercase tracking-widest opacity-60">Floor Plan Previews</h5>
              {hasFloorPlans ? (
                plan.floorPlanPreviews?.map((preview, idx) => (
                  <div key={idx} className="rounded-sm overflow-hidden border border-white/10">
                    <img
                      src={urlFor(preview).width(600).url()}
                      alt={`Floor Plan ${idx + 1}`}
                      className="w-full h-auto bg-white"
                    />
                  </div>
                ))
              ) : (
                <div className="h-20 border-2 border-dashed border-white/10 flex items-center justify-center text-[10px] uppercase opacity-40">Coming Soon</div>
              )}
            </div>

            <button type="button" onClick={() => setIncludeBCIN(!includeBCIN)} aria-pressed={includeBCIN} className="flex items-center justify-between w-full p-3 border border-dashed border-white/30 rounded cursor-pointer text-left">
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className={includeBCIN ? 'text-muted-gold' : 'text-white/30'} />
                <div className="text-left text-[10px] uppercase">
                  <p className="font-bold">Add BCIN Designation</p>
                  <p className="opacity-60">Ontario Compliant +$150</p>
                </div>
              </div>
              <div className={`w-8 h-4 rounded-full relative ${includeBCIN ? 'bg-muted-gold' : 'bg-gray-500'}`}>
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${includeBCIN ? 'left-4' : 'left-0.5'}`} />
              </div>
            </button>

            <div className="flex items-start gap-3 p-3 bg-black/10 rounded-sm">
              <input type="checkbox" checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} className="mt-1 h-4 w-4 accent-muted-gold cursor-pointer" />
              <label className="text-[10px] uppercase tracking-wider leading-relaxed cursor-pointer opacity-80">
                I agree that all sales are final as these are digital products.
              </label>
            </div>
          </div>

          <div className="p-4 border-t border-white/10 bg-black/5">
            <button
              onClick={handleBuyNow}
              disabled={!agreedToTerms || isProcessing}
              className={`w-full py-4 rounded-sm uppercase text-xs font-bold tracking-widest transition-all ${!agreedToTerms || isProcessing ? 'bg-gray-500 text-gray-300' : 'bg-deep-teal text-off-white hover:bg-muted-gold hover:text-deep-teal'}`}
            >
              {isProcessing ? <Loader2 className="animate-spin mx-auto" size={18} /> : `Purchase - $${totalPrice}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;