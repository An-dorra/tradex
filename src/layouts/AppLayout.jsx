import { Outlet, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import Header from "./Header.jsx";
import TradeFooter from "./TradeFooter.jsx";
import "./AppLayout.css";

const HIDE_FOOTER_ON_MOBILE_ROUTES = new Set(["/", "/copy-trade", "/portfolio", "/signals", "/referral", "/api"]);

function AppLayout() {
  const location = useLocation();
  const { pathname } = location;
  const shouldHideFooterOnMobile = HIDE_FOOTER_ON_MOBILE_ROUTES.has(pathname);

  useLayoutEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTop();
    const rafId = window.requestAnimationFrame(scrollToTop);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [location.key]);

  return (
    <div className={`app-layout${shouldHideFooterOnMobile ? " app-layout--mobile-no-footer" : ""}`}>
      <Header />
      <main className="app-layout-content">
        <Outlet />
      </main>
      <TradeFooter />
    </div>
  );
}

export default AppLayout;
