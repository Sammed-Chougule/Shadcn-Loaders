
import React from 'react';
import LoaderGrid from './components/LoaderGrid.tsx';
import InstallationSection from './components/InstallationSection.tsx';
import { LoaderDisplay } from './components/LoaderDisplay.tsx';

const App: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200" aria-label="Main Navigation">
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
          <span className="font-bold text-xl tracking-tight text-zinc-900">Shadcn Loaders</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
          <button 
            onClick={() => scrollToSection('install')}
            className="hover:text-zinc-900 transition-colors"
          >
            Installation
          </button>
          <button 
            onClick={() => scrollToSection('explore')}
            className="hover:text-zinc-900 transition-colors"
          >
            Components
          </button>
          <a 
            href="https://github.com/shadcn/ui" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-zinc-900 transition-colors"
          >
            GitHub
          </a>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => scrollToSection('explore')}
            className="hidden sm:block text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 px-4 py-2 rounded-full transition-colors shadow-sm"
          >
            Browse Library
          </button>
        </div>
      </div>
    </nav>
  );

  const Hero = () => (
    <header className="relative pt-32 pb-16 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-indigo-50 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
          <span className="text-xs font-medium text-zinc-600">Free Open Source Shadcn Loader Library</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-zinc-950 to-zinc-600 leading-tight">
          Modern loaders for <br /> 
          <span className="text-indigo-600">your React project.</span>
        </h1>
        
        <p className="text-xl text-zinc-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          The ultimate collection of <strong>shadcn loader</strong> components. Optimized for performance, fully customizable with Tailwind CSS, and easy CLI installation.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => scrollToSection('explore')}
            className="w-full sm:w-auto px-10 py-4 bg-zinc-900 text-white font-bold rounded-xl hover:bg-zinc-800 transition-colors text-lg text-center active:scale-95 shadow-lg shadow-zinc-200"
          >
            Browse Components
          </button>
        </div>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      <main>
        {/* Installation Section - Optimized for CLI Search */}
        <section id="install" className="bg-zinc-50 py-20 border-y border-zinc-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold tracking-tight text-zinc-900 mb-4">Install via CLI</h2>
               <p className="text-zinc-500 max-w-lg mx-auto">Copy and paste the command below to add the shadcn loader component directly into your project directory using your preferred package manager.</p>
            </div>
            <InstallationSection />
          </div>
        </section>

        {/* Gallery Section */}
        <LoaderGrid />
      </main>

      <footer className="py-20 px-6 border-t border-zinc-100 bg-white" aria-label="Footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <div className="p-1 bg-zinc-900 rounded">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-bold text-zinc-900">Shadcn Loaders</span>
            </div>
            <p className="text-zinc-500 text-sm max-w-xs">
              A premium collection of open-source React loader components. Built for modern developers using Tailwind CSS.
            </p>
          </div>
          
          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <span className="text-zinc-900 font-semibold text-sm">Product</span>
              <button onClick={() => scrollToSection('install')} className="text-zinc-500 hover:text-indigo-600 text-sm transition-colors text-left">CLI Installation</button>
              <button onClick={() => scrollToSection('explore')} className="text-zinc-500 hover:text-indigo-600 text-sm transition-colors text-left">Loader Gallery</button>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-zinc-900 font-semibold text-sm">Resources</span>
              <a href="https://github.com/shadcn/ui" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-indigo-600 text-sm transition-colors">GitHub Repository</a>
              <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-indigo-600 text-sm transition-colors">Shadcn UI</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-zinc-100 text-center">
          <p className="text-zinc-400 text-xs">
            © {new Date().getFullYear()} Shadcn Loaders. Premium UI components for React.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
