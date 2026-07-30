import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  coveredNodePoints,
  coveredSteps,
  coveredTopics,
} from "../data/lesson30Review";
import "../styles/lesson30.css";

const COVERED_TOTAL = coveredSteps.length;
const COVERED_LINE_MS = 750;
const COVERED_FADE_MS = 280;

const ROAD_PATH =
  "M 70 500 C 140 500, 160 470, 110 470 S 220 420, 260 390 S 220 320, 180 280 S 260 230, 340 200 S 460 230, 520 270 S 620 230, 700 180 S 760 130, 780 90 S 850 50, 910 55 L 960 40";

type Props = {
  id?: string;
  className?: string;
};

export default function CoveredTopicsRoadmap({
  id = "a1-covered-roadmap",
  className = "",
}: Props) {
  const svgId = useId().replace(/:/g, "");
  const glowId = `l30RoadGlow-${svgId}`;
  const blurId = `l30RoadBlur-${svgId}`;

  const [coveredIndex, setCoveredIndex] = useState(-1);
  const [coveredLinePhase, setCoveredLinePhase] = useState<
    "in" | "out" | "done"
  >("in");
  const [coveredPlaying, setCoveredPlaying] = useState(true);
  const [coveredRun, setCoveredRun] = useState(0);
  const [hoverCat, setHoverCat] = useState<number | null>(null);
  const [hoverItem, setHoverItem] = useState<number | null>(null);
  const coveredTimer = useRef<number | null>(null);
  const coveredFadeTimer = useRef<number | null>(null);
  const hoverLock = useRef<number | null>(null);

  const clearCoveredTimers = () => {
    if (coveredTimer.current != null) {
      window.clearTimeout(coveredTimer.current);
      coveredTimer.current = null;
    }
    if (coveredFadeTimer.current != null) {
      window.clearTimeout(coveredFadeTimer.current);
      coveredFadeTimer.current = null;
    }
  };

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCoveredIndex(COVERED_TOTAL - 1);
      setCoveredLinePhase("done");
      setCoveredPlaying(false);
      return;
    }

    clearCoveredTimers();
    setCoveredIndex(-1);
    setCoveredLinePhase("in");
    setCoveredPlaying(true);
    setHoverCat(null);
    setHoverItem(null);

    let i = -1;

    const showNext = () => {
      i += 1;
      if (i >= COVERED_TOTAL) {
        setCoveredLinePhase("done");
        setCoveredPlaying(false);
        return;
      }
      setCoveredIndex(i);
      setCoveredLinePhase("in");
      coveredTimer.current = window.setTimeout(() => {
        setCoveredLinePhase("out");
        coveredFadeTimer.current = window.setTimeout(showNext, COVERED_FADE_MS);
      }, COVERED_LINE_MS);
    };

    coveredTimer.current = window.setTimeout(showNext, 400);

    return clearCoveredTimers;
  }, [coveredRun]);

  const skipCovered = () => {
    clearCoveredTimers();
    setCoveredIndex(COVERED_TOTAL - 1);
    setCoveredLinePhase("done");
    setCoveredPlaying(false);
    setHoverCat(null);
    setHoverItem(null);
  };

  const replayCovered = () => {
    clearCoveredTimers();
    setCoveredRun((r) => r + 1);
  };

  const driveToCat = (catIndex: number) => {
    if (hoverLock.current === catIndex) return;
    hoverLock.current = catIndex;
    setHoverCat(catIndex);
    setHoverItem(null);
  };

  const driveToItem = (catIndex: number, itemIndex: number) => {
    hoverLock.current = catIndex;
    setHoverCat(catIndex);
    setHoverItem(itemIndex);
  };

  const leaveDrive = () => {
    hoverLock.current = null;
    setHoverCat(null);
    setHoverItem(null);
  };

  const coveredStep =
    coveredIndex >= 0 && coveredIndex < COVERED_TOTAL
      ? coveredSteps[coveredIndex]
      : null;
  const coveredDone = coveredLinePhase === "done" && hoverCat == null;
  const focusCatIndex =
    hoverCat ??
    (coveredLinePhase === "done"
      ? coveredTopics.length - 1
      : (coveredStep?.catIndex ?? -1));
  const focusCat = focusCatIndex >= 0 ? coveredTopics[focusCatIndex] : null;
  const coveredPct =
    hoverCat != null
      ? Math.round(((hoverCat + 1) / coveredTopics.length) * 100)
      : coveredLinePhase === "done"
        ? 100
        : Math.round(
            ((Math.max(coveredIndex, 0) + (coveredStep ? 1 : 0)) /
              COVERED_TOTAL) *
              100,
          );
  const pathProgress =
    focusCatIndex < 0
      ? 0
      : Math.min(1, (focusCatIndex + 0.85) / coveredTopics.length);
  const travelerPt =
    focusCatIndex >= 0 ? coveredNodePoints[focusCatIndex] : null;

  return (
    <section
      id={id}
      className={`panel l30-covered ${className}`.trim()}
      aria-label="Пройдені теми A1"
    >
      <div className="l30-covered-head">
        <div>
          <p className="page-kicker">Lessons 1–29 · A1 roadmap</p>
          <h2>Що ми вже пройшли</h2>
          <p className="l30-covered-desc">
            Шлях фундаменту A1 — рядок за рядком. Наведи на точку або пункт
            збоку: маркер під’їде до неї.
          </p>
        </div>
        <div className="l30-covered-controls">
          {coveredPlaying ? (
            <button
              type="button"
              className="l30-covered-btn"
              onClick={skipCovered}
            >
              Пропустити →
            </button>
          ) : (
            <button
              type="button"
              className="l30-covered-btn"
              onClick={replayCovered}
            >
              ▶ Знову
            </button>
          )}
        </div>
      </div>

      <div
        className="l30-covered-progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={COVERED_TOTAL}
        aria-valuenow={
          coveredDone ? COVERED_TOTAL : Math.max(coveredIndex + 1, 0)
        }
        aria-label="Прогрес огляду тем"
      >
        <div className="l30-covered-progress-meta">
          <span>
            {coveredDone ? COVERED_TOTAL : Math.max(coveredIndex + 1, 0)} /{" "}
            {COVERED_TOTAL}
          </span>
          <span>{coveredPct}%</span>
        </div>
        <div className="l30-covered-progress-track">
          <div
            className="l30-covered-progress-fill"
            style={{ width: `${coveredPct}%` }}
          />
        </div>
      </div>

      <div className="l30-road" onMouseLeave={leaveDrive}>
        <aside className="l30-road-side l30-road-side--left">
          <p className="l30-road-side-label">Foundation</p>
          <ul>
            {coveredTopics.slice(0, 4).map((c, i) => (
              <li key={c.id}>
                <button
                  type="button"
                  className={`l30-road-side-btn${i === focusCatIndex ? " is-lit" : ""}${i < focusCatIndex ? " is-passed" : ""}`}
                  style={{ "--l30-cat-accent": c.accent } as CSSProperties}
                  onMouseEnter={() => driveToCat(i)}
                  onFocus={() => driveToCat(i)}
                >
                  <span>{c.node}</span>
                  {c.titleEn}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="l30-road-stage">
          <div className="l30-road-map">
            <svg
              className="l30-road-svg"
              viewBox="0 0 1000 560"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id={glowId}
                  x1="0%"
                  y1="100%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#2dd4bf" />
                  <stop offset="55%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#4ade80" />
                </linearGradient>
                <filter
                  id={blurId}
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="4" />
                </filter>
              </defs>
              <path
                className="l30-road-base"
                d={ROAD_PATH}
                fill="none"
                stroke="rgba(148,163,184,0.28)"
                strokeWidth="28"
                strokeLinecap="round"
              />
              <path
                className="l30-road-dash"
                d={ROAD_PATH}
                fill="none"
                stroke="rgba(226,232,240,0.35)"
                strokeWidth="2"
                strokeDasharray="10 14"
                strokeLinecap="round"
              />
              <path
                className="l30-road-progress"
                d={ROAD_PATH}
                fill="none"
                stroke={`url(#${glowId})`}
                strokeWidth="10"
                strokeLinecap="round"
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 1 - pathProgress,
                }}
                filter={`url(#${blurId})`}
              />
              <path
                className="l30-road-progress l30-road-progress--core"
                d={ROAD_PATH}
                fill="none"
                stroke={`url(#${glowId})`}
                strokeWidth="4"
                strokeLinecap="round"
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 1 - pathProgress,
                }}
              />
              {coveredTopics.map((cat, i) => {
                const pt = coveredNodePoints[i];
                const done = i < focusCatIndex;
                const active = i === focusCatIndex;
                return (
                  <g
                    key={cat.id}
                    className={`l30-road-node${done ? " is-done" : ""}${active ? " is-active" : ""}`}
                    transform={`translate(${pt.x} ${pt.y})`}
                  >
                    <circle
                      className="l30-road-node-ring"
                      r={active ? 28 : 20}
                      fill="rgba(15,23,42,0.85)"
                      stroke={cat.accent}
                      strokeWidth={active ? 3.5 : 2}
                    />
                    <circle
                      r={12}
                      fill={
                        done || active ? cat.accent : "rgba(100,116,139,0.7)"
                      }
                    />
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="l30-road-node-num"
                      fill="#0f172a"
                      fontSize="11"
                      fontWeight="800"
                    >
                      {done ? "✓" : cat.node}
                    </text>
                    <text
                      y={active ? 44 : 36}
                      textAnchor="middle"
                      className="l30-road-node-label"
                      fill={active || done ? "#e2e8f0" : "#64748b"}
                      fontSize="11"
                      fontWeight="700"
                    >
                      {cat.titleEn}
                    </text>
                  </g>
                );
              })}
              <g transform="translate(955 28)">
                <circle
                  r="16"
                  fill={coveredDone ? "#4ade80" : "rgba(100,116,139,0.5)"}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="12"
                  fill="#0f172a"
                  fontWeight="800"
                >
                  ★
                </text>
              </g>
            </svg>

            {travelerPt && (
              <div
                className="l30-road-traveler"
                style={
                  {
                    left: `${(travelerPt.x / 1000) * 100}%`,
                    top: `${(travelerPt.y / 560) * 100}%`,
                    "--l30-cat-accent": focusCat?.accent ?? "#2dd4bf",
                  } as CSSProperties
                }
                aria-hidden="true"
              >
                <span className="l30-road-traveler-glow" />
                <span className="l30-road-traveler-pin" />
              </div>
            )}

            {coveredTopics.map((cat, i) => {
              const pt = coveredNodePoints[i];
              return (
                <button
                  key={`hit-${cat.id}`}
                  type="button"
                  className={`l30-road-hit${i === focusCatIndex ? " is-active" : ""}`}
                  style={
                    {
                      left: `${(pt.x / 1000) * 100}%`,
                      top: `${(pt.y / 560) * 100}%`,
                      "--l30-cat-accent": cat.accent,
                    } as CSSProperties
                  }
                  aria-label={`${cat.titleUa}: ${cat.titleEn}`}
                  onMouseEnter={() => driveToCat(i)}
                  onFocus={() => driveToCat(i)}
                />
              );
            })}
          </div>

          <div className="l30-road-line-stage">
            {hoverCat != null && focusCat ? (
              <div
                key={`hover-${hoverCat}`}
                className="l30-road-line is-in l30-road-line--hover"
                style={
                  {
                    "--l30-cat-accent": focusCat.accent,
                  } as CSSProperties
                }
              >
                <div className="l30-road-line-meta">
                  <span className="l30-road-line-cat">
                    Під’їхали · {focusCat.titleUa}
                  </span>
                  <span className="l30-road-line-idx">
                    {focusCat.items.length} тем
                  </span>
                </div>
                {hoverItem != null && (
                  <p className="l30-road-line-text">
                    {focusCat.items[hoverItem]}
                  </p>
                )}
                <ul className="l30-road-hover-list">
                  {focusCat.items.map((item, itemIndex) => (
                    <li key={`${focusCat.id}-${itemIndex}`}>
                      <button
                        type="button"
                        className={
                          hoverItem === itemIndex ? "is-on" : undefined
                        }
                        onMouseEnter={() => driveToItem(hoverCat, itemIndex)}
                      >
                        <span
                          className="l30-road-hover-dot"
                          aria-hidden="true"
                        />
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : coveredDone ? (
              <div className="l30-road-line l30-road-line--done" role="status">
                <span className="l30-road-line-kicker">Path complete</span>
                <p>
                  Фундамент A1 зібрано. Наведи на точку — під’їдемо знову ↓
                </p>
              </div>
            ) : coveredStep ? (
              <div
                key={`${coveredRun}-${coveredStep.globalIndex}`}
                className={`l30-road-line is-${coveredLinePhase}`}
                style={
                  {
                    "--l30-cat-accent": coveredStep.cat.accent,
                  } as CSSProperties
                }
              >
                <div className="l30-road-line-meta">
                  <span className="l30-road-line-cat">
                    {coveredStep.cat.titleUa}
                  </span>
                  <span className="l30-road-line-idx">
                    {coveredStep.itemIndex + 1} / {coveredStep.cat.items.length}
                  </span>
                </div>
                <p className="l30-road-line-text">{coveredStep.text}</p>
              </div>
            ) : (
              <div className="l30-road-line l30-road-line--wait">
                <p>Старт шляху…</p>
              </div>
            )}
          </div>
        </div>

        <aside className="l30-road-side l30-road-side--right">
          <p className="l30-road-side-label">Skills</p>
          <ul>
            {coveredTopics.slice(4).map((c, i) => {
              const idx = i + 4;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    className={`l30-road-side-btn${idx === focusCatIndex ? " is-lit" : ""}${idx < focusCatIndex ? " is-passed" : ""}`}
                    style={{ "--l30-cat-accent": c.accent } as CSSProperties}
                    onMouseEnter={() => driveToCat(idx)}
                    onFocus={() => driveToCat(idx)}
                  >
                    <span>{c.node}</span>
                    {c.titleEn}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </section>
  );
}
