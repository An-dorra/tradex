import aiDotActive from "../assets/home/images/ai_dot_active.svg";
import aiDotInactive from "../assets/home/images/ai_dot_inactive.svg";
import aiFadeMask from "../assets/home/images/ai_fade_mask.png";
import aiPanelBg from "../assets/home/images/ai_panel_bg.png";
import builtCurveBg from "../assets/home/images/built_curve_bg.svg";
import builtLogoCircle from "../assets/home/images/built_logo_circle.svg";
import builtLogoShape from "../assets/home/images/built_logo_shape.svg";
import builtRotateBg from "../assets/home/images/built_rotate_bg.svg";
import builtTagGlobe from "../assets/home/images/built_tag_globe.svg";
import builtTagX from "../assets/home/images/built_tag_x.svg";
import ctaArcMain from "../assets/home/images/cta_arc_main.svg";
import ctaDot from "../assets/home/images/cta_dot.svg";
import ctaLeft1 from "../assets/home/images/cta_left_1.svg";
import ctaLeft2 from "../assets/home/images/cta_left_2.svg";
import ctaLeft3 from "../assets/home/images/cta_left_3.svg";
import ctaRight1 from "../assets/home/images/cta_right_1.svg";
import ctaRight2 from "../assets/home/images/cta_right_2.svg";
import ctaRight3 from "../assets/home/images/cta_right_3.svg";
import footerLogo from "../assets/home/images/footer_logo.svg";
import footerSocialBg from "../assets/home/images/footer_social_bg.svg";
import footerSocialPath from "../assets/home/images/footer_social_path.svg";
import footerSocialX from "../assets/home/images/footer_social_x.svg";
import hero3dIcon from "../assets/home/images/hero_3d_icon.png";
import heroAndroidIcon from "../assets/home/images/hero_android_icon.svg";
import heroGlowShape from "../assets/home/images/hero_glow_shape.svg";
import heroIosIcon from "../assets/home/images/hero_ios_icon.png";
import heroJimengMask from "../assets/home/images/hero_jimeng_mask.svg";
import heroJimengOverlay from "../assets/home/images/hero_jimeng_overlay.png";
import heroParticle from "../assets/home/images/hero_particle.png";
import heroRing from "../assets/home/images/hero_ring.svg";
import heroShadowEllipse from "../assets/home/images/hero_shadow_ellipse.svg";
import partnerBinance from "../assets/home/images/partner_binance.png";
import partnerChainlink from "../assets/home/images/partner_chainlink.svg";
import partnerMetamask from "../assets/home/images/partner_metamask.png";
import partnerOkx from "../assets/home/images/partner_okx.png";
import partnerOrtradex from "../assets/home/images/partner_ortradex.svg";
import tradeAndroidIcon from "../assets/home/images/trade_android_icon.svg";
import tradeBall from "../assets/home/images/trade_ball.svg";
import tradeBeam from "../assets/home/images/trade_beam.svg";
import tradeCheck1 from "../assets/home/images/trade_check1.svg";
import tradeCheck2 from "../assets/home/images/trade_check2.svg";
import tradeCheck3 from "../assets/home/images/trade_check3.svg";
import tradeCheck4 from "../assets/home/images/trade_check4.svg";
import tradeFloorGlow from "../assets/home/images/trade_floor_glow.svg";
import tradeIosIcon from "../assets/home/images/trade_ios_icon.png";
import tradePhonePhoto from "../assets/home/images/trade_phone_photo.png";
import tradeRingGlow from "../assets/home/images/trade_ring_glow.svg";
import whyCardGlow from "../assets/home/images/why_card_glow.svg";
import whyClip1 from "../assets/home/images/why_clip_1.svg";
import whyClip2 from "../assets/home/images/why_clip_2.svg";
import whyIconX from "../assets/home/images/why_icon_x.svg";
import whyOrbit1 from "../assets/home/images/why_orbit1.svg";
import whyOrbit2 from "../assets/home/images/why_orbit2.svg";
import whyOrbit3 from "../assets/home/images/why_orbit3.svg";
import whyOrbit4 from "../assets/home/images/why_orbit4.svg";
import whyOrbit5 from "../assets/home/images/why_orbit5.svg";
import whyOrbit6 from "../assets/home/images/why_orbit6.svg";
import whyPlanetBg from "../assets/home/images/why_planet_bg.svg";
import whyShape1 from "../assets/home/images/why_shape_1.svg";
import whyShape2 from "../assets/home/images/why_shape_2.svg";
import whySignalIcon from "../assets/home/images/why_signal_icon.svg";
import whyStack1 from "../assets/home/images/why_stack_1.svg";
import whyStack2 from "../assets/home/images/why_stack_2.svg";
import whyStackIcon from "../assets/home/images/why_stack_icon.svg";
import whyTopLine from "../assets/home/images/why_top_line.svg";
import "./HomePage.css";

