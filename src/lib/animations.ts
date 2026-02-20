import type { Transition } from "framer-motion";

// Lighter animation values — shorter distance, faster duration
export const fadeUpInitial = { opacity: 0, y: 20 };

export function fadeUpAnimate() {
  return { opacity: 1, y: 0 };
}

export function fadeUpTransition(delay: number = 0): Transition {
  return { duration: 0.4, delay, ease: "easeOut" };
}

export const viewportOnce = { once: true, margin: "-50px" as const };
