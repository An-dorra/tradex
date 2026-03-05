import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import "./SlideDialog.css";

const MOTION_DURATION_MS = 360;
const VALID_DIRECTIONS = new Set(["top", "right", "bottom", "left", "center"]);

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
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverscroll = html.style.overscrollBehavior;
    const prevBodyOverscroll = body.style.overscrollBehavior;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overscrollBehavior = "none";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      html.style.overscrollBehavior = prevHtmlOverscroll;
      body.style.overscrollBehavior = prevBodyOverscroll;
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
