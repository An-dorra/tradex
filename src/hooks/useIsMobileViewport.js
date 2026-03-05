import { useEffect, useState } from "react";

function getQueryMatches(query) {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia(query).matches;
}

function useIsMobileViewport(query = "(max-width: 768px)") {
  const [isMobileViewport, setIsMobileViewport] = useState(() => getQueryMatches(query));

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(query);
    const onMediaChange = (event) => {
      setIsMobileViewport(event.matches);
    };

    setIsMobileViewport(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", onMediaChange);
      return () => mediaQuery.removeEventListener("change", onMediaChange);
    }

    mediaQuery.addListener(onMediaChange);
    return () => mediaQuery.removeListener(onMediaChange);
  }, [query]);

  return isMobileViewport;
}

export default useIsMobileViewport;
