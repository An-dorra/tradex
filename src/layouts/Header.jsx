import { useEffect, useRef, useState } from "react";
import logo from "../assets/images/logo.svg";
import { Link, NavLink, useLocation } from "react-router-dom";
import navTrade from "../assets/icons/route-trade.svg";
import navPortfolio from "../assets/icons/route-portfolio.svg";
import navSignals from "../assets/icons/route-signals.svg";
import navCopyTrade from "../assets/icons/route-copy-trade.svg";
import navReferral from "../assets/icons/route-referral.svg";
import navApi from "../assets/icons/route-api.svg";
import walletIcon from "../assets/icons/wallet.svg";
import languageIcon from "../assets/icons/language.svg";
import menuIcon from "../assets/icons/menu.svg";
import SlideDialog from "../components/SlideDialog.jsx";
import useIsMobileViewport from "../hooks/useIsMobileViewport.js";
import useClickOutside from "../hooks/useClickOutside.js";
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
  menu: menuIcon,
};

const navItems = [
  { label: "Trade", icon: assets.trade, to: "/", className: "otx-nav-trade" },
  { label: "Portfolio", icon: assets.portfolio, to: "/portfolio" },
  { label: "Signals", icon: assets.signals, to: "/signals" },
  { label: "Copy Trade", icon: assets.copyTrade, to: "/copy-trade" },
  { label: "Referral", icon: assets.referral, to: "/referral" },
  { label: "API Management", icon: assets.api, to: "/api" },
];

