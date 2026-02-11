// src/App.tsx
// ... imports remain same

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeView, setActiveView] = useState<'collection' | 'contact' | 'about' | 'portfolio'>('collection');
  
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Apply theme-specific body styles
  useEffect(() => {
    document.body.className = isDarkMode ? 'bg-deep-teal text-off-white' : 'bg-light-bg text-deep-teal';
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-deep-teal' : 'bg-light-bg'}`}>
      <Header 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleTheme} // Mapped to toggleDarkMode for Header
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <main>
        <LandingPage 
          isDarkMode={isDarkMode} 
          activeView={activeView}
          setActiveView={setActiveView}
          toggleDarkMode={toggleTheme} // Mapped for LandingPage buttons
        />
      </main>

      <Footer 
        isDarkMode={isDarkMode} 
        onContactClick={() => setActiveView('contact')}
        onAboutClick={() => setActiveView('about')}
      />
    </div>
  );
};