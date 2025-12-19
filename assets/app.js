// CM2025 v1.2 — Reference Price fetch (AJAX)
// Read-only · Non-binding · Observation only

document.addEventListener("DOMContentLoaded", () => {
  fetchReferencePrice();
});

function fetchReferencePrice() {
  fetch("/api/cm2025price.jsp", {
    method: "GET",
    headers: { "Accept": "application/json" },
    cache: "no-store"
  })
    .then(res => {
      if (!res.ok) throw new Error("Network error");
      return res.json();
    })
    .then(data => {
      const price = data.price;
      if (typeof price !== "number") throw new Error("Invalid data");
      renderPrice(price);
    })
    .catch(err => {
      console.warn("CM2025 price fetch failed:", err);
      renderPrice("--");
    });
}

function renderPrice(price) {
  const el = document.getElementById("cm2025-price");
  if (!el) return;
  if (price === "--") {
    el.textContent = "--";
  } else {
    el.textContent = price.toFixed(6);
  }
}
