// script.js — главная страница (поиск/фильтры/закладки)
function loadResourcesSafely() {
    const out = [];
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
    if (out.length === 0 && typeof getDemoResources === 'function') {
        console.log('Используются демо-ресурсы');
        return getDemoResources();
    }
    return out;
}


document.addEventListener('DOMContentLoaded', function() {
    const resourcesList = document.getElementById('resourcesList');
    const searchInput = document.getElementById('searchInput');
    const typeFilter = document.getElementById('typeFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const subcategoryFilter = document.getElementById('subcategoryFilter');
    const bookmarkFilter = document.getElementById('bookmarkFilter');
    const clearFilters = document.getElementById('clearFilters');
    const totalResources = document.getElementById('totalResources');
    const uniqueCategories = document.getElementById('uniqueCategories');
    const uniqueSubcategories = document.getElementById('uniqueSubcategories');

    // Загружаем ресурсы безопасно (без дублирования)
    const resources = loadResourcesSafely();

    init();

    function init() {
        initBookmarks();
        displayResources(resources, resourcesList);
        updateStats();
        populateSubcategories();

        const debounce = (fn, wait = 150) => {
            let t;
            return (...args) => {
                clearTimeout(t);
                t = setTimeout(() => fn(...args), wait);
            };
        };

        searchInput.addEventListener('input', debounce(filterResources, 120));
        typeFilter.addEventListener('change', filterResources);
        categoryFilter.addEventListener('change', function() {
            populateSubcategories();
            filterResources();
        });
        subcategoryFilter.addEventListener('change', filterResources);
        bookmarkFilter.addEventListener('change', filterResources);
        
        clearFilters.addEventListener('click', function() {
            searchInput.value = '';
            typeFilter.value = '';
            categoryFilter.value = '';
            subcategoryFilter.value = '';
            bookmarkFilter.value = '';
            populateSubcategories();
            filterResources();
        });
    }

    // Функции для работы с закладками
    function initBookmarks() {
        if (!localStorage.getItem('bookmarks')) {
            localStorage.setItem('bookmarks', JSON.stringify([]));
        }
    }

    function toggleBookmark(resourceId) {
        const bookmarks = getBookmarks();
        const index = bookmarks.indexOf(resourceId);
        
        if (index > -1) {
            bookmarks.splice(index, 1);
        } else {
            bookmarks.push(resourceId);
        }
        
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        updateBookmarkUI(resourceId);
        
        // Обновляем счетчик закладок в статистике
        updateBookmarkStats();
    }

    function getBookmarks() {
        return JSON.parse(localStorage.getItem('bookmarks') || '[]');
    }

    function isBookmarked(resourceId) {
        return getBookmarks().includes(resourceId);
    }

    function updateBookmarkUI(resourceId) {
        const bookmarkBtn = document.querySelector(`[data-resource-id="${resourceId}"]`);
        if (bookmarkBtn) {
            const isBookmarked = getBookmarks().includes(resourceId);
            bookmarkBtn.innerHTML = isBookmarked ? 
                '<i class="fas fa-bookmark"></i>' : 
                '<i class="far fa-bookmark"></i>';
            bookmarkBtn.style.color = isBookmarked ? '#667eea' : '#718096';
            bookmarkBtn.title = isBookmarked ? 'Удалить из закладок' : 'Добавить в закладки';
        }
    }

    function updateBookmarkStats() {
        const bookmarkCount = document.getElementById('bookmarkCount');
        if (bookmarkCount) {
            bookmarkCount.textContent = getBookmarks().length;
        }
    }

    function populateSubcategories() {
        const category = categoryFilter.value;
        subcategoryFilter.innerHTML = '<option value="">Все подкатегории</option>';
        
        if (!category) return;
        
        const subcategories = new Set();
        resources.forEach(resource => {
            if (resource.category === category && resource.subcategory) {
                subcategories.add(resource.subcategory);
            }
        });
        
        subcategories.forEach(subcategory => {
            const option = document.createElement('option');
            option.value = subcategory;
            option.textContent = getSubcategoryLabel(subcategory);
            subcategoryFilter.appendChild(option);
        });
    }

    // ---------- Улучшенный поиск (RU/EN, по словам) ----------
    function normalizeText(input) {
        return (input || '')
            .toString()
            .toLowerCase()
            .replace(/ё/g, 'е')
            .replace(/[\p{L}\p{N}]+|[^\p{L}\p{N}]+/gu, (m) => {
                // оставляем только буквенно-цифровые токены, остальное → пробел
                return /[^\p{L}\p{N}]/u.test(m) ? ' ' : m;
            })
            .replace(/\s+/g, ' ')
            .trim();
    }

    function getTagHistory() {
        try {
            return JSON.parse(localStorage.getItem('tagsViewHistory') || '{}');
        } catch (_) {
            return {};
        }
    }

    function resourceSearchHaystack(resource) {
        const parts = [
            resource?.title,
            resource?.description,
            resource?.category,
            resource?.subcategory,
            Array.isArray(resource?.tags) ? resource.tags.join(' ') : ''
        ].filter(Boolean);
        return normalizeText(parts.join(' '));
    }

    function matchesAllTerms(haystack, terms) {
        if (!terms.length) return true;
        for (const t of terms) {
            if (!t) continue;
            if (!haystack.includes(t)) return false;
        }
        return true;
    }

    function filterResources() {
        const normalized = normalizeText(searchInput.value);
        const terms = normalized ? normalized.split(' ') : [];
        const typeValue = typeFilter.value;
        const categoryValue = categoryFilter.value;
        const subcategoryValue = subcategoryFilter.value;
        const bookmarkValue = bookmarkFilter.value;
        
        const filtered = resources.filter(resource => {
            const haystack = resourceSearchHaystack(resource);
            const matchesSearch = matchesAllTerms(haystack, terms);
            
            const matchesType = typeValue ? resource.type === typeValue : true;
            const matchesCategory = categoryValue ? resource.category === categoryValue : true;
            const matchesSubcategory = subcategoryValue ? resource.subcategory === subcategoryValue : true;
            const matchesBookmark = bookmarkValue === 'bookmarked' ? 
                getBookmarks().includes(resource.id) : true;
            
            return matchesSearch && matchesType && matchesCategory && matchesSubcategory && matchesBookmark;
        });
        
        displayResources(filtered, resourcesList);
    }

    function displayResources(resourcesToDisplay, container = resourcesList) {
        container.innerHTML = '';
        
        if (resourcesToDisplay.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>Ничего не найдено</h3>
                    <p>Попробуйте изменить параметры поиска или фильтры</p>
                </div>
            `;
            return;
        }
        
        const tagHistory = getTagHistory();

        resourcesToDisplay.forEach(resource => {
            const resourceCard = document.createElement('div');
            resourceCard.className = 'resource-card';

            // Персонализация: сначала показываем теги, которые пользователь чаще видит
            const tagsSorted = Array.isArray(resource.tags)
                ? [...resource.tags].sort((a, b) => {
                    const ca = tagHistory[a] || 0;
                    const cb = tagHistory[b] || 0;
                    if (cb !== ca) return cb - ca;
                    return a.localeCompare(b, 'ru');
                })
                : [];

            const formattedTags = tagsSorted.length ? tagsSorted.map(tag => {
                const isLongTag = tag.length > 15;
                return `<span class="tag ${isLongTag ? 'long-tag' : ''}" title="${tag}">#${tag}</span>`;
            }).join('') : '';
            
            const isBookmarked = getBookmarks().includes(resource.id);
            const bookmarkIcon = isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark';
            const bookmarkColor = isBookmarked ? '#667eea' : '#718096';
            
            resourceCard.innerHTML = `
                <div class="resource-header">
                    <h3>${resource.title}</h3>
                    <button class="bookmark-btn" data-resource-id="${resource.id}" 
                            style="background: none; border: none; cursor: pointer; color: ${bookmarkColor}; font-size: 1.2rem; padding: 0.5rem; margin: -0.5rem;">
                        <i class="${bookmarkIcon}"></i>
                    </button>
                </div>
                <p class="description">${resource.description}</p>
                <a href="${resource.link}" target="_blank" rel="noopener" class="link" data-open-resource-id="${resource.id}">
                    <i class="fas fa-external-link-alt"></i> Перейти к материалу
                </a>
                <div class="meta">
                    <span class="type">${getTypeLabel(resource.type)}</span>
                    ${resource.category ? `<span class="category" data-category="${resource.category}">${getCategoryLabel(resource.category)}</span>` : ''}
                    ${resource.subcategory ? `<span class="subcategory">${getSubcategoryLabel(resource.subcategory)}</span>` : ''}
                </div>
                ${tagsSorted.length ? `<div class="tags">${formattedTags}</div>` : ''}
            `;
            
            container.appendChild(resourceCard);
        });
        
        // Добавляем обработчики для кнопок закладок
        container.querySelectorAll('.bookmark-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const resourceId = parseInt(this.getAttribute('data-resource-id'));
                toggleBookmark(resourceId);
            });
        });

        // Учёт просмотров: обновляем персональную статистику тегов при открытии ресурса
        container.querySelectorAll('[data-open-resource-id]').forEach(a => {
            const id = parseInt(a.getAttribute('data-open-resource-id'));
            const res = resources.find(r => r && r.id === id);
            a.addEventListener('pointerdown', () => {
                try {
                    if (res && window.updateTagsViewHistory) window.updateTagsViewHistory(res);
                    const key = 'resourceViewHistory';
                    const raw = localStorage.getItem(key);
                    const map = raw ? JSON.parse(raw) : {};
                    map[id] = (map[id] || 0) + 1;
                    localStorage.setItem(key, JSON.stringify(map));
                } catch (_) {}
            }, { passive: true });
        });
    }

    function updateStats() {
        totalResources.textContent = resources.length;
        
        const categories = new Set(resources.map(r => r.category).filter(Boolean));
        uniqueCategories.textContent = categories.size;
        
        const subcategories = new Set(resources.map(r => r.subcategory).filter(Boolean));
        uniqueSubcategories.textContent = subcategories.size;

        updateBookmarkStats();
    }

    function getTypeLabel(type) {
        const types = {
            'course': '📚 Курс',
            'program': '🎯 Программа',
            'book': '📖 Книга',
            'article': '📄 Статья',
            'video': '🎥 Видео',
            'tool': '🛠️ Инструмент',
            'library': '📦 Библиотека',
            'list': '📋 Список',
            'script': '📜 Скрипт',
            'reference': '📘 Справочник',
            'interactive': '🎮 Интерактив',
            'cheatsheet': '📝 Шпаргалка'
        };
        return types[type] || type;
    }

    function getCategoryLabel(category) {
        const categories = {
            'programming': '💻 Программирование',
            'design': '🎨 Дизайн',
            'devops': '⚙️ DevOps',
            'data-science': '📊 Data Science',
            'cybersecurity': '🔐 Кибербезопасность',
            'career': '🚀 Карьера',
            'profession': '👨‍💼 Профессии',
            'ai': '🤖 ИИ',
            'productivity': '⚡ Продуктивность',
            'linux': '🐧 Linux',
            'windows': '🪟 Windows',
            'mobile': '📱 Мобильная разработка',
            'cloud': '☁️ Облачные технологии',
            'other': '🔍 Другое'
        };
        return categories[category] || category;
    }

    function getSubcategoryLabel(subcategory) {
        const subcategories = {
            // Linux подкатегории
            'ubuntu': '📦 Ubuntu',
            'debian': '🎯 Debian',
            'arch': '⚡ Arch',
            'fedora': '🎩 Fedora',
            'centos': '🔴 CentOS',
            'redhat': '🔺 Red Hat',
            'opensuse': '🦎 OpenSUSE',
            'mint': '🍃 Mint',
            'kali': '🔓 Kali',
            'bash': '🐚 Bash',
            
            // Windows подкатегории
            'windows10': '🪟 Windows 10',
            'windows11': '🪟 Windows 11',
            'windowsserver': '🗄️ Windows Server',
            'powershell': '💻 PowerShell',
            'batch': '📜 Batch',
            'terminal': '⌨️ Terminal',
            'wsl': '🐧 WSL',
            'registry': '🔧 Реестр',
            'taskscheduler': '⏰ Планировщик',
            'security': '🔒 Безопасность',
            
            // Профессии
            'frontend': '🎨 Frontend',
            'backend': '⚙️ Backend',
            'fullstack': '🔧 Fullstack',
            'devops': '🔄 DevOps',
            'data-scientist': '📈 Data Scientist',
            'ml-engineer': '🧠 ML Engineer',
            'qa': '🔍 QA',
            'ux-ui': '🎯 UX/UI',
            'mobile': '📱 Mobile',
            'game-dev': '🎮 Game Dev',
            'security': '🛡️ Security',
            'cloud': '☁️ Cloud',
            'sysadmin': '🖥️ SysAdmin',
            'dba': '🗄️ DBA',
            'project-manager': '📊 Project Manager',
            'product-manager': '🚀 Product Manager',
            'tech-lead': '👨‍💻 Tech Lead',
            'cto': '🏢 CTO',
            
            // Дизайн подкатегории
            'ui-design': '🎨 UI Design',
            'ux-design': '🧠 UX Design',
            'ux-research': '🔍 UX Research',
            'ui-animation': '✨ Анимация',
            'design-system': '📐 Дизайн-системы',
            'typography': '🔤 Типографика',
            'color-theory': '🎨 Теория цвета',
            'tools': '🛠️ Инструменты',
            'accessibility': '♿ Доступность',

            // Новые подкатегории для SysAdmin
            'other': '🔍 Другое',
            'web-security': '🌐 Веб-безопасность',
            'pentesting': '🔓 Пентестинг',
            'practice': '🛠️ Практика',
            'education': '🎓 Обучение',
            'certification': '📜 Сертификация',
            'best-practices': '✅ Best Practices',
            'frameworks': '📐 Фреймворки',
            'architecture': '🏗️ Архитектура',
            
            // Подкатегории для облачных технологий
            'aws': '☁️ AWS',
            'azure': '🔷 Azure',
            'gcp': '🔶 GCP',
            'devops': '🔄 DevOps',
            'containerization': '📦 Контейнеризация',
            'aws-sdk': '⚙️ AWS SDK',
            'data-orchestration': '🎵 Оркестрация данных',
            'big-data': '📊 Big Data',
            'kubernetes-tools': '⚓ Kubernetes Tools',
            'monitoring': '👀 Мониторинг',
            'devops-tools': '🛠️ DevOps Tools',
            
            // Подкатегории для мобильной разработки
            'android': '🤖 Android',
            'ios': '🍎 iOS',
            'cross-platform': '📱 Кроссплатформенный',
            'android-libraries': '📚 Android Libraries',
            'ios-libraries': '📚 iOS Libraries',
            
            // Подкатегории для Data Science
            'data-analysis': '📈 Анализ данных',
            'data-visualization': '📊 Визуализация',
            'deep-learning': '🧠 Deep Learning',
            'ml-libraries': '📚 ML Libraries',
            'ml-deployment': '🚀 ML Deployment',
            
            // Подкатегории для кибербезопасности
            'network-security': '🌐 Сетевая безопасность',
            'cryptography': '🔐 Криптография',
            'malware-analysis': '🦠 Анализ malware'
        };
        return subcategories[subcategory] || subcategory;
    }

    function saveResources() {
        localStorage.setItem('it-huishniki-resources', JSON.stringify(resources));
        updateStats();
    }

    function getDemoResources() {
        // Минимальный набор демо-ресурсов
        return [
            {
                id: 1,
                title: "FreeCodeCamp",
                description: "Бесплатные курсы по программированию с сертификатами. Идеально для начинающих.",
                link: "https://www.freecodecamp.org/",
                tags: ["программирование", "бесплатно", "курсы", "сертификаты"],
                type: "course",
                category: "programming",
                dateAdded: new Date().toISOString()
            }
        ];
    }
});


// В конце script.js замените этот код:
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                window.location.href = `index.html?search=${encodeURIComponent(searchTerm)}`;
            }
        }
    });

    // Парсим URL параметры для автозаполнения поиска
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
        searchInput.value = searchParam;
    }
});

// Загружаем скрипт облака тегов с задержкой для стабильности
setTimeout(() => {
    const script = document.createElement('script');
    script.src = 'tags-cloud.js';
    script.onload = function() {
        console.log('Облако тегов загружено');
        // Инициализируем облако тегов после загрузки
        if (window.initTagsCloud) {
            window.initTagsCloud();
        }
    };
    script.onerror = function() {
        console.error('Ошибка загрузки облака тегов');
    };
    document.head.appendChild(script);
}, 500);