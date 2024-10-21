import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 640;

export function useIsMobile(initialValue: boolean = false) {
  const [isMobile, setIsMobile] = useState<boolean>(initialValue);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
    );
    const handleChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}
