const body = document.body;
const preloader = document.getElementById("preloader");
const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const wppToggle = document.getElementById("wppToggle");
const wppMenu = document.getElementById("wppMenu");
const heroVideo = document.getElementById("heroVideo");

/* trava scroll no loading */
body.classList.add("no-scroll");

window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.classList.add("hide");
    body.classList.remove("no-scroll");
  }, 850);
});

/* navbar */
function handleNavbar() {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleNavbar);
handleNavbar();

/* menu mobile */
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

/* whatsapp expandível */
wppToggle.addEventListener("click", () => {
  wppMenu.classList.toggle("active");
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".wpp-float-wrap")) {
    wppMenu.classList.remove("active");
  }
});

/* reveal */
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.14,
  }
);

reveals.forEach((el) => revealObserver.observe(el));

/* filtro equipe */
const filterButtons = document.querySelectorAll(".filter-btn");
const teamCards = document.querySelectorAll(".team-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    teamCards.forEach((card) => {
      const sectors = card.dataset.sector;

      if (filter === "todos" || sectors.includes(filter)) {
        card.classList.remove("hidden-card");
      } else {
        card.classList.add("hidden-card");
      }
    });
  });
});

/* contadores */
const counters = document.querySelectorAll("[data-counter]");

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.counter);
      let current = 0;
      const increment = Math.max(1, Math.ceil(target / 60));

      const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
          element.textContent = target;
          clearInterval(timer);
        } else {
          element.textContent = current;
        }
      }, 24);

      observer.unobserve(element);
    });
  },
  { threshold: 0.7 }
);

counters.forEach((counter) => counterObserver.observe(counter));

/* parallax */
const parallaxItems = document.querySelectorAll(".parallax-layer");
let ticking = false;

function updateParallax() {
  const scrollY = window.scrollY;

  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.speed || 0.1);
    const offset = scrollY * speed;
    item.style.transform = `translate3d(0, ${offset}px, 0)`;
  });

  ticking = false;
}

function requestParallax() {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

window.addEventListener("scroll", requestParallax);
updateParallax();

/* cards 3D */
const card3dElements = document.querySelectorAll(".card-3d");

card3dElements.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    if (window.innerWidth < 821) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* fallback do vídeo */
if (heroVideo) {
  heroVideo.addEventListener("error", () => {
    heroVideo.style.display = "none";
  });

  heroVideo.addEventListener("loadeddata", () => {
    heroVideo.style.opacity = "1";
  });
}