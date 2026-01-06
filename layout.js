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
            // Live wallpaper layer (controlled via settings-core.js -> html[data-wallpaper])
            // Inject once for all pages so the background is visible everywhere.
            if (!document.querySelector('.aa-wallpaper')) {
                const w = document.createElement('div');
                w.className = 'aa-wallpaper';
                w.setAttribute('aria-hidden', 'true');
                // put it at the very top so overlays/sidebars stay above
                document.body.insertBefore(w, document.body.firstChild);
            }

            const mountEl = document.getElementById('aaSidebarMount');
            const contentEl = document.querySelector('.aa-content');
            if (!mountEl || !contentEl) return;

            mountEl.appendChild(makeSidebar());

            const btn = document.getElementById('aaSidebarToggle');
            const overlay = document.getElementById('aaOverlay');
            const sidebar = document.getElementById('aaSidebar');

            // On mobile, a vertical scroll inside the drawer can end with the finger
            // slightly outside of it (on the overlay). Some browsers then fire the
            // overlay tap/click and the drawer closes "immediately".
            // We detect drawer interactions and temporarily ignore overlay taps.
            let drawerTouchActive = false;
            let ignoreOverlayTap = false;
            let startX = 0;
            let startY = 0;
            let lastX = 0;
            let lastY = 0;
            const SWIPE_CLOSE_PX = 90; // swipe-left to close (higher threshold to avoid accidental closes while scrolling)
            const MOVE_TOLERANCE_PX = 12; // treat as scroll/drag (not a tap)

            const close = () => {
                document.documentElement.classList.remove('aa-nav-open');
            };
            const open = () => {
                document.documentElement.classList.add('aa-nav-open');
            };

            if (btn) btn.addEventListener('click', (e) => {
                // Defensive: don't let the same tap/click bubble into other handlers.
                e.stopPropagation();



                document.documentElement.classList.contains('aa-nav-open') ? close() : open();
            });


            // Variant B (mobile): drawer is controlled by swipe+drag (no overlay taps).
            const isMobile = () => window.matchMedia('(max-width: 980px)').matches;

            // Ensure author profiles are available for pills / modal / notifications
            function ensureScript(src, globalCheck) {
                return new Promise((resolve) => {
                    try {
                        if (!globalCheck || globalCheck()) return resolve();
                        const existing = Array.from(document.scripts).find(s => (s.getAttribute('src') || '').includes(src));
                        if (existing) {
                            existing.addEventListener('load', () => resolve(), { passive: true });
                            existing.addEventListener('error', () => resolve(), { passive: true });
                            return;
                        }
                        const s = document.createElement('script');
                        s.src = src;
                        s.async = true;
                        s.addEventListener('load', () => resolve(), { passive: true });
                        s.addEventListener('error', () => resolve(), { passive: true });
                        document.body.appendChild(s);
                    } catch {
                        resolve();
                    }
                });
            }

            // Overlay is visual-only on mobile (prevents "ghost closes" after scroll).
            if (overlay) {
                const applyOverlayPE = () => { overlay.style.pointerEvents = isMobile() ? 'none' : ''; };
                applyOverlayPE();
                window.addEventListener('resize', applyOverlayPE, { passive: true });
            }

            // --- Swipe hint (mobile) ---
            if (!document.querySelector('.aa-swipe-hint')) {
                const hint = document.createElement('div');
                hint.className = 'aa-swipe-hint';
                hint.setAttribute('aria-hidden', 'true');
                document.body.appendChild(hint);
            }

            // --- Drag open from the middle (avoids system back-gesture on the edge) ---
            let dragActive = false;
            let dragStartX = 0;
            let dragStartY = 0;
            let dragMount = null;
            let dragW = 0;
            let dragHiddenX = 0; // negative px
            let dragLastX = 0;
            let dragLastY = 0;
            let dragWasHorizontal = false;

            function getOpenZone() {
                const w = window.innerWidth || 360;
                // Phone: wider zone; Tablet: narrower (less accidental)
                if (w <= 520) return { min: Math.round(w * 0.18), max: Math.round(w * 0.92) };
                return { min: Math.round(w * 0.28), max: Math.round(w * 0.85) };
            }

            function shouldIgnoreStartTarget(target) {
                const el = target && (target.closest ? target.closest('input,textarea,select,button,[contenteditable="true"]') : null);
                if (el) return true;
                // Don't start swipe on horizontal scrollers
                const sc = target && target.closest ? target.closest('[data-no-drawer-swipe],.aa-no-drawer-swipe') : null;
                return !!sc;
            }

            function setMountTransform(x, immediate) {
                if (!dragMount) return;
                if (immediate) dragMount.style.transition = 'none';
                dragMount.style.transform = `translate3d(${x}px,0,0)`;
            }

            function clearMountTransform() {
                if (!dragMount) return;
                dragMount.style.transition = '';
                dragMount.style.transform = '';
            }

            document.addEventListener('touchstart', (e) => {
                if (!isMobile()) return;
                if (document.documentElement.classList.contains('aa-nav-open')) return;

                const t = e.touches && e.touches[0];
                if (!t) return;

                if (shouldIgnoreStartTarget(e.target)) return;

                const { min, max } = getOpenZone();
                const x = t.clientX;
                // Hard-block very left edge (system back gesture zone)
                if (x < 26) return;
                if (x < min || x > max) return;

                dragMount = document.getElementById('aaSidebarMount');
                if (!dragMount) return;

                const rect = dragMount.getBoundingClientRect();
                dragW = rect.width || 320;
                dragHiddenX = -Math.round(dragW + 28); // fully hidden
                dragStartX = dragLastX = x;
                dragStartY = dragLastY = t.clientY;
                dragActive = true;
                dragWasHorizontal = false;

                // start just slightly visible (gives feedback)
                setMountTransform(dragHiddenX + 8, true);
            }, { passive: true });

            document.addEventListener('touchmove', (e) => {
                if (!dragActive || !isMobile()) return;
                const t = e.touches && e.touches[0];
                if (!t) return;

                dragLastX = t.clientX;
                dragLastY = t.clientY;

                const dx = dragLastX - dragStartX;
                const dy = dragLastY - dragStartY;

                // If user scrolls vertically => cancel drag and restore.
                if (!dragWasHorizontal && Math.abs(dy) > 22 && Math.abs(dy) > Math.abs(dx)) {
                    dragActive = false;
                    clearMountTransform();
                    return;
                }

                // Horizontal intent
                if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
                    dragWasHorizontal = true;
                    e.preventDefault(); // keep page from jitter-scrolling
                }

                if (!dragWasHorizontal) return;

                // translate from hidden to open as you drag right
                const x = Math.min(0, Math.max(dragHiddenX, dragHiddenX + dx));
                setMountTransform(x, true);
            }, { passive: false });

            document.addEventListener('touchend', () => {
                if (!dragActive || !isMobile()) return;
                dragActive = false;

                if (!dragMount) return;

                const dx = dragLastX - dragStartX;
                const dy = dragLastY - dragStartY;

                // Only open on a clear swipe-right / drag far enough.
                const openEnough = (dragHiddenX + dx) > (-dragW * 0.45);
                const clearSwipe = dx > 70 && Math.abs(dx) > Math.abs(dy) * 1.2;

                clearMountTransform();

                if (dragWasHorizontal && (openEnough || clearSwipe)) {
                    open();
                }
            }, { passive: true });

            // --- Notifications + Author modal (works on all pages) ---
            const LS_FAV_AUTHORS = 'aa:favAuthors';
            const LS_LAST_SEEN = 'aa:lastSeenByAuthor'; // legacy (lectures only)
            const LS_SEEN_KEYS = 'aa:seenKeysByAuthor'; // new (any material types)

            function readJSON(key, fallback) {
                try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
            }

            function writeJSON(key, val) {
                try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
            }

            function getFavAuthors() {
                const a = readJSON(LS_FAV_AUTHORS, []);
                return Array.isArray(a) ? a : [];
            }

            function setFavAuthors(arr) {
                const clean = Array.from(new Set((arr || []).filter(Boolean)));
                writeJSON(LS_FAV_AUTHORS, clean);
                document.dispatchEvent(new CustomEvent('aa:favAuthorsChanged'));
            }

            function readSeenKeys() {
                const v = readJSON(LS_SEEN_KEYS, {}) || {};
                return (v && typeof v === 'object') ? v : {};
            }

            function writeSeenKeys(map) {
                writeJSON(LS_SEEN_KEYS, map || {});
            }

            function markKeyRead(authorId, key) {
                if (!authorId || !key) return;
                const m = readSeenKeys();
                const arr = Array.isArray(m[authorId]) ? m[authorId] : [];
                if (arr.includes(key)) return;
                arr.unshift(key);
                m[authorId] = arr.slice(0, 200);
                writeSeenKeys(m);
            }

            function markAllKeysReadForAuthor(authorId, keys) {
                if (!authorId) return;
                const m = readSeenKeys();
                const cur = new Set(Array.isArray(m[authorId]) ? m[authorId] : []);
                (keys || []).forEach(k => cur.add(k));
                m[authorId] = Array.from(cur).slice(0, 200);
                writeSeenKeys(m);
            }

            function ensureModal() {
                if (document.querySelector('.aa-modal')) return;

                const modal = document.createElement('div');
                modal.className = 'aa-modal';
                modal.innerHTML = `
      <div class="aa-modal__backdrop" data-close="1"></div>
      <div class="aa-modal__panel" role="dialog" aria-modal="true" aria-label="Автор">
        <button class="aa-modal__close" type="button" aria-label="Закрыть" data-close="1">✕</button>
        <div id="aaAuthorHost"></div>
      </div>
    `;
                document.body.appendChild(modal);

                const closeModal = () => modal.classList.remove('is-open');
                modal.addEventListener('click', (e) => {
                    if (e.target && e.target.getAttribute && e.target.getAttribute('data-close') === '1') closeModal();
                });
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') closeModal();
                });
            }

            function openAuthorModal(authorName) {
                ensureModal();
                const modal = document.querySelector('.aa-modal');
                const host = document.getElementById('aaAuthorHost');
                if (!modal || !host) return;

                const getProfile = window.getAuthorProfile || ((name) => ({ id: (name || 'author').toLowerCase(), name: name || 'Автор', role: '', avatar: 'icon.svg', bio: '' }));
                const p = getProfile(authorName);

                const fav = getFavAuthors();
                const isFav = fav.includes(p.id);

                host.innerHTML = `
      <div class="aa-author">
        <div class="aa-author__ava"><img src="${p.avatar || 'icon.svg'}" alt=""></div>
        <div>
          <h3 class="aa-author__title">${(p.name || 'Автор')}</h3>
          ${p.role ? `<div class="aa-author__role">${p.role}</div>` : ''}
          ${p.bio ? `<div class="aa-author__bio">${p.bio}</div>` : ''}
          <div class="aa-author__actions">
            <button class="aa-btn aa-btn--primary" type="button" id="aaFollowBtn">${isFav ? '★ В избранных' : '☆ В избранное'}</button>
            <a class="aa-btn" href="author.html?id=${encodeURIComponent(p.id)}" title="Страница автора">Профиль</a>
            <a class="aa-btn" href="search.html?q=${encodeURIComponent(p.name || '')}" title="Найти материалы автора">Поиск</a>
          </div>
        </div>
      </div>
    `;

    const btn = document.getElementById('aaFollowBtn');
    if (btn) {
        btn.addEventListener('click', () => {
            const now = getFavAuthors();
            const next = now.includes(p.id) ? now.filter(x => x !== p.id) : now.concat([p.id]);
            setFavAuthors(next);
            openAuthorModal(authorName); // rerender
        }, { passive: true });
    }

    modal.classList.add('is-open');
}

