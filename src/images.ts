/**
 * High-resolution local/embedded images for the rotation puzzle.
 * These images have asymmetric details and continuous radial lines
 * that cross the inner/outer circle boundary, making rotation alignment intuitive.
 */

// Preset 1: Botanical still life closely inspired by the visual reference screenshot
// (Turquoise vase, leafy stems, blossoms, modern tabletop setting)
export const BOTANICAL_PUZZLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="bgGlow" cx="45%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#fdfbf7"/>
      <stop offset="55%" stop-color="#ece8e1"/>
      <stop offset="100%" stop-color="#dbd4c7"/>
    </radialGradient>
    <linearGradient id="vaseGrad" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#6ee7b7"/>
      <stop offset="45%" stop-color="#14b8a6"/>
      <stop offset="85%" stop-color="#0f766e"/>
      <stop offset="100%" stop-color="#115e59"/>
    </linearGradient>
    <linearGradient id="tableGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e2d9cc"/>
      <stop offset="100%" stop-color="#c4b5a0"/>
    </linearGradient>
    <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="4" dy="8" stdDeviation="6" flood-opacity="0.18"/>
    </filter>
  </defs>

  <!-- Background tabletop & wall -->
  <rect width="400" height="400" fill="url(#bgGlow)"/>
  
  <!-- Diagonal floor / table surface -->
  <polygon points="0,260 400,210 400,400 0,400" fill="url(#tableGrad)" opacity="0.65"/>
  <line x1="0" y1="260" x2="400" y2="210" stroke="#a39682" stroke-width="2.5" opacity="0.7"/>
  
  <!-- Subtle tabletop tiles / stripes pattern crossing across -->
  <g stroke="#b8aa97" stroke-width="1.5" opacity="0.45">
    <line x1="40" y1="255" x2="110" y2="400"/>
    <line x1="120" y1="245" x2="210" y2="400"/>
    <line x1="220" y1="233" x2="310" y2="400"/>
    <line x1="320" y1="220" x2="390" y2="360"/>
  </g>

  <!-- Background abstract wall art lines (upper left & right) -->
  <g stroke="#d1c7b7" stroke-width="3" stroke-linecap="round" opacity="0.6">
    <path d="M 30,50 Q 90,80 130,40"/>
    <path d="M 270,30 Q 330,90 380,60"/>
    <circle cx="340" cy="90" r="14" fill="#fbcfe8" opacity="0.6"/>
    <circle cx="70" cy="110" r="18" fill="#bae6fd" opacity="0.5"/>
  </g>

  <!-- Vase shadow -->
  <ellipse cx="205" cy="275" rx="65" ry="18" fill="#78716c" opacity="0.25" filter="url(#softShadow)"/>

  <!-- Turquoise / Teal fluted Glass Vase (crossing center) -->
  <g filter="url(#softShadow)">
    <path d="M 160,190 C 150,225 152,270 200,270 C 248,270 250,225 240,190 C 235,170 230,165 235,150 L 165,150 C 170,165 165,170 160,190 Z" 
          fill="url(#vaseGrad)" opacity="0.88"/>
    <!-- Glass reflections and highlights -->
    <path d="M 172,165 C 168,190 168,235 185,255" stroke="#a7f3d0" stroke-width="5" stroke-linecap="round" opacity="0.65" fill="none"/>
    <path d="M 226,170 C 232,195 230,230 216,252" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.5" fill="none"/>
    <ellipse cx="200" cy="150" rx="35" ry="7" fill="#5eead4" opacity="0.9"/>
    <ellipse cx="200" cy="150" rx="28" ry="4.5" fill="#0f766e" opacity="0.7"/>
  </g>

  <!-- Stems extending outwards crossing inner and outer radius boundaries -->
  <g fill="none" stroke-linecap="round">
    <!-- Main central upward stems -->
    <path d="M 195,160 Q 185,120 160,75" stroke="#2d6a4f" stroke-width="4.5"/>
    <path d="M 200,160 Q 215,115 245,65" stroke="#40916c" stroke-width="4"/>
    <path d="M 190,160 Q 150,135 105,120" stroke="#1b4332" stroke-width="4"/>
    <path d="M 208,160 Q 255,140 295,115" stroke="#2d6a4f" stroke-width="4"/>
    
    <!-- Outer reaching leafy branches (reaching beyond r=120) -->
    <path d="M 160,75 Q 135,50 90,45" stroke="#52b788" stroke-width="3.5"/>
    <path d="M 245,65 Q 285,45 330,55" stroke="#52b788" stroke-width="3.5"/>
    <path d="M 105,120 Q 75,130 45,160" stroke="#40916c" stroke-width="3"/>
    <path d="M 295,115 Q 335,130 365,165" stroke="#2d6a4f" stroke-width="3"/>
    
    <!-- Drooping lower floral sprigs (reaching bottom left & right) -->
    <path d="M 170,220 Q 130,250 85,280" stroke="#52b788" stroke-width="3"/>
    <path d="M 230,225 Q 275,255 325,285" stroke="#40916c" stroke-width="3"/>
  </g>

  <!-- Green foliage leaves -->
  <g fill="#52b788" opacity="0.95">
    <path d="M 155,70 Q 140,55 125,65 Q 145,80 155,70 Z" fill="#74c69d"/>
    <path d="M 175,100 Q 155,95 145,108 Q 165,115 175,100 Z"/>
    <path d="M 230,95 Q 255,90 265,105 Q 242,112 230,95 Z" fill="#74c69d"/>
    <path d="M 255,60 Q 275,50 285,65 Q 265,75 255,60 Z"/>
    <path d="M 115,120 Q 95,105 85,118 Q 105,130 115,120 Z"/>
    <path d="M 285,120 Q 305,110 315,125 Q 295,135 285,120 Z"/>
  </g>

  <!-- Pink & Coral Blossoms and Petals -->
  <!-- Top left flower -->
  <g transform="translate(90, 45)">
    <circle cx="0" cy="0" r="14" fill="#f472b6"/>
    <circle cx="-9" cy="-5" r="9" fill="#fbcfe8"/>
    <circle cx="9" cy="-5" r="9" fill="#fbcfe8"/>
    <circle cx="0" cy="10" r="9" fill="#fbcfe8"/>
    <circle cx="0" cy="0" r="5" fill="#f59e0b"/>
  </g>

  <!-- Top right flower cluster -->
  <g transform="translate(330, 55)">
    <circle cx="0" cy="0" r="16" fill="#fb7185"/>
    <circle cx="-10" cy="-6" r="10" fill="#fecdd3"/>
    <circle cx="10" cy="-6" r="10" fill="#fecdd3"/>
    <circle cx="-6" cy="10" r="10" fill="#fda4af"/>
    <circle cx="7" cy="10" r="10" fill="#fda4af"/>
    <circle cx="0" cy="0" r="5.5" fill="#fbbf24"/>
  </g>

  <!-- Center-left flower -->
  <g transform="translate(130, 155)">
    <circle cx="0" cy="0" r="15" fill="#f43f5e"/>
    <circle cx="-8" cy="-8" r="9" fill="#fda4af"/>
    <circle cx="8" cy="-8" r="9" fill="#fda4af"/>
    <circle cx="-8" cy="8" r="9" fill="#fecdd3"/>
    <circle cx="8" cy="8" r="9" fill="#fecdd3"/>
    <circle cx="0" cy="0" r="5" fill="#fbbf24"/>
  </g>

  <!-- Right blossom -->
  <g transform="translate(300, 175)">
    <circle cx="0" cy="0" r="13" fill="#ec4899"/>
    <circle cx="-7" cy="-7" r="8" fill="#fbcfe8"/>
    <circle cx="7" cy="-7" r="8" fill="#fbcfe8"/>
    <circle cx="0" cy="8" r="8" fill="#fce7f3"/>
    <circle cx="0" cy="0" r="4.5" fill="#fbbf24"/>
  </g>

  <!-- Bottom right fallen flower petals on table -->
  <g opacity="0.85">
    <ellipse cx="280" cy="300" rx="9" ry="5" transform="rotate(25 280 300)" fill="#fda4af"/>
    <ellipse cx="295" cy="310" rx="8" ry="4" transform="rotate(-15 295 310)" fill="#fecdd3"/>
    <ellipse cx="120" cy="295" rx="10" ry="5" transform="rotate(-30 120 295)" fill="#fbcfe8"/>
  </g>
