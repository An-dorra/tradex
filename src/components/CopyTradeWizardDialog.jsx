import SlideDialog from "./SlideDialog.jsx";
import useIsMobileViewport from "../hooks/useIsMobileViewport.js";
import "./CopyTradeWizardDialog.css";
import dexAccountIcon96 from "../assets/images/dexaccount-1.png";
import selectedIcon from "../assets/icons/seleced.svg";

const accountOptions = [
  { id: "ID:381", name: "Trading-name", keyValue: "0xwer****erti", selected: true },
  { id: "ID:381", name: "Trading-name", keyValue: "0xwer****erti", selected: false },
];

function CopyTradeWizardDialog({ open, onClose }) {
  const isMobileViewport = useIsMobileViewport();

  return (
    <SlideDialog
      open={open}
      onClose={onClose}
      direction={isMobileViewport ? "bottom" : "center"}
      ariaLabel="Auto Trading Configuration Wizard"
      lockScroll
      overlayClassName="ct-wizard-overlay"
      panelClassName="ct-wizard-dialog"
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
                {option.selected ? (
                  <span className="ct-wizard-check" aria-hidden="true">
                    <img src={selectedIcon} alt="" className="ct-wizard-check-icon" />
                  </span>
                ) : null}
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
    </SlideDialog>
  );
}

export default CopyTradeWizardDialog;
