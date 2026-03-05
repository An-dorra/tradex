import { useEffect, useRef, useState } from "react";
import TradeRouteFrame from "./TradeRouteFrame.jsx";
import "./RoutePages.css";

const signalRows = [
  { symbol: "1INCH", interval: "30m", type: "BUY", typeClass: "is-buy", profit: "-0.06%", profitClass: "is-loss" },
  { symbol: "1INCH", interval: "30m", type: "SELL", typeClass: "is-sell", profit: "-0.06%", profitClass: "is-loss" },
  { symbol: "JTO", interval: "5m", type: "SELL", typeClass: "is-sell", profit: "-0.06%", profitClass: "is-loss" },
  { symbol: "ATP", interval: "30m", type: "SELL", typeClass: "is-sell", profit: "0.11%", profitClass: "is-gain" },
  { symbol: "AVAX", interval: "5m", type: "SELL", typeClass: "is-sell", profit: "0.00%", profitClass: "is-flat" },
  { symbol: "AVAX", interval: "30m", type: "SELL", typeClass: "is-sell", profit: "0.11%", profitClass: "is-gain" },
  { symbol: "JTO", interval: "5m", type: "SELL", typeClass: "is-sell", profit: "-0.06%", profitClass: "is-loss" },
  { symbol: "ATP", interval: "30m", type: "SELL", typeClass: "is-sell", profit: "0.11%", profitClass: "is-gain" },
];

const strategyOptions = ["All Strategies", "DeepAI", "MoreTrendStep"];

function SignalsPage() {
  const [selectedStrategy, setSelectedStrategy] = useState(strategyOptions[0]);
  const [isStrategyMenuOpen, setStrategyMenuOpen] = useState(false);
  const strategySelectRef = useRef(null);

  useEffect(() => {
    if (!isStrategyMenuOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (strategySelectRef.current && !strategySelectRef.current.contains(event.target)) {
        setStrategyMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setStrategyMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isStrategyMenuOpen]);

  return (
    <TradeRouteFrame height={1140} className="signals-route-frame">
      <div className="route-page-shell signals-page-shell">
        <div>
          <h1 className="route-page-title">Signal Square</h1>
          <p className="route-page-subtitle signals-subtitle">
            Monitor market signals in real-time to capture trading opportunities.
          </p>
        </div>

        <section className="route-surface signals-filter-bar">
          <div className="signals-filter-controls">
            <div className="signals-filter-field">
              <span className="signals-filter-label">Symbol</span>
              <input className="signals-input" type="text" placeholder="e.g.BTC" aria-label="Symbol" />
            </div>

            <div className="signals-filter-field">
              <span className="signals-filter-label">Strategy</span>
              <div className="signals-select-wrap" ref={strategySelectRef}>
                <button
                  className={`signals-select${isStrategyMenuOpen ? " is-open" : ""}`}
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isStrategyMenuOpen}
                  onClick={() => setStrategyMenuOpen((prev) => !prev)}
                >
                  <span className="signals-select-value">{selectedStrategy}</span>
                  <span className="signals-select-caret" aria-hidden="true" />
                </button>

                {isStrategyMenuOpen ? (
                  <div className="signals-select-menu" role="listbox" aria-label="Strategy list">
                    {strategyOptions.map((option) => (
                      <button
                        key={option}
                        className={`signals-select-option${selectedStrategy === option ? " is-active" : ""}`}
                        type="button"
                        role="option"
                        aria-selected={selectedStrategy === option}
                        onClick={() => {
                          setSelectedStrategy(option);
                          setStrategyMenuOpen(false);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <button className="signals-btn is-muted" type="button">
              Reset
            </button>
            <button className="signals-btn is-primary" type="button">
              Search
            </button>
          </div>

          <button className="signals-btn is-primary is-copy" type="button">
            Copy Trade
          </button>
        </section>

        <section className="route-surface signals-table-card">
          <div className="signals-table-head">
            <span>Time</span>
            <span>Symbol</span>
            <span>Source</span>
            <span>Interval</span>
            <span>Type</span>
            <span>Push/Real-time Price</span>
            <span>Profit Rate</span>
            <span>Leverage</span>
          </div>

          <div className="signals-table-body">
            {signalRows.map((row, index) => (
              <div key={`${row.symbol}-${index}`} className="signals-table-row">
                <div className="signals-cell" data-label="Time">
                  <span>02-10 23:43:45</span>
                </div>
                <div className="signals-cell" data-label="Symbol">
                  <span>{row.symbol}</span>
                </div>
                <div className="signals-cell" data-label="Source">
                  <span>MoreTrendStep</span>
                </div>
                <div className="signals-cell" data-label="Interval">
                  <span className="signals-chip is-interval">{row.interval}</span>
                </div>
                <div className="signals-cell" data-label="Type">
                  <span className={`signals-chip ${row.typeClass}`}>{row.type}</span>
                </div>
                <div className="signals-cell signals-cell-price" data-label="Push/Real-time Price">
                  <span className="signals-price-cell">
                    <span className="signals-price-label">Push/Real-time Price</span>
                    <span className="signals-price-value">R:8.7009</span>
                  </span>
                </div>
                <div className="signals-cell" data-label="Profit Rate">
                  <span className={`signals-profit ${row.profitClass}`}>{row.profit}</span>
                </div>
                <div className="signals-cell" data-label="Leverage">
                  <span>5</span>
                </div>
              </div>
            ))}
          </div>

          <div className="signals-pagination-wrap">
            <span className="page-pagination">1/20page</span>
          </div>
        </section>
      </div>
    </TradeRouteFrame>
  );
}

export default SignalsPage;
