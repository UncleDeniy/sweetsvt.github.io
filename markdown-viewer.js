document.addEventListener('DOMContentLoaded', function() {
    const markdownContainer = document.getElementById('markdownContainer');
    
    // Получаем параметры из URL
    const urlParams = new URLSearchParams(window.location.search);
    const file = urlParams.get('file');
    const title = urlParams.get('title') || 'Лекция';
    const category = urlParams.get('category') || 'programming';
    const subcategory = urlParams.get('subcategory') || '';
    const author = urlParams.get('author') || 'Syntax_Syndicate';
    
    if (!file) {
        showError('Файл не указан');
        return;
    }
    
    loadMarkdownFile(file, title, category, subcategory, author);
    
// В файле markdown-viewer.js замените функцию loadMarkdownFile:
function loadMarkdownFile(file, title, category, subcategory, author) {
    // Нормализуем путь к файлу
    let filePath = `docs/${file}`;
    
    // Убираем лишние слеши
    filePath = filePath.replace(/\/\//g, '/');
    
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                // Пробуем альтернативный путь
                const altPath = file.startsWith('docs/') ? file : `docs/${file}`;
                return fetch(altPath);
            }
            return response;
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Файл не найден');
            }
            return response.text();
        })
        .then(markdown => {
            displayMarkdown(markdown, title, category, subcategory, author);
        })
        .catch(error => {
            console.error('Ошибка загрузки файла:', error);
            showError('Не удалось загрузить лекцию: ' + error.message);
        });
}
    
    function displayMarkdown(markdown, title, category, subcategory, author) {
        // Настраиваем marked для подсветки синтаксиса
        marked.setOptions({
            highlight: function(code, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(code, { language: lang }).value;
                    } catch (err) {
                        console.error('Ошибка подсветки синтаксиса:', err);
                    }
                }
                return hljs.highlightAuto(code).value;
            },
            breaks: true,
            gfm: true
        });
        
        // Конвертируем markdown в HTML
        const htmlContent = marked.parse(markdown);
        
        // Создаем красивый интерфейс
        const content = `
            <div class="markdown-header">
                <h1 class="markdown-title">${title}</h1>
                <div class="markdown-meta">
                    <span class="meta-badge">${getCategoryLabel(category)}</span>
                    ${subcategory ? `<span class="meta-badge" style="background: #ed8936;">${getSubcategoryLabel(subcategory)}</span>` : ''}
                    <span class="meta-badge" style="background: #48bb78;">👨‍💻 ${author}</span>
                    <span class="meta-badge" style="background: #9f7aea;">📚 Лекция</span>
                </div>
                <div class="lection-actions">
                    <button onclick="window.print()" class="btn btn-primary">
                        <i class="fas fa-print"></i> Печать
                    </button>
                    <button onclick="toggleDarkMode()" class="btn btn-secondary">
                        <i class="fas fa-moon"></i> Темная тема
                    </button>
                </div>
            </div>
            <div class="markdown-content">
                ${htmlContent}
            </div>
        `;
        
        markdownContainer.innerHTML = content;
        
        // Обновляем заголовок страницы
        document.title = `${title} | Syntax_Syndicate`;
    }
    
    function showError(message) {
        markdownContainer.innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3>Ошибка загрузки</h3>
                <p>${message}</p>
                <div style="margin-top: 2rem;">
                    <a href="lections.html" class="btn btn-primary">
                        <i class="fas fa-arrow-left"></i> Вернуться к лекциям
                    </a>
                </div>
            </div>
        `;
    }
    
    function getCategoryLabel(category) {
        const categories = {
            'programming': '💻 Программирование',
            'design': '🎨 Дизайн',
            'devops': '⚙️ DevOps',
            'data-science': '📊 Data Science',
            'cybersecurity': '🔐 Кибербезопасность',
            'linux': '🐧 Linux',
            'windows': '🪟 Windows'
        };
        return categories[category] || category;
    }
    
    function getSubcategoryLabel(subcategory) {
        const subcategories = {
            'frontend': '🎨 Frontend',
            'backend': '⚙️ Backend',
            'bash': '🐚 Bash',
            'ux-design': '🎨 UX Design',
            'ui-design': '🎨 UI Design'
        };
        return subcategories[subcategory] || subcategory;
    }
});

// Функция для переключения темной темы
function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    window.settingsManager.updateSetting('darkTheme', isDark);
}

// Функция для применения сохраненной темы
function applySavedTheme() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// Применяем тему при загрузке
applySavedTheme();