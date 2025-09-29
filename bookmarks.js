function getBookmarks() {
    try {
        return JSON.parse(localStorage.getItem('bookmarks') || '[]');
    } catch (e) {
        console.warn('Ошибка чтения закладок:', e);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const bookmarksList = document.getElementById('bookmarksList');
    const exportBtn = document.getElementById('exportBookmarks');
    const importBtn = document.getElementById('importBookmarks');
    const importFile = document.getElementById('importFile');
    const clearBtn = document.getElementById('clearBookmarks');
    const totalBookmarks = document.getElementById('totalBookmarks');
    const uniqueBookmarkCategories = document.getElementById('uniqueBookmarkCategories');
    const bookmarkTypes = document.getElementById('bookmarkTypes');
    const bookmarkTags = document.getElementById('bookmarkTags');
    const categoryFilter = document.getElementById('categoryFilter');
    const typeFilter = document.getElementById('typeFilter');
    const sortFilter = document.getElementById('sortFilter');
    const clearFilters = document.getElementById('clearFilters');
    const fileName = document.getElementById('fileName');

    let allResources = [];
    let filteredBookmarks = [];

    // Загружаем ресурсы
    if (window.itResources) {
        allResources = allResources.concat(window.itResources);
    }
    if (window.customizationResources) {
        allResources = allResources.concat(window.customizationResources);
    }
    
    if (allResources.length === 0) {
        loadResourcesFromData();
    }


function loadResourcesFromData() {
    // Пробуем загрузить данные разными способами
    if (window.itResources && window.itResources.length > 0) {
        allResources = allResources.concat(window.itResources);
    }
    if (window.customizationResources && window.customizationResources.length > 0) {
        allResources = allResources.concat(window.customizationResources);
    }
    
    // Если данные не загрузились, пробуем загрузить через fetch
    if (allResources.length === 0) {
        fetch('data.js')
            .then(response => response.text())
            .then(scriptText => {
                // Выполняем скрипт
                eval(scriptText);
                
                if (window.itResources) {
                    allResources = allResources.concat(window.itResources);
                }
                if (window.customizationResources) {
                    allResources = allResources.concat(window.customizationResources);
                }
                
                displayBookmarks();
                populateFilters();
            })
            .catch(error => {
                console.error('Ошибка загрузки данных:', error);
                displayBookmarks(); // Все равно показываем закладки
                populateFilters();
            });
    } else {
        displayBookmarks();
        populateFilters();
    }
}

    function getBookmarks() {
        return JSON.parse(localStorage.getItem('bookmarks') || '[]');
    }

    function displayBookmarks(bookmarksToDisplay = null) {
        const bookmarkedIds = getBookmarks();
        let bookmarkedResources = allResources.filter(resource => 
            resource && bookmarkedIds.includes(resource.id)
        );

        // Применяем фильтры и сортировку
        if (bookmarksToDisplay) {
            bookmarkedResources = bookmarksToDisplay;
        } else {
            bookmarkedResources = applyFiltersAndSorting(bookmarkedResources);
        }

        filteredBookmarks = bookmarkedResources;
        updateBookmarkStats(bookmarkedResources);

        if (bookmarkedResources.length === 0) {
            bookmarksList.innerHTML = `
                <div class="empty-bookmarks">
                    <div class="empty-icon">
                        <i class="fas fa-bookmark"></i>
                    </div>
                    <h3>Закладок пока нет</h3>
                    <p>Добавляйте материалы в закладки, нажимая на значок закладки на главной странице</p>
                    <a href="index.html" class="btn btn-success" style="margin-top: 2rem;">
                        <i class="fas fa-search"></i> Найти материалы
                    </a>
                </div>
            `;
            return;
        }

        displayBookmarkedResources(bookmarkedResources);
    }

    function applyFiltersAndSorting(resources) {
        let filtered = resources;

        // Фильтр по категории
        const categoryValue = categoryFilter.value;
        if (categoryValue) {
            filtered = filtered.filter(resource => resource.category === categoryValue);
        }

        // Фильтр по типу
        const typeValue = typeFilter.value;
        if (typeValue) {
            filtered = filtered.filter(resource => resource.type === typeValue);
        }

        // Сортировка
        const sortValue = sortFilter.value;
        switch (sortValue) {
            case 'title':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'category':
                filtered.sort((a, b) => {
                    const catA = a.category || 'zzz';
                    const catB = b.category || 'zzz';
                    return catA.localeCompare(catB);
                });
                break;
            case 'date':
            default:
                // Сортируем по ID (как приближение даты добавления)
                filtered.sort((a, b) => b.id - a.id);
                break;
        }

        return filtered;
    }

    function populateFilters() {
        const bookmarkedIds = getBookmarks();
        const bookmarkedResources = allResources.filter(resource => 
            resource && bookmarkedIds.includes(resource.id)
        );

        // Категории
        const categories = new Set(bookmarkedResources.map(r => r.category).filter(Boolean));
        categoryFilter.innerHTML = '<option value="">Все категории</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = getCategoryLabel(category);
            categoryFilter.appendChild(option);
        });

        // Типы
        const types = new Set(bookmarkedResources.map(r => r.type).filter(Boolean));
        typeFilter.innerHTML = '<option value="">Все типы</option>';
        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = getTypeLabel(type);
            typeFilter.appendChild(option);
        });
    }

