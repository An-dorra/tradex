import { Navigate, Route, Routes } from "react-router-dom";
import TradingPage from "./pages/TradingPage.jsx";
import Header from "./layouts/Header.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<TradingPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}

export default App;
