const modalBtn = document.querySelector(".modal-btn");
const modalCloseBtn = document.querySelector(".modal-close");
const bodyOverlay = document.querySelector(".body-overlay");
const modal = document.querySelector("[data-modal='add']");

function openModal() {
  modal.classList.add("is-visible");
  bodyOverlay.classList.add("is-overlayed");
}

export function closeModal() {
  modal.classList.remove("is-visible");
  bodyOverlay.classList.remove("is-overlayed");
}

modalBtn.addEventListener("click", () => {
  openModal();
  modal.querySelector(".modal-close").addEventListener("click", () => {
    closeModal();
  });
});
