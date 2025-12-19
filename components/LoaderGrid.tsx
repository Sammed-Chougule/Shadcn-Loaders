
import React, { useState } from 'react';
import { LOADERS } from '../constants.tsx';
import { LoaderDisplay } from './LoaderDisplay.tsx';
import { LoaderItem } from '../types.ts';

const LoaderCard: React.FC<{ loader: LoaderItem }> = ({ loader }) => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    const code = `<Loader variant="${loader.variant}" size="md" />`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 hover:border-indigo-400/50 dark:hover:border-indigo-400/50 transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col items-center justify-between h-64 overflow-hidden">
      <div className="flex-1 flex items-center justify-center scale-125 group-hover:scale-150 transition-transform duration-500" aria-hidden="true">
        <LoaderDisplay variant={loader.variant} size="lg" className="text-zinc-900 dark:text-zinc-50" />
      </div>
      
      <div className="w-full mt-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">{loader.name}</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{loader.description}</p>
          </div>
          <button 
            onClick={copyCode}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-700 active:scale-95"
            aria-label={`Copy code for ${loader.name}`}
            title="Copy Code"
          >
            {copied ? (
              <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

const LoaderGrid: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredLoaders = LOADERS.filter(loader => {
    const matchesCategory = filter === 'all' || loader.category === filter;
    const matchesSearch = loader.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="explore" className="py-20 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Browse Loader Library</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">Explore 20+ performant React spinners and animated loading states.</p>
        </div>
        
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative">
             <input 
               type="text" 
               placeholder="Search shadcn loaders..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-10 py-2 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-full sm:w-64 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 transition-all"
               aria-label="Search loaders"
             />
             <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
          </div>
          
          <div className="flex bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-1" role="group" aria-label="Filter loaders by category">
            {['all', 'simple', 'complex', 'abstract', 'utility'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
                  filter === cat ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm border border-zinc-200/50 dark:border-zinc-700' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredLoaders.length > 0 ? (
          filteredLoaders.map((loader) => (
            <LoaderCard key={loader.id} loader={loader} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-zinc-400 dark:text-zinc-600 bg-zinc-50 dark:bg-zinc-900/50 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
            No shadcn loaders found matching your search.
          </div>
        )}
      </div>
    </section>
  );
};

export default LoaderGrid;
