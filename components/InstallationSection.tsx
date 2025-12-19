
import React, { useState } from 'react';

const InstallationSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'npm' | 'yarn' | 'pnpm' | 'bun'>('npm');
  const [copied, setCopied] = useState(false);

  const commands = {
    npm: 'npx shadcn-loaders@latest add loader',
    yarn: 'yarn dlx shadcn-loaders@latest add loader',
    pnpm: 'pnpm dlx shadcn-loaders@latest add loader',
    bun: 'bun x shadcn-loaders@latest add loader'
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(commands[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-md transition-colors">
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          {(['npm', 'yarn', 'pnpm', 'bun'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab 
                  ? 'text-zinc-900 dark:text-zinc-50 border-b-2 border-zinc-900 dark:border-zinc-50 bg-white dark:bg-zinc-900' 
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-6 flex items-center justify-between group bg-zinc-950">
          <code className="mono text-zinc-100 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide pr-4">
            <span className="text-zinc-500 mr-2">$</span>
            {commands[activeTab]}
          </code>
          <button 
            onClick={copyToClipboard}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors border border-transparent active:border-zinc-700 shrink-0"
          >
            {copied ? (
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-400 dark:text-zinc-500 bg-zinc-100/50 dark:bg-zinc-900/30 py-2 rounded-full border border-zinc-200/50 dark:border-zinc-800 max-w-sm mx-auto transition-colors">
        <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>This adds the component to <code>components/ui</code> automatically.</span>
      </div>
    </div>
  );
};

export default InstallationSection;
