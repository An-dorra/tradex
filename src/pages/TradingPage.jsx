import { useCallback, useEffect, useRef, useState } from "react";
import pairBtcIcon from "../assets/icons/pair-btc.png";
import caretIcon from "../assets/icons/caret.svg";
import useIsMobileViewport from "../hooks/useIsMobileViewport.js";
import useClickOutside from "../hooks/useClickOutside.js";
import TradeOrderFormContent from "../components/TradeOrderFormContent.jsx";
import { BTC_SYMBOL, CHART_PERIODS, createLocalBtcDatafeed, loadKlineChartPro } from "./tradingChartDatafeed.js";
import "./TradingPage.css";

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

const mobileMainTabs = [
  { id: "chart", label: "Chart" },
  { id: "orderBook", label: "Order Book" },
  { id: "trades", label: "Trades" },
];

const mobileTableTabs = tableTabs;
const mobileSymbolInfoRows = [
  [
    { label: "Mark", value: "69291.0" },
    { label: "Oracle", value: "69291.0" },
  ],
  [
    { label: "24h Volume", value: "$2.51B" },
    { label: "Open Interest", value: "$2.51B" },
  ],
  [{ label: "Funding / Countdown", value: "0.0009%/ 34:18" }],
];

const tradePrintRows = Array.from({ length: 24 }, (_, index) => ({
  price: "34567",
  size: "0.00",
  time: "00:08:22",
  side: index % 5 === 0 || index % 5 === 1 ? "sell" : "buy",
}));

const desktopChartPeriods = [
  { id: "1m", label: "1m", multiplier: 1, timespan: "minute", text: "1m" },
  { id: "5m", label: "5m", multiplier: 5, timespan: "minute", text: "5m" },
  { id: "15m", label: "15m", multiplier: 15, timespan: "minute", text: "15m" },
  { id: "30m", label: "30m", multiplier: 30, timespan: "minute", text: "30m" },
  { id: "1h", label: "1h", multiplier: 1, timespan: "hour", text: "1h" },
  { id: "4h", label: "4h", multiplier: 4, timespan: "hour", text: "4h" },
  { id: "1d", label: "1d", multiplier: 1, timespan: "day", text: "1d" },
];

const mobileTradesRows = [
  { price: "32.223", size: "2.00", time: "23:59:55", side: "buy" },
  { price: "32.223", size: "2.00", time: "23:59:55", side: "buy" },
  { price: "32.223", size: "2.00", time: "23:59:55", side: "buy" },
  { price: "32.223", size: "2.00", time: "23:59:55", side: "sell" },
  { price: "32.223", size: "2.00", time: "23:59:55", side: "buy" },
  { price: "32.223", size: "2.00", time: "23:59:55", side: "buy" },
  { price: "32.223", size: "2.00", time: "23:59:55", side: "sell" },
  { price: "32.223", size: "2.00", time: "23:59:55", side: "buy" },
  { price: "32.223", size: "2.00", time: "23:59:55", side: "buy" },
];

const orderBookBidRows = Array.from({ length: 10 }, () => ({
  price: "34567",
  size: "0.0000",
  ratio: "0.0005%",
}));

const orderBookAskRows = Array.from({ length: 10 }, () => ({
  price: "56789",
  size: "0.0000",
  ratio: "0.0005%",
}));

const mobileOrderBookDepthRows = [
  { total: "89.44", price: "32.124" },
  { total: "89.44", price: "32.124" },
  { total: "89.44", price: "32.124" },
  { total: "994.23", price: "32.124" },
  { total: "1,489.44", price: "32.124" },
  { total: "3,489.44", price: "32.124" },
  { total: "3,489.44", price: "32.124" },
  { total: "3,489.44", price: "32.124" },
  { total: "3,489.44", price: "32.124" },
  { total: "3,489.44", price: "32.124" },
];

const mobileOrderBookDepthBarWidths = [10, 24, 34, 48, 62, 83, 83, 83, 83, 83];
const mobileOrderBookSizeOptions = ["0.001", "0.005", "0.01", "0.1"];
const mobileOrderBookSymbolOptions = ["HYPE", "BTC", "ETH", "SOL"];
const quantityUnitOptions = ["USDC", "BTC", "ETH", "SOL"];
const tifUnitOptions = quantityUnitOptions;

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

const accountEquityRows = [
  { label: "Spot", value: "$0.00" },
  { label: "Perps", value: "$0.00" },
];

