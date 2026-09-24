import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import { SiteLayout } from "../components/layout/SiteLayout";

/** Lightweight shell-only fallback while a route chunk loads. */
function RouteFallback() {
  return (
    <div className="page-shell" role="status" aria-live="polite">
      <section className="panel" style={{ padding: "1.25rem 1.5rem" }}>
        <p className="page-kicker">Loading</p>
        <h1 style={{ margin: "0.25rem 0 0", fontSize: "1.25rem" }}>…</h1>
      </section>
    </div>
  );
}

const TrainerPage = lazy(() => import("../pages/TrainerPage"));
const Lessons = lazy(() => import("../pages/Lessons"));
const Homework = lazy(() => import("../pages/Homework"));
const HomeworkLesson = lazy(() => import("../pages/HomeworkLesson"));
const AdminSubmissions = lazy(() => import("../pages/AdminSubmissions"));
const LessonAnalyses = lazy(() => import("../pages/LessonAnalyses"));
const LessonAnalysisPage = lazy(() => import("../pages/LessonAnalysisPage"));
const Lesson15 = lazy(() => import("../pages/Lesson15"));
const Lesson16 = lazy(() => import("../pages/Lesson16"));
const Lesson17 = lazy(() => import("../pages/Lesson17"));
const Lesson18 = lazy(() => import("../pages/Lesson18"));
const Lesson19 = lazy(() => import("../pages/Lesson19"));
const Lesson20 = lazy(() => import("../pages/Lesson20"));
const Lesson21 = lazy(() => import("../pages/Lesson21"));
const Lesson22 = lazy(() => import("../pages/Lesson22"));
const Lesson23 = lazy(() => import("../pages/Lesson23"));
const Lesson24 = lazy(() => import("../pages/Lesson24"));
const Lesson25 = lazy(() => import("../pages/Lesson25"));
const HW25 = lazy(() => import("../pages/HW25"));
const Lesson26 = lazy(() => import("../pages/Lesson26"));
const HW26 = lazy(() => import("../pages/HW26"));
const Lesson27 = lazy(() => import("../pages/Lesson27"));
const HW27 = lazy(() => import("../pages/HW27"));
const Lesson28 = lazy(() => import("../pages/Lesson28"));
const HW28 = lazy(() => import("../pages/HW28"));
const Lesson29 = lazy(() => import("../pages/Lesson29"));
const HW29 = lazy(() => import("../pages/HW29"));
const Lesson30 = lazy(() => import("../pages/Lesson30"));
const HW30 = lazy(() => import("../pages/HW30"));
const Lesson31 = lazy(() => import("../pages/Lesson31"));
const HW31 = lazy(() => import("../pages/HW31"));
const HW32 = lazy(() => import("../pages/HW32"));
const HW33 = lazy(() => import("../pages/HW33"));
const HW34 = lazy(() => import("../pages/HW34"));
const Lesson32 = lazy(() => import("../pages/Lesson32"));
const Lesson33 = lazy(() => import("../pages/Lesson33"));
const Lesson34 = lazy(() => import("../pages/Lesson34"));
const Lesson35 = lazy(() => import("../pages/Lesson35"));
const HW35 = lazy(() => import("../pages/HW35"));
const Lesson36 = lazy(() => import("../pages/Lesson36"));
const HW36 = lazy(() => import("../pages/HW36"));
const Lesson37 = lazy(() => import("../pages/Lesson37"));
const HW37 = lazy(() => import("../pages/HW37"));
const Lesson38 = lazy(() => import("../pages/Lesson38"));
const HW38 = lazy(() => import("../pages/HW38"));
const Lesson39 = lazy(() => import("../pages/Lesson39"));
const HW39 = lazy(() => import("../pages/HW39"));
const Lesson40 = lazy(() => import("../pages/Lesson40"));
const HW40 = lazy(() => import("../pages/HW40"));
const Lesson41 = lazy(() => import("../pages/Lesson41"));
const HW41 = lazy(() => import("../pages/HW41"));
const HW42 = lazy(() => import("../pages/HW42"));
const HW43 = lazy(() => import("../pages/HW43"));
const Lesson42 = lazy(() => import("../pages/Lesson42"));
const LessonPage = lazy(() => import("../features/lessons/LessonPage"));
const A1LevelTest = lazy(() => import("../pages/A1LevelTest"));
const ExtraResources = lazy(() => import("../pages/ExtraResources"));
const ReviewHub = lazy(() => import("../pages/ReviewHub"));
const ReviewMaterialPage = lazy(() => import("../pages/ReviewMaterialPage"));
const VocabPage = lazy(() => import("../pages/VocabPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const SelfStudyReview = lazy(() => import("../pages/SelfStudyReview"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Home = lazy(() => import("../pages/Home"));
const RoadmapPage = lazy(() => import("../pages/RoadmapPage"));
const AboutMePage = lazy(() =>
  import("../components/AboutMePage/AboutMePage").then((m) => ({
    default: m.AboutMePage,
  })),
);

function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<RoadmapPage />} />
          <Route path="/roadmap" element={<Navigate to="/" replace />} />
          <Route path="/cabinet" element={<Home />} />
          <Route path="/trainer" element={<TrainerPage />} />
          <Route path="/vocab" element={<VocabPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lessons/:lessonId" element={<LessonPage />} />
          <Route path="/extra-resources" element={<ExtraResources />} />
          <Route path="/review" element={<ReviewHub />} />
          <Route path="/review/:id" element={<ReviewMaterialPage />} />
          <Route path="/lesson-15" element={<Lesson15 />} />
          <Route path="/lesson-16" element={<Lesson16 />} />
          <Route path="/lesson-17" element={<Lesson17 />} />
          <Route path="/lesson-18" element={<Lesson18 />} />
          <Route path="/lesson-19" element={<Lesson19 />} />
          <Route path="/lesson-20" element={<Lesson20 />} />
          <Route path="/lesson-21" element={<Lesson21 />} />
          <Route path="/lesson-22" element={<Lesson22 />} />
          <Route path="/lesson-23" element={<Lesson23 />} />
          <Route path="/lesson-24" element={<Lesson24 />} />
          <Route path="/lesson-25" element={<Lesson25 />} />
          <Route path="/hw-25" element={<HW25 />} />
          <Route path="/lesson-26" element={<Lesson26 />} />
          <Route path="/hw-26" element={<HW26 />} />
          <Route path="/lesson-27" element={<Lesson27 />} />
          <Route path="/hw-27" element={<HW27 />} />
          <Route path="/lesson-28" element={<Lesson28 />} />
          <Route path="/hw-28" element={<HW28 />} />
          <Route path="/lesson-29" element={<Lesson29 />} />
          <Route path="/hw-29" element={<HW29 />} />
          <Route path="/lesson-30" element={<Lesson30 />} />
          <Route path="/hw-30" element={<HW30 />} />
          <Route path="/lesson-31" element={<Lesson31 />} />
          <Route path="/hw-31" element={<HW31 />} />
          <Route path="/lesson-32" element={<Lesson32 />} />
          <Route path="/hw-32" element={<HW32 />} />
          <Route path="/hw-33" element={<HW33 />} />
          <Route path="/lesson-33" element={<Lesson33 />} />
          <Route path="/lesson-34" element={<Lesson34 />} />
          <Route path="/hw-34" element={<HW34 />} />
          <Route path="/lesson-35" element={<Lesson35 />} />
          <Route path="/hw-35" element={<HW35 />} />
          <Route path="/lesson-36" element={<Lesson36 />} />
          <Route path="/hw-36" element={<HW36 />} />
          <Route path="/lesson-37" element={<Lesson37 />} />
          <Route path="/hw-37" element={<HW37 />} />
          <Route path="/lesson-38" element={<Lesson38 />} />
          <Route path="/hw-38" element={<HW38 />} />
          <Route path="/lesson-39" element={<Lesson39 />} />
          <Route path="/hw-39" element={<HW39 />} />
          <Route path="/lesson-40" element={<Lesson40 />} />
          <Route path="/hw-40" element={<HW40 />} />
          <Route path="/lesson-41" element={<Lesson41 />} />
          <Route path="/hw-41" element={<HW41 />} />
          <Route path="/hw-42" element={<HW42 />} />
          <Route path="/hw-43" element={<HW43 />} />
          <Route path="/lesson-42" element={<Lesson42 />} />
          <Route path="/a1-level-test" element={<A1LevelTest />} />
          <Route path="/self-study" element={<SelfStudyReview />} />
          <Route path="/about-me" element={<AboutMePage />} />
          <Route path="/homework" element={<Homework />} />
          <Route path="/homework/:id" element={<HomeworkLesson />} />
          <Route path="/admin/submissions" element={<AdminSubmissions />} />
          <Route path="/admin/analyses" element={<LessonAnalyses />} />
          <Route path="/admin/analyses/:id" element={<LessonAnalysisPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}
