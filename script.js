/**
 * ==============================================================================
 * RADHIKA SINGH - PORTFOLIO INTERACTION SCRIPT
 * Vanilla JavaScript (No external frameworks or libraries needed)
 * 
 * Features:
 * 1. Animated Dynamic Typing Effect in Hero
 * 2. Sticky Glassmorphism Navbar with Scroll Shadow
 * 3. Mobile Hamburger Menu Toggle & Auto-Close
 * 4. Active Navigation Item Highlighting on Scroll
 * 5. Smooth Scroll Navigation
 * 6. Interactive Category Filter for Projects
 * 7. Intersection Observer for Scroll Reveal Animations
 * 8. Back to Top Floating Button
 * 9. Frontend Contact Form Validation & Direct Mailto Dispatcher
 * 10. One-Click Copy Email to Clipboard
 * 11. Interactive Modal for Certificate Previews & Project Demos
 * 12. Dynamic Copyright Year
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================================
  // 1. ANIMATED TYPING EFFECT IN HERO SECTION
  // EDIT HERE: You can add, change, or remove rotating titles in the phrases array!
  // ============================================================================
  const typedTextElement = document.getElementById('typedText');
  const phrases = [
    'AI & Machine Learning',
    'Intelligent Algorithms',
    'Creative UI / UX Design',
    'Data-Driven Solutions',
    'Modern Web Engineering'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typedTextElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Faster backspacing
    } else {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110; // Regular typing speed
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end of word
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      // Move to next word
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 450;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  // Start typing loop
  setTimeout(typeEffect, 600);


  // ============================================================================
  // 2. STICKY NAVBAR & SCROLL SHADOW
  // ============================================================================
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Toggle navbar shadow when scrolled
    if (navbar) {
      if (scrollPos > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Toggle Back to Top button visibility
    if (backToTopBtn) {
      if (scrollPos > 380) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Back to top click event
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  // ============================================================================
  // 3. MOBILE MENU TOGGLE & ACCESSIBILITY
  // ============================================================================
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile drawer when a navigation link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close when clicking outside of the navbar
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }


  // ============================================================================
  // 4. ACTIVE NAVIGATION LINK ON SCROLL (INTERSECTION OBSERVER)
  // ============================================================================
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);


  // ============================================================================
  // 5. PROJECT CATEGORY FILTERING (ALL, AI/ML, WEB, TOOLS)
  // ============================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === cardCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });


  // ============================================================================
  // 6. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // ============================================================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Animate once
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers without IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
  }


  // ============================================================================
  // 7. COPY EMAIL TO CLIPBOARD
  // ============================================================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailText = 'radhikasingh6627@gmail.com';

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailText).then(() => {
        const tooltip = copyEmailBtn.querySelector('.copy-tooltip');
        const originalText = tooltip ? tooltip.textContent : 'Copy';
        
        if (tooltip) tooltip.textContent = 'Copied!';
        copyEmailBtn.style.color = '#22C55E';

        setTimeout(() => {
          if (tooltip) tooltip.textContent = originalText;
          copyEmailBtn.style.color = '';
        }, 2200);
      }).catch(err => {
        console.error('Failed to copy email:', err);
      });
    });
  }


  // ============================================================================
  // 8. INTERACTIVE MODAL FOR CERTIFICATES & DEMO PREVIEWS
  // ============================================================================
  const infoModal = document.getElementById('infoModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  function openModal(title, htmlContent) {
    if (!infoModal) return;
    modalTitle.textContent = title;
    modalBody.innerHTML = htmlContent;
    infoModal.classList.add('active');
    infoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeModal() {
    if (!infoModal) return;
    infoModal.classList.remove('active');
    infoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeModal);
  if (infoModal) {
    infoModal.addEventListener('click', (e) => {
      if (e.target === infoModal) closeModal();
    });
  }

  // Bind certificate cards to modal for verification info
  const certTriggers = document.querySelectorAll('.cert-modal-trigger');
  certTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const certName = trigger.getAttribute('data-cert-name') || 'Certificate';
      const issuer = trigger.getAttribute('data-cert-issuer') || 'Issuing Authority';
      
      const content = `
        <p style="margin-bottom: 0.8rem;"><strong>Certificate:</strong> ${certName}</p>
        <p style="margin-bottom: 0.8rem;"><strong>Issued By:</strong> ${issuer}</p>
        <div style="background: #F8F5FF; padding: 1rem; border-radius: 12px; border: 1px solid #E9DFFF; font-size: 0.9rem;">
          <p><i class="fa-solid fa-circle-info" style="color: #9670D4; margin-right: 6px;"></i> <strong>Note for Radhika:</strong> To attach your actual certificate PDF or credential URL, edit the <code>href</code> in <code>index.html</code> on this card to point directly to your file (e.g. <code>certificates/ml_cert.pdf</code>) or your Coursera/Google credential verification URL.</p>
        </div>
      `;
      openModal('Credential Details', content);
    });
  });

  // Bind live demo buttons
  const demoTriggers = document.querySelectorAll('.demo-trigger');
  demoTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const content = `
        <p style="margin-bottom: 0.8rem;">This project live preview is currently configured as an interactive placeholder.</p>
        <div style="background: #F8F5FF; padding: 1rem; border-radius: 12px; border: 1px solid #E9DFFF; font-size: 0.9rem;">
          <p><i class="fa-solid fa-code" style="color: #9670D4; margin-right: 6px;"></i> <strong>How to link your deployed app:</strong> When you deploy your project on GitHub Pages, Vercel, or Streamlit, simply replace the <code>href="#contact"</code> attribute in <code>index.html</code> with your live URL (e.g. <code>href="https://your-demo-link.com" target="_blank"</code>).</p>
        </div>
      `;
      openModal('Live Demo Preview', content);
    });
  });


  // ============================================================================
  // 9. CONTACT FORM VALIDATION & DIRECT MAILTO DISPATCHER
  // (Ensures honest frontend validation without claiming false backend delivery)
  // ============================================================================
  const contactForm = document.getElementById('contactForm');
  const formResponse = document.getElementById('formResponse');
  const directMailtoLink = document.getElementById('directMailtoLink');
  const resetFormBtn = document.getElementById('resetFormBtn');

  // Input fields
  const userName = document.getElementById('userName');
  const userEmail = document.getElementById('userEmail');
  const userSubject = document.getElementById('userSubject');
  const userMessage = document.getElementById('userMessage');

  // Error spans
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  // Validation regex for email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateInput(input, errorElement, condition) {
    if (!condition) {
      input.classList.add('is-invalid');
      if (errorElement) errorElement.classList.add('visible');
      return false;
    } else {
      input.classList.remove('is-invalid');
      if (errorElement) errorElement.classList.remove('visible');
      return true;
    }
  }

  // Real-time input clearing
  if (userName) userName.addEventListener('input', () => validateInput(userName, nameError, userName.value.trim().length >= 2));
  if (userEmail) userEmail.addEventListener('input', () => validateInput(userEmail, emailError, emailRegex.test(userEmail.value.trim())));
  if (userSubject) userSubject.addEventListener('input', () => validateInput(userSubject, subjectError, userSubject.value.trim().length > 0));
  if (userMessage) userMessage.addEventListener('input', () => validateInput(userMessage, messageError, userMessage.value.trim().length >= 10));

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateInput(userName, nameError, userName.value.trim().length >= 2);
      const isEmailValid = validateInput(userEmail, emailError, emailRegex.test(userEmail.value.trim()));
      const isSubjectValid = validateInput(userSubject, subjectError, userSubject.value.trim().length > 0);
      const isMessageValid = validateInput(userMessage, messageError, userMessage.value.trim().length >= 10);

      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Construct mailto link with encoded subject and body
        const subjectEnc = encodeURIComponent(`[Portfolio Inquiry] ${userSubject.value.trim()} - from ${userName.value.trim()}`);
        const bodyEnc = encodeURIComponent(
          `Hi Radhika,\n\n${userMessage.value.trim()}\n\n---\nSender Details:\nName: ${userName.value.trim()}\nEmail: ${userEmail.value.trim()}`
        );
        const mailtoUrl = `mailto:radhikasingh6627@gmail.com?subject=${subjectEnc}&body=${bodyEnc}`;

        // Update direct mailto button
        if (directMailtoLink) {
          directMailtoLink.setAttribute('href', mailtoUrl);
        }

        // Show formatted confirmation
        contactForm.style.display = 'none';
        if (formResponse) {
          formResponse.style.display = 'block';
        }

        // Optional: attempt automatic mailto trigger
        // window.location.href = mailtoUrl;
      }
    });
  }

  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', () => {
      contactForm.reset();
      contactForm.style.display = 'flex';
      if (formResponse) formResponse.style.display = 'none';
    });
  }


  // ============================================================================
  // 10. DYNAMIC COPYRIGHT YEAR
  // Automatically keeps the footer year up-to-date
  // ============================================================================
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});


/* TECHNICAL SKILLS NETWORK */

