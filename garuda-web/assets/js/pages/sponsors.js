/* Sponsors: the enquiry form opens WhatsApp with everything filled in,
   and the "Enquire about ..." links pre-select their tier in the form. */

const WHATSAPP_NUMBER = "919980143550"; // +91 99801 43550

// "Save the sponsor sheet": the sheet is still being written, so say so for now.
// When it is ready, swap the alert for window.print() (the print styles in sponsors.css are kept).
document.querySelectorAll("[data-print-sheet]").forEach((btn) =>
  btn.addEventListener("click", () => alert("The sponsor sheet is a work in progress. For now, use the enquiry form or email garuda@rvce.edu.in and we'll send the details."))
);

const form = document.getElementById("sponsor-form");
const tierSelect = document.getElementById("contact-tier");

// Clicking a tier's link jumps to the form with that tier already chosen
document.querySelectorAll("[data-tier]").forEach((link) => {
  link.addEventListener("click", () => {
    tierSelect.value = link.dataset.tier;
    tierSelect.classList.add("is-prefilled");
    setTimeout(() => document.getElementById("contact-name").focus({ preventScroll: true }), 600);
  });
});
tierSelect.addEventListener("change", () => tierSelect.classList.remove("is-prefilled"));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const line = (label, key) => {
    const value = (data.get(key) || "").toString().trim();
    return value ? `${label}: ${value}` : null;
  };
  const message = [
    "Hi Project Garuda, I'd like to talk about sponsoring the team.",
    "",
    line("Name", "name"),
    line("Position", "role"),
    line("Organization", "organization"),
    line("Email", "email"),
    line("Interested in", "tier"),
    "",
    line("What we're trying to achieve", "message"),
  ]
    .filter((l) => l !== null)
    .join("\n");

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});
