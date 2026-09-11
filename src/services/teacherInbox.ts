import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";

export type TeacherInboxItem = {
  key: string;
  source: "homework" | "writing";
  title: string;
  meta: string;
  reviewed: boolean;
  sortMs: number;
};

export type TeacherInboxSummary = {
  items: TeacherInboxItem[];
  newCount: number;
  homeworkDenied: boolean;
  writingDenied: boolean;
};

function timestampToMs(value: unknown): number {
  if (
    value &&
    typeof value === "object" &&
    "seconds" in value &&
    typeof (value as { seconds: unknown }).seconds === "number"
  ) {
    return (value as { seconds: number }).seconds * 1000;
  }
  if (typeof value === "string") {
    const ms = Date.parse(value);
    return Number.isNaN(ms) ? 0 : ms;
  }
  return 0;
}

function formatMs(ms: number): string | null {
  if (!ms) return null;
  return new Date(ms).toLocaleString();
}

export async function fetchTeacherInbox(): Promise<TeacherInboxSummary> {
  const items: TeacherInboxItem[] = [];
  let homeworkDenied = false;
  let writingDenied = false;

  try {
    const hwSnap = await getDocs(query(collection(db, "homeworkAnswers")));
    for (const docSnap of hwSnap.docs) {
      const d = docSnap.data();
      const sortMs = timestampToMs(d.createdAt);
      const lessonId = String(d.lessonId ?? "");
      items.push({
        key: `hw-${docSnap.id}`,
        source: "homework",
        title: `${d.studentName || "Учень"} — HW ${lessonId || "?"}`,
        meta: [formatMs(sortMs), d.quizDone ? "quiz done" : null]
          .filter(Boolean)
          .join(" · "),
        reviewed: Boolean(d.reviewed),
        sortMs,
      });
    }
  } catch {
    homeworkDenied = true;
  }

  try {
    const writingSnap = await getDocs(
      query(collection(db, "writingSubmissions")),
    );
    for (const docSnap of writingSnap.docs) {
      const d = docSnap.data();
      const sortMs =
        timestampToMs(d.serverCreatedAt) || timestampToMs(d.createdAt);
      const page =
        d.page === "self-study"
          ? "Self-study"
          : d.page === "about-me"
            ? "About me"
            : "Writing";
      items.push({
        key: `wr-${docSnap.id}`,
        source: "writing",
        title: `${d.name || "Учень"} — ${page}`,
        meta: formatMs(sortMs) ?? "",
        reviewed: Boolean(d.reviewed),
        sortMs,
      });
    }
  } catch {
    writingDenied = true;
  }

  items.sort((a, b) => b.sortMs - a.sortMs);
  return {
    items,
    newCount: items.filter((item) => !item.reviewed).length,
    homeworkDenied,
    writingDenied,
  };
}
