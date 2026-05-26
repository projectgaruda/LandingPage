"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import styles from "@/app/page.module.css";

const CarModel3D = dynamic(() => import("@/components/CarModel3D"), {
  ssr: false,
  loading: () => (
    <div className={styles.modelFallback}>
      <div className={styles.modelLoader}>
        <span>⬡</span>
        <p>Loading 3D Model...</p>
      </div>
    </div>
  ),
});

const stats = [
  { value: "200+", label: "km/L Record" },
  { value: "6+", label: "International Events" },
  { value: "3", label: "Championship Builds" },
  { value: "50+", label: "Team Members" },
];

const highlights = [
  {
    icon: "efficiency",
    title: "Ultra Efficiency",
    desc: "Engineering vehicles that push the boundaries of fuel efficiency beyond 200 km/L equivalents.",
  },
  {
    icon: "global",
    title: "Global Competition",
    desc: "Representing India at Shell Eco-marathon Asia and other prestigious international events.",
  },
  {
    icon: "research",
    title: "R&D Focus",
    desc: "Cutting-edge research in aerodynamics, lightweight materials, and powertrain optimization.",
  },
];

export default function HeroSection() {
  return (
    <>
      <section className={styles.hero}>

        <div className="container">
          <div className={styles.heroInner}>
            {/* Left — Text */}
            <div className={styles.heroContent}>
              <div className={`badge ${styles.heroBadge}`}>
                <span className="badge-dot" />
                Shell Eco-Marathon Participant
              </div>

              <h1 className={styles.heroTitle}>
                <span className={styles.titleLine1}>GARUDA</span>
                <span className={styles.titleLine2}>
                  Engineering<br />
                  <span className={styles.accentText}>Excellence.</span>
                </span>
              </h1>

              <p className={styles.heroSub}>
                Uncompromising Performance. We design, build, and race 
                ultra-efficient super mileage vehicles on the world stage.
              </p>

              <div className={styles.heroBtns}>
                <Link href="/about" className="btn-primary">
                  Discover →
                </Link>
                <Link href="/builds" className="btn-outline">
                  Our Builds
                </Link>
              </div>

              {/* Mini stats */}
              <div className={styles.miniStats}>
                {stats.map((s) => (
                  <div key={s.label} className={styles.miniStat}>
                    <span className={styles.miniStatVal}>{s.value}</span>
                    <span className={styles.miniStatLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — 3D Model */}
            <div className={styles.modelWrap}>
              <CarModel3D />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <span className={styles.scrollLine} />
          <span className={styles.scrollText}>SCROLL</span>
        </div>
      </section>

      {/* ====== ABOUT PREVIEW ====== */}
      <section className={`section ${styles.aboutSection}`}>
        <div className={styles.aboutBg} />
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutLeft}>
              <div className="section-label">Who We Are</div>
              <h2 className="section-title">
                Redefining <span>Fuel Efficiency</span>
              </h2>
              <p className={styles.aboutText}>
                GARUDA is a professional student engineering club that specializes in designing 
                and building super mileage vehicles. From concept to competition, our multidisciplinary 
                team pushes the limits of automotive engineering.
              </p>
              <p className={styles.aboutText}>
                We have competed at Shell Eco-marathon Asia and other international events, 
                consistently ranking among top teams and bringing pride to our institution.
              </p>
              <Link href="/about" className="btn-outline" style={{ marginTop: "1.5rem" }}>
                Learn More About Us →
              </Link>
            </div>

            <div className={styles.aboutRight}>
              {highlights.map((h) => {
                let svgIcon;
                if (h.icon === "efficiency") {
                  svgIcon = (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  );
                } else if (h.icon === "global") {
                  svgIcon = (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                  );
                } else if (h.icon === "research") {
                  svgIcon = (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-atom"><circle cx="12" cy="12" r="1"/><path d="M16.83 17a6 6 0 1 0-9.66 0"/><path d="M12 2a10 10 0 1 0 10 10"/></svg>
                  );
                }

                return (
                  <div key={h.title} className={`card ${styles.highlightCard}`}>
                    <span className={styles.highlightIcon}>{svgIcon}</span>
                    <div>
                      <h3 className={styles.highlightTitle}>{h.title}</h3>
                      <p className={styles.highlightDesc}>{h.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
