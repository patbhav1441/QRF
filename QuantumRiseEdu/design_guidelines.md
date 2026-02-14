# Quantum Rise Foundation Design Guidelines

## Design Approach
**Reference-Based Hybrid:** Drawing inspiration from IBM Quantum's educational clarity, Khan Academy's approachable learning design, and Stripe's clean technical aesthetic. This creates a professional yet accessible nonprofit identity that balances scientific credibility with student engagement.

## Core Design Principles
1. **Accessible Complexity:** Make quantum concepts feel approachable through clear hierarchy and generous whitespace
2. **Mission-First:** Every section reinforces the dual education/implementation mission
3. **Student-Centric:** Design for engagement and inspiration, not corporate formality
4. **Technical Credibility:** Clean, modern aesthetic that reflects cutting-edge technology

---

## Typography System

**Font Stack:**
- **Headings:** Inter (700, 600) - Clean, technical, highly readable
- **Body:** Inter (400, 500) - Consistent font family for cohesive feel
- **Accents:** JetBrains Mono (500) for code snippets or technical callouts

**Type Scale:**
- Hero: text-6xl to text-7xl (bold, commanding presence)
- Section Headers: text-4xl to text-5xl
- Subsections: text-2xl to text-3xl
- Body: text-base to text-lg (generous line-height of 1.7-1.8)
- Captions: text-sm

---

## Layout & Spacing System

**Tailwind Spacing Primitives:** Use units of **4, 8, 12, 16, 20, 24** for consistent rhythm
- Component padding: p-8, p-12
- Section spacing: py-16, py-20, py-24
- Grid gaps: gap-8, gap-12
- Container max-width: max-w-7xl with px-4 to px-8

**Grid Strategy:**
- Homepage features: 3-column grid (lg:grid-cols-3, md:grid-cols-2, base: grid-cols-1)
- Project categories: 2-column cards (lg:grid-cols-2)
- Mission areas: Staggered layout with alternating image/text blocks

---

## Images

**Hero Section:**
Large, inspiring hero image showing students engaged with technology (quantum visualizations, AI interfaces, or collaborative learning). Image should span full-width with subtle gradient overlay for text readability. Minimum height: 70vh on desktop.

**Project Showcase:**
Category-specific imagery for each of the five focus areas:
1. Environmental: Sensor devices, environmental monitoring
2. Health: Medical technology, molecular visualization
3. Finance: Data visualizations, quantum circuits
4. AI/Cyber: Neural networks, encryption concepts
5. Mechatronics: Raspberry Pi setups, robotics projects

**About/Mission:**
Split-screen layout with team/student imagery on one side, mission statement on other

---

## Component Library

**Navigation:**
- Sticky header with transparent-to-solid transition on scroll
- Logo left, navigation center, "Get Involved" CTA button right
- Mobile: Hamburger menu with slide-in drawer

**Hero Section:**
- Full-width background image with gradient overlay
- Centered content: Large heading + 2-3 sentence mission statement + dual CTAs ("Explore Projects" + "Join Us")
- Buttons with backdrop-blur-sm for clarity over image

**Mission Statement Section:**
- Two-column layout: Large mission text left, supporting statistics/impact metrics right
- Use of large pull-quotes (text-3xl) to highlight key mission points

**Five Focus Areas Grid:**
- Card-based layout with icon/graphic at top
- Title, brief description, "Learn More" link
- Hover state: subtle lift effect (transform scale)

**Project Showcase:**
- Filterable grid by category
- Each project card: Image thumbnail, category badge, title, 2-3 line description, tech stack tags
- Modal or dedicated page for full project details

**Get Involved Section:**
- Three-column layout: Students, Educators, Partners
- Each with dedicated CTA and pathway description
- Form integration for newsletter/volunteer signup

**Footer:**
- Multi-column: Mission recap, Quick Links, Contact Info, Social Media
- Newsletter signup module
- "Registered 501(c)(3) Nonprofit" trust badge

---

## Page-Specific Layouts

**Homepage Structure:**
1. Hero (70vh with image)
2. Mission Statement (split layout)
3. Five Focus Areas (3-col grid)
4. Featured Projects (carousel or grid of 6)
5. Impact Metrics (4-col stats)
6. Get Involved (3-col CTAs)
7. Footer

**Projects Page:**
- Category filter navigation (sticky)
- Masonry or uniform grid of project cards
- Sidebar with category descriptions

**About Page:**
- Story narrative with timeline or milestone markers
- Team section (if applicable)
- Partnership/collaboration mentions

---

## Interaction Patterns

**Minimal, Purposeful Animation:**
- Fade-up on scroll for section reveals (once, subtle)
- Smooth scroll for anchor links
- Card hover states: subtle shadow and lift
- NO quantum particle effects or distracting tech animations
- Form validation: inline, clear error states

**Accessibility:**
- ARIA labels on all interactive elements
- Keyboard navigation for all CTAs and forms
- Focus indicators: visible outline with appropriate contrast
- Form inputs: consistent styling, clear labels, helpful placeholder text

---

## Content Density

**Balance Information with Breathing Room:**
- Hero and mission sections: Generous whitespace (py-24)
- Content sections: Moderate spacing (py-16)
- Cards and components: Comfortable internal padding (p-8)
- Avoid cramming - better to add scroll depth than compress vertically

**Multi-Column Strategy:**
- Use for feature comparison, focus area showcases, footer organization
- Avoid for long-form educational content (keep single column with max-w-prose)
- Always collapse to single column on mobile

This design creates a professional, trustworthy nonprofit presence while maintaining the excitement and innovation of quantum computing and AI education. The layout guides students through mission, projects, and engagement pathways with clarity and inspiration.