// Click handler for author pills anywhere
document.addEventListener('click', (e) => {
    const btn = e.target && e.target.closest ? e.target.closest('.author-pill') : null;
    if (!btn) return;
    const name = btn.getAttribute('data-author') || btn.textContent || '';
    if (!name.trim()) return;
    e.preventDefault();
    e.stopPropagation();
    openAuthorModal(name.trim());
}, true);

// One-click follow/unfollow (⭐) inside cards
function updateFollowButtons() {
    const fav = getFavAuthors();
    document.querySelectorAll('.author-follow').forEach((b) => {
        const name = b.getAttribute('data-author') || '';
        const id = (window.getAuthorId ? window.getAuthorId(name) : (name || '').toLowerCase());
        const on = fav.includes(id);
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        b.setAttribute('title', on ? 'Автор в избранном' : 'Добавить автора в избранное');
        b.textContent = on ? '★' : '☆';
    });
}

document.addEventListener('click', (e) => {
    const btn = e.target && e.target.closest ? e.target.closest('.author-follow') : null;
    if (!btn) return;
    const name = btn.getAttribute('data-author') || '';
    if (!name.trim()) return;
    e.preventDefault();
    e.stopPropagation();

    const id = (window.getAuthorId ? window.getAuthorId(name) : (name || '').toLowerCase());
    const cur = getFavAuthors();
    const next = cur.includes(id) ? cur.filter(x => x !== id) : cur.concat([id]);
    setFavAuthors(next);
    updateFollowButtons();
}, true);

