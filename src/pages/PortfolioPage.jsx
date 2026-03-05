import { useState } from "react";
import TradeRouteFrame from "./TradeRouteFrame.jsx";
import "./RoutePages.css";
import inviteIcon48 from "../assets/images/invite.png";

const portfolioTabs = [
  "Balance",
  "Positions",
  "Open Orders",
  "Trade History",
  "Order History",
  "API Limits",
  "Deposit and Withdraws",
];

const balanceRows = [
  {
    coin: "USDC(Perps)",
    total: "16.014527 USDC",
    available: "16.014527 USDC",
    value: "$16.01",
    pnl: "+$0.00(+0.00%)",
    send: "Connect",
    transfer: "To Perp",
    contract: "",
  },
  {
    coin: "USDC(Perps)",
    total: "16.014527 USDC",
    available: "16.014527 USDC",
    value: "$16.01",
    pnl: "+$0.00(+0.00%)",
    send: "Connect",
    transfer: "To Perp",
    contract: "",
  },
  {
    coin: "USDC(Perps)",
    total: "16.014527 USDC",
    available: "16.014527 USDC",
    value: "$16.01",
    pnl: "+$0.00(+0.00%)",
    send: "Connect",
    transfer: "To Perp",
    contract: "",
  },
];

const portfolioTableData = {
  Balance: {
    headers: ["Coin", "Total Balance", "Available", "USDC Value", "PnL", "Send", "Transfer", "Contract"],
    rows: balanceRows.map((row) => [
      { value: row.coin },
      { value: row.total },
      { value: row.available },
      { value: row.value },
      { value: row.pnl, className: "is-green" },
      { value: row.send, className: "is-teal" },
      { value: row.transfer, className: "is-teal" },
      { value: row.contract || "--" },
    ]),
  },
  Positions: {
    headers: ["Symbol", "Side", "Size", "Entry Price", "Mark Price", "PnL", "Leverage", "Actions"],
    rows: [[
      { value: "BTC-PERP" },
      { value: "Long" },
      { value: "0.020" },
      { value: "$62,550.0" },
      { value: "$62,713.0" },
      { value: "+0.26%", className: "is-green" },
      { value: "5x" },
      { value: "Close", className: "is-teal" },
    ]],
  },
  "Open Orders": {
    headers: ["Time", "Symbol", "Type", "Price", "Amount", "Filled", "Status", "Actions"],
    rows: [[
      { value: "03-05 11:42:10" },
      { value: "ETH-PERP" },
      { value: "Limit" },
      { value: "$3,422.10" },
      { value: "0.50" },
      { value: "0.10" },
      { value: "Open" },
      { value: "Cancel", className: "is-teal" },
    ]],
  },
  "Trade History": {
    headers: ["Time", "Symbol", "Direction", "Entry", "Exit", "PnL", "Fee", "Status"],
    rows: [[
      { value: "03-04 21:09:31" },
      { value: "SOL-PERP" },
      { value: "Short" },
      { value: "$132.40" },
      { value: "$129.90" },
      { value: "+1.89%", className: "is-green" },
      { value: "$1.92" },
      { value: "Closed" },
    ]],
  },
  "Order History": {
    headers: ["Time", "Symbol", "Order Type", "Price", "Amount", "Executed", "Status", "Side"],
    rows: [[
      { value: "03-04 20:45:16" },
      { value: "ARB-PERP" },
      { value: "Market" },
      { value: "$1.94" },
      { value: "120" },
      { value: "120" },
      { value: "Filled" },
      { value: "Buy", className: "is-teal" },
    ]],
  },
  "API Limits": {
    headers: ["Wallet", "Cap", "Used", "Surplus", "Last Updated", "Status", "Detail", "Action"],
    rows: [[
      { value: "0x0a40...b88f" },
      { value: "10039" },
      { value: "17" },
      { value: "10022" },
      { value: "03-05 11:44:20" },
      { value: "Available", className: "is-green" },
      { value: "View" },
      { value: "Refresh", className: "is-teal" },
    ]],
  },
  "Deposit and Withdraws": {
    headers: ["Time", "Type", "Coin", "Amount", "Address", "TxID", "Status", "Network"],
    rows: [[
      { value: "03-05 10:24:09" },
      { value: "Deposit" },
      { value: "USDC" },
      { value: "500.00" },
      { value: "0x03fb...74b9" },
      { value: "0x95e4...b29f" },
      { value: "Completed", className: "is-green" },
      { value: "Arbitrum" },
    ]],
  },
};

