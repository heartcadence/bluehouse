import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import AdminModal from './components/AdminModal';
import Footer from './components/Footer';
import { MOCK_PRODUCTS, CATEGORIES } from './constants';
import { Category } from './types';
import { Plus } from 'lucide-react';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Toggle Body Background
  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = '#063543';
      document.body.style.color = '#F2F2F2';
    } else {
      document.body.style.backgroundColor = '#F9FAFB';
      document.body.style.color = '#4A5568';
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Admin Logic
  const handleLogin = (password: string) => {
    if (password === 'bluehouse') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAdmin(false);
    alert("Logged out of Admin Mode.");
  };

  const openAdminModal = () => {
    if (!isAdmin) {
      setIsAdminModalOpen(true);
    }
  };

  // Filter Logic
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleAddNewPlan = () => {
    alert("Admin Action: Opening 'Add New Product' form in CMS...");
  };

  // Theme Helpers
  const textColor = isDarkMode ? 'text-off-white' : 'text-dark-text';
  const headingColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  const subTextColor = isDarkMode ? 'text-off-white/80' : 'text-dark-text/80';
  const borderColor = isDarkMode ? 'border-off-white/20' : 'border-deep-teal/20';

  return (
    <div className={`min-h-screen font-body transition-colors duration-300 selection:bg-muted-gold selection:text-deep-teal ${isDarkMode ? 'bg-deep-teal' : 'bg-light-bg'}`}>
      
      <Header 
        isAdmin={isAdmin} 
        onLoginClick={openAdminModal} 
        onLogoutClick={handleLogout}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      <main className="pt-20">
        
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop" 
              alt="Luxury Architecture" 
              className={`w-full h-full object-cover transition-opacity duration-300 ${isDarkMode ? 'opacity-40' : 'opacity-90'}`}
            />
            {/* Gradient Overlay matches theme background */}
            <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-300 ${isDarkMode ? 'from-deep-teal/80 via-deep-teal/40 to-deep-teal' : 'from-light-bg/80 via-light-bg/40 to-light-bg'}`}></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-muted-gold uppercase tracking-[0.2em] text-sm md:text-base mb-4">
              Architectural Blueprints
            </h2>
            <h1 className={`font-display text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight transition-colors duration-300 ${headingColor}`}>
              Design Beyond <br/> 
              <span className="italic">Boundaries</span>
            </h1>
            <p className={`text-lg font-light max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${subTextColor}`}>
              Explore our curated collection of luxury floor plans. 
              Instant digital downloads for the modern visionary.
            </p>
          </div>
        </section>

        {/* Catalog Section */}
        <section id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 space-y-6 md:space-y-0">
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300 border ${
                    activeCategory === category
                      ? 'bg-muted-gold text-deep-teal border-muted-gold font-bold shadow-lg scale-105'
                      : `bg-transparent hover:border-muted-gold hover:text-muted-gold ${isDarkMode ? 'text-off-white/60 border-off-white/20' : 'text-deep-teal/60 border-deep-teal/20'}`
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Admin Add Button */}
            {isAdmin && (
              <button 
                onClick={handleAddNewPlan}
                className={`flex items-center space-x-2 px-5 py-2 rounded-full border border-dashed border-muted-gold transition-all hover:bg-muted-gold hover:text-deep-teal text-muted-gold`}
              >
                <Plus size={16} />
                <span className="uppercase text-xs tracking-widest font-bold">Add New Plan</span>
              </button>
            )}
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product._id} 
                  product={product} 
                  isAdmin={isAdmin} 
                />
              ))}
            </div>
          ) : (
            <div className={`text-center py-20 font-display italic text-xl ${isDarkMode ? 'text-off-white/40' : 'text-deep-teal/40'}`}>
              No architectural plans found in this category.
            </div>
          )}
         
        </section>

        {/* Cinematic Break */}
        <section className={`py-24 border-t border-b relative overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-deep-teal-dark border-white/5' : 'bg-white border-deep-teal/10'}`}>
           <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
              <div className="md:w-1/2 mb-12 md:mb-0 pr-0 md:pr-12">
                <h3 className={`font-display text-4xl mb-6 transition-colors duration-300 ${headingColor}`}>Build your legacy.</h3>
                <p className={`font-light leading-loose mb-8 transition-colors duration-300 ${subTextColor}`}>
                  Every Bluehouse design is crafted with precision, balancing aesthetic beauty with structural integrity. 
                  Download your complete PDF set today and break ground tomorrow.
                </p>
                <button className="text-muted-gold uppercase tracking-widest text-sm border-b border-muted-gold pb-1 hover:text-deep-teal hover:border-deep-teal transition-all">
                  Read Our Philosophy
                </button>
              </div>
              <div className="md:w-1/2 w-full h-80 bg-deep-teal relative rounded-sm overflow-hidden group">
                 <img 
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop" 
                    alt="Interior Detail" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70"
                  />
                  <div className="absolute bottom-4 left-4 bg-deep-teal/80 backdrop-blur px-4 py-2">
                    <span className="text-xs text-off-white tracking-widest uppercase">Interior Renders Included</span>
                  </div>
              </div>
           </div>
        </section>
      </main>

      <Footer onAdminClick={openAdminModal} isDarkMode={isDarkMode} />
      
      <AdminModal 
        isOpen={isAdminModalOpen} 
        onClose={() => setIsAdminModalOpen(false)} 
        onLogin={handleLogin}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default App;