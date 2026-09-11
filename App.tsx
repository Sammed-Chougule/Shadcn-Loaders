
import React, { useState, useEffect, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Copy, Check } from 'lucide-react';
import LoaderGrid from './components/LoaderGrid.tsx';
import { LoaderDisplay } from './components/LoaderDisplay.tsx';
import { LOADERS } from './constants.tsx';
import { LoaderVariant } from './types.ts';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    }
    return 'light';
  });

  const [stars, setStars] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [copiedCli, setCopiedCli] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);

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

  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyCliCommand = async () => {
    if (navigator.clipboard && window.isSecureContext) {
      try { await navigator.clipboard.writeText('npx shadcn add @shadcnloaders/loader'); } catch { /* fallback */ }
    } else {
      const ta = document.createElement('textarea');
      ta.value = 'npx shadcn add @shadcnloaders/loader';
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch { /* noop */ }
      document.body.removeChild(ta);
    }
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const LogoIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
    </svg>
  );

  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          role="button"
          aria-label="Back to top"
        >
          <div className="p-1.5 bg-black dark:bg-white rounded-lg group-hover:rotate-12 transition-transform shadow-sm">
            <LogoIcon className="w-5 h-5 text-white dark:text-black" />
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tight text-zinc-900 dark:text-zinc-50">Shadcn Loaders</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <button onClick={() => scrollToSection('explore')} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Components</button>
          <a href="https://github.com/Sammed-Chougule/Shadcn-Loaders" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Docs</a>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-8 py-1.5 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 w-48 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 transition-all"
              aria-label="Search loaders"
            />
            <svg className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
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
    <header ref={heroRef} className="relative pt-32 pb-16 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-zinc-50 dark:bg-zinc-900/10 blur-[120px] rounded-full -z-10 transition-colors duration-500" />
      
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-black to-zinc-600 dark:from-white dark:to-zinc-500 leading-tight flex flex-wrap items-center justify-center gap-x-1">
          <span>Modern l</span>
          <span className="inline-flex items-center justify-center w-[0.75em] h-[0.75em] relative top-[0.05em]"><LoaderDisplay variant="fading-ring" size="lg" className="!w-full !h-full" /></span>
          <span>aders for</span>
          <br className="w-full" />
          <span className="text-black dark:text-white">your React project.</span>
        </h1>    

        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          42 pure-CSS loaders. Zero dependencies. Sub-1KB each. <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono">role="status"</code> and <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono">prefers-reduced-motion</code> on every variant.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a 
            href="https://github.com/Sammed-Chougule/Shadcn-Loaders"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 border border-zinc-800 dark:border-zinc-200 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 250" width="20" height="20" className="flex-shrink-0 invert dark:invert-0">
              <rect x="0" y="0" width="256" height="250" fill="#FFFFFF"/>
              <path fill="#161614" d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46c6.397 1.185 8.746-2.777 8.746-6.158c0-3.052-.12-13.135-.174-23.83c-35.61 7.742-43.124-15.103-43.124-15.103c-5.823-14.795-14.213-18.73-14.213-18.73c-11.613-7.944.876-7.78.876-7.78c12.853.902 19.621 13.19 19.621 13.19c11.417 19.568 29.945 13.911 37.249 10.64c1.149-8.272 4.466-13.92 8.127-17.116c-28.431-3.236-58.318-14.212-58.318-63.258c0-13.975 5-25.394 13.188-34.358c-1.329-3.224-5.71-16.242 1.24-33.874c0 0 10.749-3.44 35.21 13.121c10.21-2.836 21.16-4.258 32.038-4.307c10.878.049 21.837 1.47 32.066 4.307c24.431-16.56 35.165-13.12 35.165-13.12c6.967 17.63 2.584 30.65 1.255 33.873c8.207 8.964 13.173 20.383 13.173 34.358c0 49.163-29.944 59.988-58.447 63.157c4.591 3.972 8.682 11.762 8.682 23.704c0 17.126-.148 30.91-.148 35.126c0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002C256 57.307 198.691 0 128.001 0m-80.06 182.34c-.282.636-1.283.827-2.194.39c-.929-.417-1.45-1.284-1.15-1.922c.276-.655 1.279-.838 2.205-.399c.93.418 1.46 1.293 1.139 1.931m6.296 5.618c-.61.566-1.804.303-2.614-.591c-.837-.892-.994-2.086-.375-2.66c.63-.566 1.787-.301 2.626.591c.838.903 1 2.088.363 2.66m4.32 7.188c-.785.545-2.067.034-2.86-1.104c-.784-1.138-.784-2.503.017-3.05c.795-.547 2.058-.055 2.861 1.075c.782 1.157.782 2.522-.019 3.08m7.304 8.325c-.701.774-2.196.566-3.29-.49c-1.119-1.032-1.43-2.496-.726-3.27c.71-.776 2.213-.558 3.315.49c1.11 1.03 1.45 2.505.701 3.27m9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033c-1.448-.439-2.395-1.613-2.103-2.626c.301-1.01 1.747-1.484 3.207-1.028c1.446.436 2.396 1.602 2.095 2.622m10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95c-1.53.034-2.769-.82-2.786-1.86c0-1.065 1.202-1.932 2.733-1.958c1.522-.03 2.768.818 2.768 1.868m10.555-.405c.182 1.03-.875 2.088-2.387 2.37c-1.485.271-2.861-.365-3.05-1.386c-.184-1.056.893-2.114 2.376-2.387c1.514-.263 2.868.356 3.061 1.403" />
            </svg>
            <span className="text-sm font-semibold text-zinc-100 dark:text-zinc-900 border-l border-zinc-700 dark:border-zinc-300 pl-3">
              {stars !== null ? stars : '...'} Stars
            </span>
          </a>
          <button 
            onClick={copyCliCommand}
            className="flex items-center gap-2 text-sm bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 rounded-xl font-mono text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            <span>npx shadcn add @shadcnloaders/loader</span>
            {copiedCli ? (
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
            )}
          </button>
        </div>
      </div>

      {/* Moving loader showcase */}
      <div className="mt-16 -mx-6 px-6 overflow-visible" aria-label="Loader preview">
        <div className="flex gap-16 items-center animate-marquee whitespace-nowrap py-4">
          {[...LOADERS, ...LOADERS].map((loader, i) => (
            <div 
              key={`${loader.variant}-${i}`}
              className="flex items-center gap-4 shrink-0"
            >
              <div className="w-12 h-12 flex items-center justify-center text-zinc-900 dark:text-zinc-50">
                <LoaderDisplay variant={loader.variant} size="lg" />
              </div>
              <span className="text-base font-medium text-zinc-500 dark:text-zinc-400">{loader.name}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      <Navbar />
      <Hero />
      
      <main>
        <LoaderGrid search={search} onSearchChange={setSearch} />
      </main>

      <footer className="py-20 px-6 border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 transition-colors" aria-label="Footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <div className="p-1 bg-black dark:bg-white rounded">
                <LogoIcon className="w-4 h-4 text-white dark:text-black" />
              </div>
              <span className="font-bold text-zinc-900 dark:text-zinc-50">Shadcn Loaders</span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xs">
              42 pure-CSS loader components. Zero dependencies, fully customizable with Tailwind CSS.
            </p>
          </div>
          
          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <span className="text-zinc-900 dark:text-zinc-50 font-semibold text-sm">Product</span>
              <button onClick={() => scrollToSection('explore')} className="text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white text-sm transition-colors text-left">Loader Gallery</button>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-zinc-900 dark:text-zinc-50 font-semibold text-sm">Resources</span>
              <a href="https://github.com/Sammed-Chougule/Shadcn-Loaders" target="_blank" rel="noopener noreferrer" className="text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white text-sm transition-colors">GitHub Repository</a>
              <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white text-sm transition-colors">Shadcn UI</a>
            </div>
          </div>

          <a 
            href="https://www.buymeacoffee.com/sammedchougule" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity shrink-0"
          >
            <img 
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" 
              alt="Buy Me A Coffee" 
              style={{ height: '32px', width: 'auto' }} 
            />
          </a>
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
      <Analytics />
    </div>
  );
};

export default App;
