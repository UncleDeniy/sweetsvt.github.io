// author.js — author page (author.html?id=...)
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  function escapeHtml(s){
    return (s || '').toString()
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll("\"", '&quot;')
      .replaceAll("'", '&#39;');
  }

  function qs() { return new URLSearchParams(location.search); }

  function getProfileByQuery() {
    const id = (qs().get('id') || '').trim();
    if (!id) return window.getAuthorById ? window.getAuthorById('author') : { id: 'author', name: 'Автор', role: 'Автор', avatar: 'icon.svg', bio: '' };
    if (window.getAuthorById) return window.getAuthorById(id);
    // fallback: try as name
    if (window.getAuthorProfile) return window.getAuthorProfile(id);
    return { id, name: id, role: 'Автор', avatar: 'icon.svg', bio: '' };
  }

  function buildHref(item) {
    if (item.kind === 'lecture') {
      return `markdown-viewer.html?file=${encodeURIComponent(item.file || '')}` +
        `&title=${encodeURIComponent(item.title || '')}` +
        `&category=${encodeURIComponent(item.category || '')}` +
        `&subcategory=${encodeURIComponent(item.subcategory || '')}` +
        `&author=${encodeURIComponent(item.author || '')}`;
    }
    return `item.html?id=${encodeURIComponent(item.id || '')}`;
  }

  function getTypeLabelSafe(t) {
    try {
      if (window.getTypeLabel) return window.getTypeLabel(t);
    } catch {}
    return t || 'Ресурс';
  }

  function getCategoryLabelSafe(c) {
    try {
      if (window.getCategoryLabel) return window.getCategoryLabel(c);
    } catch {}
    return c || '';
  }

  function collectAllItems() {
    const out = [];
    const lections = Array.isArray(window.lections) ? window.lections : [];
    const it = Array.isArray(window.itResources) ? window.itResources : [];
    const custom = Array.isArray(window.customizationResources) ? window.customizationResources : [];

    for (const l of lections) {
      out.push({
        kind: 'lecture',
        id: l.id,
        title: l.title || 'Материал',
        description: l.description || '',
        category: l.category || '',
        subcategory: l.subcategory || '',
        tags: Array.isArray(l.tags) ? l.tags : [],
        file: l.file || '',
        author: l.author || '',
        type: 'lecture',
      });
    }

    for (const r of [...it, ...custom]) {
      out.push({
        kind: 'resource',
        id: r.id,
        title: r.title || 'Материал',
        description: r.description || '',
        category: r.category || '',
        subcategory: r.subcategory || '',
        tags: Array.isArray(r.tags) ? r.tags : [],
        link: r.link || '',
        author: r.author || '',
        type: r.type || 'resource',
      });
    }

    return out;
  }

  function matchesText(item, q) {
    if (!q) return true;
    const s = (x) => (x || '').toString().toLowerCase();
    const hay = [
      item.title,
      item.description,
      item.category,
      item.subcategory,
      item.type,
      item.link,
      ...(item.tags || [])
    ].map(s).join(' ');
    return hay.includes(q);
  }

  function render() {
    const profile = getProfileByQuery();
    const authorName = (profile.name || '').trim();
    const authorId = profile.id;

    const top = $('#authorTopTitle');
    if (top) top.textContent = `👤 ${authorName || 'Автор'}`;
    document.title = `${authorName || 'Автор'} | Syntax_Syndicate`;

    const hero = $('#authorHero');
    if (hero) {
      const links = profile.links || {};
      const linkItems = Object.entries(links)
        .filter(([, v]) => !!v)
        .map(([k, v]) => {
          const icon = k === 'github' ? 'fab fa-github' : (k === 'telegram' ? 'fab fa-telegram' : 'fas fa-link');
          return `<a href="${escapeHtml(v)}" target="_blank" rel="noopener"><i class="${icon}"></i> ${escapeHtml(k)}</a>`;
        }).join('');

      hero.innerHTML = `
        <div class="author-hero surface">
          <div class="author-hero__ava"><img src="${escapeHtml(profile.avatar || 'icon.svg')}" alt=""></div>
          <div>
            <h1 class="author-hero__title">${escapeHtml(authorName || 'Автор')}</h1>
            <div class="author-hero__role">${escapeHtml(profile.role || 'Автор')}</div>
            ${profile.bio ? `<div class="author-hero__bio">${escapeHtml(profile.bio)}</div>` : ''}
            <div class="author-hero__actions">
              <button class="btn-primary" id="authorFollowBtn" type="button">☆ Подписаться</button>
              <a class="btn-ghost" href="search.html?q=${encodeURIComponent(authorName)}"><i class="fas fa-search"></i> Поиск по автору</a>
            </div>
            ${linkItems ? `<div class="author-hero__links">${linkItems}</div>` : ''}
          </div>
        </div>
      `;
    }

    // Follow state
    const updateFollowBtn = () => {
      const fav = (window.Authors && window.Authors.readFavs) ? window.Authors.readFavs() : [];
      const on = fav.includes(authorId);
      const b = $('#authorFollowBtn');
      if (!b) return;
      b.textContent = on ? '★ В подписках' : '☆ Подписаться';
      b.classList.toggle('is-on', on);
    };

    document.addEventListener('click', (e) => {
      const b = e.target && e.target.closest ? e.target.closest('#authorFollowBtn') : null;
      if (!b) return;
      e.preventDefault();
      const fav = (window.Authors && window.Authors.readFavs) ? window.Authors.readFavs() : [];
      const next = fav.includes(authorId) ? fav.filter(x => x !== authorId) : fav.concat([authorId]);
      if (window.Authors && window.Authors.writeFavs) window.Authors.writeFavs(next);
      document.dispatchEvent(new CustomEvent('aa:favAuthorsChanged'));
      updateFollowBtn();
    }, { passive: false });

    updateFollowBtn();

    // Build feed
    const all = collectAllItems();
    const onlyAuthor = all.filter(x => (x.author || '').trim() === authorName);

    // Fill filter selects
    const typeSel = $('#authorType');
    const catSel = $('#authorCat');

    const uniq = (arr) => Array.from(new Set(arr.filter(Boolean))).sort((a,b) => a.localeCompare(b, 'ru'));
    const types = uniq(onlyAuthor.map(x => x.kind === 'lecture' ? 'lecture' : (x.type || 'resource')));
    const cats = uniq(onlyAuthor.map(x => x.category));

    function fillSelect(sel, items, labelFn) {
      if (!sel) return;
      const current = sel.value;
      sel.innerHTML = `<option value="">Все</option>` + items.map(v => `<option value="${escapeHtml(v)}">${escapeHtml(labelFn(v))}</option>`).join('');
      sel.value = current;
    }

    fillSelect(typeSel, types, (t) => t === 'lecture' ? '📚 Лекции' : `📦 ${getTypeLabelSafe(t)}`);
    fillSelect(catSel, cats, (c) => getCategoryLabelSafe(c) || c);

    const state = {
      q: '',
      type: '',
      cat: '',
      sort: 'new',
    };

    const qInp = $('#authorQ');
    const sortSel = $('#authorSort');

    if (qInp) qInp.addEventListener('input', () => { state.q = (qInp.value || '').toLowerCase().trim(); paint(); });
    if (typeSel) typeSel.addEventListener('change', () => { state.type = typeSel.value; paint(); });
    if (catSel) catSel.addEventListener('change', () => { state.cat = catSel.value; paint(); });
    if (sortSel) sortSel.addEventListener('change', () => { state.sort = sortSel.value; paint(); });

    function sortKey(x) {
      // Prefer numeric id if present
      const n = Number(x.id);
      if (Number.isFinite(n)) return n;
      return 0;
    }

    function paint() {
      const feed = $('#authorFeed');
      const count = $('#authorCount');
      if (!feed) return;

      let list = onlyAuthor.slice();
      if (state.q) list = list.filter(x => matchesText(x, state.q));
      if (state.type) {
        list = list.filter(x => (state.type === 'lecture') ? x.kind === 'lecture' : (x.kind === 'resource' && (x.type || 'resource') === state.type));
      }
      if (state.cat) list = list.filter(x => (x.category || '') === state.cat);

      if (state.sort === 'az') list.sort((a,b) => (a.title || '').localeCompare(b.title || '', 'ru'));
      else list.sort((a,b) => sortKey(b) - sortKey(a));

      if (count) count.textContent = String(list.length);

      if (!list.length) {
        feed.innerHTML = `<div class="aa-notify-empty">Ничего не найдено по фильтрам.</div>`;
        return;
      }

      feed.innerHTML = list.map((x) => {
        const badge = x.kind === 'lecture' ? '📚 Лекция' : `📦 ${escapeHtml(getTypeLabelSafe(x.type))}`;
        const meta = [
          x.category ? escapeHtml(getCategoryLabelSafe(x.category) || x.category) : '',
          x.subcategory ? escapeHtml(x.subcategory) : ''
        ].filter(Boolean).join(' · ');
        const href = buildHref(x);

        return `
          <article class="author-item">
            <div class="author-item__top">
              <div class="author-item__badge">${badge}</div>
              <div>
                <h3 class="author-item__title"><a href="${href}" class="result-title">${escapeHtml(x.title)}</a></h3>
                ${meta ? `<div class="author-item__meta">${meta}</div>` : ''}
              </div>
            </div>
            ${x.description ? `<div class="author-item__desc">${escapeHtml(x.description)}</div>` : ''}
            <div class="author-item__actions">
              <a class="btn-primary" href="${href}">${x.kind === 'lecture' ? '<i class="fas fa-book-open"></i> Читать' : '<i class="fas fa-info-circle"></i> Подробнее'}</a>
              ${x.kind === 'resource' && x.link ? `<a class="btn-link" href="${escapeHtml(x.link)}" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> Открыть</a>` : ''}
            </div>
          </article>
        `;
      }).join('');
    }

    // Initial
    paint();
  }

  // Wait until data + authors loaded (layout.js loads them too, but author.html includes scripts explicitly)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render, { passive: true });
  } else {
    render();
  }
})();
