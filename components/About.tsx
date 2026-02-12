import React, { useState, useEffect } from 'react';
import { CheckCircle, Quote, ArrowRight } from 'lucide-react';

const TESTIMONIALS = [
  { 
    text: "It has been a privilege partnering with Bluehouse Planning & Designs Inc. over the last few years; we eagerly anticipate our upcoming projects this season!", 
    author: "Nailed It Fencing & Decks", 
    role: "Strategic Partner", 
    initial: "N" 
  },
  { 
    text: "If you are building a deck, putting in a beam or building a new house Bluehouse Planning and Designs Inc. is very highly recommended.", 
    author: "Dan B", 
    role: "House Reconstruction", 
    initial: "D" 
  }
];

interface AboutProps {
  isDarkMode: boolean;
  onCtaClick: () => void;
}

const About: React.FC<AboutProps> = ({ isDarkMode, onCtaClick }) => {
  const [index, setIndex] = useState(0);
  const textColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  const mutedColor = isDarkMode ? 'text-off-white/70' : 'text-dark-text/70';
  const borderColor = isDarkMode ? 'border-off-white/10' : 'border-deep-teal/10';

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full">
      {/* Introduction Banner */}
      <div className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-deep-teal' : 'bg-slate-50'}`}>
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-muted-gold text-sm tracking-[0.2em] uppercase mb-8 font-bold">Who We Are</h2>
          <p className={`text-lg md:text-xl font-light leading-relaxed ${mutedColor} italic`}>
            "Bluehouse Planning & Designs Inc. is led by a designer with over a decade of <span className={isDarkMode ? 'text-off-white' : 'text-deep-teal'}>Ontario-specific architectural expertise</span>, ensuring your vision meets permit-ready reality."
          </p>
        </div>
      </div>

      {/* Philosophy & Visuals */}
      <div className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-deep-teal-dark' : 'bg-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h3 className="text-muted-gold text-sm tracking-[0.2em] uppercase mb-4">Our Philosophy</h3>
                <h4 className="font-display text-4xl md:text-5xl leading-tight text-muted-gold mb-6">
                  Great Homes Start with <br className="hidden md:block" /> Great Planning.
                </h4>
                <p className={`text-lg font-light leading-relaxed max-w-xl ${mutedColor}`}>
                  At Bluehouse Planning and Designs Inc., we turn your ideas into high-quality architectural plans and permit-ready drawings. We specialize in navigating Ontario's building codes and municipal permit requirements in Brantford and the surrounding areas. We handle the technical headaches so you can build with confidence and focus on your future home.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className={`pt-6 border-t ${borderColor}`}>
                  <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${textColor}`}>Technical Assurance</h4>
                  <ul className="space-y-3">
                    {['BCIN Registered Designers', 'Permit-Ready Drawings', '3D Contour Visualization'].map((item) => (
                      <li key={item} className="flex items-center space-x-3">
                        <CheckCircle className="text-muted-gold w-5 h-5 flex-shrink-0" />
                        <span className={`text-sm tracking-wide ${isDarkMode ? 'text-off-white/90' : 'text-deep-teal/90'}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={onCtaClick}
                  className={`mt-4 flex items-center gap-3 uppercase tracking-widest text-sm font-bold transition-all group ${
                    isDarkMode ? 'text-muted-gold hover:text-white' : 'text-muted-gold hover:text-deep-teal'
                  }`}
                >
                  <span>View BCIN-Ready Plans</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Visuals */}
            <div className="space-y-8 lg:sticky lg:top-32">
              <div className="relative h-[500px] w-full group overflow-hidden shadow-2xl rounded-sm border border-white/5">
                <img 
                  src="https://bluehouseplanning.ca/about1.avif" 
                  alt="Architecture Studio" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={500}
                />
                <div className={`absolute inset-0 mix-blend-multiply ${isDarkMode ? 'bg-deep-teal/20' : 'bg-deep-teal/5'}`}></div>
              </div>

              {/* Testimonial Slider */}
              <div className={`p-8 rounded-sm border backdrop-blur-sm relative ${
                isDarkMode ? 'bg-white/5 border-white/5' : 'bg-deep-teal/5 border-deep-teal/5 shadow-lg'
              }`}>
                <Quote className="absolute top-6 left-6 text-muted-gold opacity-30 w-10 h-10" />
                <div className="animate-fade-in" key={index}>
                  <p className={`relative z-10 italic font-display text-xl leading-relaxed mb-6 pt-4 ${
                    isDarkMode ? 'text-off-white/90' : 'text-deep-teal/90'
                  }`}>
                    "{TESTIMONIALS[index].text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted-gold rounded-full flex items-center justify-center text-deep-teal font-bold text-xs">
                      {TESTIMONIALS[index].initial}
                    </div>
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-widest ${textColor}`}>{TESTIMONIALS[index].author}</p>
                      <p className="text-[10px] uppercase tracking-wide text-muted-gold">{TESTIMONIALS[index].role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;