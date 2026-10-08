import { describe, it, expect } from 'vitest';
import {
  normalizeAngle,
  getAngularDifference,
  checkSolution,
  generateRandomInitialRotation,
  rotationFromSlider,
  getSolutionSliderPercentage,
} from '../src/math';

describe('Math utilities for Rotation CAPTCHA', () => {
  it('normalizes angles properly within [0, 360)', () => {
    expect(normalizeAngle(0)).toBe(0);
    expect(normalizeAngle(360)).toBe(0);
    expect(normalizeAngle(720)).toBe(0);
    expect(normalizeAngle(90)).toBe(90);
    expect(normalizeAngle(359.9)).toBeCloseTo(359.9);
    expect(normalizeAngle(-10)).toBe(350);
    expect(normalizeAngle(-360)).toBe(0);
    expect(normalizeAngle(-370)).toBe(350);
  });

  it('calculates shortest angular difference handling wrap-around', () => {
    expect(getAngularDifference(0, 0)).toBe(0);
    expect(getAngularDifference(10, 20)).toBe(10);
    expect(getAngularDifference(20, 10)).toBe(10);

    // Boundary wrap-around 359 vs 1 (should be 2 deg apart)
    expect(getAngularDifference(359, 1)).toBe(2);
    expect(getAngularDifference(1, 359)).toBe(2);

    // Boundary wrap-around 350 vs 10 (should be 20 deg apart)
    expect(getAngularDifference(350, 10)).toBe(20);
    expect(getAngularDifference(10, 350)).toBe(20);

    // Exact opposite
    expect(getAngularDifference(0, 180)).toBe(180);
    expect(getAngularDifference(90, 270)).toBe(180);

    // Floating-point values
    expect(getAngularDifference(358.5, 1.5)).toBeCloseTo(3);
  });

  it('checks solution tolerance correctly', () => {
    // Target is 0
    expect(checkSolution(0, 0, 3)).toBe(true);
    expect(checkSolution(2.5, 0, 3)).toBe(true);
    expect(checkSolution(358, 0, 3)).toBe(true); // 2 deg diff <= 3
    expect(checkSolution(356, 0, 3)).toBe(false); // 4 deg diff > 3
    expect(checkSolution(4, 0, 3)).toBe(false);
  });

  it('generates random initial rotation far enough from target', () => {
    for (let i = 0; i < 50; i++) {
      const initial = generateRandomInitialRotation(30, 0);
      expect(initial).toBeGreaterThanOrEqual(30);
      expect(initial).toBeLessThanOrEqual(330);
      expect(checkSolution(initial, 0, 3)).toBe(false);
    }
  });

  it('maps slider 0-100% to 360 rotation correctly', () => {
    const initial = 90;
    expect(rotationFromSlider(0, initial)).toBe(90);
    expect(rotationFromSlider(50, initial)).toBe(270);
    expect(rotationFromSlider(100, initial)).toBe(90);

    // Solution point on slider
    const solutionPercent = getSolutionSliderPercentage(initial, 0);
    // Needed sweep: 360 - 90 = 270 deg -> (270 / 360) * 100 = 75%
    expect(solutionPercent).toBe(75);
    expect(rotationFromSlider(solutionPercent, initial)).toBe(0);
  });
});
