
export type LoaderVariant = 
  | 'classic-spinner'
  | 'dots-pulse'
  | 'pulse-ring'
  | 'bars'
  | 'square-spin'
  | 'double-bounce'
  | 'circular-progress'
  | 'wave-loader'
  | 'skeleton'
  | 'glow-pulse'
  | 'clock'
  | 'hourglass'
  | 'gear'
  | 'orbit'
  | 'snake'
  | 'infinity'
  | 'text-shimmer'
  | 'grid'
  | 'heartbeat'
  | 'floating-bubble'
  | 'matrix'
  | 'loader-dna';

export interface LoaderItem {
  id: string;
  name: string;
  variant: LoaderVariant;
  description: string;
  category: 'simple' | 'complex' | 'abstract' | 'utility';
}

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: string;
}
