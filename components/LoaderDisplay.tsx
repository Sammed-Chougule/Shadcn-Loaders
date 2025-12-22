
import React from 'react';
import { LoaderProps, LoaderVariant } from '../types';

export const LoaderDisplay: React.FC<LoaderProps & { variant: LoaderVariant }> = ({ 
  variant, 
  size = 'md', 
  className = '', 
  color = 'currentColor' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const containerSize = sizeClasses[size];
  const primaryColorClass = "text-zinc-900 dark:text-zinc-50";
  const primaryBgClass = "bg-zinc-900 dark:bg-zinc-50";
  const primaryBorderClass = "border-zinc-900 dark:border-zinc-50";

  switch (variant) {
    case 'classic-spinner':
      return (
        <div className={`${containerSize} border-2 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-zinc-50 rounded-full animate-spin ${className}`} />
      );

    case 'dots-pulse':
      return (
        <div className={`flex gap-1 items-center ${className}`}>
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className={`${size === 'sm' ? 'w-1 h-1' : 'w-2 h-2'} ${primaryBgClass} rounded-full animate-bounce`} 
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      );

    case 'pulse-ring':
      return (
        <div className={`relative ${containerSize} ${className}`}>
          <div className="absolute inset-0 border-2 border-zinc-900 dark:border-zinc-50 rounded-full animate-ping opacity-75" />
          <div className="absolute inset-2 border-2 border-zinc-600 dark:border-zinc-400 rounded-full animate-pulse" />
        </div>
      );

    case 'bars':
      return (
        <div className={`flex items-end gap-1 h-8 ${className}`}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              className={`w-1 ${primaryBgClass} rounded-full animate-[pulse_1s_ease-in-out_infinite]`}
              style={{ height: `${20 + Math.random() * 80}%`, animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      );

    case 'square-spin':
      return (
        <div className={`${containerSize} ${primaryBgClass} animate-[spin_2s_linear_infinite] rounded-sm shadow-sm ${className}`} />
      );

    case 'double-bounce':
      return (
        <div className={`relative ${containerSize} ${className}`}>
          <div className={`absolute inset-0 ${primaryBgClass} rounded-full opacity-60 animate-bounce`} />
          <div className="absolute inset-0 bg-zinc-400 dark:bg-zinc-600 rounded-full opacity-60 animate-bounce delay-700" />
        </div>
      );

    case 'circular-progress':
      return (
        <svg className={`${containerSize} animate-spin ${className}`} viewBox="0 0 50 50">
          <circle 
            className="stroke-zinc-900 dark:stroke-zinc-50 fill-none" 
            cx="25" cy="25" r="20" 
            strokeWidth="4" 
            strokeLinecap="round"
            strokeDasharray="80, 200"
          />
        </svg>
      );

    case 'wave-loader':
      return (
        <div className={`flex gap-0.5 ${className}`}>
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className={`w-1 h-4 ${primaryBgClass} animate-[pulse_1.5s_infinite]`} 
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      );

    case 'skeleton':
      return (
        <div className={`relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 rounded border border-zinc-200/50 dark:border-zinc-800/50 ${containerSize} ${className}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent animate-shimmer -translate-x-full" />
        </div>
      );

    case 'glow-pulse':
      return (
        <div className={`${primaryBgClass} rounded-full shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] animate-pulse ${containerSize} ${className}`} />
      );

    case 'clock':
      return (
        <div className={`${containerSize} border-2 border-zinc-300 dark:border-zinc-700 rounded-full relative ${className}`}>
          <div className="absolute top-1/2 left-1/2 w-[40%] h-0.5 bg-zinc-900 dark:bg-zinc-50 origin-left -rotate-90 animate-[spin_2s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 w-[30%] h-0.5 bg-zinc-500 origin-left -rotate-90 animate-[spin_8s_linear_infinite]" />
        </div>
      );

    case 'hourglass':
      return (
        <div className={`${containerSize} relative animate-[spin_2s_ease-in-out_infinite] ${className}`}>
          <div className="absolute inset-0 border-t-[16px] border-t-zinc-900 dark:border-t-zinc-50 border-x-[16px] border-x-transparent border-b-[16px] border-b-transparent rounded-t-full" />
          <div className="absolute inset-0 border-b-[16px] border-b-zinc-400 dark:border-b-zinc-600 border-x-[16px] border-x-transparent border-t-[16px] border-t-transparent rounded-b-full" />
        </div>
      );

    case 'gear':
      return (
        <div className={`${containerSize} ${primaryColorClass} animate-[spin_3s_linear_infinite] ${className}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 0-2 2v.44a2 2 0 0 0 2 2 2 2 0 0 1 2 2 2 2 0 0 0 2 2 2 2 0 0 1 2 2 2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2 2 2 0 0 1 2-2 2 2 0 0 0 2-2 2 2 0 0 1 2-2 2 2 0 0 0 2-2v-.44a2 2 0 0 0-2-2 2 2 0 0 1-2-2 2 2 0 0 0-2-2 2 2 0 0 1-2-2 2 2 0 0 0-2-2Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
      );

    case 'orbit':
      return (
        <div className={`${containerSize} relative flex items-center justify-center ${className}`}>
          <div className={`w-2 h-2 ${primaryBgClass} rounded-full`} />
          <div className="absolute w-full h-full border border-zinc-200 dark:border-zinc-800 rounded-full animate-spin">
             <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 ${primaryBgClass} rounded-full`} />
          </div>
        </div>
      );

    case 'snake':
      return (
        <div className={`${containerSize} border-2 border-zinc-100 dark:border-zinc-900 relative rounded-md overflow-hidden ${className}`}>
          <div className={`absolute inset-0 border-2 ${primaryBorderClass} animate-snake`} />
        </div>
      );

    case 'infinity':
      return (
        <div className={`${containerSize} ${primaryColorClass} ${className}`}>
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

    case 'text-shimmer':
      return (
        <div className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-400 via-zinc-900 dark:via-zinc-100 to-zinc-400 bg-[length:200%_auto] animate-[shimmer_2s_linear_infinite] ${className}`}>
          Loading...
        </div>
      );

    case 'grid':
      return (
        <div className={`grid grid-cols-3 gap-1 ${className}`}>
          {[...Array(9)].map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 ${primaryBgClass} rounded-sm animate-pulse`} 
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      );

    case 'heartbeat':
      return (
        <div className={`${containerSize} ${primaryColorClass} animate-[ping_1.5s_infinite] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      );

    case 'matrix':
      return (
        <div className={`flex flex-col gap-0.5 overflow-hidden ${containerSize} items-center ${className}`}>
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className="w-full h-1 bg-zinc-100 dark:bg-zinc-900 relative"
            >
              <div 
                className={`absolute top-0 bottom-0 w-4 ${primaryBgClass} shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
                style={{ 
                  left: '-20%', 
                  animation: `shimmer 2s linear infinite`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            </div>
          ))}
        </div>
      );

    case 'loader-dna':
      return (
        <div className={`flex justify-center items-center h-full gap-1 ${className}`}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className={`w-2 h-2 ${primaryBgClass} rounded-full animate-bounce`} style={{ animationDelay: `${i * 0.1}s` }} />
              <div className="w-2 h-2 bg-zinc-300 dark:bg-zinc-700 rounded-full animate-bounce" style={{ animationDelay: `${(i * 0.1) + 0.5}s` }} />
            </div>
          ))}
        </div>
      );

    case 'floating-bubble':
      return (
        <div className={`relative overflow-hidden ${containerSize} border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/50 ${className}`}>
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`absolute ${primaryBgClass} opacity-30 rounded-full animate-bounce`}
              style={{ 
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                left: `${Math.random() * 80 + 10}%`,
                bottom: '-20%',
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      );

    default:
      return null;
  }
};
