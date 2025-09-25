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
            const lectionCard = document.createElement('div');
            lectionCard.className = 'lection-card';
            
            // Формируем путь к файлу лекции
            const filePath = `docs/${lection.file}`;
            
            lectionCard.innerHTML = `
            <div class="lection-header">
                <h3 class="lection-title">${lection.title}</h3>
            </div>
            <div class="lection-meta">
                <span class="lection-badge">${getCategoryLabel(lection.category)}</span>
                ${lection.subcategory ? `<span class="lection-badge" style="background: #ed8936;">${getSubcategoryLabel(lection.subcategory)}</span>` : ''}
                <span class="lection-badge" style="background: #48bb78;">📚 Лекция</span>
            </div>
            <p class="lection-description">${lection.description}</p>
            <div class="lection-actions">
                <a href="markdown-viewer.html?file=${lection.file}&title=${encodeURIComponent(lection.title)}&category=${lection.category}&subcategory=${lection.subcategory || ''}&author=${lection.author || 'Syntax_Syndicate'}" 
                   class="btn-primary">
                    <i class="fas fa-book-open"></i> Читать лекцию
                </a>
                <span style="color: #718096; font-size: 0.9rem;">
                    <i class="fas fa-user"></i> ${lection.author || 'Syntax_Syndicate'}
                </span>
            </div>
        `;
            
            lectionsList.appendChild(lectionCard);
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