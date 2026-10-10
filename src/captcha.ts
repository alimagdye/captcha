/**
 * Standalone circular rotation puzzle CAPTCHA component.
 * Fully self-contained, accessible, high performance, and matching the visual specification.
 */

import { CaptchaInstance, CaptchaOptions, PuzzleState } from "./types";
import {
  checkSolution,
  generateRandomInitialRotation,
  getAngularDifference,
  normalizeAngle,
  rotationFromSlider,
} from "./math";
import {
  drawPuzzle,
  drawOuterRing,
  drawRotatingInnerCircle,
  drawCoverImage,
} from "./canvas";
import { DEFAULT_SVG_IMAGES, loadPuzzleImage } from "./images";
import { AccessibleSlider } from "./slider";

// Re-export core canvas & math helpers so all suggested functions exist on module export
export {
  drawPuzzle,
  drawOuterRing,
  drawRotatingInnerCircle,
  drawCoverImage,
  getAngularDifference,
  checkSolution,
  loadPuzzleImage,
};

let imageIndexCounter = 0;

/**
 * Generates a realistic session/challenge ID similar to the screenshot.
 */
function generateSessionId(): string {
  const now = new Date();
  const pad = (n: number, l = 2) => n.toString().padStart(l, "0");
  const dateStr = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const hex = Array.from({ length: 18 }, () =>
    Math.floor(Math.random() * 16)
      .toString(16)
      .toUpperCase(),
  ).join("");
  return `${dateStr}${hex}`;
}

/**
 * Generates a fresh puzzle state with randomized initial rotation.
 */
