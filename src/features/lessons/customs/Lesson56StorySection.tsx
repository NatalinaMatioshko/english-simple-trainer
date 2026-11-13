import type { ReactNode } from "react";
import type { CustomSection } from "../../../types/lesson";
import "./lesson56Story.css";

type Panel = {
  id: string;
  label: string;
  caption?: string;
  /** Exact substrings of caption to show in bold (longer phrases first). */
  bold?: string[];
};

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Caption({ text, bold }: { text: string; bold?: string[] }) {
  const marks = [...(bold ?? [])].sort((a, b) => b.length - a.length);
  if (marks.length === 0) return <>{text}</>;
  const re = new RegExp(`(${marks.map(escapeRegExp).join("|")})`, "g");
  return (
    <>
      {text.split(re).map((part, i) =>
        marks.includes(part) ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>,
      )}
    </>
  );
}

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 200 124" className="l56-svg" aria-hidden="true">
      <rect width="200" height="124" fill="#f6f1e8" />
      <rect y="100" width="200" height="24" fill="#e7efe8" />
      <text x="12" y="20" fontSize="15" fontWeight="700" fill="#1f8a7a">
        {label}
      </text>
      {children}
    </svg>
  );
}

function Guy({ x, sad = true }: { x: number; sad?: boolean }) {
  return (
    <g transform={`translate(${x} 86)`}>
      <path d="M-12 -46 Q0 -58 12 -46" fill="#3d342c" />
      <circle cx="0" cy="-36" r="12" fill="#f6d3b4" stroke="#243044" strokeWidth="1.6" />
      <circle cx="-4" cy="-37" r="1.2" fill="#243044" />
      <circle cx="4" cy="-37" r="1.2" fill="#243044" />
      <path
        d={sad ? "M-4 -30 Q0 -34 4 -30" : "M-4 -32 Q0 -28 4 -32"}
        fill="none"
        stroke="#243044"
        strokeWidth="1.3"
      />
      <path d="M0 -24 L0 -2" stroke="#1f8a7a" strokeWidth="8" strokeLinecap="round" />
      <path d="M0 -16 L-12 -4 M0 -16 L12 -4" stroke="#1f8a7a" strokeWidth="3" strokeLinecap="round" />
      <path d="M0 -2 L-8 16 M0 -2 L8 16" stroke="#243044" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function Woman({ x, sad = true }: { x: number; sad?: boolean }) {
  return (
    <g transform={`translate(${x} 86)`}>
      <path d="M-14 -50 Q0 -64 14 -50 L13 -22 Q0 -12 -13 -22 Z" fill="#6b3f2a" />
      <circle cx="0" cy="-36" r="12" fill="#f6d3b4" stroke="#243044" strokeWidth="1.6" />
      <circle cx="-4" cy="-37" r="1.2" fill="#243044" />
      <circle cx="4" cy="-37" r="1.2" fill="#243044" />
      <path
        d={sad ? "M-4 -30 Q0 -34 4 -30" : "M-4 -32 Q0 -28 4 -32"}
        fill="none"
        stroke="#243044"
        strokeWidth="1.3"
      />
      <path d="M0 -24 L0 -2" stroke="#e07a5f" strokeWidth="8" strokeLinecap="round" />
      <path d="M0 -16 L-12 -4 M0 -16 L12 -4" stroke="#e07a5f" strokeWidth="3" strokeLinecap="round" />
      <path d="M0 -2 L-8 16 M0 -2 L8 16" stroke="#243044" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function Scene({ id, label }: { id: string; label: string }) {
  switch (id) {
    case "A":
      return (
        <Frame label={label}>
          <rect x="108" y="62" width="70" height="28" rx="6" fill="#f2c14e" stroke="#243044" strokeWidth="1.4" />
          <circle cx="124" cy="94" r="7" fill="#243044" />
          <circle cx="164" cy="94" r="7" fill="#243044" />
          <text x="143" y="80" textAnchor="middle" fontSize="9" fontWeight="700" fill="#243044">
            TAXI
          </text>
          <Guy x={58} />
          <text x="150" y="48" textAnchor="middle" fontSize="11" fill="#e07a5f" fontWeight="700">
            ££
          </text>
        </Frame>
      );
    case "B":
      return (
        <Frame label={label}>
          <rect x="120" y="40" width="56" height="60" fill="#d9e7ea" stroke="#243044" strokeWidth="1.4" />
          <rect x="140" y="72" width="16" height="28" fill="#243044" />
          <Guy x={70} />
          <path d="M88 70 L112 58" stroke="#e07a5f" strokeWidth="2" />
          <text x="118" y="52" fontSize="11" fill="#e07a5f" fontWeight="700">
            run!
          </text>
        </Frame>
      );
    case "C":
      return (
        <Frame label={label}>
          <rect x="96" y="58" width="78" height="28" rx="8" fill="#d9e7ea" stroke="#243044" strokeWidth="1.4" />
          <text x="135" y="42" textAnchor="middle" fontSize="16" fontWeight="700" fill="#e07a5f">
            8:00
          </text>
          <Guy x={48} />
        </Frame>
      );
    case "D":
      return (
        <Frame label={label}>
          <rect x="96" y="32" width="84" height="52" rx="4" fill="#243044" />
          <rect x="106" y="40" width="64" height="24" fill="#f2c14e" />
          <text x="138" y="56" textAnchor="middle" fontSize="10" fontWeight="700" fill="#243044">
            CLOSED
          </text>
          <Guy x={48} />
        </Frame>
      );
    case "E":
      return (
        <Frame label={label}>
          <rect x="108" y="68" width="64" height="8" fill="#c4b39a" />
          <path d="M128 68 L136 54 L156 54 L164 68 Z" fill="#e7c07a" stroke="#243044" strokeWidth="1.2" />
          <text x="146" y="46" textAnchor="middle" fontSize="12" fill="#e07a5f">
            ✕
          </text>
          <Guy x={52} />
        </Frame>
      );
    case "F":
      return (
        <Frame label={label}>
          <rect x="108" y="34" width="64" height="52" rx="4" fill="#fff" stroke="#243044" strokeWidth="1.4" />
          <path d="M118 58 H162" stroke="#e07a5f" strokeWidth="2" />
          <text x="140" y="52" textAnchor="middle" fontSize="9" fill="#243044">
            meeting
          </text>
          <Guy x={48} />
        </Frame>
      );
    case "G":
      return (
        <Frame label={label}>
          <rect x="70" y="28" width="112" height="18" fill="#e07a5f" />
          <text x="126" y="41" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">
            RESTAURANT
          </text>
          <circle cx="100" cy="70" r="8" fill="#f6d3b4" stroke="#243044" />
          <circle cx="122" cy="74" r="8" fill="#f6d3b4" stroke="#243044" />
          <circle cx="144" cy="68" r="8" fill="#f6d3b4" stroke="#243044" />
          <circle cx="166" cy="76" r="8" fill="#f6d3b4" stroke="#243044" />
          <Guy x={36} />
        </Frame>
      );
    case "H":
      return (
        <Frame label={label}>
          <path d="M130 70 L140 52 L162 52 L172 70 Z" fill="#e7c07a" stroke="#243044" strokeWidth="1.2" />
          <text x="150" y="44" textAnchor="middle" fontSize="10" fill="#1f8a7a" fontWeight="700">
            buy
          </text>
          <Guy x={52} />
        </Frame>
      );
    case "I":
      return (
        <Frame label={label}>
          <Guy x={52} />
          <g transform="translate(140 78)">
            <circle cx="0" cy="-28" r="12" fill="#f6d3b4" stroke="#243044" strokeWidth="1.6" />
            <path d="M-4 -22 Q0 -18 4 -22" fill="none" stroke="#e07a5f" strokeWidth="1.4" />
            <path d="M0 -16 L0 4" stroke="#243044" strokeWidth="8" strokeLinecap="round" />
          </g>
        </Frame>
      );
    case "J":
      return (
        <Frame label={label}>
          <rect x="112" y="40" width="62" height="40" rx="3" fill="#d9e7ea" stroke="#243044" strokeWidth="1.4" />
          <path d="M122 48 L164 72 M164 48 L122 72" stroke="#e07a5f" strokeWidth="2" />
          <Guy x={48} />
        </Frame>
      );
    case "K":
      return (
        <Frame label={label}>
          <rect x="128" y="58" width="22" height="36" rx="3" fill="#fff" stroke="#243044" strokeWidth="1.4" strokeDasharray="3 2" />
          <text x="139" y="52" textAnchor="middle" fontSize="12" fill="#e07a5f">
            ?
          </text>
          <Guy x={52} />
        </Frame>
      );
    case "L":
      return (
        <Frame label={label}>
          <Guy x={48} />
          <g transform="translate(138 86)">
            <circle cx="0" cy="-36" r="12" fill="#f6d3b4" stroke="#243044" strokeWidth="1.6" />
            <path d="M0 -24 L0 -2" stroke="#243044" strokeWidth="8" strokeLinecap="round" />
            <path d="M-16 -8 H-4" stroke="#243044" strokeWidth="1.4" />
          </g>
          <text x="108" y="48" fontSize="10" fill="#243044">
            work
          </text>
        </Frame>
      );
    case "carlaA":
      return (
        <Frame label={label}>
          <rect x="112" y="58" width="58" height="36" rx="3" fill="#d9e7ea" stroke="#243044" strokeWidth="1.4" />
          <path d="M124 70 H158 M124 78 H148" stroke="#243044" strokeWidth="1.4" />
          <Woman x={52} />
        </Frame>
      );
    case "carlaB":
      return (
        <Frame label={label}>
          <rect x="124" y="48" width="28" height="46" rx="4" fill="#243044" />
          <circle cx="138" cy="62" r="6" fill="#f2c14e" />
          <path d="M134 74 H142" stroke="#fff" strokeWidth="1.4" />
          <Woman x={52} />
        </Frame>
      );
    case "carlaC":
      return (
        <Frame label={label}>
          <rect x="128" y="36" width="46" height="28" rx="4" fill="#1f8a7a" />
          <circle cx="140" cy="78" r="6" fill="#243044" />
          <circle cx="164" cy="78" r="6" fill="#243044" />
          <path d="M118 96 L132 70" stroke="#c4b39a" strokeWidth="4" />
          <Woman x={48} />
        </Frame>
      );
    default:
      return (
        <Frame label={label}>
          <text x="100" y="70" textAnchor="middle" fontSize="14" fill="#243044">
            {label}
          </text>
        </Frame>
      );
  }
}

/** Original story cards for Lesson 56 (bad-day panels and Carla’s photos). */
export function Lesson56StorySection({ section }: { section: CustomSection }) {
  const panels = (section.props?.panels as Panel[] | undefined) ?? [];

  return (
    <section id={section.id} className="lw-block panel">
      <div className="lw-section-head">
        {section.kicker ? <p className="page-kicker">{section.kicker}</p> : null}
        <h2>{section.title}</h2>
        {section.description ? <p className="lw-section-desc">{section.description}</p> : null}
      </div>
      <ul className="l56-grid">
        {panels.map((panel) => (
          <li key={panel.id}>
            <figure className="l56-card">
              <Scene id={panel.id} label={panel.label} />
              <figcaption>
                <span className="l56-letter">{panel.label}</span>
                {panel.caption ? <Caption text={panel.caption} bold={panel.bold} /> : null}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      {section.note ? <p className="lw-section-desc">{section.note}</p> : null}
    </section>
  );
}
