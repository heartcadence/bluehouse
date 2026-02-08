import React, { useState } from 'react';
import { Pencil, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, RotateCw, X, ArrowLeft } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isAdmin: boolean;
  isDarkMode: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isAdmin, isDarkMode }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
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
    alert(`Initiating Stripe Checkout for: ${product.title}. Price: $${product.price}`);
  };

  const handleComplianceCheck = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Checking BCIN Compliance for ${product.title}...\n\nStatus: VALID\nZone: ON, CA`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Opening CMS editor for: ${product.title}`);
  };

  // Styling based on mode
  const cardBgColor = isDarkMode ? 'bg-deep-teal-dark' : 'bg-white shadow-xl';
  const textColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  const subTextColor = isDarkMode ? 'text-off-white/70' : 'text-deep-teal/70';
  const backBgColor = isDarkMode ? 'bg-deep-teal' : 'bg-off-white';
  const backTextColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';

  return (
    <div className="group relative w-full h-[600px] perspective-1000">
      {/* 3D Container */}
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* --- FRONT SIDE (Carousel) --- */}
        <div className={`absolute w-full h-full backface-hidden ${cardBgColor} rounded-sm overflow-hidden flex flex-col`}>
          
          {/* Admin Edit Trigger */}
          {isAdmin && (
            <button 
              onClick={handleEdit}
              className="absolute top-4 right-4 z-20 bg-muted-gold text-deep-teal p-2 rounded-full hover:bg-off-white transition-colors shadow-lg"
            >
              <Pencil size={16} />
            </button>
          )}

          {/* Carousel Container */}
          <div className="relative h-3/4 w-full bg-black">
            {product.images.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`${product.title} view ${index + 1}`} 
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            
            {/* Overlay Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-deep-teal-dark via-transparent' : 'from-white via-transparent'} opacity-80 pointer-events-none`}></div>

            {/* Navigation Arrows */}
            <button 
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-muted-gold/80 text-white rounded-full transition-colors backdrop-blur-sm"
            >
                <ChevronLeft size={20} />
            </button>
            <button 
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-muted-gold/80 text-white rounded-full transition-colors backdrop-blur-sm"
            >
                <ChevronRight size={20} />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                {product.images.map((_, index) => (
                    <button
                        key={index}
                        onClick={(e) => handleDotClick(e, index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentImageIndex === index ? 'bg-muted-gold w-4' : 'bg-white/50 hover:bg-white'
                        }`}
                    />
                ))}
            </div>
          </div>

          {/* Content & Action */}
          <div className="relative flex-1 p-6 flex flex-col justify-between">
             <div>
                <div className="flex justify-between items-start mb-2">
                    <span className="inline-block px-3 py-1 text-[10px] tracking-widest uppercase border border-muted-gold/50 text-muted-gold rounded-full backdrop-blur-sm">
                        {product.category}
                    </span>
                    <span className={`font-display text-xl ${textColor}`}>${product.price}</span>
                </div>
                
                <h3 className={`font-display text-2xl md:text-3xl mb-1 ${textColor}`}>
                  {product.title}
                </h3>
                <div className={`flex items-center text-xs uppercase tracking-widest space-x-4 ${subTextColor}`}>
                  <span>{product.sqft.toLocaleString()} Sq Ft</span>
                  <span>•</span>
                  <span>{product.bedrooms} Bed</span>
                  <span>•</span>
                  <span>{product.bathrooms} Bath</span>
                </div>
             </div>

             <div className="mt-4">
                <button 
                    onClick={handleFlip}
                    className="w-full flex items-center justify-center gap-2 bg-muted-gold text-deep-teal py-3 rounded-sm uppercase tracking-widest text-xs font-bold hover:bg-opacity-90 transition-colors shadow-lg"
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
             <div className="space-y-2 mb-4">
                 <h5 className="text-xs uppercase tracking-widest opacity-70">Plan Details</h5>
                 <div className="grid grid-cols-2 gap-2 text-sm font-light opacity-90">
                     <p>Bedrooms: <span className="font-bold">{product.bedrooms}</span></p>
                     <p>Bathrooms: <span className="font-bold">{product.bathrooms}</span></p>
                     <p>Format: <span className="font-bold">{product.fileFormat}</span></p>
                     <p>Est. Build Cost: <span className="font-bold">$$$</span></p>
                 </div>
             </div>
             
             {product.blueprints.map((bp, idx) => (
                 <div key={idx} className={`p-4 rounded border ${isDarkMode ? 'bg-deep-teal-dark border-white/5' : 'bg-white border-deep-teal/10'}`}>
                    <p className="text-[10px] uppercase tracking-widest mb-2 opacity-50">View {idx + 1}</p>
                    <img 
                        src={bp} 
                        alt={`Blueprint ${idx + 1}`} 
                        className="w-full h-auto object-contain mix-blend-multiply opacity-90 bg-white" 
                        style={{ mixBlendMode: isDarkMode ? 'normal' : 'multiply' }}
                    />
                 </div>
             ))}

             <div className="pt-4 pb-2">
                 <button 
                    onClick={handleComplianceCheck}
                    className={`w-full flex items-center justify-center gap-2 py-3 border border-dashed ${isDarkMode ? 'border-off-white/30 text-off-white/70' : 'border-deep-teal/30 text-deep-teal/70'} rounded hover:bg-muted-gold/10 transition-colors text-xs uppercase tracking-widest`}
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
                className="w-full bg-deep-teal text-off-white py-3 rounded-sm hover:bg-muted-gold transition-colors duration-300 uppercase tracking-widest text-xs font-bold shadow-lg"
             >
                Purchase Complete Set - ${product.price}
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;