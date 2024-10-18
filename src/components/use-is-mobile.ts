"use client";

import { useEffect, useState } from "react";

export function useIsMobile(initialValue: boolean) {
  const [isMobile, setIsMobile] = useState(initialValue);

  useEffect(() => {
    const mediaQueryList = window.matchMedia("(max-width: 640px)");
    setIsMobile(mediaQueryList.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}