export async function generatePuzzle(
  options: CaptchaOptions = {},
): Promise<PuzzleState> {
  const images =
    options.images && options.images.length > 0
      ? options.images
      : DEFAULT_SVG_IMAGES;
  const selectedSrc = images[imageIndexCounter % images.length];
  imageIndexCounter++;

  const loadedImg = await loadPuzzleImage(selectedSrc);
  const targetRotation = 0;
  const initialRotation = generateRandomInitialRotation(35, targetRotation);

  return {
    puzzleId: `puz_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    image: loadedImg,
    targetRotation,
    initialRotation,
    currentRotation: initialRotation,
    tolerance: options.tolerance ?? 3,
    solved: false,
    startTime: Date.now(),
  };
}

/**
 * Creates and displays the Rotation CAPTCHA modal.
 */
export function createCaptcha(options: CaptchaOptions = {}): CaptchaInstance {
  const tolerance = options.tolerance ?? 3;
  const puzzleSize = options.puzzleSize ?? 180;
  const innerRadiusRatio = options.innerRadiusRatio ?? 0.6;
  const autoCloseDelay = options.autoCloseDelay ?? 280;
  const instruction =
    options.instructionText ?? "Drag the slider to fit the puzzle";
  const sessionId = options.sessionId ?? generateSessionId();

  // Find or default container
  let mountParent: HTMLElement = document.body;
  if (options.container) {
    if (typeof options.container === "string") {
      const el = document.querySelector<HTMLElement>(options.container);
      if (el) mountParent = el;
    } else {
      mountParent = options.container;
    }
  }

  // --- Overlay element ---
  const overlay = document.createElement("div");
  overlay.className = "TUXModal-overlay captcha-modal-overlay";
  overlay.setAttribute("aria-hidden", "false");

  // --- Modal element (preserving exact required classes, IDs, ARIA attributes) ---
  const modal = document.createElement("div");
  modal.className = "TUXModal captcha-verify-container";
  modal.setAttribute("data-width", "small");
  modal.setAttribute("aria-labelledby", ":r0:_title");
  modal.setAttribute("tabindex", "0");
  modal.id = ":r1:";
  modal.setAttribute("role", "dialog");
  modal.style.width = "380px";
  modal.style.maxWidth = "unset";
  modal.style.zIndex = "8000";

  // Modal inner main page
  const mainPage = document.createElement("div");
  mainPage.id = "captcha-verify-container-main-page";
  mainPage.setAttribute("aria-modal", "true");
  mainPage.setAttribute("role", "main");
  mainPage.className =
    "cap-flex cap-py-4 cap-px-12 sm:cap-px-16 sm:cap-py-12 cap-flex-col cap-justify-between cap-h-full sm:cap-w-[380px] captcha-verify-container-main-page";

  // --- Header ---
  const header = document.createElement("div");
  header.className =
    "cap-flex cap-flex-row-reverse sm:cap-flex-col cap-justify-end sm:cap-justify-start cap-gap-2 cap-w-full cap-mb-8 captcha-header";

  // Close button container
  const closeBtnWrap = document.createElement("div");
  closeBtnWrap.className =
    "cap-flex cap-flex-row-reverse cap-items-center cap-flex-shrink-0";

  const closeButton = document.createElement("button");
  closeButton.className =
    "TUXButton TUXButton--borderless TUXButton--xsmall TUXButton--secondary";
  closeButton.setAttribute("aria-disabled", "false");
  closeButton.type = "button";
  closeButton.id = "captcha_close_button";
  closeButton.setAttribute("role", "button");
  closeButton.setAttribute("aria-label", "Close");
  closeButton.setAttribute("aria-live", "polite");

  closeButton.innerHTML = `
    <div class="TUXButton-content">
      <div class="TUXButton-iconContainer">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
    </div>
  `;
  closeBtnWrap.appendChild(closeButton);

  // Instruction Title
  const titleWrap = document.createElement("div");
  titleWrap.className = "cap-flex cap-items-center cap-flex-1 cap-min-w-0";
  const titleText = document.createElement("span");
  titleText.id = ":r0:_title";
  titleText.className = "captcha-title-text";
  titleText.textContent = instruction;
  titleWrap.appendChild(titleText);

  header.appendChild(closeBtnWrap);
  header.appendChild(titleWrap);
  mainPage.appendChild(header);

  // --- Puzzle Container ---
  const puzzleContainer = document.createElement("div");
  puzzleContainer.className =
    "cap-flex cap-flex-col cap-w-full cap-justify-center cap-min-h-[180px] captcha-puzzle-container";

  const canvas = document.createElement("canvas");
  canvas.id = "captcha-puzzle-canvas";
  canvas.className = "captcha-puzzle-canvas";
  canvas.width = puzzleSize * 2;
  canvas.height = puzzleSize * 2;
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", "Circular rotation puzzle");
  puzzleContainer.appendChild(canvas);
  mainPage.appendChild(puzzleContainer);

  // --- Slider Section ---
  const sliderContainer = document.createElement("div");
  sliderContainer.className =
    "captcha-slider-container cap-flex cap-flex-col cap-w-full";

  const sliderTrack = document.createElement("div");
  sliderTrack.className = "captcha-slider-track";
  sliderTrack.id = "captcha-slider-track";

  const sliderFill = document.createElement("div");
  sliderFill.className = "captcha-slider-fill";
  sliderFill.id = "captcha-slider-fill";
  sliderTrack.appendChild(sliderFill);

  const sliderThumb = document.createElement("div");
  sliderThumb.className = "captcha-slider-thumb";
  sliderThumb.id = "captcha-slider-thumb";
  sliderThumb.innerHTML = `
    <svg class="captcha-slider-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  `;
  sliderTrack.appendChild(sliderThumb);
  sliderContainer.appendChild(sliderTrack);
  mainPage.appendChild(sliderContainer);

  // --- Footer Section ---
  const footer = document.createElement("div");
  footer.className =
    "cap-flex cap-flex-row cap-justify-between cap-items-center cap-w-full captcha-footer";

  // Left Audio Button
  const audioBtn = document.createElement("button");
  audioBtn.className = "captcha-footer-btn captcha-audio-btn";
  audioBtn.type = "button";
  audioBtn.setAttribute("aria-label", "Audio challenge");
  audioBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
    </svg>
    <span>Audio</span>
  `;
  footer.appendChild(audioBtn);

  // Right Side Controls: Session ID + Refresh + Feedback
  const footerRight = document.createElement("div");
  footerRight.className = "captcha-footer-right";

  const sessionIdSpan = document.createElement("span");
  sessionIdSpan.className = "captcha-session-id";
  sessionIdSpan.textContent = sessionId;
  sessionIdSpan.title = "Verification ID";
  footerRight.appendChild(sessionIdSpan);

  const refreshBtn = document.createElement("button");
  refreshBtn.className = "captcha-footer-btn captcha-refresh-btn";
  refreshBtn.type = "button";
  refreshBtn.setAttribute("aria-label", "Refresh puzzle");
  refreshBtn.title = "Refresh puzzle";
  refreshBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path>
    </svg>
  `;
  footerRight.appendChild(refreshBtn);

  const feedbackBtn = document.createElement("button");
  feedbackBtn.className = "captcha-footer-btn captcha-feedback-btn";
  feedbackBtn.type = "button";
  feedbackBtn.setAttribute("aria-label", "Help and Feedback");
  feedbackBtn.title = "Help and Feedback";
  feedbackBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  `;
  footerRight.appendChild(feedbackBtn);

  footer.appendChild(footerRight);
  mainPage.appendChild(footer);

  modal.appendChild(mainPage);
  overlay.appendChild(modal);
  mountParent.appendChild(overlay);

  // Focus modal for immediate accessibility
  modal.focus();

  // Internal state
  let currentState: PuzzleState = {
    puzzleId: "",
    image: null as any,
    targetRotation: 0,
    initialRotation: 0,
    currentRotation: 0,
    tolerance,
    solved: false,
    startTime: Date.now(),
  };

  let isClosing = false;

  // --- Rendering helper ---
  function renderCanvas(): void {
    if (!currentState.image) return;
    drawPuzzle(canvas, currentState.image, currentState.currentRotation, {
      puzzleSize,
      innerRadiusRatio,
      solved: currentState.solved,
    });
  }

  // --- Rotation update helper ---
  function updateRotation(newAngle: number): void {
    if (currentState.solved) return;
    currentState.currentRotation = normalizeAngle(newAngle);
    renderCanvas();
  }

  // --- Success Handler ---
  function solveCaptcha(): void {
    if (currentState.solved) return;
    currentState.solved = true;
    currentState.currentRotation = currentState.targetRotation;

    slider.setDisabled(true);
    puzzleContainer.classList.add("is-solved");
    sliderContainer.classList.add("is-solved");

    // Change slider icon to checkmark
    sliderThumb.innerHTML = `
      <svg class="captcha-slider-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;

    renderCanvas();

    const timeTakenMs = Date.now() - currentState.startTime;
    if (options.onSuccess) {
      options.onSuccess({
        puzzleId: currentState.puzzleId,
        rotation: currentState.currentRotation,
        timeTakenMs,
      });
    }

    // Smooth dismiss after brief display of solved state
    window.setTimeout(() => {
      closeCaptcha();
    }, autoCloseDelay);
  }

  // --- Check Solution ---
  function checkCurrentSolution(): boolean {
    if (currentState.solved) return true;
    const isPassing = checkSolution(
      currentState.currentRotation,
      currentState.targetRotation,
      currentState.tolerance,
    );
    if (isPassing) {
      solveCaptcha();
      return true;
    } else {
      puzzleContainer.classList.remove("is-incorrect");
      // trigger reflow for restart animation
      void puzzleContainer.offsetWidth;
      puzzleContainer.classList.add("is-incorrect");

      const diff = getAngularDifference(
        currentState.currentRotation,
        currentState.targetRotation,
      );
      if (options.onFail) {
        options.onFail(diff);
      }

      resetCaptcha(); // regenerate puzzle on failure
      return false;
    }
  }

  // --- Accessible Slider Setup ---
  const slider = new AccessibleSlider(
    sliderTrack,
    sliderThumb,
    {
      onInput: (percent) => {
        if (currentState.solved) return;
        const angle = rotationFromSlider(percent, currentState.initialRotation);
        updateRotation(angle);
      },
      onChange: (_percent) => {
        if (currentState.solved) return;
        checkCurrentSolution();
      },
    },
    sliderFill,
  );

  // --- Reset/Regenerate Puzzle ---
  async function resetCaptcha(): Promise<void> {
    refreshBtn.classList.add("is-spinning");
    puzzleContainer.classList.remove("is-solved", "is-incorrect");
    sliderContainer.classList.remove("is-solved");

    sliderThumb.innerHTML = `
      <svg class="captcha-slider-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    `;

    slider.setDisabled(false);
    slider.reset();

    const newState = await generatePuzzle(options);
    currentState = newState;
    renderCanvas();

    window.setTimeout(() => {
      refreshBtn.classList.remove("is-spinning");
    }, 500);

    if (options.onRefresh) {
      options.onRefresh(currentState);
    }
  }

  // --- Close modal ---
  function closeCaptcha(): void {
    if (isClosing) return;
    isClosing = true;

    overlay.classList.add("is-closing");
    window.setTimeout(() => {
      destroy();
      if (options.onClose) {
        options.onClose();
      }
    }, 220);
  }

  // --- Audio challenge button handler ---
  function handleAudioClick(): void {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(
        "Drag the slider to fit the puzzle.",
      );
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      alert(
        "Audio instruction: Drag the slider until the inner puzzle matches the outer image.",
      );
    }
  }

  // --- Feedback button handler ---
  function handleFeedbackClick(): void {
    alert(
      "Verification assistance: Rotate the center circle using the slider until the picture aligns seamlessly.",
    );
  }

  // --- Keydown handler for modal (Escape closes) ---
  function handleModalKeyDown(e: KeyboardEvent): void {
    if (e.key === "Escape") {
      e.preventDefault();
      closeCaptcha();
    }
  }

  // Bind UI buttons
  closeButton.addEventListener("click", closeCaptcha);
  refreshBtn.addEventListener("click", () => {
    void resetCaptcha();
  });
  audioBtn.addEventListener("click", handleAudioClick);
  feedbackBtn.addEventListener("click", handleFeedbackClick);
  window.addEventListener("keydown", handleModalKeyDown);

  // Close when clicking outside modal window on overlay
  overlay.addEventListener("pointerdown", (e) => {
    if (e.target === overlay) {
      closeCaptcha();
    }
  });

  // --- Destroy cleanup ---
  function destroy(): void {
    slider.destroy();
    closeButton.removeEventListener("click", closeCaptcha);
    audioBtn.removeEventListener("click", handleAudioClick);
    feedbackBtn.removeEventListener("click", handleFeedbackClick);
    window.removeEventListener("keydown", handleModalKeyDown);
    if (overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
  }

  // Initialize first puzzle
  void resetCaptcha();

  return {
    modalElement: modal,
    overlayElement: overlay,
    canvasElement: canvas,
    sliderThumb,
    sliderTrack,
    getState: () => currentState,
    setRotation: (angle: number) => {
      updateRotation(angle);
    },
    setSliderProgress: (percent: number) => {
      slider.setProgress(percent, true);
    },
    resetCaptcha,
    closeCaptcha,
    checkSolution: checkCurrentSolution,
    destroy,
  };
}
