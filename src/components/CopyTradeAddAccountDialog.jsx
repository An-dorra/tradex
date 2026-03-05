import SlideDialog from "./SlideDialog.jsx";
import useIsMobileViewport from "../hooks/useIsMobileViewport.js";
import "./CopyTradeAddAccountDialog.css";
import bnWallet80 from "../assets/images/bn-wallet.png";
import bybitWallet80 from "../assets/images/bybit-wallet.png";
import bitgetWallet80 from "../assets/images/bitget-wallet.png";
import okxWallet80 from "../assets/images/okx-wallet.png";
import hyWallet80 from "../assets/images/hy-wallet.png";

const exchangeOptions = [
  { id: "binance", label: "Binance", icon: bnWallet80 },
  { id: "okx", label: "OKX", icon: okxWallet80 },
  { id: "bitget", label: "Bitget", icon: bitgetWallet80 },
  { id: "bybit", label: "Bybit", icon: bybitWallet80 },
  { id: "hyperdex", label: "HyperDex", icon: hyWallet80, single: true },
];

function CopyTradeAddAccountDialog({ open, onClose }) {
  const isMobileViewport = useIsMobileViewport();

  return (
    <SlideDialog
      open={open}
      onClose={onClose}
      direction={isMobileViewport ? "bottom" : "center"}
      ariaLabel="Select Exchange"
      lockScroll
      overlayClassName="ct-account-overlay"
      panelClassName="ct-account-dialog"
    >
      <header className="ct-account-header">
        <h2 className="ct-account-title">Select Exchange</h2>
        <button className="ct-account-close" type="button" onClick={onClose} aria-label="Close dialog">
          <span />
          <span />
        </button>
      </header>

      <p className="ct-account-subtitle">Please select the exchange account type to create:</p>

      <div className="ct-account-exchange-grid">
        {exchangeOptions.map((exchange) => (
          <button
            key={exchange.id}
            className={`ct-account-exchange${exchange.single ? " is-single" : ""}`}
            type="button"
          >
            <img src={exchange.icon} alt="" className="ct-account-exchange-icon" />
            <span className="ct-account-exchange-label">{exchange.label}</span>
          </button>
        ))}
      </div>

      <footer className="ct-account-footer">
        <button className="ct-account-btn is-muted" type="button" onClick={onClose}>
          Cancel
        </button>
        <button className="ct-account-btn is-primary" type="button">
          Edit
        </button>
      </footer>
    </SlideDialog>
  );
}

export default CopyTradeAddAccountDialog;
