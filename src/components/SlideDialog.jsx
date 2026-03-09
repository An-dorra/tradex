import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./SlideDialog.css";

const MOTION_DURATION_MS = 360;
const VALID_DIRECTIONS = new Set(["top", "right", "bottom", "left", "center"]);
const LOCK_COUNT_KEY = "__otxScrollLockCount";
const LOCK_SNAPSHOT_KEY = "__otxScrollLockSnapshot";

function joinClasses(...classNames) {
  return classNames.filter(Boolean).join(" ");
}

function SlideDialog({
  open,
  onClose,
  direction = "bottom",
  children,
  ariaLabel = "Dialog",
  closeOnOverlay = true,
  closeOnEscape = true,
  lockScroll = false,
  showBackdrop = true,
  overlayClassName = "",
  panelClassName = "",
  overlayStyle,
  panelStyle,
}) {
  const [shouldRender, setShouldRender] = useState(open);
  const [isVisible, setIsVisible] = useState(open);
  const panelRef = useRef(null);

  const safeDirection = useMemo(() => {
    if (VALID_DIRECTIONS.has(direction)) {
      return direction;
    }
    return "bottom";
  }, [direction]);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      const frameId = window.requestAnimationFrame(() => {
        setIsVisible(true);
        if (panelRef.current) {
          panelRef.current.scrollTop = 0;
        }
      });
      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }

    setIsVisible(false);

    const timer = window.setTimeout(() => {
      setShouldRender(false);
    }, MOTION_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [open]);

  useEffect(() => {
    if (!open || !closeOnEscape) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeOnEscape, onClose]);

  useEffect(() => {
    if (!open || !lockScroll) {
      return undefined;
    }

    const html = document.documentElement;
    const body = document.body;
    const activeCount = Number(window[LOCK_COUNT_KEY] ?? 0);

    if (activeCount === 0) {
      window[LOCK_SNAPSHOT_KEY] = {
        htmlOverflow: html.style.overflow,
        bodyOverflow: body.style.overflow,
        htmlOverscroll: html.style.overscrollBehavior,
        bodyOverscroll: body.style.overscrollBehavior,
      };
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      html.style.overscrollBehavior = "none";
      body.style.overscrollBehavior = "none";
    }

    window[LOCK_COUNT_KEY] = activeCount + 1;

    return () => {
      const nextCount = Math.max(0, Number(window[LOCK_COUNT_KEY] ?? 1) - 1);
      window[LOCK_COUNT_KEY] = nextCount;

      if (nextCount > 0) {
        return;
      }

      const snapshot = window[LOCK_SNAPSHOT_KEY];
      if (snapshot) {
        html.style.overflow = snapshot.htmlOverflow;
        body.style.overflow = snapshot.bodyOverflow;
        html.style.overscrollBehavior = snapshot.htmlOverscroll;
        body.style.overscrollBehavior = snapshot.bodyOverscroll;
      } else {
        html.style.overflow = "";
        body.style.overflow = "";
        html.style.overscrollBehavior = "";
        body.style.overscrollBehavior = "";
      }

      delete window[LOCK_COUNT_KEY];
      delete window[LOCK_SNAPSHOT_KEY];
    };
  }, [open, lockScroll]);

  if (!shouldRender) {
    return null;
  }

  const onOverlayClick = () => {
    if (closeOnOverlay) {
      onClose?.();
    }
  };

  return createPortal(
    <div
      className={joinClasses(
        "slide-dialog-overlay",
        isVisible && "is-open",
        !showBackdrop && "slide-dialog-overlay--no-backdrop",
        overlayClassName,
      )}
      style={overlayStyle}
      role="presentation"
      onClick={onOverlayClick}
    >
      <section
        ref={panelRef}
        className={joinClasses("slide-dialog-panel", `slide-dialog-panel--${safeDirection}`, panelClassName)}
        style={panelStyle}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </section>
    </div>,
    document.body,
  );
}

export default SlideDialog;
