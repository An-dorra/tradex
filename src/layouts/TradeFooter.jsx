import "./TradeFooter.css";

function TradeFooter() {
  return (
    <footer className="trade-footer-shell">
      <div className="trade-footer">
        <div className="footer-left">
          <span className="status-chip">
            <span className="status-dot" />
            Connected
          </span>
          <span className="footer-copyright">@2026 Support By OrTradeX</span>
        </div>

        <div className="footer-right">
          <button className="footer-link" type="button">
            Privacy Policy
          </button>
          <button className="footer-link" type="button">
            Terms
          </button>
          <button className="footer-link" type="button">
            Help
          </button>
        </div>
      </div>
    </footer>
  );
}

export default TradeFooter;
