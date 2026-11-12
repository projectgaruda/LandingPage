/* Shared by every page: the nav, the footer, tabs and the one scroll reveal. */

// The logo links home, so the nav spends its space on the pages people look for
const NAV_LINKS = [
  { href: "about.html", label: "About" },
  { href: "team.html", label: "Team" },
  { href: "builds.html", label: "Builds" },
  { href: "gallery.html", label: "Gallery" },
  { href: "sponsors.html", label: "Sponsors" },
  { href: "join.html", label: "Join" },
  { href: "contact.html", label: "Contact" },
];

const ICON = (paths) =>
  `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

const SOCIALS = [
  {
    label: "Instagram", href: "https://www.instagram.com/projectgaruda",
    icon: ICON('<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>'),
  },
  {
    label: "LinkedIn", href: "https://www.linkedin.com/company/project-garuda/?originalSubdomain=in",
    icon: ICON('<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>'),
  },
  {
    label: "YouTube", href: "https://www.youtube.com/@GarudaRVCE",
    icon: ICON('<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>'),
  },
];

// "team.html", "/team" and "/team/" all count as the team page
const currentPage = (location.pathname.split("/").filter(Boolean).pop() || "index").replace(/\.html$/, "");
const isCurrent = (href) => href.replace(/\.html$/, "") === currentPage;

// Nav: the logo and the links, nothing else
function renderNav() {
  const links = NAV_LINKS.map(
    (l) => `<li><a href="${l.href}"${isCurrent(l.href) ? ' aria-current="page"' : ""}>${l.label}</a></li>`
  ).join("");

  document.body.insertAdjacentHTML(
    "afterbegin",
    `<a class="skip" href="#main">Skip to content</a>
    <header class="nav">
      <div class="container nav-inner">
        <a href="index.html" class="nav-logo" aria-label="Project Garuda, home"><img src="assets/images/logo.png" alt="" width="120" height="34"></a>
        <button type="button" class="nav-menu-btn" aria-expanded="false" aria-controls="nav-links">Menu</button>
        <ul class="nav-links" id="nav-links">${links}</ul>
      </div>
    </header>`
  );

  const nav = document.querySelector(".nav");
  const menuBtn = nav.querySelector(".nav-menu-btn");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.textContent = open ? "Close" : "Menu";
  });
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// Footer: one row. Who we are on the left, the links and contact details on the right.
function renderFooter() {
  const links = `<li><a href="index.html">Home</a></li>` + NAV_LINKS.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("");
  const socials = SOCIALS.map(
    (s) => `<li><a href="${s.href}" target="_blank" rel="noopener noreferrer" class="footer-icon" aria-label="${s.label} (opens in a new tab)">${s.icon}</a></li>`
  ).join("");

  document.body.insertAdjacentHTML(
    "beforeend",
    `<footer class="footer">
      <div class="container footer-row">
        <div class="footer-brand">
          <a href="index.html" aria-label="Project Garuda, home"><img src="assets/images/logo.png" alt="" width="120" height="34"></a>
          <p>Super Mileage Vehicle Team of RV College of Engineering, Bengaluru.</p>
          <ul class="footer-icons" aria-label="Follow Project Garuda">${socials}</ul>
          <a class="footer-race" href="https://www.shellecomarathon.com/" target="_blank" rel="noopener noreferrer" aria-label="We race at Shell Eco-marathon (opens in a new tab)">
            <small>We race at</small>
            <img src="assets/images/shell-eco-marathon.svg" alt="Shell Eco-marathon" width="152" height="40">
          </a>
        </div>
        <nav class="footer-col" aria-label="Footer">
          <h2>Explore</h2>
          <ul class="footer-links">${links}</ul>
        </nav>
        <div class="footer-col">
          <h2>Contact</h2>
          <ul class="footer-contact">
            <li><small>Email</small><a href="mailto:garuda@rvce.edu.in">garuda@rvce.edu.in</a></li>
            <li><small>WhatsApp</small><a href="https://wa.me/919980143550" target="_blank" rel="noopener noreferrer">+91 99801 43550</a></li>
            <li><small>Workshop</small><a href="https://www.google.com/maps?q=12.923242,77.497903" target="_blank" rel="noopener noreferrer">Beside Design Thinking Huddle, RVCE, Bengaluru</a></li>
          </ul>
        </div>
      </div>
    </footer>`
  );
}

// Tabs: [data-switch] holds buttons with aria-controls pointing at panels.
// Without JavaScript every panel simply shows, one after another.
function setupSwitchers() {
  document.querySelectorAll("[data-switch]").forEach((root) => {
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const select = (tab) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", on);
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        const next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
        next.focus();
        select(next);
      });
    });
    select(tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0]);
  });
}

/* ---------- Scroll motion ----------
   choreograph() tags what should move; reveal() plays each part once as it scrolls in.
   The hidden states live in motion.css behind the "js" class and prefers-reduced-motion,
   so without script, or with reduced motion, the page is simply there. */

const moves = matchMedia("(prefers-reduced-motion: no-preference)").matches;
const STAGGER = ".pcards, .tiers, .figures, .members, .why, .glance, .doors, .gallery-grid";
const LISTS = ".results, .record, .faq, .rows, .routes";
const LINES = ".tier";
const within = (root, sel) => [...(root.matches?.(sel) ? [root] : []), ...root.querySelectorAll(sel)];

function choreograph(root = document.querySelector("main")) {
  if (!root) return;

  // Section heads wipe in; the lines beside them follow
  within(root, "section:not(.page-hero) h2:not(.visually-hidden):not(.rv-head)").forEach((h) => {
    h.classList.add("rv-head");
    const head = h.closest(".head");
    if (!head) return;
    [...head.children].filter((el) => el !== h && !el.matches(".photo")).forEach((el, i) => {
      el.setAttribute("data-reveal", "");
      el.style.setProperty("--i", i + 1);
    });
  });

  // Grids rise card by card; their wrapper no longer fades as a whole
  within(root, STAGGER).forEach((grid) => {
    grid.removeAttribute("data-reveal");
    grid.parentElement.closest("[data-reveal]:not(.is-in)")?.removeAttribute("data-reveal");
    [...grid.children].forEach((el, i) => {
      if (el.dataset.choreo) return;
      el.dataset.choreo = "1";
      el.setAttribute("data-reveal", "");
      el.style.setProperty("--i", i % 4);
    });
  });

  // Lists reveal row by row as each row arrives
  within(root, LISTS).forEach((list) => {
    list.removeAttribute("data-reveal");
    [...list.children].forEach((el) => el.setAttribute("data-reveal", ""));
  });

  // Photos open from a smaller window (cards and doors already move as a whole)
  within(root, ".photo").forEach((photo) => {
    if (photo.classList.contains("rv-photo") || photo.closest(".pcard, .door, .page-hero")) return;
    photo.removeAttribute("data-reveal");
    photo.classList.add("rv-photo");
  });

  within(root, LINES).forEach((el) => el.classList.add("rv-line"));
}

// Figures count up from zero to their real value, once
function countUp(el) {
  const match = el.textContent.trim().match(/^(\D*)(\d+)(.*)$/);
  if (!match || el.dataset.counted) return;
  el.dataset.counted = "1";
  const [, before, digits, after] = match;
  const target = Number(digits);
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min(1, (now - start) / 1400);
    el.textContent = before + Math.round(target * (1 - Math.pow(1 - t, 3))) + after;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const seen = new WeakSet();
const io = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        if (moves && entry.target.matches(".figures > div")) entry.target.querySelectorAll("b").forEach(countUp);
        io.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -12% 0px" })
  : null;

function reveal(root = document) {
  within(root, "[data-reveal]:not(.is-in), .rv-head:not(.is-in), .rv-photo:not(.is-in), .rv-line:not(.is-in)").forEach((el) => {
    if (seen.has(el)) return;
    seen.add(el);
    io ? io.observe(el) : el.classList.add("is-in");
  });
}

// Team, builds and gallery content arrives after load; tag and reveal it as it lands
function watch() {
  const main = document.querySelector("main");
  if (!main || !("MutationObserver" in window)) return;
  let queued = false;
  new MutationObserver((changes) => {
    if (queued || changes.every((c) => c.target.closest?.(".figures"))) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; choreograph(main); reveal(main); });
  }).observe(main, { childList: true, subtree: true });
}

window.Garuda = { reveal: (root) => { choreograph(root); reveal(root); } };

// Notice: the announcement card on the home page (markup lives in index.html).
// Closing it is remembered per notice id, so a new announcement shows again.
function setupNotice() {
  const notice = document.getElementById("notice");
  if (!notice) return;
  const key = "garuda-notice-closed:" + notice.dataset.noticeId;
  let closed = false;
  try { closed = localStorage.getItem(key) === "1"; } catch {}
  if (closed) { notice.remove(); return; }
  notice.querySelector(".notice-close").addEventListener("click", () => {
    try { localStorage.setItem(key, "1"); } catch {}
    notice.classList.add("is-leaving");
    setTimeout(() => notice.remove(), 300);
  });
}

renderNav();
renderFooter();
setupSwitchers();
setupNotice();
choreograph();
reveal();
watch();
