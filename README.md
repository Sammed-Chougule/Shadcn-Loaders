# Shadcn Loaders

A premium collection of open-source React loader components built with **Tailwind CSS** and **Framer Motion**. Designed to integrate seamlessly with your **Shadcn UI** project.

## 🚀 How it Works

This library follows the "copy-paste" philosophy of Shadcn UI. Instead of installing a heavy npm package, you own the code. You can either use our CLI to inject the component or copy it manually.

### 1. CLI Installation (Recommended)
Add a loader to your project with a single command:

```bash
npx shadcn-loaders@latest add [loader-name]
```

This will:
- Check for required dependencies (framer-motion, lucide-react).
- Create a `components/loaders/` directory if it doesn't exist.
- Inject the raw source code of the loader into your project.

### 2. Manual Installation
1. Browse the [Loader Gallery](https://shadcn-loaders.vercel.app).
2. Copy the source code.
3. Paste it into your local components folder.

## ✨ Features

- **Tailwind Driven**: Fully customizable using standard Tailwind classes.
- **Accessible**: Built with proper ARIA labels and roles.
- **Lightweight**: Zero-runtime overhead beyond the initial animation library.
- **Type Safe**: Written in TypeScript for the best developer experience.

## 🛠️ Tech Stack

- **React** (Next.js compatible)
- **Tailwind CSS**
- **Framer Motion** (for smooth animations)
- **Lucide React** (for icons)

## 📖 Usage

Once installed, you can use the loader like any other React component:

```tsx
import { WaveLoader } from "@/components/loaders/wave-loader"

export default function LoadingState() {
  return (
    <div className="flex items-center justify-center h-screen">
      <WaveLoader size="lg" color="primary" />
    </div>
  )
}
```

---
Created by [Sammed-Chougule](https://github.com/Sammed-Chougule). Building beautiful web experiences with precision.
