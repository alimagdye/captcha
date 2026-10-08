/**
 * Mathematical utilities for rotation CAPTCHA calculation and angle normalization.
 */

/**
 * Normalizes an angle in degrees into the range [0, 360).
 */
export function normalizeAngle(angle: number): number {
  const norm = ((angle % 360) + 360) % 360;
  return norm >= 360 ? 0 : norm;
}

/**
 * Calculates the shortest angular difference (in degrees) between two angles.
 * Correctly accounts for circular wrap-around at 0/360 boundary.
 *
 * Example:
 *   getAngularDifference(359, 1) === 2
 *   getAngularDifference(1, 359) === 2
 *   getAngularDifference(0, 180) === 180
 */
export function getAngularDifference(angleA: number, angleB: number): number {
  const normA = normalizeAngle(angleA);
  const normB = normalizeAngle(angleB);
  const diff = Math.abs(normA - normB);
  return Math.min(diff, 360 - diff);
}

/**
 * Checks whether the current rotation matches the target rotation within the given tolerance.
 */
export function checkSolution(
  currentRotation: number,
  targetRotation: number,
  tolerance: number = 3
): boolean {
  return getAngularDifference(currentRotation, targetRotation) <= tolerance;
}

/**
 * Generates a randomized initial rotation angle that is sufficiently far
 * from the target rotation so the puzzle is never pre-solved.
 *
 * @param minOffset Minimum offset in degrees away from target (default: 30)
 * @param target Target angle in degrees (default: 0)
 */
export function generateRandomInitialRotation(minOffset: number = 30, target: number = 0): number {
  // Generate an angle in [minOffset, 360 - minOffset]
  const range = 360 - minOffset * 2;
  const offset = minOffset + Math.random() * range;
  return normalizeAngle(target + offset);
}

/**
 * Maps a slider progress value (0 to 100) and initial rotation to the current rotation angle.
 * At 0%, rotation equals initialRotation.
 * At 100%, rotation has completed one full 360-degree sweep.
 */
export function rotationFromSlider(sliderPercent: number, initialRotation: number): number {
  const clampedPercent = Math.max(0, Math.min(100, sliderPercent));
  const sweep = (clampedPercent / 100) * 360;
  return normalizeAngle(initialRotation + sweep);
}

/**
 * Calculates the slider percentage (0 to 100) where the puzzle reaches target rotation.
 */
export function getSolutionSliderPercentage(initialRotation: number, targetRotation: number = 0): number {
  const neededAngle = normalizeAngle(targetRotation - initialRotation);
  return (neededAngle / 360) * 100;
}
