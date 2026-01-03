// theme.js — глобальная тема (light/dark) для всех страниц.
// Важно: этот файл подключается в <head> без defer, чтобы избежать "мигания" темы.
(() => {
  const LS_KEY = 'ss:theme'; // 'light' | 'dark' | 'system'

  function getPreferred() {
    const saved = localStorage.getItem(LS_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
    return 'system';
  }

  function systemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function apply(themeMode) {
    const theme = themeMode === 'system' ? systemTheme() : themeMode;
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.themeMode = themeMode;
    // Совместимость со старым кодом (body.dark-theme)
    const syncBody = () => {
      if (!document.body) return;
      document.body.classList.toggle('dark-theme', theme === 'dark');
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', syncBody, { once: true });
    } else {
      syncBody();
    }
    // theme-color для мобилок/браузеров
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b0f17' : '#f6f7fb');
  }

  // Экспортируем маленький API для layout.js/settings
  window.__SS_THEME__ = {
    key: LS_KEY,
    get: getPreferred,
    set: (mode) => {
      localStorage.setItem(LS_KEY, mode);
      apply(mode);
    },
    apply,
  };

  const mode = getPreferred();
  apply(mode);

  // Если выбран system — реагируем на изменение системной темы
  if (window.matchMedia) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener?.('change', () => {
      if ((localStorage.getItem(LS_KEY) || 'system') === 'system') apply('system');
    });
  }
})();
