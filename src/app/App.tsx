import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeContext";
import { SiteLayout } from "../components/layout/SiteLayout";
import TrainerPage from "../pages/TrainerPage";
import Lessons from "../pages/Lessons";
import Homework from "../pages/Homework";
import HomeworkLesson from "../pages/HomeworkLesson";
import AdminSubmissions from "../pages/AdminSubmissions";
import Lesson15 from "../pages/Lesson15";
import Lesson16 from "../pages/Lesson16";
import Lesson17 from "../pages/Lesson17";
import Lesson18 from "../pages/Lesson18";
import Lesson19 from "../pages/Lesson19";
import Lesson20 from "../pages/Lesson20";
import Lesson21 from "../pages/Lesson21";
import Lesson22 from "../pages/Lesson22";
import Lesson23 from "../pages/Lesson23";
import Lesson24 from "../pages/Lesson24";
import Lesson25 from "../pages/Lesson25";
import HW25 from "../pages/HW25";
import ExtraResources from "../pages/ExtraResources";
import VocabPage from "../pages/VocabPage";
import SelfStudyReview from "../pages/SelfStudyReview";

import Home from "../pages/Home";
import { AboutMePage } from "../components/AboutMePage/AboutMePage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/trainer" element={<TrainerPage />} />
        <Route path="/vocab" element={<VocabPage />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/extra-resources" element={<ExtraResources />} />
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
        <Route path="/self-study" element={<SelfStudyReview />} />
        <Route path="/about-me" element={<AboutMePage />} />
        <Route path="/homework" element={<Homework />} />
        <Route path="/homework/:id" element={<HomeworkLesson />} />
        <Route path="/admin/submissions" element={<AdminSubmissions />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}
