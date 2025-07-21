import { LazyMotion } from "motion/react";
import type { ReactNode } from "react";

export function MotionLoader({ children }: { children: ReactNode }) {
  return (
    <LazyMotion
      strict
      features={() =>
        import("~/lib/motion-features").then((res) => res.default)
      }
    >
      {children}
    </LazyMotion>
  );
}
