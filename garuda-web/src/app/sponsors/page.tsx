import type { Metadata } from "next";
import styles from "./page.module.css";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Partner with GARUDA",
  description:
    "Sponsor India's first student-built super-mileage vehicle team. Reach engineering talent, an international audience, and back a serious ESG story.",
};

const SPONSOR_EMAIL = "garuda@rvce.edu.in";

const reasons = [
  {
    num: "01",
    title: "Talent Pipeline",
    desc: "Direct access to India's most ambitious mechanical, electrical, aerospace, and software undergraduates from RVCE. Many alumni go on to lead engineering teams at global automotive, aerospace, and energy companies.",
  },
  {
    num: "02",
    title: "Sustainability Story",
    desc: "Battery-electric Urban Concept vehicles, tuned for absolute efficiency. Sponsor a programme whose entire technical premise is reducing energy footprint per kilometre — a credible ESG narrative, not greenwash.",
  },
  {
    num: "03",
    title: "International Visibility",
    desc: "Logo placement on cars and team kit that travels to Shell Eco-marathon Asia at Sepang International Circuit — exposure to an engineering and automotive audience across Asia and beyond.",
  },
  {
    num: "04",
    title: "R&D Partnership",
    desc: "Real prototype platform to test materials, components, software, and manufacturing processes. We're a small, fast-iterating team — ideal for trialling technology that's too risky for production schedules.",
  },
];

const stats = [
  { value: "20+", label: "Years on track" },
  { value: "11", label: "Cars built" },
  { value: "06", label: "International events" },
  { value: "200+", label: "km/L record" },
];

const tiers = [
  {
    name: "Title Partner",
    tag: "Exclusive",
    pitch: "Headline placement across the car, the team, and every platform.",
    benefits: [
      "Title position on car body & team kit",
      "Naming rights on the build (subject to approval)",
      "Primary placement on website, press kit, and social",
      "Joint announcement at competition events",
      "Custom hospitality and workshop visits",
    ],
    cta: "Discuss the partnership",
  },
  {
    name: "Gold",
    tag: null,
    pitch: "Prominent logo placement and recurring brand integration across the season.",
    benefits: [
      "Logo on car body and team kit",
      "Featured listing on /sponsors and footer",
      "Quarterly social media features",
      "Mention in press releases and competition coverage",
    ],
    cta: "Enquire about Gold",
  },
  {
    name: "Silver",
    tag: null,
    pitch: "Brand presence on the team and in our public communications.",
    benefits: [
      "Logo on team kit and pit-area signage",
      "Listed on /sponsors with link",
      "Social media acknowledgement",
    ],
    cta: "Enquire about Silver",
  },
  {
    name: "In-Kind",
    tag: "Materials · Services",
    pitch: "Components, manufacturing, or services — in exchange for credit and visibility.",
    benefits: [
      "Custom benefits matched to contribution",
      "Component testing and product feedback",
      "Recognition as Technical Partner",
    ],
    cta: "Propose a partnership",
  },
];

const currentPartners = [
  { name: "RVCE", role: "Host Institution", confirmed: true },
  { name: "Your Brand", role: "Title Partner", confirmed: false },
  { name: "Your Brand", role: "Gold Partner", confirmed: false },
  { name: "Your Brand", role: "Technical Partner", confirmed: false },
];

const tierOptions = [
  "Title Partner",
  "Gold",
  "Silver",
  "In-Kind / Technical",
  "Custom — let's talk",
];

