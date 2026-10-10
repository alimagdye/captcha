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

export const OCEAN_PUZZLE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="oceanSky" x2="0" y2="1">
      <stop offset="0%" stop-color="#7dd3fc"/>
      <stop offset="100%" stop-color="#0e7490"/>
    </linearGradient>
    <linearGradient id="oceanWater" x2="0" y2="1">
      <stop offset="0%" stop-color="#22d3ee"/>
      <stop offset="100%" stop-color="#164e63"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#oceanSky)"/>
  <circle cx="300" cy="95" r="43" fill="#fde68a"/>
  <g stroke="#fff7ed" stroke-width="2" opacity=".65">
    <path d="M300 35V18 M350 48L365 35 M365 95H385 M250 48L235 35"/>
    <path d="M0 180L55 165L105 180L155 165L205 180L255 165L305 180L355 165L400 178" fill="none"/>
  </g>
  <path d="M0 190L70 170L125 185L200 155L260 180L330 155L400 180V400H0Z" fill="url(#oceanWater)"/>
  <path d="M0 245Q50 215 100 245T200 245T300 245T400 245" fill="none" stroke="#a5f3fc" stroke-width="5"/>
  <path d="M0 310Q45 280 90 310T180 310T270 310T360 310T450 310" fill="none" stroke="#67e8f9" stroke-width="4"/>
  <path d="M40 200L90 145L145 200Z" fill="#64748b"/>
  <path d="M75 200V110H112V200Z" fill="#f8fafc"/>
  <path d="M75 145H112V165H75Z" fill="#ef4444"/>
  <path d="M68 112L93 88L119 112Z" fill="#dc2626"/>
  <rect x="87" y="95" width="10" height="17" fill="#fef3c7"/>
  <path d="M0 390L30 350L55 390L80 340L110 390L140 355L165 400Z" fill="#fb7185"/>
  <g stroke="#fda4af" stroke-width="5" fill="none" stroke-linecap="round">
    <path d="M35 390V330Q15 315 30 300 M35 350Q65 335 65 310"/>
    <path d="M140 400V345Q120 325 135 310 M140 365Q165 345 165 325"/>
  </g>
  <g fill="#fde68a">
    <circle cx="220" cy="285" r="5"/><circle cx="245" cy="320" r="4"/>
    <circle cx="280" cy="280" r="6"/><circle cx="340" cy="335" r="4"/>
  </g>
  <path d="M185 225L195 215L205 225L195 235Z" fill="#fff"/>
  <path d="M235 210L245 200L255 210L245 220Z" fill="#fff"/>
</svg>`;

export const DESERT_PUZZLE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="desertSky" x2="0" y2="1">
      <stop offset="0%" stop-color="#fb923c"/>
      <stop offset="100%" stop-color="#fde68a"/>
    </linearGradient>
    <linearGradient id="desertSand" x2="0" y2="1">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#desertSky)"/>
  <circle cx="290" cy="105" r="48" fill="#fff7ae"/>
  <g stroke="#fef3c7" stroke-width="2.5" opacity=".8">
    <path d="M290 35V15 M345 50L360 35 M360 105H385 M240 50L225 35"/>
    <path d="M290 175V195 M225 105H205"/>
  </g>
  <path d="M0 240L70 190L135 245L220 175L305 240L360 205L400 230V400H0Z" fill="#d97706"/>
  <path d="M35 300L145 155L255 300Z" fill="#fef3c7"/>
  <path d="M145 155L255 300H145Z" fill="#d6a65c"/>
  <path d="M210 300L280 205L350 300Z" fill="#fde68a"/>
  <path d="M280 205L350 300H280Z" fill="#c0843d"/>
  <path d="M0 310Q85 255 170 310T340 300L400 285V400H0Z" fill="url(#desertSand)"/>
  <path d="M0 355Q100 300 210 355T420 345" fill="none" stroke="#fde68a" stroke-width="4"/>
  <g fill="#166534">
    <path d="M70 340V270H78V340Z"/>
    <path d="M74 295Q30 285 35 255Q68 263 74 295Z"/>
    <path d="M75 315Q115 280 125 295Q110 325 75 315Z"/>
    <path d="M330 350V275H338V350Z"/>
    <path d="M334 300Q295 270 295 245Q330 255 334 300Z"/>
    <path d="M335 320Q370 285 385 305Q370 335 335 320Z"/>
  </g>
  <g fill="#92400e" opacity=".7">
    <ellipse cx="185" cy="335" rx="12" ry="5"/>
    <ellipse cx="240" cy="370" rx="18" ry="5"/>
    <ellipse cx="120" cy="375" rx="10" ry="4"/>
  </g>
  <g stroke="#fff7ed" stroke-width="2" opacity=".7">
    <path d="M20 90L60 110L85 95 M160 60L180 75L205 55"/>
  </g>
</svg>`;

