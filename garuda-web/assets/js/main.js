/* Shared by every page: navbar, footer and the one scroll reveal. */

const NAV_LINKS = [
  { href: "index.html", label: "Home" },
  { href: "team.html", label: "Team" },
  { href: "builds.html", label: "Builds" },
  { href: "gallery.html", label: "Gallery" },
  { href: "sponsors.html", label: "Sponsors" },
  { href: "contact.html", label: "Contact" },
];

const ICON = (paths) =>
  `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

const SOCIALS = [
  {
    label: "Instagram", handle: "@projectgaruda", href: "https://www.instagram.com/projectgaruda",
    icon: ICON('<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>'),
  },
  {
    label: "LinkedIn", handle: "Project Garuda", href: "https://www.linkedin.com/company/project-garuda/?originalSubdomain=in",
    icon: ICON('<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>'),
  },
  {
    label: "YouTube", handle: "@GarudaRVCE", href: "https://www.youtube.com/@GarudaRVCE",
    icon: ICON('<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>'),
  },
];

// "team.html", "/team" and "/team/" all count as the team page
const currentPage = (location.pathname.split("/").filter(Boolean).pop() || "index").replace(/\.html$/, "");
const isCurrent = (href) => href.replace(/\.html$/, "") === currentPage;

function renderNav() {
  const links = NAV_LINKS.map(
    (l) => `<li><a href="${l.href}"${isCurrent(l.href) ? ' aria-current="page"' : ""}>${l.label}</a></li>`
  ).join("");

  document.body.insertAdjacentHTML(
    "afterbegin",
    `<a class="skip" href="#main">Skip to content</a>
    <header class="nav${currentPage === "index" ? " nav--home" : ""}">
      <div class="container nav-inner">
        <a href="index.html" class="nav-logo" aria-label="Project Garuda, home"><img src="assets/images/logo.png" alt="" width="120" height="34"></a>
        <button type="button" class="nav-menu-btn" aria-expanded="false" aria-controls="nav-links">Menu</button>
        <ul class="nav-links" id="nav-links">${links}</ul>
        <a href="join.html" class="btn btn--quiet nav-action">Join the team</a>
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

  // On the home page the hero already offers "Join the team", so the nav's
  // copy of that button only appears once the hero has scrolled away.
  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
    nav.classList.toggle("is-past-hero", window.scrollY > window.innerHeight * 0.7);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function renderFooter() {
  const links = NAV_LINKS.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join("");
  const socials = SOCIALS.map(
    (s) => `<li><a href="${s.href}" target="_blank" rel="noopener noreferrer" class="social social--compact">
      ${s.icon}<span><span class="social-name">${s.label}</span><span class="social-handle">${s.handle}</span></span>
    </a></li>`
  ).join("");

  // The ask only appears on pages that don't already carry both asks themselves
  // (home has the hero and the two doors, sponsors and join have their forms, contact has its routes).
  const ask = ["index", "sponsors", "join", "contact"].includes(currentPage)
    ? ""
    : `<div class="footer-ask close">
          <div>
            <h2>Ready to engineer the future?</h2>
            <p>Back the next car, or help build it.</p>
          </div>
          <div class="actions">
            <a href="sponsors.html#inquire" class="btn">Become a sponsor</a>
            <a href="join.html#apply" class="btn btn--quiet">Apply to join</a>
          </div>
        </div>`;

  // One footer: the ask (where the page needs it), the social channels, then the links and the legal line
  document.body.insertAdjacentHTML(
    "beforeend",
    `<footer class="footer${ask ? "" : " footer--no-ask"}">
      <div class="container">
        ${ask}

        <ul class="footer-socials" aria-label="Follow Project Garuda">${socials}</ul>

        <div class="footer-top">
          <div class="footer-brand">
            <a href="index.html" aria-label="Project Garuda, home"><img src="assets/images/logo.png" alt="" width="120" height="34"></a>
            <p>Super Mileage Vehicle Team of RV College of Engineering, Bengaluru.</p>
            <a class="footer-race" href="https://www.shellecomarathon.com/" target="_blank" rel="noopener noreferrer" aria-label="Shell Eco-marathon website (opens in a new tab)">
              <small>We race at</small>
              <img src="assets/images/shell-eco-marathon.svg" alt="Shell Eco-marathon" width="152" height="40">
            </a>
          </div>
          <div class="footer-cols">
            <nav aria-label="Footer">
              <h2>Explore</h2>
              <ul>${links}<li><a href="join.html">Join the team</a></li></ul>
            </nav>
            <div>
              <h2>Contact</h2>
              <ul>
                <li><small>Email</small><a href="mailto:garuda@rvce.edu.in">garuda@rvce.edu.in</a></li>
                <li><small>WhatsApp</small><a href="https://wa.me/919980143550" target="_blank" rel="noopener noreferrer">+91 99801 43550</a></li>
                <li><small>Workshop</small><a href="https://www.google.com/maps?q=12.923242,77.497903" target="_blank" rel="noopener noreferrer">Beside Design Thinking Huddle, RVCE, Bengaluru</a></li>
              </ul>
            </div>
          </div>
        </div>      </div>
    </footer>`
  );
}

// Fade elements marked data-reveal in as they scroll into view.
// They stay visible if this script never runs (the hidden state needs the "js" class).
function reveal(root = document) {
  const els = root.querySelectorAll("[data-reveal]:not(.is-in)");
  if (!("IntersectionObserver" in window)) return els.forEach((el) => el.classList.add("is-in"));
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px" }
  );
  els.forEach((el) => io.observe(el));
}

window.Garuda = { reveal };

renderNav();
renderFooter();
reveal();
