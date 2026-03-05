import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";

const TradingPage = lazy(() => import("./pages/TradingPage.jsx"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage.jsx"));
const SignalsPage = lazy(() => import("./pages/SignalsPage.jsx"));
const CopyTradePage = lazy(() => import("./pages/CopyTradePage.jsx"));
const ReferralPage = lazy(() => import("./pages/ReferralPage.jsx"));
const ApiPage = lazy(() => import("./pages/ApiPage.jsx"));

function App() {
  return (
    <Suspense fallback={<div className="app-route-loading">Loading...</div>}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<TradingPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/signals" element={<SignalsPage />} />
          <Route path="/copy-trade" element={<CopyTradePage />} />
          <Route path="/referral" element={<ReferralPage />} />
          <Route path="/api" element={<ApiPage />} />
          <Route path="/trade" element={<Navigate replace to="/" />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
