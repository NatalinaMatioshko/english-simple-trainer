import { Navigate, Route, Routes } from "react-router-dom";
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

import Home from "../pages/Home";
import { AboutMePage } from "../components/AboutMePage/AboutMePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trainer" element={<TrainerPage />} />
      <Route path="/lessons" element={<Lessons />} />
      <Route path="/lesson-15" element={<Lesson15 />} />
      <Route path="/lesson-16" element={<Lesson16 />} />
      <Route path="/lesson-17" element={<Lesson17 />} />
      <Route path="/lesson-18" element={<Lesson18 />} />
      <Route path="/lesson-19" element={<Lesson19 />} />
      <Route path="/lesson-20" element={<Lesson20 />} />
      <Route path="/lesson-21" element={<Lesson21 />} />
      <Route path="/about-me" element={<AboutMePage />} />

      <Route path="/homework" element={<Homework />} />
      <Route path="/homework/:id" element={<HomeworkLesson />} />
      <Route path="/admin/submissions" element={<AdminSubmissions />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
