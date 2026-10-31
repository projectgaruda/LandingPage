/* Team: builds the roster from assets/data/team.json.
   Members with a name get a card; a missing photo shows the team helmet instead.
   Members without a name yet are left out until their name is added to team.json. */

function initials(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Shown when a member has no photo, or their photo file is missing
const PLACEHOLDER = "assets/images/team/placeholder-helmet.jpg";
const monogram = (member) => `<img src="${PLACEHOLDER}" alt="" class="member-placeholder" loading="lazy">`;

function card(member, { large = false } = {}) {
  const picture = member.photo
    ? `<img src="${member.photo}" alt="${member.name}" loading="lazy">`
    : monogram(member);
  return `<article class="member${large ? " member--large" : ""}${member.head ? " member--head" : ""}">
    <div class="member-photo">${picture}</div>
    <h3 class="member-name">${member.name}</h3>
    <p class="member-role">${member.role}</p>
    ${member.contribution ? `<p class="member-note">${member.contribution}</p>` : ""}
  </article>`;
}


function render(id, members, options) {
  const el = document.getElementById(id);
  const named = members.filter((m) => m.name);
  el.innerHTML = named.map((m) => card(m, options)).join("");
  // If a photo file is missing, try the same name as .jpg, .jpeg, .png and .webp,
  // then the member's "fallback" photo if they have one, then show the initials
  el.querySelectorAll(".member-photo img").forEach((img, i) => {
    const base = img.getAttribute("src").replace(/\.(jpe?g|png|webp)$/i, "");
    const tries = [".jpg", ".jpeg", ".png", ".webp"].map((ext) => base + ext).filter((src) => src !== img.getAttribute("src"));
    if (named[i].fallback) tries.push(named[i].fallback);
    img.addEventListener("error", function next() {
      if (tries.length) img.src = tries.shift();
      else img.outerHTML = monogram(named[i]);
    });
  });
}

fetch("assets/data/team.json")
  .then((res) => res.json())
  .then((team) => {
    if (team.faculty) render("faculty", [team.faculty], { large: true });
    render("captain", [team.captain], { large: true });
    render("mechanical", team.mechanical);
    render("electrical", team.electrical);
    render("management", team.management);
    // Alumni: names only, grouped by batch, newest first
    const alumni = (team.alumni || []).filter((b) => b.names && b.names.length);
    if (alumni.length) {
      // Each batch is a dropdown: the year and a head count, the names inside
      document.getElementById("alumni").innerHTML = alumni.map((b) => `<details class="alumni-batch">
        <summary class="alumni-year">${b.batch}<span class="alumni-count">${b.names.length} members found</span></summary>
        <ul class="alumni-names">${b.names.map((n) => `<li>${n}</li>`).join("")}</ul>
      </details>`).join("");
      document.getElementById("alumni-section").hidden = false;
    }
  });
