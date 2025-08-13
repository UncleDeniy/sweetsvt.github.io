
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelector('.terminal-loader').classList.add('hidden');
    document.querySelector('.container').classList.remove('hidden');
  }, 3000);
});


const themeToggle = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');

themeToggle.addEventListener('change', () => {
  document.documentElement.setAttribute('data-theme', 
    themeToggle.checked ? 'light' : 'dark');
  themeLabel.textContent = themeToggle.checked ? 'СВЕТЛАЯ ТЕМА' : 'ТЁМНАЯ ТЕМА';
});


setInterval(() => {
  const glitchElements = document.querySelectorAll('.glitch');
  glitchElements.forEach(el => {
    el.style.animation = 'glitch 0.5s linear infinite';
    setTimeout(() => el.style.animation = 'none', 500);
  });
}, 3000);
