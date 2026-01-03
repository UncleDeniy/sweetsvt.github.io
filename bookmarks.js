// bookmarks.js — Личная библиотека (папки/статусы/импорт/экспорт)
(function(){
  'use strict';

  const LS_LIBRARY = 'ud:library';
  const LS_BOOKMARKS = 'ud:bookmarks'; // legacy

  const normalize = (t)=>(t||'').toString().toLowerCase().replace(/ё/g,'е').replace(/[^\p{L}\p{N}]+/gu,' ').trim();

  function readJSON(key, fallback){
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
    catch { return fallback; }
  }
  function writeJSON(key, value){ try{ localStorage.setItem(key, JSON.stringify(value)); }catch{} }

  function migrateIfNeeded(){
    const lib = readJSON(LS_LIBRARY, null);
    if (lib) return;
    const old = readJSON(LS_BOOKMARKS, []);
    const map = {};
    if (Array.isArray(old)){
      old.forEach(id => map[id] = { status:'saved', folder:'Избранное', addedAt: Date.now() });
    }
    writeJSON(LS_LIBRARY, map);
    writeJSON(LS_BOOKMARKS, Object.keys(map));
  }

  function getLibrary(){
    migrateIfNeeded();
    const lib = readJSON(LS_LIBRARY, {});
    return (lib && typeof lib === 'object') ? lib : {};
  }
  function setLibrary(lib){
    writeJSON(LS_LIBRARY, lib);
    writeJSON(LS_BOOKMARKS, Object.keys(lib));
  }

  function loadResources(){
    const out=[];
    try{ if(window.itResources) out.push(...window.itResources);}catch{}
    try{ if(window.customizationResources) out.push(...window.customizationResources);}catch{}
    try{
      if(window.lections && Array.isArray(window.lections)){
        out.push(...window.lections.map(l=>({
          id:`lecture-${l.id}`,
          title:l.title||'Лекция',
          description:l.description||'',
          link:`markdown-viewer.html?file=${encodeURIComponent(l.file||'')}`,
          tags:Array.isArray(l.tags)?l.tags:[],
          type:'lecture',
          category:l.category||'',
          subcategory:l.subcategory||'',
          author:l.author||''
        })));
      }
    }catch{}
    out.forEach((r,i)=>{ if(!r.id) r.id=`res-${i}`; });
    return out;
  }

  const TYPE_LABELS = {
    course:'Курс', program:'Программа', book:'Книга', article:'Статья', video:'Видео', tool:'Инструмент',
    library:'Библиотека', script:'Скрипт', reference:'Справочник', cheatsheet:'Шпаргалка', lecture:'Лекция'
  };
  const getTypeLabel=(t)=>TYPE_LABELS[t]|| (t||'Материал');

  const STATUS_LABELS = {
    saved: 'Сохранено',
    to_read: 'Изучить',
    in_progress: 'В работе',
    favorite: 'Избранное'
  };

  function escapeHtml(s){
    return (s||'').toString()
      .replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')
      .replaceAll('"','&quot;').replaceAll("'","&#39;");
  }

  function render(){
    const listEl = document.getElementById('bookmarksList');
    const totalEl = document.getElementById('totalBookmarks');
    const qEl = document.getElementById('librarySearch');
    const statusEl = document.getElementById('statusFilter');
    const folderEl = document.getElementById('folderFilter');

    if(!listEl) return;

    const lib = getLibrary();
    const ids = Object.keys(lib);

    if(totalEl) totalEl.textContent = String(ids.length);

    const resources = loadResources();
    const map = new Map(resources.map(r=>[r.id,r]));

    // folder options
    const folders = Array.from(new Set(ids.map(id => (lib[id]?.folder || 'Избранное')))).sort((a,b)=>a.localeCompare(b,'ru'));
    const curFolder = folderEl.value;
    folderEl.innerHTML = `<option value="">Все папки</option>` + folders.map(f=>`<option value="${escapeHtml(f)}">${escapeHtml(f)}</option>`).join('');
    if (folders.includes(curFolder)) folderEl.value = curFolder;

    const q = normalize(qEl.value);
    const st = statusEl.value;
    const fo = folderEl.value;

    const items = ids
      .map(id => {
        const r = map.get(id) || { id, title:'(не найдено)', description:'', link:'search.html', type:'' };
        return { id, r, meta: lib[id] };
      })
      .filter(o => !st || (o.meta?.status === st))
      .filter(o => !fo || (o.meta?.folder === fo))
      .filter(o => {
        if(!q) return true;
        const hay = normalize([o.r.title, o.r.description, o.r.link, (o.r.tags||[]).join(' '), o.r.author].join(' '));
        return hay.includes(q);
      })
      .sort((a,b) => (b.meta?.addedAt||0) - (a.meta?.addedAt||0));

    if(!items.length){
      listEl.innerHTML = `
        <div class="no-results">
          <div class="no-results__icon">📚</div>
          <h3>Пусто</h3>
          <p>Добавляй материалы в закладки на странице поиска.</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = items.map(o => {
      const r=o.r, m=o.meta||{};
      const status = m.status || 'saved';
      const folder = m.folder || 'Избранное';

      return `
        <article class="result-card">
          <div class="result-top">
            <div class="result-main">
              <a class="result-title" href="item.html?id=${encodeURIComponent(o.id)}">${escapeHtml(r.title||'Без названия')}</a>
              <div class="result-sub">
                <span class="badge">${escapeHtml(STATUS_LABELS[status]||status)}</span>
                <span class="badge">${escapeHtml(folder)}</span>
                ${r.type ? `<span class="result-meta">📦 ${escapeHtml(getTypeLabel(r.type))}</span>`:''}
              </div>
            </div>

            <button class="bookmark-btn2" type="button" data-remove="${escapeHtml(o.id)}" title="Удалить из библиотеки">
              <i class="fas fa-trash"></i>
            </button>
          </div>

          ${r.description ? `<div class="result-desc">${escapeHtml(r.description)}</div>`:''}

          <div class="result-actions">
            <a class="btn-link" href="${escapeHtml(r.link)}" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> Открыть</a>
            <div class="lib-inline">
              <select class="lib-select-mini" data-status="${escapeHtml(o.id)}">
                ${Object.keys(STATUS_LABELS).map(k => `<option value="${k}" ${k===status?'selected':''}>${STATUS_LABELS[k]}</option>`).join('')}
              </select>
              <input class="lib-folder" data-folder="${escapeHtml(o.id)}" value="${escapeHtml(folder)}" placeholder="Папка" />
            </div>
          </div>
        </article>
      `;
    }).join('');

    // handlers
    listEl.querySelectorAll('[data-remove]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const id = btn.getAttribute('data-remove');
        const lib2 = getLibrary();
        delete lib2[id];
        setLibrary(lib2);
        render();
      });
    });

    listEl.querySelectorAll('[data-status]').forEach(sel=>{
      sel.addEventListener('change', ()=>{
        const id = sel.getAttribute('data-status');
        const lib2 = getLibrary();
        if(!lib2[id]) return;
        lib2[id].status = sel.value;
        setLibrary(lib2);
        render();
      });
    });

    listEl.querySelectorAll('[data-folder]').forEach(inp=>{
      inp.addEventListener('change', ()=>{
        const id = inp.getAttribute('data-folder');
        const lib2 = getLibrary();
        if(!lib2[id]) return;
        lib2[id].folder = (inp.value || 'Избранное').trim();
        setLibrary(lib2);
        render();
      });
    });
  }

  function exportLibrary(){
    const lib = getLibrary();
    const data = JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), library: lib }, null, 2);
    const blob = new Blob([data], { type:'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'uncledeniY-library.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function importLibrary(file){
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        const lib = parsed.library || parsed;
        if(!lib || typeof lib !== 'object') throw new Error('Неверный формат');
        setLibrary(lib);
        render();
      } catch (e) {
        alert('Не удалось импортировать: ' + e.message);
      }
    };
    reader.readAsText(file);
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    const qEl = document.getElementById('librarySearch');
    const statusEl = document.getElementById('statusFilter');
    const folderEl = document.getElementById('folderFilter');

    qEl?.addEventListener('input', ()=>render());
    statusEl?.addEventListener('change', ()=>render());
    folderEl?.addEventListener('change', ()=>render());

    document.getElementById('exportBookmarks')?.addEventListener('click', exportLibrary);

    const importFile = document.getElementById('importFile');
    importFile?.addEventListener('change', ()=>{
      if(importFile.files && importFile.files[0]) importLibrary(importFile.files[0]);
      importFile.value='';
    });

    document.getElementById('clearBookmarks')?.addEventListener('click', ()=>{
      if(!confirm('Очистить библиотеку?')) return;
      setLibrary({});
      render();
    });

    render();
  });
})();
