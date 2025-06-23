# JVS Vision - Photography Portfolio

A minimalist photography portfolio website aligned with the aesthetic of jorgevs.com and jvsvault.dev.

## Features

- **Minimalist Design**: Clean, focused presentation of photographic work
- **Responsive Grid Gallery**: Adapts from mobile to large displays
- **Lightbox Viewer**: Full-screen image viewing with keyboard navigation
- **Smooth Animations**: Subtle fade-ins and hover effects
- **Grayscale-to-Color Effect**: Images transition from B&W to color on hover

## Development

Run the development server:
```bash
node dev-server.js
```

The site will be available at `http://localhost:8081`

## Structure

```
jvs.vision/
├── index.html              # Main HTML
├── assets/
│   ├── css/
│   │   └── main.css       # All styles
│   ├── js/
│   │   └── main.js        # Navigation, gallery, lightbox
│   └── gallery/           # Photography collection
│       └── *.jpg/JPG      # Image files
└── dev-server.js          # Development server
```

## Design Principles

1. **Typography**: Inter font for clean, modern look
2. **Color Palette**: Monochrome with white text on black background
3. **Navigation**: Fixed header that hides on scroll down
4. **Grid Layout**: Responsive with 2px gaps, creating a film contact sheet aesthetic
5. **Interactions**: Subtle hover effects and smooth transitions

## Adding Images

Place new images in `/assets/gallery/` and add the filename to the `galleryImages` array in `main.js`.

## Customization

- Colors: Edit CSS custom properties in `:root`
- Grid sizing: Adjust `grid-template-columns` media queries
- Animations: Modify transition timings and effects