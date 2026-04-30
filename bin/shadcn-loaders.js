#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const command = args[0];
const target = args[1];

const helpText = `
Usage:
  shadcn-loaders add loader

Examples:
  npx shadcn-loaders@latest add loader
`.trim();

const loaderTemplate = `import * as React from "react";

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

  if (command !== "add" || target !== "loader") {
    console.error("Unknown command.");
    console.log(helpText);
    process.exit(1);
  }

  const destination = path.join(process.cwd(), "components", "ui", "loader.tsx");
  const destinationDir = path.dirname(destination);

  fs.mkdirSync(destinationDir, { recursive: true });

  if (fs.existsSync(destination)) {
    console.log("`components/ui/loader.tsx` already exists. Skipping.");
    process.exit(0);
  }

  fs.writeFileSync(destination, loaderTemplate, "utf8");
  console.log("Added `components/ui/loader.tsx` successfully.");
}

run();
