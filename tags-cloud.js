// tags-cloud.js - Исправленная версия
(function() {
    let tagsCloudInitialized = false;
    let tagsCloud = null;
    let clearTagsHistory = null;

    // Объявляем функции глобально
    window.loadTagsCloud = function() {
        const tagsData = getPopularTags();
        displayTagsCloud(tagsData);
    };

    window.initTagsCloud = function() {
        if (tagsCloudInitialized) return;
        tagsCloudInitialized = true;
        
        tagsCloud = document.getElementById('tagsCloud');
        clearTagsHistory = document.getElementById('clearTagsHistory');
        
        if (!tagsCloud) {
            console.log('Облако тегов не найдено на странице');
            return;
        }
        
        // Инициализация облака тегов
        loadTagsCloud();
        
        // Обработчик для кнопки очистки истории
        if (clearTagsHistory) {
            clearTagsHistory.addEventListener('click', function() {
                if (confirm('Вы уверены, что хотите очистить историю просмотров тегов?')) {
                    localStorage.removeItem('tagsViewHistory');
                    loadTagsCloud();
                    showTagsNotification('История тегов очищена', 'success');
                }
            });
        }
    };

    // Цветовая палитра для тегов
    const tagColors = [
        'tag-color-1', 'tag-color-2', 'tag-color-3', 'tag-color-4',
        'tag-color-5', 'tag-color-6', 'tag-color-7', 'tag-color-8'
    ];
        
    function getPopularTags() {
        // Получаем историю просмотров из localStorage
        const viewHistory = JSON.parse(localStorage.getItem('tagsViewHistory') || '{}');
        
        // Если история пустая, показываем общие популярные теги
        if (Object.keys(viewHistory).length === 0) {
            return getDefaultPopularTags();
        }
        
        // Сортируем теги по популярности
        const sortedTags = Object.entries(viewHistory)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 25); // Ограничиваем 25 тегами
        
        return sortedTags.map(([tag, count]) => ({ tag, count }));
    }
    
    function getDefaultPopularTags() {
        // Возвращаем общие популярные теги, если нет истории просмотров
        const allTags = getAllTagsFromResources();
        
        if (allTags.length === 0) {
            return [];
        }
        
        const tagCounts = {};
        
        allTags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
        
        return Object.entries(tagCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 20)
            .map(([tag, count]) => ({ tag, count }));
    }
    
    function getAllTagsFromResources() {
        let allTags = [];
        
        // Собираем теги из всех ресурсов
        try {
            if (window.itResources && Array.isArray(window.itResources)) {
                window.itResources.forEach(resource => {
                    if (resource && resource.tags && Array.isArray(resource.tags)) {
                        allTags = allTags.concat(resource.tags);
                    }
                });
            }
            
            if (window.customizationResources && Array.isArray(window.customizationResources)) {
                window.customizationResources.forEach(resource => {
                    if (resource && resource.tags && Array.isArray(resource.tags)) {
                        allTags = allTags.concat(resource.tags);
                    }
                });
            }
        } catch (error) {
            console.error('Ошибка при получении тегов из ресурсов:', error);
        }
        
        // Если нет тегов, возвращаем демо-теги
        if (allTags.length === 0) {
            return [
                'программирование', 'javascript', 'python', 'html', 'css',
                'react', 'vue', 'angular', 'nodejs', 'базы данных',
                'алгоритмы', 'linux', 'windows', 'devops', 'docker',
                'git', 'github', 'веб-разработка', 'мобильная разработка', 'ui/ux'
            ];
        }
        
        return allTags;
    }
    
    function displayTagsCloud(tagsData) {
        if (!tagsCloud) return;
        
        tagsCloud.innerHTML = '';
        
        if (!tagsData || tagsData.length === 0) {
            tagsCloud.innerHTML = `
                <div class="empty-tags">
                    <i class="fas fa-tags"></i>
                    <p>Пока нет данных о тегах</p>
                    <p style="font-size: 0.8rem; margin-top: 0.5rem;">Просматривайте материалы, чтобы заполнить облако тегов</p>
                </div>
            `;
            return;
        }
        
        // Находим максимальное и минимальное количество для нормализации размеров
        const counts = tagsData.map(item => item.count);
        const maxCount = Math.max(...counts);
        const minCount = Math.min(...counts);
        
        tagsData.forEach(({ tag, count }, index) => {
            // Вычисляем размер тега (1-5) на основе популярности
            const sizeLevel = calculateTagSize(count, minCount, maxCount);
            
            // Выбираем цвет из палитры
            const colorClass = tagColors[index % tagColors.length];
            
            const tagElement = document.createElement('span');
            tagElement.className = `tag-cloud-item tag-size-${sizeLevel} ${colorClass}`;
            tagElement.textContent = `#${tag}`;
            tagElement.title = `Просмотрено: ${count} раз`;
            tagElement.setAttribute('data-tag', tag);
            
            // Добавляем обработчик клика для поиска по тегу
            tagElement.addEventListener('click', function() {
                searchByTag(tag);
            });
            
            // Добавляем обработчик для touch устройств
            tagElement.addEventListener('touchstart', function(e) {
                e.preventDefault();
                this.style.transform = 'scale(0.95)';
                this.style.opacity = '0.8';
            });
            
            tagElement.addEventListener('touchend', function(e) {
                e.preventDefault();
                this.style.transform = '';
                this.style.opacity = '';
            });
            
            tagsCloud.appendChild(tagElement);
        });
    }
    
    function calculateTagSize(count, minCount, maxCount) {
        if (maxCount === minCount) return 3; // Средний размер если все одинаковые
        
        const normalized = (count - minCount) / (maxCount - minCount);
        return Math.floor(normalized * 4) + 1;
    }
    
    function searchByTag(tag) {
        // Устанавливаем значение в поисковую строку
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = tag;
            searchInput.focus();
            
            // Триггерим событие input для фильтрации
            const event = new Event('input', { bubbles: true });
            searchInput.dispatchEvent(event);
            
            // Прокручиваем к результатам
            setTimeout(() => {
                const resourcesGrid = document.querySelector('.resources-grid');
                if (resourcesGrid) {
                    resourcesGrid.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 300);
            
            showTagsNotification(`Поиск по тегу: #${tag}`, 'info');
        }
    }
    
    function showTagsNotification(message, type = 'info') {
        // Создаем уведомление
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        const colors = {
            success: '#48bb78',
            error: '#ff6b6b',
            info: '#667eea',
            warning: '#ed8936'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Автоматическое скрытие
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Функция для обновления истории тегов при просмотре ресурса
    window.updateTagsViewHistory = function(resource) {
        if (!resource || !resource.tags || !Array.isArray(resource.tags)) return;
        
        try {
            const viewHistory = JSON.parse(localStorage.getItem('tagsViewHistory') || '{}');
            
            resource.tags.forEach(tag => {
                if (tag && typeof tag === 'string') {
                    viewHistory[tag] = (viewHistory[tag] || 0) + 1;
                }
            });
            
            localStorage.setItem('tagsViewHistory', JSON.stringify(viewHistory));
            
            // Обновляем облако тегов, если оно существует на странице
            if (tagsCloud) {
                setTimeout(loadTagsCloud, 100);
            }
        } catch (error) {
            console.error('Ошибка при обновлении истории тегов:', error);
        }
    };

    // Инициализация при загрузке DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTagsCloud);
    } else {
        setTimeout(initTagsCloud, 500);
    }
})();