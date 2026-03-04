import logo from "../assets/images/logo.svg";
import { Link, NavLink } from "react-router-dom";
import navTrade from "../assets/icons/nav-trade.svg";
import navPortfolio from "../assets/icons/nav-portfolio.svg";
import navSignals from "../assets/icons/nav-signals.svg";
import navCopyTrade from "../assets/icons/nav-copy-trade.svg";
import navReferral from "../assets/icons/nav-referral.svg";
import navApi from "../assets/home/icons/header_api_fill.svg";
import walletIcon from "../assets/icons/wallet.svg";
import languageIcon from "../assets/icons/language.svg";
import settingsIcon from "../assets/icons/header-setting.svg";
import "./Header.css";

const assets = {
  logo,
  trade: navTrade,
  portfolio: navPortfolio,
  signals: navSignals,
  copyTrade: navCopyTrade,
  referral: navReferral,
  api: navApi,
  wallet: walletIcon,
  language: languageIcon,
  settings: settingsIcon,
};

const navItems = [
  { label: "Trade", icon: assets.trade, to: "/", className: "otx-nav-trade" },
  { label: "Portfolio", icon: assets.portfolio, to: "/portfolio" },
  { label: "Signals", icon: assets.signals, to: "/signals" },
  { label: "Copy Trade", icon: assets.copyTrade, to: "/copy-trade" },
  { label: "Referral", icon: assets.referral, to: "/referral" },
  { label: "API Management", icon: assets.api, to: "/api" },
];

function Header() {
  return (
    <header className="otx-header otx-header--trade">
      <div className="otx-header-left">
        <Link to="/" className="otx-logo" aria-label="Go Trade">
          <img className="otx-logo-img" src={assets.logo} alt="OrTradeX" />
        </Link>

        <nav className="otx-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) => `${item.className ?? ""} otx-nav-item${isActive ? " is-active" : ""}`}
            >
              <span className="otx-nav-icon" aria-hidden="true">
                <img src={item.icon} alt="" />
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="otx-header-right">
        <button className="otx-wallet-btn" type="button">
          <span className="otx-wallet-icon" aria-hidden="true">
            <img src={assets.wallet} alt="" />
          </span>
          <span>Connect Wallet</span>
        </button>
        <button className="otx-icon-btn" type="button" aria-label="Language">
          <img src={assets.language} alt="" />
        </button>
        <button className="otx-icon-btn" type="button" aria-label="Settings">
          <img src={assets.settings} alt="" />
        </button>
      </div>
    </header>
  );
}

export default Header;
