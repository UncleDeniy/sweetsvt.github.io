// script.js — поиск/фильтры/закладки/горячие клавиши (Search page)
// Работает на GitHub Pages без бэкенда.

(function() {
        'use strict';

        /* ---------------------------
           Utilities
        ---------------------------- */
        const LS_BOOKMARKS = 'ud:bookmarks'; // legacy array of ids
        const LS_LIBRARY = 'ud:library'; // new map: { [id]: {status, folder, addedAt} }
        const LS_TAGHIST = 'tagHistory';

        const normalizeText = (t) =>
            (t || '')
            .toString()
            .toLowerCase()
            .replace(/ё/g, 'е')
            .replace(/[^\p{L}\p{N}]+/gu, ' ')
            .trim();

        const uniq = (arr) => Array.from(new Set(arr));
        const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

        function debounce(fn, wait = 150) {
            let t;
            return (...args) => {
                clearTimeout(t);
                t = setTimeout(() => fn(...args), wait);
            };
        }

        /* ---------------------------
           Data loading
        ---------------------------- */
        function loadResourcesSafely() {
            const out = [];

            // Основные ресурсы
            try {
                if (window.itResources && Array.isArray(window.itResources)) out.push(...window.itResources);
            } catch (e) {
                console.warn('Не удалось загрузить itResources:', e);
            }
            try {
                if (window.customizationResources && Array.isArray(window.customizationResources)) out.push(...window.customizationResources);
            } catch (e) {
                console.warn('Не удалось загрузить customizationResources:', e);
            }

            // Лекции → в общий список
            try {
                if (window.lections && Array.isArray(window.lections) && window.lections.length) {
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
            } catch (e) {
                console.warn('Не удалось загрузить lections:', e);
            }

            // Демо (если вдруг пусто)
            if (out.length === 0 && typeof getDemoResources === 'function') {
                console.log('Используются демо-ресурсы');
                return getDemoResources();
            }

            // Нормализуем id
            out.forEach((r, i) => {
                if (r && (r.id === 0 || r.id)) r.id = String(r.id);
                if (!r.id) r.id = `res-${i}`;
            });

            return out;
        }

        /* ---------------------------
           Bookmarks / Library
        ---------------------------- */
        function readJSON(key, fallback) {
            try {
                const raw = localStorage.getItem(key);
                return raw ? JSON.parse(raw) : fallback;
            } catch {
                return fallback;
            }
        }

        function writeJSON(key, value) {
            try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
        }

        // Back-compat: if old array exists, migrate into library map.
        function migrateBookmarksIfNeeded() {
            const lib = readJSON(LS_LIBRARY, null);
            if (lib) return;

            const old = readJSON(LS_BOOKMARKS, []);
            const map = {};
            if (Array.isArray(old)) {
                old.forEach((id) => {
                    map[id] = { status: 'saved', folder: 'Избранное', addedAt: Date.now() };
                });
            }
            writeJSON(LS_LIBRARY, map);
        }

        function getLibrary() {
            migrateBookmarksIfNeeded();
            return readJSON(LS_LIBRARY, {});
        }

        function setLibrary(map) {
            writeJSON(LS_LIBRARY, map);
            // also maintain legacy list
            writeJSON(LS_BOOKMARKS, Object.keys(map));
        }

        function isBookmarked(id) {
            const lib = getLibrary();
            return !!lib[id];
        }

        function toggleBookmark(id) {
            const lib = getLibrary();
            if (lib[id]) {
                delete lib[id];
            } else {
                lib[id] = { status: 'saved', folder: 'Избранное', addedAt: Date.now() };
            }
            setLibrary(lib);
        }

        function getBookmarkIds() {
            return Object.keys(getLibrary());
        }

        function updateBookmarkCountUI() {
            const el = document.getElementById('bookmarkCount');
            if (el) el.textContent = getBookmarkIds().length;
        }

        /* ---------------------------
           Tag history (optional personalization)
        ---------------------------- */
        function getTagHistory() {
            const h = readJSON(LS_TAGHIST, {});
            return (h && typeof h === 'object') ? h : {};
        }

        function bumpTag(tag) {
            if (!tag) return;
            const key = LS_TAGHIST;
            const map = getTagHistory();
            map[tag] = (map[tag] || 0) + 1;
            writeJSON(key, map);
        }

        /* ---------------------------
           Labels
        ---------------------------- */
        const TYPE_LABELS = {
            course: 'Курс',
            program: 'Программа',
            book: 'Книга',
            article: 'Статья',
            video: 'Видео',
            tool: 'Инструмент',
            library: 'Библиотека',
            script: 'Скрипт',
            reference: 'Справочник',
            cheatsheet: 'Шпаргалка',
            lecture: 'Лекция'
        };

        const CATEGORY_LABELS = {
            programming: 'Программирование',
            devops: 'DevOps',
            system: 'Системное администрирование',
            security: 'Безопасность',
            databases: 'Базы данных',
            web: 'Веб',
            career: 'Карьера',
            tools: 'Инструменты',
            other: 'Другое'
        };

        function getTypeLabel(t) { return TYPE_LABELS[t] || (t ? t : 'Материал'); }

        function getCategoryLabel(c) { return CATEGORY_LABELS[c] || (c ? c : 'Категория'); }

        function getSubcategoryLabel(s) { return s ? s : 'Подкатегория'; }

        /* ---------------------------
           Local index cache (IndexedDB)
        ---------------------------- */
        const DB_NAME = 'ud_search_db';
        const DB_VER = 1;
        const STORE = 'index';
        const INDEX_KEY = 'index_v1';

        function openDB() {
            return new Promise((resolve, reject) => {
                const req = indexedDB.open(DB_NAME, DB_VER);
                req.onupgradeneeded = () => {
                    const db = req.result;
                    if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
                };
                req.onsuccess = () => resolve(req.result);
                req.onerror = () => reject(req.error);
            });
        }

        async function idbGet(key) {
            try {
                const db = await openDB();
                return await new Promise((resolve, reject) => {
                    const tx = db.transaction(STORE, 'readonly');
                    const st = tx.objectStore(STORE);
                    const r = st.get(key);
                    r.onsuccess = () => resolve(r.result);
                    r.onerror = () => reject(r.error);
                });
            } catch { return null; }
        }

        async function idbSet(key, val) {
            try {
                const db = await openDB();
                await new Promise((resolve, reject) => {
                    const tx = db.transaction(STORE, 'readwrite');
                    const st = tx.objectStore(STORE);
                    const r = st.put(val, key);
                    r.onsuccess = () => resolve(true);
                    r.onerror = () => reject(r.error);
                });
            } catch { /* ignore */ }
        }

        function computeDataHash(resources) {
            // Cheap, stable hash: length + sum of title lengths + last dateAdded
            let sum = resources.length;
            let last = '';
            for (let i = 0; i < resources.length; i++) {
                const r = resources[i];
                sum += (r.title ? r.title.length : 0) + (r.description ? r.description.length : 0);
                if (r.dateAdded && r.dateAdded > last) last = r.dateAdded;
            }
            return `${resources.length}:${sum}:${last}`;
        }

        /* ---------------------------
           Smart search (local "Google-like")
        ---------------------------- */
        function buildDocs(resources) {
            return resources.map((r) => {
                const tags = Array.isArray(r.tags) ? r.tags : [];
                const tagsText = tags.map(normalizeText).join(' ');
                const title = r.title || '';
                const description = r.description || '';
                const link = r.link || '';
                const author = r.author || '';
                const hay = normalizeText([title, description, link, tagsText, author].join(' '));
                return {
                    id: r.id,
                    title,
                    description,
                    link,
                    tags,
                    tagsText,
                    author,
                    type: r.type || '',
                    category: r.category || '',
                    subcategory: r.subcategory || '',
                    dateAdded: r.dateAdded || '',
                    lang: r.lang || r.language || '',
                    format: r.format || '',
                    size: r.size || '',
                    source: r.source || '',
                    version: r.version || '',
                    versions: r.versions || null,
                    _hay: hay
                };
            });
        }

        function scoreDoc(doc, tokens) {
            // Weighted scoring (fast, no heavy fuzzy)
            let score = 0;
            const title = normalizeText(doc.title);
            const desc = normalizeText(doc.description);
            const link = normalizeText(doc.link);
            const tags = normalizeText(doc.tagsText);
            const auth = normalizeText(doc.author);

            for (const t of tokens) {
                if (!t) continue;

                // Exact contains
                const inTitle = title.includes(t);
                const inDesc = desc.includes(t);
                const inLink = link.includes(t);
                const inTags = tags.includes(t);
                const inAuth = auth.includes(t);

                if (inTitle) score += 6;
                if (inDesc) score += 3;
                if (inTags) score += 2.5;
                if (inLink) score += 1.5;
                if (inAuth) score += 2;

                // Prefix bonus
                if (title.startsWith(t)) score += 2;
                if (tags.startsWith(t)) score += 1;

                // Simple fuzzy (subsequence) bonus for title
                if (!inTitle && t.length >= 4) {
                    if (isSubsequence(t, title)) score += 1.25;
                }
            }

            return score;
        }

        function isSubsequence(needle, hay) {
            // very cheap fuzzy match
            let i = 0,
                j = 0;
            while (i < needle.length && j < hay.length) {
                if (needle[i] === hay[j]) i++;
                j++;
            }
            return i === needle.length;
        }

        function smartSearch(docs, query) {
            const q = normalizeText(query);
            if (!q) return docs.map(d => ({ doc: d, score: 0 }));

            const tokens = q.split(/\s+/).filter(Boolean);
            const out = [];
            for (const d of docs) {
                // fast pre-check
                let ok = true;
                for (const t of tokens) {
                    if (!d._hay.includes(t) && !(t.length >= 4 && isSubsequence(t, normalizeText(d.title)))) {
                        ok = false;
                        break;
                    }
                }
                if (!ok) continue;
                const s = scoreDoc(d, tokens);
                out.push({ doc: d, score: s });
            }
            out.sort((a, b) => b.score - a.score);
            return out;
        }

        /* ---------------------------
           Rendering
        ---------------------------- */
        function escapeHtml(s) {
            return (s || '').toString()
                .replaceAll('&', '&amp;')
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;')
                .replaceAll('"', '&quot;')
                .replaceAll("'", '&#39;');
        }

        function formatTagPills(tags, tagHistory) {
            if (!Array.isArray(tags) || !tags.length) return '';
            const sorted = [...tags].sort((a, b) => (tagHistory[b] || 0) - (tagHistory[a] || 0));
            return sorted.slice(0, 10).map(t => `<button class="tag-pill" type="button" data-tag="${escapeHtml(t)}">#${escapeHtml(t)}</button>`).join('');
        }

        function compactMetaLine(r) {
            const parts = [];
            if (r.lang) parts.push(`${escapeHtml(r.lang)}`);
            if (r.format) parts.push(`${escapeHtml(r.format)}`);
            if (r.size) parts.push(`${escapeHtml(r.size)}`);
            if (r.type) parts.push(`📦 ${escapeHtml(getTypeLabel(r.type))}`);
            if (r.category) parts.push(`• ${escapeHtml(getCategoryLabel(r.category))}`);
            if (r.subcategory) parts.push(`• ${escapeHtml(getSubcategoryLabel(r.subcategory))}`);
            if (r.source) parts.push(`• ${escapeHtml(r.source)}`);
            return parts.join(' · ');
        }

        function toInternalUrl(resourceId) {
            return `item.html?id=${encodeURIComponent(resourceId)}`;
        }

        function renderResources(list, container, opts = {}) {
            const { query = '' } = opts;
            container.innerHTML = '';

            const foundEl = document.getElementById('foundCount');
            if (foundEl) foundEl.textContent = String(list.length);

            if (!list.length) {
                container.innerHTML = `
        <div class="no-results">
          <div class="no-results__icon">🔎</div>
          <h3>Ничего не найдено</h3>
          <p>Попробуйте: изменить запрос, убрать подкатегорию или нажать «Очистить».</p>
        </div>
      `;
                return;
            }

            const tagHistory = getTagHistory();

            for (const r of list) {
                const card = document.createElement('article');
                card.className = 'result-card';

                const bm = isBookmarked(r.id);
                const bmIcon = bm ? 'fas fa-bookmark' : 'far fa-bookmark';

                const meta = compactMetaLine(r);

                const title = escapeHtml(r.title || 'Без названия');
                const desc = escapeHtml(r.description || '');
                const author = r.author ? `<button class="author-pill" type="button" data-author="${escapeHtml(r.author)}"><span class="author-pill__ava">👤</span><span class="author-pill__name">${escapeHtml(r.author)}</span></button>` : '';
                const ver = r.version ? `<span class="badge badge--ver">v${escapeHtml(r.version)}</span>` : '';

                card.innerHTML = `
        <div class="result-top">
          <div class="result-main">
            <a class="result-title" href="${toInternalUrl(r.id)}">${title}</a>
            <div class="result-sub">
              ${author}
              ${meta ? `<span class="result-meta">${meta}</span>` : ''}
              ${ver}
            </div>
          </div>

          <button class="bookmark-btn2" type="button" title="Закладка" data-id="${escapeHtml(r.id)}">
            <i class="${bmIcon}"></i>
          </button>
        </div>

        ${desc ? `<div class="result-desc">${desc}</div>` : ''}

        <div class="result-actions">
          <a class="btn-link" href="${escapeHtml(r.link)}" target="_blank" rel="noopener" data-open="${escapeHtml(r.id)}">
            <i class="fas fa-external-link-alt"></i> Открыть
          </a>
          <a class="btn-ghost" href="${toInternalUrl(r.id)}">
            Подробнее
          </a>
        </div>

        ${r.tags && r.tags.length ? `<div class="result-tags">${formatTagPills(r.tags, tagHistory)}</div>` : ''}
      `;

      container.appendChild(card);
    }

    // bookmark buttons
    container.querySelectorAll('.bookmark-btn2').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        toggleBookmark(id);
        updateBookmarkCountUI();
        // refresh icon
        const i = btn.querySelector('i');
        if (i) i.className = isBookmarked(id) ? 'fas fa-bookmark' : 'far fa-bookmark';
      }, { passive: true });
    });

    // tag click -> search by tag
    container.querySelectorAll('.tag-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const tag = btn.getAttribute('data-tag');
        if (!tag) return;
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
          searchInput.value = tag;
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
          bumpTag(tag);
        }
      });
    });

    // open click -> bump tag history a bit
    container.querySelectorAll('[data-open]').forEach(a => {
      a.addEventListener('click', () => {
        try {
          const id = a.getAttribute('data-open');
          const doc = list.find(x => x.id === id);
          if (doc && Array.isArray(doc.tags)) doc.tags.forEach(bumpTag);
        } catch {}
      }, { passive: true });
    });
  }

  function renderActiveChips(state) {
    const host = document.getElementById('activeChips');
    if (!host) return;
    host.innerHTML = '';

    const chips = [];
    if (state.q) chips.push({ key: 'q', label: `Запрос: ${state.q}` });
    if (state.type) chips.push({ key: 'type', label: `Тип: ${getTypeLabel(state.type)}` });
    if (state.cat) chips.push({ key: 'cat', label: `Категория: ${getCategoryLabel(state.cat)}` });
    if (state.sub) chips.push({ key: 'sub', label: `Подкатегория: ${getSubcategoryLabel(state.sub)}` });
    if (state.bm === 'bookmarked') chips.push({ key: 'bm', label: 'Только закладки' });
    if (state.bm === 'not_bookmarked') chips.push({ key: 'bm', label: 'Без закладок' });

    if (!chips.length) {
      host.innerHTML = `<span class="chips-empty">Фильтры не выбраны</span>`;
      return;
    }

    chips.forEach(ch => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'chip';
      el.setAttribute('data-chip', ch.key);
      el.innerHTML = `${escapeHtml(ch.label)} <span class="chip-x">×</span>`;
      host.appendChild(el);
    });
  }

  /* ---------------------------
     Filters & URL sync
  ---------------------------- */
  function parseURL() {
    const p = new URLSearchParams(location.search);
    return {
      q: p.get('q') || '',
      type: p.get('type') || '',
      cat: p.get('cat') || '',
      sub: p.get('sub') || '',
      bm: p.get('bm') || ''
    };
  }

  function setURL(state) {
    const p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    if (state.type) p.set('type', state.type);
    if (state.cat) p.set('cat', state.cat);
    if (state.sub) p.set('sub', state.sub);
    if (state.bm) p.set('bm', state.bm);
    const qs = p.toString();
    const url = qs ? `?${qs}` : location.pathname;
    history.replaceState({}, '', url);
  }

  function populateCategories(selectEl, docs) {
    const cats = uniq(docs.map(d => d.category).filter(Boolean))
      .sort((a,b) => getCategoryLabel(a).localeCompare(getCategoryLabel(b),'ru'));
    selectEl.innerHTML = `<option value="">Все категории</option>` + cats.map(c =>
      `<option value="${escapeHtml(c)}">${escapeHtml(getCategoryLabel(c))}</option>`).join('');
  }

  function populateSubcategories(selectEl, docs, cat) {
    const subs = uniq(docs.filter(d => !cat || d.category === cat).map(d => d.subcategory).filter(Boolean))
      .sort((a,b) => getSubcategoryLabel(a).localeCompare(getSubcategoryLabel(b),'ru'));
    selectEl.innerHTML = `<option value="">Все подкатегории</option>` + subs.map(s =>
      `<option value="${escapeHtml(s)}">${escapeHtml(getSubcategoryLabel(s))}</option>`).join('');
  }

  function updateStatsUI(docs) {
    const totalResources = document.getElementById('totalResources');
    const uniqueCategories = document.getElementById('uniqueCategories');
    const uniqueSubcategories = document.getElementById('uniqueSubcategories');

    if (totalResources) totalResources.textContent = String(docs.length);
    if (uniqueCategories) uniqueCategories.textContent = String(new Set(docs.map(d => d.category).filter(Boolean)).size);
    if (uniqueSubcategories) uniqueSubcategories.textContent = String(new Set(docs.map(d => d.subcategory).filter(Boolean)).size);
  }

  /* ---------------------------
     Hotkeys + Help modal
  ---------------------------- */
  function ensureHelpModal() {
    if (document.getElementById('hotkeysModal')) return;

    const modal = document.createElement('div');
    modal.id = 'hotkeysModal';
    modal.className = 'modal';
    modal.innerHTML = `
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
          <div class="hk-row"><kbd>Esc</kbd><span>Очистить поиск / закрыть окна</span></div>
          <div class="hk-row"><kbd>?</kbd><span>Открыть эту подсказку</span></div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelectorAll('[data-close]').forEach(el => {
      el.addEventListener('click', () => modal.classList.remove('is-open'));
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') modal.classList.remove('is-open');
    });
  }

  function openHelpModal() {
    ensureHelpModal();
    document.getElementById('hotkeysModal')?.classList.add('is-open');
  }

  /* ---------------------------
     Main init
  ---------------------------- */
  async function initSearchPage() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const resourcesList = document.getElementById('resourcesList');

    // If no search UI — skip (e.g., other pages load script.js accidentally)
    if (!resourcesList) return;

    const typeFilter = document.getElementById('typeFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const subcategoryFilter = document.getElementById('subcategoryFilter');
    const bookmarkFilter = document.getElementById('bookmarkFilter');
    const clearFilters = document.getElementById('clearFilters');
    const activeChips = document.getElementById('activeChips');

    updateBookmarkCountUI();

    // Load resources & build docs (maybe from cache)
    const resources = loadResourcesSafely();
    const hash = computeDataHash(resources);

    let docs = null;
    const cached = await idbGet(INDEX_KEY);
    if (cached && cached.hash === hash && Array.isArray(cached.docs)) {
      docs = cached.docs;
    } else {
      docs = buildDocs(resources);
      // cache (without functions)
      await idbSet(INDEX_KEY, { hash, docs });
    }

    updateStatsUI(docs);

    // Fill selects
    if (categoryFilter) populateCategories(categoryFilter, docs);
    if (subcategoryFilter) populateSubcategories(subcategoryFilter, docs, '');

    // Apply URL state
    const state = parseURL();
    if (searchInput) searchInput.value = state.q || '';
    if (typeFilter) typeFilter.value = state.type || '';
    if (categoryFilter) categoryFilter.value = state.cat || '';
    if (bookmarkFilter) bookmarkFilter.value = state.bm || '';

    if (subcategoryFilter) {
      populateSubcategories(subcategoryFilter, docs, state.cat || '');
      subcategoryFilter.value = state.sub || '';
    }

    function apply() {
      const s = {
        q: searchInput ? searchInput.value.trim() : '',
        type: typeFilter ? typeFilter.value : '',
        cat: categoryFilter ? categoryFilter.value : '',
        sub: subcategoryFilter ? subcategoryFilter.value : '',
        bm: bookmarkFilter ? bookmarkFilter.value : ''
      };

      setURL(s);
      renderActiveChips(s);

      // filter by dropdowns first (cheap)
      let base = docs;

      if (s.type) base = base.filter(d => (d.type || '') === s.type);
      if (s.cat) base = base.filter(d => (d.category || '') === s.cat);
      if (s.sub) base = base.filter(d => (d.subcategory || '') === s.sub);

      const bmIds = new Set(getBookmarkIds());
      if (s.bm === 'bookmarked') base = base.filter(d => bmIds.has(d.id));
      if (s.bm === 'not_bookmarked') base = base.filter(d => !bmIds.has(d.id));

      // search
      const ranked = smartSearch(base, s.q);
      const list = ranked.map(x => x.doc);

      renderResources(list, resourcesList, { query: s.q });

      // store "last list" for hotkeys
      window.__ud_lastResults = list;
    }

    const applyDebounced = debounce(apply, 150);

    // listeners
    searchInput?.addEventListener('input', applyDebounced);
    searchBtn?.addEventListener('click', apply);

    typeFilter?.addEventListener('change', apply);
    categoryFilter?.addEventListener('change', () => {
      // refresh subcats
      populateSubcategories(subcategoryFilter, docs, categoryFilter.value);
      // reset sub
      if (subcategoryFilter) subcategoryFilter.value = '';
      apply();
    });
    subcategoryFilter?.addEventListener('change', apply);
    bookmarkFilter?.addEventListener('change', apply);

    clearFilters?.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (typeFilter) typeFilter.value = '';
      if (categoryFilter) categoryFilter.value = '';
      if (subcategoryFilter) {
        populateSubcategories(subcategoryFilter, docs, '');
        subcategoryFilter.value = '';
      }
      if (bookmarkFilter) bookmarkFilter.value = '';
      apply();
    });

    // chip remove
    activeChips?.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      const key = btn.getAttribute('data-chip');
      if (key === 'q' && searchInput) searchInput.value = '';
      if (key === 'type' && typeFilter) typeFilter.value = '';
      if (key === 'cat' && categoryFilter) {
        categoryFilter.value = '';
        populateSubcategories(subcategoryFilter, docs, '');
        if (subcategoryFilter) subcategoryFilter.value = '';
      }
      if (key === 'sub' && subcategoryFilter) subcategoryFilter.value = '';
      if (key === 'bm' && bookmarkFilter) bookmarkFilter.value = '';
      apply();
    });

    // Hotkeys
    ensureHelpModal();
    window.addEventListener('keydown', (e) => {
      const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
      const typing = tag === 'input' || tag === 'textarea';

      if (e.key === '/' && !typing) {
        e.preventDefault();
        searchInput?.focus();
        return;
      }
      if (e.key === '?' && !typing) {
        e.preventDefault();
        openHelpModal();
        return;
      }
      if (e.key === 'Escape') {
        if (document.getElementById('hotkeysModal')?.classList.contains('is-open')) {
          document.getElementById('hotkeysModal')?.classList.remove('is-open');
          return;
        }
        if (searchInput && searchInput.value) {
          searchInput.value = '';
          apply();
        }
        return;
      }
      if (e.key === 'Enter' && !typing) {
        const list = window.__ud_lastResults || [];
        if (list.length) {
          window.location.href = toInternalUrl(list[0].id);
        }
        return;
      }
      if ((e.key === 'b' || e.key === 'B') && !typing) {
        const list = window.__ud_lastResults || [];
        if (!list.length) return;
        toggleBookmark(list[0].id);
        updateBookmarkCountUI();
        apply(); // reflect
      }
    });

    // initial render
    apply();
  }

  document.addEventListener('DOMContentLoaded', initSearchPage);
})();

(() => {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  if (!sidebar) return;

  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

  function openSidebar() {
    if (!isMobile()) return;
    sidebar.classList.add('open');
    document.body.classList.add('sidebar-open');
    if (overlay) overlay.classList.add('show');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    document.body.classList.remove('sidebar-open');
    if (overlay) overlay.classList.remove('show');
  }

  // На мобилке убираем "закрытие по клику на overlay" (оно ломает скролл/тапы)
  if (overlay) {
    overlay.style.pointerEvents = 'none';
    overlay.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
    }, true);
  }


  // Закрывать при переходе по ссылке внутри меню — удобно
  sidebar.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a && isMobile()) closeSidebar();
  });

  // ===== Swipe logic =====
  // Открыть: свайп вправо от левого края (edge zone)
  // Закрыть: свайп влево по открытому меню
  const EDGE_PX = 18;     // зона от края для открытия
  const MIN_X = 60;       // минимальная длина горизонтального свайпа
  const MAX_Y = 35;       // допустимое отклонение по Y, чтобы не путать со скроллом

  let startX = 0;
  let startY = 0;
  let tracking = false;
  let mode = null; // 'open' | 'close'

  function onTouchStart(e) {
    if (!isMobile()) return;

    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    tracking = false;
    mode = null;

    const isOpen = sidebar.classList.contains('open');

    // Если меню закрыто — начинаем трекинг только если касание с самого левого края
    if (!isOpen) {
      if (startX <= EDGE_PX) {
        tracking = true;
        mode = 'open';
      }
      return;
    }

    // Если меню открыто — трекаем свайп для закрытия только если касание внутри меню
    // или рядом слева от него (чтобы жест был естественным)
    const rect = sidebar.getBoundingClientRect();
    if (startX <= rect.right + 24) {
      tracking = true;
      mode = 'close';
    }
  }

  function onTouchMove(e) {
    if (!tracking || !isMobile()) return;

    const t = e.touches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;

    // Если это вертикальная прокрутка — прекращаем трекинг, НЕ закрываем меню
    if (Math.abs(dy) > MAX_Y && Math.abs(dy) > Math.abs(dx)) {
      tracking = false;
      mode = null;
      return;
    }

    // Когда реально горизонтальный жест — предотвращаем скролл страницы
    if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault();
    }
  }

  function onTouchEnd(e) {
    if (!tracking || !isMobile()) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;

    tracking = false;

    // если вертикально — ничего
    if (Math.abs(dy) > MAX_Y && Math.abs(dy) > Math.abs(dx)) return;

    if (mode === 'open') {
      // открываем только если свайп вправо
      if (dx >= MIN_X) openSidebar();
    } else if (mode === 'close') {
      // закрываем только если свайп влево
      if (dx <= -MIN_X) closeSidebar();
    }

    mode = null;
  }

  // Важно: ставим {passive:false} чтобы preventDefault работал
  document.addEventListener('touchstart', onTouchStart, { passive: true });
  document.addEventListener('touchmove', onTouchMove, { passive: false });
  document.addEventListener('touchend', onTouchEnd, { passive: true });

  // Если изменили размер экрана (поворот/планшет) — не оставляем тело залоченным
  window.addEventListener('resize', () => {
    if (!isMobile()) {
      document.body.classList.remove('sidebar-open');
      if (overlay) overlay.classList.remove('show');
      sidebar.classList.remove('open');
    }
  });
})();