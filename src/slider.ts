/**
 * Accessible, touch- and pointer-enabled custom slider component.
 * Matches the capsule design with right-arrow thumb from the reference screenshot.
 */

export interface SliderCallbacks {
  onInput: (percentage: number) => void;
  onChange: (percentage: number) => void;
}

export class AccessibleSlider {
  private trackEl: HTMLElement;
  private thumbEl: HTMLElement;
  private progressFillEl?: HTMLElement;
  private callbacks: SliderCallbacks;

  private isDragging: boolean = false;
  private startPointerX: number = 0;
  private startProgress: number = 0;
  private currentProgress: number = 0; // 0 to 100
  private disabled: boolean = false;
  private animationFrameId: number | null = null;

  constructor(
    trackEl: HTMLElement,
    thumbEl: HTMLElement,
    callbacks: SliderCallbacks,
    progressFillEl?: HTMLElement
  ) {
    this.trackEl = trackEl;
    this.thumbEl = thumbEl;
    this.callbacks = callbacks;
    this.progressFillEl = progressFillEl;

    this.initAttributes();
    this.bindEvents();
    this.setProgress(0, false);
  }

  private initAttributes(): void {
    this.thumbEl.setAttribute('role', 'slider');
    this.thumbEl.setAttribute('tabindex', '0');
    this.thumbEl.setAttribute('aria-valuemin', '0');
    this.thumbEl.setAttribute('aria-valuemax', '100');
    this.thumbEl.setAttribute('aria-valuenow', '0');
    this.thumbEl.setAttribute('aria-label', 'Puzzle rotation');
    this.thumbEl.setAttribute('aria-orientation', 'horizontal');

    // Prevent default touch behaviors like scrolling
    this.trackEl.style.touchAction = 'none';
    this.thumbEl.style.touchAction = 'none';
  }

  private bindEvents(): void {
    // Pointer events for universal touch/mouse support
    this.thumbEl.addEventListener('pointerdown', this.handlePointerDown);
    this.trackEl.addEventListener('pointerdown', this.handleTrackPointerDown);
    this.thumbEl.addEventListener('keydown', this.handleKeyDown);
  }

  private getTravelDistance(): { maxTravel: number; padding: number; thumbWidth: number } {
    const trackRect = this.trackEl.getBoundingClientRect();
    const thumbRect = this.thumbEl.getBoundingClientRect();
    const padding = 3; // 3px internal inset
    const thumbWidth = thumbRect.width > 0 ? thumbRect.width : 54;
    const trackWidth = trackRect.width > 0 ? trackRect.width : 330;
    const maxTravel = Math.max(1, trackWidth - thumbWidth - padding * 2);
    return { maxTravel, padding, thumbWidth };
  }

  private handlePointerDown = (e: PointerEvent): void => {
    if (this.disabled || e.button !== 0) return;

    e.preventDefault();
    e.stopPropagation();

    this.isDragging = true;
    this.startPointerX = e.clientX;
    this.startProgress = this.currentProgress;

    this.thumbEl.classList.add('is-dragging');
    this.trackEl.classList.add('is-active');

    try {
      this.thumbEl.setPointerCapture(e.pointerId);
    } catch {
      // ignore if pointer capture fails
    }

    window.addEventListener('pointermove', this.handlePointerMove);
    window.addEventListener('pointerup', this.handlePointerUp);
    window.addEventListener('pointercancel', this.handlePointerUp);
  };

