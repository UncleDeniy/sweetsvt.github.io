
// layout.js — единая боковая навигация + "Что нового" для всех страниц
(() => {
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  const navItems = [
    { href: 'index.html', label: 'Главная', key: 'home' },
    { href: 'search.html', label: 'Поиск', key: 'search' },
    { href: 'lections.html', label: 'Лекции', key: 'lections' },
    { href: 'graph.html', label: 'Граф', key: 'graph' },
    { href: 'bookmarks.html', label: 'Закладки', key: 'bookmarks' },
    { href: 'settings.html', label: 'Настройки', key: 'settings' },
  ];

  // Категории соответствуют option value в index.html (#categoryFilter)
  // Полный список категорий (совпадает с <option value="..."> в index.html)
  const categories = [
    { key: 'programming', label: 'Программирование' },
    { key: 'design', label: 'Дизайн' },
    { key: 'devops', label: 'DevOps' },
    { key: 'data-science', label: 'Data Science' },
    { key: 'cybersecurity', label: 'Кибербезопасность' },
    { key: 'career', label: 'Карьера' },
    { key: 'profession', label: 'Профессии' },
    { key: 'ai', label: 'Искусственный интеллект' },
    { key: 'productivity', label: 'Продуктивность' },
    { key: 'linux', label: 'Linux' },
    { key: 'windows', label: 'Windows' },
    { key: 'mobile', label: 'Мобильная разработка' },
    { key: 'cloud', label: 'Облачные технологии' },
    { key: 'other', label: 'Другое' },
  ];

  // Обновляй вручную при релизах
  const whatsNew = [
    { date: '2026-01-04', text: 'Умный поиск: ранжирование, быстрые фильтры и счётчик найденного.' },
    { date: '2026-01-04', text: 'Новые компактные карточки + страница материала (Подробнее) + похожие материалы.' },
    { date: '2026-01-04', text: 'Горячие клавиши: /, Enter, B, Esc, ?.' },
    { date: '2026-01-04', text: 'Граф знаний по тегам + оффлайн-режим (PWA).' },
  ];

  function icon(name) {
    // маленькие inline-иконки (без внешних библиотек)
    const icons = {
      home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 3 10v11h6v-7h6v7h6V10z"/></svg>',
      search: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 4a6 6 0 1 0 3.7 10.7l4.3 4.3 1.4-1.4-4.3-4.3A6 6 0 0 0 10 4zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/></svg>',
      lections: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14H6a2 2 0 0 0-2 2zm2-1h12V5H6v13zm14-12h2v14a2 2 0 0 1-2 2H8v-2h12z"/></svg>',
      bookmarks: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12a1 1 0 0 1 1 1v18l-7-3-7 3V4a1 1 0 0 1 1-1z"/></svg>',
      settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.4 13a7.8 7.8 0 0 0 0-2l2-1.5-2-3.5-2.3.8a7.6 7.6 0 0 0-1.7-1L15 3h-4l-.1 2.8a7.6 7.6 0 0 0-1.7 1L7 6l-2 3.5L7 11a7.8 7.8 0 0 0 0 2l-2 1.5L7 18l2.2-.8a7.6 7.6 0 0 0 1.7 1L11 21h4l.1-2.8a7.6 7.6 0 0 0 1.7-1L19 18l2-3.5L19.4 13zM13 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>',
      dot: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/></svg>',
      tag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10V4h-6L4 14l6 6 10-10zm-9.5-3A1.5 1.5 0 1 1 12 8.5 1.5 1.5 0 0 1 10.5 7z"/></svg>',
    };
    return icons[name] || icons.dot;
  }

  function makeSidebar() {
    const aside = document.createElement('aside');
    aside.className = 'aa-sidebar';
    aside.id = 'aaSidebar';

    const brand = document.createElement('a');
    brand.className = 'aa-brand';
    brand.href = 'index.html';
    brand.innerHTML = `
      <div class="aa-brand__mark" aria-hidden="true">📚</div>
      <div class="aa-brand__text">
        <div class="aa-brand__title">Syntax_Syndicate</div>
        <div class="aa-brand__sub">Полная датабаза</div>
      </div>
    `;
    aside.appendChild(brand);

    const nav = document.createElement('nav');
    nav.className = 'aa-nav';
    nav.setAttribute('aria-label', 'Навигация');

    navItems.forEach((it) => {
      const a = document.createElement('a');
      a.href = it.href;
      a.className = 'aa-nav__link';
      a.innerHTML = `<span class="aa-ico" aria-hidden="true">${icon(it.key)}</span><span>${it.label}</span>`;
      // active
      const target = (it.href.split('#')[0] || '').toLowerCase();
      if (page === target) a.classList.add('is-active');
      nav.appendChild(a);
    });
    aside.appendChild(nav);

    // Категории
    const cat = document.createElement('section');
    cat.className = 'aa-sidecard';
    cat.innerHTML = `<h2 class="aa-sidecard__title">Категории</h2>`;
    const ul = document.createElement('ul');
    ul.className = 'aa-sidecard__list';
    categories.forEach((c) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `search.html?cat=${encodeURIComponent(c.key)}`;
      a.className = 'aa-chiplink';
      a.innerHTML = `<span class="aa-ico" aria-hidden="true">${icon('tag')}</span><span>${c.label}</span>`;
      li.appendChild(a);
      ul.appendChild(li);
    });
    cat.appendChild(ul);
    aside.appendChild(cat);

    // Тема
    const theme = document.createElement('section');
    theme.className = 'aa-sidecard';
    theme.innerHTML = `
      <h2 class="aa-sidecard__title">Тема</h2>
      <div class="aa-theme" role="group" aria-label="Переключение темы">
        <button type="button" data-theme-mode="system">Сист</button>
        <button type="button" data-theme-mode="light">Свет</button>
        <button type="button" data-theme-mode="dark">Тёмн</button>
      </div>
    `;
    aside.appendChild(theme);

    // Что нового
    const nw = document.createElement('section');
    nw.className = 'aa-sidecard';
    nw.innerHTML = `<h2 class="aa-sidecard__title">Новое</h2>`;
    const ul2 = document.createElement('ul');
    ul2.className = 'aa-sidecard__list';
    whatsNew.slice(0, 6).forEach((n) => {
      const li = document.createElement('li');
      li.className = 'aa-sidecard__item';
      li.innerHTML = `<span class="aa-ico" aria-hidden="true">${icon('dot')}</span>
        <div><div class="aa-muted">${n.date}</div><div>${n.text}</div></div>`;
      ul2.appendChild(li);
    });
    nw.appendChild(ul2);
    aside.appendChild(nw);

    // footer small
    const foot = document.createElement('div');
    foot.className = 'aa-sidebar__foot';
    foot.innerHTML = `<div class="aa-muted">GitHub Pages • офлайн-кэш • PWA</div>`;
    aside.appendChild(foot);

    return aside;
  }

  function mount() {
    const mountEl = document.getElementById('aaSidebarMount');
    const contentEl = document.querySelector('.aa-content');
    if (!mountEl || !contentEl) return;

    mountEl.appendChild(makeSidebar());

    const btn = document.getElementById('aaSidebarToggle');
    const overlay = document.getElementById('aaOverlay');
    const sidebar = document.getElementById('aaSidebar');

    const close = () => {
      document.documentElement.classList.remove('aa-nav-open');
    };
    const open = () => {
      document.documentElement.classList.add('aa-nav-open');
    };

    if (btn) btn.addEventListener('click', () => {
      document.documentElement.classList.contains('aa-nav-open') ? close() : open();
    });
    if (overlay) overlay.addEventListener('click', close);

    // улучшение: закрывать меню после клика по ссылке на мобилке
    if (sidebar) sidebar.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      close();
    });

    // Theme buttons
    const themeGroup = document.querySelector('.aa-theme');
    if (themeGroup && window.__SS_THEME__) {
      const sync = () => {
        const mode = window.__SS_THEME__.get();
        themeGroup.querySelectorAll('button').forEach((b) => {
          b.classList.toggle('is-active', b.dataset.themeMode === mode);
        });
      };
      sync();
      themeGroup.addEventListener('click', (e) => {
        const btn2 = e.target.closest('button[data-theme-mode]');
        if (!btn2) return;
        window.__SS_THEME__.set(btn2.dataset.themeMode);
        sync();
      });
    }

    // highlight текущий якорь/страницы
    window.addEventListener('hashchange', () => {
      document.querySelectorAll('.aa-nav__link').forEach(a => a.classList.remove('is-active'));
      const a = document.querySelector(`.aa-nav__link[href="${page}"]`);
      if (a) a.classList.add('is-active');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
