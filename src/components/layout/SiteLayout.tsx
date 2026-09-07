import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTopButton from "../ScrollToTopButton";
import { AppSidebar } from "./AppSidebar";
import { AppTopbar } from "./AppTopbar";
import { LessonOutline } from "./LessonOutline";
import { MobileNav } from "./MobileNav";
import { isLessonWorkspacePath } from "../../utils/appNav";
import "../../styles/appShell.css";

export function SiteLayout() {
  const { pathname, hash } = useLocation();
  const [lessonMain, setLessonMain] = useState<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [narrowScreen, setNarrowScreen] = useState(false);
  const lessonMode = isLessonWorkspacePath(pathname);
  const drawerActive = narrowScreen && menuOpen;

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1366px)");
    const sync = () => {
      setNarrowScreen(mq.matches);
      if (!mq.matches) setMenuOpen(false);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!drawerActive) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [drawerActive]);

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    if (!id) return;

    const scrollToHash = () => {
      const el = document.getElementById(id);
      if (!el) return false;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    };

    if (scrollToHash()) return;
    const firstTry = window.setTimeout(scrollToHash, 80);
    const secondTry = window.setTimeout(scrollToHash, 320);
    return () => {
      window.clearTimeout(firstTry);
      window.clearTimeout(secondTry);
    };
  }, [pathname, hash]);

  return (
    <div className={`site-layout${drawerActive ? " is-menu-open" : ""}`}>
      <AppTopbar menuOpen={drawerActive} onMenuToggle={() => setMenuOpen((v) => !v)} />
      <button
        type="button"
        className={`app-sidebar-backdrop${drawerActive ? " is-open" : ""}`}
        aria-label="Закрити меню"
        aria-hidden={!drawerActive}
        tabIndex={drawerActive ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />
      <AppSidebar
        pathname={pathname}
        open={drawerActive}
        onCollapse={() => setMenuOpen(false)}
        inertWhenClosed={narrowScreen}
      />
      <div className="app-main">
        <MobileNav />
        <div id="main-content" className="app-content" tabIndex={-1}>
          {lessonMode ? (
            <div className="lesson-workspace">
              <div className="lesson-workspace-main" ref={setLessonMain}>
                <Outlet />
              </div>
              <LessonOutline container={lessonMain} />
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
