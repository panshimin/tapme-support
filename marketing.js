// A deliberately small illustration of a single merge, not a playable game.
const board = document.querySelector("#demo-board");
const tap = document.querySelector("#demo-tap");
const reset = document.querySelector("#demo-reset");
const status = document.querySelector("#demo-status");
const initialLabel = tap.getAttribute("aria-label");
let stageTimer;
let mergeTimer;

tap.addEventListener("click", () => {
  if (tap.getAttribute("aria-disabled") === "true") return;
  tap.setAttribute("aria-disabled", "true");
  tap.textContent = "5";
  board.classList.add("matched");
  status.textContent = status.dataset.matching;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  stageTimer = setTimeout(() => board.classList.add("merging"), reduced ? 0 : 500);
  mergeTimer = setTimeout(() => {
    board.classList.add("merged");
    tap.textContent = "6";
    tap.setAttribute("aria-label", status.dataset.result);
    status.textContent = status.dataset.result;
    reset.hidden = false;
  }, reduced ? 0 : 1000);
});

reset.addEventListener("click", () => {
  clearTimeout(stageTimer);
  clearTimeout(mergeTimer);
  board.classList.remove("matched", "merging", "merged");
  tap.innerHTML = '4<span class="tap-indicator" aria-hidden="true">+</span>';
  tap.removeAttribute("aria-disabled");
  tap.setAttribute("aria-label", initialLabel);
  status.textContent = status.dataset.initial;
  reset.hidden = true;
  tap.focus();
});
