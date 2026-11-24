#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const command = args[0];
const target = args[1];

const AVAILABLE_VARIANTS = [
  "classic-spinner", "dots-pulse", "pulse-ring", "bars", "square-spin",
  "double-bounce", "circular-progress", "wave-loader", "skeleton", "glow-pulse",
  "clock", "hourglass", "gear", "orbit", "snake", "infinity", "text-shimmer",
  "grid", "heartbeat", "floating-bubble", "matrix", "loader-dna", "hex-spin",
  "concentric-rings", "dots-rotate", "morphing-hex", "ripple-pulse",
  "orbiting-spheres", "paired-revolution", "eyes-gaze", "ripple-wave",
  "audio-wave", "fading-ring", "morphing-shape", "dots-chase", "atom",
  "solar-system", "radar-sweep", "blocks-wave", "coffee-cup", "progress-slider",
  "flower-spin", "bouncing-ball", "walking-steps", "corner-chase",
  "newtons-cradle", "comet-trail", "liquid-fill", "battery-charge", "domino-fall",
];

const helpText = `
Usage:
  shadcn-loaders add <variant>

Examples:
  npx shadcn-loaders add classic-spinner
  npx shadcn-loaders add dots-pulse

Available variants: ${AVAILABLE_VARIANTS.join(", ")}.

Or install via the shadcn registry:
  npx shadcn add @shadcnloaders/loader
`.trim();

// Minimal self-contained component template for common variants.
// Complex variants (SVG paths, keyframes) are best installed via the shadcn registry.
const loaderTemplate = (variant) => `import * as React from "react";

type LoaderProps = {
  className?: string;
};

export function Loader({ className = "" }: LoaderProps) {
  return (
    <div className={\`flex items-center gap-2 \${className}\`}>
      <span className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-current" />
    </div>
  );
}
`;

function run() {
  if (!command || command === "--help" || command === "-h") {
    console.log(helpText);
    process.exit(0);
  }

  if (command !== "add") {
    console.error("Unknown command.");
    console.log(helpText);
    process.exit(1);
  }

  if (!target) {
    console.error("Please specify a loader variant.");
    console.log(helpText);
    process.exit(1);
  }

  const variant = target.replace(/^@shadcnloaders\//, "");

  if (!AVAILABLE_VARIANTS.includes(variant)) {
    console.error(`Unknown variant "${target}".`);
    console.log(helpText);
    process.exit(1);
  }

  const destination = path.join(process.cwd(), "components", "ui", `${variant}.tsx`);
  const destinationDir = path.dirname(destination);

  fs.mkdirSync(destinationDir, { recursive: true });

  if (fs.existsSync(destination)) {
    console.log("`\`components/ui/${variant}.tsx\` already exists. Skipping.");
    process.exit(0);
  }

  fs.writeFileSync(destination, loaderTemplate(variant), "utf8");
  console.log("Added `\`components/ui/${variant}.tsx\` successfully.");
  console.log("");
  console.log("Usage:");
  console.log(`  import { Loader } from "@/components/ui/${variant}";`);
  console.log(`  <Loader />`);
}

run();
