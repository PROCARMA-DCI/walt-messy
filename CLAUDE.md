# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture Overview

This is a **Next.js 16** application using the **App Router** architecture with the following stack:
- **React 19.2** - Latest React with improved Server Components
- **TypeScript 5** - Full type safety across the application
- **Tailwind CSS 4** - Utility-first CSS framework (latest version)
- **ESLint 9** - Flat config format with Next.js presets

### Key Architectural Patterns

**App Router (app/ directory)**
- File-based routing system where folders define routes
- `layout.tsx` - Root layout wrapping all pages, includes font configuration (Geist Sans, Geist Mono)
- `page.tsx` - Route pages are Server Components by default
- `globals.css` - Global Tailwind styles

**Import Aliases**
- `@/*` maps to root directory (configured in tsconfig.json:22)
- Example: `import { Component } from "@/app/components/Component"`

**Font Optimization**
- Uses `next/font` with Geist font family (app/layout.tsx:5-13)
- Fonts are automatically optimized and loaded via CSS variables

**Image Optimization**
- Use `next/image` component for automatic image optimization (see app/page.tsx:1,7-14)
- Images in `/public` are served from root path

**Styling**
- Tailwind CSS with dark mode support using `dark:` prefix
- CSS variables for theming via font classes

## Project Structure

```
app/
  ├── layout.tsx      # Root layout with metadata and fonts
  ├── page.tsx        # Home page (route: /)
  ├── globals.css     # Global Tailwind styles
  └── favicon.ico     # Site favicon

public/               # Static assets (served from /)

next.config.ts        # Next.js configuration
tsconfig.json         # TypeScript configuration
eslint.config.mjs     # ESLint flat config (v9 format)
tailwind.config.ts    # Tailwind configuration
postcss.config.mjs    # PostCSS configuration for Tailwind
```

## Server vs Client Components

- **Default**: All components in `app/` are Server Components
- **Client Components**: Add `"use client"` directive at top of file for interactivity
- Server Components can fetch data directly and don't ship JavaScript to client

## Creating New Routes

To add a new route:
1. Create a folder in `app/` with the route name (e.g., `app/about/`)
2. Add `page.tsx` in that folder
3. Route is automatically available at `/about`

For dynamic routes: use `[param]` folder naming (e.g., `app/blog/[slug]/page.tsx`)