const skills = [
    { name: "HTML", icon: "5", x: 50, y: 8 },
    { name: "CSS", icon: "3", x: 75, y: 15 },
    { name: "JavaScript", icon: "JS", x: 90, y: 38 },
    { name: "Java", icon: "J", x: 82, y: 70 },
    { name: "Python", icon: "Py", x: 65, y: 91 },
    { name: "MySQL", icon: "DB", x: 35, y: 91 },
    { name: "PostgreSQL", icon: "PG", x: 15, y: 72 },
    { name: "React.js", icon: "R", x: 8, y: 40 },
    { name: "AI / ML", icon: "AI", x: 25, y: 15 },
    { name: "RAG", icon: "RG", x: 35, y: 35 },
    { name: "Git", icon: "G", x: 68, y: 38 },
    { name: "GitHub", icon: "GH", x: 65, y: 62 },
    { name: "VS Code", icon: "VS", x: 35, y: 65 },
    { name: "DBMS", icon: "DB", x: 90, y: 88 }
];

const network = document.querySelector(".network-container");
const nodesContainer = document.querySelector(".skill-nodes");
const svg = document.querySelector(".network-lines");

if (network && nodesContainer && svg) {

    const center = { x: 50, y: 50 };

    skills.forEach((skill, index) => {

        // Create skill node
        const node = document.createElement("div");
        node.className = "skill-node";

        node.style.left = skill.x + "%";
        node.style.top = skill.y + "%";

        node.innerHTML = `
            <div class="skill-icon">${skill.icon}</div>
            <span class="skill-name">${skill.name}</span>
        `;

        nodesContainer.appendChild(node);

        // Connect skill to center
        const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );

        line.setAttribute("x1", center.x + "%");
        line.setAttribute("y1", center.y + "%");
        line.setAttribute("x2", skill.x + "%");
        line.setAttribute("y2", skill.y + "%");

        svg.appendChild(line);

        // Connect nearby nodes
        if (index > 0) {

            const previous = skills[index - 1];

            const extraLine = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "line"
            );

            extraLine.setAttribute("x1", previous.x + "%");
            extraLine.setAttribute("y1", previous.y + "%");
            extraLine.setAttribute("x2", skill.x + "%");
            extraLine.setAttribute("y2", skill.y + "%");

            svg.appendChild(extraLine);
        }
    });
}