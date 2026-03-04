import { Outlet, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import Header from "./Header.jsx";
import TradeFooter from "./TradeFooter.jsx";
import "./AppLayout.css";

function AppLayout() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app-layout">
      <Header />
      <main className="app-layout-content">
        <Outlet />
      </main>
      <TradeFooter />
    </div>
  );
}

export default AppLayout;
