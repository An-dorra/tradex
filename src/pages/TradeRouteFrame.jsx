import { useCallback, useLayoutEffect, useRef, useState } from "react";
import "./TradeRouteFrame.css";

const CANVAS_WIDTH = 1920;
const DEFAULT_MIN_HEIGHT = 1080;

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

function TradeRouteFrame({ height, minHeight, children, className = "" }) {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(getInitialScale);
  const baseMinHeight = minHeight ?? height ?? DEFAULT_MIN_HEIGHT;
  const [contentHeight, setContentHeight] = useState(baseMinHeight);

  const syncContentHeight = useCallback(() => {
    const measuredHeight = Math.max(baseMinHeight, measureCanvasHeight(canvasRef.current));
    setContentHeight((prevHeight) => (prevHeight === measuredHeight ? prevHeight : measuredHeight));
  }, [baseMinHeight]);

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
    syncContentHeight();
  }, [syncContentHeight, scale, children]);

  useLayoutEffect(() => {
    if (typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const observer = new ResizeObserver(() => {
      syncContentHeight();
    });
    observer.observe(canvas);

    return () => {
      observer.disconnect();
    };
  }, [syncContentHeight]);

  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--trade-scale", String(scale));
  }, [scale]);

  const stageStyle = {
    height: contentHeight * scale,
    width: CANVAS_WIDTH * scale,
  };

  return (
    <div className={`trade-route-screen ${className}`} style={{ "--trade-scale": scale }}>
      <div className="trade-route-stage" style={stageStyle}>
        <div className="trade-route-canvas" ref={canvasRef} style={{ minHeight: baseMinHeight }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default TradeRouteFrame;
