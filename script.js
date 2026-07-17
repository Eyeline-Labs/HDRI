const header = document.querySelector("[data-header]");

const updateHeader = () => {
  header?.classList.toggle("scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const citationButton = document.querySelector("[data-copy-citation]");
const citation = document.querySelector(".citation-block code")?.textContent?.trim();

citationButton?.addEventListener("click", async () => {
  if (!citation) return;

  try {
    await navigator.clipboard.writeText(citation);
    citationButton.textContent = "Copied";
    window.setTimeout(() => {
      citationButton.textContent = "Copy BibTeX";
    }, 1800);
  } catch {
    citationButton.textContent = "Select and copy";
  }
});
