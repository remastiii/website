// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

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

// Optional: Close menu when clicking outside
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

document.addEventListener('DOMContentLoaded', () => {
  const dynamicPart = document.querySelector('.dynamic-part');

  if (!dynamicPart) return;

  // ✏️ OVDE MENJAŠ FRAZE
  const phrases = [
    "privlače klijente 24/7.",
    "rade dok ti spavaš.",
    "povećavaju tvoju prodaju.",
    "grade tvoj brend i poverenje.",
    "pretvaraju posetioce u kupce."
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeSpeed = 60;
  const deleteSpeed = 40;
  const pause = 2000;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      // Briši
      dynamicPart.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Kucaj
      dynamicPart.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    // Odluči šta sledeće
    let timeout = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === current.length) {
      // Završio kucanje → pauza → briši
      setTimeout(() => {
        isDeleting = true;
        type();
      }, pause);
      return;
    } else if (isDeleting && charIndex === 0) {
      // Završio brisanje → sledeća fraza
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      timeout = typeSpeed;
    }

    setTimeout(type, timeout);
  }

  // Pokreni
  type();
});

document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const ime = document.getElementById('ime').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefon = document.getElementById('telefon').value.trim();
  const poruka = document.getElementById('poruka').value.trim();

  if (ime.length < 3) {
    alert('Ime mora imati najmanje 3 karaktera.');
    return;
  }
  if (poruka.length < 10) {
    alert('Poruka mora imati najmanje 10 karaktera.');
    return;
  }
  if (!email && !telefon) {
    alert('Morate uneti email ILI broj telefona.');
    return;
  }
  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    alert('Unesite ispravnu email adresu.');
    return;
  }
  if (telefon && !/^\+?[0-9\s\-()]{7,}$/.test(telefon)) {
    alert('Unesite ispravan broj telefona (npr. +381 60 123 4567).');
    return;
  }

  const formData = new FormData();
  formData.append('ime', ime);
  if (email) formData.append('email', email);
  if (telefon) formData.append('telefon', telefon);
  formData.append('poruka', poruka);

  try {
    const response = await fetch('https://formspree.io/f/xrbrzdgz', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      document.getElementById('successModal').style.display = 'flex';
      this.reset();
    } else {
      // Formspree može vratiti HTML umesto JSON-a → ne pokušavaj da ga parsiraš
      alert('Došlo je do greške. Molim te pokušaj ponovo.');
    }
  } catch (err) {
    alert('Došlo je do greške. Proverite internet konekciju.');
  }
});

document.getElementById('closeModal').addEventListener('click', function() {
  document.getElementById('successModal').style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', () => {
  const questions = document.querySelectorAll('.faq-question');

  questions.forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      const isCurrentlyExpanded = button.getAttribute('aria-expanded') === 'true';

      // Zatvori sve odgovore
      questions.forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
        btn.nextElementSibling.style.height = '0';
        btn.nextElementSibling.style.opacity = '0';
      });

      // Otvori kliknuti (ako nije već otvoren)
      if (!isCurrentlyExpanded) {
        button.setAttribute('aria-expanded', 'true');
        const targetHeight = answer.scrollHeight + 'px';
        answer.style.height = targetHeight;
        answer.style.opacity = '1';
      }
    });
  });
});
