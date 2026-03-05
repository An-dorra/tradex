import { useEffect, useRef } from "react";

function isOutsideRefs(target, refs) {
  return refs.every((ref) => !ref?.current || !ref.current.contains(target));
}

function useClickOutside(enabled, refs, onOutside, eventName = "pointerdown") {
  const refsRef = useRef(refs);
  const onOutsideRef = useRef(onOutside);

  refsRef.current = refs;
  onOutsideRef.current = onOutside;

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!(event.target instanceof Node)) {
        return;
      }

      if (isOutsideRefs(event.target, refsRef.current)) {
        onOutsideRef.current?.(event);
      }
    };

    document.addEventListener(eventName, handlePointerDown);

    return () => {
      document.removeEventListener(eventName, handlePointerDown);
    };
  }, [enabled, eventName]);
}

export default useClickOutside;
