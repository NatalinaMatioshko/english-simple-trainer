import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import type { CustomSection } from "../../types/lesson";

type CustomSectionComponent = ComponentType<{ section: CustomSection }>;

/**
 * Custom UI keyed by componentKey in lesson data.
 * Loaders stay static so unknown keys can be detected without fetching;
 * each module is downloaded only when that key is rendered.
 */
export const customSectionLoaders: Record<
  string,
  () => Promise<{ default: CustomSectionComponent }>
> = {
  "lesson37-pictures": () =>
    import("./customs/Lesson37Pictures").then((m) => ({
      default: m.Lesson37Pictures,
    })),
  "youtube-video": () =>
    import("./customs/YoutubeVideoSection").then((m) => ({
      default: m.YoutubeVideoSection,
    })),
  "homework-fix": () =>
    import("./customs/HomeworkFixSection").then((m) => ({
      default: m.HomeworkFixSection,
    })),
  "photo-gallery": () =>
    import("./customs/PhotoGallerySection").then((m) => ({
      default: m.PhotoGallerySection,
    })),
  "native-audio": () =>
    import("./customs/NativeAudioSection").then((m) => ({
      default: m.NativeAudioSection,
    })),
  "native-video": () =>
    import("./customs/NativeVideoSection").then((m) => ({
      default: m.NativeVideoSection,
    })),
  "lesson38-word-map": () =>
    import("./customs/Lesson38WordMapSection").then((m) => ({
      default: m.Lesson38WordMapSection,
    })),
  "lesson38-grammar-have-got": () =>
    import("./customs/Lesson38GrammarHaveGotSection").then((m) => ({
      default: m.Lesson38GrammarHaveGotSection,
    })),
  "lesson38-friend-speak": () =>
    import("./customs/Lesson38FriendSpeakSection").then((m) => ({
      default: m.Lesson38FriendSpeakSection,
    })),
  "photo-sentence-match": () =>
    import("./customs/PhotoSentenceMatchSection").then((m) => ({
      default: m.PhotoSentenceMatchSection,
    })),
  "frequency-scale": () =>
    import("./customs/FrequencyScaleSection").then((m) => ({
      default: m.FrequencyScaleSection,
    })),
  "frequency-grammar": () =>
    import("./customs/FrequencyGrammarSection").then((m) => ({
      default: m.FrequencyGrammarSection,
    })),
  "write-lists": () =>
    import("./customs/WriteListsSection").then((m) => ({
      default: m.WriteListsSection,
    })),
  "vocab-flip": () =>
    import("./customs/VocabFlipSection").then((m) => ({
      default: m.VocabFlipSection,
    })),
  "tick-list": () =>
    import("./customs/TickListSection").then((m) => ({
      default: m.TickListSection,
    })),
  "verb-table": () =>
    import("./customs/VerbTableSection").then((m) => ({
      default: m.VerbTableSection,
    })),
  "same-or-different": () =>
    import("./customs/SameOrDifferentSection").then((m) => ({
      default: m.SameOrDifferentSection,
    })),
  "stress-syllable": () =>
    import("./customs/StressSyllableSection").then((m) => ({
      default: m.StressSyllableSection,
    })),
  "tense-preview": () =>
    import("./customs/TensePreviewSection").then((m) => ({
      default: m.TensePreviewSection,
    })),
  "phrase-match": () =>
    import("./customs/PhraseMatchSection").then((m) => ({
      default: m.PhraseMatchSection,
    })),
  "line-order": () =>
    import("./customs/LineOrderSection").then((m) => ({
      default: m.LineOrderSection,
    })),
};

/** Stable React.lazy components — created once at module load, not during render. */
export const lazyCustomSectionComponents: Record<
  string,
  LazyExoticComponent<CustomSectionComponent>
> = Object.fromEntries(
  Object.entries(customSectionLoaders).map(([key, loader]) => [
    key,
    lazy(loader),
  ]),
);

export function isKnownCustomSectionKey(componentKey: string): boolean {
  return Object.prototype.hasOwnProperty.call(
    customSectionLoaders,
    componentKey,
  );
}

export function getLazyCustomSectionComponent(componentKey: string) {
  return lazyCustomSectionComponents[componentKey] ?? null;
}
