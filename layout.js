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


// Variant B (mobile): drawer is controlled by edge-swipe, not by tapping the overlay.
const isMobile = () => window.matchMedia('(max-width: 980px)').matches;

// Overlay is visual-only on mobile (prevents "ghost closes" after scroll).
if (overlay) {
    const applyOverlayPE = () => { overlay.style.pointerEvents = isMobile() ? 'none' : ''; };
    applyOverlayPE();
    window.addEventListener('resize', applyOverlayPE, { passive: true });
}

// Edge-swipe to OPEN (swipe right from the very left edge).
const EDGE_OPEN_PX = 18;
const SWIPE_OPEN_PX = 70;
const SWIPE_MAX_Y = 42;

let edgeTracking = false;
let edgeStartX = 0;
let edgeStartY = 0;

document.addEventListener('touchstart', (e) => {
    if (!isMobile()) return;
    if (document.documentElement.classList.contains('aa-nav-open')) return;
    const t = e.touches && e.touches[0];
    if (!t) return;
    edgeStartX = t.clientX;
    edgeStartY = t.clientY;
    edgeTracking = edgeStartX <= EDGE_OPEN_PX;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
    if (!edgeTracking || !isMobile()) return;
    const t = e.touches && e.touches[0];
    if (!t) return;
    const dx = t.clientX - edgeStartX;
    const dy = t.clientY - edgeStartY;

    // Vertical scroll => cancel tracking (don't block scroll).
    if (Math.abs(dy) > SWIPE_MAX_Y && Math.abs(dy) > Math.abs(dx)) {
        edgeTracking = false;
        return;
    }

    // Horizontal gesture => prevent page scroll jitter.
    if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('touchend', (e) => {
    if (!edgeTracking || !isMobile()) return;
    edgeTracking = false;
    const t = e.changedTouches && e.changedTouches[0];
    if (!t) return;
    const dx = t.clientX - edgeStartX;
    const dy = t.clientY - edgeStartY;

    // Only open on a clear swipe-right.
    if (dx > SWIPE_OPEN_PX && Math.abs(dx) > Math.abs(dy) * 1.2) {
        open();
    }
}, { passive: true });





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