export function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Smoothly scroll to a section ID, accounting for sticky navbar height.
export function smoothScrollTo(id: string, offset = 64) {
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  // Update the URL fragment without triggering the browser's default jump
  history.replaceState(null, "", `#${id}`);

  window.scrollTo({ top, behavior: "smooth" });
}

  