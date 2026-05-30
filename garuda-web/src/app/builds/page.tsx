import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import BuildsTimeline from "./timeline";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Previous Builds",
  description:
    "Every car GARUDA has built — from the first super-mileage prototype in 2008 to the electric era and beyond.",
};

/* ============================================================
   BUILD DATA
   Years and image paths are confirmed. Everything else is
   placeholder until verified — drop in real specs, events,
   and descriptions as they're confirmed.
============================================================ */

const PLACEHOLDER_STATS = [
  { label: "Powertrain", val: "—" },
  { label: "Vehicle Mass", val: "—" },
  { label: "Top Speed", val: "—" },
  { label: "Category", val: "—" },
];

const builds = [
  {
    id: "garuda-2025",
    name: "GAJA",
    year: "2025",
    tag: "In Development",
    images: ["/images/builds/garuda_2025.jpeg"],
    category: "—",
    event: "—",
    stats: PLACEHOLDER_STATS,
    desc: "The current build is in active development. Specifications and competition details to be announced.",
    placeholder: true,
  },
  {
    id: "garuda-2023",
    name: "GARUDA 2023",
    year: "2023",
    tag: null,
    images: [] as string[],
    category: "—",
    event: "—",
    stats: PLACEHOLDER_STATS,
    desc: "Build details to be added.",
    placeholder: true,
  },
  {
    id: "mjolnir-2019",
    name: "MJOLNIR",
    year: "2019",
    tag: null,
    images: [
      "/images/gallery/9.jpg",
      "/images/side_view_2019.jpg",
      "/images/2019_Shell_ecoMarathon_team_with_car.jpg",
      "/images/core_team_with_car.jpg",
      "/images/car_on_track.jpg",
    ],
    category: "—",
    event: "—",
    stats: PLACEHOLDER_STATS,
    desc: "Build details to be added.",
    placeholder: true,
  },
  {
    id: "vajra-2018",
    name: "VAJRA",
    year: "2018",
    tag: "Electric Era Begins",
    images: [
      "/images/gallery/8.jpg",
      "/images/vajra_2018.jpg",
      "/images/vajra_2018_team.jpg",
      "/images/vajra_collage.jpg",
    ],
    category: "—",
    event: "—",
    stats: PLACEHOLDER_STATS,
    desc: "The pivot from internal combustion to battery electric. Full specifications to be added.",
    placeholder: true,
  },
  {
    id: "agni-2016",
    name: "AGNI",
    year: "2016",
    tag: null,
    images: [
      "/images/gallery/7.jpg",
      "/images/agni_2016.jpg",
      "/images/agni_2016_weighing.jpg",
    ],
    category: "—",
    event: "—",
    stats: PLACEHOLDER_STATS,
    desc: "Build details to be added.",
    placeholder: true,
  },
  {
    id: "phoenix-2015",
    name: "PHOENIX",
    year: "2015",
    tag: null,
    images: [
      "/images/gallery/6.jpg",
      "/images/pheniox_2015.jpg",
      "/images/SEM_2015.jpg",
      "/images/2015_competition_pics.jpg",
    ],
    category: "—",
    event: "—",
    stats: PLACEHOLDER_STATS,
    desc: "Build details to be added.",
    placeholder: true,
  },
  {
    id: "garuda-2013",
    name: "GARUDA 2013",
    year: "2013",
    tag: null,
    images: ["/images/gallery/5.jpg"],
    category: "—",
    event: "—",
    stats: PLACEHOLDER_STATS,
    desc: "Build details to be added.",
    placeholder: true,
  },
  {
    id: "garuda-x1-2011",
    name: "GARUDA X1",
    year: "2011",
    tag: null,
    images: [
      "/images/2011_Car.jpg",
      "/images/2011_garuda_car.jpg",
      "/images/2011_prototype_Car.jpg",
    ],
    category: "—",
    event: "—",
    stats: PLACEHOLDER_STATS,
    desc: "Build details to be added.",
    placeholder: true,
  },
  {
    id: "garuda-2010",
    name: "GARUDA 2010",
    year: "2010",
    tag: null,
    images: [
      "/images/2010_car.jpg",
      "/images/sem_2010_sepang_international_circuit_malaysia.jpg",
    ],
    category: "—",
    event: "—",
    stats: PLACEHOLDER_STATS,
    desc: "Build details to be added.",
    placeholder: true,
  },
  {
    id: "garuda-2009",
    name: "GARUDA 2009",
    year: "2009",
    tag: null,
    images: ["/images/2009_car_without_driver.jpg"],
    category: "—",
    event: "—",
    stats: PLACEHOLDER_STATS,
    desc: "Build details to be added.",
    placeholder: true,
  },
  {
    id: "black-coffin",
    name: "BLACK COFFIN",
    year: "2008",
    tag: "First Prototype",
    images: [
      "/images/gallery/1.jpg",
      "/images/black_coffin_event_photo.jpg",
      "/images/gallery/Young-achivers-1 (2).png",
      "/images/Since then Project Garuda has built 7 prototypes,4 urban concept cars and has a total of 11 cars in its name..jpg",
      "/images/History_image.jpg",
    ],
    category: "—",
    event: "—",
    stats: PLACEHOLDER_STATS,
    desc: "The first build. Full specifications and history to be added.",
    placeholder: true,
  },
];