function PortfolioPage() {
  const [activeTableTab, setActiveTableTab] = useState(portfolioTabs[0]);
  const currentTable = portfolioTableData[activeTableTab];

  return (
    <TradeRouteFrame height={1140} className="portfolio-route-frame">
      <div className="route-page-shell portfolio-page-shell">
        <div className="route-page-heading">
          <div>
            <h1 className="route-page-title">Protfolio</h1>
          </div>
          <div className="portfolio-actions">
            <button className="route-btn is-primary" type="button">
              Deposit
            </button>
            <button className="route-btn" type="button">
              Withdraw
            </button>
            <button className="route-btn" type="button">
              Transfer
            </button>
          </div>
        </div>

        <section className="portfolio-overview">
          <article className="route-surface portfolio-invite-card">
            <div className="portfolio-invite-header">
              <div>
                <p className="portfolio-invite-title">Invite now</p>
                <p className="portfolio-invite-amount">12345.789</p>
              </div>
              <div className="portfolio-small-tools">
                <button className="portfolio-small-filter" type="button" aria-label="Filter by type">
                  All
                  <span className="portfolio-small-filter-caret" aria-hidden="true" />
                </button>
                <button className="portfolio-small-refresh" type="button" aria-label="Refresh portfolio">
                  <img src={inviteIcon48} alt="" />
                </button>
              </div>
            </div>

            <div className="portfolio-detail-list">
              <div className="portfolio-row">
                <span className="portfolio-row-label">PnL(7D)</span>
                <span className="portfolio-row-value">$0.00(--)</span>
              </div>
              <div className="portfolio-row">
                <span className="portfolio-row-label">Volume (7D)</span>
                <span className="portfolio-row-value">$0.00</span>
              </div>
            </div>

            <div className="portfolio-extra-list">
              <div className="portfolio-row">
                <span className="portfolio-row-label">Perp</span>
                <span className="portfolio-row-value">--</span>
              </div>
              <div className="portfolio-row">
                <span className="portfolio-row-label">Spot</span>
                <span className="portfolio-row-value">--</span>
              </div>
            </div>
          </article>

          <article className="route-surface portfolio-chart-card">
            <div className="portfolio-chart-tabs">
              <span className="portfolio-chart-tab">Account Value</span>
              <span className="portfolio-chart-tab is-active">PNL</span>
            </div>

            <div className="portfolio-chart-area">
              <span className="portfolio-chart-y is-4">4</span>
              <span className="portfolio-chart-y is-3">3</span>
              <span className="portfolio-chart-y is-2">2</span>
              <span className="portfolio-chart-y is-1">1</span>
              <span className="portfolio-chart-y is-0">0</span>
              <div className="portfolio-chart-grid" />
            </div>
          </article>
        </section>

        <section className="portfolio-table-wrap">
          <div className="route-surface portfolio-table-card">
            <div className="portfolio-table-tabs">
              {portfolioTabs.map((tab) => (
                <button
                  key={tab}
                  className={`portfolio-table-tab${tab === activeTableTab ? " is-active" : ""}`}
                  type="button"
                  onClick={() => setActiveTableTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="portfolio-table-head">
              {currentTable.headers.map((header) => (
                <span key={header}>{header}</span>
              ))}
            </div>

            <div className="portfolio-table-body">
              {currentTable.rows.length ? (
                currentTable.rows.map((row, rowIndex) => (
                  <div key={`${activeTableTab}-${rowIndex}`} className="portfolio-table-row">
                    {row.map((cell, cellIndex) => (
                      <span
                        key={`${activeTableTab}-${rowIndex}-${cellIndex}`}
                        className={cell.className ?? ""}
                        data-label={currentTable.headers[cellIndex]}
                        data-hide-mobile={activeTableTab === "Balance" && currentTable.headers[cellIndex] === "Contract"}
                      >
                        {cell.value}
                      </span>
                    ))}
                  </div>
                ))
              ) : (
                <div className="portfolio-table-empty">No records</div>
              )}
            </div>

            <div className="portfolio-page-pagination page-pagination" aria-label="Portfolio pages">
              <span>1</span>
              <span>/20page</span>
            </div>
          </div>
        </section>
      </div>
    </TradeRouteFrame>
  );
}

export default PortfolioPage;
