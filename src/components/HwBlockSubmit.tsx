import { HomeworkSubmit } from "./HomeworkSubmit";

type Props = {
  lessonId: string;
  blockTitle: string;
  /** Non-empty lines are the answers for this block. */
  lines: string[];
  checked?: boolean;
  score?: number;
  total?: number;
};

/** Send one homework block. Other blocks on the page stay unsent. */
export function HwBlockSubmit({
  lessonId,
  blockTitle,
  lines,
  checked = false,
  score,
  total,
}: Props) {
  const filled = lines.map((line) => line.trim()).filter(Boolean);
  const scoreLine =
    typeof score === "number" && typeof total === "number"
      ? checked
        ? `Score: ${score}/${total}`
        : "Ще не перевірено кнопкою Check"
      : "";
  const writing = filled.length
    ? [`HW${lessonId} · ${blockTitle}`, scoreLine, "", ...filled]
        .filter((line) => line !== "")
        .join("\n")
    : "";

  return (
    <HomeworkSubmit
      lessonId={lessonId}
      writing={writing}
      quizDone={checked}
      quizScore={checked ? score : undefined}
      showListeningCheck={false}
      showQuizStatus={false}
      compact
      title={`Надіслати: ${blockTitle}`}
      description="Лише цей блок. Решту сторінки можна надіслати окремо."
      buttonLabel="Зберегти і надіслати цей блок"
      minWritingLength={1}
      emptyMessage="Заповни хоча б одну відповідь у цьому блоці."
    />
  );
}
