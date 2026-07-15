# Vithal Vision – Corporate Website

A premium, cinematic-themed corporate website for **Vithal Visions Private Limited** built with Next.js 15, TypeScript, and Tailwind CSS.

## 🎬 Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (icons)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm / yarn / pnpm

### Installation

```bash
# Clone or extract the project
cd vithal-vision

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## 📁 Folder Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Navbar + Footer
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── about/
│   │   └── page.tsx        # About page
│   └── contact/
│       └── page.tsx        # Contact page
├── components/
│   ├── shared/
│   │   ├── Navbar.tsx      # Sticky responsive navigation
│   │   └── Footer.tsx      # Footer with links & social
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── AboutPreview.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── CTASection.tsx
│   ├── about/
│   │   ├── AboutHero.tsx
│   │   ├── CompanyIntro.tsx
│   │   ├── MissionVisionValues.tsx
│   │   ├── FoundersSection.tsx
│   │   └── JourneyTimeline.tsx
│   └── contact/
│       ├── ContactHero.tsx
│       ├── ContactForm.tsx
│       └── InquiryTypes.tsx
└── data/
    └── index.ts            # Static data (services, projects, founders, etc.)
```

## 🎨 Design System

| Token | Value |
|-------|-------|
| Gold | `#C9A84C` |
| Gold Light | `#E2C06C` |
| Gold Dark | `#A07830` |
| Dark BG | `#0A0A0A` |
| Card BG | `#111111` |
| Border | `#1E1E1E` |

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Home – Hero, About Preview, Services, Projects, CTA |
| `/about` | About – Story, Mission/Vision, Founders, Timeline |
| `/contact` | Contact – Info, Form, Inquiry Types |

## 🔧 Customization

- Update company info in `src/data/index.ts`
- Replace Unsplash images with real production photos in `public/images/`
- Update social links and contact details in the data file
- Add more pages following the existing component patterns

## 📦 Deployment

Deployable to **Vercel**, **Netlify**, or any Node.js host:

```bash
npm run build
```

---

© 2025 Vithal Visions Private Limited. All Rights Reserved.