// --- Bell UI in topbar ---
function ensureBell() {
    const topbar = document.querySelector('.aa-topbar');
    if (!topbar) return null;

    let actions = topbar.querySelector('.aa-topbar__actions');
    if (!actions) {
        actions = document.createElement('div');
        actions.className = 'aa-topbar__actions';
        topbar.appendChild(actions);
    }

    if (actions.querySelector('.aa-notify')) return actions.querySelector('.aa-notify');

    const wrap = document.createElement('div');
    wrap.className = 'aa-notify';
    wrap.innerHTML = `
      <button class="aa-bell" type="button" id="aaBell" aria-label="Уведомления">
        <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
          <path d="M12 22a2.5 2.5 0 0 0 2.45-2H9.55A2.5 2.5 0 0 0 12 22zm6-6V11a6 6 0 1 0-12 0v5L4 18v1h16v-1l-2-2z" fill="currentColor"/>
        </svg>
        <span class="aa-bell__badge" id="aaBellBadge">0</span>
      </button>
      <div class="aa-notify__panel" id="aaNotifyPanel" role="menu" aria-label="Уведомления">
        <div class="aa-notify-head">
          <div class="t">Уведомления</div>
          <div class="sp"></div>
          <button type="button" id="aaNotifyMarkAll" title="Отметить всё как прочитанное">Прочитать</button>
          <button type="button" id="aaNotifyClose" title="Закрыть">✕</button>
        </div>
        <div class="aa-notify-list" id="aaNotifyList"></div>
      </div>
    `;
    actions.appendChild(wrap);
    return wrap;
}

