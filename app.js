// ---- DATA ----
const services = [
  { id: 1, icon: "📄", title: "Document Renewal", desc: "Renew ID cards, passports, and licenses online.", bg: "#dbeafe", color: "#2563eb" },
  { id: 2, icon: "🚗", title: "Vehicle Registration", desc: "Register or renew your vehicle from home.", bg: "#ffedd5", color: "#ea580c" },
  { id: 3, icon: "❤️", title: "Healthcare Booking", desc: "Book doctor appointments and access medical records.", bg: "#fee2e2", color: "#dc2626" },
  { id: 4, icon: "🎓", title: "Education Services", desc: "Enroll in courses, apply for scholarships.", bg: "#ede9fe", color: "#7c3aed" },
  { id: 5, icon: "🏛️", title: "Tax & Finance", desc: "File taxes, pay government fees online.", bg: "#dcfce7", color: "#16a34a" },
  { id: 6, icon: "💼", title: "Business Licensing", desc: "Start or renew your business license digitally.", bg: "#fef9c3", color: "#ca8a04" },
  { id: 7, icon: "🏠", title: "Property Services", desc: "Register property and manage ownership documents.", bg: "#ccfbf1", color: "#0d9488" },
  { id: 8, icon: "💳", title: "Online Payments", desc: "Pay fines, fees, and bills securely.", bg: "#fce7f3", color: "#db2777" },
];

// ---- RENDER SERVICES ----
const grid = document.getElementById('servicesGrid');
services.forEach(s => {
  const card = document.createElement('div');
  card.className = 'service-card';
  card.innerHTML = `
    <div class="icon" style="background:${s.bg}">${s.icon}</div>
    <h3>${s.title}</h3>
    <p>${s.desc}</p>
  `;
  card.addEventListener('click', () => openModal(s));
  grid.appendChild(card);
});

// ---- MODAL ----
const overlay = document.getElementById('modalOverlay');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalServiceTitle');
const modalDesc = document.getElementById('modalDesc');
const modalForm = document.getElementById('modalForm');
const modalSuccess = document.getElementById('modalSuccess');

function openModal(service) {
  modalIcon.textContent = service.icon;
  modalIcon.style.background = service.bg;
  modalTitle.textContent = service.title;
  modalDesc.textContent = service.desc;
  modalForm.style.display = 'block';
  modalSuccess.style.display = 'none';
  overlay.classList.add('open');
}

document.getElementById('modalClose').addEventListener('click', () => {
  overlay.classList.remove('open');
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.classList.remove('open');
});

modalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  modalForm.style.display = 'none';
  modalSuccess.style.display = 'block';
  setTimeout(() => {
    overlay.classList.remove('open');
    modalForm.reset();
    showToast('Your request has been submitted successfully!');
  }, 2000);
});

// ---- TOAST ----
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
// ---- HAMBURGER ----
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// ---- ACTIVE NAV ----
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
});

// ---- CONTACT FORM ----
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  showToast("Your message has been sent! We'll get back to you soon.");
  e.target.reset();
});

// ---- SCROLL ANIMATION ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity = 1; e.target.style.transform = 'translateY(0)'; }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .step-card, .testimonial-card, .info-card').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});