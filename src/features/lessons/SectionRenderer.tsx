import { createElement, Suspense } from "react";
import type { LessonSection } from "../../types/lesson";
import { CustomSectionErrorBoundary } from "./CustomSectionErrorBoundary";
import {
  isKnownCustomSectionKey,
  lazyCustomSectionComponents,
} from "./lessonSectionRegistry";
import { FillBlankSection } from "./sections/FillBlankSection";
import { HomeworkLinkSection } from "./sections/HomeworkLinkSection";
import { MultipleChoiceGroupSection } from "./sections/MultipleChoiceGroupSection";
import { MultipleChoiceSection } from "./sections/MultipleChoiceSection";
import { SpeakingPromptSection } from "./sections/SpeakingPromptSection";
import { TextSection } from "./sections/TextSection";
import { VocabularySection } from "./sections/VocabularySection";
import { WordOrderSection } from "./sections/WordOrderSection";
import { WritingPromptSection } from "./sections/WritingPromptSection";

function CustomSectionFallback({ id }: { id: string }) {
  return (
    <section id={id} className="lw-block panel" aria-busy="true">
      <p className="lw-section-desc">Loading exercise…</p>
    </section>
  );
}

export function SectionRenderer({ section }: { section: LessonSection }) {
  switch (section.type) {
    case "text":
      return <TextSection section={section} />;
    case "vocabulary":
      return <VocabularySection section={section} />;
    case "multipleChoice":
      return <MultipleChoiceSection section={section} />;
    case "multipleChoiceGroup":
      return <MultipleChoiceGroupSection section={section} />;
    case "fillBlank":
      return <FillBlankSection section={section} />;
    case "wordOrder":
      return <WordOrderSection section={section} />;
    case "speakingPrompt":
      return <SpeakingPromptSection section={section} />;
    case "writingPrompt":
      return <WritingPromptSection section={section} />;
    case "homeworkLink":
      return <HomeworkLinkSection section={section} />;
    case "custom": {
      if (!isKnownCustomSectionKey(section.componentKey)) {
        return (
          <section id={section.id} className="lw-block panel" role="alert">
            <p className="lw-section-desc">
              Unknown custom section: <code>{section.componentKey}</code>
            </p>
          </section>
        );
      }
      // Components are created once in lessonSectionRegistry (React.lazy per key).
      const LazyCustom = lazyCustomSectionComponents[section.componentKey];
      return (
        <CustomSectionErrorBoundary
          sectionId={section.id}
          componentKey={section.componentKey}
        >
          <Suspense fallback={<CustomSectionFallback id={section.id} />}>
            {createElement(LazyCustom, { section })}
          </Suspense>
        </CustomSectionErrorBoundary>
      );
    }
    default: {
      // Runtime guard for bad/legacy payloads (keeps the switch exhaustive for TS).
      const unexpected = section as { id?: string; type?: string };
      return (
        <section
          id={unexpected.id}
          className="lw-block panel"
          role="alert"
        >
          <p className="lw-section-desc">
            Unknown section type:{" "}
            <code>{String(unexpected.type ?? "unknown")}</code>
          </p>
        </section>
      );
    }
  }
}
