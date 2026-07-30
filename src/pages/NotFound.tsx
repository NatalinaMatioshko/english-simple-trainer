import { Link } from "react-router-dom";
import "../styles/notFound.css";

export default function NotFound() {
  return (
    <div className="nf-page">
      <div className="nf-text" aria-hidden="true">
        <p>404</p>
      </div>

      <div className="nf-container" aria-hidden="true">
        <div className="nf-caveman">
          <div className="nf-leg">
            <div className="nf-foot">
              <div className="nf-fingers" />
            </div>
          </div>
          <div className="nf-leg">
            <div className="nf-foot">
              <div className="nf-fingers" />
            </div>
          </div>
          <div className="nf-shape">
            <div className="nf-circle" />
            <div className="nf-circle" />
          </div>
          <div className="nf-head">
            <div className="nf-eye">
              <div className="nf-nose" />
            </div>
            <div className="nf-mouth" />
          </div>
          <div className="nf-arm-right">
            <div className="nf-club" />
          </div>
        </div>

        <div className="nf-caveman">
          <div className="nf-leg">
            <div className="nf-foot">
              <div className="nf-fingers" />
            </div>
          </div>
          <div className="nf-leg">
            <div className="nf-foot">
              <div className="nf-fingers" />
            </div>
          </div>
          <div className="nf-shape">
            <div className="nf-circle" />
            <div className="nf-circle" />
          </div>
          <div className="nf-head">
            <div className="nf-eye">
              <div className="nf-nose" />
            </div>
            <div className="nf-mouth" />
          </div>
          <div className="nf-arm-right">
            <div className="nf-club" />
          </div>
        </div>
      </div>

      <div className="nf-copy">
        <p className="nf-kicker">Page not found</p>
        <h1>Ой! Цю сторінку ще не намалювали.</h1>
        <p className="nf-desc">
          Можливо, посилання застаріле — або печерні люди ще б’ються за цей
          маршрут.
        </p>
        <div className="nf-actions">
          <Link className="nf-btn" to="/">
            ← На головну
          </Link>
          <Link className="nf-btn nf-btn--ghost" to="/lessons">
            До уроків
          </Link>
        </div>
      </div>

      <a
        className="nf-credit"
        href="https://codepen.io/SofiaSergio/"
        target="_blank"
        rel="noreferrer"
      >
        animation by SofiaSergio on CodePen
      </a>
    </div>
  );
}
