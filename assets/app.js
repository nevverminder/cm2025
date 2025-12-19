// CM2025 v1.2 — Reference Price (AJAX)
// Observation only · Non-binding

document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/cm2025price.jsp", { cache: "no-store" })
    .then(r => r.json())
    .then(d => {
      if (typeof d.price !== "number") return;
      const el = document.getElementById("cm2025-price");
      if (!el) return;
      el.textContent = "$" + d.price.toFixed(4);
    })
    .catch(() => {});
});
