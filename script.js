 
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelector('.terminal-loader').classList.add('hidden');
    document.querySelector('.container').classList.remove('hidden');
  }, 3000);
 
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('change', () => {
    document.documentElement.setAttribute('data-theme', 
      themeToggle.checked ? 'light' : 'dark');
    document.getElementById('theme-label').textContent = 
      themeToggle.checked ? 'СВЕТЛАЯ ТЕМА' : 'ТЁМНАЯ ТЕМА';
  });
 
  setInterval(() => {
    document.querySelectorAll('.glitch').forEach(el => {
      el.style.textShadow = `2px 0 ${var(--secondary)}, -2px 0 ${var(--primary)}`;
      setTimeout(() => el.style.textShadow = 'none', 200);
    });
  }, 3000);

 
  document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Сообщение отправлено! (Это демо)');
  });
});
