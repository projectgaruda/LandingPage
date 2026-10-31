/* Gallery: photo grid with category filters and a click-to-enlarge lightbox.
   Photos are listed in assets/data/gallery.json; categories come from that list. */

const filtersEl = document.querySelector(".filters");
const gridEl = document.querySelector(".gallery-grid");
const emptyEl = document.querySelector(".gallery-empty");

function openLightbox(src, alt) {
  const opener = document.activeElement;
  document.body.insertAdjacentHTML(
    "beforeend",
    `<div class="lightbox" role="dialog" aria-modal="true" aria-label="${alt}">
      <button type="button" class="lightbox-close">Close</button>
      <img src="${src}" alt="${alt}">
    </div>`
  );
  const box = document.body.lastElementChild;
  const closeBtn = box.querySelector(".lightbox-close");
  document.body.style.overflow = "hidden";
  closeBtn.focus();
  const close = () => {
    box.remove();
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKey);
    if (opener) opener.focus();
  };
  const onKey = (e) => e.key === "Escape" && close();
  box.addEventListener("click", (e) => e.target.tagName !== "IMG" && close());
  document.addEventListener("keydown", onKey);
}

function showPhotos(images) {
  gridEl.innerHTML = images
    .map(
      (img, i) => `<figure class="tile" data-reveal style="--i: ${i % 3}">
        <button type="button" class="tile-btn" data-src="${img.src}" data-alt="${img.alt}" aria-label="Enlarge: ${img.alt}">
          <img src="${img.src}" alt="${img.alt}" loading="lazy">
        </button>
        <figcaption><span>${img.alt}</span><span class="muted">${img.category}</span></figcaption>
      </figure>`
    )
    .join("");
  emptyEl.hidden = images.length > 0;
  Garuda.reveal(gridEl);
}

fetch("assets/data/gallery.json")
  .then((res) => res.json())
  .then((images) => {
    const categories = ["All", ...new Set(images.map((img) => img.category))];
    filtersEl.innerHTML = categories
      .map((cat) => {
        const count = cat === "All" ? images.length : images.filter((img) => img.category === cat).length;
        return `<button type="button" role="tab" class="filter" data-category="${cat}">${cat} <span class="num">${count}</span></button>`;
      })
      .join("");

    const select = (cat) => {
      filtersEl.querySelectorAll(".filter").forEach((btn) => btn.setAttribute("aria-selected", btn.dataset.category === cat));
      showPhotos(cat === "All" ? images : images.filter((img) => img.category === cat));
    };

    filtersEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (btn) select(btn.dataset.category);
    });
    gridEl.addEventListener("click", (e) => {
      const tile = e.target.closest(".tile-btn");
      if (tile) openLightbox(tile.dataset.src, tile.dataset.alt);
    });
    select("All");
  });
