import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StudentAuthCard } from "../components/auth/StudentAuthCard";
import { useAuth } from "../context/AuthContext";
import "../styles/pages.css";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/vocab", { replace: true });
    }
  }, [loading, user, navigate]);

  return (
    <div className="page-shell">
      <header className="page-hero panel">
        <p className="page-kicker">Акаунт учня</p>
        <h1>Увійти або зареєструватись</h1>
        <p className="page-subtitle">
          Після входу слова в словнику зберігаються на платформі. Вчитель їх
          теж бачить.
        </p>
      </header>
      <StudentAuthCard onSuccess={() => navigate("/vocab")} />
      <p style={{ marginTop: "1rem" }}>
        <Link className="back-link" to="/vocab">
          ← До словника
        </Link>
      </p>
    </div>
  );
}
