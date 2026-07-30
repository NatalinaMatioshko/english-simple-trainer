import { useState } from "react";
import { saveHomeworkAnswer } from "../services/homeworkAnswers";
import "../styles/homeworkSubmit.css";

type Props = {
  lessonId: string;
  writing: string;
  /** In-app quiz finished (e.g. ScoredQuizCard) */
  quizDone?: boolean;
  quizScore?: number;
  /** Show checkbox for external listening / Test-English task */
  showListeningCheck?: boolean;
  title?: string;
  description?: string;
};

export function HomeworkSubmit({
  lessonId,
  writing,
  quizDone = false,
  quizScore,
  showListeningCheck = true,
  title = "Надіслати домашнє",
  description = "Текст береться з поля вище. Додай ім’я і натисни «Надіслати».",
}: Props) {
  const [studentName, setStudentName] = useState("");
  const [testDone, setTestDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    const name = studentName.trim();
    const text = writing.trim();

    if (name.length < 2) {
      setError("Вкажи своє ім’я (мінімум 2 літери).");
      return;
    }
    if (text.length < 10) {
      setError("Напиши текст у полі вище (хоча б кілька речень), потім надішли.");
      return;
    }

    try {
      setSaving(true);
      await saveHomeworkAnswer({
        studentName: name,
        lessonId,
        writing: text,
        testDone: showListeningCheck ? testDone : false,
        quizDone,
        quizScore,
      });
      setSuccess("Надіслано вчителю. Дякуємо!");
    } catch (err) {
      console.error(err);
      setError("Не вдалося надіслати. Перевір інтернет і спробуй ще раз.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="hw-submit">
      <div className="hw-submit__head">
        <p className="page-kicker">Send to teacher</p>
        <h3 className="hw-submit__title">{title}</h3>
        <p className="hw-submit__desc">{description}</p>
      </div>

      <label className="hw-submit__field">
        <span>Твоє ім’я</span>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Olena"
          autoComplete="name"
          disabled={saving || Boolean(success)}
        />
      </label>

      {showListeningCheck && (
        <label className="hw-submit__check">
          <input
            type="checkbox"
            checked={testDone}
            onChange={(e) => setTestDone(e.target.checked)}
            disabled={saving || Boolean(success)}
          />
          <span>Listening / external test — зроблено</span>
        </label>
      )}

      <p className="hw-submit__meta">
        Quiz in app:{" "}
        <strong>{quizDone ? "Done" : "Not finished yet"}</strong>
        {quizDone && typeof quizScore === "number" ? ` · score ${quizScore}` : ""}
      </p>

      <div className="hw-submit__actions">
        <button
          type="button"
          className="action-btn primary"
          onClick={() => void handleSubmit()}
          disabled={saving || Boolean(success)}
        >
          {saving ? "Надсилаю…" : success ? "Надіслано" : "Надіслати вчителю"}
        </button>
        {success && <p className="hw-submit__ok">{success}</p>}
        {error && <p className="hw-submit__err">{error}</p>}
      </div>
    </div>
  );
}
