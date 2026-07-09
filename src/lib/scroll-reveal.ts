import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealSectionOptions {
  containerSelector: string;
  rowSelector?: string;
  rowStagger?: number;
  rowStart?: string;
  rowEnd?: string;
}

/** Fades a section's container in on scroll, then reveals its rows with a stagger. */
export function revealSection({
  containerSelector,
  rowSelector,
  rowStagger = 0.08,
  rowStart = "top 80%",
  rowEnd = "top 30%",
}: RevealSectionOptions) {
  const container = document.querySelector<HTMLElement>(containerSelector);
  if (!container) return;

  gsap.fromTo(
    container,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: container,
        start: "top 90%",
        end: "top 50%",
        scrub: true,
      },
    },
  );

  if (!rowSelector) return;

  const rows = gsap.utils.toArray<HTMLElement>(rowSelector);
  if (!rows.length) return;

  gsap.fromTo(
    rows,
    { opacity: 0, x: 24 },
    {
      opacity: 1,
      x: 0,
      stagger: rowStagger,
      scrollTrigger: {
        trigger: container,
        start: rowStart,
        end: rowEnd,
        scrub: true,
      },
    },
  );
}