</svg>`;

// Preset 2: Mountain landscape with river, pines, and sunrise
export const LANDSCAPE_PUZZLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fdba74"/>
      <stop offset="35%" stop-color="#fed7aa"/>
      <stop offset="70%" stop-color="#e0e7ff"/>
      <stop offset="100%" stop-color="#c7d2fe"/>
    </linearGradient>
    <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
    <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
  </defs>

  <rect width="400" height="400" fill="url(#skyGrad)"/>

  <!-- Sun -->
  <circle cx="280" cy="130" r="48" fill="url(#sunGrad)" opacity="0.95"/>
  <!-- Sunbeams crossing across image -->
  <g stroke="#fef08a" stroke-width="2" opacity="0.35">
    <line x1="280" y1="130" x2="40" y2="40"/>
    <line x1="280" y1="130" x2="80" y2="280"/>
    <line x1="280" y1="130" x2="380" y2="30"/>
    <line x1="280" y1="130" x2="370" y2="250"/>
  </g>

  <!-- Distant mountain peaks (purple) -->
  <polygon points="-20,240 110,130 230,240" fill="#6366f1" opacity="0.5"/>
  <polygon points="120,240 250,110 390,240" fill="#4f46e5" opacity="0.55"/>

  <!-- Main jagged mountains (dark slate) -->
  <polygon points="30,270 170,140 280,270" fill="#334155"/>
  <polygon points="170,140 205,185 280,270" fill="#1e293b"/>
  <!-- Mountain snowcap -->
  <polygon points="170,140 152,165 168,160 175,170 188,162 170,140" fill="#f8fafc"/>

  <!-- Secondary ridge -->
  <polygon points="210,290 320,180 420,290" fill="#475569"/>

  <!-- Green rolling foothills -->
  <path d="M -10,280 Q 90,250 200,280 Q 310,310 410,270 L 410,400 L -10,400 Z" fill="#15803d"/>
  <path d="M -10,320 Q 120,290 250,330 Q 350,350 410,320 L 410,400 L -10,400 Z" fill="#166534"/>

  <!-- River crossing from center out to bottom edge -->
  <path d="M 200,280 C 180,310 240,330 190,360 C 160,375 140,385 110,400 L 170,400 C 210,380 230,365 250,345 C 290,325 240,300 200,280 Z" 
        fill="url(#riverGrad)"/>

  <!-- Pine trees of varied sizes crossing boundaries -->
  <g fill="#052e16">
    <!-- Tree 1 -->
    <polygon points="80,270 70,300 90,300"/>
    <polygon points="80,285 66,315 94,315"/>
    <!-- Tree 2 (foreground) -->
    <polygon points="330,280 315,320 345,320"/>
    <polygon points="330,305 310,345 350,345"/>
    <polygon points="330,330 305,370 355,370"/>
    <rect x="327" y="370" width="6" height="15" fill="#451a03"/>
    <!-- Tree 3 -->
    <polygon points="130,310 120,335 140,335"/>
    <polygon points="130,325 116,350 144,350"/>
  </g>
</svg>`;

