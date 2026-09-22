import { Link, useParams } from "react-router-dom";
import { PrepositionGeometryPractice } from "../components/review/PrepositionGeometryPractice";
import {
  getReviewMaterial,
  reviewPdfUrl,
} from "../data/reviewHub";
import "../styles/pages.css";
import "../styles/reviewHub.css";

export default function ReviewMaterialPage() {
  const { id = "" } = useParams();
  const material = getReviewMaterial(id);

  if (!material) {
    return (
      <div className="page-shell">
        <header className="page-hero panel">
          <p className="page-kicker">Review</p>
          <h1>Матеріал не знайдено</h1>
          <p className="page-subtitle">
            Перевір посилання або повернись до списку повторення.
          </p>
          <Link className="action-btn secondary" to="/review">
            ← До повторення
          </Link>
        </header>
      </div>
    );
  }

  const pdfUrl = reviewPdfUrl(material);
  const isPrepGeo = material.id === "preposition-geometry";

  return (
    <div className="page-shell review-material">
      <header className="page-hero panel">
        <p className="page-kicker">
          Review · {material.level} · {material.pages} slides
        </p>
        <h1>{material.title}</h1>
        <p className="page-subtitle">{material.blurb}</p>
        <p className="review-hub-topic">{material.topic}</p>
        <div className="review-hub-actions">
          <Link className="action-btn secondary" to="/review">
            ← Усі матеріали
          </Link>
          {isPrepGeo ? (
            <a className="action-btn primary" href="#review-practice">
              До вправ ↓
            </a>
          ) : null}
          <a
            className={`action-btn ${isPrepGeo ? "secondary" : "primary"}`}
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open PDF
          </a>
          <a className="action-btn secondary" href={pdfUrl} download>
            Download
          </a>
          {material.relatedLesson ? (
            <Link className="action-btn secondary" to={material.relatedLesson}>
              Lesson
            </Link>
          ) : null}
          {material.relatedHw ? (
            <Link className="action-btn secondary" to={material.relatedHw}>
              HW
            </Link>
          ) : null}
        </div>
      </header>

      {isPrepGeo ? (
        <section className="panel review-cheat">
          <p className="page-kicker">Quick reminder</p>
          <h2>in · on · at (place)</h2>
          <div className="review-cheat-grid">
            <article>
              <h3>in</h3>
              <p>всередині простору / контейнера</p>
              <ul>
                <li>in the room</li>
                <li>in the bookshop</li>
                <li>in the car</li>
              </ul>
            </article>
            <article>
              <h3>on</h3>
              <p>на поверхні</p>
              <ul>
                <li>on the table</li>
                <li>on the wall</li>
                <li>on the floor</li>
              </ul>
            </article>
            <article>
              <h3>at</h3>
              <p>точка / місце як «пункт»</p>
              <ul>
                <li>at work</li>
                <li>at school</li>
                <li>at the door</li>
              </ul>
            </article>
          </div>
          <p className="review-cheat-note">
            Спочатку презентація нижче, потім вправи для перевірки. Шпаргалка —
            швидке нагадування перед тестом.
          </p>
        </section>
      ) : null}

      <section className="panel review-pdf-block">
        <div className="review-pdf-toolbar">
          <p className="page-kicker">Full presentation</p>
          <h2>Усі слайди PDF</h2>
          <p className="review-pdf-hint">
            Листай у вікні нижче. Якщо на телефоні PDF не відкривається всередині
            сторінки — натисни <strong>Open PDF</strong>. Після перегляду — вправи
            внизу.
          </p>
        </div>
        <div className="review-pdf-frame-wrap">
          <iframe
            className="review-pdf-frame"
            title={material.title}
            src={`${pdfUrl}#toolbar=1&navpanes=0`}
          />
        </div>
        <p className="review-pdf-fallback">
          Альтернатива:{" "}
          <a href={pdfUrl} target="_blank" rel="noreferrer">
            відкрити PDF у новій вкладці
          </a>
          .
        </p>
      </section>

      {isPrepGeo ? <PrepositionGeometryPractice /> : null}
    </div>
  );
}
