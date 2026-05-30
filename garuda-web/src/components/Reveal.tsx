"use client";

import {
  type ElementType,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";

type RevealProps<T extends ElementType> = {
  as?: T;
  delay?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "className" | "style" | "children">;

const REVEAL_BASE_CLASS = "reveal";
const REVEAL_ACTIVE_CLASS = "reveal-in";

export default function Reveal<T extends ElementType = "div">({
  as,
  delay = 0,
  threshold = 0.18,
  once = true,
  className = "",
  style,
  children,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setRevealed(false);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  const classes = [
    REVEAL_BASE_CLASS,
    revealed ? REVEAL_ACTIVE_CLASS : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const mergedStyle: CSSProperties = {
    ...style,
    transitionDelay: delay ? `${delay}ms` : style?.transitionDelay,
  };

  return (
    <Tag ref={ref} className={classes} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  );
}
