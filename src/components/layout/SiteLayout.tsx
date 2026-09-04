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
  const lessonMode = isLessonWorkspacePath(pathname);

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
    <div className="site-layout">
      <AppSidebar pathname={pathname} />
      <div className="app-main">
        <AppTopbar />
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