// Preset 3: Modern geometric architecture with bold diagonals and arches
export const ARCHITECTURE_PUZZLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="skyCity" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="50%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#bae6fd"/>
    </linearGradient>
    <linearGradient id="facadeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f97316"/>
      <stop offset="60%" stop-color="#ea580c"/>
      <stop offset="100%" stop-color="#c2410c"/>
    </linearGradient>
    <linearGradient id="shadowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95"/>
    </linearGradient>
  </defs>

  <rect width="400" height="400" fill="url(#skyCity)"/>

  <!-- Perspective grid lines crossing canvas -->
  <g stroke="#ffffff" stroke-width="1.5" opacity="0.3">
    <line x1="200" y1="200" x2="0" y2="0"/>
    <line x1="200" y1="200" x2="400" y2="0"/>
    <line x1="200" y1="200" x2="400" y2="400"/>
    <line x1="200" y1="200" x2="0" y2="400"/>
    <line x1="200" y1="200" x2="200" y2="0"/>
    <line x1="200" y1="200" x2="200" y2="400"/>
  </g>

  <!-- Big orange architectural block on left -->
  <polygon points="50,60 170,120 170,360 50,320" fill="url(#facadeGrad)"/>
  <polygon points="170,120 230,90 230,330 170,360" fill="#9a3412"/>

  <!-- Modern circular cutout / arch inside building -->
  <circle cx="110" cy="220" r="32" fill="#0284c7"/>
  <circle cx="110" cy="220" r="22" fill="#f97316" opacity="0.8"/>

  <!-- Right glass tower with diagonal cross-braces -->
  <polygon points="250,50 360,90 360,370 250,340" fill="#0369a1" opacity="0.85"/>
  <g stroke="#e0f2fe" stroke-width="2.5" opacity="0.75">
    <line x1="250" y1="80" x2="360" y2="130"/>
    <line x1="360" y1="130" x2="250" y2="180"/>
    <line x1="250" y1="180" x2="360" y2="230"/>
    <line x1="360" y1="230" x2="250" y2="280"/>
    <line x1="250" y1="280" x2="360" y2="330"/>
  </g>

  <!-- Foreground pedestrian walkway crossing lower boundary -->
  <polygon points="0,320 400,320 400,400 0,400" fill="#e2e8f0"/>
  <g stroke="#94a3b8" stroke-width="3">
    <line x1="0" y1="360" x2="400" y2="360"/>
    <line x1="100" y1="320" x2="60" y2="400"/>
    <line x1="200" y1="320" x2="190" y2="400"/>
    <line x1="300" y1="320" x2="330" y2="400"/>
  </g>

  <!-- Stylized palm tree silhouettes -->
  <g fill="#1e293b">
    <path d="M 220,340 Q 215,280 205,240 L 210,240 Q 220,280 223,340 Z"/>
    <path d="M 205,240 Q 180,225 155,235 Q 185,245 205,240 Z"/>
    <path d="M 205,240 Q 195,215 180,205 Q 200,225 205,240 Z"/>
    <path d="M 205,240 Q 225,215 240,210 Q 225,230 205,240 Z"/>
    <path d="M 205,240 Q 235,230 255,245 Q 225,245 205,240 Z"/>
  </g>