function buildLectionHref(lection) {
    const href = `markdown-viewer.html?file=${encodeURIComponent(lection.file || '')}` +
        `&title=${encodeURIComponent(lection.title || '')}` +
        `&category=${encodeURIComponent(lection.category || '')}` +
        `&subcategory=${encodeURIComponent(lection.subcategory || '')}` +
        `&author=${encodeURIComponent(lection.author || '')}`;
    return href;
}

function buildResourceHref(res) {
    return `item.html?id=${encodeURIComponent(res.id || '')}`;
}

function normalizeTypeLabel(type) {
    try {
        if (window.getTypeLabel) return window.getTypeLabel(type);
    } catch {}
    return type || 'Ресурс';
}

function computeNotifications() {
    const fav = getFavAuthors();
    const lections = Array.isArray(window.lections) ? window.lections : [];
    const it = Array.isArray(window.itResources) ? window.itResources : [];
    const custom = Array.isArray(window.customizationResources) ? window.customizationResources : [];
    const seenMap = readSeenKeys();

    const list = [];

    // Lectures
    for (const l of lections) {
        const name = l.author || '';
        if (!name) continue;
        const aid = (window.getAuthorId ? window.getAuthorId(name) : (name || '').toLowerCase());
        if (!fav.includes(aid)) continue;

        const key = `lecture:${String(l.id ?? '')}`;
        const seen = Array.isArray(seenMap[aid]) ? seenMap[aid] : [];
        if (seen.includes(key)) continue;

        list.push({
            authorId: aid,
            authorName: name || 'Автор',
            key,
            title: l.title || 'Материал',
            href: buildLectionHref(l),
            kind: 'Лекция',
            sortKey: Number(l.id || 0),
        });
    }

    // Resources (any type) — requires `author` field in resource objects
    const resources = [...it, ...custom];
    for (const r of resources) {
        const name = r.author || '';
        if (!name) continue;
        const aid = (window.getAuthorId ? window.getAuthorId(name) : (name || '').toLowerCase());
        if (!fav.includes(aid)) continue;

        const key = `resource:${String(r.id ?? '')}`;
        const seen = Array.isArray(seenMap[aid]) ? seenMap[aid] : [];
        if (seen.includes(key)) continue;

        list.push({
            authorId: aid,
            authorName: name || 'Автор',
            key,
            title: r.title || 'Материал',
            href: buildResourceHref(r),
            kind: normalizeTypeLabel(r.type) || 'Ресурс',
            sortKey: Number(r.id || 0),
        });
    }

    // newest first
    list.sort((a, b) => (b.sortKey || 0) - (a.sortKey || 0));
    return list;
}

