import { useEffect, useRef } from "react";
import CoveredTopicsRoadmap from "../components/CoveredTopicsRoadmap";
import RoadmapSection from "../components/RoadmapSection";
import "../styles/pages.css";
import "../styles/roadmap.css";

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
    <div className="page-shell">
      <header className="page-hero panel">
        <p className="page-kicker">Курс</p>
        <h1>Roadmap</h1>
        <p className="page-subtitle">
          Карта уроків і вже пройдених тем. Далі доробимо цю сторінку як основу
          платформи.
        </p>
      </header>

      <details ref={roadmapRef} className="home-roadmap-details">
        <summary className="home-roadmap-summary">
          <span>Карта курсу</span>
          <span className="home-roadmap-chevron" aria-hidden="true">
            ▾
          </span>
        </summary>
        <RoadmapSection />
      </details>

      <section className="home-covered-roadmap">
        <CoveredTopicsRoadmap id="home-a1-covered" />
      </section>
    </div>
  );
}
