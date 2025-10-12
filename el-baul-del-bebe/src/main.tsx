// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ---- Anti-jump guard: stop empty/same-hash navigations globally
document.addEventListener("click", (ev) => {
  const target = ev.target as HTMLElement | null;
  const a = target?.closest("a") as HTMLAnchorElement | null;
  if (!a) return;

  const raw = (a.getAttribute("href") || "").trim();
  if (!raw || raw === "#") {
    ev.preventDefault();
    return;
  }

  // If it's a same-page hash link and equals the current hash, prevent re-target jump
  if (raw.startsWith("#") && raw === window.location.hash) {
    ev.preventDefault();
    return;
  }
});