</svg>`;

export const DEFAULT_SVG_IMAGES = [
  BOTANICAL_PUZZLE_SVG,
  LANDSCAPE_PUZZLE_SVG,
  ARCHITECTURE_PUZZLE_SVG,
];

/**
 * Converts an SVG string into a loaded HTMLImageElement.
 */
export function svgToImage(svgString: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const encoded = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(new Error('Failed to load SVG puzzle image: ' + err));
    img.src = encoded;

    // In jsdom/headless test environments, Image onload does not fire automatically
    if (typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent)) {
      setTimeout(() => {
        Object.defineProperty(img, 'naturalWidth', { value: 400, configurable: true });
        Object.defineProperty(img, 'naturalHeight', { value: 400, configurable: true });
        resolve(img);
      }, 0);
    }
  });
}

/**
 * Loads an image from a URL or returns the existing HTMLImageElement once fully loaded.
 */
export function loadPuzzleImage(srcOrElement: string | HTMLImageElement): Promise<HTMLImageElement> {
  if (typeof srcOrElement !== 'string') {
    if (srcOrElement.complete && srcOrElement.naturalWidth > 0) {
      return Promise.resolve(srcOrElement);
    }
    return new Promise((resolve, reject) => {
      srcOrElement.onload = () => resolve(srcOrElement);
      srcOrElement.onerror = (err) => reject(new Error('Image failed to load: ' + err));
    });
  }

  // If it's raw SVG markup
  if (srcOrElement.trim().startsWith('<svg')) {
    return svgToImage(srcOrElement);
  }

  // Normal URL or data URL
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(new Error(`Failed to load puzzle image from "${srcOrElement}": ${err}`));
    img.src = srcOrElement;

    if (typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent)) {
      setTimeout(() => {
        Object.defineProperty(img, 'naturalWidth', { value: 400, configurable: true });
        Object.defineProperty(img, 'naturalHeight', { value: 400, configurable: true });
        resolve(img);
      }, 0);
    }
  });
}
