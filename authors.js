// authors.js — author profiles + follow helpers
(() => {
  const DEFAULT_AVATAR = 'icon.svg';

  // Extend this list whenever you add new authors.
  const AUTHORS = [
    {
      id: 'syntax_syndicate',
      name: 'Syntax_Syndicate',
      role: 'Команда',
      avatar: 'icon.svg',
      bio: 'Команда/проект, который собирает и оформляет базу знаний. Публикуем материалы, делаем поиск, граф, офлайн и PWA.',
      links: { site: 'index.html' },
    },
    {
      id: 'uncledeny',
      name: 'UncleDeniy',
      role: 'DevOps / Security',
      avatar: 'icon.svg',
      bio: 'Практик DevOps и сетевой безопасности. Пишу прикладные лекции: диагностика, трафик, протоколы, Kubernetes и blue-team workflow.',
      links: { site: 'index.html' },
    }
  ];

  function slugify(name) {
    return (name || '')
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[_\s]+/g, '-')
      .replace(/[^a-z0-9\-а-яё]/gi, '')
      .replace(/\-+/g, '-')
      .replace(/^\-+|\-+$/g, '')
      .slice(0, 64) || 'author';
  }

  function getAuthorId(name) {
    // Known mapping first
    const exact = AUTHORS.find(a => a.name === name);
    if (exact) return exact.id;
    // Fallback
    return slugify(name);
  }

  function getAuthor(authorName) {
    const id = getAuthorId(authorName);
    const found = AUTHORS.find(a => a.id === id) || AUTHORS.find(a => a.name === authorName);
    if (found) return found;

    // Auto-generate profile for unknown authors.
    return {
      id,
      name: authorName || 'Автор',
      role: 'Автор',
      avatar: DEFAULT_AVATAR,
      bio: 'Автор материалов на сайте. Добавь в избранное, чтобы получать уведомления о новых публикациях.',
      links: {},
    };
  }

  // Favorites (follow)
  const LS_FAV = 'aa:favAuthors';

  function readFavs() {
    try {
      const raw = localStorage.getItem(LS_FAV);
      const v = raw ? JSON.parse(raw) : [];
      return Array.isArray(v) ? v : [];
    } catch {
      return [];
    }
  }

  function writeFavs(list) {
    try { localStorage.setItem(LS_FAV, JSON.stringify(list)); } catch {}
  }

  function isFav(authorId) {
    return readFavs().includes(authorId);
  }

  function toggleFav(authorId) {
    const list = readFavs();
    const i = list.indexOf(authorId);
    if (i >= 0) list.splice(i, 1);
    else list.push(authorId);
    writeFavs(list);
    return list;
  }

  // Expose to window
  window.Authors = {
    AUTHORS,
    getAuthorId,
    getAuthor,
    readFavs,
    writeFavs,
    isFav,
    toggleFav,
  };
})();