const mobileMenuItems = [
  { label: "Trade", to: "/" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Copy Trade", to: "/copy-trade" },
  { label: "Signals", to: "/signals" },
  { label: "Referral", to: "/referral" },
  { label: "Api Management", to: "/api" },
];

function Header() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [isWalletMenuOpen, setWalletMenuOpen] = useState(false);
  const isMobileViewport = useIsMobileViewport();
  const walletMenuRef = useRef(null);
  const connectedWalletAddress = "0x7552b93da2437f89ac86db040f934be74cb44e03";
  const connectedWalletLabel = `${connectedWalletAddress.slice(0, 6)}...${connectedWalletAddress.slice(-4)}`;

  useEffect(() => {
    setIsMenuOpen(false);
    setWalletMenuOpen(false);
  }, [pathname]);

  const openMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useClickOutside(isWalletMenuOpen && !isMobileViewport, [walletMenuRef], () => {
    setWalletMenuOpen(false);
  });

  useEffect(() => {
    if (!isWalletMenuOpen || isMobileViewport) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setWalletMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileViewport, isWalletMenuOpen]);

  const onWalletButtonClick = () => {
    if (!isWalletConnected) {
      setWalletConnected(true);
      return;
    }

    setWalletMenuOpen((prev) => !prev);
  };

  const onWalletMenuAction = (action) => {
    if (action === "copy") {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(connectedWalletAddress).catch(() => {});
      }
      setWalletMenuOpen(false);
      return;
    }

    if (action === "logout") {
      setWalletConnected(false);
      setWalletMenuOpen(false);
      return;
    }

    setWalletMenuOpen(false);
  };

  const renderWalletMenuItems = () => (
    <>
      <button className="otx-wallet-dropdown-item" type="button" role="menuitem" onClick={() => onWalletMenuAction("copy")}>
        <span className="otx-wallet-dropdown-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="8" y="5" width="11" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
            <path d="M15.5 3H6.75A1.75 1.75 0 0 0 5 4.75V16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          </svg>
        </span>
        <span>Copy Address</span>
      </button>
      <button className="otx-wallet-dropdown-item" type="button" role="menuitem" onClick={() => onWalletMenuAction("profile")}>
        <span className="otx-wallet-dropdown-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8.5" r="3.25" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M6.25 18.25c.36-2.45 2.43-4.25 5.75-4.25 3.34 0 5.39 1.8 5.75 4.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.8"
            />
          </svg>
        </span>
        <span>Profile</span>
      </button>
      <button className="otx-wallet-dropdown-item" type="button" role="menuitem" onClick={() => onWalletMenuAction("security")}>
        <span className="otx-wallet-dropdown-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 3.75 19 6.5V12c0 4.02-2.45 6.96-7 8.25C7.45 18.96 5 16.02 5 12V6.5L12 3.75Z" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        </span>
        <span>Security</span>
      </button>
      <button className="otx-wallet-dropdown-item" type="button" role="menuitem" onClick={() => onWalletMenuAction("logout")}>
        <span className="otx-wallet-dropdown-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M13.5 7.5 18.25 12l-4.75 4.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
            <path d="M7.75 12H18" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
            <path d="M10.5 5H6.75A1.75 1.75 0 0 0 5 6.75v10.5C5 18.22 5.78 19 6.75 19h3.75" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          </svg>
        </span>
        <span>Logout</span>
      </button>
    </>
  );

  return (
    <>
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
          <div className="otx-wallet-menu-wrap" ref={walletMenuRef}>
            <button
              className={`otx-wallet-btn${isWalletConnected ? " is-connected" : ""}`}
              type="button"
              aria-haspopup={isWalletConnected ? (isMobileViewport ? "dialog" : "menu") : undefined}
              aria-expanded={isWalletConnected ? isWalletMenuOpen : undefined}
              onClick={onWalletButtonClick}
            >
              {isWalletConnected ? (
                <>
                  <span className="otx-wallet-user-avatar" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8.5" r="3.25" stroke="currentColor" strokeWidth="1.8" />
                      <path
                        d="M6.25 17.75c.36-2.45 2.43-4.25 5.75-4.25 3.34 0 5.39 1.8 5.75 4.25"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="1.8"
                      />
                    </svg>
                  </span>
                  <span className="otx-wallet-address" title={connectedWalletAddress}>
                    {connectedWalletLabel}
                  </span>
                  <span className={`otx-wallet-caret${isWalletMenuOpen ? " is-open" : ""}`} aria-hidden="true">
                    <svg viewBox="0 0 12 12" fill="none">
                      <path d="M2.25 4.5 6 8.25 9.75 4.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
                    </svg>
                  </span>
                </>
              ) : (
                <>
                  <span className="otx-wallet-icon" aria-hidden="true">
                    <img src={assets.wallet} alt="" />
                  </span>
                  <span>Connect Wallet</span>
                </>
              )}
            </button>

            {isWalletConnected && isWalletMenuOpen && !isMobileViewport ? (
              <div className="otx-wallet-dropdown" role="menu" aria-label="Wallet menu">
                {renderWalletMenuItems()}
              </div>
            ) : null}
          </div>

          <button className="otx-icon-btn" type="button" aria-label="Language">
            <img src={assets.language} alt="" />
          </button>
          <button
            className="otx-icon-btn otx-icon-btn-menu"
            type="button"
            aria-label="More"
            aria-expanded={isMenuOpen}
            onClick={openMenu}
          >
            <img className="otx-icon-img-menu" src={assets.menu} alt="" />
          </button>
        </div>
      </header>

      <SlideDialog
        open={isMenuOpen}
        onClose={closeMenu}
        direction="bottom"
        ariaLabel="Mobile navigation menu"
        lockScroll
        overlayClassName="otx-mobile-menu-overlay"
        panelClassName="otx-mobile-menu-panel"
      >
        <span className="otx-mobile-menu-handle" aria-hidden="true" />
        <nav className="otx-mobile-menu-list" aria-label="Menu">
          {mobileMenuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) => `otx-mobile-menu-item${isActive ? " is-active" : ""}`}
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </SlideDialog>

      <SlideDialog
        open={isMobileViewport && isWalletConnected && isWalletMenuOpen}
        onClose={() => setWalletMenuOpen(false)}
        direction="bottom"
        ariaLabel="Wallet menu"
        lockScroll
        overlayClassName="otx-mobile-menu-overlay"
        panelClassName="otx-mobile-menu-panel otx-mobile-wallet-panel"
      >
        <span className="otx-mobile-menu-handle" aria-hidden="true" />
        <div className="otx-wallet-dropdown otx-wallet-dropdown--mobile" role="menu" aria-label="Wallet menu">
          {renderWalletMenuItems()}
        </div>
      </SlideDialog>
    </>
  );
}

export default Header;