export const SPACE_PUZZLE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="spaceBg" x2="1" y2="1">
      <stop offset="0%" stop-color="#111827"/>
      <stop offset="50%" stop-color="#581c87"/>
      <stop offset="100%" stop-color="#172554"/>
    </linearGradient>
    <linearGradient id="spacePlanet" x2="1" y2="1">
      <stop offset="0%" stop-color="#f0abfc"/>
      <stop offset="100%" stop-color="#7e22ce"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#spaceBg)"/>
  <g fill="#fff">
    <circle cx="35" cy="45" r="2.5"/><circle cx="95" cy="90" r="2"/>
    <circle cx="350" cy="40" r="3"/><circle cx="375" cy="150" r="2"/>
    <circle cx="45" cy="190" r="3"/><circle cx="120" cy="30" r="2"/>
    <circle cx="300" cy="220" r="2.5"/><circle cx="60" cy="330" r="2"/>
    <circle cx="350" cy="350" r="3"/><circle cx="180" cy="370" r="2"/>
  </g>
  <g stroke="#c4b5fd" stroke-width="2" opacity=".7">
    <path d="M35 80V100 M25 90H45 M330 80V100 M320 90H340"/>
    <path d="M120 250V270 M110 260H130"/>
  </g>
  <circle cx="120" cy="145" r="61" fill="#4338ca"/>
  <path d="M70 125Q110 95 165 130T175 170Q130 195 80 165Z" fill="#818cf8"/>
  <path d="M65 145Q110 125 170 155" fill="none" stroke="#c4b5fd" stroke-width="5"/>
  <ellipse cx="280" cy="245" rx="90" ry="25" fill="none" stroke="#f9a8d4" stroke-width="9" transform="rotate(-25 280 245)"/>
  <circle cx="280" cy="245" r="53" fill="url(#spacePlanet)"/>
  <path d="M235 235Q270 210 320 240 M240 265Q280 245 320 270" fill="none" stroke="#f5d0fe" stroke-width="5" opacity=".7"/>
  <ellipse cx="280" cy="245" rx="90" ry="25" fill="none" stroke="#fce7f3" stroke-width="3" transform="rotate(-25 280 245)"/>
  <path d="M190 70L198 90L220 98L198 106L190 128L182 106L160 98L182 90Z" fill="#fde68a"/>
  <path d="M65 250L70 263L84 268L70 273L65 287L60 273L46 268L60 263Z" fill="#67e8f9"/>
  <circle cx="180" cy="205" r="5" fill="#fef3c7"/>
  <circle cx="210" cy="165" r="4" fill="#fef3c7"/>
  <circle cx="350" cy="185" r="5" fill="#67e8f9"/>
  <path d="M0 370Q90 330 180 375T400 365V400H0Z" fill="#312e81" opacity=".7"/>
</svg>`;

export const AUTUMN_PUZZLE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="autumnSky" x2="0" y2="1">
      <stop offset="0%" stop-color="#fed7aa"/>
      <stop offset="100%" stop-color="#fef3c7"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#autumnSky)"/>
  <circle cx="300" cy="85" r="38" fill="#f59e0b"/>
  <g fill="#fff7ed" opacity=".75">
    <ellipse cx="80" cy="75" rx="38" ry="12"/>
    <ellipse cx="105" cy="70" rx="25" ry="13"/>
    <ellipse cx="230" cy="115" rx="32" ry="10"/>
  </g>
  <path d="M0 220L65 145L120 220L190 125L265 220L335 150L400 215V400H0Z" fill="#b45309" opacity=".65"/>
  <path d="M0 260Q80 205 160 255T320 245T420 250V400H0Z" fill="#65a30d"/>
  <path d="M0 305Q90 260 180 315T400 290V400H0Z" fill="#3f6212"/>
  <path d="M185 400Q235 345 190 310T225 245L260 250Q225 300 260 325T225 400Z" fill="#38bdf8"/>
  <path d="M200 400Q245 350 205 310T240 250" fill="none" stroke="#bae6fd" stroke-width="4"/>
  <g>
    <path d="M60 310V185H75V310Z" fill="#78350f"/>
    <circle cx="65" cy="170" r="40" fill="#ea580c"/>
    <circle cx="40" cy="190" r="25" fill="#f97316"/>
    <circle cx="85" cy="190" r="27" fill="#c2410c"/>
    <path d="M325 320V170H340V320Z" fill="#78350f"/>
    <circle cx="330" cy="155" r="45" fill="#ca8a04"/>
    <circle cx="300" cy="175" r="27" fill="#eab308"/>
    <circle cx="360" cy="180" r="28" fill="#f59e0b"/>
    <path d="M130 280V205H140V280Z" fill="#713f12"/>
    <circle cx="135" cy="190" r="30" fill="#dc2626"/>
    <circle cx="115" cy="200" r="20" fill="#f97316"/>
  </g>
  <g fill="#fbbf24">
    <path d="M95 330L105 345L95 355L85 345Z"/>
    <path d="M285 315L295 330L285 340L275 330Z"/>
    <path d="M160 360L170 375L160 385L150 375Z"/>
  </g>
  <g stroke="#fef3c7" stroke-width="2" fill="none" opacity=".8">
    <path d="M15 115Q30 105 45 115 M150 75Q165 65 180 75"/>
  </g>
</svg>`;

