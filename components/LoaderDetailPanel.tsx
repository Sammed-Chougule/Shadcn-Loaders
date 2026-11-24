import React, { useState, useMemo } from 'react';
import { Copy, Check, Terminal, Sliders, Laptop, Pencil, X } from 'lucide-react';
import { LoaderItem } from '../types';
import { LoaderDisplay } from './LoaderDisplay';
import { copyToClipboard } from '../lib/utils';

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

const pascalNameFor = (variant: string) =>
  variant
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

export const LoaderDetailPanel: React.FC<LoaderDetailPanelProps> = ({ loader }) => {
  const [size, setSize] = useState<SizingOption>('lg');
  const [color, setColor] = useState<ColorOption>('neutral');
  const [speed, setSpeed] = useState<SpeedOption>('normal');
  const [copied, setCopied] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editCode, setEditCode] = useState('');

  const triggerCopy = async (text: string) => {
    const ok = await copyToClipboard(text);
    setCopied(ok);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeColor = colorMap[color];
  const pascalName = pascalNameFor(loader.variant);
  const cssNamespace = `arena-panel-${loader.variant}`;

  // Custom live CSS injection matching custom options
  const arenaStyleMarkup = useMemo(() => `
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
  `, [cssNamespace, color, speed, activeColor]);

  // Clean usage snippet sourced from the canonical registry component
  const usageCode = useMemo(() => `import { Loader } from "@/components/ui/loader";

export function ${pascalName}({ size = "${size}", className = "" } = {}) {
  return <Loader variant="${loader.variant}" size={size} className={className} />;
}`, [loader.variant, pascalName, size]);

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
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          {loader.description}
        </p>
      </div>

      <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
        {/* Live Playground & Customize Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          {/* Left: Live Playground */}
          <div className="sm:col-span-5 relative bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl flex flex-col items-center justify-center overflow-hidden shadow-inner min-h-[160px] sm:h-auto">
            <div className="absolute top-3 left-3 text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold flex items-center gap-1 select-none pointer-events-none uppercase tracking-wider">
              <Laptop className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-700 animate-pulse" /> Play
            </div>

            {/* Dynamically Styled Wrapper */}
            <div className={`${cssNamespace} scale-125 sm:scale-135 transition-transform duration-300 ${activeColor.textClass}`}>
              <LoaderDisplay variant={loader.variant} size={size} color={color} />
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
                <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100/60 dark:bg-zinc-800 px-2 py-0.5 rounded-full uppercase tracking-wider">{size}</span>
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
                <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100/60 dark:bg-zinc-800 px-2 py-0.5 rounded-full">{activeColor.label}</span>
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
                <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100/60 dark:bg-zinc-800 px-2 py-0.5 rounded-full capitalize">{speed}</span>
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

        {/* Code block (usage snippet + copy) */}
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-900 flex flex-col h-[320px] sm:h-[380px] lg:h-[440px] xl:h-[480px] mt-4 shadow-sm text-zinc-800 dark:text-zinc-200">
          {/* Terminal Code Header */}
          <div className="px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/40 flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
              <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                components/ui/{loader.variant}.tsx
              </span>
            </div>
          </div>

          {/* Code Area Workspace */}
          <div className="flex-1 p-4 overflow-auto font-mono text-[11px] sm:text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed pr-2 select-text bg-white dark:bg-zinc-950/40 scrollbar-thin">
            <pre className="whitespace-pre">
              <code>{usageCode}</code>
            </pre>
          </div>

          {/* Copy Button Footer */}
          <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/40 flex items-center justify-between shrink-0">
            <span className="text-[9px] text-zinc-400 dark:text-zinc-500 tracking-wide font-mono italic">
              Ready to copy to project
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditCode(usageCode);
                  setIsEditOpen(true);
                }}
                className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-amber-100 dark:bg-amber-900/40 hover:bg-amber-200 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700 transition-all active:scale-95 shadow-sm cursor-pointer select-none"
                title="Edit loader code"
              >
                <Pencil className="w-4 h-4 flex-shrink-0" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => triggerCopy(usageCode)}
                className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all active:scale-95 shadow-sm cursor-pointer select-none"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-zinc-500 dark:text-zinc-400 flex-shrink-0" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Edit Modal Popup */}
        {isEditOpen && (
          <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl border border-zinc-200 dark:border-zinc-700 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Edit Loader Code</h2>
                <button
                  onClick={() => setIsEditOpen(false)}
                  className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                  title="Close edit modal"
                >
                  <X className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-auto p-6">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
                  Code
                </label>
                <textarea
                  value={editCode}
                  onChange={(e) => setEditCode(e.target.value)}
                  className="w-full h-96 p-4 font-mono text-sm bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  spellCheck="false"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-end gap-3">
                <button
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    triggerCopy(editCode);
                    setIsEditOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-all active:scale-95 flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Edited Code</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
