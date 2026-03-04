import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { KLineChartPro } from "@klinecharts/pro";
import "@klinecharts/pro/dist/klinecharts-pro.css";
import pairBtcIcon from "../assets/icons/pair-btc.png";
import caretIcon from "../assets/icons/caret.svg";
import "./TradingPage.css";

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1522;

const getViewportScale = () => {
  const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
  return viewportWidth / CANVAS_WIDTH;
};

const getInitialScale = () => {
  if (typeof window === "undefined") {
    return 1;
  }

  const cssScale = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--trade-scale"));
  if (Number.isFinite(cssScale) && cssScale > 0) {
    return cssScale;
  }

  return getViewportScale();
};

const measureCanvasHeight = (canvas) => {
  if (!canvas) {
    return 0;
  }

  let nextHeight = canvas.scrollHeight;
  for (const child of canvas.children) {
    if (!(child instanceof HTMLElement)) {
      continue;
    }

    const computed = window.getComputedStyle(child);
    if (computed.display === "none") {
      continue;
    }

    const marginBottom = Number.parseFloat(computed.marginBottom) || 0;
    nextHeight = Math.max(nextHeight, child.offsetTop + child.offsetHeight + marginBottom);
  }

  return Math.ceil(nextHeight);
};

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
  { id: "balance", label: "Balance" },
  { id: "positions", label: "Positions" },
  { id: "openOrders", label: "Open Orders" },
  { id: "tradeHistory", label: "Trade History" },
  { id: "orderHistory", label: "Order History" },
  { id: "apiLimits", label: "API Limits" },
];

const tradePrintRows = Array.from({ length: 24 }, (_, index) => ({
  price: "34567",
  size: "0.00",
  time: "00:08:22",
  side: index % 5 === 0 || index % 5 === 1 ? "sell" : "buy",
}));

const orderBookBidRows = Array.from({ length: 11 }, () => ({
  price: "34567",
  size: "0.0000",
  ratio: "0.0005%",
}));

const orderBookAskRows = Array.from({ length: 11 }, () => ({
  price: "56789",
  size: "0.0000",
  ratio: "0.0005%",
}));

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

const tradeHistoryColumns = ["Time", "Coin", "Side", "Price", "Size", "Value", "Realized PnL"];

const tradeHistoryRows = [
  {
    time: "2026/02/03 20:25:55",
    coin: "ETH",
    coinTone: "cell-negative",
    side: "Close Long",
    sideTone: "cell-negative",
    price: "2288.9",
    size: "0.0214",
    value: "28.15 USDC",
    realizedPnl: "+0.09471",
    pnlTone: "cell-positive",
  },
  {
    time: "2026/02/03 20:25:55",
    coin: "ETH",
    coinTone: "cell-positive",
    side: "Close Long",
    sideTone: "cell-positive",
    price: "2288.9",
    size: "0.0214",
    value: "28.15 USDC",
    realizedPnl: "+0.09471",
    pnlTone: "cell-positive",
  },
];

const orderHistoryColumns = [
  "Time",
  "Type",
  "Coin",
  "Side",
  "Size",
  "Value",
  "Price",
  "Reduce",
  "Status",
  "Order ID",
];

const orderHistoryRows = [
  {
    time: "2026/02/03 20:25:55",
    type: "Limit",
    coin: "ETH",
    coinTone: "cell-negative",
    side: "Close Long",
    sideTone: "cell-negative",
    size: "0.0214",
    value: "28.15 USDC",
    price: "2288.9",
    reduce: "Yes",
    status: "Filled",
    statusTone: "cell-positive",
    orderId: "1234567890",
  },
  {
    time: "2026/02/03 20:25:55",
    type: "Limit",
    coin: "ETH",
    coinTone: "cell-positive",
    side: "Close Long",
    sideTone: "cell-positive",
    size: "0.0214",
    value: "28.15 USDC",
    price: "2288.9",
    reduce: "Yes",
    status: "Open",
    statusTone: "cell-info",
    orderId: "1234567890",
  },
];

