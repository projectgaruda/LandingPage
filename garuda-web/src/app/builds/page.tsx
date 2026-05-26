import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import BuildsTimeline from "./timeline";

export const metadata: Metadata = {
  title: "Previous Builds",
  description:
    "Explore all GARUDA super mileage vehicle builds — Black Coffin, Garuda X1, and more. Each representing the pinnacle of student engineering.",
};

const PLACEHOLDER_STATS = [
  { label: "Mileage", val: "—" },
  { label: "Vehicle Mass", val: "—" },
  { label: "Top Speed", val: "—" },
  { label: "Powertrain", val: "—" },
];

const builds = [
  {
    id: "garuda-2025",
    name: "GARUDA 2025",
    year: "2025",
    tag: null,
    images: ["/images/builds/garuda_2025.jpeg"],
    category: "—",
    event: "—",
    stats: PLACEHOLDER_STATS,
    desc: "Details coming soon.",
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
    desc: "Details coming soon.",
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
    category: "UrbanConcept — Battery Electric Vehicle",
    event: "Shell Eco-Marathon Asia 2019",
    stats: [
      { label: "Efficiency", val: "Improved km/kWh" },
      { label: "Vehicle Mass", val: "≈ 120 kg" },
      { label: "Powertrain", val: "Electric" },
      { label: "Category", val: "UrbanConcept" },
    ],
    desc: "Building on the electric foundation laid by Vajra, Mjolnir refined powertrain efficiency and reduced overall vehicle mass. The team competed at Shell Eco-Marathon Asia, continuing to represent India among the top engineering teams in the region.",
    placeholder: false,
  },
  {
    id: "vajra-2018",
    name: "VAJRA",
    year: "2018",
    tag: null,
    images: [
      "/images/gallery/8.jpg",
      "/images/vajra_2018.jpg",
      "/images/vajra_2018_team.jpg",
      "/images/vajra_collage.jpg",
    ],
    category: "UrbanConcept — Battery Electric Vehicle",
    event: "Shell Eco-Marathon Asia 2018",
    stats: [
      { label: "Efficiency", val: "High km/kWh" },
      { label: "Vehicle Mass", val: "≈ 130 kg" },
      { label: "Powertrain", val: "Electric" },
      { label: "Chassis", val: "Al + Carbon Fiber" },
    ],
    desc: "Vajra marked a historic pivot for Project Garuda — the transition from Internal Combustion to fully electric vehicles. Built as an Urban Concept battery-electric vehicle, it featured an aluminum base with a carbon fiber superstructure to stay lightweight yet sturdy at approximately 130 kg. This was the beginning of the team's clean energy era.",
    placeholder: false,
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
    category: "Prototype — Gasoline (IC Engine)",
    event: "Shell Eco-Marathon Asia 2016",
    stats: [
      { label: "Mileage", val: "350+ km/L" },
      { label: "Vehicle Mass", val: "≈ 42 kg" },
      { label: "Top Speed", val: "30 km/h" },
      { label: "Engine", val: "50cc IC" },
    ],
    desc: "Named after the Sanskrit word for 'fire', Agni was a testament to relentless weight optimization. Every gram was scrutinized and eliminated. The vehicle achieved the team's best-ever mileage figures at that time, showcasing the power of iterative engineering.",
    placeholder: false,
  },
  {
    id: "phoenix-2015",
    name: "PHOENIX",
    year: "2015",
    tag: "First Urban Concept",
    images: [
      "/images/gallery/6.jpg",
      "/images/pheniox_2015.jpg",
      "/images/SEM_2015.jpg",
      "/images/2015_competition_pics.jpg",
    ],
    category: "UrbanConcept — Gasoline (IC Engine)",
    event: "Shell Eco-Marathon Asia 2015",
    stats: [
      { label: "Mileage", val: "300+ km/L" },
      { label: "Vehicle Mass", val: "≈ 48 kg" },
      { label: "Top Speed", val: "30 km/h" },
      { label: "Engine", val: "50cc IC" },
    ],
    desc: "Rising from years of iterative design, Phoenix marked Project Garuda's first Urban Concept vehicle. With a significantly refined aerodynamic profile and a lighter chassis, it pushed the team's mileage records to new heights at the Shell Eco-Marathon Asia.",
    placeholder: false,
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
    category: "Prototype — Gasoline (IC Engine)",
    event: "Shell Eco-Marathon Asia 2011 (Sepang International Circuit, Malaysia)",
    stats: [
      { label: "Mileage", val: "270 km/L" },
      { label: "Vehicle Mass", val: "≈ 50 kg" },
      { label: "Top Speed", val: "28 km/h" },
      { label: "Engine", val: "Optimized 50cc" },
    ],
    desc: "A monumental milestone in the team's history. Garuda X1 was developed to test torque and horsepower limits and optimize the drivetrain. It raced at the prestigious Sepang International Circuit in Malaysia, firmly establishing the team as a seasoned international competitor.",
    placeholder: false,
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
    desc: "Details coming soon.",
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
    desc: "Details coming soon.",
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
    category: "Prototype — Gasoline (IC Engine)",
    event: "Shell Eco-Marathon Asia 2010",
    stats: [
      { label: "Mileage", val: "220 km/L" },
      { label: "Vehicle Mass", val: "≈ 55 kg" },
      { label: "Top Speed", val: "25 km/h" },
      { label: "Engine", val: "50cc Gasoline" },
    ],
    desc: "The second-generation vehicle focused heavily on structural weight reduction and aerodynamic refinement. By optimizing the frame geometry and fuel delivery system, the team improved efficiency by over 20% compared to the Black Coffin.",
    placeholder: false,
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
    category: "Prototype — Gasoline (IC Engine)",
    event: "Shell Eco-Marathon UK 2009 — 'Most Persevering Team' Award",
    stats: [
      { label: "Mileage", val: "180 km/L" },
      { label: "Vehicle Mass", val: "≈ 65 kg" },
      { label: "Top Speed", val: "22 km/h" },
      { label: "Engine", val: "50cc Gasoline" },
    ],
    desc: "The legendary first build of Project Garuda. Unveiled on August 2, 2008, the 'Black Coffin' was India's first-ever student-built super-mileage prototype. It featured a lightweight Lexan shell and electronically controlled fuel-injection. The team won the prestigious 'Most Persevering Team' award at their debut Shell Eco-Marathon in the UK.",
    placeholder: false,
  },
];

export default function BuildsPage() {
  const sortedBuilds = [...builds].sort(
    (a, b) => Number(a.year) - Number(b.year),
  );

  return (
    <div className={styles.page}>
      <section className={styles.pageHeader}>
        <div className={styles.headerBg} />
        <div className="container">
          <div className="section-label">Our Engineering</div>
          <h1 className={styles.pageTitle}>
            Previous <span className={styles.accent}>Builds</span>
          </h1>
          <p className={styles.pageDesc}>
            Every vehicle represents thousands of hours of design, iteration, and
            relentless pursuit of efficiency. A legacy built one revolution at a time.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <BuildsTimeline builds={sortedBuilds} />
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <h3 className={styles.ctaTitle}>Interested in our next build?</h3>
          <h4 className={styles.ctaDesc}>
            Follow our journey as we push the limits even further.
          </h4>
          <div className={styles.ctaBtns}>
            <Link href="/contact" className="btn-primary">
              Get in Touch →
            </Link>
            <Link href="/gallery" className="btn-outline">
              View Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