export const NEON_CITY_PUZZLE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="neonSky" x2="0" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#581c87"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#neonSky)"/>
  <circle cx="285" cy="95" r="48" fill="#ec4899" opacity=".8"/>
  <circle cx="285" cy="95" r="35" fill="#c084fc" opacity=".7"/>
  <g stroke="#67e8f9" stroke-width="2" opacity=".8">
    <path d="M20 65L65 65 M40 55L40 75 M330 160L370 160 M350 150L350 170"/>
    <path d="M100 110L120 100L140 110 M220 55L235 45L250 55" fill="none"/>
  </g>
  <path d="M0 190L45 190V130H95V205H130V100H175V195H215V145H260V205H300V125H345V180H400V400H0Z" fill="#1e1b4b"/>
  <g fill="#22d3ee">
    <rect x="55" y="145" width="10" height="14"/><rect x="75" y="145" width="10" height="14"/>
    <rect x="140" y="120" width="10" height="15"/><rect x="155" y="145" width="10" height="15"/>
    <rect x="225" y="165" width="12" height="15"/><rect x="245" y="165" width="12" height="15"/>
    <rect x="310" y="145" width="10" height="15"/><rect x="330" y="145" width="10" height="15"/>
  </g>
  <g fill="#f0abfc">
    <rect x="55" y="180" width="10" height="14"/><rect x="140" y="155" width="10" height="15"/>
    <rect x="155" y="180" width="10" height="15"/><rect x="310" y="175" width="10" height="15"/>
    <rect x="330" y="175" width="10" height="15"/>
  </g>
  <path d="M0 235L100 220L200 235L300 220L400 235V400H0Z" fill="#312e81"/>
  <path d="M0 285L400 260V400H0Z" fill="#111827"/>
  <path d="M200 400L160 285H240L300 400Z" fill="#4338ca"/>
  <path d="M200 400L190 285H210L240 400Z" fill="#67e8f9" opacity=".7"/>
  <g stroke="#f472b6" stroke-width="3" fill="none">
    <path d="M20 315H90L115 340H35Z"/>
    <path d="M300 310H375L355 335H285Z"/>
  </g>
  <g fill="#67e8f9">
    <circle cx="120" cy="280" r="4"/><circle cx="280" cy="290" r="4"/>
    <circle cx="80" cy="355" r="3"/><circle cx="330" cy="365" r="3"/>
  </g>
  <path d="M175 250L190 225L205 250Z" fill="#f472b6"/>
</svg>`;

export const DEFAULT_SVG_IMAGES = [
  BOTANICAL_PUZZLE_SVG,
  LANDSCAPE_PUZZLE_SVG,
  ARCHITECTURE_PUZZLE_SVG,
  OCEAN_PUZZLE_SVG,
  DESERT_PUZZLE_SVG,
  SPACE_PUZZLE_SVG,
  AUTUMN_PUZZLE_SVG,
  NEON_CITY_PUZZLE_SVG,
];

/**
 * Converts an SVG string into a loaded HTMLImageElement.
 */
export function svgToImage(svgString: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const encoded =
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (err) =>
      reject(new Error("Failed to load SVG puzzle image: " + err));
    img.src = encoded;

    // In jsdom/headless test environments, Image onload does not fire automatically
    if (
      typeof navigator !== "undefined" &&
      /jsdom/i.test(navigator.userAgent)
    ) {
      setTimeout(() => {
        Object.defineProperty(img, "naturalWidth", {
          value: 400,
          configurable: true,
        });
        Object.defineProperty(img, "naturalHeight", {
          value: 400,
          configurable: true,
        });
        resolve(img);
      }, 0);
    }
  });
}

/**
 * Loads an image from a URL or returns the existing HTMLImageElement once fully loaded.
 */
export function loadPuzzleImage(
  srcOrElement: string | HTMLImageElement,
): Promise<HTMLImageElement> {
  if (typeof srcOrElement !== "string") {
    if (srcOrElement.complete && srcOrElement.naturalWidth > 0) {
      return Promise.resolve(srcOrElement);
    }
    return new Promise((resolve, reject) => {
      srcOrElement.onload = () => resolve(srcOrElement);
      srcOrElement.onerror = (err) =>
        reject(new Error("Image failed to load: " + err));
    });
  }

  // If it's raw SVG markup
  if (srcOrElement.trim().startsWith("<svg")) {
    return svgToImage(srcOrElement);
  }

  // Normal URL or data URL
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (err) =>
      reject(
        new Error(`Failed to load puzzle image from "${srcOrElement}": ${err}`),
      );
    img.src = srcOrElement;

    if (
      typeof navigator !== "undefined" &&
      /jsdom/i.test(navigator.userAgent)
    ) {
      setTimeout(() => {
        Object.defineProperty(img, "naturalWidth", {
          value: 400,
          configurable: true,
        });
        Object.defineProperty(img, "naturalHeight", {
          value: 400,
          configurable: true,
        });
        resolve(img);
      }, 0);
    }
  });
}
