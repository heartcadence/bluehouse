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
  const images = plan.exteriorGallery || plan.images || [];

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

          {/* Image Container */}
          <div className="relative w-full aspect-[4/3] bg-gray-200">
            {images.length > 0 ? (
              images.map((img, index) => (
                <img
                  key={index}
                  src={urlFor(img).width(800).height(600).url()}
                  alt={plan.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-xs uppercase opacity-40">No Images</div>
            )}
          </div>

          {/* Content Area */}
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
              <button onClick={handleFlip} className="w-full py-3 bg-muted-gold text-deep-teal uppercase text-xs font-bold rounded-sm shadow-md hover:bg-opacity-90 transition-all">
                <RotateCw size={14} className="inline mr-2" /> View Technical Plans
              </button>
            </div>
          </div>
        </div>

        {/* --- BACK SIDE --- */}
        <div className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 ${backBgColor} rounded-sm overflow-hidden flex flex-col z-10`}>
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/5">
            <h4 className={`font-display tracking-wide ${isDarkMode ? 'text-white' : 'text-deep-teal'}`}>Technical Plans</h4>
            <button onClick={handleFlip} className="text-xs uppercase text-muted-gold flex items-center gap-1 hover:opacity-80"><ArrowLeft size={14} /> Back</button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-y-2 text-[11px] uppercase tracking-wide opacity-80">
              <p>Width: <span className="font-bold">{plan.specs?.width}'</span></p>
              <p>Depth: <span className="font-bold">{plan.specs?.depth}'</span></p>
              <p>Format: <span className="font-bold">PDF</span></p>
            </div>

            {/* BCIN Toggle */}
            <div onClick={() => setIncludeBCIN(!includeBCIN)} className="flex items-center justify-between p-3 border border-dashed border-white/30 rounded cursor-pointer hover:bg-white/5 transition-all">
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className={includeBCIN ? 'text-muted-gold' : 'text-white/30'} />
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest">Add BCIN Designation</p>
                  <p className="text-[9px] uppercase opacity-60">Ontario Compliant +$150</p>
                </div>
              </div>
              <div className={`w-8 h-4 rounded-full relative transition-colors ${includeBCIN ? 'bg-muted-gold' : 'bg-gray-500'}`}>
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-all ${includeBCIN ? 'left-4' : 'left-0.5'}`} />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 p-3 bg-black/10 rounded-sm">
              <input
                type="checkbox"
                id={`terms-${plan.slug?.current}`}
                checked={agreedToTerms}
                onChange={() => setAgreedToTerms(!agreedToTerms)}
                className="mt-1 accent-muted-gold h-4 w-4 cursor-pointer"
              />
              <label htmlFor={`terms-${plan.slug?.current}`} className={`text-[10px] uppercase tracking-wider leading-relaxed cursor-pointer ${isDarkMode ? 'text-white/80' : 'text-deep-teal/80'}`}>
                I agree that all sales are final as these are digital products.
              </label>
            </div>
          </div>

          {/* Buy Button Container */}
          <div className="p-4 border-t border-white/10 bg-black/5">
            <button
              onClick={handleBuyNow}
              disabled={!agreedToTerms || isProcessing}
              className={`w-full py-4 rounded-sm uppercase text-xs font-bold tracking-widest transition-all shadow-lg ${!agreedToTerms || isProcessing ? 'bg-gray-500 text-gray-300 cursor-not-allowed opacity-50' : 'bg-deep-teal text-off-white hover:bg-muted-gold hover:text-deep-teal'}`}
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