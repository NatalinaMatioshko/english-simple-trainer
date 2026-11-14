import { useEffect, useState } from "react";
import { LoginRequiredNote } from "./auth/LoginRequiredNote";
import { useAuth } from "../context/AuthContext";
import { saveHomeworkAnswer } from "../services/homeworkAnswers";
import "../styles/homeworkSubmit.css";

const STUDENT_NAME_KEY = "hw-student-name";

function readSavedName(): string {
  try {
    return localStorage.getItem(STUDENT_NAME_KEY) ?? "";
  } catch {
    return "";
  }
}

type Props = {
  lessonId: string;
  writing: string;
  /** Extra text appended after writing validation (e.g. survey summary). */
  appendix?: string;
  /** In-app quiz finished (e.g. ScoredQuizCard) */
  quizDone?: boolean;
  quizScore?: number;
  /** Show checkbox for external listening / Test-English task */
  showListeningCheck?: boolean;
  /** Show the "Quiz in app" line. */
  showQuizStatus?: boolean;
  title?: string;
  description?: string;
  buttonLabel?: string;
  /** Minimum trimmed writing length. Default 10. */
  minWritingLength?: number;
  emptyMessage?: string;
  /** Tighter layout for a submit control under one task. */
  compact?: boolean;
};

export function HomeworkSubmit({
  lessonId,
  writing,
  appendix = "",
  quizDone = false,
  quizScore,
  showListeningCheck = true,
  showQuizStatus = true,
  title = "Надіслати домашнє",
  description = "Текст береться з поля вище. Додай ім’я і натисни «Надіслати».",
  buttonLabel = "Надіслати вчителю",
  minWritingLength = 10,
  emptyMessage = "Напиши текст у полі вище (хоча б кілька речень), потім надішли.",
  compact = false,
}: Props) {
  const { user, loading } = useAuth();
  const [studentName, setStudentName] = useState(readSavedName);
  const [testDone, setTestDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setSuccess("");
  }, [writing]);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!user) {
      setError("Увійди, щоб надіслати домашнє завдання.");
      return;
    }

    const name = studentName.trim();
    const text = writing.trim();
    const extra = appendix.trim();
    const fullWriting = extra ? `${text}\n\n${extra}` : text;

    if (name.length < 2) {
      setError("Вкажи своє ім’я (мінімум 2 літери).");
      return;
    }
    if (text.length < minWritingLength) {
      setError(emptyMessage);
      return;
    }
    try {
      localStorage.setItem(STUDENT_NAME_KEY, name);
    } catch {
      /* ignore quota / private mode */
    }

    try {
      setSaving(true);
      await saveHomeworkAnswer({
        studentName: name,
        lessonId,
        writing: fullWriting,
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
    <div className={compact ? "hw-submit hw-submit--compact" : "hw-submit"}>
      <div className="hw-submit__head">
        <p className="page-kicker">Send to teacher</p>
        <h3 className="hw-submit__title">{title}</h3>
        <p className="hw-submit__desc">{description}</p>
      </div>

      {loading ? (
        <p className="hw-submit__meta">Перевіряю вхід…</p>
      ) : !user ? (
        <LoginRequiredNote
          className="hw-submit__err"
          message="Увійди, щоб надіслати домашнє завдання."
        />
      ) : (
        <>
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

          {showQuizStatus && (
            <p className="hw-submit__meta">
              Quiz in app:{" "}
              <strong>{quizDone ? "Done" : "Not finished yet"}</strong>
              {quizDone && typeof quizScore === "number" ? ` · score ${quizScore}` : ""}
            </p>
          )}

          <div className="hw-submit__actions">
            <button
              type="button"
              className="action-btn primary"
              onClick={() => void handleSubmit()}
              disabled={saving || Boolean(success)}
            >
              {saving ? "Надсилаю…" : success ? "Надіслано" : buttonLabel}
            </button>
            {success && <p className="hw-submit__ok">{success}</p>}
            {error && <p className="hw-submit__err">{error}</p>}
          </div>
        </>
      )}
    </div>
  );
}
