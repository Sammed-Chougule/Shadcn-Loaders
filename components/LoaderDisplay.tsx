import React from "react";
import { Loader, type LoaderVariant } from "../registry/loader.tsx";
import type { LoaderProps } from "../types";

export const LoaderDisplay = React.memo(function LoaderDisplay({
  variant,
  size = "md",
  className = "",
  color,
}: LoaderProps & { variant: LoaderVariant; color?: string }) {
  // The color prop is accepted for API compatibility. The canonical
  // Loader component in registry/loader.tsx drives color via Tailwind
  // classes (text-zinc-900 dark:text-zinc-50 etc.). Pass an optional
  // color override through className when provided.
  const finalClassName = color
    ? `${className} text-${color}-500 dark:text-${color}-400`
    : className;

  return <Loader variant={variant} size={size} className={finalClassName} />;
});
