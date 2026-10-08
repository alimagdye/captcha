import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createCaptcha, generatePuzzle } from '../src/captcha';
import { getSolutionSliderPercentage } from '../src/math';

// Mock Canvas 2D context for jsdom environment
beforeEach(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    beginPath: vi.fn(),
    closePath: vi.fn(),
    arc: vi.fn(),
    clip: vi.fn(),
    translate: vi.fn(),
    rotate: vi.fn(),
    drawImage: vi.fn(),
    stroke: vi.fn(),
    fillRect: vi.fn(),
  });

  // Mock getBoundingClientRect
  HTMLElement.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
    width: 330,
    height: 44,
    top: 0,
    left: 0,
    right: 330,
    bottom: 44,
    x: 0,
    y: 0,
    toJSON: () => {},
  });
});

describe('Captcha Component DOM Structure and Acceptance Criteria', () => {
  it('creates the exact required DOM classes, IDs and ARIA attributes', () => {
    const captcha = createCaptcha();

    // 1. Modal element
    const modal = captcha.modalElement;
    expect(modal).not.toBeNull();
    expect(modal.classList.contains('TUXModal')).toBe(true);
    expect(modal.classList.contains('captcha-verify-container')).toBe(true);
    expect(modal.getAttribute('data-width')).toBe('small');
    expect(modal.getAttribute('aria-labelledby')).toBe(':r0:_title');
    expect(modal.getAttribute('tabindex')).toBe('0');
    expect(modal.id).toBe(':r1:');
    expect(modal.getAttribute('role')).toBe('dialog');
    expect(modal.style.width).toBe('380px');
    expect(modal.style.maxWidth).toBe('unset');
    expect(modal.style.zIndex).toBe('8000');

    // 2. Main page element
    const mainPage = document.getElementById('captcha-verify-container-main-page');
    expect(mainPage).not.toBeNull();
    expect(mainPage?.getAttribute('aria-modal')).toBe('true');
    expect(mainPage?.getAttribute('role')).toBe('main');
    expect(mainPage?.classList.contains('cap-flex')).toBe(true);
    expect(mainPage?.classList.contains('cap-py-4')).toBe(true);
    expect(mainPage?.classList.contains('cap-px-12')).toBe(true);
    expect(mainPage?.classList.contains('sm:cap-px-16')).toBe(true);
    expect(mainPage?.classList.contains('sm:cap-py-12')).toBe(true);
    expect(mainPage?.classList.contains('cap-flex-col')).toBe(true);
    expect(mainPage?.classList.contains('cap-justify-between')).toBe(true);
    expect(mainPage?.classList.contains('cap-h-full')).toBe(true);
    expect(mainPage?.classList.contains('sm:cap-w-[380px]')).toBe(true);

    // 3. Close button
    const closeBtn = document.getElementById('captcha_close_button');
    expect(closeBtn).not.toBeNull();
    expect(closeBtn?.classList.contains('TUXButton')).toBe(true);
    expect(closeBtn?.classList.contains('TUXButton--borderless')).toBe(true);
    expect(closeBtn?.classList.contains('TUXButton--xsmall')).toBe(true);
    expect(closeBtn?.classList.contains('TUXButton--secondary')).toBe(true);
    expect(closeBtn?.getAttribute('aria-disabled')).toBe('false');
    expect(closeBtn?.getAttribute('aria-label')).toBe('Close');
    expect(closeBtn?.getAttribute('aria-live')).toBe('polite');

    const contentDiv = closeBtn?.querySelector('.TUXButton-content');
    expect(contentDiv).not.toBeNull();
    const iconContainer = contentDiv?.querySelector('.TUXButton-iconContainer');
    expect(iconContainer).not.toBeNull();
    expect(iconContainer?.querySelector('svg')).not.toBeNull();

    // 4. Instruction text
    const titleText = document.getElementById(':r0:_title');
    expect(titleText?.textContent).toBe('Drag the slider to fit the puzzle');

    // 5. Canvas puzzle
    const canvas = document.getElementById('captcha-puzzle-canvas') as HTMLCanvasElement;
    expect(canvas).not.toBeNull();
    expect(canvas.classList.contains('captcha-puzzle-canvas')).toBe(true);

    // 6. Slider
    const sliderThumb = document.getElementById('captcha-slider-thumb');
    expect(sliderThumb).not.toBeNull();
    expect(sliderThumb?.getAttribute('role')).toBe('slider');
    expect(sliderThumb?.getAttribute('aria-label')).toBe('Puzzle rotation');
    expect(sliderThumb?.getAttribute('aria-valuemin')).toBe('0');
    expect(sliderThumb?.getAttribute('aria-valuemax')).toBe('100');

    // 7. Audio and refresh buttons
    const audioBtn = document.querySelector('.captcha-audio-btn');
    expect(audioBtn).not.toBeNull();
    expect(audioBtn?.getAttribute('aria-label')).toBe('Audio challenge');

    const refreshBtn = document.querySelector('.captcha-refresh-btn');
    expect(refreshBtn).not.toBeNull();
    expect(refreshBtn?.getAttribute('aria-label')).toBe('Refresh puzzle');

    captcha.destroy();
  });

  it('rotates puzzle and detects correct solution', async () => {
    const onSuccess = vi.fn();
    const onFail = vi.fn();

    const captcha = createCaptcha({
      tolerance: 3,
      onSuccess,
      onFail,
      autoCloseDelay: 50,
    });

    // Wait for initial puzzle to load
    await new Promise((r) => setTimeout(r, 60));

    const state = captcha.getState();
    expect(state.solved).toBe(false);
    expect(state.targetRotation).toBe(0);

    // Incorrect angle check
    captcha.setRotation(180);
    const pass180 = captcha.checkSolution();
    expect(pass180).toBe(false);
    expect(captcha.getState().solved).toBe(false);
    expect(onFail).toHaveBeenCalled();

    // Correct alignment (target rotation 0)
    captcha.setRotation(0);
    const pass0 = captcha.checkSolution();
    expect(pass0).toBe(true);
    expect(captcha.getState().solved).toBe(true);
    expect(onSuccess).toHaveBeenCalledWith(
      expect.objectContaining({
        rotation: 0,
      })
    );

    captcha.destroy();
  });

  it('maps slider progress to solve position', async () => {
    const onSuccess = vi.fn();
    const captcha = createCaptcha({
      tolerance: 3,
      onSuccess,
      autoCloseDelay: 50,
    });

    await new Promise((r) => setTimeout(r, 60));
    const state = captcha.getState();

    // Calculate exact solution percentage on slider
    const solutionPercent = getSolutionSliderPercentage(state.initialRotation, state.targetRotation);

    // Move slider to solution percent
    captcha.setSliderProgress(solutionPercent);
    const solved = captcha.checkSolution();

    expect(solved).toBe(true);
    expect(captcha.getState().solved).toBe(true);
    expect(onSuccess).toHaveBeenCalled();

    captcha.destroy();
  });

  it('resets puzzle with a new randomized state on refresh', async () => {
    const onRefresh = vi.fn();
    const captcha = createCaptcha({ onRefresh });

    await new Promise((r) => setTimeout(r, 60));
    const state1 = captcha.getState();
    const initial1 = state1.initialRotation;

    await captcha.resetCaptcha();
    const state2 = captcha.getState();

    expect(onRefresh).toHaveBeenCalled();
    expect(state2.solved).toBe(false);
    expect(state2.puzzleId).not.toBe(state1.puzzleId);

    captcha.destroy();
  });

  it('closes modal and triggers onClose callback', async () => {
    const onClose = vi.fn();
    const captcha = createCaptcha({ onClose });

    expect(document.querySelector('.TUXModal')).not.toBeNull();

    const closeBtn = document.getElementById('captcha_close_button');
    closeBtn?.click();

    // Wait for fadeout animation
    await new Promise((r) => setTimeout(r, 320));

    expect(onClose).toHaveBeenCalled();
    expect(document.querySelector('.TUXModal')).toBeNull();
  });
});
