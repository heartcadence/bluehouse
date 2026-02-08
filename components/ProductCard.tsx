import React, { useState } from 'react';
import { Pencil, ArrowRight, ShieldCheck, Touchpad } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isAdmin: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isAdmin }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    // Toggle flip state on click (primary interaction for mobile)
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

  return (
    <div 
      className="group relative w-full h-[550px] perspective-1000 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* 3D Container */}
      <div 
        className={`relative w-full h-full text-center transition-transform duration-700 transform-style-3d shadow-xl md:group-hover:[transform:rotateY(180deg)] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* --- FRONT SIDE --- */}
        <div className="absolute w-full h-full backface-hidden bg-deep-teal-dark overflow-hidden rounded-sm">
          {/* Admin Edit Trigger */}
          {isAdmin && (
            <button 
              onClick={handleEdit}
              className="absolute top-4 right-4 z-20 bg-muted-gold text-deep-teal p-2 rounded-full hover:bg-off-white transition-colors shadow-lg"
            >
              <Pencil size={16} />
            </button>
          )}

          {/* Image */}
          <img 
            src={product.imageFront} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
          
          {/* Overlay Gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-deep-teal via-transparent to-transparent opacity-90"></div>

          {/* Mobile Tap Badge (Visual Guidance) */}
          <div className="absolute bottom-4 right-4 z-20 md:hidden flex items-center space-x-2 bg-deep-teal/90 px-3 py-1.5 rounded-full border border-muted-gold/30 backdrop-blur-sm animate-pulse">
            <Touchpad size={14} className="text-muted-gold" />
            <span className="text-[10px] uppercase tracking-widest text-muted-gold font-bold">Tap to View Plan</span>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 w-full p-8 text-left">
            <span className="inline-block px-3 py-1 mb-3 text-xs tracking-widest uppercase border border-muted-gold/50 text-muted-gold rounded-full backdrop-blur-sm">
              {product.category}
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-off-white mb-1">
              {product.title}
            </h3>
            <div className="flex items-center text-off-white/60 text-sm font-light tracking-wide space-x-4">
              <span>{product.sqft.toLocaleString()} Sq Ft</span>
              <span>•</span>
              <span>${product.price} USD</span>
            </div>
            
            {/* Desktop Hover Hint */}
            <div className="hidden md:flex mt-6 items-center text-muted-gold text-sm tracking-widest uppercase group-hover:translate-x-2 transition-transform duration-300">
              <span>View Blueprints</span>
              <ArrowRight size={16} className="ml-2" />
            </div>
          </div>
        </div>

        {/* --- BACK SIDE (Blueprint) --- */}
        <div className="absolute w-full h-full backface-hidden [transform:rotateY(180deg)] bg-off-white text-deep-teal rounded-sm overflow-hidden flex flex-col">
          
          {/* Blueprint Background */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ 
                backgroundImage: `radial-gradient(#002147 1px, transparent 1px)`, 
                backgroundSize: '20px 20px' 
            }}
          ></div>
          
          {/* Blueprint Image */}
          <div className="h-1/2 w-full bg-deep-teal/5 p-4 flex items-center justify-center relative overflow-hidden">
               <img 
                  src={product.imageBack} 
                  alt="Blueprint" 
                  className="w-full h-full object-contain mix-blend-multiply opacity-80"
               />
               <div className="absolute bottom-2 right-2 text-[10px] tracking-widest opacity-40">
                  PLAN ID: {product._id.padStart(4, '0')}
               </div>
          </div>

          {/* Details & Actions */}
          <div className="h-1/2 p-6 flex flex-col justify-between bg-off-white relative z-10">
            <div>
              <h4 className="font-display text-xl text-deep-teal mb-3">{product.title}</h4>
              <div className="grid grid-cols-2 gap-y-2 text-sm text-deep-teal/70 font-light mb-4">
                <p>Bedrooms: <span className="font-bold">{product.bedrooms}</span></p>
                <p>Bathrooms: <span className="font-bold">{product.bathrooms}</span></p>
                <p>Format: <span className="font-bold">{product.fileFormat}</span></p>
                <p>Delivery: <span className="font-bold">Instant</span></p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                 <span className="font-display text-2xl text-deep-teal">
                    ${product.price}
                 </span>
                 <button
                    onClick={handleBuyNow}
                    className="bg-deep-teal text-off-white px-6 py-2 rounded-sm hover:bg-muted-gold transition-colors duration-300 uppercase tracking-widest text-xs font-bold shadow-lg"
                 >
                    Buy Now
                 </button>
              </div>

              <button 
                onClick={handleComplianceCheck}
                className="w-full flex items-center justify-center space-x-2 border border-deep-teal/20 py-2 rounded-sm text-[10px] uppercase tracking-widest text-deep-teal hover:bg-deep-teal/5 transition-colors"
              >
                <ShieldCheck size={14} />
                <span>Check BCIN Compliance</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;