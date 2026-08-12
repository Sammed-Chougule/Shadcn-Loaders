import * as React from "react";

export type LoaderVariant =
  | "classic-spinner"
  | "dots-pulse"
  | "pulse-ring"
  | "bars"
  | "square-spin"
  | "double-bounce"
  | "circular-progress"
  | "wave-loader"
  | "skeleton"
  | "glow-pulse"
  | "clock"
  | "hourglass"
  | "gear"
  | "orbit"
  | "snake"
  | "infinity"
  | "text-shimmer"
  | "grid"
  | "heartbeat"
  | "floating-bubble"
  | "matrix"
  | "loader-dna"
  | "hex-spin"
  | "concentric-rings"
  | "dots-rotate"
  | "morphing-hex"
  | "ripple-pulse"
  | "orbiting-spheres"
  | "paired-revolution"
  | "eyes-gaze"
  | "ripple-wave"
  | "audio-wave"
  | "fading-ring"
  | "morphing-shape"
  | "dots-chase";

export interface LoaderProps {
  variant: LoaderVariant;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const loaderSnakeKeyframes = `
@keyframes loader-snake {
  0%, 100% { clip-path: inset(0 0 95% 0); }
  25% { clip-path: inset(0 95% 0 0); }
  50% { clip-path: inset(95% 0 0 0); }
  75% { clip-path: inset(0 0 0 95%); }
}
.animate-loader-snake { animation: loader-snake 2s linear infinite; }
`;

const loaderShimmerKeyframes = `
@keyframes loader-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-loader-shimmer { animation: loader-shimmer 2s infinite; }
`;

const loaderPingKeyframes = `
@keyframes loader-ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}
`;

const loaderMorphHexKeyframes = `
@keyframes loader-morph-hex {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(0.875); }
}
`;

const variantKeyframes: Partial<Record<LoaderVariant, string>> = {
  snake: loaderSnakeKeyframes,
  skeleton: loaderShimmerKeyframes,
  infinity: loaderShimmerKeyframes,
  "text-shimmer": loaderShimmerKeyframes,
  matrix: loaderShimmerKeyframes,
  "ripple-pulse": loaderPingKeyframes,
  "morphing-hex": loaderMorphHexKeyframes,
};

export const Loader: React.FC<LoaderProps> = ({
  variant,
  size = "md",
  className = "",
}) => {
  const containerSize = sizeClasses[size] ?? sizeClasses.md;
  const primaryColorClass = "text-zinc-900 dark:text-zinc-50";
  const primaryBgClass = "bg-zinc-900 dark:bg-zinc-50";
  const primaryBorderClass = "border-zinc-900 dark:border-zinc-50";
  const keyframes = variantKeyframes[variant];
  const hourglassBorder = size === "sm" ? 8 : size === "md" ? 12 : size === "lg" ? 16 : 20;

  let content: React.ReactNode = null;

  switch (variant) {
    case "classic-spinner":
      content = (
        <div
          className={`${containerSize} border-2 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-zinc-50 rounded-full animate-spin ${className}`}
        />
      );
      break;

    case "dots-pulse":
      content = (
        <div className={`flex gap-1 items-center ${className}`}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`${size === "sm" ? "w-1 h-1" : "w-2 h-2"} ${primaryBgClass} rounded-full animate-bounce`}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      );
      break;

    case "pulse-ring":
      content = (
        <div className={`relative ${containerSize} ${className}`}>
          <div className="absolute inset-0 border-2 border-zinc-900 dark:border-zinc-50 rounded-full animate-ping opacity-75" />
          <div className="absolute inset-2 border-2 border-zinc-600 dark:border-zinc-400 rounded-full animate-pulse" />
        </div>
      );
      break;

    case "bars":
      content = (
        <div className={`flex items-end gap-1 h-8 ${className}`}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-1 ${primaryBgClass} rounded-full animate-[pulse_1s_ease-in-out_infinite]`}
              style={{
                height: `${20 + (i * 15) % 80}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      );
      break;

    case "square-spin":
      content = (
        <div
          className={`${containerSize} ${primaryBgClass} animate-[spin_2s_linear_infinite] rounded-sm shadow-sm ${className}`}
        />
      );
      break;

    case "double-bounce":
      content = (
        <div className={`relative ${containerSize} ${className}`}>
          <div
            className={`absolute inset-0 ${primaryBgClass} rounded-full opacity-60 animate-bounce`}
          />
          <div className="absolute inset-0 bg-zinc-400 dark:bg-zinc-600 rounded-full opacity-60 animate-bounce [animation-delay:700ms]" />
        </div>
      );
      break;

    case "circular-progress":
      content = (
        <svg
          className={`${containerSize} animate-spin ${className}`}
          viewBox="0 0 50 50"
        >
          <circle
            className="stroke-zinc-900 dark:stroke-zinc-50 fill-none"
            cx="25"
            cy="25"
            r="20"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="80, 200"
          />
        </svg>
      );
      break;

    case "wave-loader":
      content = (
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
      break;

    case "skeleton":
      content = (
        <div
          className={`relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 rounded border border-zinc-200/50 dark:border-zinc-800/50 ${containerSize} ${className}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent animate-loader-shimmer -translate-x-full" />
        </div>
      );
      break;

    case "glow-pulse":
      content = (
        <div
          className={`${primaryBgClass} rounded-full shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] animate-pulse ${containerSize} ${className}`}
        />
      );
      break;

    case "clock":
      content = (
        <div
          className={`${containerSize} border-2 border-zinc-300 dark:border-zinc-700 rounded-full relative ${className}`}
        >
          <div className="absolute top-1/2 left-1/2 w-[40%] h-0.5 bg-zinc-900 dark:bg-zinc-50 origin-left -rotate-90 animate-[spin_2s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 w-[30%] h-0.5 bg-zinc-500 origin-left -rotate-90 animate-[spin_8s_linear_infinite]" />
        </div>
      );
      break;

    case "hourglass":
      content = (
        <div
          className={`${containerSize} relative animate-[spin_2s_ease-in-out_infinite] ${className}`}
        >
          <div
            className="absolute inset-0 border-t-zinc-900 dark:border-t-zinc-50 border-x-transparent border-b-transparent rounded-t-full"
            style={{
              borderTopWidth: hourglassBorder,
              borderLeftWidth: hourglassBorder,
              borderRightWidth: hourglassBorder,
              borderBottomWidth: hourglassBorder,
            }}
          />
          <div
            className="absolute inset-0 border-b-zinc-400 dark:border-b-zinc-600 border-x-transparent border-t-transparent rounded-b-full"
            style={{
              borderTopWidth: hourglassBorder,
              borderLeftWidth: hourglassBorder,
              borderRightWidth: hourglassBorder,
              borderBottomWidth: hourglassBorder,
            }}
          />
        </div>
      );
      break;

    case "gear":
      content = (
        <div
          className={`${containerSize} ${primaryColorClass} animate-[spin_3s_linear_infinite] ${className}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 0-2 2v.44a2 2 0 0 0 2 2 2 2 0 0 1 2 2 2 2 0 0 0 2 2 2 2 0 0 1 2 2 2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2 2 2 0 0 1 2-2 2 2 0 0 0 2-2 2 2 0 0 1 2-2 2 2 0 0 0 2-2v-.44a2 2 0 0 0-2-2 2 2 0 0 1-2-2 2 2 0 0 0-2-2 2 2 0 0 1-2-2 2 2 0 0 0-2-2Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
      );
      break;

    case "orbit":
      content = (
        <div
          className={`${containerSize} relative flex items-center justify-center ${className}`}
        >
          <div className={`w-2 h-2 ${primaryBgClass} rounded-full`} />
          <div className="absolute w-full h-full border border-zinc-200 dark:border-zinc-800 rounded-full animate-spin">
            <div
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 ${primaryBgClass} rounded-full`}
            />
          </div>
        </div>
      );
      break;

    case "snake":
      content = (
        <div
          className={`${containerSize} border-2 border-zinc-100 dark:border-zinc-900 relative rounded-md overflow-hidden ${className}`}
        >
          <div
            className={`absolute inset-0 border-2 ${primaryBorderClass} animate-loader-snake`}
          />
        </div>
      );
      break;

    case "infinity":
      content = (
        <div className={`${containerSize} ${primaryColorClass} ${className}`}>
          <svg viewBox="0 0 100 50" className="w-full h-full">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray="10 5"
              className="animate-[loader-shimmer_2s_linear_infinite]"
              d="M25,25 C25,10 40,10 50,25 C60,40 75,40 75,25 C75,10 60,10 50,25 C40,40 25,40 25,25"
            />
          </svg>
        </div>
      );
      break;

    case "text-shimmer":
      content = (
        <div
          className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-400 via-zinc-900 dark:via-zinc-100 to-zinc-400 bg-[length:200%_auto] animate-[loader-shimmer_2s_linear_infinite] ${className}`}
        >
          Loading...
        </div>
      );
      break;

    case "grid":
      content = (
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
      break;

    case "heartbeat":
      content = (
        <div
          className={`${containerSize} ${primaryColorClass} animate-[ping_1.5s_infinite] flex items-center justify-center ${className}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      );
      break;

    case "matrix":
      content = (
        <div
          className={`flex flex-col gap-0.5 overflow-hidden ${containerSize} items-center ${className}`}
        >
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-full h-1 bg-zinc-100 dark:bg-zinc-900 relative"
            >
              <div
                className={`absolute top-0 bottom-0 w-4 ${primaryBgClass} shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
                style={{
                  left: "-20%",
                  animation: `loader-shimmer 2s linear infinite`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            </div>
          ))}
        </div>
      );
      break;

    case "loader-dna":
      content = (
        <div
          className={`flex justify-center items-center h-full gap-1 ${className}`}
        >
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div
                className={`w-2 h-2 ${primaryBgClass} rounded-full animate-bounce`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
              <div
                className="w-2 h-2 bg-zinc-300 dark:bg-zinc-700 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1 + 0.5}s` }}
              />
            </div>
          ))}
        </div>
      );
      break;

