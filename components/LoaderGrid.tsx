import React, { useState } from 'react';
import { LOADERS } from '../constants.tsx';
import { LoaderDisplay } from './LoaderDisplay.tsx';
import { LoaderItem } from '../types.ts';
import { LoaderDetailPanel } from './LoaderDetailPanel.tsx';
import { Copy, Check, Pencil, Terminal } from 'lucide-react';

function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  }
  return new Promise((resolve) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      resolve(true);
    } catch {
      resolve(false);
    } finally {
      document.body.removeChild(ta);
    }
  });
}

const LoaderCard: React.FC<{ loader: LoaderItem; onClick: () => void }> = ({ loader, onClick }) => {
  const [copied, setCopied] = useState<'code' | 'cli' | null>(null);

  const copyCode = async () => {
    const code = `<Loader variant="${loader.variant}" size="md" />`;
    const ok = await copyToClipboard(code);
    if (ok) {
      setCopied('code');
      setTimeout(() => setCopied(null), 2000);
    }
  };

  const copyCli = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const ok = await copyToClipboard(`npx shadcn add @shadcnloaders/${loader.variant}`);
    if (ok) {
      setCopied('cli');
      setTimeout(() => setCopied(null), 2000);
    }
  };

  return (
    <article 
      onClick={onClick}
      className="group cursor-pointer relative bg-white dark:bg-zinc-900 border rounded-lg p-8 transition-all duration-200 flex flex-col items-center justify-between h-64 overflow-hidden border-zinc-200 dark:border-zinc-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md"
    >
      <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <div className="relative group/tooltip">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="p-1.5 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-md border border-zinc-200 dark:border-zinc-700 active:scale-95 transition-colors"
            aria-label={`Edit ${loader.name}`}
          >
            <Pencil className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          </button>
          <span className="absolute top-full right-0 mt-1.5 px-2 py-1 text-[10px] font-medium text-zinc-100 dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-100 rounded whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none">
            Edit
          </span>
        </div>
        
        <div className="relative group/tooltip">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              copyCli(e);
            }}
            className="p-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-700 active:scale-95 transition-colors"
            aria-label={`Copy CLI command for ${loader.name}`}
          >
            {copied === 'cli' ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Terminal className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
            )}
          </button>
          <span className="absolute top-full right-0 mt-1.5 px-2 py-1 text-[10px] font-medium text-zinc-100 dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-100 rounded whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none">
            Copy CLI
          </span>
        </div>

        <div className="relative group/tooltip">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              copyCode();
            }}
            className="p-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-700 active:scale-95 transition-colors"
            aria-label={`Copy code for ${loader.name}`}
          >
            {copied === 'code' ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
            )}
          </button>
          <span className="absolute top-full right-0 mt-1.5 px-2 py-1 text-[10px] font-medium text-zinc-100 dark:text-zinc-900 bg-zinc-900 dark:bg-zinc-100 rounded whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none">
            Copy Component
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center scale-125 group-hover:scale-135 transition-transform duration-200" aria-hidden="true">
        <LoaderDisplay variant={loader.variant} size="lg" className="text-zinc-900 dark:text-zinc-50" />
      </div>
      
      <div className="w-full mt-4">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-black dark:group-hover:text-white transition-colors truncate">{loader.name}</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{loader.description}</p>
      </div>
    </article>
  );
};

type LoaderGridProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

const LoaderGrid: React.FC<LoaderGridProps> = ({ search, onSearchChange }) => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedLoader, setSelectedLoader] = useState<LoaderItem | null>(null);

  const categories = ['all', 'spinners', 'dots', 'bars', 'rings', 'shapes', 'other'] as const;
  const categoryLabels: Record<string, string> = {
    all: 'All',
    spinners: 'Spinners',
    dots: 'Dots',
    bars: 'Bars',
    rings: 'Rings',
    shapes: 'Shapes',
    other: 'Other',
  };

  const filteredLoaders = LOADERS.filter(loader => {
    const matchesCategory = filter === 'all' || loader.category === filter;
    const matchesSearch = loader.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLoaderClick = (loader: LoaderItem) => {
    setSelectedLoader(loader);
  };

  const closeModal = () => {
    setSelectedLoader(null);
  };

  return (
    <section id="explore" className="py-20 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Browse Loader Library</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">Explore 42 performant React spinners and animated loading states.</p>
        </div>
        
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex flex-wrap bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-1 gap-0.5" role="group" aria-label="Filter loaders by category">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  filter === cat ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm border border-zinc-200/50 dark:border-zinc-700' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {filteredLoaders.length > 0 ? (
          filteredLoaders.map((loader) => (
            <LoaderCard 
              key={loader.id} 
              loader={loader} 
              onClick={() => handleLoaderClick(loader)}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-zinc-400 dark:text-zinc-600 bg-zinc-50 dark:bg-zinc-900/50 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
            No loaders found matching your search.
          </div>
        )}
      </div>

      {selectedLoader && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6 text-zinc-900 dark:text-zinc-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8">
              <LoaderDetailPanel loader={selectedLoader} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LoaderGrid;
