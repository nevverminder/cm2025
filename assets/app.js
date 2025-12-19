// CM2025 v1.2 — Reference Price (AJAX)
// Observation only · Non-binding · Path-agnostic

document.addEventListener("DOMContentLoaded", () => {
  // Path-agnostic CN detection:
  // works for /cn/, /site/cn/, /foo/bar/cn/index.html
  const isCN = /\/cn(\/|$)/.test(location.pathname);

  const apiUrl = isCN
    ? "../api/cm2025price.jsp"
    : "api/cm2025price.jsp";

  fetch(apiUrl, { cache: "no-store" })
    .then(r => r.json())
    .then(d => {
      if (typeof d.price !== "number") return;
      const el = document.getElementById("cm2025-price");
      if (!el) return;
      el.textContent = "$" + d.price.toFixed(4);
    })
    .catch(() => {});
});
