# Romone Dunlop - Resume Website

A modern, accessible, and high-performance personal branding website built with Next.js 16, Tailwind CSS, and TypeScript.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Visit http://localhost:3000
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start

# Or export as static site
npm run build && npx next export
```

## 📋 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Icons**: Lucide React
- **Fonts**: Space Grotesk (headings), Inter (body)

## 🎨 Features

✅ **Modern Design**: Clean, minimal UI with high contrast and ample negative space  
✅ **Fully Responsive**: Mobile-first design optimized for all devices  
✅ **Dark Mode**: Automatic dark mode based on system preferences  
✅ **SEO Optimized**: Meta tags, OpenGraph, Twitter cards, and JSON-LD structured data  
✅ **Accessible**: WCAG AA+ compliant with keyboard navigation and ARIA labels  
✅ **Performance**: Optimized for Lighthouse scores ≥95 across all metrics  
✅ **Download Counter**: Client-side localStorage tracking for resume downloads  
✅ **Contact Form**: Integrated Formspree contact form  

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata & fonts
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles & CSS variables
├── components/
│   ├── sections/           # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Leadership.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Testimonials.tsx
│   │   └── Contact.tsx
│   └── ui/                 # Reusable UI components
│       ├── section.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       └── download-button.tsx
├── lib/
│   ├── data.ts             # Resume data constants
│   └── utils.ts            # Utility functions
public/
└── docs/
    └── Romone_Dunlop_Resume.pdf  # Resume PDF file
```

## 🌐 Deployment

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Import repository on [Vercel](https://vercel.com)
3. Configure build settings (Next.js preset auto-detected)
4. Deploy

**CLI Deployment:**
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Option 2: Netlify

1. Push code to GitHub
2. Import repository on [Netlify](https://netlify.com)
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

### Option 3: Static Export (GitHub Pages, etc.)

```bash
# Add to next.config.ts:
# output: 'export'

npm run build
# Deploy the `out/` folder to any static host
```

### Custom Domain Setup

1. Add domain in hosting provider dashboard
2. Update DNS records (A/CNAME)
3. Update `siteUrl` in `src/app/layout.tsx`

## ✅ Content TODOs

Before going live, complete these tasks:

- [ ] Replace placeholder PDF with actual resume at `public/docs/Romone_Dunlop_Resume.pdf`
- [ ] Update site URL in `src/app/layout.tsx` (line 15)
- [ ] Create Open Graph image at `public/og-image.png` (1200×630px)
- [ ] Add LinkedIn/social profiles to JSON-LD schema (layout.tsx, line 91)
- [ ] Replace placeholder testimonial quotes in `src/components/sections/Testimonials.tsx`
- [ ] Update Formspree endpoint in `src/components/sections/Contact.tsx` (line 47)
- [ ] Test contact form submission
- [ ] Run Lighthouse audit and optimize if needed

## 🧪 QA Checklist

### Accessibility
- [ ] Tab through all interactive elements (buttons, links, form inputs)
- [ ] Verify focus indicators are visible
- [ ] Test with screen reader (NVDA/JAWS)
- [ ] Check color contrast with browser DevTools
- [ ] Verify all images have alt text

### Responsiveness
- [ ] Test on mobile (375px - iPhone SE)
- [ ] Test on tablet (768px - iPad)
- [ ] Test on desktop (1920px)
- [ ] Test landscape/portrait orientations

### Functionality
- [ ] Download resume button works
- [ ] Download counter increments (check localStorage)
- [ ] Contact form validates inputs
- [ ] All anchor links scroll smoothly to sections
- [ ] mailto/tel links open correctly
- [ ] Dark mode toggles properly

### Performance (Lighthouse)
```bash
# Build and run production server
npm run build && npm start

# Open Chrome DevTools → Lighthouse
# Select: Performance, Accessibility, Best Practices, SEO
# Device: Mobile (throttled)
# Target: All scores ≥95
```

## 🎯 Brand Guidelines

**Colors:**
- Background: `#0F1115` (dark) / `#FFFFFF` (light)
- Foreground: `#FFFFFF` (dark) / `#0F1115` (light)
- Accent: `#3B82F6` (Blue)
- Divider: `#374151` (dark) / `#E5E7EB` (light)

**Typography:**
- Headings: Space Grotesk (Bold, 700)
- Body: Inter (Regular/Medium, 400/500)

**Design Principles:**
- Modern & minimal
- High contrast
- Ample negative space
- Mobile-first responsive
- Performance-focused

## 📄 License

© 2024 Romone Dunlop. All rights reserved.

---

**Built with ❤️ by Romone Dunlop**
