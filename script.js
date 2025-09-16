document.addEventListener('DOMContentLoaded', function() {
    const resourcesList = document.getElementById('resourcesList');
    const searchInput = document.getElementById('searchInput');
    const typeFilter = document.getElementById('typeFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const subcategoryFilter = document.getElementById('subcategoryFilter');
    const clearFilters = document.getElementById('clearFilters');
    const totalResources = document.getElementById('totalResources');
    const uniqueCategories = document.getElementById('uniqueCategories');
    const uniqueSubcategories = document.getElementById('uniqueSubcategories');

    let resources = window.itResources || [];

    // Если нет ресурсов, используем демо-данные
    if (resources.length === 0) {
        resources = getDemoResources();
        saveResources();
    }

    init();
    
    function init() {
        displayResources(resources);
        updateStats();
        populateSubcategories();
        
        searchInput.addEventListener('input', filterResources);
        typeFilter.addEventListener('change', filterResources);
        categoryFilter.addEventListener('change', function() {
            populateSubcategories();
            filterResources();
        });
        subcategoryFilter.addEventListener('change', filterResources);
        
        clearFilters.addEventListener('click', function() {
            searchInput.value = '';
            typeFilter.value = '';
            categoryFilter.value = '';
            subcategoryFilter.value = '';
            populateSubcategories();
            filterResources();
        });
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
    
    function filterResources() {
        const searchTerm = searchInput.value.toLowerCase();
        const typeValue = typeFilter.value;
        const categoryValue = categoryFilter.value;
        const subcategoryValue = subcategoryFilter.value;
        
        const filtered = resources.filter(resource => {
            const matchesSearch = resource.title.toLowerCase().includes(searchTerm) ||
                                resource.description.toLowerCase().includes(searchTerm) ||
                                (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(searchTerm)));
            
            const matchesType = typeValue ? resource.type === typeValue : true;
            const matchesCategory = categoryValue ? resource.category === categoryValue : true;
            const matchesSubcategory = subcategoryValue ? resource.subcategory === subcategoryValue : true;
            
            return matchesSearch && matchesType && matchesCategory && matchesSubcategory;
        });
        
        displayResources(filtered);
    }
    
    function displayResources(resourcesToDisplay) {
        resourcesList.innerHTML = '';
        
        if (resourcesToDisplay.length === 0) {
            resourcesList.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>Ничего не найдено</h3>
                    <p>Попробуйте изменить параметры поиска или фильтры</p>
                </div>
            `;
            return;
        }
        
        resourcesToDisplay.forEach(resource => {
            const resourceCard = document.createElement('div');
            resourceCard.className = 'resource-card';
            
            const formattedTags = resource.tags ? resource.tags.map(tag => {
                const isLongTag = tag.length > 15;
                return `<span class="tag ${isLongTag ? 'long-tag' : ''}" title="${tag}">#${tag}</span>`;
            }).join('') : '';
            
            resourceCard.innerHTML = `
                <h3>${resource.title}</h3>
                <p class="description">${resource.description}</p>
                <a href="${resource.link}" target="_blank" class="link">
                    <i class="fas fa-external-link-alt"></i> Перейти к материалу
                </a>
                <div class="meta">
                    <span class="type">${getTypeLabel(resource.type)}</span>
                    ${resource.category ? `<span class="category" data-category="${resource.category}">${getCategoryLabel(resource.category)}</span>` : ''}
                    ${resource.subcategory ? `<span class="subcategory">${getSubcategoryLabel(resource.subcategory)}</span>` : ''}
                </div>
                ${resource.tags ? `<div class="tags">${formattedTags}</div>` : ''}
            `;
            
            resourcesList.appendChild(resourceCard);
        });
    }
    
    function updateStats() {
        totalResources.textContent = resources.length;
        
        const categories = new Set(resources.map(r => r.category).filter(Boolean));
        uniqueCategories.textContent = categories.size;
        
        const subcategories = new Set(resources.map(r => r.subcategory).filter(Boolean));
        uniqueSubcategories.textContent = subcategories.size;
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
            'cto': '🏢 CTO'
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
