export interface PuzzleState {
  puzzleId: string;
  image: HTMLImageElement;
  targetRotation: number;
  initialRotation: number;
  currentRotation: number;
  tolerance: number;
  solved: boolean;
  startTime: number;
}

export interface CaptchaOptions {
  /** Target container element or selector to append to. If not specified, appends to document.body. */
  container?: HTMLElement | string;
  /** Optional array of image URLs or data URLs or HTMLImageElements to use for puzzles. */
  images?: (string | HTMLImageElement)[];
  /** Allowed angle difference in degrees for a solution to be considered valid. Default: 3. */
  tolerance?: number;
  /** Display size of the circular puzzle in pixels. Default: 180. */
  puzzleSize?: number;
  /** Ratio of inner rotatable circle radius to outer radius (0.1 to 0.9). Default: 0.60. */
  innerRadiusRatio?: number;
  /** Delay in milliseconds before closing modal after solve animation. Default: 280. */
  autoCloseDelay?: number;
  /** Custom session / challenge ID displayed in the footer. If omitted, generates one. */
  sessionId?: string;
  /** Title text displayed at the top. Default: "Drag the slider to fit the puzzle". */
  instructionText?: string;
  /** Callback fired upon successful verification. */
  onSuccess?: (result: { puzzleId: string; rotation: number; timeTakenMs: number }) => void;
  /** Callback fired when user releases slider at incorrect position. */
  onFail?: (diff: number) => void;
  /** Callback fired when user clicks close button or presses Escape. */
  onClose?: () => void;
  /** Callback fired when a new puzzle is generated. */
  onRefresh?: (puzzleState: PuzzleState) => void;
}

export interface CaptchaInstance {
  /** Root modal element */
  modalElement: HTMLElement;
  /** Background overlay element */
  overlayElement: HTMLElement;
  /** Canvas element */
  canvasElement: HTMLCanvasElement;
  /** Slider thumb element */
  sliderThumb: HTMLElement;
  /** Slider track element */
  sliderTrack: HTMLElement;
  /** Current state of the puzzle */
  getState: () => Readonly<PuzzleState>;
  /** Update rotation by angle in degrees */
  setRotation: (angle: number) => void;
  /** Update rotation from slider percentage (0 to 100) */
  setSliderProgress: (percentage: number) => void;
  /** Reset/regenerate with a new puzzle */
  resetCaptcha: () => Promise<void>;
  /** Close and remove the CAPTCHA modal */
  closeCaptcha: () => void;
  /** Manually trigger solve check */
  checkSolution: () => boolean;
  /** Destroy instance and remove event listeners */
  destroy: () => void;
}
