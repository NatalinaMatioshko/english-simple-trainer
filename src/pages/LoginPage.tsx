import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StudentAuthCard } from "../components/auth/StudentAuthCard";
import { useAuth } from "../context/AuthContext";
import "../styles/pages.css";

export default function LoginPage() {
  const { user, loading, isTeacher } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate(isTeacher ? "/cabinet" : "/vocab", { replace: true });
    }
  }, [loading, user, isTeacher, navigate]);

  return (
    <div className="page-shell">
      <header className="page-hero panel">
        <p className="page-kicker">Акаунт</p>
        <h1>Увійти або зареєструватись</h1>
        <p className="page-subtitle">
          Учень зберігає свої слова на платформі. Вчитель після Google-входу
          бачить кабінет: роботи, слова учня і поточний урок.
        </p>
      </header>
      <StudentAuthCard />
      <p style={{ marginTop: "1rem" }}>
        <Link className="back-link" to="/vocab">
          ← До словника
        </Link>
      </p>
    </div>
  );
}
