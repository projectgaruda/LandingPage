/* Builds: one entry per car from assets/data/builds.json.
   A build without "stats" shows its name, year and photos only. */

const list = document.querySelector(".builds");

const arrow = (d) =>
  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;

function carouselHTML(build) {
  if (build.images.length === 0) return "";
  const slides = build.images
    .map((src, i) => `<img src="${src}" alt="${build.name}, photo ${i + 1} of ${build.images.length}" loading="lazy">`)
    .join("");
  if (build.images.length === 1) return `<figure class="photo carousel"><div class="carousel-track">${slides}</div></figure>`;
  return `<figure class="photo carousel" aria-roledescription="carousel" aria-label="${build.name} photos">
    <div class="carousel-track">${slides}</div>
    <div class="carousel-controls">
      <button type="button" class="carousel-btn" data-step="-1" aria-label="Previous photo">${arrow("m15 18-6-6 6-6")}</button>
      <span class="carousel-count num" aria-live="polite">1 of ${build.images.length}</span>
      <button type="button" class="carousel-btn" data-step="1" aria-label="Next photo">${arrow("m9 18 6-6-6-6")}</button>
    </div>
  </figure>`;
}

function entryHTML(build) {
  const facts = build.stats
    ? `<dl class="facts build-facts">
        ${build.category ? `<div><dt>Category</dt><dd>${build.category}</dd></div>` : ""}
        ${build.event ? `<div><dt>Event</dt><dd>${build.event}</dd></div>` : ""}
        ${build.stats.map((s) => `<div><dt>${s.label}</dt><dd>${s.val}</dd></div>`).join("")}
      </dl>`
    : "";
  return `<article class="build${build.stats ? "" : " build--brief"}" data-reveal>
    <p class="build-year num" aria-hidden="true">${build.year}</p>
    <div class="build-body">
      <header class="build-head">
        <h3 class="build-name">${build.name} <span class="visually-hidden">(${build.year})</span></h3>
        ${build.tag ? `<p class="build-tag">${build.tag}</p>` : ""}
      </header>
      ${carouselHTML(build)}
      ${build.desc || facts ? `<div class="build-info">${build.desc ? `<p class="build-desc">${build.desc}</p>` : ""}${facts}</div>` : ""}
    </div>
  </article>`;
}

// Arrows step through a car's photos
function setupCarousel(el) {
  const track = el.querySelector(".carousel-track");
  const count = el.querySelector(".carousel-count");
  const total = track.children.length;
  let index = 0;
  el.querySelectorAll(".carousel-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      index = (index + Number(btn.dataset.step) + total) % total;
      track.style.transform = `translateX(-${index * 100}%)`;
      count.textContent = `${index + 1} of ${total}`;
    })
  );
}

// The year of the car in the middle of the screen turns green
function highlightCurrent(entries) {
  const io = new IntersectionObserver(
    (changes) => changes.forEach((c) => c.target.classList.toggle("is-current", c.isIntersecting)),
    { rootMargin: "-45% 0px -45% 0px" }
  );
  entries.forEach((e) => io.observe(e));
}

fetch("assets/data/builds.json")
  .then((res) => res.json())
  .then((builds) => {
    list.innerHTML = builds.map(entryHTML).join("");
    list.querySelectorAll(".carousel-controls").forEach((c) => setupCarousel(c.closest(".carousel")));
    // A single photo whose file is missing: drop the empty frame
    list.querySelectorAll(".carousel").forEach((fig) => {
      const imgs = fig.querySelectorAll("img");
      if (imgs.length === 1) imgs[0].addEventListener("error", () => fig.remove(), { once: true });
    });
    highlightCurrent(list.querySelectorAll(".build"));
    Garuda.reveal(list);
  });
