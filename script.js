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
    ".projects-section, .services-section, .testimonials-section, .process-section, .articles-section, .contact-section, #about"
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

  // Contact form with enhanced feedback
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      feedback.textContent = "";
      feedback.style.color = "var(--accent)";

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

      // Simulate send with loading animation
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";

      feedback.textContent = "Sending message...";

      setTimeout(() => {
        feedback.textContent = "Thanks — your message was sent successfully!";
        feedback.style.color = "#51cf66";
        form.reset();

        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";

        // Add celebration effect
        const confetti = document.createElement("div");
        confetti.style.position = "fixed";
        confetti.style.top = "50%";
        confetti.style.left = "50%";
        confetti.style.transform = "translate(-50%, -50%)";
        confetti.style.fontSize = "3rem";
        confetti.style.zIndex = "1000";
        confetti.textContent = "🎉";
        confetti.style.animation = "bounce 1s ease";

        document.body.appendChild(confetti);

        setTimeout(() => {
          confetti.style.animation = "fadeOut 0.5s ease forwards";
          setTimeout(() => confetti.remove(), 500);
        }, 1000);
      }, 1500);
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

  // Typewriter effect for hero text (REMOVED TO FIX ISSUE)
  // The hero title now displays normally with CSS animations
});
