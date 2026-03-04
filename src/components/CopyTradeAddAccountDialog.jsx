import { useEffect } from "react";
import { createPortal } from "react-dom";
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
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverscroll = html.style.overscrollBehavior;
    const prevBodyOverscroll = body.style.overscrollBehavior;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overscrollBehavior = "none";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      html.style.overscrollBehavior = prevHtmlOverscroll;
      body.style.overscrollBehavior = prevBodyOverscroll;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className="ct-account-overlay" role="presentation" onClick={onClose}>
      <section
        className="ct-account-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Select Exchange"
        onClick={(event) => event.stopPropagation()}
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
      </section>
    </div>,
    document.body,
  );
}

export default CopyTradeAddAccountDialog;
