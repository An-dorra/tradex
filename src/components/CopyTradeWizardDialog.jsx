import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./CopyTradeWizardDialog.css";
import dexAccountIcon96 from "../assets/images/dexaccount-1.png";

const accountOptions = [
  { id: "ID:381", name: "Trading-name", keyValue: "0xwer****erti", selected: true },
  { id: "ID:381", name: "Trading-name", keyValue: "0xwer****erti", selected: false },
];

function CopyTradeWizardDialog({ open, onClose }) {
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
    <div className="ct-wizard-overlay" role="presentation" onClick={onClose}>
      <section
        className="ct-wizard-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Auto Trading Configuration Wizard"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="ct-wizard-header">
          <h2 className="ct-wizard-title">Auto Trading Configuration Wizard</h2>
          <button className="ct-wizard-close" type="button" onClick={onClose} aria-label="Close dialog">
            <span />
            <span />
          </button>
        </header>

        <div className="ct-wizard-steps">
          <div className="ct-wizard-step is-active">
            <span className="ct-wizard-step-dot">1</span>
            <div className="ct-wizard-step-content">
              <p className="ct-wizard-step-title">API Authorization</p>
              <p className="ct-wizard-step-desc">Bind trading account</p>
            </div>
          </div>

          <span className="ct-wizard-step-line" />

          <div className="ct-wizard-step">
            <span className="ct-wizard-step-dot">2</span>
            <div className="ct-wizard-step-content">
              <p className="ct-wizard-step-title">Parameters Configuration</p>
              <p className="ct-wizard-step-desc">Set trading rules</p>
            </div>
          </div>
        </div>

        <div className="ct-wizard-main">
          <h3 className="ct-wizard-section-title">API Authorization Required</h3>

          <div className="ct-wizard-account-grid">
            {accountOptions.map((option, index) => (
              <article key={`${option.id}-${index}`} className={`ct-wizard-account${option.selected ? " is-selected" : ""}`}>
                <div className="ct-wizard-account-top">
                  <img src={dexAccountIcon96} alt="" className="ct-wizard-account-icon" />
                  <div className="ct-wizard-account-head">
                    <p className="ct-wizard-account-name">{option.name}</p>
                    <p className="ct-wizard-account-id">{option.id}</p>
                  </div>
                  {option.selected ? <span className="ct-wizard-check" aria-hidden="true" /> : null}
                </div>

                <div className="ct-wizard-account-rows">
                  <div className="ct-wizard-account-row">
                    <span className="ct-wizard-account-label">API Key</span>
                    <span className="ct-wizard-account-value">{option.keyValue}</span>
                  </div>
                  <div className="ct-wizard-account-row">
                    <span className="ct-wizard-account-label">Status</span>
                    <span className="ct-wizard-account-value is-green">Available</span>
                  </div>
                  <div className="ct-wizard-account-row">
                    <span className="ct-wizard-account-label">Active Status</span>
                    <span className="ct-wizard-account-value is-blue">Active</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button className="ct-wizard-create" type="button">
            <span className="ct-wizard-plus" aria-hidden="true">
              +
            </span>
            Create Authorized Account
          </button>
        </div>

        <footer className="ct-wizard-footer">
          <button className="ct-wizard-next" type="button" disabled>
            Next
          </button>
        </footer>
      </section>
    </div>,
    document.body,
  );
}

export default CopyTradeWizardDialog;