const positionsColumns = ["Contract", "Side", "Size", "Entry Price", "Mark Price", "PnL", "Margin", "Action"];
const openOrdersColumns = ["Time", "Type", "Coin", "Side", "Price", "Size", "Reduce", "Order ID"];

const apiLimitsUsageCards = [
  {
    label: "Estimated Remaining Requests",
    value: "10039",
    valueTone: "is-green",
    hint: ">0 means available",
  },
  {
    label: "Cumulative Volume (CumVlm)",
    value: "56.20 USDC",
  },
];

const apiLimitsDetailCards = [
  { label: "Cap", value: "10039" },
  { label: "Used", value: "17" },
  { label: "Surplus", value: "0" },
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
  const canvasRef = useRef(null);
  const chartHostRef = useRef(null);
  const leverageTrackRef = useRef(null);
  const [scale, setScale] = useState(getInitialScale);
  const [contentHeight, setContentHeight] = useState(CANVAS_HEIGHT);
  const [leverage, setLeverage] = useState(80);
  const [leverageInput, setLeverageInput] = useState("80");
  const [reduceOnly, setReduceOnly] = useState(true);
  const [quantityInput, setQuantityInput] = useState("0");
  const [orderSide, setOrderSide] = useState("buy");
  const [orderType, setOrderType] = useState("market");
  const [bookTab, setBookTab] = useState("orderBook");
  const [tableTab, setTableTab] = useState("balance");
  const isSellSide = orderSide === "sell";
  const isLimitType = orderType === "limit";
  const isTradesBookTab = bookTab === "trades";
  const isBalanceTab = tableTab === "balance";
  const isPositionsTab = tableTab === "positions";
  const isOpenOrdersTab = tableTab === "openOrders";
  const isTradeHistoryTab = tableTab === "tradeHistory";
  const isOrderHistoryTab = tableTab === "orderHistory";
  const isApiLimitsTab = tableTab === "apiLimits";

  const syncContentHeight = useCallback(() => {
    const measuredHeight = Math.max(CANVAS_HEIGHT, measureCanvasHeight(canvasRef.current));
    setContentHeight((prevHeight) => (prevHeight === measuredHeight ? prevHeight : measuredHeight));
  }, []);

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

  useLayoutEffect(() => {
    const updateScale = () => {
      setScale(getViewportScale());
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--trade-scale", String(scale));
  }, [scale]);

  useLayoutEffect(() => {
    syncContentHeight();
  }, [syncContentHeight, scale, tableTab, bookTab, orderType]);

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
    height: contentHeight * scale,
  };

  const canvasStyle = {
    "--trade-scale": scale,
    minHeight: CANVAS_HEIGHT,
  };

  return (
    <div className="trade-screen" ref={screenRef} style={{ "--trade-scale": scale }}>
      <div className="trade-stage" style={stageStyle}>
        <div className="trade-canvas" ref={canvasRef} style={canvasStyle}>
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

          <section className={`order-book${isTradesBookTab ? " is-trades" : ""}`}>
            <div className="order-book-tabs">
              <button
                className={isTradesBookTab ? "" : "is-active"}
                onClick={() => setBookTab("orderBook")}
                type="button"
              >
                Order Book
              </button>
              <button
                className={isTradesBookTab ? "is-active" : ""}
                onClick={() => setBookTab("trades")}
                type="button"
              >
                Trades
              </button>
            </div>

            {isTradesBookTab ? (
              <>
                <div className="trades-head">
                  <span>Price</span>
                  <span>Size(BTC)</span>
                  <span>Time</span>
                </div>
                <div className="trades-list">
                  {tradePrintRows.map((row, index) => (
                    <div key={`${row.side}-${index}`} className="trades-row">
                      <span className={`trades-price${row.side === "sell" ? " is-sell" : " is-buy"}`}>
                        {row.price}
                      </span>
                      <span className="trades-size">{row.size}</span>
                      <span className="trades-time-wrap">
                        <span className="trades-time">{row.time}</span>
                        <span className="trades-share" aria-hidden="true">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                              d="M11.6667 4.16675H15.8333V8.33341"
                              stroke="#07D4AA"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.3335 11.6667L15.4168 4.58337"
                              stroke="#07D4AA"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.8333 11.6667V15.8334H4.16667V4.16675H8.33333"
                              stroke="#07D4AA"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="order-book-head">
                  <span className="qty-chip">
                    <span className="qty-chip-value">0.05</span>
                    <span className="qty-chip-caret" aria-hidden="true">
                      <img src={caretIcon} alt="" />
                    </span>
                  </span>
                  <span className="book-unit">USDT</span>
                </div>

                <div className="order-book-depth">
                  {orderBookBidRows.map((row, index) => (
                    <div key={`bid-${index}`} className="book-depth-row is-bid">
                      <span className="book-depth-bg" />
                      <span className="book-depth-price">{row.price}</span>
                      <span className="book-depth-size">{row.size}</span>
                      <span className="book-depth-ratio">{row.ratio}</span>
                    </div>
                  ))}
                </div>

                <div className="order-book-spread">
                  <span className="order-book-spread-label">Spread</span>
                  <span className="order-book-spread-size">0.0000</span>
                  <span className="order-book-spread-ratio">0.0005%</span>
                </div>

                <div className="order-book-depth">
                  {orderBookAskRows.map((row, index) => (
                    <div key={`ask-${index}`} className="book-depth-row is-ask">
                      <span className="book-depth-bg" />
                      <span className="book-depth-price">{row.price}</span>
                      <span className="book-depth-size">{row.size}</span>
                      <span className="book-depth-ratio">{row.ratio}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>

          <section className={`bottom-table${isApiLimitsTab ? " is-api-limits" : ""}`}>
            <div className="table-tabs">
              {tableTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={tableTab === tab.id ? "is-active" : ""}
                  onClick={() => setTableTab(tab.id)}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {isBalanceTab ? (
              <>
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
              </>
            ) : null}

            {isPositionsTab ? (
              <>
                <div className="generic-table-head positions-grid">
                  {positionsColumns.map((column) => (
                    <span key={column}>{column}</span>
                  ))}
                </div>
                <div className="table-empty-state">No open positions</div>
              </>
            ) : null}

            {isOpenOrdersTab ? (
              <>
                <div className="generic-table-head open-orders-grid">
                  {openOrdersColumns.map((column) => (
                    <span key={column}>{column}</span>
                  ))}
                </div>
                <div className="table-empty-state">No open orders</div>
              </>
            ) : null}

            {isTradeHistoryTab ? (
              <>
                <div className="generic-table-head trade-history-grid">
                  {tradeHistoryColumns.map((column) => (
                    <span key={column}>{column}</span>
                  ))}
                </div>
                <div className="history-table-body">
                  {tradeHistoryRows.map((row, index) => (
                    <div key={`${row.time}-${row.coin}-${index}`} className="generic-table-row trade-history-grid">
                      <span>{row.time}</span>
                      <span className={row.coinTone}>{row.coin}</span>
                      <span className={row.sideTone}>{row.side}</span>
                      <span>{row.price}</span>
                      <span>{row.size}</span>
                      <span>{row.value}</span>
                      <span className={row.pnlTone}>{row.realizedPnl}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {isOrderHistoryTab ? (
              <>
                <div className="generic-table-head order-history-grid">
                  {orderHistoryColumns.map((column) => (
                    <span key={column}>{column}</span>
                  ))}
                </div>
                <div className="history-table-body">
                  {orderHistoryRows.map((row, index) => (
                    <div key={`${row.time}-${row.orderId}-${index}`} className="generic-table-row order-history-grid">
                      <span>{row.time}</span>
                      <span>{row.type}</span>
                      <span className={row.coinTone}>{row.coin}</span>
                      <span className={row.sideTone}>{row.side}</span>
                      <span>{row.size}</span>
                      <span>{row.value}</span>
                      <span>{row.price}</span>
                      <span>{row.reduce}</span>
                      <span className={row.statusTone}>{row.status}</span>
                      <span>{row.orderId}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {isApiLimitsTab ? (
              <div className="api-limits-panel">
                <div className="api-section-header">
                  <p className="api-section-title">AI Usage</p>
                  <p className="api-wallet-address">
                    Wallet Address: 0x0a40227b8315c486c06a19475c8543842b26b88f
                  </p>
                </div>

                <div className="api-card-row">
                  {apiLimitsUsageCards.map((card) => (
                    <div key={card.label} className="api-info-card">
                      <p className="api-card-label">{card.label}</p>
                      <p className={`api-card-value${card.valueTone ? ` ${card.valueTone}` : ""}`}>{card.value}</p>
                      {card.hint ? <p className="api-card-hint">{card.hint}</p> : null}
                    </div>
                  ))}
                </div>

                <p className="api-section-title">Details</p>
                <div className="api-card-row api-detail-row">
                  {apiLimitsDetailCards.map((card) => (
                    <div key={card.label} className="api-info-card">
                      <p className="api-card-label">{card.label}</p>
                      <p className="api-card-value">{card.value}</p>
                    </div>
                  ))}
                </div>

                <div className="api-note">
                  <p>Note: When exhausted, downgrades to 1 request per 10s.</p>
                  <p>Cap ~= Initial 10000 + Volume Bonus + Surplus</p>
                </div>

                <div className="api-limits-footer">
                  <p className="api-last-updated">Last Updated: 8:33:25 PM</p>
                  <button className="api-refresh-btn" type="button">
                    <span className="api-refresh-icon" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M10 6A4 4 0 1 1 8.9 3.15"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.5 1.5V4.5H7.5"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>Refresh Data</span>
                  </button>
                </div>
              </div>
            ) : null}
          </section>

          <aside className={`order-panel${isSellSide || isLimitType ? " is-sell" : ""}`}>
            <div className="mode-switch">
              <button type="button">Cross</button>
              <button type="button">1x</button>
              <button type="button">One-Way</button>
            </div>

            <div className="side-tabs">
              <button
                className={isLimitType ? "" : "is-active"}
                onClick={() => setOrderType("market")}
                type="button"
              >
                Market
              </button>
              <button
                className={isLimitType ? "is-active" : ""}
                onClick={() => setOrderType("limit")}
                type="button"
              >
                Limit
              </button>
            </div>

            <div className="buy-sell">
              <button
                className={isSellSide ? "" : "is-active is-buy-active"}
                onClick={() => setOrderSide("buy")}
                type="button"
              >
                Buy/Long
              </button>
              <button
                className={isSellSide ? "is-active is-sell-active" : ""}
                onClick={() => setOrderSide("sell")}
                type="button"
              >
                Sell/Short
              </button>
            </div>

            <div className="flex items-center justify-between px-1">
              <span className="text-[#999] text-base leading-6">Available</span>
              <span className="text-white text-base leading-6">0.00 USDC</span>
            </div>
            <div className="flex items-center justify-between px-1">
              <span className="text-[#999] text-base leading-6">Current Position</span>
              <span className="text-white text-base leading-6">0.0000 BTC</span>
            </div>

            {isLimitType ? (
              <div className="price-input">
                <span className="price-left">
                  <span className="price-label">Price</span>
                  <span className="price-value">6789</span>
                </span>
                <span className="price-right">
                  <span>USDC</span>
                  <span className="price-mid">Mid</span>
                </span>
              </div>
            ) : null}

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

            <div className={`reduce-row${isLimitType ? " has-tif" : ""}`}>
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
              {isLimitType ? (
                <div className="tif-switch">
                  <span className="tif-label">TIF</span>
                  <span className="tif-value">USDC</span>
                  <span className="tif-caret" aria-hidden="true">
                    <img src={caretIcon} alt="" />
                  </span>
                </div>
              ) : null}
            </div>

            <button className={`primary-btn${isSellSide ? " is-sell" : ""}`} type="button">
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

        </div>
      </div>
    </div>
  );
}

export default TradingPage;
