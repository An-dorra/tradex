import TradeRouteFrame from "./TradeRouteFrame.jsx";
import "./RoutePages.css";
import genIcon24 from "../assets/images/api-gen.png";
import refreshIcon24 from "../assets/images/api-reg.png";
import copyIcon24 from "../assets/images/api-copy.png";
import keyIcon20 from "../assets/images/api-key.png";
import shareIcon20 from "../assets/images/api-share.png";
import deleteIcon20 from "../assets/images/api-del.png";

const apiRows = [
  { name: "test", status: "Available", statusClass: "is-available" },
  { name: "test", status: "Unavailable", statusClass: "is-unavailable" },
  { name: "test", status: "Available", statusClass: "is-available" },
  { name: "test", status: "Available", statusClass: "is-available" },
  { name: "test", status: "Available", statusClass: "is-available" },
  { name: "test", status: "Available", statusClass: "is-available" },
  { name: "test", status: "Available", statusClass: "is-available" },
  { name: "test", status: "Available", statusClass: "is-available" },
  { name: "test", status: "Available", statusClass: "is-available" },
];

function ApiPage() {
  return (
    <TradeRouteFrame height={1140} className="api-route-frame">
      <div className="route-page-shell api-page-shell">
        <div className="api-description">
          <h1 className="route-page-title">API</h1>
          <p className="route-page-subtitle">
            API wallets (also known as Agent wallets) can perform actions on behalf of your account
            without withdrawal permissions. You still need to use your account&apos;s public address for
            information requests.
          </p>
        </div>

        <section className="route-surface api-create-card">
          <div className="api-create-fields">
            <div className="api-field is-key-name">
              <input
                className="api-input"
                type="text"
                placeholder="API Key Name (1-16 chars), e.g: my_wallet"
                aria-label="API key name"
              />
            </div>
            <div className="api-field is-key-address">
              <input
                className="api-input"
                type="text"
                placeholder="API Key Address, e.g. 0x123..."
                aria-label="API key address"
              />
              <button className="api-generate" type="button">
                Generate
                <img src={genIcon24} alt="" className="api-generate-icon" />
              </button>
            </div>
          </div>

          <div className="api-mobile-actions">
            <button className="api-mobile-reset" type="button">
              Reset
            </button>
            <button className="api-mobile-generate" type="button">
              Generate
            </button>
          </div>

          <button className="api-connect-btn" type="button">
            Connect Main Wallet to Authorize Agent
          </button>
        </section>

        <section className="route-surface api-table-card">
          <div className="api-table-head">
            <span>API Wallet Name</span>
            <span>API Wallet Address</span>
            <span>Expiry</span>
            <span>Status</span>
            <div className="api-table-head-actions">
              <span>Actions</span>
              <button className="api-table-refresh" type="button" aria-label="Refresh">
                <img src={refreshIcon24} alt="" />
              </button>
            </div>
          </div>

          {apiRows.map((row, index) => (
            <div key={`${row.name}-${index}`} className="api-table-row">
              <div className="api-cell" data-label="API Wallet Name">
                <span className="api-table-value">{row.name}</span>
              </div>
              <div className="api-cell api-cell-address" data-label="API Wallet Address">
                <span className="api-table-address">
                  <span className="api-table-address-text">0x03fbc79df30d8c947ddc4e42d2cbcead662674b9</span>
                  <button className="api-table-copy" type="button" aria-label="Copy API wallet address">
                    <img src={copyIcon24} alt="" />
                  </button>
                </span>
              </div>
              <div className="api-cell" data-label="Expiry">
                <span className="api-table-value">2026/8/2 19:49:12</span>
              </div>
              <div className="api-cell" data-label="Status">
                <span className={`route-chip ${row.statusClass}`}>{row.status}</span>
              </div>
              <div className="api-cell" data-label="Leverage">
                <div className="api-action-icons">
                  <button className="api-icon-btn" type="button" aria-label="View key">
                    <img src={keyIcon20} alt="" />
                  </button>
                  <button className="api-icon-btn" type="button" aria-label="Share key">
                    <img src={shareIcon20} alt="" />
                  </button>
                  <button className="api-icon-btn is-danger" type="button" aria-label="Delete key">
                    <img src={deleteIcon20} alt="" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="api-pagination-wrap">
            <span className="page-pagination">1/20page</span>
          </div>
        </section>
      </div>
    </TradeRouteFrame>
  );
}

export default ApiPage;
