// markdown-viewer.js — красивый ридер Markdown (GitHub Pages friendly)
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('markdownContainer');

  const url = new URLSearchParams(location.search);
  const file = url.get('file');
  const title = url.get('title') || 'Лекция';
  const category = url.get('category') || 'programming';
  const subcategory = url.get('subcategory') || '';
  const author = url.get('author') || 'Syntax_Syndicate';

  if (!file) {
    renderError('Файл не указан');
    return;
  }

  loadMarkdown(file)
    .then((md) => renderMarkdown(md, { title, category, subcategory, author }))
    .catch((err) => {
      console.error(err);
      renderError('Не удалось загрузить лекцию: ' + (err?.message || err));
    });

  function loadMarkdown(file) {
    const candidates = [];
    // support both "intro.md" and "docs/intro.md"
    if (file.startsWith('docs/')) candidates.push(file);
    candidates.push(`docs/${file}`);
    // de-dupe
    const uniq = [...new Set(candidates.map((p) => p.replace(/\/+/g, '/')))];
    return (async () => {
      for (const path of uniq) {
        const res = await fetch(path);
        if (res.ok) return await res.text();
      }
      throw new Error('Файл не найден');
    })();
  }

  function renderMarkdown(markdown, meta) {
    // marked + highlight.js
    marked.setOptions({
      breaks: true,
      gfm: true,
      highlight(code, lang) {
        try {
          if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(code, { language: lang }).value;
          }
          return hljs.highlightAuto(code).value;
        } catch {
          return code;
        }
      }
    });

    const rawHtml = marked.parse(markdown);

    // Build DOM for TOC + heading ids
    const tmp = document.createElement('div');
    tmp.innerHTML = rawHtml;

    const headings = [...tmp.querySelectorAll('h1, h2, h3')];
    const toc = [];
    const slug = (s) =>
      (s || '')
        .toString()
        .toLowerCase()
        .replace(/ё/g, 'е')
        .replace(/[^\p{L}\p{N}]+/gu, '-')
        .replace(/-+/g, '-')
        .replace(/(^-|-$)/g, '') || 'section';

    const used = new Map();
    headings.forEach((h) => {
      const level = Number(h.tagName.slice(1));
      const text = h.textContent.trim();
      if (!text) return;
      let id = slug(text);
      const n = (used.get(id) || 0) + 1;
      used.set(id, n);
      if (n > 1) id = `${id}-${n}`;
      h.id = id;
      toc.push({ id, text, level });
    });

    // Wrap tables to avoid overflow on mobile
    tmp.querySelectorAll('table').forEach((t) => {
      const wrap = document.createElement('div');
      wrap.style.maxWidth = '100%';
      wrap.style.overflowX = 'auto';
      wrap.style.webkitOverflowScrolling = 'touch';
      t.parentNode.insertBefore(wrap, t);
      wrap.appendChild(t);
    });

    const tocHtml = toc.length
      ? toc
          .map((it) => {
            const cls = it.level === 2 ? 'l2' : it.level === 3 ? 'l3' : 'l1';
            return `<a class="${cls}" href="#${it.id}">${escapeHtml(it.text)}</a>`;
          })
          .join('')
      : `<div class="aa-muted" style="padding:8px 10px;">Нет оглавления</div>`;

    root.innerHTML = `
      <div class="md-reader">
        <section class="md-reader__head surface">
          <div style="min-width:0;">
            <h1 class="md-reader__title">${escapeHtml(meta.title)}</h1>
            <div class="md-reader__meta">
              <span class="md-pill">${escapeHtml(getCategoryLabel(meta.category))}</span>
              ${meta.subcategory ? `<span class="md-pill">${escapeHtml(getSubcategoryLabel(meta.subcategory))}</span>` : ''}
              <span class="md-pill">👨‍💻 ${escapeHtml(meta.author)}</span>
              <span class="md-pill">📚 Markdown</span>
            </div>
          </div>
          <div class="md-reader__actions">
            <button class="md-btn" type="button" id="backBtn" title="Назад">
              <i class="fas fa-arrow-left"></i><span>Назад</span>
            </button>
            <button class="md-btn primary" type="button" id="copyLinkBtn" title="Скопировать ссылку">
              <i class="fas fa-link"></i><span>Ссылка</span>
            </button>
            <button class="md-btn" type="button" id="themeBtn" title="Переключить тему">
              <i class="fas fa-moon"></i><span>Тема</span>
            </button>
            <button class="md-btn" type="button" id="printBtn" title="Печать">
              <i class="fas fa-print"></i><span>Печать</span>
            </button>
          </div>
        </section>

        <section class="md-reader__body">
          <aside class="md-toc surface" aria-label="Оглавление">
            <div class="md-toc__title">Содержание</div>
            ${tocHtml}
          </aside>

          <article class="md-article md-content surface" id="main">
            ${tmp.innerHTML}
          </article>
        </section>
      </div>
    `;

    document.title = `${meta.title} | Syntax_Syndicate`;

    // Actions
    document.getElementById('backBtn')?.addEventListener('click', () => {
      // if came from lectures, go back; else fallback
      if (history.length > 1) history.back();
      else location.href = 'lections.html';
    });

    document.getElementById('printBtn')?.addEventListener('click', () => window.print());

    document.getElementById('copyLinkBtn')?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(location.href);
        toast?.('Ссылка скопирована');
      } catch {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = location.href;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        toast?.('Ссылка скопирована');
      }
    });

    document.getElementById('themeBtn')?.addEventListener('click', () => {
      // Prefer theme.js API if available
      const cur = document.documentElement.dataset.theme || 'dark';
      const next = cur === 'dark' ? 'light' : 'dark';
      if (window.__SS_THEME__ && typeof window.__SS_THEME__.set === 'function') {
        window.__SS_THEME__.set(next);
      } else {
        document.documentElement.dataset.theme = next;
      }
    });
  }

  function renderError(message) {
    root.innerHTML = `
      <div class="md-reader">
        <section class="surface" style="padding:18px;border-radius:18px;">
          <div style="display:flex;gap:12px;align-items:center;">
            <i class="fas fa-exclamation-triangle" style="font-size:1.8rem;"></i>
            <div>
              <div style="font-weight:800;font-size:18px;">Ошибка загрузки</div>
              <div class="aa-muted" style="margin-top:6px;">${escapeHtml(message)}</div>
            </div>
          </div>
          <div style="margin-top:14px;">
            <a class="md-btn primary" href="lections.html" style="text-decoration:none;display:inline-flex;">
              <i class="fas fa-arrow-left"></i><span>Вернуться к лекциям</span>
            </a>
          </div>
        </section>
      </div>
    `;
  }

  function getCategoryLabel(category) {
    const categories = {
      programming: 'Программирование',
      design: 'Дизайн',
      devops: 'DevOps',
      'data-science': 'Data Science',
      cybersecurity: 'Кибербезопасность',
      linux: 'Linux',
      windows: 'Windows'
    };
    return categories[category] || category;
  }

  function getSubcategoryLabel(subcategory) {
    const subcategories = {
      frontend: 'Frontend',
      backend: 'Backend',
      'operating-systems': 'ОС',
      python: 'Python',
      javascript: 'JavaScript'
    };
    return subcategories[subcategory] || subcategory;
  }

  function escapeHtml(s) {
    return (s ?? '').toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
