import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
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

  // Styling Variables
  const textColor = isDarkMode ? 'text-off-white' : 'text-deep-teal';
  const mutedColor = isDarkMode ? 'text-off-white/70' : 'text-deep-teal/70';
  const cardBg = isDarkMode ? 'bg-deep-teal-dark border-off-white/10' : 'bg-white border-deep-teal/10 shadow-lg';
  const overlayBg = isDarkMode ? 'bg-deep-teal/95' : 'bg-light-bg/95';

  // Fetch Projects (Lazy Load: Only first image initially)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"]{
          _id,
          projectName,
          "gallery": [gallery[0]], 
          linkedPlan->{
            _id,
            category,
            title
          }
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

  const openProject = async (project: Project) => {
    // 1. Open modal immediately with available partial data
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';

    // 2. Fetch full details (full gallery + description)
    try {
        const query = `*[_type == "project" && _id == $id][0]{
            gallery,
            shortDescription
        }`;
        const fullDetails = await client.fetch(query, { id: project._id });
        
        // Update state if the modal is still open for this project
        setSelectedProject((current) => {
            if (current && current._id === project._id && fullDetails) {
                return { ...current, ...fullDetails };
            }
            return current;
        });
    } catch (error) {
        console.error("Failed to load project details", error);
    }
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const handleNextImage = () => {
    if (selectedProject && selectedProject.gallery) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.gallery.length);
    }
  };

  const handlePrevImage = () => {
    if (selectedProject && selectedProject.gallery) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
    }
  };

  const handleLinkClick = () => {
    if (selectedProject?.linkedPlan) {
        const { _id, category } = selectedProject.linkedPlan;
        closeProject();
        
        // Slight delay to ensure modal close animation allows for smooth scroll transition
        setTimeout(() => {
            onViewPlan(_id, category);
        }, 300);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      
      {/* Intro */}
      <div className="text-center mb-16 animate-slide-up">
        <h2 className="text-muted-gold text-xs uppercase tracking-[0.2em] mb-4">Our Work</h2>
        <h3 className={`font-display text-4xl md:text-5xl ${textColor}`}>
          Executed Visions
        </h3>
        <p className={`mt-4 max-w-2xl mx-auto text-sm font-light leading-relaxed ${mutedColor}`}>
          A curated selection of completed builds, showcasing the transition from Bluehouse plans to reality.
        </p>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="text-center py-20 opacity-50 text-sm tracking-widest">LOADING PORTFOLIO...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 opacity-50 text-sm tracking-widest">NO PROJECTS FOUND</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
                <div 
                    key={project._id}
                    onClick={() => openProject(project)}
                    className={`group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-sm border transition-all duration-500 hover:shadow-2xl ${cardBg}`}
                >
                    {/* The Rule of 1: Only render first image (which is the only one we have initially) */}
                    {project.gallery && project.gallery[0] && (
                        <img 
                            src={urlFor(project.gallery[0]).width(600).auto('format').url()} 
                            alt={project.projectName}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                    )}
                    
                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 bg-deep-teal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center`}>
                        <h4 className="font-display text-2xl text-off-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            {project.projectName}
                        </h4>
                        <span className="text-muted-gold text-[10px] uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                            View Build Journey
                        </span>
                    </div>
                </div>
            ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div className={`absolute inset-0 backdrop-blur-md ${overlayBg}`} onClick={closeProject}></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] flex flex-col md:flex-row shadow-2xl overflow-hidden animate-fade-in">
                
                {/* Close Button Mobile */}
                <button 
                    onClick={closeProject}
                    className="absolute top-4 right-4 z-50 md:hidden p-2 bg-black/20 text-white rounded-full backdrop-blur-sm"
                >
                    <X size={24} />
                </button>

                {/* Left: Gallery (60-70%) */}
                <div className="w-full md:w-2/3 bg-black flex items-center justify-center relative group h-[50vh] md:h-[80vh]">
                    {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                        <>
                             <img 
                                src={urlFor(selectedProject.gallery[currentImageIndex]).width(1200).quality(90).auto('format').url()}
                                alt={`${selectedProject.projectName} ${currentImageIndex + 1}`}
                                className="w-full h-full object-contain"
                            />
                            
                            {/* Nav Buttons (Only show if we have more than 1 image, i.e. after fetch) */}
                            {selectedProject.gallery.length > 1 && (
                                <>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                                        className="absolute left-4 p-3 bg-black/30 hover:bg-muted-gold text-white rounded-full transition-colors backdrop-blur-sm"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                                        className="absolute right-4 p-3 bg-black/30 hover:bg-muted-gold text-white rounded-full transition-colors backdrop-blur-sm"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}
                             {/* Counter */}
                             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-black/50 backdrop-blur-md rounded-full text-white text-xs tracking-widest">
                                {currentImageIndex + 1} / {selectedProject.gallery.length}
                             </div>
                        </>
                    )}
                </div>

                {/* Right: Details (30-40%) */}
                <div className={`w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-between overflow-y-auto ${isDarkMode ? 'bg-deep-teal text-off-white' : 'bg-white text-deep-teal'}`}>
                    
                    <div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="font-display text-3xl md:text-4xl mb-2">{selectedProject.projectName}</h2>
                                {selectedProject.linkedPlan && (
                                    <span className="text-muted-gold text-xs uppercase tracking-widest">
                                        Based on: {selectedProject.linkedPlan.title}
                                    </span>
                                )}
                            </div>
                            <button 
                                onClick={closeProject}
                                className={`hidden md:block transition-colors ${isDarkMode ? 'text-off-white/50 hover:text-white' : 'text-deep-teal/50 hover:text-deep-teal'}`}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className={`mt-8 text-sm md:text-base font-light leading-relaxed ${mutedColor}`}>
                            {selectedProject.shortDescription ? (
                                selectedProject.shortDescription
                            ) : (
                                <span className="opacity-50 animate-pulse">Loading story...</span>
                            )}
                        </div>
                    </div>

                    {/* Action Hook */}
                    <div className="mt-12 pt-8 border-t border-current border-opacity-10">
                         {selectedProject.linkedPlan ? (
                             <button
                                onClick={handleLinkClick}
                                className={`w-full py-4 flex items-center justify-center gap-3 uppercase tracking-widest text-xs font-bold transition-all duration-300 shadow-lg ${
                                    isDarkMode 
                                    ? 'bg-off-white text-deep-teal hover:bg-muted-gold' 
                                    : 'bg-deep-teal text-off-white hover:bg-muted-gold'
                                }`}
                             >
                                <span>View Plans for this Home</span>
                                <ExternalLink size={16} />
                             </button>
                         ) : (
                             <div className="text-center opacity-50 text-xs uppercase tracking-widest">
                                 Custom Build - Plan Not in Catalog
                             </div>
                         )}
                    </div>

                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default Portfolio;