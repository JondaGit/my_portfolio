// ============================================
// COPY EMAIL
// ============================================
function wireCopyEmailButton(btn) {
  if (!btn) return;
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(btn.dataset.email).then(() => {
      btn.textContent = "copied!";
      btn.classList.add("copied");
      setTimeout(() => {
        btn.textContent = "copy";
        btn.classList.remove("copied");
      }, 2000);
    });
  });
}

wireCopyEmailButton(document.getElementById("copyEmailBtn"));
wireCopyEmailButton(document.getElementById("dialogCopyEmailBtn"));

// ============================================
// CONTACT DIALOG
// ============================================
const contactDialog = document.getElementById("contactDialog");
if (contactDialog) {
  const contactDialogClose = document.getElementById("contactDialogClose");

  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      contactDialog.showModal();
    });
  });

  contactDialogClose.addEventListener("click", () => contactDialog.close());

  contactDialog.addEventListener("click", (e) => {
    const rect = contactDialog.getBoundingClientRect();
    const inside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    if (!inside) contactDialog.close();
  });
}

// ============================================
// NAV SCROLL EFFECT
// ============================================
const navbar = document.getElementById("navbar");

window.addEventListener(
  "scroll",
  () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  },
  { passive: true },
);

// ============================================
// SCROLL TO TOP
// ============================================
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener(
  "scroll",
  () => {
    scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
  },
  { passive: true },
);

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ============================================
// TAG POPOVERS
// ============================================
document.querySelectorAll(".tag-more").forEach((btn) => {
  const popover = btn.nextElementSibling;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = !popover.hidden;
    // Close all others first
    document.querySelectorAll(".tag-popover").forEach((p) => {
      p.hidden = true;
    });
    document
      .querySelectorAll(".tag-more")
      .forEach((b) => b.setAttribute("aria-expanded", "false"));
    // Toggle this one
    popover.hidden = isOpen;
    btn.setAttribute("aria-expanded", String(!isOpen));
  });
});

document.addEventListener("click", () => {
  document.querySelectorAll(".tag-popover").forEach((p) => {
    p.hidden = true;
  });
  document
    .querySelectorAll(".tag-more")
    .forEach((b) => b.setAttribute("aria-expanded", "false"));
});

// ============================================
// LIGHTBOX
// ============================================
const lightbox = document.getElementById("lightbox");
if (lightbox) {
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");

  document.querySelectorAll(".screenshot-img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      const caption =
        img.closest("figure")?.querySelector(".screenshot-caption")
          ?.textContent ?? "";
      lightboxCaption.textContent = caption;
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
      lightboxClose.focus();
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open"))
      closeLightbox();
  });
}

// ============================================
// SMOOTH ANCHOR SCROLLING (offset for fixed nav)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 24;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});
