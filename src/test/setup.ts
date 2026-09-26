import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

/** SpeechSynthesis / TTS is unused in unit tests. */
vi.mock("../utils/speech", () => ({
  speakEnglish: vi.fn(),
  vocabSpeakText: vi.fn((text: string) => text),
  letterSpeakText: vi.fn((text: string) => text),
  warmUpSpeechVoices: vi.fn(),
}));
