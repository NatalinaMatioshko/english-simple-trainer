import { Navigate, Route, Routes } from "react-router-dom";
import TrainerPage from "../pages/TrainerPage";
import Lessons from "../pages/Lessons";
import Homework from "../pages/Homework";
import HomeworkLesson from "../pages/HomeworkLesson";
import Lesson17 from "../pages/Lesson17";
import Home from "../pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trainer" element={<TrainerPage />} />
      <Route path="/lessons" element={<Lessons />} />
      <Route path="/lesson-16" element={<Navigate to="/trainer" replace />} />
      <Route path="/lesson-17" element={<Lesson17 />} />
      <Route path="/homework" element={<Homework />} />
      <Route path="/homework/:id" element={<HomeworkLesson />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
