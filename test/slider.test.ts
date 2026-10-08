import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AccessibleSlider } from '../src/slider';

describe('AccessibleSlider keyboard and pointer controls', () => {
  let trackEl: HTMLElement;
  let thumbEl: HTMLElement;

  beforeEach(() => {
    trackEl = document.createElement('div');
    trackEl.className = 'captcha-slider-track';
    thumbEl = document.createElement('div');
    thumbEl.className = 'captcha-slider-thumb';
    trackEl.appendChild(thumbEl);
    document.body.appendChild(trackEl);

    // Mock layout measurements in jsdom
    trackEl.getBoundingClientRect = vi.fn().mockReturnValue({
      width: 330,
      height: 44,
      left: 0,
      right: 330,
      top: 0,
      bottom: 44,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    thumbEl.getBoundingClientRect = vi.fn().mockReturnValue({
      width: 54,
      height: 36,
      left: 0,
      right: 54,
      top: 4,
      bottom: 40,
      x: 0,
      y: 4,
      toJSON: () => {},
    });
  });

  it('initializes with correct accessibility attributes', () => {
    const onInput = vi.fn();
    const onChange = vi.fn();
    const slider = new AccessibleSlider(trackEl, thumbEl, { onInput, onChange });

    expect(thumbEl.getAttribute('role')).toBe('slider');
    expect(thumbEl.getAttribute('tabindex')).toBe('0');
    expect(thumbEl.getAttribute('aria-valuemin')).toBe('0');
    expect(thumbEl.getAttribute('aria-valuemax')).toBe('100');
    expect(thumbEl.getAttribute('aria-valuenow')).toBe('0');
    expect(thumbEl.getAttribute('aria-label')).toBe('Puzzle rotation');
    expect(thumbEl.getAttribute('aria-orientation')).toBe('horizontal');

    slider.destroy();
  });

  it('updates progress and triggers onInput callback', () => {
    const onInput = vi.fn();
    const onChange = vi.fn();
    const slider = new AccessibleSlider(trackEl, thumbEl, { onInput, onChange });

    slider.setProgress(50, true);
    expect(slider.getProgress()).toBe(50);
    expect(thumbEl.getAttribute('aria-valuenow')).toBe('50');
    expect(onInput).toHaveBeenCalledWith(50);

    slider.destroy();
  });

  it('responds to keyboard navigation (ArrowRight, ArrowLeft, Home, End)', () => {
    const onInput = vi.fn();
    const onChange = vi.fn();
    const slider = new AccessibleSlider(trackEl, thumbEl, { onInput, onChange });

    // ArrowRight (+1.5)
    thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(slider.getProgress()).toBe(1.5);
    expect(onChange).toHaveBeenCalledWith(1.5);

    // Shift + ArrowRight (+5)
    thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', shiftKey: true }));
    expect(slider.getProgress()).toBe(6.5);

    // ArrowLeft (-1.5)
    thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(slider.getProgress()).toBe(5);

    // End (100)
    thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
    expect(slider.getProgress()).toBe(100);

    // Home (0)
    thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
    expect(slider.getProgress()).toBe(0);

    slider.destroy();
  });

  it('disables slider and updates aria-disabled', () => {
    const onInput = vi.fn();
    const onChange = vi.fn();
    const slider = new AccessibleSlider(trackEl, thumbEl, { onInput, onChange });

    slider.setDisabled(true);
    expect(thumbEl.getAttribute('aria-disabled')).toBe('true');
    expect(thumbEl.classList.contains('is-disabled')).toBe(true);

    // Keydown should be ignored when disabled
    thumbEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(slider.getProgress()).toBe(0);

    slider.setDisabled(false);
    expect(thumbEl.getAttribute('aria-disabled')).toBe('false');

    slider.destroy();
  });
});
