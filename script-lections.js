document.addEventListener('DOMContentLoaded', function() {
            const lectionsList = document.getElementById('lectionsList');
            const searchInput = document.getElementById('searchInput');
            const categoryFilter = document.getElementById('categoryFilter');
            const subcategoryFilter = document.getElementById('subcategoryFilter');
            const clearFilters = document.getElementById('clearFilters');
            const totalLections = document.getElementById('totalLections');
            const uniqueCategories = document.getElementById('uniqueCategories');
            const uniqueSubcategories = document.getElementById('uniqueSubcategories');

            let lections = [];

            // Chips UI (like on search page)
            const chipsHost = document.getElementById('activeChips');

            // Проверяем, есть ли лекции
            if (!window.lections || window.lections.length === 0) {
                showNoLections();
                return;
            }

            lections = window.lections;
            init();

            function init() {
                displayLections(lections);
                updateStats();
                populateSubcategories();
                renderActiveChips();

                searchInput.addEventListener('input', filterLections);
                categoryFilter.addEventListener('change', function() {
                    populateSubcategories();
                    filterLections();
                });
                subcategoryFilter.addEventListener('change', filterLections);

                clearFilters.addEventListener('click', function() {
                    searchInput.value = '';
                    categoryFilter.value = '';
                    subcategoryFilter.value = '';
                    populateSubcategories();
                    filterLections();
                });
            }

            function populateSubcategories() {
                const category = categoryFilter.value;
                subcategoryFilter.innerHTML = '<option value="">Все подкатегории</option>';

                if (!category) return;

                const subcategories = new Set();
                lections.forEach(lection => {
                    if (lection.category === category && lection.subcategory) {
                        subcategories.add(lection.subcategory);
                    }
                });

                subcategories.forEach(subcategory => {
                    const option = document.createElement('option');
                    option.value = subcategory;
                    option.textContent = getSubcategoryLabel(subcategory);
                    subcategoryFilter.appendChild(option);
                });
            }

            function filterLections() {
                const searchTerm = searchInput.value.toLowerCase();
                const categoryValue = categoryFilter.value;
                const subcategoryValue = subcategoryFilter.value;

                const filtered = lections.filter(lection => {
                    const matchesSearch = lection.title.toLowerCase().includes(searchTerm) ||
                        lection.description.toLowerCase().includes(searchTerm);

                    const matchesCategory = categoryValue ? lection.category === categoryValue : true;
                    const matchesSubcategory = subcategoryValue ? lection.subcategory === subcategoryValue : true;

                    return matchesSearch && matchesCategory && matchesSubcategory;
                });

                displayLections(filtered);
                renderActiveChips();
            }

            function renderActiveChips() {
                if (!chipsHost) return;
                chipsHost.innerHTML = '';

                const chips = [];
                const q = ((searchInput && searchInput.value) || '').trim();

                const cat = (categoryFilter && categoryFilter.value) || '';
                const sub = (subcategoryFilter && subcategoryFilter.value) || '';


                if (q) chips.push({ key: 'q', label: `Запрос: ${q}` });
                if (cat) chips.push({ key: 'cat', label: `Категория: ${getCategoryLabel(cat)}` });
                if (sub) chips.push({ key: 'sub', label: `Подкатегория: ${getSubcategoryLabel(sub)}` });

                if (!chips.length) {
                    chipsHost.innerHTML = `<span class="chips-empty">Фильтры не выбраны</span>`;
                    return;
                }

                chips.forEach(ch => {
                    const b = document.createElement('button');
                    b.type = 'button';
                    b.className = 'chip';
                    b.setAttribute('data-chip', ch.key);
                    b.innerHTML = `${escapeHtml(ch.label)} <span class="chip-x">×</span>`;
                    b.addEventListener('click', () => {
                        if (ch.key === 'q' && searchInput) searchInput.value = '';
                        if (ch.key === 'cat' && categoryFilter) categoryFilter.value = '';
                        if (ch.key === 'sub' && subcategoryFilter) subcategoryFilter.value = '';
                        populateSubcategories();
                        filterLections();
                    });
                    chipsHost.appendChild(b);
                });
            }

            function escapeHtml(s) {
                return (s || '').toString()
                    .replaceAll('&', '&amp;')
                    .replaceAll('<', '&lt;')
                    .replaceAll('>', '&gt;')
                    .replaceAll('"', '&quot;')
                    .replaceAll("'", '&#39;');
            }

            function displayLections(lectionsToDisplay) {
                lectionsList.innerHTML = '';

                if (lectionsToDisplay.length === 0) {
                    lectionsList.innerHTML = `
                <div class="no-lections">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>Лекции не найдены</h3>
                    <p>Попробуйте изменить параметры поиска или фильтры</p>
                </div>
            `;
                    return;
                }

                lectionsToDisplay.forEach(lection => {
                            const card = document.createElement('article');
                            card.className = 'result-card lection-card';

                            const title = escapeHtml(lection.title || 'Без названия');
                            const desc = escapeHtml(lection.description || '');
                            const author = escapeHtml(lection.author || 'Syntax_Syndicate');
                            const cat = lection.category ? getCategoryLabel(lection.category) : '';
                            const sub = lection.subcategory ? getSubcategoryLabel(lection.subcategory) : '';

                            const href = `markdown-viewer.html?file=${encodeURIComponent(lection.file || '')}` +
                                `&title=${encodeURIComponent(lection.title || '')}` +
                                `&category=${encodeURIComponent(lection.category || '')}` +
                                `&subcategory=${encodeURIComponent(lection.subcategory || '')}` +
                                `&author=${encodeURIComponent(lection.author || 'Syntax_Syndicate')}`;

                            card.innerHTML = `
              <div class="result-top">
                <div class="result-main">
                  <a class="result-title" href="${href}">${title}</a>
                  <div class="result-sub">
                    <span class="badge">📚 Лекция</span>
                    ${cat ? `<span class="badge">${escapeHtml(cat)}</span>` : ''}
                    ${sub ? `<span class="badge badge--warm">${escapeHtml(sub)}</span>` : ''}
                    <span class="author-inline">
                      <button class="author-pill" type="button" data-author="${author}"><span class="author-pill__ava">👤</span><span class="author-pill__name">${author}</span></button>
                      <button class="author-follow" type="button" data-author="${author}" aria-pressed="false" title="Добавить автора в избранное">☆</button>
                    </span>
                  </div>
                </div>
              </div>

              ${desc ? `<div class="result-desc">${desc}</div>` : ''}

              <div class="result-actions">
                <a class="btn-primary" href="${href}">
                  <i class="fas fa-book-open"></i> Читать
                </a>
              </div>
            `;

            lectionsList.appendChild(card);
        });
    }

    function updateStats() {
        totalLections.textContent = lections.length;
        
        const categories = new Set(lections.map(l => l.category).filter(Boolean));
        uniqueCategories.textContent = categories.size;
        
        const subcategories = new Set(lections.map(l => l.subcategory).filter(Boolean));
        uniqueSubcategories.textContent = subcategories.size;
    }

    function getCategoryLabel(category) {
        const categories = {
            'programming': '💻 Программирование',
            'design': '🎨 Дизайн',
            'devops': '⚙️ DevOps',
            'data-science': '📊 Data Science',
            'cybersecurity': '🔐 Кибербезопасность',
            'linux': '🐧 Linux',
            'windows': '🪟 Windows',

            // добавили
            'networking': '🌐 Сети',
            'security': '🔐 Безопасность'
        };

        return categories[category] || category;
    }



    function getSubcategoryLabel(subcategory) {
        const subcategories = {
            'frontend': '🎨 Frontend',
            'backend': '⚙️ Backend',
            'bash': '🐚 Bash',
            'ux-design': '🎨 UX Design',
            'ui-design': '🎨 UI Design',

            'operating-systems': '🧠 Операционные системы',
            'protocols': '📡 Сетевые протоколы'
        };

        return subcategories[subcategory] || subcategory;
    }



    function showNoLections() {
        lectionsList.innerHTML = `
            <div class="no-lections">
                <i class="fas fa-book-open" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>Лекции пока не добавлены</h3>
                <p>Скоро здесь появятся учебные материалы</p>
            </div>
        `;
        
        // Обновляем статистику
        totalLections.textContent = '0';
        uniqueCategories.textContent = '0';
        uniqueSubcategories.textContent = '0';
    }
});