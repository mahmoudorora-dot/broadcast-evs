# Broadcast EVS - Project Context

## Project Overview

**Broadcast EVS** is a professional portfolio website for Mahmoud Fathy Orabi, an EVS Operator and Broadcast Technician with 8+ years of experience in live sports production, EVS replay systems, and outside broadcast operations in the UAE.

### Tech Stack

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.19
- **Package Manager**: Bun
- **UI Library**: shadcn/ui (Radix UI components)
- **Styling**: Tailwind CSS 3.4.17 with custom theme
- **Routing**: React Router DOM 6.30.1
- **State Management**: TanStack React Query 5.83.0
- **Forms**: React Hook Form 7.61.1 with Zod validation
- **Animations**: Framer Motion 12.35.1
- **Testing**: Vitest 3.2.4 with Testing Library

### Architecture

Single-page application (SPA) with a component-based architecture:

```
src/
├── components/       # Reusable UI components
│   ├── ui/          # shadcn/ui base components
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── SkillsSection.tsx
│   ├── ExperienceSection.tsx
│   ├── GallerySection.tsx
│   ├── EventsSection.tsx
│   ├── ContactSection.tsx
│   └── ...
├── pages/           # Route pages
│   ├── Index.tsx    # Main landing page
│   └── NotFound.tsx # 404 page
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
└── assets/          # Static assets
```

## Building and Running

### Prerequisites

- Node.js (v18+) or Bun installed
- Git for version control

### Development

```bash
# Install dependencies
bun install

# Start development server (localhost:8080)
bun run dev

# Build for production
bun run build

# Build for development mode
bun run build:dev

# Preview production build
bun run preview

# Run tests
bun run test

# Run tests in watch mode
bun run test:watch

# Lint code
bun run lint
```

### Vite Server Configuration

- Port: 8080
- Host: `::` (accessible from network)
- HMR overlay: disabled

## Deployment

### GitHub Pages (Primary)

The project is configured for automatic deployment to GitHub Pages via GitHub Actions.

**Deployment Workflow** (`.github/workflow/deploy.yml`):
- Triggers on push to `main` branch
- Uses Bun for dependency management
- Builds the project to `dist/` directory
- Copies `CNAME` file for custom domain
- Creates `404.html` for SPA routing
- Deploys via `actions/deploy-pages@v4`

**Custom Domain**: `www.orabi.media`

**DNS Configuration** (A Records):
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### Manual Deployment

```bash
# Build
bun run build

# Copy CNAME (for custom domain)
cp CNAME dist/CNAME

# Create 404 page for SPA
cp dist/index.html dist/404.html

# Deploy dist/ folder
```

## Development Conventions

### Code Style

- **TypeScript**: Strict mode partially disabled (`noImplicitAny: false`, `noUnusedLocals: false`)
- **Path Aliases**: `@/*` resolves to `./src/*`
- **Component Naming**: PascalCase for components (e.g., `HeroSection.tsx`)
- **File Extensions**: `.tsx` for React components, `.ts` for utilities

### Component Structure

Components follow a consistent pattern:
- Import UI components from `@/components/ui`
- Use Tailwind CSS for styling with `cn()` utility for class merging
- Export default component function

### Testing

- **Framework**: Vitest with jsdom environment
- **Testing Library**: `@testing-library/react` and `@testing-library/jest-dom`
- Test files should be placed in `src/test/` or alongside components as `*.test.tsx`

### Commit Conventions

Follow conventional commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Build/config changes

## Key Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite build configuration, path aliases |
| `tailwind.config.ts` | Tailwind CSS theme customization |
| `tsconfig.json` | TypeScript compiler options |
| `components.json` | shadcn/ui configuration |
| `eslint.config.js` | ESLint rules |
| `netlify.toml` | Netlify deployment config (alternative) |
| `.github/workflow/deploy.yml` | GitHub Actions CI/CD |

## UI Components (shadcn/ui)

Available component library includes:
- Accordion, Alert Dialog, Aspect Ratio, Avatar
- Button, Card, Checkbox, Collapsible
- Dialog, Dropdown Menu, Form, Input
- Navigation Menu, Popover, Progress, Radio Group
- Select, Separator, Slider, Switch, Tabs
- Toast, Tooltip, and more

All components are located in `src/components/ui/`.

## Custom Theme

### Fonts
- **Display**: Rajdhani (headings, titles)
- **Body**: Inter (body text)

### Custom Colors
- `silver` - Custom silver theme color
- `live` - Live indicator color
- CSS variables for light/dark mode support

### Custom Animations
- `pulse-glow` - Pulsing glow effect
- `slide-up` - Slide up fade animation
- `marquee` - Infinite horizontal scroll

## Content Structure

The main landing page (`Index.tsx`) includes:
1. Navbar - Navigation header
2. HeroSection - Introduction/hero area
3. SkillsTicker - Scrolling skills display
4. AboutSection - About the author
5. ShowreelSection - Video showcase
6. FilmStripSlider - Image gallery slider
7. GallerySection - Photo gallery
8. EventsSection - Events coverage
9. ExperienceSection - Work history
10. SkillsSection - Detailed skills
11. EducationSection - Education background
12. ContactSection - Contact form/info
13. Footer - Site footer

## Notes

- The project uses a single-page routing structure with a catch-all 404 route
- Social media meta tags are configured for OpenGraph and Twitter cards
- The build output uses hashed filenames for cache busting
- SPA routing requires `404.html` to be a copy of `index.html` for client-side routing
