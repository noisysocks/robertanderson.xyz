import { useMediaQuery } from "@uidotdev/usehooks";

const SIZES = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export function useIsScreen(screen: "sm" | "md" | "lg" | "xl" | "2xl") {
  return useMediaQuery(`only screen and (min-width: ${SIZES[screen]})`);
}
