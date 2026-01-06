// item.js — страница материала + похожие (режим исследования)
(function(){
  'use strict';

  const LS_LIBRARY = 'ud:library';
  const normalizeText = (t) =>
    (t || '')
      .toString()
      .toLowerCase()
      .replace(/ё/g, 'е')
      .replace(/[^\p{L}\p{N}]+/gu, ' ')
      .trim();

  function readJSON(key, fallback){
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
    catch { return fallback; }
  }
  function writeJSON(key, value){
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }

  function getLibrary(){ return readJSON(LS_LIBRARY, {}); }
  function setLibrary(m){ writeJSON(LS_LIBRARY, m); }

  function isBookmarked(id){ return !!getLibrary()[id]; }
  function toggleBookmark(id){
    const lib = getLibrary();
    if (lib[id]) delete lib[id];
    else lib[id] = { status:'saved', folder:'Избранное', addedAt:Date.now() };
    setLibrary(lib);
  }

  function loadResourcesSafely(){
    const out = [];
    try { if (window.itResources && Array.isArray(window.itResources)) out.push(...window.itResources); } catch {}
    try { if (window.customizationResources && Array.isArray(window.customizationResources)) out.push(...window.customizationResources); } catch {}
    try {
      if (window.lections && Array.isArray(window.lections)) {
        const lectureResources = window.lections.map((l) => ({
          id: `lecture-${l.id}`,
          title: l.title || 'Лекция',
          description: l.description || '',
          link: `markdown-viewer.html?file=${encodeURIComponent(l.file || '')}`,
          tags: Array.isArray(l.tags) ? l.tags : [],
          type: 'lecture',
          category: l.category || 'programming',
          subcategory: l.subcategory || '',
          dateAdded: l.dateAdded || new Date().toISOString(),
          author: l.author || '',
          version: l.version || '',
          versions: l.versions || null
        }));
        out.push(...lectureResources);
      }
    } catch {}
    // Normalize ids to strings so they match URL params and localStorage keys
    out.forEach((r,i)=>{
      if (r && (r.id === 0 || r.id)) r.id = String(r.id);
      if(!r.id) r.id=`res-${i}`;
    });
    return out;
  }

  const TYPE_LABELS = {
    course:'Курс', program:'Программа', book:'Книга', article:'Статья', video:'Видео', tool:'Инструмент',
    library:'Библиотека', script:'Скрипт', reference:'Справочник', cheatsheet:'Шпаргалка', lecture:'Лекция'
  };
  const CATEGORY_LABELS = {
    programming:'Программирование', devops:'DevOps', system:'Системное администрирование', security:'Безопасность',
    databases:'Базы данных', web:'Веб', career:'Карьера', tools:'Инструменты', other:'Другое'
  };
  const getTypeLabel = (t)=> TYPE_LABELS[t] || (t||'Материал');
  const getCategoryLabel = (c)=> CATEGORY_LABELS[c] || (c||'Категория');

  function escapeHtml(s){
    return (s||'').toString()
      .replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')
      .replaceAll('"','&quot;').replaceAll("'","&#39;");
  }

  function params(){
    const p = new URLSearchParams(location.search);
    return { id: p.get('id') || '' };
  }

  function similarity(a, b){
    // Jaccard over tags + category/subcategory bonus
    const at = new Set((a.tags||[]).map(normalizeText).filter(Boolean));
    const bt = new Set((b.tags||[]).map(normalizeText).filter(Boolean));
    if (!at.size && !bt.size) return 0;

    let inter = 0;
    at.forEach(x => { if (bt.has(x)) inter++; });
    const union = at.size + bt.size - inter;
    let s = union ? inter/union : 0;
    if (a.category && b.category && a.category === b.category) s += 0.15;
    if (a.subcategory && b.subcategory && a.subcategory === b.subcategory) s += 0.10;
    return s;
  }

  function renderItem(r){
    const host = document.getElementById('itemCard');
    if (!host) return;

    const bm = isBookmarked(r.id);
    const bmIcon = bm ? 'fas fa-bookmark' : 'far fa-bookmark';

    const metaParts = [];
    if (r.author) metaParts.push(`<span class="author-inline"><button class="author-pill" type="button" data-author="${escapeHtml(r.author)}"><span class="author-pill__ava">👤</span><span class="author-pill__name">${escapeHtml(r.author)}</span></button><button class="author-follow" type="button" data-author="${escapeHtml(r.author)}" aria-pressed="false" title="Добавить автора в избранное">☆</button></span>`);
    if (r.type) metaParts.push(`📦 ${escapeHtml(getTypeLabel(r.type))}`);
    if (r.category) metaParts.push(`• ${escapeHtml(getCategoryLabel(r.category))}`);
    if (r.subcategory) metaParts.push(`• ${escapeHtml(r.subcategory)}`);

    const ver = r.version ? `<span class="badge badge--ver">v${escapeHtml(r.version)}</span>` : '';
    const tags = Array.isArray(r.tags) ? r.tags : [];

    const versionsBlock = Array.isArray(r.versions) && r.versions.length ? `
      <div class="item-versions">
        <div class="item-versions__title">Версии</div>
        <div class="item-versions__list">
          ${r.versions.map(v => `
            <div class="ver-row">
              <span class="ver-badge">v${escapeHtml(v.version||'')}</span>
              <span class="ver-note">${escapeHtml(v.note||'')}</span>
              ${v.date ? `<span class="ver-date">${escapeHtml(v.date)}</span>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    host.innerHTML = `
      <div class="item-head">
        <div>
          <h1 class="item-title">${escapeHtml(r.title || 'Без названия')}</h1>
          <div class="item-meta">${metaParts.join(' · ')} ${ver}</div>
        </div>
        <button class="bookmark-btn2" type="button" id="itemBookmark" title="Закладка">
          <i class="${bmIcon}"></i>
        </button>
      </div>

      ${r.description ? `<p class="item-desc">${escapeHtml(r.description)}</p>` : ''}

      <div class="item-actions">
        <a class="btn-primary" href="${escapeHtml(r.link)}" target="_blank" rel="noopener">
          <i class="fas fa-external-link-alt"></i> Открыть
        </a>
        <a class="btn-secondary" href="search.html">
          Назад к поиску
        </a>
      </div>

      ${tags.length ? `<div class="result-tags">${tags.slice(0,16).map(t=>`<a class="tag-pill" href="search.html?q=${encodeURIComponent(t)}">#${escapeHtml(t)}</a>`).join('')}</div>` : ''}

      ${versionsBlock}
    `;

    document.getElementById('itemBookmark')?.addEventListener('click', () => {
      toggleBookmark(r.id);
      const i = document.querySelector('#itemBookmark i');
      if (i) i.className = isBookmarked(r.id) ? 'fas fa-bookmark' : 'far fa-bookmark';
    });
  }

  function renderSimilar(current, all){
    const host = document.getElementById('similarList');
    if (!host) return;

    const scored = all
      .filter(x => x.id !== current.id)
      .map(x => ({ x, s: similarity(current, x) }))
      .filter(o => o.s > 0.05)
      .sort((a,b)=> b.s - a.s)
      .slice(0, 12);

    if (!scored.length){
      host.innerHTML = `
        <div class="no-results">
          <div class="no-results__icon">🧭</div>
          <h3>Похожего пока нет</h3>
          <p>Добавь теги к материалам — и режим исследования станет мощнее.</p>
        </div>
      `;
      return;
    }

    host.innerHTML = scored.map(o => `
      <a class="similar-card" href="item.html?id=${encodeURIComponent(o.x.id)}">
        <div class="similar-title">${escapeHtml(o.x.title)}</div>
        <div class="similar-meta">${escapeHtml(getTypeLabel(o.x.type))} · ${escapeHtml(getCategoryLabel(o.x.category||''))}</div>
      </a>
    `).join('');
  }

  function ensureHelp(){
    document.getElementById('helpBtn')?.addEventListener('click', () => {
      // reuse modal from script.js if present, else create tiny
      let m = document.getElementById('hotkeysModal');
      if (!m){
        m = document.createElement('div');
        m.id = 'hotkeysModal';
        m.className = 'modal is-open';
        m.innerHTML = `
          <div class="modal__overlay" data-close="1"></div>
          <div class="modal__card" role="dialog" aria-modal="true" aria-label="Горячие клавиши">
            <div class="modal__head">
              <div class="modal__title">Горячие клавиши</div>
              <button class="modal__close" type="button" data-close="1">×</button>
            </div>
            <div class="modal__body">
              <div class="hk-row"><kbd>/</kbd><span>Фокус на поиск</span></div>
              <div class="hk-row"><kbd>Enter</kbd><span>Открыть первый результат</span></div>
              <div class="hk-row"><kbd>B</kbd><span>Закладка для первого результата</span></div>
              <div class="hk-row"><kbd>Esc</kbd><span>Закрыть / назад</span></div>
              <div class="hk-row"><kbd>?</kbd><span>Подсказка</span></div>
            </div>
          </div>
        `;
        document.body.appendChild(m);
        m.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', ()=>m.classList.remove('is-open')));
      }
      m.classList.add('is-open');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    ensureHelp();

    const { id } = params();
    const all = loadResourcesSafely();
    const r = all.find(x => x.id === id);

    if (!r){
      document.getElementById('itemCard').innerHTML = `
        <div class="no-results">
          <div class="no-results__icon">⚠️</div>
          <h3>Материал не найден</h3>
          <p>Возможно, он был удалён или изменился ID.</p>
          <a class="btn-primary" href="search.html">Перейти к поиску</a>
        </div>
      `;
      return;
    }

    renderItem(r);
    renderSimilar(r, all);
  });
})();
