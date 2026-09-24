import type { ComponentType } from "react";
import type { CustomSection, LessonSection } from "../../types/lesson";
import { HomeworkFixSection } from "./customs/HomeworkFixSection";
import { Lesson37Pictures } from "./customs/Lesson37Pictures";
import { Lesson38FriendSpeakSection } from "./customs/Lesson38FriendSpeakSection";
import { Lesson38GrammarHaveGotSection } from "./customs/Lesson38GrammarHaveGotSection";
import { Lesson38WordMapSection } from "./customs/Lesson38WordMapSection";
import { NativeAudioSection } from "./customs/NativeAudioSection";
import { PhotoGallerySection } from "./customs/PhotoGallerySection";
import { PhotoSentenceMatchSection } from "./customs/PhotoSentenceMatchSection";
import { SameOrDifferentSection } from "./customs/SameOrDifferentSection";
import { TensePreviewSection } from "./customs/TensePreviewSection";
import { TickListSection } from "./customs/TickListSection";
import { VerbTableSection } from "./customs/VerbTableSection";
import { VocabFlipSection } from "./customs/VocabFlipSection";
import { YoutubeVideoSection } from "./customs/YoutubeVideoSection";
import { FillBlankSection } from "./sections/FillBlankSection";
import { HomeworkLinkSection } from "./sections/HomeworkLinkSection";
import { MultipleChoiceGroupSection } from "./sections/MultipleChoiceGroupSection";
import { MultipleChoiceSection } from "./sections/MultipleChoiceSection";
import { SpeakingPromptSection } from "./sections/SpeakingPromptSection";
import { TextSection } from "./sections/TextSection";
import { VocabularySection } from "./sections/VocabularySection";
import { WordOrderSection } from "./sections/WordOrderSection";
import { WritingPromptSection } from "./sections/WritingPromptSection";

type SectionProps<T extends LessonSection> = { section: T };

export const builtInSectionComponents = {
  text: TextSection,
  vocabulary: VocabularySection,
  multipleChoice: MultipleChoiceSection,
  multipleChoiceGroup: MultipleChoiceGroupSection,
  fillBlank: FillBlankSection,
  wordOrder: WordOrderSection,
  speakingPrompt: SpeakingPromptSection,
  writingPrompt: WritingPromptSection,
  homeworkLink: HomeworkLinkSection,
} as const;

/** Custom UI keyed by componentKey in lesson data (never store components in JSON). */
export const customSectionComponents: Record<
  string,
  ComponentType<SectionProps<CustomSection>>
> = {
  "lesson37-pictures": Lesson37Pictures,
  "youtube-video": YoutubeVideoSection,
  "homework-fix": HomeworkFixSection,
  "photo-gallery": PhotoGallerySection,
  "native-audio": NativeAudioSection,
  "lesson38-word-map": Lesson38WordMapSection,
  "lesson38-grammar-have-got": Lesson38GrammarHaveGotSection,
  "lesson38-friend-speak": Lesson38FriendSpeakSection,
  "photo-sentence-match": PhotoSentenceMatchSection,
  "vocab-flip": VocabFlipSection,
  "tick-list": TickListSection,
  "verb-table": VerbTableSection,
  "same-or-different": SameOrDifferentSection,
  "tense-preview": TensePreviewSection,
};

export function getCustomSectionComponent(componentKey: string) {
  return customSectionComponents[componentKey];
}
