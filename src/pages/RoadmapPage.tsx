import { useEffect, useRef } from "react";
import CoveredTopicsRoadmap from "../components/CoveredTopicsRoadmap";
import { FaceButton } from "../components/FaceButton";
import RoadmapSection from "../components/RoadmapSection";
import {
  RotatingWord,
  type RotatingWordItem,
} from "../components/RotatingWord";
import "../styles/pages.css";
import "../styles/roadmap.css";

const heroRotateWords: RotatingWordItem[] = [
  { text: "Trainer", tone: "primary" },
  { text: "Speaking", tone: "accent" },
  { text: "Listening", tone: "success" },
  { text: "Reading", tone: "error" },
  { text: "Progress", tone: "night" },
];

export default function RoadmapPage() {
  const roadmapRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const sync = () => {
      if (mq.matches && roadmapRef.current) {
        roadmapRef.current.open = true;
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div className="page-shell page-shell--roadmap">
      <header className="page-hero panel hero-home">
        <div className="hero-home__copy">
          <p className="page-kicker">English practice space</p>
          <h1 className="home-hero-title">
            English Simple{" "}
            <RotatingWord
              words={heroRotateWords}
              className="home-hero-rotate"
            />
          </h1>
          <p className="page-subtitle">
            A simple learning hub for routines, questions, adverbs of frequency,
            and speaking practice.
          </p>
        </div>
        <FaceButton />
      </header>

      <blockquote className="home-quote panel">
        <p>«Циклічне повторення в різних контекстах»</p>
      </blockquote>

      <details ref={roadmapRef} className="home-roadmap-details">
        <summary className="home-roadmap-summary">
          <span>Roadmap</span>
          <span className="home-roadmap-chevron" aria-hidden="true">
            ▾
          </span>
        </summary>
        <RoadmapSection />
        <button
          type="button"
          className="home-roadmap-fold"
          onClick={() => {
            const el = roadmapRef.current;
            if (!el) return;
            el.open = false;
            el.scrollIntoView({ block: "start", behavior: "smooth" });
          }}
        >
          Hide roadmap
        </button>
      </details>

      <section className="home-covered-roadmap">
        <CoveredTopicsRoadmap id="home-a1-covered" />
      </section>
    </div>
  );
}
