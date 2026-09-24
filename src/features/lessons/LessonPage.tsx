import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LessonNumberKicker from "../../components/LessonNumberKicker";
import type { Lesson } from "../../types/lesson";
import { LessonRenderer } from "./LessonRenderer";
import {
  getLessonById,
  LessonServiceError,
} from "./lessonService";
import "./lessonWorkspace.css";

type LoadState =
  | { status: "loading" }
  | { status: "ready"; lesson: Lesson }
  | { status: "not_found" }
  | { status: "error"; message: string };

function LessonPageInner({ lessonId }: { lessonId: string }) {
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const lesson = await getLessonById(lessonId);
        if (!cancelled) setState({ status: "ready", lesson });
      } catch (err) {
        if (cancelled) return;
        if (err instanceof LessonServiceError) {
          if (err.code === "not_found" || err.code === "not_published") {
            setState({ status: "not_found" });
            return;
          }
        }
        setState({
          status: "error",
          message:
            err instanceof Error ? err.message : "Failed to load lesson",
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  if (state.status === "loading") {
    return (
      <div className="lw-page">
        <section className="lw-hero panel">
          <p className="page-kicker">Lesson</p>
          <h1>Loading…</h1>
        </section>
      </div>
    );
  }

  if (state.status === "not_found") {
    return (
      <div className="lw-page">
        <section className="lw-hero panel">
          <p className="page-kicker">Lesson</p>
          <h1>Lesson not found</h1>
          <p className="lw-subtitle">
            Урок <code>{lessonId || "?"}</code> недоступний або ще не published.
          </p>
          <Link className="lw-back-link" to="/lessons">
            ← Back to lessons
          </Link>
        </section>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="lw-page">
        <section className="lw-hero panel">
          <p className="page-kicker">Lesson</p>
          <h1>Something went wrong</h1>
          <p className="lw-subtitle">{state.message}</p>
          <Link className="lw-back-link" to="/lessons">
            ← Back to lessons
          </Link>
        </section>
      </div>
    );
  }

  const { lesson } = state;

  return (
    <div className="lw-page">
      <section className="lw-hero panel">
        <div className="lw-hero-top">
          <div>
            <LessonNumberKicker number={lesson.number} />
            <h1>{lesson.title}</h1>
            {lesson.topic ? (
              <p className="lw-topic-pill">{lesson.topic}</p>
            ) : null}
          </div>
          <div className="lw-nav-col">
            {(lesson.navLinks ?? []).map((link) => (
              <Link
                key={link.path + link.label}
                className={`lw-back-link${link.ghost ? " lw-back-link--ghost" : ""}`}
                to={link.path}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        {lesson.chips && lesson.chips.length > 0 ? (
          <div className="lw-chips">
            {lesson.chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
        ) : null}
      </section>

      {lesson.flow && lesson.flow.length > 0 ? (
        <section className="lw-block panel">
          <div className="lw-flow">
            {lesson.flow.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <LessonRenderer lesson={lesson} />

      <section className="lw-block panel">
        <div className="lw-actions">
          {lesson.homework ? (
            <Link className="lw-check-btn" to={lesson.homework.path}>
              {lesson.homework.label}
            </Link>
          ) : null}
          {lesson.nextLessonPath ? (
            <Link className="lw-mini-btn" to={lesson.nextLessonPath}>
              Next lesson →
            </Link>
          ) : null}
          {lesson.prevLessonPath ? (
            <Link className="lw-mini-btn" to={lesson.prevLessonPath}>
              ← Previous
            </Link>
          ) : null}
          <Link className="lw-mini-btn" to="/lessons">
            All lessons →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function LessonPage() {
  const { lessonId = "" } = useParams();
  return <LessonPageInner key={lessonId} lessonId={lessonId} />;
}
