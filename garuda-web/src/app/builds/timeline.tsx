"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import ImageCarousel from "@/components/ImageCarousel";

type BuildStat = { label: string; val: string };

export type Build = {
  id: string;
  name: string;
  year: string;
  tag: string | null;
  images: string[];
  category: string;
  event: string;
  stats: BuildStat[];
  desc: string;
  placeholder?: boolean;
};

function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [inView]);

  return { ref, inView };
}

function measureLineProgress(
  timelineRef: React.RefObject<HTMLDivElement | null>,
) {
  const node = timelineRef.current;
  if (!node) return 0;

  const rect = node.getBoundingClientRect();
  const timelineTop = window.scrollY + rect.top;
  const timelineHeight = node.offsetHeight;
  const scrollPoint = window.scrollY + window.innerHeight * 0.42;
  const raw =
    timelineHeight > 0 ? (scrollPoint - timelineTop) / timelineHeight : 0;
  return Math.min(1, Math.max(0, raw));
}

function useTimelineProgress(
  timelineRef: React.RefObject<HTMLDivElement | null>,
) {
  const targetRef = useRef(0);
  const smoothRef = useRef(0);
  const [progress, setProgress] = useState(0);

  const measureTarget = useCallback(() => {
    targetRef.current = measureLineProgress(timelineRef);
  }, [timelineRef]);

  useEffect(() => {
    measureTarget();

    let rafScroll = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafScroll);
      rafScroll = requestAnimationFrame(measureTarget);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    let rafLoop = 0;
    const tick = () => {
      const target = targetRef.current;
      const current = smoothRef.current;
      smoothRef.current = current + (target - current) * 0.1;
      setProgress(smoothRef.current);
      rafLoop = requestAnimationFrame(tick);
    };
    rafLoop = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafScroll);
      cancelAnimationFrame(rafLoop);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [measureTarget]);

  return progress;
}

function useDotActivated(
  dotRef: React.RefObject<HTMLSpanElement | null>,
  rowRef: React.RefObject<HTMLDivElement | null>,
  timelineRef: React.RefObject<HTMLDivElement | null>,
  lineProgress: number,
) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timeline = timelineRef.current;
    const row = rowRef.current;
    const dot = dotRef.current;
    if (!timeline || !row) return;

    const linePx = lineProgress * timeline.offsetHeight;
    const dotPx = dot
      ? row.offsetTop + dot.offsetTop + dot.offsetHeight / 2
      : row.offsetTop + 35;
    setActive(linePx >= dotPx);
  }, [lineProgress, dotRef, rowRef, timelineRef]);

  return active;
}

export default function BuildsTimeline({ builds }: { builds: Build[] }) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineProgress = useTimelineProgress(timelineRef);

  return (
    <div ref={timelineRef} className={styles.timeline}>
      <div className={styles.timelineTrack} aria-hidden="true" />
      <div
        className={styles.timelineProgress}
        style={{ height: `${lineProgress * 100}%` }}
        aria-hidden="true"
      />

      {builds.map((build, i) => (
        <BuildRow
          key={build.id}
          build={build}
          index={i}
          lineProgress={lineProgress}
          timelineRef={timelineRef}
        />
      ))}
    </div>
  );
}

function BuildRow({
  build,
  index,
  lineProgress,
  timelineRef,
}: {
  build: Build;
  index: number;
  lineProgress: number;
  timelineRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { ref: inViewRef, inView } = useInViewOnce<HTMLDivElement>();
  const rowRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLSpanElement | null>(null);
  const dotActive = useDotActivated(dotRef, rowRef, timelineRef, lineProgress);
  const hasImages = build.images.length > 0;

  const setRefs = (node: HTMLDivElement | null) => {
    rowRef.current = node;
    inViewRef.current = node;
  };

  return (
    <div
      ref={setRefs}
      className={[
        styles.buildRow,
        index % 2 === 1 ? styles.buildRowReverse : "",
        inView ? styles.inView : styles.pending,
        dotActive ? styles.lineReached : "",
        build.placeholder ? styles.buildRowPlaceholder : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        ref={dotRef}
        className={[
          styles.timelineDot,
          dotActive ? styles.timelineDotActive : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden="true"
      />

      <div className={styles.buildImageWrap}>
        {hasImages ? (
          <ImageCarousel images={build.images} alt={build.name} autoPlay />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderYear}>{build.year}</span>
            <span className={styles.placeholderLabel}>Photos coming soon</span>
          </div>
        )}
        {build.tag && <div className={styles.buildTag}>{build.tag}</div>}
      </div>

      <div className={styles.buildInfo}>
        <div
          className={[
            styles.buildYear,
            dotActive ? styles.buildYearActive : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {build.year}
        </div>
        <h2 className={styles.buildName}>{build.name}</h2>
        {!build.placeholder && build.category !== "—" && (
          <div className={styles.buildCategory}>{build.category}</div>
        )}
        <p className={styles.buildDesc}>{build.desc}</p>

        {!build.placeholder && (
          <>
            {build.event && build.event !== "—" && (
              <div className={styles.buildEvent}>
                <span className={styles.eventDot} aria-hidden="true" />
                {build.event}
              </div>
            )}

            <div className={styles.buildStats}>
              {build.stats.map((s) => (
                <div key={s.label} className={styles.buildStat}>
                  <span className={styles.statVal}>{s.val}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
