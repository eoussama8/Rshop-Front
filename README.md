# 🛍️ Rshop — Project Architecture

## Folder Structure

```
src/
├── App.jsx                        # Root entry point
├── styles/
│   └── globals.css                # CSS variables, resets, keyframes
├── data/
│   └── constants.js               # All static data (nav links, products, chips, stats)
├── components/
│   ├── navbar/
│   │   ├── Navbar.jsx             # Main navbar — assembles all sub-parts
│   │   ├── Logo.jsx               # Rshop animated logo
│   │   ├── NavLinks.jsx           # Desktop links + Categories dropdown
│   │   ├── SearchBar.jsx          # Search input with icon
│   │   ├── NavActions.jsx         # Cart button + Sign in / Sign up
│   │   └── MobileMenu.jsx         # Hamburger icon + slide-down mobile menu
│   ├── hero/
│   │   ├── Starfield.jsx          # 3-layer animated star background
│   │   └── HeroContent.jsx        # Badge, title, chips, CTAs, stats, scroll cue
│   └── ui/
│       ├── ProductCard.jsx        # Reusable product card
│       └── WaveDivider.jsx        # SVG wave between dark/light sections
└── pages/
    └── HomePage.jsx               # Home page — composes all components

```

## Component Responsibilities

| File | Responsibility |
|---|---|
| `App.jsx` | Imports global CSS, renders the active page |
| `globals.css` | CSS custom properties, resets, shared keyframes |
| `constants.js` | Single source of truth for all static data |
| `Navbar.jsx` | Scroll state, mobile toggle state, assembles sub-components |
| `Logo.jsx` | Brand mark with floating "R" animation |
| `NavLinks.jsx` | Desktop nav links + dropdown with its own open/close state |
| `SearchBar.jsx` | Expanding search input |
| `NavActions.jsx` | Cart badge, Sign in, Sign up buttons |
| `MobileMenu.jsx` | Hamburger button + full-width slide-down menu |
| `Starfield.jsx` | Pure CSS animated star layers |
| `HeroContent.jsx` | All hero text, chips, CTAs, and stats |
| `ProductCard.jsx` | Reusable card, accepts `product` + `onAddToCart` props |
| `WaveDivider.jsx` | SVG wave, accepts `fromColor` prop |
| `HomePage.jsx` | Page layout, cart state, passes props down |

## Adding a New Page

1. Create `src/pages/NewPage.jsx`
2. Import the components you need
3. Add a route in `App.jsx` (e.g. with React Router)

## Adding a New Component

- **UI primitives** → `src/components/ui/`
- **Section-specific** → `src/components/<section-name>/`
- **Data** → add to `src/data/constants.js`
