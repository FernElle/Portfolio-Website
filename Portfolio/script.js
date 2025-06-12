// === Theme Toggle ===
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function applyTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerText = '🌙';
  } else {
    body.classList.remove('dark-mode');
    themeToggle.innerText = '☀️';
  }
  localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
  const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
  applyTheme(newTheme);
});

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);
});

// === Reveal on scroll ===
function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


// === Button Hover Animation ===
document.querySelectorAll('button, .btn').forEach(button => {
  button.addEventListener('mouseover', () => {
    button.classList.add('btn-glow');
  });
  button.addEventListener('mouseout', () => {
    button.classList.remove('btn-glow');
  });
});

// === Scroll Reveal Animation ===
const revealOnScroll = () => {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
