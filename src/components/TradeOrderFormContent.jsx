import { memo } from "react";
import caretIcon from "../assets/icons/caret.svg";

function TradeOrderFormContent({
  isLimitType,
  isSellSide,
  reduceOnly,
  quantityInput,
  leverage,
  leverageInput,
  quantityUnit,
  tifUnit,
  quantityUnitOptions,
  tifUnitOptions,
  isQuantityUnitMenuOpen,
  isTifMenuOpen,
  leverageTrackRef,
  quantityUnitWrapRef,
  tifUnitWrapRef,
  onOrderTypeChange,
  onOrderSideChange,
  onQuantityChange,
  onQuantityUnitToggle,
  onQuantityUnitSelect,
  onLeverageTrackPointerDown,
  onLeverageInputChange,
  onLeverageBlur,
  onReduceOnlyToggle,
  onTifUnitToggle,
  onTifUnitSelect,
  showAccountActions = false,
  summaryRows = [],
}) {
  return (
    <>
      <div className="mode-switch">
        <button type="button">Cross</button>
        <button type="button">1x</button>
        <button type="button">One-Way</button>
      </div>

      <div className="side-tabs">
        <button className={isLimitType ? "" : "is-active"} onClick={() => onOrderTypeChange("market")} type="button">
          Market
        </button>
        <button className={isLimitType ? "is-active" : ""} onClick={() => onOrderTypeChange("limit")} type="button">
          Limit
        </button>
      </div>

      <div className="buy-sell">
        <button className={isSellSide ? "" : "is-active is-buy-active"} onClick={() => onOrderSideChange("buy")} type="button">
          Buy/Long
        </button>
        <button className={isSellSide ? "is-active is-sell-active" : ""} onClick={() => onOrderSideChange("sell")} type="button">
          Sell/Short
        </button>
      </div>

      <div className="kv-row">
        <span>Available</span>
        <span>0.00 USDC</span>
      </div>
      <div className="kv-row">
        <span>Current Position</span>
        <span>0.0000 BTC</span>
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
            onChange={(event) => onQuantityChange(event.target.value)}
            placeholder="0"
            aria-label="Order quantity"
          />
        </label>
        <div className="qty-unit-wrap" ref={quantityUnitWrapRef}>
          <button
            className={`qty-unit-trigger${isQuantityUnitMenuOpen ? " is-open" : ""}`}
            type="button"
            aria-expanded={isQuantityUnitMenuOpen}
            aria-label="Select quantity unit"
            onClick={onQuantityUnitToggle}
          >
            <span>{quantityUnit}</span>
            <span className="qty-unit-caret" aria-hidden="true">
              <img src={caretIcon} alt="" />
            </span>
          </button>
          {isQuantityUnitMenuOpen ? (
            <div className="qty-unit-menu" role="listbox" aria-label="Quantity unit">
              {quantityUnitOptions.map((option) => (
                <button
                  key={option}
                  className={`qty-unit-option${quantityUnit === option ? " is-active" : ""}`}
                  type="button"
                  role="option"
                  aria-selected={quantityUnit === option}
                  onClick={() => onQuantityUnitSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <p className="margin-note">Required Margin N/A</p>

      <div className="leverage-row">
        <div className="leverage-track" ref={leverageTrackRef} onPointerDown={onLeverageTrackPointerDown}>
          <div className="leverage-progress" style={{ width: `${leverage}%` }} />
          <span
            className="lever-dot"
            style={{ left: `${leverage}%`, transform: "translateX(-50%)" }}
            onPointerDown={onLeverageTrackPointerDown}
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
            onChange={onLeverageInputChange}
            onBlur={onLeverageBlur}
            aria-label="Leverage percent"
          />
          <span>%</span>
        </div>
      </div>

      <div className={`reduce-row${isLimitType ? " has-tif" : ""}`}>
        <label
          className="reduce-only"
          onClick={onReduceOnlyToggle}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === " " || event.key === "Enter") {
              event.preventDefault();
              onReduceOnlyToggle();
            }
          }}
          role="checkbox"
          aria-checked={reduceOnly}
        >
          <span className={`reduce-dot${reduceOnly ? "" : " reduce-off"}`} />
          <span>Reduce Only</span>
        </label>
        {isLimitType ? (
          <div className="tif-wrap" ref={tifUnitWrapRef}>
            <button
              className={`tif-switch${isTifMenuOpen ? " is-open" : ""}`}
              type="button"
              aria-expanded={isTifMenuOpen}
              aria-label="Select TIF unit"
              onClick={onTifUnitToggle}
            >
              <span className="tif-label">TIF</span>
              <span className="tif-value">{tifUnit}</span>
              <span className="tif-caret" aria-hidden="true">
                <img src={caretIcon} alt="" />
              </span>
            </button>
            {isTifMenuOpen ? (
              <div className="tif-menu" role="listbox" aria-label="TIF unit">
                {tifUnitOptions.map((option) => (
                  <button
                    key={option}
                    className={`tif-option${tifUnit === option ? " is-active" : ""}`}
                    type="button"
                    role="option"
                    aria-selected={tifUnit === option}
                    onClick={() => onTifUnitSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <button className={`primary-btn${isSellSide ? " is-sell" : ""}`} type="button">
        Enable Trading
      </button>

      <span className="panel-divider" aria-hidden="true" />

      <div className="kv-row">
        <span>Order Value</span>
        <span>N/A</span>
      </div>
      <div className="kv-row">
        <span>Slippage</span>
        <span className="value-teal">Est: N / A / Max: 8.00%</span>
      </div>
      <div className="kv-row">
        <span>Fee</span>
        <span className="value-teal inline-icon">
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

      {showAccountActions ? (
        <>
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
        </>
      ) : null}
    </>
  );
}

const MemoizedTradeOrderFormContent = memo(TradeOrderFormContent);

MemoizedTradeOrderFormContent.displayName = "TradeOrderFormContent";

export default MemoizedTradeOrderFormContent;