// В функции displayBookmarkedResources в bookmarks.js добавьте:
function displayBookmarkedResources(bookmarkedResources) {
    bookmarksList.innerHTML = '';
    
    bookmarkedResources.forEach(resource => {
        if (!resource) return;
        
        const resourceCard = document.createElement('div');
        resourceCard.className = 'resource-card';
        
        const formattedTags = resource.tags ? resource.tags.map(tag => {
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
            <a href="${resource.link}" target="_blank" class="link" data-resource-id="${resource.id}">
                <i class="fas fa-external-link-alt"></i> Перейти к материалу
            </a>
            <div class="meta">
                <span class="type">${getTypeLabel(resource.type)}</span>
                ${resource.category ? `<span class="category" data-category="${resource.category}">${getCategoryLabel(resource.category)}</span>` : ''}
                ${resource.subcategory ? `<span class="subcategory">${getSubcategoryLabel(resource.subcategory)}</span>` : ''}
            </div>
            ${resource.tags ? `<div class="tags">${formattedTags}</div>` : ''}
        `;
        
        bookmarksList.appendChild(resourceCard);
    });
    
    // Добавляем обработчики для кнопок закладок
    bookmarksList.querySelectorAll('.bookmark-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const resourceId = parseInt(this.getAttribute('data-resource-id'));
            toggleBookmark(resourceId);
            displayBookmarks();
            populateFilters();
        });
    });
    
    // Добавляем обработчики для ссылок ресурсов (для обновления истории тегов)
    bookmarksList.querySelectorAll('.link').forEach(link => {
        link.addEventListener('click', function() {
            const resourceId = parseInt(this.getAttribute('data-resource-id'));
            const resource = allResources.find(r => r.id === resourceId);
            if (resource && window.updateTagsViewHistory) {
                window.updateTagsViewHistory(resource);
            }
        });
    });
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
            'windows10': '🪟 Windows 10',
            'windows11': '🪟 Windows 11',
            'frontend': '🎨 Frontend',
            'backend': '⚙️ Backend',
            'fullstack': '🔧 Fullstack',
            'devops': '🔄 DevOps',
            'data-scientist': '📈 Data Scientist',
            'ml-engineer': '🧠 ML Engineer'
        };
        return subcategories[subcategory] || subcategory;
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
        updateBookmarkStats();
    }

    function updateBookmarkStats(bookmarkedResources = null) {
        if (!bookmarkedResources) {
            const bookmarkedIds = getBookmarks();
            bookmarkedResources = allResources.filter(resource => 
                resource && bookmarkedIds.includes(resource.id)
            );
        }
        
        totalBookmarks.textContent = bookmarkedResources.length;

        const categories = new Set(bookmarkedResources.map(r => r.category).filter(Boolean));
        uniqueBookmarkCategories.textContent = categories.size;

        const types = new Set(bookmarkedResources.map(r => r.type).filter(Boolean));
        bookmarkTypes.textContent = types.size;

        // Подсчет уникальных тегов
        const allTags = bookmarkedResources.flatMap(r => r.tags || []);
        const uniqueTags = new Set(allTags);
        bookmarkTags.textContent = uniqueTags.size;
    }

    function exportBookmarks() {
        const bookmarkedIds = getBookmarks();
        const bookmarkedResources = allResources.filter(resource => 
            resource && bookmarkedIds.includes(resource.id)
        );
        
        const exportData = {
            version: '1.0',
            exportDate: new Date().toISOString(),
            totalBookmarks: bookmarkedResources.length,
            bookmarks: bookmarkedResources
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `syntax_syndicate_bookmarks_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        showNotification('Закладки успешно экспортированы!', 'success');
    }

    function importBookmarks(event) {
        const file = event.target.files[0];
        if (!file) return;

        fileName.textContent = file.name;

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importData = JSON.parse(e.target.result);
                let bookmarksToImport = [];

                console.log('Импортируемые данные:', importData);

                if (Array.isArray(importData)) {
                    bookmarksToImport = importData.filter(id => typeof id === 'number');
                } else if (importData.bookmarks && Array.isArray(importData.bookmarks)) {
                    bookmarksToImport = importData.bookmarks.map(item => {
                        if (typeof item === 'number') return item;
                        if (item && item.id) return item.id;
                        return null;
                    }).filter(id => id !== null);
                } else if (importData.version === '1.0' && Array.isArray(importData.bookmarks)) {
                    bookmarksToImport = importData.bookmarks.map(item => item.id).filter(id => id);
                }

                console.log('Найдено закладок для импорта:', bookmarksToImport);

                if (bookmarksToImport.length > 0) {
                    const currentBookmarks = getBookmarks();
                    const mergedBookmarks = [...new Set([...currentBookmarks, ...bookmarksToImport])];
                    
                    localStorage.setItem('bookmarks', JSON.stringify(mergedBookmarks));
                    displayBookmarks();
                    populateFilters();
                    
                    showNotification(`Импортировано ${bookmarksToImport.length} закладок! Всего: ${mergedBookmarks.length}`, 'success');
                } else {
                    showNotification('Не удалось найти закладки в файле. Проверьте формат файла.', 'error');
                }
            } catch (error) {
                console.error('Ошибка импорта:', error);
                showNotification('Ошибка при чтении файла: ' + error.message, 'error');
            }
        };
        reader.readAsText(file);
    }

    function clearAllBookmarks() {
        if (confirm('Вы уверены, что хотите удалить все закладки? Это действие нельзя отменить.')) {
            localStorage.setItem('bookmarks', JSON.stringify([]));
            displayBookmarks();
            populateFilters();
            showNotification('Все закладки удалены', 'info');
        }
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
        `;
        
        const colors = {
            success: '#48bb78',
            error: '#ff6b6b',
            info: '#667eea'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Обработчики событий
    exportBtn.addEventListener('click', exportBookmarks);
    importBtn.addEventListener('click', () => importFile.click());
    importFile.addEventListener('change', importBookmarks);
    clearBtn.addEventListener('click', clearAllBookmarks);

    // Обработчики фильтров
    categoryFilter.addEventListener('change', () => displayBookmarks());
    typeFilter.addEventListener('change', () => displayBookmarks());
    sortFilter.addEventListener('change', () => displayBookmarks());
    clearFilters.addEventListener('click', () => {
        categoryFilter.value = '';
        typeFilter.value = '';
        sortFilter.value = 'date';
        displayBookmarks();
    });

    // Инициализация
    displayBookmarks();
    populateFilters();
});