export default function BuildsPage() {
  const sortedBuilds = [...builds].sort(
    (a, b) => Number(a.year) - Number(b.year),
  );

  return (
    <div className={styles.page}>
      {/* ====== PAGE HEADER ====== */}
      <section className={styles.pageHeader}>
        <div className={styles.headerMedia} aria-hidden="true">
          <img
            src="/images/car_on_track.jpg"
            alt=""
            className={styles.headerPhoto}
          />
          <div className={styles.headerOverlay} />
          <div className={styles.headerGrain} />
        </div>

        <div className={`container ${styles.headerContainer}`}>
          <Reveal as="div" className={styles.headerBody}>
            <span className={styles.headerKicker}>
              <span className={styles.headerKickerNum}>N° 01</span>
              <span className={styles.headerKickerDivider} />
              The Cars
            </span>
            <h1 className={styles.pageTitle}>
              Every build, <span className={styles.accent}>every</span> year.
            </h1>
            <p className={styles.pageDesc}>
              Eleven cars across two decades. Prototypes that started on petrol
              and grew into battery-electric Urban Concepts. The catalogue
              below is the full lineage — from the first build in 2008 to the
              current one in the workshop.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ====== TIMELINE ====== */}
      <section className={`section ${styles.timelineSection}`}>
        <div className="container">
          <Reveal as="div">
            <span className={styles.sectionKicker}>
              <span className={styles.sectionKickerNum}>N° 02</span>
              <span className={styles.sectionKickerDivider} />
              Memory Lane
            </span>
            <h2 className={styles.sectionTitle}>Our Journey</h2>
            <p className={styles.sectionLead}>
              In chronological order, from the first build in 2008 to the
              current one in the workshop. Build details are being verified
              and will be filled in as records are confirmed.
            </p>
          </Reveal>

          <BuildsTimeline builds={sortedBuilds} />
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className={styles.ctaSection}>
        <div className="container">
          <Reveal as="div" className={styles.ctaInner}>
            <div>
              <span className={styles.sectionKicker}>
                <span className={styles.sectionKickerNum}>N° 03</span>
                <span className={styles.sectionKickerDivider} />
                Next
              </span>
              <h2 className={styles.ctaTitle}>
                Build the next one with us.
              </h2>
              <p className={styles.ctaDesc}>
                Follow the workshop, or apply to help build the next car.
              </p>
            </div>
            <div className={styles.ctaBtns}>
              <Link href="/join" className="btn-primary">
                Join the Team
              </Link>
              <Link href="/gallery" className={styles.ctaGhost}>
                View Gallery <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
