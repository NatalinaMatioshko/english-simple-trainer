import { Outlet } from "react-router-dom";
import ScrollToTopButton from "../ScrollToTopButton";
import { Header } from "./Header";

export function SiteLayout() {
  return (
    <div className="site-layout">
      <Header />
      <div id="main-content" className="site-layout-content">
        <Outlet />
      </div>
      <ScrollToTopButton />
    </div>
  );
}