const perpsOverviewRows = [
  { label: "Balance", value: "$0.00" },
  { label: "Unrealized PNL", value: "$0.00" },
  { label: "Cross Margin Ratio", value: "0.00%", highlight: true },
  { label: "Maintenance Margin", value: "$0.00" },
  { label: "Cross Account Leverage", value: "0.00x" },
];

const summaryRows = [...accountEquityRows, { label: "Perps Overview", value: "" }, ...perpsOverviewRows];

function TradingPage() {
  const screenRef = useRef(null);
  const desktopChartHostRef = useRef(null);
  const mobileChartHostRef = useRef(null);
  const leverageTrackRef = useRef(null);
  const mobileOrderBookSizeWrapRef = useRef(null);
  const mobileOrderBookSymbolWrapRef = useRef(null);
  const quantityUnitWrapRef = useRef(null);
  const tifUnitWrapRef = useRef(null);
  const [leverage, setLeverage] = useState(80);
  const [leverageInput, setLeverageInput] = useState("80");
  const [reduceOnly, setReduceOnly] = useState(true);
  const [quantityInput, setQuantityInput] = useState("0");
  const [orderSide, setOrderSide] = useState("buy");
  const [orderType, setOrderType] = useState("market");
  const [bookTab, setBookTab] = useState("orderBook");
  const [mobileMainTab, setMobileMainTab] = useState("chart");
  const [mobileBottomTab, setMobileBottomTab] = useState("trade");
  const [tableTab, setTableTab] = useState("balance");
  const [isMobileSymbolInfoOpen, setIsMobileSymbolInfoOpen] = useState(false);
  const [mobileOrderBookSize, setMobileOrderBookSize] = useState(mobileOrderBookSizeOptions[0]);
  const [mobileOrderBookSymbol, setMobileOrderBookSymbol] = useState(mobileOrderBookSymbolOptions[0]);
  const [mobileOrderBookDropdown, setMobileOrderBookDropdown] = useState(null);
  const [quantityUnit, setQuantityUnit] = useState(quantityUnitOptions[0]);
  const [isQuantityUnitMenuOpen, setIsQuantityUnitMenuOpen] = useState(false);
  const [tifUnit, setTifUnit] = useState(tifUnitOptions[0]);
  const [isTifMenuOpen, setIsTifMenuOpen] = useState(false);
  const isMobileViewport = useIsMobileViewport();
  const isSellSide = orderSide === "sell";
  const isLimitType = orderType === "limit";
  const isTradesBookTab = bookTab === "trades";
  const isMobileOrderBookMainTab = mobileMainTab === "orderBook";
  const isMobileTradesMainTab = mobileMainTab === "trades";
  const isMobileChartMainTab = mobileMainTab === "chart";
  const isMobileBottomMarketsTab = mobileBottomTab === "markets";
  const isMobileBottomTradeTab = mobileBottomTab === "trade";
  const isMobileBottomAccountTab = mobileBottomTab === "account";
  const isBalanceTab = tableTab === "balance";
  const isPositionsTab = tableTab === "positions";
  const isOpenOrdersTab = tableTab === "openOrders";
  const isTradeHistoryTab = tableTab === "tradeHistory";
  const isOrderHistoryTab = tableTab === "orderHistory";
  const isApiLimitsTab = tableTab === "apiLimits";

  const handleQuantityChange = useCallback((nextValue) => {
    if (nextValue === "" || /^\d*\.?\d*$/.test(nextValue)) {
      setQuantityInput(nextValue);
    }
  }, []);

  const handleOrderTypeChange = useCallback((nextOrderType) => {
    setOrderType(nextOrderType);
  }, []);

  const handleOrderSideChange = useCallback((nextOrderSide) => {
    setOrderSide(nextOrderSide);
  }, []);

  const handleReduceOnlyToggle = useCallback(() => {
    setReduceOnly((value) => !value);
  }, []);

  const handleQuantityUnitToggle = useCallback(() => {
    setIsTifMenuOpen(false);
    setIsQuantityUnitMenuOpen((prev) => !prev);
  }, []);

  const handleQuantityUnitSelect = useCallback((nextUnit) => {
    setQuantityUnit(nextUnit);
    setIsQuantityUnitMenuOpen(false);
  }, []);

  const handleTifUnitToggle = useCallback(() => {
    setIsQuantityUnitMenuOpen(false);
    setIsTifMenuOpen((prev) => !prev);
  }, []);

  const handleTifUnitSelect = useCallback((nextUnit) => {
    setTifUnit(nextUnit);
    setIsTifMenuOpen(false);
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

  const handleTrackPointerDown = (e) => {
    e.preventDefault();
    const pointerId = e.pointerId;

    updateLeverageFromClientX(e.clientX);

    const onMove = (ev) => {
      if (ev.pointerId !== pointerId) {
        return;
      }
      updateLeverageFromClientX(ev.clientX);
    };

    const onUp = (ev) => {
      if (ev.pointerId !== pointerId) {
        return;
      }
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
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

  useClickOutside(Boolean(mobileOrderBookDropdown), [mobileOrderBookSizeWrapRef, mobileOrderBookSymbolWrapRef], () => {
    setMobileOrderBookDropdown(null);
  });

  useEffect(() => {
    if (!isMobileOrderBookMainTab) {
      setMobileOrderBookDropdown(null);
    }
  }, [isMobileOrderBookMainTab]);

  useEffect(() => {
    if (mobileMainTab === "chart") {
      return;
    }

    const nextMobileMainTab = isTradesBookTab ? "trades" : "orderBook";
    setMobileMainTab((prev) => (prev === nextMobileMainTab ? prev : nextMobileMainTab));
  }, [mobileMainTab, isTradesBookTab]);

  useEffect(() => {
    if (isMobileViewport && !isMobileBottomTradeTab) {
      setIsQuantityUnitMenuOpen(false);
      setIsTifMenuOpen(false);
    }
  }, [isMobileBottomTradeTab, isMobileViewport]);

  useEffect(() => {
    if (!isLimitType) {
      setIsTifMenuOpen(false);
    }
  }, [isLimitType]);

  useClickOutside(isQuantityUnitMenuOpen || isTifMenuOpen, [quantityUnitWrapRef, tifUnitWrapRef], () => {
    setIsQuantityUnitMenuOpen(false);
    setIsTifMenuOpen(false);
  });

  useEffect(() => {
    if (isMobileViewport && (!isMobileBottomMarketsTab || !isMobileChartMainTab)) {
      return undefined;
    }

    const host = isMobileViewport ? mobileChartHostRef.current : desktopChartHostRef.current;
    if (!host) {
      return undefined;
    }

    let isDisposed = false;
    let datafeed;
    host.innerHTML = "";

    const initChart = async () => {
      const KLineChartPro = await loadKlineChartPro();

      if (isDisposed) {
        return;
      }

      datafeed = createLocalBtcDatafeed();

      new KLineChartPro({
        container: host,
        theme: "dark",
        locale: "en-US",
        timezone: "Etc/UTC",
        symbol: BTC_SYMBOL,
        period: isMobileViewport ? CHART_PERIODS[1] : desktopChartPeriods[4],
        periods: isMobileViewport ? CHART_PERIODS : desktopChartPeriods,
        mainIndicators: isMobileViewport ? [] : ["MA"],
        subIndicators: isMobileViewport ? [] : ["VOL"],
        datafeed,
      });
    };

    initChart().catch(() => {
      if (!isDisposed) {
        host.innerHTML = "";
      }
    });

    return () => {
      isDisposed = true;
      datafeed?.dispose();
      host.innerHTML = "";
    };
  }, [isMobileChartMainTab, isMobileViewport, isMobileBottomMarketsTab]);

  if (isMobileViewport) {
    return (
      <div className={`trade-mobile-screen${isMobileBottomAccountTab ? " is-account" : ""}`} ref={screenRef}>
        <div className="trade-mobile-shell">
          {!isMobileBottomAccountTab ? (
            <>
              <section className="trade-mobile-summary">
                <div className="trade-mobile-summary-head">
                  <p className="trade-mobile-summary-title">Summary of invitations</p>
                  <button className="trade-mobile-date-filter" type="button">
                    <span className="trade-mobile-date-filter-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path
                          d="M4 5h16l-5.5 6.5V18l-5 2v-8.5L4 5Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                        <path d="M20 7h-2.5M20 11h-2.5M20 15h-2.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
                      </svg>
                    </span>
                    <span>Date</span>
                  </button>
                </div>
                <div className="trade-mobile-market-row">
                  <div className="trade-mobile-market-main">
                    <div className="trade-mobile-market-icon">
                      <img src={pairBtcIcon} alt="" />
                    </div>
                    <div className="trade-mobile-market-text">
                      <div className="trade-mobile-market-name-row">
                        <span>BTC-USDC</span>
                        <span className="trade-mobile-market-caret" aria-hidden="true">
                          <img src={caretIcon} alt="" />
                        </span>
                      </div>
                      <span className="trade-mobile-market-leverage">40x</span>
                    </div>
                  </div>
                  <div className="trade-mobile-market-change">
                    <span className="trade-mobile-market-label">24h Change</span>
                    <span className="trade-mobile-market-value">+325.00/+0.47%</span>
                  </div>
                  <button
                    className={`trade-mobile-market-expand${isMobileSymbolInfoOpen ? " is-expanded" : ""}`}
                    type="button"
                    aria-label="Toggle symbol information"
                    aria-expanded={isMobileSymbolInfoOpen}
                    onClick={() => setIsMobileSymbolInfoOpen((prev) => !prev)}
                  >
                    <svg viewBox="0 0 16 16" fill="none">
                      <path d="M4.4 6.1 8 9.7l3.6-3.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
                    </svg>
                  </button>
                </div>
                {isMobileSymbolInfoOpen ? (
                  <div className="trade-mobile-symbol-info">
                    {mobileSymbolInfoRows.map((row, rowIndex) => (
                      <div key={`symbol-info-row-${rowIndex}`} className="trade-mobile-symbol-info-row">
                        {row.map((item) => (
                          <div key={item.label} className="trade-mobile-symbol-info-item">
                            <span className="trade-mobile-symbol-info-label">{item.label}</span>
                            <span className="trade-mobile-symbol-info-value">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : null}
              </section>

              {isMobileBottomMarketsTab ? (
                <section className="trade-mobile-chart-card">
                  <div className="trade-mobile-main-tabs">
                    {mobileMainTabs.map((tab) => (
                      <button
                        key={tab.id}
                        className={mobileMainTab === tab.id ? "is-active" : ""}
                        onClick={() => {
                          setMobileMainTab(tab.id);
                          if (tab.id === "orderBook") {
                            setBookTab("orderBook");
                          }
                          if (tab.id === "trades") {
                            setBookTab("trades");
                          }
                        }}
                        type="button"
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="trade-mobile-kline-container">
                    <div className="trade-mobile-main-panel">
                      {isMobileChartMainTab ? (
                        <section className="trade-mobile-pro-chart-shell" ref={mobileChartHostRef} />
                      ) : null}

                      {isMobileOrderBookMainTab ? (
                        <div className="trade-mobile-order-book-panel">
                          <div className="trade-mobile-order-book-top">
                            <div className="trade-mobile-order-book-select-wrap" ref={mobileOrderBookSizeWrapRef}>
                              <button
                                className={`trade-mobile-order-book-select${mobileOrderBookDropdown === "size" ? " is-open" : ""}`}
                                type="button"
                                aria-expanded={mobileOrderBookDropdown === "size"}
                                onClick={() => setMobileOrderBookDropdown((prev) => (prev === "size" ? null : "size"))}
                              >
                                <span>{mobileOrderBookSize}</span>
                                <span className="trade-mobile-order-book-select-caret" aria-hidden="true">
                                  <img src={caretIcon} alt="" />
                                </span>
                              </button>
                              {mobileOrderBookDropdown === "size" ? (
                                <div className="trade-mobile-order-book-dropdown" role="listbox" aria-label="Order size">
                                  {mobileOrderBookSizeOptions.map((option) => (
                                    <button
                                      key={option}
                                      className={`trade-mobile-order-book-option${mobileOrderBookSize === option ? " is-active" : ""}`}
                                      type="button"
                                      role="option"
                                      aria-selected={mobileOrderBookSize === option}
                                      onClick={() => {
                                        setMobileOrderBookSize(option);
                                        setMobileOrderBookDropdown(null);
                                      }}
                                    >
                                      {option}
                                    </button>
                                  ))}
                                </div>
                              ) : null}
                            </div>

                            <div className="trade-mobile-order-book-select-wrap is-end" ref={mobileOrderBookSymbolWrapRef}>
                              <button
                                className={`trade-mobile-order-book-select${mobileOrderBookDropdown === "symbol" ? " is-open" : ""}`}
                                type="button"
                                aria-expanded={mobileOrderBookDropdown === "symbol"}
                                onClick={() => setMobileOrderBookDropdown((prev) => (prev === "symbol" ? null : "symbol"))}
                              >
                                <span>{mobileOrderBookSymbol}</span>
                                <span className="trade-mobile-order-book-select-caret" aria-hidden="true">
                                  <img src={caretIcon} alt="" />
                                </span>
                              </button>
                              {mobileOrderBookDropdown === "symbol" ? (
                                <div className="trade-mobile-order-book-dropdown" role="listbox" aria-label="Order symbol">
                                  {mobileOrderBookSymbolOptions.map((option) => (
                                    <button
                                      key={option}
                                      className={`trade-mobile-order-book-option${mobileOrderBookSymbol === option ? " is-active" : ""}`}
                                      type="button"
                                      role="option"
                                      aria-selected={mobileOrderBookSymbol === option}
                                      onClick={() => {
                                        setMobileOrderBookSymbol(option);
                                        setMobileOrderBookDropdown(null);
                                      }}
                                    >
                                      {option}
                                    </button>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="trade-mobile-order-book-depth-wrap">
                            <div className="trade-mobile-order-book-depth-side">
                              <div className="trade-mobile-order-book-depth-head">
                                <span>{`Total (${mobileOrderBookSymbol})`}</span>
                                <span>Price</span>
                              </div>
                              <div className="trade-mobile-order-book-depth-list">
                                {mobileOrderBookDepthRows.map((row, index) => (
                                  <div key={`mobile-bid-depth-${index}`} className="trade-mobile-order-book-depth-row is-bid">
                                    <span
                                      className="trade-mobile-order-book-depth-bg"
                                      style={{ width: `${mobileOrderBookDepthBarWidths[index] ?? 10}px` }}
                                      aria-hidden="true"
                                    />
                                    <span className="trade-mobile-order-book-depth-total">{row.total}</span>
                                    <span className="trade-mobile-order-book-depth-price">{row.price}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="trade-mobile-order-book-depth-side">
                              <div className="trade-mobile-order-book-depth-head">
                                <span>Price</span>
                                <span>{`Total (${mobileOrderBookSymbol})`}</span>
                              </div>
                              <div className="trade-mobile-order-book-depth-list">
                                {mobileOrderBookDepthRows.map((row, index) => (
                                  <div key={`mobile-ask-depth-${index}`} className="trade-mobile-order-book-depth-row is-ask">
                                    <span
                                      className="trade-mobile-order-book-depth-bg"
                                      style={{ width: `${mobileOrderBookDepthBarWidths[index] ?? 10}px` }}
                                      aria-hidden="true"
                                    />
                                    <span className="trade-mobile-order-book-depth-price">{row.price}</span>
                                    <span className="trade-mobile-order-book-depth-total">{row.total}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {isMobileTradesMainTab ? (
                        <div className="trade-mobile-trades-panel">
                          <div className="trade-mobile-trades-head">
                            <span>Price</span>
                            <span>{`Size (${mobileOrderBookSymbol})`}</span>
                            <span>Time</span>
                          </div>
                          <div className="trade-mobile-trades-list">
                            {mobileTradesRows.map((row, index) => (
                              <div key={`mobile-trade-${index}`} className="trade-mobile-trades-row">
                                <span className={`trade-mobile-trades-price${row.side === "sell" ? " is-sell" : " is-buy"}`}>{row.price}</span>
                                <span className="trade-mobile-trades-size">{row.size}</span>
                                <span className="trade-mobile-trades-time-wrap">
                                  <span className="trade-mobile-trades-time">{row.time}</span>
                                  <span className="trade-mobile-trades-share" aria-hidden="true">
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
                        </div>
                      ) : null}
                    </div>
                  </div>
                </section>
              ) : null}

              {isMobileBottomTradeTab ? (
                <section className={`trade-mobile-order-card${isSellSide || isLimitType ? " is-sell" : ""}`}>
                  <TradeOrderFormContent
                    isLimitType={isLimitType}
                    isSellSide={isSellSide}
                    reduceOnly={reduceOnly}
                    quantityInput={quantityInput}
                    leverage={leverage}
                    leverageInput={leverageInput}
                    quantityUnit={quantityUnit}
                    tifUnit={tifUnit}
                    quantityUnitOptions={quantityUnitOptions}
                    tifUnitOptions={tifUnitOptions}
                    isQuantityUnitMenuOpen={isQuantityUnitMenuOpen}
                    isTifMenuOpen={isTifMenuOpen}
                    leverageTrackRef={leverageTrackRef}
                    quantityUnitWrapRef={quantityUnitWrapRef}
                    tifUnitWrapRef={tifUnitWrapRef}
                    onOrderTypeChange={handleOrderTypeChange}
                    onOrderSideChange={handleOrderSideChange}
                    onQuantityChange={handleQuantityChange}
                    onQuantityUnitToggle={handleQuantityUnitToggle}
                    onQuantityUnitSelect={handleQuantityUnitSelect}
                    onLeverageTrackPointerDown={handleTrackPointerDown}
                    onLeverageInputChange={handleLeverageInput}
                    onLeverageBlur={handleLeverageBlur}
                    onReduceOnlyToggle={handleReduceOnlyToggle}
                    onTifUnitToggle={handleTifUnitToggle}
                    onTifUnitSelect={handleTifUnitSelect}
                  />
                </section>
              ) : null}

              <section className="trade-mobile-balance-card">
                <div className="trade-mobile-table-tabs" role="tablist" aria-label="Trade table tabs">
                  {mobileTableTabs.map((tab) => (
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

                <div className="trade-mobile-balance-content">
                  <div className={`trade-mobile-table-scroll is-${tableTab}`}>
                    {isBalanceTab ? (
                      <>
                        <div className="trade-mobile-balance-head trade-mobile-balance-grid">
                          <span>Coin</span>
                          <span>Total Balance</span>
                          <span>Available</span>
                          <span>USDC Value</span>
                          <span>PnL</span>
                          <span>Send</span>
                          <span>Transfer</span>
                          <span>Contract</span>
                        </div>
                        <div className="trade-mobile-balance-body">
                          {tableRows.map((row, index) => (
                            <div key={`mobile-balance-${index}`} className="trade-mobile-balance-row trade-mobile-balance-grid">
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
                        <div className="trade-mobile-generic-head trade-mobile-positions-grid">
                          {positionsColumns.map((column) => (
                            <span key={column}>{column}</span>
                          ))}
                        </div>
                        <div className="trade-mobile-empty-state">No open positions</div>
                      </>
                    ) : null}

                    {isOpenOrdersTab ? (
                      <>
                        <div className="trade-mobile-generic-head trade-mobile-open-orders-grid">
                          {openOrdersColumns.map((column) => (
                            <span key={column}>{column}</span>
                          ))}
                        </div>
                        <div className="trade-mobile-empty-state">No open orders</div>
                      </>
                    ) : null}

                    {isTradeHistoryTab ? (
                      <>
                        <div className="trade-mobile-generic-head trade-mobile-trade-history-grid">
                          {tradeHistoryColumns.map((column) => (
                            <span key={column}>{column}</span>
                          ))}
                        </div>
                        <div className="trade-mobile-history-body">
                          {tradeHistoryRows.map((row, index) => (
                            <div key={`${row.time}-${row.coin}-${index}`} className="trade-mobile-generic-row trade-mobile-trade-history-grid">
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
                        <div className="trade-mobile-generic-head trade-mobile-order-history-grid">
                          {orderHistoryColumns.map((column) => (
                            <span key={column}>{column}</span>
                          ))}
                        </div>
                        <div className="trade-mobile-history-body">
                          {orderHistoryRows.map((row, index) => (
                            <div key={`${row.time}-${row.orderId}-${index}`} className="trade-mobile-generic-row trade-mobile-order-history-grid">
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

                    {isApiLimitsTab ? <div className="trade-mobile-empty-state">No data</div> : null}
                  </div>
                </div>
              </section>
            </>
          ) : (
            <>
              <section className="trade-mobile-account-card">
                <p className="trade-mobile-account-title">Account Equity</p>
                {accountEquityRows.map((item) => (
                  <div key={`mobile-account-equity-${item.label}`} className="trade-mobile-account-row">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                ))}
              </section>

              <section className="trade-mobile-account-card">
                <p className="trade-mobile-account-title">Perps Overview</p>
                {perpsOverviewRows.map((item) => (
                  <div key={`mobile-perps-overview-${item.label}`} className="trade-mobile-account-row">
                    <span>{item.label}</span>
                    <span className={item.highlight ? "is-highlight" : ""}>{item.value}</span>
                  </div>
                ))}
              </section>
            </>
          )}
        </div>

        {isMobileBottomAccountTab ? (
          <div className="trade-mobile-account-actions">
            <button className="trade-mobile-account-deposit" type="button">
              Deposit
            </button>
            <div className="trade-mobile-account-shortcuts">
              <button className="trade-mobile-account-shortcut" type="button">
                <span>Pers</span>
                <span className="trade-mobile-account-switch-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 8.4H14.25V3L21 9.75L14.25 16.5V12H9.3V7.05L3 13.8L9.3 21V15.6H11.55"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Spot</span>
              </button>
              <button className="trade-mobile-account-shortcut" type="button">
                Withdraw
              </button>
            </div>
          </div>
        ) : null}

        <nav className="trade-mobile-bottom-nav" aria-label="Trade bottom navigation">
          <button
            className={`trade-mobile-bottom-item${isMobileBottomMarketsTab ? " is-active" : ""}`}
            type="button"
            onClick={() => setMobileBottomTab("markets")}
          >
            <span className="trade-mobile-bottom-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="13" width="4" height="8" rx="2" fill="currentColor" />
                <rect x="10" y="9" width="4" height="12" rx="2" fill="currentColor" />
                <rect x="17" y="4" width="4" height="17" rx="2" fill="currentColor" />
              </svg>
            </span>
            <span>Markets</span>
          </button>
          <button
            className={`trade-mobile-bottom-item${isMobileBottomTradeTab ? " is-active" : ""}`}
            type="button"
            onClick={() => setMobileBottomTab("trade")}
          >
            <span className="trade-mobile-bottom-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 16.5 9.5 11 13.5 15l6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
                <path d="M17.2 9H19.5v2.3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
              </svg>
            </span>
            <span>Trade</span>
          </button>
          <button
            className={`trade-mobile-bottom-item${isMobileBottomAccountTab ? " is-active" : ""}`}
            type="button"
            onClick={() => setMobileBottomTab("account")}
          >
            <span className="trade-mobile-bottom-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="9.2" r="3.1" stroke="currentColor" strokeWidth="1.8" />
                <path d="M6.7 18.4c.33-2.26 2.26-3.9 5.3-3.9s4.98 1.64 5.3 3.9" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
              </svg>
            </span>
            <span>Trade</span>
          </button>
        </nav>
      </div>
    );
  }

  return (
    <div className="trade-screen" ref={screenRef}>
      <div className="trade-canvas">
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

        <section className="trade-chart-region">
          <section className="pro-chart-shell" ref={desktopChartHostRef} />
        </section>

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
                    <span className={`trades-price${row.side === "sell" ? " is-sell" : " is-buy"}`}>{row.price}</span>
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

          <div className="table-content">
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
                  <p className="api-wallet-address">Wallet Address: 0x0a40227b8315c486c06a19475c8543842b26b88f</p>
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
          </div>
        </section>

        <aside className={`order-panel${isSellSide || isLimitType ? " is-sell" : ""}`}>
          <TradeOrderFormContent
            isLimitType={isLimitType}
            isSellSide={isSellSide}
            reduceOnly={reduceOnly}
            quantityInput={quantityInput}
            leverage={leverage}
            leverageInput={leverageInput}
            quantityUnit={quantityUnit}
            tifUnit={tifUnit}
            quantityUnitOptions={quantityUnitOptions}
            tifUnitOptions={tifUnitOptions}
            isQuantityUnitMenuOpen={isQuantityUnitMenuOpen}
            isTifMenuOpen={isTifMenuOpen}
            leverageTrackRef={leverageTrackRef}
            quantityUnitWrapRef={quantityUnitWrapRef}
            tifUnitWrapRef={tifUnitWrapRef}
            onOrderTypeChange={handleOrderTypeChange}
            onOrderSideChange={handleOrderSideChange}
            onQuantityChange={handleQuantityChange}
            onQuantityUnitToggle={handleQuantityUnitToggle}
            onQuantityUnitSelect={handleQuantityUnitSelect}
            onLeverageTrackPointerDown={handleTrackPointerDown}
            onLeverageInputChange={handleLeverageInput}
            onLeverageBlur={handleLeverageBlur}
            onReduceOnlyToggle={handleReduceOnlyToggle}
            onTifUnitToggle={handleTifUnitToggle}
            onTifUnitSelect={handleTifUnitSelect}
            showAccountActions
            summaryRows={summaryRows}
          />
        </aside>
      </div>
    </div>
  );
}

export default TradingPage;
