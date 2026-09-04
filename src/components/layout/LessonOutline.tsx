import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { lessons } from "../../data/lessons";

type OutlineItem = { id: string; label: string };

function labelForSection(el: HTMLElement): string {
  const heading = el.querySelector("h1, h2, h3, .l31-skill-title, .lesson22-section-head h2");
  const text = heading?.textContent?.replace(/\s+/g, " ").trim();
  if (text) return text.slice(0, 52);
  return el.id.replace(/^l\d+-/, "").replace(/-/g, " ");
}

function relatedLinks(pathname: string): { homework?: string; lesson?: string } {
  const lessonMatch = pathname.match(/^\/lesson-(\d+)/);
  if (lessonMatch) {
    const lesson = lessons.find((item) => item.id === lessonMatch[1]);
    return {
      homework:
        lesson && "homeworkPath" in lesson ? lesson.homeworkPath : undefined,
    };
  }
  const hwMatch = pathname.match(/^\/hw-(\d+)/) ?? pathname.match(/^\/homework\/(\d+)/);
  if (hwMatch) {
    const lesson = lessons.find((item) => item.id === hwMatch[1]);
    return { lesson: lesson?.lessonPath };
  }
  return {};
}

export function LessonOutline({
  container,
}: {
  container: HTMLElement | null;
}) {
  const { pathname } = useLocation();
  const [items, setItems] = useState<OutlineItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const links = useMemo(() => relatedLinks(pathname), [pathname]);

  useEffect(() => {
    if (!container) return;

    const scan = () => {
      const sections = [
        ...container.querySelectorAll<HTMLElement>("section[id]"),
      ].filter((el) => el.id);
      setItems(
        sections.map((el) => ({ id: el.id, label: labelForSection(el) })),
      );
    };

    scan();
    const timer = window.setTimeout(scan, 80);
    const observer = new MutationObserver(scan);
    observer.observe(container, { childList: true, subtree: true });
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [container, pathname]);

  useEffect(() => {
    if (!container || items.length === 0) return;
    const nodes = items
      .map((item) => container.querySelector<HTMLElement>(`#${item.id}`))
      .filter((el): el is HTMLElement => Boolean(el));

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [container, items]);

  const progress =
    items.length === 0
      ? 0
      : Math.round(
          ((Math.max(
            items.findIndex((item) => item.id === activeId),
            0,
          ) +
            (activeId ? 1 : 0)) /
            items.length) *
            100,
        );

  const body = (
    <>
      {items.length > 0 ? (
        <>
          <p className="lesson-outline-kicker">На сторінці</p>
          <div
            className="lesson-outline-progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-label="Прогрес прокрутки уроку"
          >
            <span style={{ width: `${progress}%` }} />
          </div>
          <nav className="lesson-outline-nav" aria-label="Зміст уроку">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={item.id === activeId ? "is-active" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </>
      ) : (
        <p className="lesson-outline-empty">
          Зміст з’явиться, якщо в уроці є позначені секції.
        </p>
      )}
      <div className="lesson-outline-links">
        {links.homework ? (
          <Link to={links.homework}>Домашнє цього уроку</Link>
        ) : null}
        {links.lesson ? <Link to={links.lesson}>Відкрити урок</Link> : null}
        <Link to="/vocab">Слова курсу</Link>
      </div>
    </>
  );

  return (
    <>
      <details className="lesson-outline lesson-outline--drawer">
        <summary>Зміст уроку</summary>
        {body}
      </details>
      <aside className="lesson-outline lesson-outline--rail" aria-label="Зміст уроку">
        <p className="lesson-outline-title">Урок</p>
        {body}
      </aside>
    </>
  );
}
