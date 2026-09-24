import { createElement } from "react";
import type { LessonSection } from "../../types/lesson";
import { getCustomSectionComponent } from "./lessonSectionRegistry";
import { FillBlankSection } from "./sections/FillBlankSection";
import { HomeworkLinkSection } from "./sections/HomeworkLinkSection";
import { MultipleChoiceGroupSection } from "./sections/MultipleChoiceGroupSection";
import { MultipleChoiceSection } from "./sections/MultipleChoiceSection";
import { SpeakingPromptSection } from "./sections/SpeakingPromptSection";
import { TextSection } from "./sections/TextSection";
import { VocabularySection } from "./sections/VocabularySection";
import { WordOrderSection } from "./sections/WordOrderSection";
import { WritingPromptSection } from "./sections/WritingPromptSection";

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
      const Custom = getCustomSectionComponent(section.componentKey);
      if (!Custom) {
        return (
          <section id={section.id} className="lw-block panel">
            <p className="lw-section-desc">
              Unknown custom section: <code>{section.componentKey}</code>
            </p>
          </section>
        );
      }
      return createElement(Custom, { section });
    }
    default: {
      const _exhaustive: never = section;
      return _exhaustive;
    }
  }
}
