import { useRef, useState, type CSSProperties, type MouseEvent } from "react";
import "../styles/faceButton.css";

type Offset = { x: number; y: number };

const idle: Offset = { x: 0, y: 0 };

/** Desktop-only playful face — mouse-follow adapted from the CodePen (no GSAP). */
export function FaceButton() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [face, setFace] = useState<Offset>(idle);
  const [eyes, setEyes] = useState<Offset>(idle);
  const [hover, setHover] = useState(false);

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const root = rootRef.current;
    if (!root) return;

    const rect = root.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const nx = (mouseX - rect.width / 2) / rect.width;
    const ny = (mouseY - rect.height / 2) / rect.width;

    setFace({ x: nx * 50, y: ny * 50 });
    setEyes({ x: nx * 25, y: ny * 25 });
  };

  const onLeave = () => {
    setHover(false);
    setFace(idle);
    setEyes(idle);
  };

  const faceStyle = {
    "--face-x": `${face.x}px`,
    "--face-y": `${face.y}px`,
    "--face-scale": hover ? 0.975 : 1,
    "--eyes-x": `${eyes.x}px`,
    "--eyes-y": `${eyes.y}px`,
  } as CSSProperties;

  return (
    <div ref={rootRef} className="face-btn" aria-hidden="true">
      <button
        type="button"
        className="face-btn__button"
        tabIndex={-1}
        style={faceStyle}
        onMouseEnter={() => setHover(true)}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <span className="face-btn__face">
          <span className="face-btn__eye face-btn__eye--left" />
          <span className="face-btn__eye face-btn__eye--right" />
          <span className="face-btn__mouth" />
        </span>
      </button>
    </div>
  );
}
