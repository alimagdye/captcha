# Circular Rotation Puzzle CAPTCHA Component

A standalone, production-quality rotation CAPTCHA puzzle component that closely matches the visual appearance, DOM structure, dimensions, and interaction of modern circular verification dialogs.

## Features

- **Pixel-Accurate Visual Design**: Matches the reference screenshot with dark background (`#24252a`), 380px desktop width, rounded corners, drop shadows, and dark overlay.
- **Concentric Circular Masking**:
  - **Outer Ring**: Completely static; never rotates.
  - **Inner Circle**: Rotates smoothly around its exact center.
  - Seamless alignment upon reaching the target angle.
- **Accurate Mathematics**:
  - Randomized initial starting rotations.
  - Angular wrap-around handling (e.g. 359° and 1° are 2° apart).
  - Configurable tolerance (default: 3°).
- **Custom Accessible Slider**:
  - Dark capsule track with light-colored right-arrow draggable thumb.
  - Pointer Events (`pointerdown`, `pointermove`, `pointerup`) with `setPointerCapture` for smooth dragging across desktop, mobile, and tablets.
  - `touch-action: none` to prevent accidental mobile viewport scrolling.
  - Keyboard accessibility (Arrow keys, PageUp/PageDown, Home, End, Enter, Space, Escape).
  - ARIA attributes: `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-label`.
- **Exact Required DOM Structure & Classes**:
  - `TUXModal`, `captcha-verify-container`, `captcha-verify-container-main-page`
  - `captcha_close_button`, `TUXButton`, `TUXButton--borderless`, `TUXButton--xsmall`, `TUXButton--secondary`
  - Utility classes preserved: `cap-flex`, `cap-py-4`, `cap-px-12`, `sm:cap-px-16`, `sm:cap-py-12`, `cap-flex-col`, `cap-justify-between`, `cap-h-full`, `sm:cap-w-[380px]`
- **100% Self-Contained**:
  - Includes offline vector still-life, landscape, and architectural puzzle assets.
  - Zero external network requests or third-party CAPTCHA integrations.

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Server
Start the local interactive demo server:
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Run Automated Tests
```bash
npm test
```

### 4. Build for Production
```bash
npm run build
```
Outputs UMD and ESM bundles in the `dist/` directory.

---

## Programmatic Usage

```typescript
import { createCaptcha } from './src/index';

// Launch the CAPTCHA modal
const captcha = createCaptcha({
  tolerance: 3, // Allowed angular error in degrees
  autoCloseDelay: 280, // Delay in ms before modal closes after solving
  instructionText: 'Drag the slider to fit the puzzle',
  onSuccess: ({ puzzleId, rotation, timeTakenMs }) => {
    console.log(`Solved puzzle ${puzzleId} in ${timeTakenMs}ms`);
  },
  onFail: (difference) => {
    console.log(`Off target by ${difference} degrees`);
  },
  onRefresh: (newState) => {
    console.log('Puzzle refreshed with initial rotation:', newState.initialRotation);
  },
  onClose: () => {
    console.log('User closed modal');
  }
});
```

### API Methods

```typescript
// Read current state
const state = captcha.getState();

// Manually update rotation in degrees
captcha.setRotation(45);

// Manually set slider position (0 - 100)
captcha.setSliderProgress(50);

// Check current solution
const isSolved = captcha.checkSolution();

// Regenerate puzzle with new random rotation
await captcha.resetCaptcha();

// Dismiss modal
captcha.closeCaptcha();
```

---

## File Structure

```
captcha/
├── index.html            # Interactive testbed demo page
├── package.json          # Node package configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite build & Vitest test configuration
├── src/
│   ├── index.ts          # Main library export
│   ├── captcha.ts        # Modal DOM creation, event handlers, and lifecycle
│   ├── types.ts          # State and options TypeScript definitions
│   ├── math.ts           # Angle normalization, wrap-around differences, tolerances
│   ├── canvas.ts         # High-DPI canvas clipping, rotation, and composition
│   ├── slider.ts         # Accessible Pointer/Touch/Keyboard slider
│   ├── images.ts         # Offline vector puzzle presets & image loader
│   ├── styles.css        # CSS matching reference screenshot layout and classes
│   └── css.d.ts          # TypeScript CSS module declarations
└── test/
    ├── math.test.ts      # Unit tests for angle math and boundary wrap-around
    ├── captcha.test.ts   # Tests for DOM structure, IDs, ARIA, and solving
    └── slider.test.ts    # Tests for slider keyboard and pointer interactions
```