const heroStats = [
  { value: "$ 4.14T", label: "Total Trading Volume" },
  { value: "9.24M", label: "Users" },
  { value: "1.85B", label: "Open Interest" },
  { value: "$ 1.11bB", label: "TVL" },
  { value: "181", label: "Symbols" },
];

const tradeFeatures = [
  { icon: tradeCheck1, label: "Real-Time Signal Access" },
  { icon: tradeCheck2, label: "Instant Execution" },
  { icon: tradeCheck3, label: "Strategy Monitoring" },
  { icon: tradeCheck4, label: "Full Risk Control" },
];

const partnerLogos = [
  { icon: partnerBinance, label: "Binance Wallet", iconClass: "is-binance" },
  { icon: partnerChainlink, label: "CHAINLINK", iconClass: "is-chainlink" },
  { icon: partnerOkx, label: "OKX Wallet", iconClass: "is-okx" },
  { icon: partnerMetamask, label: "Metamask", iconClass: "is-metamask" },
  { icon: partnerOrtradex, label: "OrTradeX", iconClass: "is-ortradex" },
];

const ctaDots = [
  { left: 245, top: 64 },
  { left: 245, top: 246 },
  { left: 245, top: 376 },
  { left: 299, top: 246 },
  { left: 299, top: 376 },
  { left: 299, top: 522 },
  { left: 337, top: 168 },
  { left: 337, top: 376 },
  { left: 337, top: 522 },
  { left: 337, top: 596 },
  { left: 1603, top: 125 },
  { left: 1603, top: 330 },
  { left: 1603, top: 476 },
  { left: 1603, top: 596 },
  { left: 1673, top: 64 },
  { left: 1673, top: 330 },
  { left: 1719, top: 168 },
  { left: 1719, top: 476 },
];

