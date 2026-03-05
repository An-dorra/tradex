export const BTC_SYMBOL = {
  ticker: "BTC",
  name: "BTC",
  shortName: "BTC",
  market: "crypto",
  type: "crypto",
  pricePrecision: 1,
  volumePrecision: 4,
  priceCurrency: "USDC",
};

export const CHART_PERIODS = [
  { multiplier: 1, timespan: "minute", text: "1m" },
  { multiplier: 5, timespan: "minute", text: "5m" },
  { multiplier: 15, timespan: "minute", text: "15m" },
  { multiplier: 1, timespan: "hour", text: "1H" },
  { multiplier: 4, timespan: "hour", text: "4H" },
  { multiplier: 1, timespan: "day", text: "D" },
];

export const DEFAULT_CHART_PERIOD = CHART_PERIODS[0];

const PERIOD_STEP_MS = {
  minute: 60 * 1000,
  hour: 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000,
  year: 365 * 24 * 60 * 60 * 1000,
};

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

export function createLocalBtcDatafeed() {
  return new LocalBtcDatafeed();
}

let klineChartProPromise;

export async function loadKlineChartPro() {
  if (!klineChartProPromise) {
    klineChartProPromise = Promise.all([import("@klinecharts/pro"), import("@klinecharts/pro/dist/klinecharts-pro.css")]).then(
      ([module]) => module.KLineChartPro,
    );
  }

  return klineChartProPromise;
}
