import { useEffect, useRef, useState } from "react";
import { KLineChartPro } from "@klinecharts/pro";
import "@klinecharts/pro/dist/klinecharts-pro.css";
import pairBtcIcon from "../assets/icons/pair-btc.png";
import caretIcon from "../assets/icons/caret.svg";
import "./TradingPage.css";

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1582;

const BTC_SYMBOL = {
  ticker: "BTC",
  name: "BTC",
  shortName: "BTC",
  market: "crypto",
  type: "crypto",
  pricePrecision: 1,
  volumePrecision: 4,
  priceCurrency: "USDC",
};

const CHART_PERIODS = [
  { multiplier: 1, timespan: "minute", text: "1m" },
  { multiplier: 5, timespan: "minute", text: "5m" },
  { multiplier: 15, timespan: "minute", text: "15m" },
  { multiplier: 1, timespan: "hour", text: "1H" },
  { multiplier: 4, timespan: "hour", text: "4H" },
  { multiplier: 1, timespan: "day", text: "D" },
];

const DEFAULT_PERIOD = CHART_PERIODS[0];

const PERIOD_STEP_MS = {
  minute: 60 * 1000,
  hour: 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000,
  year: 365 * 24 * 60 * 60 * 1000,
};

const marketStats = [
  { label: "Mark", value: "69291.0" },
  { label: "Oracle", value: "69291.0" },
  { label: "24h Change", value: "+325.00 / +0.47%", green: true },
  { label: "24h Volume", value: "$2.51B" },
  { label: "Open Interest", value: "$2.51B" },
  { label: "Funding / Countdown", value: "0.0009% / 34:18" },
];

const tableTabs = [
  "Balance",
  "Positions",
  "Open Orders",
  "Trade History",
  "Order History",
  "API Limits",
];

