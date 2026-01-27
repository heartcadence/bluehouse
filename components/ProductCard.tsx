import React, { useState } from 'react';
import { Pencil, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isAdmin: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isAdmin }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handlePurchase = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Purchase complete! ${product.title}.pdf has been sent to your email.`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Opening CMS editor for: ${product.title}`);
  };

  return (
    <div 
      className="group relative w-full h-[500px] perspective-1000 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* 3D Container */}
      <div 
        className={`relative w-full h-full text-center transition-transform duration-700 transform-style-3d shadow-xl ${
          isFlipped ? 'rotate-y-180' : ''
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
            
            <div className="mt-6 flex items-center text-muted-gold text-sm tracking-widest uppercase group-hover:translate-x-2 transition-transform duration-300">
              <span>View Plans</span>
              <ArrowRight size={16} className="ml-2" />
            </div>
          </div>
        </div>

        {/* --- BACK SIDE (Blueprint) --- */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-off-white text-deep-teal rounded-sm overflow-hidden">
          
          {/* Blueprint Background */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{ 
                backgroundImage: `radial-gradient(#063543 1px, transparent 1px)`, 
                backgroundSize: '20px 20px' 
            }}
          ></div>
          
          <div className="relative h-full flex flex-col">
            {/* Blueprint Image */}
            <div className="h-3/5 w-full bg-deep-teal/5 p-4 flex items-center justify-center relative overflow-hidden">
                 <img 
                    src={product.imageBack} 
                    alt="Blueprint" 
                    className="w-full h-full object-contain mix-blend-multiply opacity-80"
                 />
                 <div className="absolute bottom-2 right-2 text-[10px] tracking-widest opacity-40">
                    PLAN ID: {product._id.padStart(4, '0')}
                 </div>
            </div>

            {/* Details & Purchase */}
            <div className="h-2/5 p-6 flex flex-col justify-between bg-off-white">
              <div>
                <h4 className="font-display text-xl text-deep-teal mb-2">{product.title}</h4>
                <div className="grid grid-cols-2 gap-y-2 text-sm text-deep-teal/70 font-light">
                  <p>Bedrooms: <span className="font-bold">{product.bedrooms}</span></p>
                  <p>Bathrooms: <span className="font-bold">{product.bathrooms}</span></p>
                  <p>Format: <span className="font-bold">{product.fileFormat}</span></p>
                  <p>Download: <span className="font-bold">Instant</span></p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-deep-teal/10">
                <span className="font-display text-2xl text-deep-teal">
                  ${product.price}
                </span>
                <button
                  onClick={handlePurchase}
                  className="bg-deep-teal text-off-white px-6 py-3 rounded-sm hover:bg-muted-gold transition-colors duration-300 uppercase tracking-widest text-xs font-bold shadow-lg"
                >
                  Purchase PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;