function renderNotifications() {
    const wrap = ensureBell();
    if (!wrap) return;

    const badge = document.getElementById('aaBellBadge');
    const panel = document.getElementById('aaNotifyPanel');
    const listEl = document.getElementById('aaNotifyList');
    if (!badge || !panel || !listEl) return;

    const notes = computeNotifications();
    badge.textContent = String(notes.length);
    badge.classList.toggle('is-on', notes.length > 0);

    if (!notes.length) {
        const fav = getFavAuthors();
        listEl.innerHTML = fav.length
          ? `<div class="aa-notify-empty">Пока нет новых материалов от избранных авторов.</div>`
          : `<div class="aa-notify-empty">Добавь автора в избранное — и здесь появятся обновления.</div>`;
        return;
    }

    listEl.innerHTML = notes.map(n => `
      <a class="aa-notify-item" href="${n.href}" data-author-id="${n.authorId}" data-key="${encodeURIComponent(n.key)}">
        <span class="dot" aria-hidden="true"></span>
        <div>
          <div class="h">${n.title}</div>
          <div class="s">${n.kind} · ${n.authorName}</div>
        </div>
      </a>
    `).join('');
}

function markRead(authorId, key) {
    markKeyRead(authorId, key);
}

function markAllRead() {
    const fav = getFavAuthors();
    const notes = computeNotifications();
    const byAuthor = {};
    for (const n of notes) {
        if (!byAuthor[n.authorId]) byAuthor[n.authorId] = [];
        byAuthor[n.authorId].push(n.key);
    }
    for (const aid of fav) {
        markAllKeysReadForAuthor(aid, byAuthor[aid] || []);
    }
}

function wireBell() {
    const wrap = ensureBell();
    if (!wrap) return;

    const btn = document.getElementById('aaBell');
    const panel = document.getElementById('aaNotifyPanel');
    const closeBtn = document.getElementById('aaNotifyClose');
    const markAllBtn = document.getElementById('aaNotifyMarkAll');

    const closePanel = () => { if (panel) panel.style.display = 'none'; };
    const openPanel = () => { if (panel) panel.style.display = 'block'; renderNotifications(); };

    if (btn && panel) {
        btn.addEventListener('click', () => {
            panel.style.display === 'block' ? closePanel() : openPanel();
        }, { passive: true });
    }
    if (closeBtn) closeBtn.addEventListener('click', closePanel, { passive: true });
    if (markAllBtn) markAllBtn.addEventListener('click', () => { markAllRead(); renderNotifications(); }, { passive: true });

    document.addEventListener('click', (e) => {
        if (!panel || panel.style.display !== 'block') return;
        if (e.target.closest && (e.target.closest('#aaNotifyPanel') || e.target.closest('#aaBell'))) return;
        closePanel();
    });

    // Mark read on click
    document.addEventListener('click', (e) => {
        const a = e.target && e.target.closest ? e.target.closest('.aa-notify-item') : null;
        if (!a) return;
        const aid = a.getAttribute('data-author-id');
        const k = a.getAttribute('data-key');
        if (aid && k) markKeyRead(aid, decodeURIComponent(k));
        // let navigation happen
        setTimeout(renderNotifications, 50);
    }, true);
}

