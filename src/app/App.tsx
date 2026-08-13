import { Route, Routes } from "react-router-dom";
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
import Lesson26 from "../pages/Lesson26";
import HW26 from "../pages/HW26";
import Lesson27 from "../pages/Lesson27";
import HW27 from "../pages/HW27";
import Lesson28 from "../pages/Lesson28";
import HW28 from "../pages/HW28";
import Lesson29 from "../pages/Lesson29";
import HW29 from "../pages/HW29";
import Lesson30 from "../pages/Lesson30";
import HW30 from "../pages/HW30";
import Lesson31 from "../pages/Lesson31";
import Lesson32 from "../pages/Lesson32";
import A1LevelTest from "../pages/A1LevelTest";
import ExtraResources from "../pages/ExtraResources";
import VocabPage from "../pages/VocabPage";
import SelfStudyReview from "../pages/SelfStudyReview";
import NotFound from "../pages/NotFound";

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
        <Route path="/lesson-32" element={<Lesson32 />} />
        <Route path="/a1-level-test" element={<A1LevelTest />} />
        <Route path="/self-study" element={<SelfStudyReview />} />
        <Route path="/about-me" element={<AboutMePage />} />
        <Route path="/homework" element={<Homework />} />
        <Route path="/homework/:id" element={<HomeworkLesson />} />
        <Route path="/admin/submissions" element={<AdminSubmissions />} />
        <Route path="*" element={<NotFound />} />
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
