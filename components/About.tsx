import React, { useState, useEffect } from 'react';
import { CheckCircle, Quote, ArrowRight } from 'lucide-react';

const TESTIMONIALS = [
  { text: "It has been a privilege partnering with Bluehouse Planning & Designs Inc...", author: "Nailed It Fencing & Decks", role: "Strategic Partner", initial: "N" },
  { text: "If you are building a deck... Bluehouse is very highly recommended.", author: "Dan B", role: "House Reconstruction", initial: "D" }
];

const About: React.FC<{ isDarkMode: boolean; onCtaClick: () => void }> = ({ isDarkMode, onCtaClick }) => {
  const [index, setIndex] = useState(0);
  const textColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  const mutedColor = isDarkMode ? 'text-off-white/70' : 'text-dark-text/70';

  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % TESTIMONIALS.length), 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full">
      <div className={`py-20 transition-colors ${isDarkMode ? 'bg-deep-teal' : 'bg-slate-50'}`}>
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-muted-gold text-sm tracking-[0.2em] uppercase mb-8">Who We Are</h2>
          <p className={`text-lg md:text-xl font-light leading-relaxed ${mutedColor} italic`}>
            "Bluehouse Planning & Designs Inc. is led by a designer with over a decade of Ontario-specific architectural expertise."
          </p>
        </div>
      </div>
      <div className={`py-20 ${isDarkMode ? 'bg-deep-teal-dark' : 'bg-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h3 className="text-muted-gold text-sm uppercase tracking-widest">Our Philosophy</h3>
            <h4 className={`font-display text-4xl ${textColor}`}>Great Homes Start with Great Planning.</h4>
            <div className={`space-y-6 font-light ${mutedColor}`}>
              <p>We handle the technical headaches and paperwork so you can focus on the excitement of moving in.</p>
              <ul className="space-y-3">
                {['BCIN Registered', 'Permit-Ready Drawings', '3D Visualization'].map(item => (
                  <li key={item} className="flex items-center gap-3"><CheckCircle className="text-muted-gold w-5 h-5" /> {item}</li>
                ))}
              </ul>
            </div>
            <button onClick={onCtaClick} className="flex items-center gap-3 text-muted-gold uppercase text-sm font-bold group">
              View BCIN-Ready Plans <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <div className="relative h-[400px] rounded-sm overflow-hidden shadow-2xl">
            <img src="https://pub-698e84d3fce74dc6b4b08c5f5d041da0.r2.dev/about1.avif" className="w-full h-full object-cover" alt="Interior" />
            <div className="absolute bottom-4 left-4 right-4 p-6 bg-white/10 backdrop-blur-md border border-white/10">
               <Quote className="text-muted-gold w-8 h-8 mb-2 opacity-50" />
               <p className={`italic text-sm ${isDarkMode ? 'text-white' : 'text-deep-teal'}`}>{TESTIMONIALS[index].text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;