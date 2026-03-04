import { Navigate, Route, Routes } from "react-router-dom";
import TradingPage from "./pages/TradingPage.jsx";
import AppLayout from "./layouts/AppLayout.jsx";
import PortfolioPage from "./pages/PortfolioPage.jsx";
import SignalsPage from "./pages/SignalsPage.jsx";
import CopyTradePage from "./pages/CopyTradePage.jsx";
import ReferralPage from "./pages/ReferralPage.jsx";
import ApiPage from "./pages/ApiPage.jsx";

function App() {
  return (
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
  );
}

export default App;