// Load data once and render bell
(async () => {
    await ensureScript('authors.js', () => !!window.getAuthorProfile);
    await ensureScript('lections.js', () => Array.isArray(window.lections));
    await ensureScript('data.js', () => Array.isArray(window.itResources) && Array.isArray(window.customizationResources));
    wireBell();
    renderNotifications();
    updateFollowButtons();
    document.addEventListener('aa:favAuthorsChanged', () => updateFollowButtons(), { passive: true });
    document.addEventListener('aa:favAuthorsChanged', () => renderNotifications(), { passive: true });
})();





        // Prevent taps inside the sidebar from bubbling to the overlay.
        if (sidebar) {
            // Allow scrolling/clicking inside the drawer without triggering overlay.
            sidebar.addEventListener('pointerdown', (e) => {
                e.stopPropagation();
                if (e.pointerType === 'touch') {
                    drawerTouchActive = true;
                    ignoreOverlayTap = false;
                    startX = lastX = e.clientX;
                    startY = lastY = e.clientY;
                }
            });

            sidebar.addEventListener('pointermove', (e) => {
                e.stopPropagation();
                if (!drawerTouchActive || e.pointerType !== 'touch') return;

                lastX = e.clientX;
                lastY = e.clientY;

                const dx = lastX - startX;
                const dy = lastY - startY;

                // If user is scrolling/dragging, don't let the overlay "receive" the final tap.
                if (Math.hypot(dx, dy) > MOVE_TOLERANCE_PX) {
                    ignoreOverlayTap = true;
                }
            });

            const endTouch = () => {
                if (!drawerTouchActive) return;
                const dx = lastX - startX;
                const dy = lastY - startY;

                // Swipe-left to close (but ignore mostly-vertical scrolls).
                if (dx < -SWIPE_CLOSE_PX && Math.abs(dx) > Math.abs(dy) * 1.2) {
                    close();
                }

                drawerTouchActive = false;

                // Small delay so the browser-generated "click" after touchend won't
                // instantly close the drawer via overlay.
                setTimeout(() => {
                    ignoreOverlayTap = false;
                }, 80);
            };

            sidebar.addEventListener('pointerup', (e) => {
                e.stopPropagation();
                if (e.pointerType === 'touch') endTouch();
            });
            sidebar.addEventListener('pointercancel', (e) => {
                e.stopPropagation();
                if (e.pointerType === 'touch') endTouch();
            });

            // Keep legacy touch events only for propagation (some older browsers)
            sidebar.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
            sidebar.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });
            sidebar.addEventListener('click', (e) => {
                e.stopPropagation();
                const a = e.target.closest('a');
                if (!a) return;
                close();
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


/* ===========================
   Live Wallpapers (canvas)
   Supports: particles, matrix, rain, snow
   Controlled by html[data-wallpaper], [data-wallpaper-intensity], [data-wallpaper-speed], [data-wallpaper-density], [data-wallpaper-color]
=========================== */
(() => {
    const CANVAS_TYPES = new Set(['particles', 'matrix', 'rain', 'snow']);
    let raf = 0;
    let runningType = null;
    let canvas = null;
    let ctx = null;
    let w = 0,
        h = 0,
        dpr = 1;
    let state = null;

    const $html = () => document.documentElement;

    function prefersReduced() {
        return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function getSetting(name, fallback) {
        const v = $html().dataset[name];
        return v || fallback;
    }

    function intensityAlpha() {
        const v = getSetting('wallpaperIntensity', 'normal');
        if (v === 'low') return 0.35;
        if (v === 'high') return 0.75;
        return 0.55;
    }

    function speedMul() {
        const v = getSetting('wallpaperSpeed', 'normal');
        if (v === 'slow') return 0.75;
        if (v === 'fast') return 1.35;
        return 1.0;
    }

    function densityMul() {
        const v = getSetting('wallpaperDensity', 'normal');
        if (v === 'low') return 0.75;
        if (v === 'high') return 1.35;
        return 1.0;
    }

    function colorMode() {
        return getSetting('wallpaperColor', 'auto');
    }

    function palette() {
        const mode = colorMode();
        const styles = getComputedStyle(document.documentElement);
        const primary = (styles.getPropertyValue('--primary-color') || '#667eea').trim();
        const theme = ($html().dataset.theme || '').toLowerCase();
        if (mode === 'mono') return { fg: 'rgba(255,255,255,', dim: 'rgba(255,255,255,', primary: 'rgba(255,255,255,' };
        if (mode === 'accent') return { fg: hexToRgbaPrefix(primary), dim: hexToRgbaPrefix(primary), primary: hexToRgbaPrefix(primary) };
        // auto
        if (theme === 'light') return { fg: 'rgba(30,41,59,', dim: 'rgba(30,41,59,', primary: hexToRgbaPrefix(primary) };
        return { fg: 'rgba(226,232,240,', dim: 'rgba(226,232,240,', primary: hexToRgbaPrefix(primary) };
    }

    function hexToRgbaPrefix(hex) {
        // returns 'rgba(r,g,b,' (alpha appended later)
        const h = (hex || '').replace('#', '').trim();
        const v = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
        if (v.length !== 6) return 'rgba(102,126,234,';
        const r = parseInt(v.slice(0, 2), 16),
            g = parseInt(v.slice(2, 4), 16),
            b = parseInt(v.slice(4, 6), 16);
        return `rgba(${r},${g},${b},`;
    }

    function ensureCanvas() {
        const host = document.querySelector('.aa-wallpaper');
        if (!host) return null;
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.setAttribute('aria-hidden', 'true');
            host.appendChild(canvas);
            ctx = canvas.getContext('2d', { alpha: true });
        }
        resize();
        return canvas;
    }

    function destroyCanvas() {
        stop();
        if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
        canvas = null;
        ctx = null;
    }

    function resize() {
        if (!canvas) return;
        dpr = Math.min(2, window.devicePixelRatio || 1);
        const rect = canvas.getBoundingClientRect();
        w = Math.max(1, Math.floor(rect.width));
        h = Math.max(1, Math.floor(rect.height));
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function stop() {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        runningType = null;
        state = null;
    }

    function start(type) {
        stop();
        if (prefersReduced()) return; // respect user preference
        runningType = type;
        ensureCanvas();
        if (!ctx) return;
        if (type === 'particles') state = initParticles();
        if (type === 'rain') state = initRain();
        if (type === 'snow') state = initSnow();
        if (type === 'matrix') state = initMatrix();
        loop();
    }

    function loop() {
        if (!ctx || !canvas || !runningType) return;
        if (document.hidden) { raf = requestAnimationFrame(loop); return; }
        draw();
        raf = requestAnimationFrame(loop);
    }

    function clear() {
        ctx.clearRect(0, 0, w, h);
    }

    function draw() {
        const a = intensityAlpha();
        const pal = palette();
        const s = speedMul();
        const d = densityMul();

        clear();

        if (runningType === 'particles') {
            const p = state;
            const count = p.points.length;
            ctx.globalCompositeOperation = 'lighter';
            for (let i = 0; i < count; i++) {
                const pt = p.points[i];
                pt.x += pt.vx * s;
                pt.y += pt.vy * s;
                if (pt.x < -20) pt.x = w + 20;
                if (pt.x > w + 20) pt.x = -20;
                if (pt.y < -20) pt.y = h + 20;
                if (pt.y > h + 20) pt.y = -20;

                ctx.fillStyle = pal.primary + (0.25 * a) + ')';
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
                ctx.fill();
            }
            // links
            ctx.globalCompositeOperation = 'source-over';
            ctx.lineWidth = 1;
            for (let i = 0; i < count; i++) {
                const aPt = p.points[i];
                for (let j = i + 1; j < count; j++) {
                    const bPt = p.points[j];
                    const dx = aPt.x - bPt.x,
                        dy = aPt.y - bPt.y;
                    const dist = Math.hypot(dx, dy);
                    const max = 140 / (1.0 / d);
                    if (dist < max) {
                        const alpha = (1 - dist / max) * 0.35 * a;
                        ctx.strokeStyle = pal.primary + alpha + ')';
                        ctx.beginPath();
                        ctx.moveTo(aPt.x, aPt.y);
                        ctx.lineTo(bPt.x, bPt.y);
                        ctx.stroke();
                    }
                }
            }
            return;
        }

        if (runningType === 'rain') {
            const r = state;
            const drops = r.drops;
            ctx.lineWidth = 1.4;
            ctx.lineCap = 'round';
            for (let i = 0; i < drops.length; i++) {
                const dr = drops[i];
                dr.x += dr.vx * s;
                dr.y += dr.vy * s;
                if (dr.y > h + 40 || dr.x > w + 80) {
                    dr.x = Math.random() * w - 60;
                    dr.y = -Math.random() * h * 0.35;
                }
                const alpha = (0.10 + dr.alpha * 0.22) * a;
                ctx.strokeStyle = pal.fg + alpha + ')';
                ctx.beginPath();
                ctx.moveTo(dr.x, dr.y);
                ctx.lineTo(dr.x - dr.vx * 3.2, dr.y - dr.vy * 3.2);
                ctx.stroke();
            }
            return;
        }

        if (runningType === 'snow') {
            const sn = state;
            const flakes = sn.flakes;
            for (let i = 0; i < flakes.length; i++) {
                const f = flakes[i];
                f.t += 0.01 * s;
                f.y += f.vy * s;
                f.x += Math.sin(f.t) * f.vx * s;
                if (f.y > h + 30) {
                    f.y = -20;
                    f.x = Math.random() * w;
                }
                const alpha = (0.18 + f.alpha * 0.35) * a;
                ctx.fillStyle = pal.fg + alpha + ')';
                ctx.beginPath();
                ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
                ctx.fill();
            }
            return;
        }

        if (runningType === 'matrix') {
            const m = state;
            const cols = m.cols;
            const charSet = m.chars;
            const size = m.size;
            const alphaBase = a;
            ctx.font = `${size}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
            ctx.textBaseline = 'top';
            for (let i = 0; i < cols.length; i++) {
                const c = cols[i];
                c.y += c.vy * s;
                if (c.y > h + size * 10) {
                    c.y = -Math.random() * h * 0.5;
                    c.vy = (1.8 + Math.random() * 3.2) * (0.75 + d * 0.35);
                }
                const x = c.x;
                // tail
                for (let t = 0; t < c.len; t++) {
                    const yy = c.y - t * size * 1.15;
                    if (yy < -size * 2 || yy > h + size * 2) continue;
                    const ch = charSet[(Math.random() * charSet.length) | 0];
                    const fade = (1 - t / c.len);
                    const alpha = (0.05 + fade * 0.45) * alphaBase;
                    ctx.fillStyle = pal.primary + alpha + ')';
                    ctx.fillText(ch, x, yy);
                }
            }
            return;
        }
    }

    function initParticles() {
        const count = Math.round(28 * densityMul() + (Math.min(w, h) / 50));
        const points = [];
        for (let i = 0; i < count; i++) {
            points.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() * 0.6 - 0.3),
                vy: (Math.random() * 0.6 - 0.3),
                r: 1 + Math.random() * 2.2
            });
        }
        return { points };
    }

    function initRain() {
        const count = Math.round((120 + (w / 8)) * densityMul());
        const drops = [];
        for (let i = 0; i < count; i++) {
            const sp = 5 + Math.random() * 7;
            drops.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: 2.4 + Math.random() * 1.6,
                vy: sp,
                alpha: Math.random()
            });
        }
        return { drops };
    }

    function initSnow() {
        const count = Math.round((70 + (w / 14)) * densityMul());
        const flakes = [];
        for (let i = 0; i < count; i++) {
            flakes.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vy: 0.6 + Math.random() * 1.6,
                vx: 0.3 + Math.random() * 0.8,
                r: 1.2 + Math.random() * 2.6,
                alpha: Math.random(),
                t: Math.random() * Math.PI * 2
            });
        }
        return { flakes };
    }

    function initMatrix() {
        const size = 14;
        const colCount = Math.max(10, Math.floor(w / (size * 1.05)));
        const cols = [];
        for (let i = 0; i < colCount; i++) {
            cols.push({
                x: i * (w / colCount),
                y: Math.random() * h,
                vy: (2 + Math.random() * 3.5) * (0.75 + densityMul() * 0.25),
                len: 8 + Math.floor(Math.random() * 12 * densityMul())
            });
        }
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789';
        return { cols, chars: chars.split(''), size };
    }

    function currentType() {
        return getSetting('wallpaper', 'none');
    }

    function apply() {
        const type = currentType();
        if (!CANVAS_TYPES.has(type)) {
            // css wallpapers
            destroyCanvas();
            return;
        }
        start(type);
    }

    // Observe dataset changes (settings)
    const obs = new MutationObserver(() => apply());

    function init() {
        const html = document.documentElement;
        obs.observe(html, { attributes: true, attributeFilter: ['data-wallpaper', 'data-wallpaper-intensity', 'data-wallpaper-speed', 'data-wallpaper-density', 'data-wallpaper-color', 'data-theme'] });
        window.addEventListener('resize', () => {
            resize();
            // re-init state to match new size
            if (runningType) start(runningType);
        }, { passive: true });
        document.addEventListener('visibilitychange', () => {
            // keep loop alive; no heavy work when hidden
        });
        apply();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // expose for debugging
    window.__AA_WP__ = { apply };
})();