const tableRows = [
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

const summaryRows = [
  { label: "Spot", value: "$0.00" },
  { label: "Perps", value: "$0.00" },
  { label: "Perps Overview", value: "" },
  { label: "Balance", value: "$0.00" },
  { label: "Unrealized PNL", value: "$0.00" },
  { label: "Cross Margin Ratio", value: "0.00%", highlight: true },
  { label: "Maintenance Margin", value: "$0.00" },
  { label: "Cross Account Leverage", value: "0.00x" },
];

const getPeriodStepMs = (period) => {
  const base = PERIOD_STEP_MS[period.timespan] ?? PERIOD_STEP_MS.minute;
  return base * period.multiplier;
};

const alignToPeriod = (timestamp, stepMs) => Math.floor(timestamp / stepMs) * stepMs;

const getSyntheticPrice = (candleIndex) => {
  const base = 69200;
  const trend = Math.sin(candleIndex / 36) * 420;
  const wave = Math.cos(candleIndex / 10) * 110;
  return base + trend + wave;
};

const buildBtcCandle = (timestamp, stepMs, includeLiveNoise = false) => {
  const candleIndex = Math.floor(timestamp / stepMs);
  const open = getSyntheticPrice(candleIndex - 1);
  const baseClose = getSyntheticPrice(candleIndex);
  const liveNoise = includeLiveNoise ? Math.sin(Date.now() / 3000) * 12 : 0;
  const close = baseClose + liveNoise;
  const high = Math.max(open, close) + 18 + Math.abs(Math.sin(candleIndex * 1.8)) * 26;
  const low = Math.min(open, close) - 18 - Math.abs(Math.cos(candleIndex * 1.1)) * 24;
  const volume = 180 + Math.abs(Math.sin(candleIndex * 0.33)) * 420;

  return {
    timestamp,
    open: Number(open.toFixed(2)),
    high: Number(high.toFixed(2)),
    low: Number(low.toFixed(2)),
    close: Number(close.toFixed(2)),
    volume: Number(volume.toFixed(2)),
  };
};

class LocalBtcDatafeed {
  constructor() {
    this.subscriptions = new Map();
  }

  async searchSymbols(search = "") {
    const keyword = search.trim().toLowerCase();
    if (
      !keyword ||
      "btc".includes(keyword) ||
      "bitcoin".includes(keyword) ||
      BTC_SYMBOL.ticker.toLowerCase().includes(keyword)
    ) {
      return [BTC_SYMBOL];
    }
    return [];
  }

  async getHistoryKLineData(symbol, period, from, to) {
    if ((symbol?.ticker ?? "").toUpperCase() !== BTC_SYMBOL.ticker) {
      return [];
    }

    const stepMs = getPeriodStepMs(period);
    const rangeStart = Math.min(from, to);
    const rangeEnd = Math.max(from, to);
    const start = alignToPeriod(rangeStart, stepMs);
    const end = alignToPeriod(rangeEnd, stepMs);

    const candles = [];
    for (let ts = start; ts <= end; ts += stepMs) {
      candles.push(buildBtcCandle(ts, stepMs));
    }
    return candles;
  }

  subscribe(symbol, period, callback) {
    this.unsubscribe(symbol, period);
    const key = this.createSubscriptionKey(symbol, period);
    const stepMs = getPeriodStepMs(period);
    const emit = () => {
      const timestamp = alignToPeriod(Date.now(), stepMs);
      callback(buildBtcCandle(timestamp, stepMs, true));
    };

    emit();
    const timerId = window.setInterval(emit, 1000);
    this.subscriptions.set(key, timerId);
  }

  unsubscribe(symbol, period) {
    const key = this.createSubscriptionKey(symbol, period);
    const timerId = this.subscriptions.get(key);
    if (timerId) {
      window.clearInterval(timerId);
      this.subscriptions.delete(key);
    }
  }

  dispose() {
    this.subscriptions.forEach((timerId) => {
      window.clearInterval(timerId);
    });
    this.subscriptions.clear();
  }

  createSubscriptionKey(symbol, period) {
    return `${symbol.ticker}:${period.multiplier}:${period.timespan}`;
  }
}

function TradingPage() {
  const screenRef = useRef(null);
  const chartHostRef = useRef(null);
  const leverageTrackRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [leverage, setLeverage] = useState(80);
  const [leverageInput, setLeverageInput] = useState("80");
  const [reduceOnly, setReduceOnly] = useState(true);
  const [quantityInput, setQuantityInput] = useState("0");

  const clampPercent = (v) => Math.max(0, Math.min(100, Math.round(v)));

  const updateLeverageFromClientX = (clientX) => {
    const el = leverageTrackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    const next = clampPercent(ratio * 100);
    setLeverage(next);
    setLeverageInput(String(next));
  };

  const handleTrackMouseDown = (e) => {
    updateLeverageFromClientX(e.clientX);
    const onMove = (ev) => updateLeverageFromClientX(ev.clientX);
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const handleLeverageInput = (e) => {
    const v = e.target.value;
    if (v === "") {
      setLeverageInput("");
      return;
    }
    if (/^\d{1,3}$/.test(v)) {
      setLeverageInput(v);
      const num = Number(v);
      const next = clampPercent(num);
      setLeverage(next);
    }
  };

  const handleLeverageBlur = () => {
    const num = Number(leverageInput || "0");
    const next = clampPercent(num);
    setLeverage(next);
    setLeverageInput(String(next));
  };

  useEffect(() => {
    const updateScale = () => {
      const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
      setScale(viewportWidth / CANVAS_WIDTH);
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--trade-scale", String(scale));
    return () => {
      document.documentElement.style.removeProperty("--trade-scale");
    };
  }, [scale]);
  useEffect(() => {
    const host = chartHostRef.current;
    if (!host) {
      return undefined;
    }

    host.innerHTML = "";
    const datafeed = new LocalBtcDatafeed();

    new KLineChartPro({
      container: host,
      theme: "dark",
      locale: "en-US",
      timezone: "Etc/UTC",
      symbol: BTC_SYMBOL,
      period: DEFAULT_PERIOD,
      periods: CHART_PERIODS,
      mainIndicators: ["MA"],
      subIndicators: ["VOL"],
      datafeed,
    });

    return () => {
      datafeed.dispose();
      host.innerHTML = "";
    };
  }, []);

  const stageStyle = {
    width: CANVAS_WIDTH * scale,
    height: CANVAS_HEIGHT * scale,
  };

  const canvasStyle = {
    "--trade-scale": scale,
  };

  return (
    <div className="trade-screen" ref={screenRef} style={{ "--trade-scale": scale }}>
      <div className="trade-stage" style={stageStyle}>
        <div className="trade-canvas" style={canvasStyle}>
          <section className="market-strip">
            <div className="pair-block">
              <div className="pair-icon">
                <img src={pairBtcIcon} alt="" />
              </div>
              <div className="pair-content">
                <div className="pair-main">
                  <span>BTC-USDC</span>
                  <span className="pair-caret">
                    <img src={caretIcon} alt="" />
                  </span>
                </div>
                <p className="pair-leverage">40x</p>
              </div>
            </div>

            <div className="stats-grid">
              {marketStats.map((item) => (
                <div key={item.label} className="stat-item">
                  <p className="stat-label">{item.label}</p>
                  <p className={`stat-value${item.green ? " is-green" : ""}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="pro-chart-shell" ref={chartHostRef} />

          <section className="order-book">
            <div className="order-book-tabs">
              <button className="is-active" type="button">
                Order Book
              </button>
              <button type="button">Trades</button>
            </div>

            <div className="order-book-head">
              <span className="qty-chip">
                <span className="qty-chip-value">0.05</span>
                <span className="qty-chip-caret" aria-hidden="true">
                  <img src={caretIcon} alt="" />
                </span>
              </span>
              <span className="book-unit">USDT</span>
            </div>

            <div className="order-book-gap" />

            <div className="order-book-foot">
              <span>Spread</span>
              <span>0.0000</span>
              <span>0.0005%</span>
            </div>

            <div className="order-book-gap" />
          </section>

          <section className="bottom-table">
            <div className="table-tabs">
              {tableTabs.map((tab, index) => (
                <button key={tab} className={index === 0 ? "is-active" : ""} type="button">
                  {tab}
                </button>
              ))}
            </div>

            <div className="balances-head">
              <span>Coin</span>
              <span>Total Balance</span>
              <span>Available</span>
              <span>USDC Value</span>
              <span>PnL</span>
              <span>Send</span>
              <span>Transfer</span>
              <span>Contract</span>
            </div>

            <div className="table-body">
              {tableRows.map((row, index) => (
                <div key={index} className="balances-row">
                  <span>{row.coin}</span>
                  <span>{row.total}</span>
                  <span>{row.available}</span>
                  <span>{row.value}</span>
                  <span className="value-green">{row.pnl}</span>
                  <span className="value-teal">{row.send}</span>
                  <span className="value-teal">{row.transfer}</span>
                  <span>{row.contract}</span>
                </div>
              ))}
            </div>
          </section>

          <aside className="order-panel">
            <div className="mode-switch">
              <button type="button">Cross</button>
              <button type="button">1x</button>
              <button type="button">One-Way</button>
            </div>

            <div className="side-tabs">
              <button className="is-active" type="button">
                Market
              </button>
              <button type="button">Limit</button>
            </div>

            <div className="buy-sell">
              <button className="is-active" type="button">
                Buy/Long
              </button>
              <button type="button">Sell/Short</button>
            </div>

            <div className="flex items-center justify-between px-1">
              <span className="text-[#999] text-base leading-6">Available</span>
              <span className="text-white text-base leading-6">0.00 USDC</span>
            </div>
            <div className="flex items-center justify-between px-1">
              <span className="text-[#999] text-base leading-6">Current Position</span>
              <span className="text-white text-base leading-6">0.0000 BTC</span>
            </div>

            <div className="qty-input">
              <label className="qty-left">
                <span className="qty-label">Quantity</span>
                <input
                  className="qty-field"
                  type="number"
                  min="0"
                  step="1"
                  value={quantityInput}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v === "" || /^\d*\.?\d*$/.test(v)) {
                      setQuantityInput(v);
                    }
                  }}
                  placeholder="0"
                  aria-label="Order quantity"
                />
              </label>
              <span className="qty-unit">
                USDC
                <span className="qty-unit-caret" aria-hidden="true">
                  <img src={caretIcon} alt="" />
                </span>
              </span>
            </div>
            <p className="margin-note">Required Margin N/A</p>

            <div className="leverage-row">
              <div
                className="leverage-track"
                ref={leverageTrackRef}
                onMouseDown={handleTrackMouseDown}
              >
                <div
                  className="leverage-progress"
                  style={{ width: `${leverage}%` }}
                />
                <span
                  className="lever-dot"
                  style={{ left: `${leverage}%`, transform: "translateX(-50%)" }}
                  onMouseDown={handleTrackMouseDown}
                  role="slider"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={leverage}
                />
              </div>
              <div className="leverage-box">
                <input
                  className="leverage-input"
                  type="number"
                  min={0}
                  max={100}
                  value={leverageInput}
                  onChange={handleLeverageInput}
                  onBlur={handleLeverageBlur}
                  aria-label="Leverage percent"
                />
                <span>%</span>
              </div>
            </div>

            <label
              className="reduce-only"
              onClick={() => setReduceOnly((v) => !v)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  setReduceOnly((v) => !v);
                }
              }}
              role="checkbox"
              aria-checked={reduceOnly}
            >
              <span className={`reduce-dot${reduceOnly ? "" : " reduce-off"}`} />
              <span>Reduce Only</span>
            </label>

            <button className="primary-btn" type="button">
              Enable Trading
            </button>

            <span className="panel-divider" aria-hidden="true" />

            <div className="flex items-center justify-between px-1">
              <span className="text-[#999] text-base leading-6">Order Value</span>
              <span className="text-white text-base leading-6">N/A</span>
            </div>
            <div className="flex items-center justify-between px-1">
              <span className="text-[#999] text-base leading-6">Slippage</span>
              <span className="value-teal text-base leading-6">Est: N / A / Max: 8.00%</span>
            </div>
            <div className="flex items-center justify-between px-1">
              <span className="text-[#999] text-base leading-6">Fee</span>
              <span className="value-teal inline-icon text-base leading-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect width="20" height="20" rx="2" fill="white" fillOpacity="0.1" />
                  <path
                    d="M14.2426 14.2426C13.1569 15.3284 11.6569 16 10 16C6.6863 16 4 13.3137 4 10C4 6.6863 6.6863 4 10 4C11.6569 4 13.1569 4.67157 14.2426 5.75737C14.7953 6.31003 16 7.66667 16 7.66667"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M16 4.66675V7.66675H13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                0.0450%/0.0150%
              </span>
            </div>

            <button className="primary-btn" type="button">
              Deposit
            </button>

            <div className="dual-switch">
              <button type="button">
                <span className="inline-icon">
                  <span>Pers</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 8.4H14.25V3L21 9.75L14.25 16.5V12H9.3V7.05L3 13.8L9.3 21V15.6H11.55"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Spot</span>
                </span>
              </button>
              <button type="button">Withdraw</button>
            </div>

            <span className="panel-divider" aria-hidden="true" />

            <p className="summary-title">Account Equity</p>
            {summaryRows.map((item) => (
              <div key={item.label} className="summary-row flex items-center justify-between px-1">
                <span className="text-[#999] text-base leading-6">{item.label}</span>
                <span className={`${item.highlight ? "value-teal" : "text-white"} text-base leading-6`}>{item.value}</span>
              </div>
            ))}
          </aside>

          <footer className="trade-footer">
            <div className="footer-left">
              <span className="status-chip">
                <span className="status-dot" />
                Connected
              </span>
              <span className="footer-copyright">@2026 Support By OrTradeX</span>
            </div>

            <div className="footer-right">
              <span>Privacy Policy</span>
              <span>Terms</span>
              <span>Help</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default TradingPage;
