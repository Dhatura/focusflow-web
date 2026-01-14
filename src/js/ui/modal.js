function getModalByName(modalName) {
  return document.querySelector(`[data-modal="${modalName}"]`);
}

function openModal(modal) {
  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-modal-open");
}

function closeModal(modal) {
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");

  const anyOpened = document.querySelector("[data-modal]:not([hidden])");
  if (!anyOpened) document.body.classList.remove("is-modal-open");
}

export function initModals() {
  document.addEventListener("click", (evt) => {
    const openBtn = evt.target.closest("[data-modal-open]");
    if (openBtn) {
      const modalName = openBtn.dataset.modalOpen;
      const modal = getModalByName(modalName);
      openBtn.blur();
      if (modal) openModal(modal);
      return;
    }

    const closeBtn = evt.target.closest("[data-modal-close]");
    if (closeBtn) {
      const modal = closeBtn.closest("[data-modal]");
      closeBtn.blur();
      if (modal) closeModal(modal);
      return;
    }

    const overlay = evt.target.closest("[data-modal-overlay]");
    if (overlay) {
      const modal = overlay.closest("[data-modal]");
      if (modal) closeModal(modal);
      return;
    }
  });

  document.addEventListener("keydown", (evt) => {
    if (evt.key !== "Escape") return;

    const openedModal = document.querySelector("[data-modal]:not([hidden])");
    if (openedModal) closeModal(openedModal);
  });
}
