/** Speak English text via the browser Speech Synthesis API (prefer en-GB). */
export function speakEnglish(text: string, rate = 0.9) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-GB";
  utterance.rate = rate;

  const voices = window.speechSynthesis.getVoices();
  const preferred =
    voices.find((v) => v.lang.toLowerCase().startsWith("en-gb")) ??
    voices.find((v) => v.lang.toLowerCase().startsWith("en"));
  if (preferred) utterance.voice = preferred;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

/** "Aa" → "A" for alphabet letter names */
export function letterSpeakText(en: string): string {
  const letter = en.trim().charAt(0);
  return letter ? letter.toUpperCase() : en;
}

/** Warm up voices (some browsers load them asynchronously). */
export function warmUpSpeechVoices() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.getVoices();
}
