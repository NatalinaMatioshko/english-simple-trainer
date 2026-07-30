import { Outlet } from "react-router-dom";
import ScrollToTopButton from "../ScrollToTopButton";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

export function SiteLayout() {
  return (
    <div className="site-layout">
      <Header />
      <MobileNav />
      <div id="main-content" className="site-layout-content">
        <Outlet />
      </div>
      <ScrollToTopButton />
    </div>
  );
}
