/**
 * Canvas rendering routines for the circular rotation puzzle.
 * Handles high-DPI scaling, annular ring clipping, inner rotation,
 * and seamless cover image compositing.
 */

/**
 * Draws an image with "cover" behavior centered at (cx, cy).
 */
export function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  image: CanvasImageSource,
  cx: number,
  cy: number,
  targetWidth: number,
  targetHeight: number
): void {
  const imgWidth = (image as any).naturalWidth || (image as any).width || targetWidth;
  const imgHeight = (image as any).naturalHeight || (image as any).height || targetHeight;

  if (imgWidth <= 0 || imgHeight <= 0) return;

  const scale = Math.max(targetWidth / imgWidth, targetHeight / imgHeight);
  const dw = imgWidth * scale;
  const dh = imgHeight * scale;
  const dx = cx - dw / 2;
  const dy = cy - dh / 2;

  ctx.drawImage(image, dx, dy, dw, dh);
}

/**
 * Draws the STATIC outer annular ring of the puzzle.
 * This region never rotates.
 */
export function drawOuterRing(
  ctx: CanvasRenderingContext2D,
  image: CanvasImageSource,
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number
): void {
  ctx.save();
  ctx.beginPath();
  // Outer circle (clockwise)
  ctx.arc(cx, cy, outerRadius, 0, Math.PI * 2, false);
  // Inner circle hole (counter-clockwise creates a donut shape)
  ctx.arc(cx, cy, innerRadius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  // Draw full static image sized to cover the entire outer circle
  drawCoverImage(ctx, image, cx, cy, outerRadius * 2, outerRadius * 2);
  ctx.restore();
}

/**
 * Draws the ROTATING inner circular section of the puzzle.
 * Rotates smoothly around the exact center point (cx, cy).
 */
export function drawRotatingInnerCircle(
  ctx: CanvasRenderingContext2D,
  image: CanvasImageSource,
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  rotationDeg: number
): void {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, innerRadius, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.clip();

  // Rotate around center point
  ctx.translate(cx, cy);
  ctx.rotate((rotationDeg * Math.PI) / 180);
  ctx.translate(-cx, -cy);

  // Draw identical image sized to outer radius, so pixels align at 0 deg
  drawCoverImage(ctx, image, cx, cy, outerRadius * 2, outerRadius * 2);
  ctx.restore();
}

/**
 * Renders boundary rings and aesthetic outlines separating the layers.
 */
export function drawBoundaryRing(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  solved: boolean = false
): void {
  // Inner rotating circle seam line
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, innerRadius, 0, Math.PI * 2);
  if (solved) {
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.9)'; // emerald green
    ctx.lineWidth = 2.5;
    ctx.shadowColor = 'rgba(34, 197, 94, 0.8)';
    ctx.shadowBlur = 8;
  } else {
    // Subtle frosted seam border as seen in screenshot
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 3;
  }
  ctx.stroke();
  ctx.restore();

  // Outer puzzle boundary circle
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, outerRadius, 0, Math.PI * 2);
  if (solved) {
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.7)';
    ctx.lineWidth = 2;
  } else {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1.5;
  }
  ctx.stroke();
  ctx.restore();
}

/**
 * Master draw function: composites outer static ring, inner rotating circle,
 * boundary rings, and optional solved state overlay.
 */
export function drawPuzzle(
  canvas: HTMLCanvasElement,
  image: CanvasImageSource,
  currentRotation: number,
  options: {
    puzzleSize?: number;
    innerRadiusRatio?: number;
    solved?: boolean;
  } = {}
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const displaySize = options.puzzleSize ?? 180;
  const ratio = options.innerRadiusRatio ?? 0.60;
  const solved = options.solved ?? false;

  const dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
  const internalWidth = Math.round(displaySize * dpr);
  const internalHeight = Math.round(displaySize * dpr);

  if (canvas.width !== internalWidth || canvas.height !== internalHeight) {
    canvas.width = internalWidth;
    canvas.height = internalHeight;
  }
  canvas.style.width = `${displaySize}px`;
  canvas.style.height = `${displaySize}px`;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.clearRect(0, 0, displaySize, displaySize);

  const cx = displaySize / 2;
  const cy = displaySize / 2;
  const outerRadius = displaySize / 2 - 2;
  const innerRadius = Math.round(outerRadius * ratio);

  // 1. Draw static outer ring
  drawOuterRing(ctx, image, cx, cy, innerRadius, outerRadius);

  // 2. Draw rotating center circle
  drawRotatingInnerCircle(ctx, image, cx, cy, innerRadius, outerRadius, currentRotation);

  // 3. Draw boundary seams and indicators
  drawBoundaryRing(ctx, cx, cy, innerRadius, outerRadius, solved);
}
