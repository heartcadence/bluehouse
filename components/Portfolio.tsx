import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, Loader2 } from 'lucide-react';
import { client, urlFor } from '../lib/sanity.client';
import { Project } from '../src/types';

interface PortfolioProps {
  isDarkMode: boolean;
  onViewPlan: (planId: string, category: string) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ isDarkMode, onViewPlan }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  // Styling Variables
  const textColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  const mutedColor = isDarkMode ? 'text-off-white/70' : 'text-dark-text/70';
  const cardBg = isDarkMode ? 'bg-deep-teal-dark border-off-white/10' : 'bg-white border-deep-teal/10 shadow-lg';
  const overlayBg = isDarkMode ? 'bg-deep-teal/95' : 'bg-light-bg/95';

  // 1. Initial Fetch (Thumbnails)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"] | order(_createdAt desc){
          _id,
          projectName,
          "gallery": [gallery[0]], 
          linkedPlan->{ _id, category, title }
        }`;
        const result = await client.fetch(query);
        setProjects(result || []);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // 2. Full Detail Fetch
  const openProject = async (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setIsDetailLoading(true);
    document.body.style.overflow = 'hidden';

    try {
      const query = `*[_type == "project" && _id == $id][0]{ gallery, shortDescription }`;
      const fullDetails = await client.fetch(query, { id: project._id });
      
      // Explicitly type 'current' to fix build error
      setSelectedProject((current: Project | null) => 
        current && current._id === project._id ? { ...current, ...fullDetails } : current
      );
    } catch (error) {
      console.error("Failed to load project details", error);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const handleNextImage = () => {
    if (selectedProject?.gallery) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.gallery.length);
    }
  };

  const handlePrevImage = () => {
    if (selectedProject?.gallery) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
    }
  };

  const handleLinkClick = () => {
    if (selectedProject?.linkedPlan) {
      const { _id, category } = selectedProject.linkedPlan;
      closeProject();
      setTimeout(() => onViewPlan(_id, category), 300);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-10">
      <div className="text-center mb-16">
        <h2 className="text-muted-gold text-xs uppercase tracking-[0.2em] mb-4">Portfolio</h2>
        <h3 className={`font-display text-4xl md:text-5xl ${textColor}`}>Executed Visions</h3>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-muted-gold" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project._id}
              onClick={() => openProject(project)}
              className={`group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-sm border transition-all duration-500 hover:shadow-2xl ${cardBg}`}
            >
              {project.gallery?.[0] && (
                <img 
                  src={urlFor(project.gallery[0]).width(600).height(450).quality(80).auto('format').url()} 
                  alt={project.projectName}
                  width={600}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              )}
              <div className="absolute inset-0 bg-deep-teal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                <h4 className="font-display text-2xl text-off-white mb-2">{project.projectName}</h4>
                <span className="text-muted-gold text-[10px] uppercase tracking-widest">View Journey</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className={`absolute inset-0 backdrop-blur-xl ${overlayBg}`} onClick={closeProject}></div>

          <div className="relative w-full max-w-6xl bg-black rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row h-full md:h-auto md:max-h-[90vh]">
            
            <button onClick={closeProject} className="absolute top-4 right-4 z-50 md:hidden p-2 bg-black/40 text-white rounded-full"><X size={24} /></button>

            {/* STABLE IMAGE CONTAINER */}
            
            <div className="w-full md:w-2/3 bg-black flex items-center justify-center relative min-h-[350px] md:h-[75vh] overflow-hidden">
              {selectedProject.gallery && (
                <div className="relative w-full h-full flex items-center justify-center p-2 md:p-6">
                  <img 
                    key={currentImageIndex}
                    src={urlFor(selectedProject.gallery[currentImageIndex]).width(1200).quality(80).auto('format').url()}
                    alt="Build Phase"
                    className="max-h-full max-w-full object-contain transition-opacity duration-500 animate-fade-in"
                  />
                  
                  {!isDetailLoading && selectedProject.gallery.length > 1 && (
                    <>
                      <button onClick={(e) => { e.stopPropagation(); handlePrevImage(); }} className="absolute left-4 p-3 bg-black/20 hover:bg-muted-gold text-white rounded-full transition-all backdrop-blur-md">
                        <ChevronLeft size={24} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleNextImage(); }} className="absolute right-4 p-3 bg-black/20 hover:bg-muted-gold text-white rounded-full transition-all backdrop-blur-md">
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-black/40 backdrop-blur-md rounded-full text-white text-[10px] tracking-widest flex items-center gap-2">
                    {isDetailLoading && <Loader2 size={12} className="animate-spin text-muted-gold" />}
                    <span>{currentImageIndex + 1} / {selectedProject.gallery.length}</span>
                  </div>
                </div>
              )}
            </div>

            {/* DETAILS PANEL */}
            <div className={`w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-between overflow-y-auto ${isDarkMode ? 'bg-deep-teal text-off-white' : 'bg-white text-deep-teal'}`}>
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h2 className="font-display text-3xl">{selectedProject.projectName}</h2>
                  <button onClick={closeProject} className="hidden md:block opacity-40 hover:opacity-100"><X size={24} /></button>
                </div>
                
                {selectedProject.linkedPlan && (
                  <div className="text-muted-gold text-[10px] uppercase tracking-widest mb-6 pb-2 border-b border-muted-gold/20">
                    Plan Reference: {selectedProject.linkedPlan.title}
                  </div>
                )}

                <div className="text-sm font-light leading-relaxed mb-8">
                  {isDetailLoading ? <Loader2 size={14} className="animate-spin opacity-40" /> : selectedProject.shortDescription}
                </div>
              </div>

              <div className="mt-auto space-y-4">
                {selectedProject.linkedPlan && (
                  <button onClick={handleLinkClick} className={`w-full py-4 flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] font-bold transition-all ${isDarkMode ? 'bg-off-white text-deep-teal hover:bg-muted-gold' : 'bg-deep-teal text-off-white hover:bg-muted-gold'}`}>
                    <span>Get These Plans</span>
                    <ExternalLink size={14} />
                  </button>
                )}
                <button onClick={closeProject} className="w-full text-center text-[9px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100">Return to Portfolio</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;