export default function SponsorsPage() {
  return (
    <div className={styles.page}>
      {/* ====== PAGE HEADER ====== */}
      <section className={styles.pageHeader}>
        <div className={styles.headerMedia} aria-hidden="true">
          <img
            src="/images/2019_Shell_ecoMarathon_team_with_car.jpg"
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
              Partnerships
            </span>
            <h1 className={styles.pageTitle}>
              Back the car. Back the <span className={styles.accent}>engineers</span>.
            </h1>
            <p className={styles.pageDesc}>
              Project Garuda is a student super-mileage team at RV College of
              Engineering. We build battery-electric vehicles, race them
              internationally, and graduate engineers who go on to build serious
              things. Partnership puts your brand alongside that work.
            </p>

            <div className={styles.headerCtas}>
              <a href="#inquire" className="btn-primary">
                Become a Sponsor
              </a>
              <a href={`mailto:${SPONSOR_EMAIL}`} className={styles.headerGhost}>
                Or write to us directly
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====== BY THE NUMBERS ====== */}
      <section className={styles.statsSection}>
        <div className="container">
          <Reveal as="div" className={styles.statsGrid}>
            {stats.map((s) => (
              <div key={s.label} className={styles.statBlock}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ====== WHY PARTNER ====== */}
      <section className={`section ${styles.whySection}`}>
        <div className="container">
          <Reveal as="div">
            <span className={styles.sectionKicker}>
              <span className={styles.sectionKickerNum}>N° 02</span>
              <span className={styles.sectionKickerDivider} />
              Why Partner
            </span>
            <h2 className={styles.sectionTitle}>
              Four reasons that hold up to scrutiny.
            </h2>
          </Reveal>

          <ol className={styles.reasonsList}>
            {reasons.map((r, i) => (
              <Reveal
                as="li"
                key={r.title}
                className={styles.reason}
                delay={i * 90}
              >
                <span className={styles.reasonNum}>{r.num}</span>
                <div className={styles.reasonBody}>
                  <h3 className={styles.reasonTitle}>{r.title}</h3>
                  <p className={styles.reasonDesc}>{r.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ====== TIERS ====== */}
      <section className={`section ${styles.tiersSection}`}>
        <div className="container">
          <Reveal as="div">
            <span className={styles.sectionKicker}>
              <span className={styles.sectionKickerNum}>N° 03</span>
              <span className={styles.sectionKickerDivider} />
              Tiers
            </span>
            <h2 className={styles.sectionTitle}>
              Sponsorship structure.
            </h2>
            <p className={styles.sectionLead}>
              Indicative tiers — every partnership is shaped around what you
              want to achieve. We're a small team and we'll meet to design the
              right deal.
            </p>
          </Reveal>

          <div className={styles.tiersGrid}>
            {tiers.map((t, i) => (
              <Reveal
                as="article"
                key={t.name}
                className={styles.tierCard}
                delay={i * 90}
              >
                <header className={styles.tierHeader}>
                  <div className={styles.tierLabelRow}>
                    <span className={styles.tierName}>{t.name}</span>
                    {t.tag && <span className={styles.tierTag}>{t.tag}</span>}
                  </div>
                  <p className={styles.tierPitch}>{t.pitch}</p>
                </header>

                <ul className={styles.tierBenefits}>
                  {t.benefits.map((b) => (
                    <li key={b} className={styles.tierBenefit}>
                      <span className={styles.tierBenefitMark} aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>

                <a
                  href={`#inquire`}
                  className={styles.tierCta}
                  data-tier={t.name}
                >
                  {t.cta}
                  <span aria-hidden="true">→</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CURRENT PARTNERS ====== */}
      <section className={`section ${styles.partnersSection}`}>
        <div className="container">
          <Reveal as="div">
            <span className={styles.sectionKicker}>
              <span className={styles.sectionKickerNum}>N° 04</span>
              <span className={styles.sectionKickerDivider} />
              The Roster
            </span>
            <h2 className={styles.sectionTitle}>Current partners.</h2>
            <p className={styles.sectionLead}>
              Slots are open across every tier for the current season.
            </p>
          </Reveal>

          <div className={styles.partnersGrid}>
            {currentPartners.map((p, i) => (
              <Reveal
                as="div"
                key={`${p.name}-${i}`}
                className={`${styles.partnerCard} ${!p.confirmed ? styles.partnerCardOpen : ""}`}
                delay={i * 90}
              >
                <span className={styles.partnerRole}>{p.role}</span>
                <span className={styles.partnerName}>{p.name}</span>
                <span className={styles.partnerStatus}>
                  {p.confirmed ? "Confirmed" : "Slot open"}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====== INQUIRY FORM ====== */}
      <section id="inquire" className={`section ${styles.inquirySection}`}>
        <div className="container">
          <div className={styles.inquiryGrid}>
            <Reveal as="div" className={styles.inquiryLeft}>
              <span className={styles.sectionKicker}>
                <span className={styles.sectionKickerNum}>N° 05</span>
                <span className={styles.sectionKickerDivider} />
                Start the Conversation
              </span>
              <h2 className={styles.inquiryTitle}>
                Tell us what you're trying to do.
              </h2>
              <p className={styles.inquiryDesc}>
                Send the form and the captain will get back within a few
                working days. If you'd rather skip the form, write directly to
                the address below — we read everything.
              </p>

              <div className={styles.inquiryMeta}>
                <div className={styles.inquiryMetaRow}>
                  <span className={styles.inquiryMetaLabel}>Direct email</span>
                  <a
                    href={`mailto:${SPONSOR_EMAIL}`}
                    className={styles.inquiryMetaLink}
                  >
                    {SPONSOR_EMAIL}
                  </a>
                </div>
                <div className={styles.inquiryMetaRow}>
                  <span className={styles.inquiryMetaLabel}>Sponsorship deck</span>
                  <a
                    href={`mailto:${SPONSOR_EMAIL}?subject=Sponsorship%20deck%20request`}
                    className={styles.inquiryMetaLink}
                  >
                    Request the latest version
                  </a>
                </div>
                <div className={styles.inquiryMetaRow}>
                  <span className={styles.inquiryMetaLabel}>Workshop</span>
                  <a
                    href="https://www.google.com/maps?q=12.923242,77.497903"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.inquiryMetaLink}
                  >
                    Beside Design Thinking Huddle, RVCE
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal as="div" className={styles.inquiryFormWrap} delay={120}>
              <form
                className={styles.inquiryForm}
                action={`mailto:${SPONSOR_EMAIL}`}
                method="post"
                encType="text/plain"
              >
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="contact-name">
                      Your name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      className={styles.formInput}
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="contact-role">
                      Position
                    </label>
                    <input
                      id="contact-role"
                      name="role"
                      type="text"
                      className={styles.formInput}
                      placeholder="Title at your organization"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="contact-org">
                      Organization
                    </label>
                    <input
                      id="contact-org"
                      name="organization"
                      type="text"
                      className={styles.formInput}
                      placeholder="Company or institution"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="contact-email">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      className={styles.formInput}
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="contact-tier">
                    Sponsorship interest
                  </label>
                  <select
                    id="contact-tier"
                    name="tier"
                    className={styles.formInput}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select tier
                    </option>
                    {tierOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="contact-msg">
                    What are you trying to achieve?
                  </label>
                  <textarea
                    id="contact-msg"
                    name="message"
                    className={styles.formInput}
                    rows={5}
                    placeholder="Goals, timeline, anything else we should know."
                    required
                  />
                </div>

                <button type="submit" className={`btn-primary ${styles.formSubmit}`}>
                  Send Inquiry →
                </button>

                <p className={styles.formFootnote}>
                  Submitting opens your email client with the message
                  pre-filled. If that doesn't work, write to{" "}
                  <a href={`mailto:${SPONSOR_EMAIL}`}>{SPONSOR_EMAIL}</a>{" "}
                  directly.
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
