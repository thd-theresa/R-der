// Sophie
// Selects navigation items and defines an offset for smooth scrolling behavior
const navItems = document.querySelectorAll(".nav-item");
const offset = 50;

// Adds click event listeners to navigation items for smooth scrolling and menu closure
navItems.forEach(item => {
    item.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = item.getAttribute("data-target");
        const targetElement = document.getElementById(targetId);

        // Scrolls smoothly to the target element with a specified offset
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: "smooth"
            });
        }
        closeMenu(); // Closes the navigation menu
    });
});

// References to elements involved in opening and closing the menu
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const menuOverlay = document.getElementById("menu-overlay");

const closeMenuButton = document.getElementById("close-menu");



// Function to open the menu by adding active classes
const openMenu = () => {
    menu.classList.add("active");
    menuOverlay.classList.add("active");
};

// Function to close the menu by removing active classes
const closeMenu = () => {
    menu.classList.remove("active");
    menuOverlay.classList.remove("active");
};

// Attaches event listeners to handle menu open/close interactions
hamburger?.addEventListener("click", openMenu);
closeMenuButton?.addEventListener("click", closeMenu);
menuOverlay?.addEventListener("click", closeMenu);

// Adjusts navigation bar style based on scroll position
const adjustNavOnScroll = () => {
    const navElements = document.querySelectorAll("#topnav, #big, #small");
    navElements.forEach(nav => {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });
};

// Adds a scroll event listener to dynamically adjust navigation styles
window.addEventListener("scroll", adjustNavOnScroll);



/*Hannah
start reservation process by clicking on button and show reservation form*/
const reserveButton = document.getElementById("reserveButton");
if (reserveButton) {
    reserveButton.addEventListener("click", change);
}

function change() {
    const reservationStart = document.getElementById("reservationStart");
    const reservationDataCustomer = document.getElementById("reservationDataCustomer");

    if (!reservationStart || !reservationDataCustomer) {
        return;
    }

	reservationStart.style.display = "none";
	reservationDataCustomer.style.display = "block";
}


/* Manuel
send Reservation*/
const reservationForm = document.getElementById("reservationForm");
if (reservationForm) {
    reservationForm.addEventListener("submit", sendSwitch);
}

function sendSwitch(event){
	event.preventDefault();
    const reservationDataCustomer = document.getElementById("reservationDataCustomer");
    const successfulReservation = document.getElementById("successfulReservation");
    const reservationsSection = document.getElementById("nav-reservations");

    if (!reservationDataCustomer || !successfulReservation || !reservationsSection) {
        return;
    }

	reservationDataCustomer.style.display = "none";
	successfulReservation.style.display = "block";
	reservationsSection.scrollIntoView({ behavior: 'smooth' });
}

/* Kontaktformular */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const emailInput = document.getElementById("email");
        const replyToInput = document.getElementById("contact_replyto");
        if (emailInput && replyToInput) {
            const emailValue = emailInput.value.trim();
            if (emailValue) {
                replyToInput.value = emailValue;
            }
        }

        const formData = new FormData(contactForm);

        let ajaxEndpoint = contactForm.action;
        try {
            const actionUrl = new URL(contactForm.action, window.location.href);
            if (actionUrl.hostname === "formsubmit.co" && !actionUrl.pathname.startsWith("/ajax/")) {
                actionUrl.pathname = `/ajax${actionUrl.pathname}`;
            }
            ajaxEndpoint = actionUrl.toString();
        } catch (_) {
            ajaxEndpoint = contactForm.action;
        }

        try {
            const response = await fetch(ajaxEndpoint, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Senden fehlgeschlagen: HTTP ${response.status}`);
            }

            contactForm.reset();
            const contactStart = document.getElementById("contactStart");
            const contactSuccess = document.getElementById("contactSuccess");
            const contactSection = document.getElementById("nav-reservations");

            if (contactStart && contactSuccess) {
                contactStart.style.display = "none";
                contactSuccess.style.display = "block";
            }
            contactSection?.scrollIntoView({ behavior: "smooth" });
        } catch (error) {
            alert(error.message || "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.");
        }
    });
}


/*GALERIE - Hannah*/
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("galleryTrack");
  const prevBtn = document.getElementById("galleryPrev");
  const nextBtn = document.getElementById("galleryNext");

  if (!track || !prevBtn || !nextBtn) return;

  const images = track.querySelectorAll(".gallery-image");
  let currentIndex = 0;

  function getVisibleCount() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
  }

  function getStep() {
    const imageWidth = images[0].getBoundingClientRect().width;
    const gap = 16;
    return imageWidth + gap;
  }

  function updateButtons() {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(images.length - visibleCount, 0);

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;

    prevBtn.style.opacity = prevBtn.disabled ? "0.4" : "1";
    nextBtn.style.opacity = nextBtn.disabled ? "0.4" : "1";
    prevBtn.style.pointerEvents = prevBtn.disabled ? "none" : "auto";
    nextBtn.style.pointerEvents = nextBtn.disabled ? "none" : "auto";
  }

  function updateTrack() {
    const step = getStep();
    track.style.transform = `translateX(-${currentIndex * step}px)`;
    updateButtons();
  }

  prevBtn.addEventListener("click", function () {
    const visibleCount = getVisibleCount();
    currentIndex = Math.max(currentIndex - visibleCount, 0);
    updateTrack();
  });

  nextBtn.addEventListener("click", function () {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(images.length - visibleCount, 0);
    currentIndex = Math.min(currentIndex + visibleCount, maxIndex);
    updateTrack();
  });

  window.addEventListener("resize", function () {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(images.length - visibleCount, 0);
    currentIndex = Math.min(currentIndex, maxIndex);
    updateTrack();
  });

  updateTrack();
});