    case "floating-bubble":
      content = (
        <div
          className={`relative overflow-hidden ${containerSize} border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/50 ${className}`}
        >
          {[...Array(5)].map((_, i) => {
            const width = [6, 10, 8, 5, 11][i];
            const left = [15, 35, 55, 75, 45][i];
            const duration = [2.5, 3.8, 2.1, 4.5, 3.2][i];
            const delay = [0.2, 1.1, 0.5, 1.8, 0.8][i];
            return (
              <div
                key={i}
                className={`absolute ${primaryBgClass} opacity-30 rounded-full animate-bounce`}
                style={{
                  width: `${width}px`,
                  height: `${width}px`,
                  left: `${left}%`,
                  bottom: "-20%",
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      );
      break;

    case "hex-spin":
      content = (
        <div
          className={`${containerSize} ${primaryColorClass} flex items-center justify-center ${className}`}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full animate-[spin_1.6s_linear_infinite]"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          >
            <polygon
              points="50,10 80,30 80,70 50,90 20,70 20,30"
              className="stroke-current"
            />
          </svg>
        </div>
      );
      break;

    case "concentric-rings":
      content = (
        <div
          className={`relative ${containerSize} flex items-center justify-center ${className}`}
        >
          <div className="absolute inset-0 rounded-full border-2 border-zinc-200 dark:border-zinc-800 animate-ping" />
          <div className="absolute inset-2 rounded-full border-2 border-zinc-300 dark:border-zinc-700 animate-ping [animation-delay:200ms]" />
          <div className="absolute inset-4 rounded-full border-2 border-zinc-400 dark:border-zinc-600 animate-pulse [animation-delay:400ms]" />
        </div>
      );
      break;

    case "dots-rotate":
      content = (
        <div className={`relative ${containerSize} ${className}`}>
          <div className="absolute inset-0 flex items-center justify-center animate-[spin_1.2s_linear_infinite]">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-zinc-900 dark:bg-zinc-50 rounded-full"
                style={{ transform: `rotate(${i * 120}deg) translateY(-40%)` }}
              />
            ))}
          </div>
        </div>
      );
      break;

    case "morphing-hex":
      content = (
        <div className={`${containerSize} ${className}`}>
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          >
            <polygon
              points="50,10 80,30 80,70 50,90 20,70 20,30"
              className="stroke-zinc-900 dark:stroke-zinc-50"
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                animation: "loader-morph-hex 3s ease-in-out infinite",
              }}
            />
          </svg>
        </div>
      );
      break;

    case "ripple-pulse":
      content = (
        <div
          className={`relative ${containerSize} flex items-center justify-center overflow-hidden ${className}`}
        >
          <div className={`absolute w-2 h-2 ${primaryBgClass} rounded-full`} />
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute rounded-full border-2 border-zinc-900 dark:border-zinc-50"
              style={{
                width: `${12 + i * 8}px`,
                height: `${12 + i * 8}px`,
                animation: `loader-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite`,
                animationDelay: `${i * 0.4}s`,
                opacity: 1 - i * 0.3,
              }}
            />
          ))}
        </div>
      );
      break;

    case "orbiting-spheres":
      content = (
        <div className={`${containerSize} ${className}`}>
          <style>{`
            @keyframes loader-rotate {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes loader-orbit-motion {
              0% { transform: translateX(8px) scale(0.73); opacity: 0.65; }
              25% { transform: translateX(0%) scale(0.47); opacity: 0.3; }
              50% { transform: translateX(-8px) scale(0.73); opacity: 0.65; }
              75% { transform: translateX(0%) scale(1); opacity: 1; }
              100% { transform: translateX(8px) scale(0.73); opacity: 0.65; }
            }
          `}</style>
          <div
            className="relative flex items-center justify-center w-full h-full"
            style={{ animation: "loader-rotate 2.5s linear infinite" }}
          >
            {[0, 1].map((i) => (
              <div
                key={i}
                className={`absolute rounded-full ${primaryBgClass}`}
                style={{
                  width: "35%",
                  height: "35%",
                  animation: `loader-orbit-motion 1.5s linear ${i * -0.75}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      );
      break;

    case "paired-revolution":
      content = (
        <div
          className={`${containerSize} relative flex items-center justify-center ${className}`}
        >
          <style>{`
            @keyframes loader-twin-orbit-rotate {
              100% {
                transform: rotate(360deg) translate(155%);
              }
            }
          `}</style>
          <div
            className={`absolute rounded-full ${primaryBgClass}`}
            style={{
              width: "10px",
              height: "10px",
              zIndex: 10,
            }}
          />
          <div className="absolute w-full h-full">
            {[0, 1].map((i) => (
              <div
                key={i}
                className={`absolute rounded-full ${primaryBgClass}`}
                style={{
                  width: "10px",
                  height: "10px",
                  top: "50%",
                  left: "50%",
                  transform: "rotate(0deg) translate(155%)",
                  animation: "loader-twin-orbit-rotate 1.4s ease infinite",
                  animationDelay: `${i * 0.7}s`,
                  marginTop: "-5px",
                  marginLeft: "-5px",
                }}
              />
            ))}
          </div>
        </div>
      );
      break;

    case "eyes-gaze":
      content = (
        <div
          className={`relative flex items-center justify-center gap-4 ${className}`}
        >
          <style>{`
            @keyframes loader-gaze {
              0% { transform: translateX(-6px); }
              25% { transform: translateX(-6px); }
              50% { transform: translateX(6px); }
              75% { transform: translateX(6px); }
              100% { transform: translateX(-6px); }
            }
          `}</style>
          {[0, 1].map((i) => (
            <div
              key={i}
              className="relative w-8 h-8 bg-zinc-900 dark:bg-zinc-50 rounded-full flex items-center justify-center"
            >
              <div
                className="w-3 h-3 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center"
                style={{ animation: "loader-gaze 2s ease-in-out infinite" }}
              >
                <div className="w-2 h-2 bg-zinc-900 dark:bg-zinc-50 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      );
      break;

    case "ripple-wave":
      content = (
        <div
          className={`relative ${containerSize} flex items-center justify-center ${className}`}
        >
          <div
            className={`absolute inset-0 border-4 ${primaryBorderClass} rounded-full animate-ping opacity-75`}
          />
          <div className={`w-3 h-3 ${primaryBgClass} rounded-full`} />
        </div>
      );
      break;

    case "audio-wave":
      content = (
        <div className={`flex items-center gap-1 h-6 ${className}`}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-1 h-full ${primaryBgClass} rounded-full animate-[pulse_1s_ease-in-out_infinite]`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      );
      break;

    case "fading-ring":
      content = (
        <svg
          className={`${containerSize} animate-spin ${className}`}
          viewBox="0 0 32 32"
        >
          <circle
            className="stroke-zinc-900 dark:stroke-zinc-50 fill-none opacity-25"
            cx="16"
            cy="16"
            r="14"
            strokeWidth="3"
          />
          <circle
            className="stroke-zinc-900 dark:stroke-zinc-50 fill-none"
            cx="16"
            cy="16"
            r="14"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="20 60"
          />
        </svg>
      );
      break;

    case "morphing-shape":
      content = (
        <div className={`${containerSize} ${className}`}>
          <style>{`
            @keyframes loader-morph-shape {
              0%, 100% { border-radius: 4px; transform: rotate(0deg); }
              50% { border-radius: 50%; transform: rotate(180deg); }
            }
          `}</style>
          <div
            className={`w-full h-full ${primaryBgClass}`}
            style={{ animation: "loader-morph-shape 2s ease-in-out infinite" }}
          />
        </div>
      );
      break;

    case "dots-chase":
      content = (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 ${primaryBgClass} rounded-full animate-[pulse_1.2s_infinite]`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      );
      break;
  }

  return (
    <>
      {keyframes ? <style>{keyframes}</style> : null}
      {content}
    </>
  );
};