  private handleTrackPointerDown = (e: PointerEvent): void => {
    if (this.disabled || e.button !== 0 || e.target === this.thumbEl || this.thumbEl.contains(e.target as Node)) {
      return;
    }

    e.preventDefault();
    const trackRect = this.trackEl.getBoundingClientRect();
    const { maxTravel, padding, thumbWidth } = this.getTravelDistance();
    const clickX = e.clientX - trackRect.left - padding - thumbWidth / 2;
    const progress = Math.max(0, Math.min(100, (clickX / maxTravel) * 100));

    this.setProgress(progress, true);

    // Continue dragging from clicked location
    this.isDragging = true;
    this.startPointerX = e.clientX;
    this.startProgress = progress;
    this.thumbEl.classList.add('is-dragging');
    this.trackEl.classList.add('is-active');

    try {
      this.thumbEl.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    window.addEventListener('pointermove', this.handlePointerMove);
    window.addEventListener('pointerup', this.handlePointerUp);
    window.addEventListener('pointercancel', this.handlePointerUp);
  };

  private handlePointerMove = (e: PointerEvent): void => {
    if (!this.isDragging) return;

    const deltaX = e.clientX - this.startPointerX;
    const { maxTravel } = this.getTravelDistance();
    const deltaProgress = (deltaX / maxTravel) * 100;
    const newProgress = Math.max(0, Math.min(100, this.startProgress + deltaProgress));

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.animationFrameId = requestAnimationFrame(() => {
      this.setProgress(newProgress, true);
    });
  };

  private handlePointerUp = (e: PointerEvent): void => {
    if (!this.isDragging) return;

    this.isDragging = false;
    this.thumbEl.classList.remove('is-dragging');
    this.trackEl.classList.remove('is-active');

    try {
      this.thumbEl.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerup', this.handlePointerUp);
    window.removeEventListener('pointercancel', this.handlePointerUp);

    this.callbacks.onChange(this.currentProgress);
  };

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (this.disabled) return;

    let step = 0;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      step = e.shiftKey ? 5 : 1.5;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      step = e.shiftKey ? -5 : -1.5;
    } else if (e.key === 'PageUp') {
      step = 10;
    } else if (e.key === 'PageDown') {
      step = -10;
    } else if (e.key === 'Home') {
      e.preventDefault();
      this.setProgress(0, true);
      this.callbacks.onChange(0);
      return;
    } else if (e.key === 'End') {
      e.preventDefault();
      this.setProgress(100, true);
      this.callbacks.onChange(100);
      return;
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.callbacks.onChange(this.currentProgress);
      return;
    } else {
      return;
    }

    e.preventDefault();
    const newProgress = Math.max(0, Math.min(100, this.currentProgress + step));
    this.setProgress(newProgress, true);
    this.callbacks.onChange(this.currentProgress);
  };

  public setProgress(percentage: number, notify: boolean = true): void {
    this.currentProgress = Math.max(0, Math.min(100, percentage));
    this.thumbEl.setAttribute('aria-valuenow', Math.round(this.currentProgress).toString());

    const { maxTravel, padding } = this.getTravelDistance();
    const translateX = padding + (this.currentProgress / 100) * maxTravel;

    this.thumbEl.style.transform = `translate3d(${translateX}px, 0, 0)`;

    if (this.progressFillEl) {
      this.progressFillEl.style.width = `${translateX + 20}px`;
    }

    if (notify) {
      this.callbacks.onInput(this.currentProgress);
    }
  }

  public getProgress(): number {
    return this.currentProgress;
  }

  public setDisabled(disabled: boolean): void {
    this.disabled = disabled;
    this.thumbEl.setAttribute('aria-disabled', disabled ? 'true' : 'false');
    if (disabled) {
      this.thumbEl.classList.add('is-disabled');
      this.trackEl.classList.add('is-disabled');
    } else {
      this.thumbEl.classList.remove('is-disabled');
      this.trackEl.classList.remove('is-disabled');
    }
  }

  public reset(): void {
    this.setProgress(0, false);
  }

  public destroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.thumbEl.removeEventListener('pointerdown', this.handlePointerDown);
    this.trackEl.removeEventListener('pointerdown', this.handleTrackPointerDown);
    this.thumbEl.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerup', this.handlePointerUp);
    window.removeEventListener('pointercancel', this.handlePointerUp);
  }
}
