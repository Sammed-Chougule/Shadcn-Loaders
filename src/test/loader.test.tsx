import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { Loader } from '../../registry/loader.tsx';

afterEach(() => cleanup());

describe('Loader component', () => {
  const variants = [
    'classic-spinner', 'dots-pulse', 'pulse-ring', 'bars', 'square-spin',
    'double-bounce', 'circular-progress', 'wave-loader', 'skeleton', 'glow-pulse',
  ];

  it.each(variants)('renders variant %s without crashing', (variant) => {
    render(<Loader variant={variant} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    render(<Loader variant="classic-spinner" size="sm" />);
    const loaderEl = screen.getByRole('status') as HTMLElement;
    // The wrapper has role="status"; the inner element has the size classes
    const inner = loaderEl.querySelector('[class*="w-4"]') as HTMLElement;
    expect(inner).toBeTruthy();
  });

  it('applies custom className to wrapper', () => {
    render(<Loader variant="classic-spinner" className="my-custom-class" />);
    const wrapper = screen.getByRole('status') as HTMLElement;
    expect(wrapper).toHaveClass('my-custom-class');
  });

  it('renders all variants from types without crashing', () => {
    const allVariants: string[] = [
      'classic-spinner', 'dots-pulse', 'pulse-ring', 'bars', 'square-spin',
      'double-bounce', 'circular-progress', 'wave-loader', 'skeleton', 'glow-pulse',
      'clock', 'hourglass', 'gear', 'orbit', 'snake', 'infinity', 'text-shimmer',
      'grid', 'heartbeat', 'floating-bubble', 'matrix', 'loader-dna', 'hex-spin',
      'concentric-rings', 'dots-rotate', 'morphing-hex', 'ripple-pulse',
      'orbiting-spheres', 'paired-revolution', 'eyes-gaze', 'ripple-wave',
      'audio-wave', 'fading-ring', 'morphing-shape', 'dots-chase', 'atom',
      'solar-system', 'radar-sweep', 'blocks-wave', 'coffee-cup', 'progress-slider',
      'flower-spin', 'bouncing-ball', 'walking-steps', 'corner-chase',
      'newtons-cradle', 'comet-trail', 'liquid-fill', 'battery-charge', 'domino-fall',
    ];
    allVariants.forEach((variant) => {
      cleanup();
      render(<Loader variant={variant as any} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });
});
