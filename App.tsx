
import React, { useState, useEffect } from 'react';
import LoaderGrid from './components/LoaderGrid.tsx';
import InstallationSection from './components/InstallationSection.tsx';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    }
    return 'light';
  });

  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    fetch('https://api.github.com/repos/Sammed-Chougule/Shadcn-Loaders')
      .then(res => res.json())
      .then(data => {
        if (data.stargazers_count !== undefined) {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => setStars(null));
  }, []);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          role="button"
          aria-label="Back to top"
        >
          <div className="p-1.5 bg-indigo-600 rounded-lg group-hover:rotate-12 transition-transform shadow-sm">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tight text-zinc-900 dark:text-zinc-50">Shadcn Loaders</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <button onClick={() => scrollToSection('install')} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Installation</button>
          <button onClick={() => scrollToSection('explore')} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Components</button>
          <a href="https://github.com/Sammed-Chougule/Shadcn-Loaders" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Docs</a>
        </div>
        
        <div className="flex items-center gap-3">
          {/* GitHub Button with Stars */}
          <a 
            href="https://github.com/Sammed-Chougule/Shadcn-Loaders"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group"
          >
            <svg className="w-4 h-4 text-zinc-900 dark:text-zinc-50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 border-l border-zinc-200 dark:border-zinc-700 pl-2 group-hover:text-indigo-600 transition-colors">
              {stars !== null ? stars : '...'} Stars
            </span>
          </a>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );

  const Hero = () => (
    <header className="relative pt-32 pb-16 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-indigo-50 dark:bg-indigo-950/20 blur-[120px] rounded-full -z-10 transition-colors duration-500" />
      
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-8 animate-fade-in transition-colors">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Free Open Source Shadcn Loader Library</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-zinc-950 to-zinc-600 dark:from-zinc-50 dark:to-zinc-500 leading-tight">
          Modern loaders for <br /> 
          <span className="text-indigo-600 dark:text-indigo-400">your React project.</span>
        </h1>
        
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          The ultimate collection of <strong>shadcn loader</strong> components. Optimized for performance, fully customizable with Tailwind CSS, and easy CLI installation.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => scrollToSection('explore')}
            className="w-full sm:w-auto px-10 py-4 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 font-bold rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all text-lg text-center active:scale-95 shadow-lg shadow-zinc-200 dark:shadow-none"
          >
            Browse Components
          </button>
        </div>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      <Navbar />
      <Hero />
      
      <main>
        <section id="install" className="bg-zinc-50 dark:bg-zinc-900/50 py-20 border-y border-zinc-100 dark:border-zinc-900 transition-colors">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">Install via CLI</h2>
               <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">Copy and paste the command below to add the shadcn loader component directly into your project directory.</p>
            </div>
            <InstallationSection />
          </div>
        </section>

        <LoaderGrid />
      </main>

      <footer className="py-20 px-6 border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 transition-colors" aria-label="Footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <div className="p-1 bg-zinc-900 dark:bg-zinc-50 rounded">
                <svg className="w-4 h-4 text-white dark:text-zinc-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-bold text-zinc-900 dark:text-zinc-50">Shadcn Loaders</span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xs">
              A premium collection of open-source React loader components. Built for modern developers using Tailwind CSS.
            </p>
          </div>
          
          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <span className="text-zinc-900 dark:text-zinc-50 font-semibold text-sm">Product</span>
              <button onClick={() => scrollToSection('install')} className="text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors text-left">CLI Installation</button>
              <button onClick={() => scrollToSection('explore')} className="text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors text-left">Loader Gallery</button>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-zinc-900 dark:text-zinc-50 font-semibold text-sm">Resources</span>
              <a href="https://github.com/Sammed-Chougule/Shadcn-Loaders" target="_blank" rel="noopener noreferrer" className="text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors">GitHub Repository</a>
              <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors">Shadcn UI</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-zinc-100 dark:border-zinc-900 text-center space-y-3">
          <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium">
            Created by <span className="text-zinc-900 dark:text-zinc-50 font-bold">Sammed-Chougule</span> — Building beautiful web experiences with precision.
          </p>
          <p className="text-zinc-400 dark:text-zinc-500 text-xs">
            © {new Date().getFullYear()} Shadcn Loaders. Premium UI components for React.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
