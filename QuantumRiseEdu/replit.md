# Quantum Rise Foundation Website

## Overview
A modern nonprofit website for Quantum Rise Foundation, a 501(c)(3) organization dedicated to educating students on Quantum Computing and AI, then implementing that knowledge to solve real-world challenges.

**Domain:** quantumrisefoundation.org

## Current State
- **Status:** MVP Complete
- **Last Updated:** December 2024
- **Stack:** React + Express + TypeScript

## Dual Mission
1. **Education:** Teaching students about Quantum Computing and Artificial Intelligence
2. **Implementation:** Applying knowledge across five focus areas:
   - Environmental Sustainability & Climate
   - Health, Medicine & Biology
   - Finance & Economics
   - AI & ML + Cybersecurity
   - Mechatronics & SBCs (Raspberry Pi, Arduino)

## Project Architecture

### Frontend (`/client`)
- **Framework:** React with TypeScript
- **Routing:** Wouter
- **Styling:** Tailwind CSS with Shadcn UI components
- **State Management:** TanStack Query for server state
- **Forms:** React Hook Form with Zod validation

### Backend (`/server`)
- **Framework:** Express.js
- **Storage:** In-memory storage (MemStorage)
- **API Endpoints:**
  - `POST /api/contact` - Contact form submissions
  - `POST /api/newsletter` - Newsletter subscriptions
  - `GET /api/contacts` - List all contacts (admin)
  - `GET /api/newsletters` - List all subscribers (admin)

### Shared (`/shared`)
- **Schema:** Drizzle ORM schemas with Zod validation
- **Types:** TypeScript interfaces for Contact, Newsletter, FocusArea

## Key Components

### Pages
- `Home` - Main landing page with all sections

### Components
- `Navigation` - Sticky header with theme toggle
- `HeroSection` - Full-width hero with quantum-themed background
- `MissionSection` - Dual mission pillars with metrics
- `FocusAreasSection` - Five focus areas with icons
- `ProjectsSection` - Filterable project showcase
- `ResourcesSection` - Educational resource links
- `GetInvolvedSection` - Contact form with role selection
- `Footer` - Newsletter signup and quick links
- `ThemeToggle` - Light/dark mode toggle

## Design System
- **Primary Color:** Purple/Violet (hue 265)
- **Font Family:** Inter (sans-serif), JetBrains Mono (code)
- **Theme:** Light/dark mode support
- **Style:** Modern, clean, professional nonprofit aesthetic

## User Preferences
- Clean, accessible design
- Quantum-inspired color scheme
- Focus on education and implementation
- Georgia-based nonprofit with potential USG expansion

## Development

### Running Locally
```bash
npm run dev
```

### Build
```bash
npm run build
```

## Future Enhancements
- Blog/news section for project updates
- Donation system integration
- Student portal for project collaboration
- Event calendar for workshops
- Email newsletter integration with service provider
- Chapter pages for other USG institutions (UGA, Georgia Tech)
