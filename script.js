// Enhanced interactions with motion effects
document.addEventListener("DOMContentLoaded", function () {
  // Year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Loading animation
  const loadingBar = document.createElement("div");
  loadingBar.className = "loading-bar";
  document.body.appendChild(loadingBar);

  // Simulate loading progress
  let progress = 0;
  const loadingInterval = setInterval(() => {
    progress += Math.random() * 10;
    loadingBar.style.width = `${Math.min(progress, 100)}%`;

    if (progress >= 100) {
      clearInterval(loadingInterval);
      setTimeout(() => {
        loadingBar.style.opacity = "0";
        setTimeout(() => loadingBar.remove(), 300);
      }, 200);
    }
  }, 100);

  // Create cursor follower
  const cursorFollower = document.createElement("div");
  cursorFollower.className = "cursor-follower";
  document.body.appendChild(cursorFollower);

  let mouseX = 0,
    mouseY = 0;
  let followerX = 0,
    followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    followerX += (mouseX - followerX - 10) * 0.12;
    followerY += (mouseY - followerY - 10) * 0.12;

    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Create particle background
  const particlesContainer = document.createElement("div");
  particlesContainer.className = "particles";
  document.body.appendChild(particlesContainer);

  function createParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";

    const size = Math.random() * 2 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 30 + 30;
    const delay = Math.random() * 10;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}vw`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.opacity = Math.random() * 0.3 + 0.05;

    particlesContainer.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, (duration + delay) * 1000);
  }

  // Create initial particles
  for (let i = 0; i < 15; i++) {
    setTimeout(createParticle, i * 500);
  }

  // Continue creating particles
  setInterval(createParticle, 1000);

  // Scroll animations with disappearing effects
  const observerOptions = {
    threshold: 0.18,
    rootMargin: "0px 0px -120px 0px",
  };

  // Sections to observe
  const sections = document.querySelectorAll(
    ".projects-section, .services-section, .experience-section, .process-section, .contact-section, #about, .certificates-section"
  );

  sections.forEach((section) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Section is in view
          entry.target.classList.remove("hidden");

          // Animate children based on section type
          if (entry.target.classList.contains("projects-section")) {
            const projectCards = entry.target.querySelectorAll(".project-card");
            const sectionHead = entry.target.querySelector(".section-head");

            if (sectionHead) sectionHead.classList.remove("hidden");

            projectCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.remove("hidden");
              }, index * 120);
            });
          } else if (entry.target.classList.contains("services-section")) {
            const serviceCards = entry.target.querySelectorAll(".service-card");
            serviceCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.remove("hidden");
              }, index * 90);
            });
          } else if (entry.target.id === "about") {
            const stats = entry.target.querySelectorAll(".about-stats li");
            const cvItems = entry.target.querySelectorAll(".cv-item");

            stats.forEach((stat, index) => {
              setTimeout(() => {
                stat.classList.remove("hidden");
              }, index * 180);
            });

            cvItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.remove("hidden");
              }, index * 110);
            });
          }
        } else {
          // Section is out of view
          entry.target.classList.add("hidden");

          // Hide children
          if (entry.target.classList.contains("projects-section")) {
            const projectCards = entry.target.querySelectorAll(".project-card");
            const sectionHead = entry.target.querySelector(".section-head");

            if (sectionHead) sectionHead.classList.add("hidden");

            projectCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("hidden");
              }, index * 80);
            });
          } else if (entry.target.classList.contains("services-section")) {
            const serviceCards = entry.target.querySelectorAll(".service-card");
            serviceCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("hidden");
              }, index * 80);
            });
          } else if (entry.target.id === "about") {
            const stats = entry.target.querySelectorAll(".about-stats li");
            const cvItems = entry.target.querySelectorAll(".cv-item");

            stats.forEach((stat, index) => {
              setTimeout(() => {
                stat.classList.add("hidden");
              }, index * 120);
            });

            cvItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("hidden");
              }, index * 80);
            });
          }
        }
      });
    }, observerOptions);

    observer.observe(section);
  });

  // Header scroll effect
  let lastScrollY = window.scrollY;
  const header = document.querySelector(".site-header");

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.classList.add("hidden");
    } else {
      header.classList.remove("hidden");
    }

    lastScrollY = currentScrollY;
  });

  // Mobile menu
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      const expanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", String(!expanded));

      if (navLinks.style.display === "flex") {
        navLinks.style.display = "";
        navLinks.style.animation = "slideUp 0.3s ease";
      } else {
        navLinks.style.display = "flex";
        navLinks.style.flexDirection = "column";
        navLinks.style.animation = "slideDown 0.3s ease";
      }
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav") && navLinks.style.display === "flex") {
      navLinks.style.display = "";
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Accordion
  document.querySelectorAll(".acc-toggle").forEach((btn) => {
    btn.addEventListener("click", function () {
      const expanded = this.getAttribute("aria-expanded") === "true";

      // Close all other accordions
      document.querySelectorAll(".acc-toggle").forEach((b) => {
        if (b !== this) {
          b.setAttribute("aria-expanded", "false");
          const otherPanel = b.nextElementSibling;
          if (otherPanel) {
            otherPanel.style.display = "none";
            otherPanel.style.animation = "slideUp 0.3s ease";
          }
        }
      });

      if (!expanded) {
        this.setAttribute("aria-expanded", "true");
        const panel = this.nextElementSibling;
        if (panel) {
          panel.style.display = "block";
          panel.style.animation = "slideDown 0.3s ease";
        }
      } else {
        this.setAttribute("aria-expanded", "false");
        const panel = this.nextElementSibling;
        if (panel) {
          panel.style.animation = "slideUp 0.3s ease";
          setTimeout(() => {
            panel.style.display = "none";
          }, 300);
        }
      }
    });
  });

  // Contact form: open the visitor's email client instead of showing a fake success state
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      feedback.textContent = "";

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        feedback.textContent = "Please fill all fields.";
        feedback.style.color = "#ff6b6b";
        feedback.style.animation = "shake 0.5s ease";
        setTimeout(() => (feedback.style.animation = ""), 500);
        return;
      }

      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      feedback.textContent = "Opening your email app…";
      feedback.style.color = "var(--accent)";
      window.location.href = `mailto:AhmedShAlhadad1@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // Add animations for form errors
  const style = document.createElement("style");
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    
    @keyframes bounce {
      0%, 100% { transform: translate(-50%, -50%) scale(1); }
      50% { transform: translate(-50%, -50%) scale(1.2); }
    }
    
    @keyframes fadeOut {
      to { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
    }
  `;
  document.head.appendChild(style);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight =
          document.querySelector(".site-header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (navLinks.style.display === "flex") {
          navLinks.style.display = "";
          menuBtn.setAttribute("aria-expanded", "false");
        }
      }
    });
  });



  // Project details modal
  const projectDetails = {
    natours: {
      title: "Natours — Tour Booking Platform",
      date: "Sep 2026",
      type: "Node.js Backend",
      image: "assets/natours-cover.png",
      summary: "A full-featured tour booking backend covering tours, users, reviews, authentication, bookings, payments, image processing, email workflows, and advanced API operations.",
      highlights: [
        "Built RESTful APIs with Node.js, Express.js, MongoDB, and Mongoose for tours, users, reviews, authentication, and booking workflows.",
        "Implemented JWT authentication, role-based authorization, password reset, data validation, protected routes, and centralized error handling.",
        "Added filtering, sorting, pagination, aggregation pipelines, database indexing, and geospatial queries.",
        "Implemented Multer + Sharp image processing, Nodemailer/Pug email workflows, Stripe Checkout, and webhook verification."
      ],
      tech: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Stripe", "Sharp"],
      links: [
        ["GitHub", "https://github.com/Ahmed-Sheref/natours", "fab fa-github"],
        ["Live Demo", "https://natours-coral-tau.vercel.app/", "fas fa-arrow-up-right-from-square"],
        ["Backend", "https://natours-ssy8.onrender.com", "fas fa-server"]
      ]
    },
    ticktick: {
      title: "TickTick Extension",
      date: "Jan – Mar 2026",
      type: "Chrome Extension + Backend",
      image: "assets/ticktick-cover.jpg",
      summary: "A Chrome extension and backend system for saving articles, generating AI summaries, organizing content, and turning saved knowledge into something useful. Currently used by 320 users.",
      highlights: [
        "Built a Chrome extension workflow for saving web content and keeping it organized inside the product.",
        "Integrated AI summaries, smart tags, and quiz generation to help users retain what they save.",
        "Connected the backend with MongoDB, authentication, and automated workflows for saved content and reminders.",
        "Published the extension to the Chrome Web Store, where it is currently used by 320 users."
      ],
      tech: ["Chrome Extension", "Node.js", "Express.js", "MongoDB", "Groq API", "OAuth2"],
      links: [["GitHub", "https://github.com/Ahmed-Sheref/TickTick_Extension", "fab fa-github"], ["Chrome Store", "https://chromewebstore.google.com/detail/akdjbmlbghlajjfjoijoagmilnllfmoe?utm_source=item-share-cb", "fas fa-store"]]
    },
    insurance: {
      title: "Car Insurance System",
      date: "Jan 2026",
      type: "Backend + SQL Server",
      image: "assets/car-insurance-cover.png",
      summary: "A modular backend system for insurance operations, including customers, vehicles, policies, accident reports, claims, and payment workflows.",
      highlights: [
        "Designed RESTful APIs for core insurance workflows and relational data operations.",
        "Implemented JWT authentication, role-based authorization, Google OAuth, validation, file uploads, and centralized error handling.",
        "Integrated SQL Server for relational application data.",
        "Documented backend endpoints with Swagger/OpenAPI."
      ],
      tech: ["Node.js", "Express.js", "SQL Server", "JWT", "Google OAuth", "Swagger/OpenAPI"],
      links: [["GitHub", "https://github.com/Ahmed-Sheref/Car-Insurance-System-BackEnd_Node.js", "fab fa-github"]]
    },
    restaurant: {
      title: "Restaurant Ordering System",
      date: "Oct 2025",
      type: "Java + Design Patterns",
      image: "assets/restaurant-cover.jpg",
      summary: "A console-based restaurant ordering system built with Java and object-oriented programming principles, structured for extensibility through reusable design patterns.",
      highlights: [
        "Created extensible modules for menus, discounts, payment methods, and order workflows.",
        "Applied object-oriented design to keep responsibilities separated and maintainable.",
        "Used software design patterns including Facade, Strategy, Observer, and Decorator in the project structure."
      ],
      tech: ["Java", "OOP", "Facade", "Strategy", "Observer", "Decorator"],
      links: [["GitHub", "https://github.com/Ahmed-Sheref/Restaurant-App", "fab fa-github"]]
    }
  };

  const projectModal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("projectModalTitle");
  const modalImage = document.getElementById("projectModalImage");
  const modalDate = document.getElementById("projectModalDate");
  const modalType = document.getElementById("projectModalType");
  const modalSummary = document.getElementById("projectModalSummary");
  const modalHighlights = document.getElementById("projectModalHighlights");
  const modalTech = document.getElementById("projectModalTech");
  const modalLinks = document.getElementById("projectModalLinks");
  let lastModalTrigger = null;

  function openProjectModal(key, trigger) {
    const project = projectDetails[key];
    if (!project || !projectModal) return;
    lastModalTrigger = trigger || null;
    modalTitle.textContent = project.title;
    modalImage.src = project.image;
    modalImage.alt = `${project.title} project cover`;
    modalDate.textContent = project.date;
    modalType.textContent = project.type;
    modalSummary.textContent = project.summary;
    modalHighlights.innerHTML = project.highlights.map((item) => `<li>${item}</li>`).join("");
    modalTech.innerHTML = project.tech.map((item) => `<span>${item}</span>`).join("");
    modalLinks.innerHTML = project.links.map(([label, href, icon], index) =>
      `<a class="btn ${index === 0 ? "ghost" : ""}" href="${href}" target="_blank" rel="noopener"><i class="${icon}"></i> ${label}</a>`
    ).join("");
    projectModal.classList.add("is-open");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    projectModal.querySelector(".project-modal-close")?.focus();
  }

  function closeProjectModal() {
    if (!projectModal?.classList.contains("is-open")) return;
    projectModal.classList.remove("is-open");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    lastModalTrigger?.focus();
  }

  document.querySelectorAll(".project-details-btn").forEach((button) => {
    button.addEventListener("click", () => openProjectModal(button.dataset.project, button));
  });
  projectModal?.querySelectorAll("[data-modal-close]").forEach((el) => el.addEventListener("click", closeProjectModal));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeProjectModal();
  });

  // Typewriter effect for hero text (REMOVED TO FIX ISSUE)
  // The hero title now displays normally with CSS animations
});