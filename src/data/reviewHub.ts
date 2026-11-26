export type ReviewMaterial = {
  id: string;
  title: string;
  topic: string;
  level: string;
  blurb: string;
  /** Relative to site BASE_URL, e.g. materials/.../file.pdf */
  pdfPath: string;
  pages: number;
  tags: string[];
  relatedHw?: string;
  relatedLesson?: string;
};

export const reviewMaterials: ReviewMaterial[] = [
  {
    id: "preposition-geometry",
    title: "Preposition Geometry",
    topic: "in · on · at · places & surfaces",
    level: "A1–A2",
    blurb:
      "Повна презентація про прийменники місця через «геометрію»: всередині, на поверхні, у точці. Відкрий слайди, коли плутаєш in / on / at.",
    pdfPath: "materials/preposition-geometry/Preposition_Geometry.pdf",
    pages: 12,
    tags: ["prepositions", "place", "in/on/at", "visual"],
    relatedHw: "/hw-42",
    relatedLesson: "/lesson-42",
  },
  {
    id: "present-simple-blueprint",
    title: "Present Simple Blueprint",
    topic: "Present Simple · routines · do / does",
    level: "A1–A2",
    blurb:
      "Презентація-шпаргалка з Present Simple: форми, питання, заперечення та типові помилки. Відкрий, коли треба швидко повторити правило.",
    pdfPath: "materials/present-simple-blueprint/Present_Simple_Blueprint.pdf",
    pages: 11,
    tags: ["present simple", "routines", "do/does", "visual"],
    relatedHw: "/self-study",
    relatedLesson: "/lesson-22",
  },
];

export function getReviewMaterial(id: string): ReviewMaterial | undefined {
  return reviewMaterials.find((item) => item.id === id);
}

export function reviewPdfUrl(material: ReviewMaterial): string {
  const base = import.meta.env.BASE_URL || "/";
  const prefix = base.endsWith("/") ? base : `${base}/`;
  return `${prefix}${material.pdfPath}`;
}
