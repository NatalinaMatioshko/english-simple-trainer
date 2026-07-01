import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider, useThemeContext } from "../context/ThemeContext";
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

function GlobalThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();
  const { pathname } = useLocation();

  if (pathname === "/trainer") return null;

  return (
    <button
      className="global-theme-btn"
      onClick={toggleTheme}
      aria-label="Змінити тему"
      title={theme === "dark" ? "Світла тема" : "Темна тема"}
    >
      {theme === "dark" ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

function AppRoutes() {
  return (
    <>
      <GlobalThemeToggle />
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
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}
