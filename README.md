# Shadcn Loaders

A collection of 42 pure-CSS React loaders and spinners. Zero dependencies, sub-1KB each, fully customizable with Tailwind CSS.

## Landing Page

![Shadcn Loaders Landing Page](./public/image.png)

## Features

- **42 loaders** across 6 categories: Spinners, Dots, Bars, Rings, Shapes, Other
- **Zero dependencies** — pure CSS, no runtime cost
- **Sub-1KB** per component
- **Accessible** — `role="status"` and `prefers-reduced-motion` on all variants
- **Tailwind CSS** customizable — color, speed, size via utility classes
- **One CLI command per component** — installs directly to `components/ui`

## NPM Package

- npm: [https://www.npmjs.com/package/shadcn-loaders](https://www.npmjs.com/package/shadcn-loaders)

## Installation

Install any loader individually with the shadcn CLI:

```bash
npx shadcn add @shadcnloaders/classic-spinner
npx shadcn add @shadcnloaders/dots-pulse
npx shadcn add @shadcnloaders/wave-loader
```

Replace the variant name with any of the 42 available loaders.

## shadcn Registry

This package exposes a shadcn-compatible registry entry for direct use with the shadcn CLI:

```json
{
  "name": "@shadcnloaders",
  "homepage": "https://shadcnloaders.com",
  "url": "https://shadcnloaders.com/r/{name}.json",
  "description": "42 pure-CSS animated loaders and loading states.",
  "logo": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='24' height='24' rx='6' fill='#0f172a'/><circle cx='12' cy='12' r='5' fill='#f59e0b'/><circle cx='12' cy='12' r='2.2' fill='#ffffff'/></svg>"
}
```

Registry files are available at:
- [registry.json](registry.json)
- [loader.json](loader.json)
- [registry/loader.tsx](registry/loader.tsx)

## License

This project is licensed under the MIT License.

## Author

Created by [Sammed-Chougule](https://github.com/Sammed-Chougule).