function HomePage() {
  return (
    <div className="home-page">
      <div className="home-stage-wrap">
        <main className="home-stage">
        <section className="home-hero">
          <div className="hero-mask-outer">
            <div
              className="hero-mask-inner"
              style={{
                WebkitMaskImage: `url(${heroJimengMask})`,
                maskImage: `url(${heroJimengMask})`,
              }}
            >
              <img src={heroJimengOverlay} alt="" />
            </div>
          </div>

          <div className="hero-visual">
            <img className="hero-particle" src={heroParticle} alt="" />
            <img className="hero-ring-bg" src={heroRing} alt="" />
            <img className="hero-capsule-glow" src={heroGlowShape} alt="" />
            <img className="hero-platform-shadow" src={heroShadowEllipse} alt="" />
            <img className="hero-main-icon" src={hero3dIcon} alt="" />
          </div>

          <h1 className="hero-title">
            A New Way to Trade <span>Perpetual Markets</span>
          </h1>
          <p className="hero-subtitle">AI-powered. Copy-enabled. non-custodial.</p>
          <p className="hero-description">
            Deploy automated trading bots, follow proven strategies, and keep full control over every
            execution.
          </p>

          <div className="hero-actions">
            <button type="button" className="hero-btn hero-btn-primary">
              Launch App
            </button>
            <button type="button" className="hero-btn hero-btn-secondary">
              Download App
            </button>
            <button type="button" className="hero-icon-btn" aria-label="iOS">
              <img src={heroIosIcon} alt="" />
            </button>
            <button type="button" className="hero-icon-btn" aria-label="Android">
              <img src={heroAndroidIcon} alt="" />
            </button>
          </div>

          <div className="hero-stats">
            {heroStats.map((item) => (
              <div key={item.label} className="hero-stat">
                <p className="hero-stat-value">{item.value}</p>
                <p className="hero-stat-label">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="home-ai">
          <h2 className="section-title-gradient">AI Signal Engine</h2>
          <p className="section-subtitle">Real-time AI-generated trading signals.</p>

          <div className="ai-shell">
            <div className="ai-shell-glow" />
            <div className="ai-shell-core">
              <div className="ai-shell-screen">
                <img className="ai-shell-bg" src={aiPanelBg} alt="AI Signal Panel" />
              </div>
              <img className="ai-shell-fade" src={aiFadeMask} alt="" />

              <div className="ai-dots">
                <img src={aiDotActive} alt="" />
                <img src={aiDotInactive} alt="" />
                <img src={aiDotActive} alt="" />
                <img src={aiDotActive} alt="" />
              </div>
            </div>
          </div>
        </section>

        <section className="home-built">
          <h2 className="section-title-gradient">Built for Origins Ecosystem</h2>
          <p className="section-subtitle">Powered by the Origins Network</p>

          <div className="built-art">
            <img className="built-bg-1" src={builtCurveBg} alt="" />
            <img className="built-bg-2" src={builtRotateBg} alt="" />
            <img className="built-logo-circle" src={builtLogoCircle} alt="" />
            <img className="built-logo-shape" src={builtLogoShape} alt="" />
          </div>

          <div className="built-copy">
            <p className="built-main">
              OrTradeX is designed as a financial layer inside the Origins ecosystem.
            </p>
            <div className="built-list-wrap">
              <p>Node operators provide infrastructure support, enabling:</p>
              <ul>
                <li>Stable execution routing</li>
                <li>Network-level support</li>
                <li>Ecosystem-native liquidity</li>
                <li>Governance participation</li>
              </ul>
            </div>

            <div className="built-tags">
              <span>
                <img src={builtTagGlobe} alt="" />
                Origins Network
              </span>
              <span>
                <img src={builtTagX} alt="" />
                Origins Network
              </span>
            </div>
          </div>
        </section>

        <section className="home-why">
          <h2 className="section-title-gradient">Why OrTrade X</h2>
          <p className="section-subtitle">Powered by the Origins Network</p>

          <div className="why-cards">
            <article className="why-card why-card-main">
              <div className="why-main-icon-box">
                <img src={whySignalIcon} alt="" />
              </div>
              <h3>Signal-Native Architecture</h3>
              <p>
                OrtradeX is built around signals - not just order books. Every trade begins with
                structured alpha, not manual guessing.
              </p>
            </article>

            <article className="why-card">
              <img className="why-card-glow" src={whyCardGlow} alt="" />
              <img className="why-stack-shape-1" src={whyStack1} alt="" />
              <img className="why-stack-shape-2" src={whyStack2} alt="" />
              <img className="why-stack-clip-1" src={whyClip1} alt="" />
              <img className="why-stack-clip-2" src={whyClip2} alt="" />
              <img className="why-stack-icon" src={whyStackIcon} alt="" />
              <img className="why-top-line" src={whyTopLine} alt="" />
              <h3>Integrated Trading Stack</h3>
            </article>

            <article className="why-card">
              <img className="why-card-glow" src={whyCardGlow} alt="" />
              <img className="why-planet-bg" src={whyPlanetBg} alt="" />
              <img className="why-orbit why-orbit-1" src={whyOrbit1} alt="" />
              <img className="why-orbit why-orbit-2" src={whyOrbit2} alt="" />
              <img className="why-orbit why-orbit-3" src={whyOrbit3} alt="" />
              <img className="why-orbit why-orbit-4" src={whyOrbit4} alt="" />
              <img className="why-orbit why-orbit-5" src={whyOrbit5} alt="" />
              <img className="why-orbit why-orbit-6" src={whyOrbit6} alt="" />
              <img className="why-top-line" src={whyTopLine} alt="" />
              <h3>Ecosystem-Aligned Infrastructure</h3>
            </article>

            <article className="why-card">
              <img className="why-card-glow" src={whyCardGlow} alt="" />
              <img className="why-shape-1" src={whyShape1} alt="" />
              <img className="why-shape-2" src={whyShape2} alt="" />
              <img className="why-key-icon" src={whyIconX} alt="" />
              <img className="why-top-line" src={whyTopLine} alt="" />
              <h3>Transparent by Design</h3>
            </article>
          </div>
        </section>

        <section className="home-trade-anywhere">
          <h2 className="section-title-gradient">Trade Anywhere. Stay in Control.</h2>
          <p className="section-subtitle">
            OrTradeX brings signal-driven perpetual trading to your fingertips.
          </p>
          <p className="trade-anywhere-desc">
            Monitor AI signals, activate strategies, and manage positions in real time, wherever you
            are.
          </p>

          <ul className="trade-feature-list">
            {tradeFeatures.map((item) => (
              <li key={item.label}>
                <img src={item.icon} alt="" />
                {item.label}
              </li>
            ))}
          </ul>

          <div className="trade-anywhere-actions">
            <button type="button">Get Started</button>
            <span>
              <img src={tradeIosIcon} alt="" />
            </span>
            <span>
              <img src={tradeAndroidIcon} alt="" />
            </span>
          </div>

          <div className="trade-phone-art">
            <img className="trade-glow-ring" src={tradeRingGlow} alt="" />
            <img className="trade-floor" src={tradeFloorGlow} alt="" />
            <img className="trade-sphere" src={tradeBall} alt="" />
            <img className="trade-phone-beam" src={tradeBeam} alt="" />
            <img className="trade-phone" src={tradePhonePhoto} alt="" />
          </div>
        </section>

        <section className="home-partner">
          <h2 className="section-title-gradient">Partner</h2>

          <div className="partner-edge-left" />
          <div className="partner-edge-right" />

          <div className="partner-row">
            {partnerLogos.map((item) => (
              <div key={item.label} className="partner-item">
                <img className={item.iconClass} src={item.icon} alt="" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="home-cta">
          <img className="cta-arc" src={ctaArcMain} alt="" />
          <img className="cta-right-1" src={ctaRight1} alt="" />
          <img className="cta-right-2" src={ctaRight2} alt="" />
          <img className="cta-right-3" src={ctaRight3} alt="" />
          <img className="cta-left-1" src={ctaLeft1} alt="" />
          <img className="cta-left-2" src={ctaLeft2} alt="" />
          <img className="cta-left-3" src={ctaLeft3} alt="" />

          {ctaDots.map((dot, index) => (
            <img
              key={index}
              className="cta-dot"
              src={ctaDot}
              alt=""
              style={{ left: `${dot.left}px`, top: `${dot.top}px` }}
            />
          ))}

          <h2>Start Trading Smarter.</h2>
          <p>Trade perpetual markets with AI-powered conviction.</p>
          <div className="cta-actions">
            <button type="button">Launch OrtradeX</button>
            <button type="button">Download App</button>
          </div>
        </section>

        <footer className="home-footer">
          <img className="footer-logo" src={footerLogo} alt="OrTradeX" />

          <a className="footer-social" href="#" aria-label="X">
            <img className="footer-social-bg" src={footerSocialBg} alt="" />
            <img className="footer-social-path" src={footerSocialPath} alt="" />
            <img className="footer-social-x" src={footerSocialX} alt="" />
          </a>

          <a href="#" className="footer-link footer-terms">
            terms of use
          </a>
          <a href="#" className="footer-link footer-privacy">
            privacy policy
          </a>

          <p className="footer-copyright">© 2026 OrTradeX. All rights reserved.</p>
        </footer>
        </main>
      </div>
    </div>
  );
}

export default HomePage;
