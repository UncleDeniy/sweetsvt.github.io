// ui.js - общий UI (хедер, мобильное меню, переключатель темы)
(function () {
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function getSettingsManager() {
    // settings-core.js / settings-main.js создают window.settingsManager
    return (typeof window.settingsManager !== 'undefined') ? window.settingsManager : null;
  }

  ready(() => {
    // Активная ссылка в навигации
    try {
      const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
      document.querySelectorAll('.site-nav a').forEach(a => {
        const href = (a.getAttribute('href') || '').toLowerCase();
        if (href === path) a.classList.add('is-active');
      });
    } catch (_) {}

    // Мобильное меню
    const nav = document.getElementById('siteNav');
    const navToggle = document.getElementById('navToggle');
    if (nav && navToggle) {
      const closeNav = () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      };
      const openNav = () => {
        nav.classList.add('is-open');
        navToggle.setAttribute('aria-expanded', 'true');
      };

      navToggle.addEventListener('click', () => {
        nav.classList.contains('is-open') ? closeNav() : openNav();
      });
      // Закрытие по клику на ссылку
      nav.addEventListener('click', (e) => {
        const t = e.target;
        if (t && t.tagName === 'A') closeNav();
      });
      // Закрытие по Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeNav();
      });
    }

    // Переключатель темы
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      const sm = getSettingsManager();

      const sync = () => {
        const dark = document.body.classList.contains('dark-theme');
        themeToggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
        themeToggle.title = dark ? 'Светлая тема' : 'Тёмная тема';
        const icon = themeToggle.querySelector('i');
        if (icon) {
          icon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
        }
      };

      themeToggle.addEventListener('click', () => {
        const currentlyDark = document.body.classList.contains('dark-theme');
        if (sm && typeof sm.updateSetting === 'function') {
          sm.updateSetting('darkTheme', !currentlyDark);
        } else {
          document.body.classList.toggle('dark-theme');
        }
        sync();
      });

      // на старте
      sync();
      document.addEventListener('settingsChanged', sync);
    }

    // Регистрация Service Worker (опционально)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  });
})();
