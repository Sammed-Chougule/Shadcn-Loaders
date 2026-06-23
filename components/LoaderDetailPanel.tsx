import React, { useState, useEffect } from 'react';
import { Copy, Check, Terminal, Sliders, Laptop } from 'lucide-react';
import { LoaderItem } from '../types';
import { LoaderDisplay } from './LoaderDisplay';

type LoaderDetailPanelProps = {
  loader: LoaderItem;
};

type SizingOption = 'sm' | 'md' | 'lg' | 'xl';
type ColorOption = 'neutral' | 'blue' | 'emerald' | 'amber' | 'rose' | 'indigo';
type SpeedOption = 'slow' | 'normal' | 'fast';

const colorMap = {
  neutral: { name: 'zinc', textClass: 'text-zinc-950 dark:text-zinc-50', bgClass: 'bg-zinc-950 dark:bg-zinc-50', bgBadge: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200', hex: '18181b', label: 'Neutral Slate' },
  blue: { name: 'blue', textClass: 'text-blue-600 dark:text-blue-400', bgClass: 'bg-blue-600 dark:bg-blue-400', bgBadge: 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300', hex: '2563eb', label: 'Ocean Blue' },
  emerald: { name: 'emerald', textClass: 'text-emerald-500 dark:text-emerald-400', bgClass: 'bg-emerald-500 dark:bg-emerald-400', bgBadge: 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300', hex: '10b981', label: 'Neon Emerald' },
  amber: { name: 'amber', textClass: 'text-amber-500 dark:text-amber-400', bgClass: 'bg-amber-500 dark:bg-amber-400', bgBadge: 'bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300', hex: 'f59e0b', label: 'Warm Amber' },
  rose: { name: 'rose', textClass: 'text-rose-500 dark:text-rose-400', bgClass: 'bg-rose-500 dark:bg-rose-400', bgBadge: 'bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300', hex: 'f43f5e', label: 'Crimson Rose' },
  indigo: { name: 'indigo', textClass: 'text-indigo-600 dark:text-indigo-400', bgClass: 'bg-indigo-600 dark:bg-indigo-400', bgBadge: 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300', hex: '4f46e5', label: 'Deep Indigo' }
};

export const LoaderDetailPanel: React.FC<LoaderDetailPanelProps> = ({ loader }) => {
  const [size, setSize] = useState<SizingOption>('lg');
  const [color, setColor] = useState<ColorOption>('neutral');
  const [speed, setSpeed] = useState<SpeedOption>('normal');
  const [installStyle, setInstallStyle] = useState<'cli' | 'manual'>('cli');
  const [cliType, setCliType] = useState<'modular' | 'master'>('modular');
  const [copied, setCopied] = useState(false);

  // Capitalize name (e.g. classic-spinner -> ClassicSpinner)
  const pascalName = loader.variant
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  const triggerCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Manual Component implementation code mappings
  const rawImplementationCodes: Record<string, string> = {
    'classic-spinner': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function ClassicSpinner({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  return (
    <div className={\`\${containerSize} border-2 border-zinc-200 dark:border-zinc-800 border-t-zinc-950 dark:border-t-zinc-50 rounded-full animate-spin \${className}\`} />
  );
}`,
    'dots-pulse': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function DotsPulse({ size = 'md', className = '' }: LoaderProps) {
  const primaryBgClass = "bg-zinc-950 dark:bg-zinc-50";
  return (
    <div className={\`flex gap-1 items-center \${className}\`}>
      {[0, 1, 2].map((i) => (
        <div 
          key={i}
          className={\`\${size === 'sm' ? 'w-1 h-1' : 'w-2 h-2'} \${primaryBgClass} rounded-full animate-bounce\`} 
          style={{ animationDelay: \`\${i * 0.15}s\` }}
        />
      ))}
    </div>
  );
}`,
    'pulse-ring': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function PulseRing({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  return (
    <div className={\`relative \${containerSize} \${className}\`}>
      <div className="absolute inset-0 border-2 border-zinc-950 dark:border-zinc-50 rounded-full animate-ping opacity-75" />
      <div className="absolute inset-2 border-2 border-zinc-600 dark:border-zinc-400 rounded-full animate-pulse" />
    </div>
  );
}`,
    'bars': `import * as React from "react";

type LoaderProps = {
  className?: string;
};

export function Bars({ className = '' }: LoaderProps) {
  const primaryBgClass = "bg-zinc-950 dark:bg-zinc-50";
  return (
    <div className={\`flex items-end gap-1 h-8 \${className}\`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div 
          key={i} 
          className={\`w-1 \${primaryBgClass} rounded-full animate-[pulse_1s_ease-in-out_infinite]\`}
          style={{ height: \`\${20 + (i * 15) % 80}%\`, animationDelay: \`\${i * 0.1}s\` }}
        />
      ))}
    </div>
  );
}`,
    'square-spin': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function SquareSpin({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  const primaryBgClass = "bg-zinc-950 dark:bg-zinc-50";
  return (
    <div className={\`\${containerSize} \${primaryBgClass} animate-[spin_2s_linear_infinite] rounded-sm shadow-sm \${className}\`} />
  );
}`,
    'double-bounce': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function DoubleBounce({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  const primaryBgClass = "bg-zinc-950 dark:bg-zinc-50";
  return (
    <div className={\`relative \${containerSize} \${className}\`}>
      <div className={\`absolute inset-0 \${primaryBgClass} rounded-full opacity-60 animate-bounce\`} />
      <div className="absolute inset-0 bg-zinc-400 dark:bg-zinc-600 rounded-full opacity-60 animate-bounce delay-700" />
    </div>
  );
}`,
    'circular-progress': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function CircularProgress({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  return (
    <svg className={\`\${containerSize} animate-spin \${className}\`} viewBox="0 0 50 50">
      <circle 
        className="stroke-zinc-950 dark:stroke-zinc-50 fill-none" 
        cx="25" cy="25" r="20" 
        strokeWidth="4" 
        strokeLinecap="round"
        strokeDasharray="80, 200"
      />
    </svg>
  );
}`,
    'wave-loader': `import * as React from "react";

type LoaderProps = {
  className?: string;
};

export function WaveLoader({ className = '' }: LoaderProps) {
  const primaryBgClass = "bg-zinc-950 dark:bg-zinc-50";
  return (
    <div className={\`flex gap-0.5 \${className}\`}>
      {[...Array(10)].map((_, i) => (
        <div 
          key={i} 
          className={\`w-1 h-4 \${primaryBgClass} animate-[pulse_1.5s_infinite]\`} 
          style={{ animationDelay: \`\${i * 0.1}s\` }}
        />
      ))}
    </div>
  );
}`,
    'skeleton': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function Skeleton({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  return (
    <div className={\`relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 rounded border border-zinc-200/50 dark:border-zinc-800/50 \${containerSize} \${className}\`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent animate-shimmer -translate-x-full" />
    </div>
  );
}`,
    'glow-pulse': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function GlowPulse({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  const primaryBgClass = "bg-zinc-950 dark:bg-zinc-50";
  return (
    <div className={\`\${primaryBgClass} rounded-full shadow-[0_0_20px_rgba(0,0,0,0.15)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] animate-pulse \${containerSize} \${className}\`} />
  );
}`,
    'clock': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function Clock({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  return (
    <div className={\`\${containerSize} border-2 border-zinc-300 dark:border-zinc-700 rounded-full relative \${className}\`}>
      <div className="absolute top-1/2 left-1/2 w-[40%] h-0.5 bg-zinc-950 dark:bg-zinc-50 origin-left -rotate-90 animate-[spin_2s_linear_infinite]" />
      <div className="absolute top-1/2 left-1/2 w-[30%] h-0.5 bg-zinc-500 origin-left -rotate-90 animate-[spin_8s_linear_infinite]" />
    </div>
  );
}`,
    'hourglass': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function Hourglass({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  return (
    <div className={\`\${containerSize} relative animate-[spin_2s_ease-in-out_infinite] \${className}\`}>
      <div className="absolute inset-0 border-t-[16px] border-t-zinc-950 dark:border-t-zinc-50 border-x-[16px] border-x-transparent border-b-[16px] border-b-transparent rounded-t-full" />
      <div className="absolute inset-0 border-b-[16px] border-b-zinc-400 dark:border-b-zinc-600 border-x-[16px] border-x-transparent border-t-[16px] border-t-transparent rounded-b-full" />
    </div>
  );
}`,
    'gear': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function Gear({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  const primaryColorClass = "text-zinc-950 dark:text-zinc-50";
  return (
    <div className={\`\${containerSize} \${primaryColorClass} animate-[spin_3s_linear_infinite] \${className}\`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 0-2 2v.44a2 2 0 0 0 2 2 2 2 0 0 1 2 2 2 2 0 0 0 2 2 2 2 0 0 1 2 2 2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2 2 2 0 0 1 2-2 2 2 0 0 0 2-2 2 2 0 0 1 2-2 2 2 0 0 0 2-2v-.44a2 2 0 0 0-2-2 2 2 0 0 0-2-2 2 2 0 1-2-2 2 2 0 0 0-2-2Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </div>
  );
}`,
    'orbit': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function Orbit({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  const primaryBgClass = "bg-zinc-950 dark:bg-zinc-50";
  return (
    <div className={\`\${containerSize} relative flex items-center justify-center \${className}\`}>
      <div className={\`w-2 h-2 \${primaryBgClass} rounded-full\`} />
      <div className="absolute w-full h-full border border-zinc-200 dark:border-zinc-800 rounded-full animate-spin">
         <div className={\`absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 \${primaryBgClass} rounded-full\`} />
      </div>
    </div>
  );
}`,
    'snake': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function Snake({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  const primaryBorderClass = "border-zinc-950 dark:border-zinc-50";
  return (
    <div className={\`\${containerSize} border-2 border-zinc-100 dark:border-zinc-900 relative rounded-md overflow-hidden \${className}\`}>
      <div className={\`absolute inset-0 border-2 \${primaryBorderClass} animate-snake\`} />
    </div>
  );
}`,
    'infinity': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function Infinity({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  const primaryColorClass = "text-zinc-950 dark:text-zinc-50";
  return (
    <div className={\`\${containerSize} \${primaryColorClass} \${className}\`}>
      <svg viewBox="0 0 100 50" className="w-full h-full">
        <path 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeDasharray="10 5" 
          className="animate-[shimmer_2s_linear_infinite]"
          d="M25,25 C25,10 40,10 50,25 C60,40 75,40 75,25 C75,10 60,10 50,25 C40,40 25,40 25,25" 
        />
      </svg>
    </div>
  );
}`,
    'text-shimmer': `import * as React from "react";

type LoaderProps = {
  className?: string;
};

export function TextShimmer({ className = '' }: LoaderProps) {
  return (
    <div className={\`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-400 via-zinc-950 dark:via-zinc-50 to-zinc-400 bg-[length:200%_auto] animate-[shimmer_2s_linear_infinite] \${className}\`}>
      Loading...
    </div>
  );
}`,
    'grid': `import * as React from "react";

type LoaderProps = {
  className?: string;
};

export function Grid({ className = '' }: LoaderProps) {
  const primaryBgClass = "bg-zinc-950 dark:bg-zinc-50";
  return (
    <div className={\`grid grid-cols-3 gap-1 \${className}\`}>
      {[...Array(9)].map((_, i) => (
        <div 
          key={i} 
          className={\`w-2 h-2 \${primaryBgClass} rounded-sm animate-pulse\`} 
          style={{ animationDelay: \`\${i * 0.1}s\` }}
        />
      ))}
    </div>
  );
}`,
    'heartbeat': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function Heartbeat({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  const primaryColorClass = "text-zinc-950 dark:text-zinc-50";
  return (
    <div className={\`\${containerSize} \${primaryColorClass} animate-[ping_1.5s_infinite] flex items-center justify-center \${className}\`}>
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
}`,
    'loader-dna': `import * as React from "react";

type LoaderProps = {
  className?: string;
};

export function LoaderDna({ className = '' }: LoaderProps) {
  const primaryBgClass = "bg-zinc-950 dark:bg-zinc-50";
  return (
    <div className={\`flex justify-center items-center h-full gap-1 \${className}\`}>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className={\`w-2 h-2 \${primaryBgClass} rounded-full animate-bounce\`} style={{ animationDelay: \`\${i * 0.1}s\` }} />
          <div className="w-2 h-2 bg-zinc-300 dark:bg-zinc-700 rounded-full animate-bounce" style={{ animationDelay: \`\${(i * 0.1) + 0.5}s\` }} />
        </div>
      ))}
    </div>
  );
}`,
    'matrix': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function Matrix({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  const primaryBgClass = "bg-zinc-950 dark:bg-zinc-50";
  return (
    <div className={\`flex flex-col gap-0.5 overflow-hidden \${containerSize} items-center \${className}\`}>
      {[...Array(4)].map((_, i) => (
        <div 
          key={i} 
          className="w-full h-1 bg-zinc-100 dark:bg-zinc-900 relative"
        >
          <div 
            className={\`absolute top-0 bottom-0 w-4 \${primaryBgClass} shadow-[0_0_10px_rgba(0,0,0,0.1)]\`}
            style={{ 
              left: '-20%', 
              animation: 'shimmer 2s linear infinite',
              animationDelay: \`\${i * 0.5}s\`
            }}
          />
        </div>
      ))}
    </div>
  );
}`,
    'floating-bubble': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function FloatingBubble({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  const primaryBgClass = "bg-zinc-950 dark:bg-zinc-50";
  return (
    <div className={\`relative overflow-hidden \${containerSize} border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/50 \${className}\`}>
      {[...Array(5)].map((_, i) => {
        const width = [6, 10, 8, 5, 11][i];
        const left = [15, 35, 55, 75, 45][i];
        const duration = [2.5, 3.8, 2.1, 4.5, 3.2][i];
        const delay = [0.2, 1.1, 0.5, 1.8, 0.8][i];
        return (
          <div 
            key={i} 
            className={\`absolute \${primaryBgClass} opacity-30 rounded-full animate-bounce\`}
            style={{ 
              width: \`\${width}px\`,
              height: \`\${width}px\`,
              left: \`\${left}%\`,
              bottom: '-20%',
              animationDuration: \`\${duration}s\`,
              animationDelay: \`\${delay}s\`
            }}
          />
        );
      })}
    </div>
  );
}`,
    'hex-spin': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function HexSpin({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  const primaryColorClass = "text-zinc-950 dark:text-zinc-50";
  return (
    <div className={\`\${containerSize} \${primaryColorClass} flex items-center justify-center \${className}\`}>
      <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_1.6s_linear_infinite]" fill="none" stroke="currentColor" strokeWidth="4">
        <polygon points="50,10 80,30 80,70 50,90 20,70 20,30" className="stroke-current" />
      </svg>
    </div>
  );
}`,
    'concentric-rings': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function ConcentricRings({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  return (
    <div className={\`relative \${containerSize} flex items-center justify-center \${className}\`}>
      <div className="absolute inset-0 rounded-full border-2 border-zinc-200 dark:border-zinc-800 animate-ping" />
      <div className="absolute inset-2 rounded-full border-2 border-zinc-300 dark:border-zinc-700 animate-ping delay-200" />
      <div className="absolute inset-4 rounded-full border-2 border-zinc-400 dark:border-zinc-600 animate-pulse delay-400" />
    </div>
  );
}`,
    'dots-rotate': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function DotsRotate({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  return (
    <div className={\`relative \${containerSize} \${className}\`}>
      <div className="absolute inset-0 flex items-center justify-center animate-[spin_1.2s_linear_infinite]">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-zinc-950 dark:bg-zinc-50 rounded-full"
            style={{ transform: \`rotate(\${i * 120}deg) translateY(-40%)\` }}
          />
        ))}
      </div>
    </div>
  );
}`,
    'morphing-hex': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function MorphingHex({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  return (
    <div className={\`\${containerSize} \${className}\`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="4">
        <style>{\`
          @keyframes morphHexStandalone {
            0% { d: path('M50,10 L80,30 L80,70 L50,90 L20,70 L20,30 Z'); transform: rotate(0deg); }
            25% { d: path('M50,15 L75,35 L75,65 L50,85 L25,65 L25,35 Z'); transform: rotate(90deg); }
            50% { d: path('M50,10 L80,30 L80,70 L50,90 L20,70 L20,30 Z'); transform: rotate(180deg); }
            75% { d: path('M50,15 L75,35 L75,65 L50,85 L25,65 L25,35 Z'); transform: rotate(270deg); }
            100% { d: path('M50,10 L80,30 L80,70 L50,90 L20,70 L20,30 Z'); transform: rotate(360deg); }
          }
          .morphing-standalone { animation: morphHexStandalone 3s ease-in-out infinite; }
        \`}</style>
        <polygon points="50,10 80,30 80,70 50,90 20,70 20,30" className="morphing-standalone stroke-zinc-950 dark:stroke-zinc-50" />
      </svg>
    </div>
  );
}`,
    'ripple-pulse': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function RipplePulse({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  const primaryBgClass = "bg-zinc-950 dark:bg-zinc-50";
  return (
    <div className={\`relative \${containerSize} flex items-center justify-center overflow-hidden \${className}\`}>
      <div className={\`absolute w-2 h-2 \${primaryBgClass} rounded-full\`} />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border-2 border-zinc-950 dark:border-zinc-50"
          style={{
            width: \`\${12 + i * 8}px\`,
            height: \`\${12 + i * 8}px\`,
            animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
            animationDelay: \`\${i * 0.4}s\`,
            opacity: 1 - i * 0.3
          }}
        />
      ))}
    </div>
  );
}`,
    'orbiting-spheres': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function OrbitingSpheres({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  const primaryColorClass = "text-zinc-950 dark:text-zinc-50";
  return (
    <div className={\`\${containerSize} \${className}\`}>
      <style>{\`
        @keyframes rotateContainer {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes orbitMotion {
          0% { transform: translateX(8px) scale(0.73); opacity: 0.65; }
          25% { transform: translateX(0%) scale(0.47); opacity: 0.3; }
          50% { transform: translateX(-8px) scale(0.73); opacity: 0.65; }
          75% { transform: translateX(0%) scale(1); opacity: 1; }
          100% { transform: translateX(8px) scale(0.73); opacity: 0.65; }
        }
        .orbiting-spheres-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          animation: rotateContainer 2.5s infinite linear;
        }
        .orbiting-spheres-dot {
          position: absolute;
          width: 35%;
          height: 35%;
          border-radius: 50%;
          background-color: currentColor;
          animation: orbitMotion 1.5s linear infinite;
        }
        .orbiting-spheres-dot:nth-child(2) {
          animation: orbitMotion 1.5s linear -0.75s infinite;
        }
      \`}</style>
      <div className={\`orbiting-spheres-container \${primaryColorClass}\`}>
        <div className="orbiting-spheres-dot" />
        <div className="orbiting-spheres-dot" />
      </div>
    </div>
  );
}`,
    'paired-revolution': `import * as React from "react";

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

export function PairedRevolution({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  const primaryBgClass = "bg-zinc-950 dark:bg-zinc-50";
  return (
    <div className={\`\${containerSize} relative flex items-center justify-center \${className}\`}>
      <style>{\`
        @keyframes twinOrbitRotate {
          100% {
            transform: rotate(360deg) translate(155%);
          }
        }
      \`}</style>
      <div
        className={\`absolute rounded-full \${primaryBgClass}\`}
        style={{ width: '25%', height: '25%', zIndex: 10 }}
      />
      <div className="absolute w-full h-full">
        <div
          className={\`absolute rounded-full \${primaryBgClass}\`}
          style={{
            width: '25%',
            height: '25%',
            top: '50%',
            left: '50%',
            transform: "rotate(0deg) translate(155%)",
            animation: "twinOrbitRotate 1.4s ease infinite",
            marginTop: '-12.5%',
            marginLeft: '-12.5%',
          }}
        />
        <div
          className={\`absolute rounded-full \${primaryBgClass}\`}
          style={{
            width: '25%',
            height: '25%',
            top: '50%',
            left: '50%',
            transform: "rotate(0deg) translate(155%)",
            animation: "twinOrbitRotate 1.4s ease infinite",
            animationDelay: "0.7s",
            marginTop: '-12.5%',
            marginLeft: '-12.5%',
          }}
        />
      </div>
    </div>
  );
}`,
    'eyes-gaze': `import * as React from "react";

type LoaderProps = {
  className?: string;
};

export function EyesGaze({ className = '' }: LoaderProps) {
  return (
    <div className={\`relative flex items-center justify-center gap-4 \${className}\`}>
      <style>{\`
        @keyframes gazeLeftRight {
          0% { transform: translateX(-6px); }
          25% { transform: translateX(-6px); }
          50% { transform: translateX(6px); }
          75% { transform: translateX(6px); }
          100% { transform: translateX(-6px); }
        }
      \`}</style>
      <div className="relative w-8 h-8 bg-zinc-950 dark:bg-zinc-50 rounded-full flex items-center justify-center">
        <div
          className="w-3 h-3 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center"
          style={{ animation: "gazeLeftRight 2s ease-in-out infinite" }}
        >
          <div className="w-2 h-2 bg-zinc-950 dark:bg-zinc-50 rounded-full" />
        </div>
      </div>
      <div className="relative w-8 h-8 bg-zinc-950 dark:bg-zinc-50 rounded-full flex items-center justify-center">
        <div
          className="w-3 h-3 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center"
          style={{ animation: "gazeLeftRight 2s ease-in-out infinite" }}
        >
          <div className="w-2 h-2 bg-zinc-950 dark:bg-zinc-50 rounded-full" />
        </div>
      </div>
    </div>
  );
}`
  };

  const getCustomizedManualCode = () => {
    let baseCode = rawImplementationCodes[loader.variant] || `import * as React from "react";
import { Loader } from "./loader";

export function ${pascalName}(props: React.ComponentProps<typeof Loader>) {
  return <Loader {...props} variant="${loader.variant}" />;
}`;

    // Dynamic Sizing Replacement
    baseCode = baseCode.replace(/size = 'md'/g, `size = '${size}'`);

    // Dynamic Color Replacement
    if (color !== 'neutral') {
      const activeColor = colorMap[color];
      // Target multiple standard black-accent class pairs
      baseCode = baseCode.replace(/bg-zinc-900/g, `bg-${activeColor.name}-500`);
      baseCode = baseCode.replace(/bg-zinc-950/g, `bg-${activeColor.name}-600`);
      baseCode = baseCode.replace(/dark:bg-zinc-50/g, `dark:bg-${activeColor.name}-400`);
      
      baseCode = baseCode.replace(/text-zinc-900/g, `text-${activeColor.name}-500`);
      baseCode = baseCode.replace(/text-zinc-950/g, `text-${activeColor.name}-600`);
      baseCode = baseCode.replace(/dark:text-zinc-50/g, `dark:text-${activeColor.name}-400`);
      
      baseCode = baseCode.replace(/border-zinc-950/g, `border-${activeColor.name}-600`);
      baseCode = baseCode.replace(/dark:border-zinc-50/g, `dark:border-${activeColor.name}-400`);

      baseCode = baseCode.replace(/border-t-zinc-950/g, `border-t-${activeColor.name}-600`);
      baseCode = baseCode.replace(/dark:border-t-zinc-50/g, `dark:border-t-${activeColor.name}-400`);

      baseCode = baseCode.replace(/stroke-zinc-950/g, `stroke-${activeColor.name}-600`);
      baseCode = baseCode.replace(/dark:stroke-zinc-50/g, `dark:stroke-${activeColor.name}-400`);
    }

    return baseCode;
  };

  const activeColor = colorMap[color];
  const cssNamespace = `arena-panel-${loader.variant}`;

  // Custom live CSS injection matching custom options
  const arenaStyleMarkup = `
    .${cssNamespace} .bg-zinc-900, 
    .${cssNamespace} .bg-zinc-950,
    .${cssNamespace} .dark\\:bg-zinc-50 { 
      background-color: ${color === 'neutral' ? '' : `#${activeColor.hex}`} !important; 
    }
    .${cssNamespace} .text-zinc-900, 
    .${cssNamespace} .text-zinc-950,
    .${cssNamespace} .dark\\:text-zinc-50 { 
      color: ${color === 'neutral' ? '' : `#${activeColor.hex}`} !important; 
    }
    .${cssNamespace} .border-zinc-950, 
    .${cssNamespace} .dark\\:border-zinc-50 { 
      border-color: ${color === 'neutral' ? '' : `#${activeColor.hex}`} !important; 
    }
    .${cssNamespace} .border-t-zinc-950, 
    .${cssNamespace} .dark\\:border-t-zinc-50 { 
      border-top-color: ${color === 'neutral' ? '' : `#${activeColor.hex}`} !important; 
    }
    .${cssNamespace} .stroke-zinc-950, 
    .${cssNamespace} .dark\\:stroke-zinc-50 { 
      stroke: ${color === 'neutral' ? '' : `#${activeColor.hex}`} !important; 
    }
    ${speed === 'slow' ? `.${cssNamespace} * { animation-duration: 2.2s !important; }` : ''}
    ${speed === 'fast' ? `.${cssNamespace} * { animation-duration: 0.45s !important; }` : ''}
  `;

  const getUnifiedCodeContent = () => {
    if (installStyle === 'cli') {
      const command = cliType === 'modular' 
        ? `npx shadcn-loaders@latest add ${loader.variant}`
        : `npx shadcn-loaders@latest add loader`;

      const imprt = cliType === 'modular'
        ? `import { ${pascalName} } from "@/components/ui/${loader.variant}";`
        : `import { Loader } from "@/components/ui/loader";`;

      const colorAttr = color !== 'neutral' ? ` color="${color}"` : '';
      const speedAttr = speed !== 'normal' ? ` speed="${speed}"` : '';
      const usage = cliType === 'modular'
        ? `<${pascalName} size="${size}"${colorAttr}${speedAttr} />`
        : `<Loader variant="${loader.variant}" size="${size}"${colorAttr}${speedAttr} />`;

      return `// 1. Install component via shadcn CLI\n${command}\n\n// 2. Import into your React application\n${imprt}\n\n// 3. Render component preview with active configuration\n${usage}`;
    } else {
      return getCustomizedManualCode();
    }
  };

  const unifiedCode = getUnifiedCodeContent();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm flex flex-col h-full">
      {/* CSS Override for Live Arena customizations */}
      <style dangerouslySetInnerHTML={{ __html: arenaStyleMarkup }} />

      {/* Header Panel */}
      <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded-full capitalize">
            {loader.category}
          </span>
          <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
            shipped in components/ui
          </span>
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-1 flex items-center gap-2">
          {loader.name}
        </h3>
      </div>

      <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
        
        {/* Live Playground & Customize Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          {/* Left: Live Playground (Wider and responsive height) */}
          <div className="sm:col-span-5 relative bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl flex flex-col items-center justify-center overflow-hidden shadow-inner min-h-[160px] sm:h-auto">
            <div className="absolute top-3 left-3 text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold flex items-center gap-1 select-none pointer-events-none uppercase tracking-wider">
              <Laptop className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-700 animate-pulse" /> Play
            </div>
            
            {/* Dynamically Styled Wrapper */}
            <div className={`${cssNamespace} scale-125 sm:scale-135 transition-transform duration-300 ${activeColor.textClass}`}>
              <LoaderDisplay variant={loader.variant} size={size} />
            </div>

            <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/85 dark:bg-zinc-900/80 px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm text-[9px] font-medium text-zinc-400 dark:text-zinc-500 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              active
            </div>
          </div>

          {/* Right: Customize (Sizes, colors, and speed) */}
          <div className="sm:col-span-7 bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-100 dark:border-zinc-800 p-4 rounded-2xl space-y-3">
            <div className="flex items-center gap-1.5 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              <Sliders className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Customize
              </span>
            </div>

            {/* Sizing Slider */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Viewport Scale</span>
                <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-150/60 dark:bg-zinc-800 px-2 py-0.5 rounded-full uppercase tracking-wider">{size}</span>
              </div>
              <div className="grid grid-cols-4 gap-0.5 bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-0.5">
                {(['sm', 'md', 'lg', 'xl'] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSize(sz)}
                    className={`py-0.5 text-[10px] font-semibold rounded-md transition-all uppercase ${
                      size === sz 
                        ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm border border-zinc-200/50 dark:border-transparent' 
                        : 'text-zinc-700 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Accent Color</span>
                <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-150/60 dark:bg-zinc-800 px-2 py-0.5 rounded-full">{activeColor.label}</span>
              </div>
              <div className="flex gap-1.5 items-center bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-1.5 overflow-x-auto custom-scrollbar">
                {(Object.keys(colorMap) as ColorOption[]).map((col) => {
                  const colorDef = colorMap[col];
                  const swatchBackground = col === 'neutral' 
                    ? 'bg-zinc-900 dark:bg-zinc-50' 
                    : `bg-${colorDef.name}-500`;
                  return (
                    <button
                      key={col}
                      onClick={() => setColor(col)}
                      className={`w-5 h-5 rounded-full flex items-center justify-center transition-all relative shrink-0 ${swatchBackground} ${
                        color === col 
                          ? 'ring-2 ring-offset-2 ring-zinc-400 dark:ring-offset-zinc-950 scale-105' 
                          : 'hover:scale-105 active:scale-95'
                      }`}
                      title={colorDef.label}
                    >
                      {color === col && (
                        <Check className={`w-2.5 h-2.5 ${col === 'neutral' ? 'text-white dark:text-zinc-900' : 'text-white'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Animation Speed */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Velocity</span>
                <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-150/60 dark:bg-zinc-800 px-2 py-0.5 rounded-full capitalize">{speed}</span>
              </div>
              <div className="grid grid-cols-3 gap-0.5 bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-0.5">
                {(['slow', 'normal', 'fast'] as const).map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setSpeed(spd)}
                    className={`py-0.5 text-[10px] font-semibold rounded-md transition-all capitalize ${
                      speed === spd 
                        ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm border border-zinc-200/50 dark:border-transparent' 
                        : 'text-zinc-700 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
                    }`}
                  >
                    {spd}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Unified Code block (CLI/Manual tabs + copy snippet) */}
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-900 flex flex-col h-[320px] sm:h-[380px] lg:h-[440px] xl:h-[480px] mt-4 shadow-sm text-zinc-800 dark:text-zinc-200">
          {/* Terminal Code Header */}
          <div className="px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/40 flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
              <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                {installStyle === 'cli' ? `components/ui/${loader.variant}.sh` : `components/ui/${loader.variant}.tsx`}
              </span>
            </div>

            {/* CLI vs Standalone tabs */}
            <div className="flex bg-zinc-200/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setInstallStyle('cli')}
                className={`px-2.5 py-0.5 rounded-md text-[10px] font-semibold transition-all ${
                  installStyle === 'cli' 
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm border border-zinc-200/50 dark:border-transparent' 
                    : 'text-zinc-700 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                shadcn CLI
              </button>
              <button
                onClick={() => setInstallStyle('manual')}
                className={`px-2.5 py-0.5 rounded-md text-[10px] font-semibold transition-all ${
                  installStyle === 'manual' 
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm border border-zinc-200/50 dark:border-transparent' 
                    : 'text-zinc-700 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                Standalone
              </button>
            </div>
          </div>

          {/* Dynamic CLI sub selection banner (only visible on CLI) */}
          {installStyle === 'cli' && (
            <div className="px-4 py-1.5 border-b border-zinc-200/40 dark:border-zinc-800/20 bg-zinc-100/30 dark:bg-zinc-900/10 flex items-center justify-between gap-2 text-[10px] shrink-0 select-none">
              <span className="font-medium text-zinc-500 dark:text-zinc-400">Package Scope</span>
              <div className="flex bg-zinc-200/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md p-0.5">
                <button
                  onClick={() => setCliType('modular')}
                  className={`px-2 py-0.5 rounded-md text-[9px] font-bold transition-all ${
                    cliType === 'modular' 
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200/50 dark:border-transparent shadow-sm' 
                      : 'text-zinc-700 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  Single Add
                </button>
                <button
                  onClick={() => setCliType('master')}
                  className={`px-2 py-0.5 rounded-md text-[9px] font-bold transition-all ${
                    cliType === 'master' 
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200/50 dark:border-transparent shadow-sm' 
                      : 'text-zinc-700 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  Master Add
                </button>
              </div>
            </div>
          )}

          {/* Code Area Workspace */}
          <div className="flex-1 p-4 overflow-auto font-mono text-[11px] sm:text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed pr-2 select-text bg-white dark:bg-zinc-950/40 scrollbar-thin">
            <pre className="whitespace-pre">
              <code>{unifiedCode}</code>
            </pre>
          </div>

          {/* Copy Button Footer */}
          <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/40 flex items-center justify-between shrink-0">
            <span className="text-[9px] text-zinc-400 dark:text-zinc-500 tracking-wide font-mono italic">
              Ready to copy to project
            </span>
            
            <button
              onClick={() => triggerCopy(unifiedCode)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all active:scale-95 shadow-sm cursor-pointer select-none"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Copied Config!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                  <span>Copy Snippet</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};