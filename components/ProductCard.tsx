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
  const [agreedToTerms, setAgreedToTerms] = useState(false); // New State
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
  const backBgColor = isDarkMode ? 'bg-deep-teal' : 'bg-off-white';

  return (
    <div className="group relative w-full h-[540px] perspective-1000">
      <div className={`relative w-full h-full transition-all duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>

        {/* FRONT SIDE (Condensed for brevity, keep your image logic) */}
        <div className={`absolute w-full h-full backface-hidden ${cardBgColor} rounded-sm overflow-hidden flex flex-col z-10`}>
          {/* ... Keep your existing Front Side Image & Title Code here ... */}
          <div className="p-5 mt-auto">
            <button onClick={handleFlip} className="w-full py-3 bg-muted-gold text-deep-teal uppercase text-xs font-bold rounded-sm">
              <RotateCw size={14} className="inline mr-2" /> View Technical Plans
            </button>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className={`absolute w-full h-full backface-hidden rotate-y-180 ${backBgColor} rounded-sm overflow-hidden flex flex-col z-10`}>
          <div className="p-4 border-b border-white/10 flex justify-between">
            <h4 className="font-display">Technical Plans</h4>
            <button onClick={handleFlip} className="text-xs uppercase text-muted-gold flex items-center gap-1"><ArrowLeft size={14} /> Back</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* BCIN Toggle */}
            <div onClick={() => setIncludeBCIN(!includeBCIN)} className="flex items-center justify-between p-3 border border-dashed border-white/30 rounded cursor-pointer">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className={includeBCIN ? 'text-muted-gold' : 'text-white/30'} />
                <div className="text-left text-[10px] uppercase">
                  <p className="font-bold">Add BCIN Designation</p>
                  <p className="opacity-70">Ontario Compliant +$150</p>
                </div>
              </div>
              <div className={`w-8 h-4 rounded-full relative ${includeBCIN ? 'bg-muted-gold' : 'bg-gray-500'}`}>
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${includeBCIN ? 'left-4' : 'left-0.5'}`} />
              </div>
            </div>

            {/* TERMS CHECKBOX */}
            <div className="flex items-start gap-2 p-2 bg-black/10 rounded">
              <input
                type="checkbox"
                id={`terms-${plan.slug?.current}`}
                checked={agreedToTerms}
                onChange={() => setAgreedToTerms(!agreedToTerms)}
                className="mt-1 accent-muted-gold"
              />
              <label htmlFor={`terms-${plan.slug?.current}`} className="text-[9px] uppercase tracking-wider opacity-80 leading-relaxed cursor-pointer">
                I agree that all sales are final as these are digital products. I have reviewed the site terms and conditions.
              </label>
            </div>
          </div>

          <div className="p-4 border-t border-white/10">
            <button
              onClick={handleBuyNow}
              disabled={!agreedToTerms || isProcessing}
              className={`w-full py-3 rounded-sm uppercase text-xs font-bold transition-all ${!agreedToTerms || isProcessing ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-deep-teal text-off-white hover:bg-muted-gold hover:text-deep-teal'}`}
            >
              {isProcessing ? <Loader2 className="animate-spin mx-auto" size={16} /> : `Purchase - $${totalPrice}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;