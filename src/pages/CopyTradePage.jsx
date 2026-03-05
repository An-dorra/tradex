import { useState } from "react";
import TradeRouteFrame from "./TradeRouteFrame.jsx";
import "./RoutePages.css";
import CopyTradeWizardDialog from "../components/CopyTradeWizardDialog.jsx";
import CopyTradeAddAccountDialog from "../components/CopyTradeAddAccountDialog.jsx";
import refreshIcon24 from "../assets/images/refresh.png";
import dexAccountIcon20 from "../assets/images/dexaccount.png";
import dexAccountIcon20Copy from "../assets/images/dexaccount-1.png";

const strategyCards = [
  { id: "ID:381", name: "Trading-name", status: "Running", statusClass: "is-running" },
  { id: "ID:381", name: "Trading-name", status: "Stopped", statusClass: "is-stopped" },
  { id: "ID:381", name: "Trading-name", status: "Running", statusClass: "is-running" },
  { id: "ID:381", name: "Trading-name", status: "Running", statusClass: "is-running" },
];

const accountCards = [
  {
    id: "ID:381",
    name: "Trading-name",
    keyValue: "0xwer****erti",
    lastUpdated: "2026/2/6 17:48:35",
    accountStatus: "Active",
  },
  {
    id: "ID:381",
    name: "Trading-name",
    keyValue: "0xwer****erti",
    lastUpdated: "2026/2/6 17:48:35",
    accountStatus: "Active",
  },
  {
    id: "ID:381",
    name: "Trading-name",
    keyValue: "0xwer****erti",
    lastUpdated: "2026/2/6 17:48:35",
    accountStatus: "Active",
  },
  {
    id: "ID:381",
    name: "Trading-name",
    keyValue: "0xwer****erti",
    lastUpdated: "2026/2/6 17:48:35",
    accountStatus: "Active",
  },
];

function CopyTradePage() {
  const [activeTab, setActiveTab] = useState("strategy");
  const [isWizardOpen, setWizardOpen] = useState(false);
  const [isAddAccountOpen, setAddAccountOpen] = useState(false);
  const isStrategyTab = activeTab === "strategy";

  return (
    <TradeRouteFrame height={980} className="copytrade-route-frame">
      <div className="route-page-shell copytrade-page-shell">
        <div>
          <h1 className="route-page-title">Copy Trade</h1>
          <p className="route-page-subtitle">
            Configure signal copy trading strategies for automated opening and closing of positions.
          </p>
        </div>

        <section className="route-surface copytrade-panel">
          <header className="copytrade-header">
            <div className="copytrade-tabs">
              <button
                className={`copytrade-tab${isStrategyTab ? " is-active" : ""}`}
                type="button"
                onClick={() => setActiveTab("strategy")}
              >
                My Strategy
              </button>
              <button
                className={`copytrade-tab${isStrategyTab ? "" : " is-active"}`}
                type="button"
                onClick={() => setActiveTab("account")}
              >
                Copy Trading Account
              </button>
            </div>

            <div className="copytrade-toolbar">
              <button className="copytrade-refresh" type="button" aria-label="Refresh strategies">
                <img src={refreshIcon24} alt="" />
              </button>
              <button
                className="copytrade-add"
                type="button"
                onClick={() => {
                  if (isStrategyTab) {
                    setWizardOpen(true);
                  } else {
                    setAddAccountOpen(true);
                  }
                }}
              >
                {isStrategyTab ? "+ Add Strategy" : "+ Add Account"}
              </button>
            </div>
          </header>

          <div className="copytrade-grid">
            {isStrategyTab
              ? strategyCards.map((card, index) => (
                  <article key={`${card.id}-${index}`} className="copytrade-card">
                    <div className="copytrade-card-header">
                      <div>
                        <h2 className="copytrade-card-name">{card.name}</h2>
                        <p className="copytrade-card-id">{card.id}</p>
                      </div>
                      <span className={`route-chip ${card.statusClass}`}>{card.status}</span>
                    </div>

                    <div className="copytrade-card-details">
                      <div className="copytrade-card-row">
                        <span className="copytrade-card-label">Authorized Account</span>
                        <span className="copytrade-card-value">
                          <img src={dexAccountIcon20} alt="" className="copytrade-card-account-icon" />
                          DexAccount
                        </span>
                      </div>
                      <div className="copytrade-card-row">
                        <span className="copytrade-card-label">Allocated Capital</span>
                        <span className="copytrade-card-value">10%</span>
                      </div>
                      <div className="copytrade-card-row">
                        <span className="copytrade-card-label">Signal Strategy</span>
                        <span className="copytrade-card-value">MoreTrendStep</span>
                      </div>
                    </div>

                    <div className="copytrade-card-actions">
                      <button className="copytrade-action" type="button">
                        Edit
                      </button>
                      <button className="copytrade-action" type="button">
                        Delete
                      </button>
                    </div>
                  </article>
                ))
              : accountCards.map((card, index) => (
                  <article key={`${card.id}-account-${index}`} className="copytrade-card is-account">
                    <div className="copytrade-account-top">
                      <img src={dexAccountIcon20Copy} alt="" className="copytrade-card-main-icon" />
                      <div className="copytrade-account-title-wrap">
                        <div className="copytrade-account-title-row">
                          <h2 className="copytrade-card-name">{card.name}</h2>
                          <span className="route-chip is-running">Enabled</span>
                        </div>
                        <p className="copytrade-card-id">{card.id}</p>
                      </div>
                    </div>

                    <div className="copytrade-card-details is-account-details">
                      <div className="copytrade-card-row">
                        <span className="copytrade-card-label">API Key</span>
                        <span className="copytrade-card-value">{card.keyValue}</span>
                      </div>
                      <div className="copytrade-card-row">
                        <span className="copytrade-card-label">Last Updated</span>
                        <span className="copytrade-card-value">{card.lastUpdated}</span>
                      </div>
                      <div className="copytrade-card-row">
                        <span className="copytrade-card-label copytrade-status-label">
                          Status
                          <img src={refreshIcon24} alt="" />
                        </span>
                        <span className="copytrade-card-value is-confirm">{card.accountStatus}</span>
                      </div>
                    </div>

                    <div className="copytrade-card-actions">
                      <button className="copytrade-action" type="button">
                        Edit
                      </button>
                      <button className="copytrade-action" type="button">
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
          </div>
        </section>

        <CopyTradeWizardDialog open={isWizardOpen} onClose={() => setWizardOpen(false)} />
        <CopyTradeAddAccountDialog open={isAddAccountOpen} onClose={() => setAddAccountOpen(false)} />
      </div>
    </TradeRouteFrame>
  );
}

export default CopyTradePage;
