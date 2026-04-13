// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !isExpanded);
  navMenu.classList.toggle('active');
});

// Close menu when clicking a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (
    !navMenu.contains(e.target) &&
    !hamburger.contains(e.target) &&
    navMenu.classList.contains('active')
  ) {
    hamburger.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
  }
});

// New FAQ Toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const faqQuestions = document.querySelectorAll('.faq-question-new');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const isActive = question.classList.contains('active');
      const answer = question.nextElementSibling;
      
      // Close all other FAQ items
      faqQuestions.forEach(otherQuestion => {
        if (otherQuestion !== question) {
          otherQuestion.classList.remove('active');
          otherQuestion.nextElementSibling.classList.remove('open');
        }
      });
      
      // Toggle current FAQ item
      if (isActive) {
        question.classList.remove('active');
        answer.classList.remove('open');
      } else {
        question.classList.add('active');
        answer.classList.add('open');
      }
    });
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Service items hover effects
document.addEventListener('DOMContentLoaded', () => {
  const serviceItems = document.querySelectorAll('.service-item');
  
  serviceItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateY(0) scale(1)';
    });
  });
});

// Benefits cards animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const benefitCards = document.querySelectorAll('.benefit-card');
  const serviceItems = document.querySelectorAll('.service-item');
  
  [...benefitCards, ...serviceItems].forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
});

// Enhanced Contact Form
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalText = submitBtn.textContent;
      
      // Get form data
      const ime = document.getElementById('ime').value.trim();
      const email = document.getElementById('email').value.trim();
      const telefon = document.getElementById('telefon').value.trim();
      const poruka = document.getElementById('poruka').value.trim();
      
      // Validate required fields
      if (!ime || !poruka || (!email && !telefon)) {
        alert('Molimo unesite sva obavezna polja!');
        return;
      }
      
      // Animate button
      submitBtn.textContent = 'Šalje se...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      
      // Simulate form submission
      setTimeout(() => {
        submitBtn.textContent = 'Uspešno poslano! ✓';
        submitBtn.style.background = '#10b981';
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.innerHTML = '<p style="text-align: center; color: #10b981; font-weight: 600; margin-top: 1rem;">Hvala! Odgovorićemo vam u najkraćem roku.</p>';
        contactForm.appendChild(successMsg);
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          submitBtn.style.opacity = '';
          contactForm.reset();
          if (successMsg) successMsg.remove();
        }, 3000);
      }, 1500);
    });
  }
  
  // Set current year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Stats animation
document.addEventListener('DOMContentLoaded', () => {
  const statItems = document.querySelectorAll('.stat-number');

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const originalText = element.textContent.trim();

        // Extract number and suffix
        const match = originalText.match(/^(\d+)(.*)$/);
        if (!match) {
          return;
        }

        const targetValue = parseInt(match[1], 10);
        const suffix = match[2];

        let start = 0;
        const duration = 2000;
        const totalFrames = duration / 16;
        const increment = targetValue / totalFrames;

        const updateCount = () => {
          start += increment;
          if (start >= targetValue) {
            element.textContent = targetValue + suffix;
            return;
          }
          element.textContent = Math.ceil(start) + suffix;
          requestAnimationFrame(updateCount);
        };

        updateCount();
        statsObserver.unobserve(element);
      }
    });
  }, { threshold: 0.2 });

  statItems.forEach(item => {
    statsObserver.observe(item);
  });
});

// ========== HERO INTERACTIVE PARTICLES ==========
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('heroCanvas');
  const hero = document.getElementById('hero');
  const glow = document.getElementById('heroGlow');
  
  if (!canvas || !hero || window.innerWidth < 769) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouseX = -100;
  let mouseY = -100;
  let isHovering = false;
  let animId;
  
  function resize() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = (Math.random() - 0.5) * 2;
      this.life = 1;
      this.decay = Math.random() * 0.015 + 0.008;
      this.color = Math.random() > 0.5 ? '234, 88, 12' : '251, 146, 60';
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= this.decay;
      this.size *= 0.99;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.life})`;
      ctx.fill();
      
      // Glow effect on each particle
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.life * 0.15})`;
      ctx.fill();
    }
  }
  
  // Background floating dots
  const bgDots = [];
  for (let i = 0; i < 60; i++) {
    bgDots.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.3 + 0.1
    });
  }
  
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    isHovering = true;
    
    // Move glow
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    
    // Spawn particles on mouse move
    for (let i = 0; i < 3; i++) {
      particles.push(new Particle(mouseX, mouseY));
    }
  });
  
  hero.addEventListener('mouseleave', () => {
    isHovering = false;
  });
  
  function drawConnections() {
    bgDots.forEach((dot, i) => {
      // Connect dots near mouse
      const dx = dot.x - mouseX;
      const dy = dot.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 200 && isHovering) {
        ctx.beginPath();
        ctx.moveTo(dot.x, dot.y);
        ctx.lineTo(mouseX, mouseY);
        const alpha = (1 - dist / 200) * 0.2;
        ctx.strokeStyle = `rgba(234, 88, 12, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        
        // Push dots away slightly
        dot.x += dx * 0.005;
        dot.y += dy * 0.005;
      }
      
      // Connect nearby dots to each other
      for (let j = i + 1; j < bgDots.length; j++) {
        const dx2 = dot.x - bgDots[j].x;
        const dy2 = dot.y - bgDots[j].y;
        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        
        if (dist2 < 120) {
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(bgDots[j].x, bgDots[j].y);
          ctx.strokeStyle = `rgba(148, 163, 184, ${(1 - dist2 / 120) * 0.08})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update & draw background dots
    bgDots.forEach(dot => {
      dot.x += dot.speedX;
      dot.y += dot.speedY;
      
      if (dot.x < 0 || dot.x > canvas.width) dot.speedX *= -1;
      if (dot.y < 0 || dot.y > canvas.height) dot.speedY *= -1;
      
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(148, 163, 184, ${dot.opacity})`;
      ctx.fill();
    });
    
    drawConnections();
    
    // Update & draw mouse particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    particles = particles.filter(p => p.life > 0);
    
    animId = requestAnimationFrame(animate);
  }
  
  animate();
});

// ========== WHATSAPP STICKY BUTTON ==========
document.addEventListener('DOMContentLoaded', () => {
  const whatsappBtn = document.getElementById('whatsappBtn');
  if (!whatsappBtn) return;
  
  let shown = false;
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset;
    
    if (scrollY > 300 && !shown) {
      whatsappBtn.classList.add('visible');
      shown = true;
    } else if (scrollY <= 300 && shown) {
      whatsappBtn.classList.remove('visible');
      shown = false;
    }
  });
});