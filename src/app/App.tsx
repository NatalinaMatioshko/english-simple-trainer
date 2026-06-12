import { Link, Navigate, Route, Routes } from "react-router-dom";
// import TrainerPage from "../pages/TrainerPage";
import Lessons from "../pages/Lessons";
import Homework from "../pages/Homework";
import TrainerPage from "../pages/TrainerPage";

function Home() {
  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>English Trainer</h1>
      <p>Choose a lesson, open the trainer, or check homework.</p>

      <nav style={{ display: "grid", gap: "1rem", marginTop: "1.5rem" }}>
        <Link to="/trainer">Open trainer</Link>
        <Link to="/lessons">Lessons</Link>
        <Link to="/homework">Homework</Link>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trainer" element={<TrainerPage />} />
      <Route path="/lessons" element={<Lessons />} />
      <Route path="/homework" element={<Homework />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
