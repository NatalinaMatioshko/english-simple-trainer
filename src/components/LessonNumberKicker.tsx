/** Hero badge: number only visually; full “Lesson N” for screen readers. */
export default function LessonNumberKicker({
  number,
  className = "page-kicker",
}: {
  number: number | string;
  className?: string;
}) {
  return (
    <p className={className} aria-label={`Lesson ${number}`}>
      {number}
    </p>
  );
}
