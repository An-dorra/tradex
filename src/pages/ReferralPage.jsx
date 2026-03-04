import TradeRouteFrame from "./TradeRouteFrame.jsx";
import "./RoutePages.css";
import editIcon48 from "../assets/images/edit.png";
import searchIcon40 from "../assets/images/search.png";
import selectIcon48 from "../assets/images/select.png";
import downIcon48 from "../assets/images/down.png";
import sortIcon40 from "../assets/images/sort.png";

const inviterRows = [
  {
    address: "qwert...ertyuiop",
    joinedAt: "2026-02-12 21:42:54",
    rate: "0%",
    rewards: "12345USDT",
  },
  {
    address: "qwert...ertyuiop",
    joinedAt: "2026-02-12 21:42:54",
    rate: "0%",
    rewards: "12345USDT",
  },
  {
    address: "qwert...ertyuiop",
    joinedAt: "2026-02-12 21:42:54",
    rate: "0%",
    rewards: "12345USDT",
  },
];

function ReferralPage() {
  return (
    <TradeRouteFrame height={1260}>
      <div className="route-page-shell">
        <div>
          <h1 className="route-page-title">Referral Center</h1>
          <p className="route-page-subtitle">
            Invite friends to trade and share platform revenue based on trading rewards.
          </p>
        </div>

        <section className="referral-top-grid">
          <article className="route-surface referral-card">
            <h2 className="referral-card-title">Invite now</h2>

            <div className="referral-invite-body">
              <div className="referral-invite-row">
                <span>
                  You receive <span className="referral-highlight">10%</span> Your invitee receive{" "}
                  <span className="referral-highlight">0%</span>
                </span>
                <button className="referral-copy" type="button" aria-label="Copy referral ratio">
                  <img src={editIcon48} alt="" />
                </button>
              </div>

              <div className="referral-invite-row">
                <span>Referral code</span>
                <span className="referral-highlight referral-inline-action">
                  12345
                  <button className="referral-copy" type="button" aria-label="Copy referral code">
                    <img src={editIcon48} alt="" />
                  </button>
                </span>
              </div>

              <div className="referral-invite-row">
                <span>Referral link</span>
                <span className="referral-highlight referral-inline-action">
                  http://www.34****7899
                  <button className="referral-copy" type="button" aria-label="Copy referral link">
                    <img src={editIcon48} alt="" />
                  </button>
                </span>
              </div>

              <button className="referral-invite-btn" type="button">
                Invite friends
              </button>
            </div>
          </article>

          <article className="route-surface referral-card">
            <div className="referral-summary-head">
              <h2 className="referral-card-title" style={{ borderBottom: 0, paddingBottom: 0 }}>
                Summary of invitations
              </h2>
              <button className="referral-summary-filter" type="button">
                Date
                <img src={selectIcon48} alt="" />
              </button>
            </div>

            <div className="referral-summary-list">
              <div className="referral-summary-row">
                <span className="referral-summary-label">Total Volume</span>
                <span className="referral-summary-value">0.00 USDT</span>
              </div>
              <div className="referral-summary-row">
                <span className="referral-summary-label">Referral rewards</span>
                <span className="referral-summary-value">0.00 USDT</span>
              </div>
              <div className="referral-summary-row">
                <span className="referral-summary-label">Referred friends</span>
                <span className="referral-summary-value">0</span>
              </div>
              <div className="referral-summary-row">
                <span className="referral-summary-label">Friends who traded</span>
                <span className="referral-summary-value">0</span>
              </div>
            </div>
          </article>
        </section>

        <section className="referral-inviter-wrap">
          <h2 className="section-title">Inviter</h2>

          <div className="route-surface referral-table-card">
            <div className="referral-table-head">
              <span>Inviter&apos;s address</span>
              <span>Date joined</span>
              <span>Referral kickback rate</span>
              <span>Kickback rewards (USDT)</span>
            </div>

            {inviterRows.map((row, index) => (
              <div key={`${row.address}-${index}`} className="referral-table-row">
                <span>{row.address}</span>
                <span>{row.joinedAt}</span>
                <span>{row.rate}</span>
                <span>{row.rewards}</span>
              </div>
            ))}

            <div className="referral-table-pagination">
              <span className="page-pagination">1/20page</span>
            </div>
          </div>
        </section>

        <section className="referral-history-wrap">
          <h2 className="referral-history-title">Referral history</h2>
          <p className="referral-history-note">
            The statistics on the referral history will have a 1-2 hours delay.
          </p>

          <div className="referral-history-toolbar">
            <div className="referral-search">
              <img src={searchIcon40} alt="" />
              <input
                className="referral-search-input"
                type="text"
                placeholder="Search by address"
                aria-label="Search by address"
              />
            </div>
            <button className="referral-toolbar-item" type="button">
              <img src={selectIcon48} alt="" />
              Date
            </button>
            <button className="referral-toolbar-item" type="button">
              <img src={downIcon48} alt="" />
              Download
            </button>
          </div>

          <div className="route-surface referral-history-card">
            <div className="referral-history-head">
              <button className="referral-sort-cell" type="button">
                Friend&apos;s address
                <img src={sortIcon40} alt="" />
              </button>
              <button className="referral-sort-cell" type="button">
                Date joined
                <img src={sortIcon40} alt="" />
              </button>
              <button className="referral-sort-cell" type="button">
                Total volume(USDT)
                <img src={sortIcon40} alt="" />
              </button>
              <button className="referral-sort-cell" type="button">
                Fees paid (USDT)
                <img src={sortIcon40} alt="" />
              </button>
              <button className="referral-sort-cell" type="button">
                Your rewards (USDT)
                <img src={sortIcon40} alt="" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </TradeRouteFrame>
  );
}

export default ReferralPage;
