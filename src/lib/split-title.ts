import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

/** Splits a heading into chars for a per-character reveal timeline. */
export function splitTitleChars(title: HTMLElement) {
  return new SplitText(title, { type: "chars,words" }).chars;
}
