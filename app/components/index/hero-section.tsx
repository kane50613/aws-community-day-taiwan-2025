import { Cloud, Plus, UserRound } from "lucide-react";
import { AnimatePresence, type Variants } from "motion/react";
import * as m from "motion/react-m";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const actions = ["Connect", "Build with", "Learn with"];

export function HeroSection() {
  return (
    <div className="relative mx-auto pt-[15vh] px-[max(1.5rem,min(6rem,8vw))] max-w-[120rem]">
      <h1 className="flex flex-col font-medium text-[max(3.5rem,min(12vw,16rem))] leading-tight tracking-tight">
        <div className="relative flex">
          <FloatingIcon
            icon={
              <Cloud className="w-[1em] aspect-square h-auto text-orange-400 drop-shadow-2xl" />
            }
            className="left-[0.75em] -top-[0.25em] absolute -rotate-12"
            delay={0.6}
          />
          <TextWithInterval />
        </div>

        <div className="relative text-right">
          <FloatingIcon
            icon={
              <UserRound className="w-[1em] aspect-square h-auto text-blue-400 drop-shadow-2xl" />
            }
            className="z-10 left-[4.5em] -top-[0.125em] absolute rotate-12"
            delay={0.9}
          />
          <TextPart delay={0.3}>Community</TextPart>
        </div>
      </h1>
      <div className="my-[5vh] text-xl sm:text-2xl flex gap-12 justify-between flex-wrap">
        <div>
          <p>9月21日 (星期日) 上午9:30 - 下午5:30</p>
          <p>台北國際會議中心</p>
        </div>
        <Button className="text-xl sm:w-48 py-8 rounded-full w-full" asChild>
          <a href="https://awscmd.tw">
            訂閱電子報
            <Plus className="size-6" />
          </a>
        </Button>
      </div>
    </div>
  );
}

interface FloatingIconProps {
  icon: ReactNode;
  className?: string;
  delay?: number;
}

function FloatingIcon({ icon, className, delay = 0.6 }: FloatingIconProps) {
  return (
    <m.div
      className={className}
      animate={{
        y: [20, 0],
        opacity: [0, 1],
        scale: [0.8, 1],
      }}
      transition={{
        delay,
      }}
    >
      {icon}
    </m.div>
  );
}

function TextWithInterval() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => (index + 1) % actions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return <TextPart>{actions[index]}</TextPart>;
}

const textVariants: Variants = {
  initial: {
    opacity: 0,
    fontWeight: 100,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    fontWeight: 600,
    filter: "blur(0)",
  },
  exit: {
    opacity: 0,
    fontWeight: 400,
  },
};

function TextPart({ children, delay }: { children: string; delay?: number }) {
  const parts = Array.from(children);

  return (
    <div className="relative">
      <AnimatePresence mode="popLayout">
        {parts.map((part, index) => {
          // inline-block would trim the space character
          if (part === " ") return <span> </span>;

          return (
            <m.span
              // biome-ignore lint/suspicious/noArrayIndexKey: Index is the only key
              key={`${children}-${part}-${index}`}
              variants={textVariants}
              transition={{
                delay: (delay ?? 0) + index * 0.025,
              }}
              initial="initial"
              animate="show"
              exit="exit"
              className="inline-block"
              style={{ position: "relative" }}
            >
              {part}
            </m.span>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
