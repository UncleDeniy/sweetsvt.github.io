// settings.js - Полностью рабочий интерфейс настроек
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем инициализацию менеджера настроек
    if (typeof window.settingsManager === 'undefined') {
        console.error('Менеджер настроек не инициализирован');
        // Пытаемся инициализировать
        if (typeof SettingsManager !== 'undefined') {
            window.settingsManager = new SettingsManager();
        } else {
            console.error('SettingsManager не определен');
            return;
        }
    }
    
    const settingsManager = window.settingsManager;
    
    // Элементы интерфейса
    const elements = {
        darkThemeToggle: document.getElementById('darkThemeToggle'),
        colorScheme: document.getElementById('colorScheme'),
        fontSize: document.getElementById('fontSize'),
        animationsToggle: document.getElementById('animationsToggle'),
        autoSaveToggle: document.getElementById('autoSaveToggle'),
        newTabToggle: document.getElementById('newTabToggle'),
        notificationsToggle: document.getElementById('notificationsToggle'),
        liveSearchToggle: document.getElementById('liveSearchToggle'),
        wallpaperSelect: document.getElementById('wallpaperSelect'),
        wallpaperIntensity: document.getElementById('wallpaperIntensity'),
        wallpaperSpeed: document.getElementById('wallpaperSpeedSelect'),
        wallpaperDensity: document.getElementById('wallpaperDensitySelect'),
        wallpaperColor: document.getElementById('wallpaperColorSelect'),
        exportDataBtn: document.getElementById('exportDataBtn'),
        importDataBtn: document.getElementById('importDataBtn'),
        importFile: document.getElementById('importFile'),
        resetBookmarksBtn: document.getElementById('resetBookmarksBtn'),
        resetSettingsBtn: document.getElementById('resetSettingsBtn'),
        saveSettingsBtn: document.getElementById('saveSettingsBtn'),
        resetToDefaultBtn: document.getElementById('resetToDefaultBtn'),
        
        // Статистика
        totalBookmarks: document.getElementById('totalBookmarks'),
        totalResources: document.getElementById('totalResources'),
        storageUsed: document.getElementById('storageUsed'),
        settingsCount: document.getElementById('settingsCount'),
        storageProgress: document.getElementById('storageProgress'),

        // Storage card (Данные)
        storageBar: document.getElementById('storageBar'),
        storagePercent: document.getElementById('storagePercent'),
        storageSize: document.getElementById('storageSize'),
        storageDetails: document.getElementById('storageDetails'),
        storagePie: document.getElementById('storagePie'),
        clearStorageBtn: document.getElementById('clearStorageBtn'),
        
        // Модальное окно
        confirmModal: document.getElementById('confirmModal'),
        modalTitle: document.getElementById('modalTitle'),
        modalMessage: document.getElementById('modalMessage'),
        confirmActionBtn: document.getElementById('confirmActionBtn'),
        cancelActionBtn: document.getElementById('cancelActionBtn')
    };
    
    let currentAction = null;
    
    // Проверяем существование элементов
    const checkElements = () => {
        const missingElements = [];
        Object.keys(elements).forEach(key => {
            if (!elements[key]) {
                missingElements.push(key);
            }
        });
        
        if (missingElements.length > 0) {
            console.warn('Не найдены элементы:', missingElements);
        }
        
        return missingElements.length === 0;
    };
    
    // Инициализация интерфейса настроек
    function initSettingsInterface() {
        const settings = settingsManager.getSettings();
        
        console.log('Инициализация интерфейса с настройками:', settings);
        
        // Устанавливаем значения элементов управления
        if (elements.darkThemeToggle) elements.darkThemeToggle.checked = settings.darkTheme;
        if (elements.colorScheme) elements.colorScheme.value = settings.colorScheme;
        if (elements.fontSize) elements.fontSize.value = settings.fontSize;
        if (elements.animationsToggle) elements.animationsToggle.checked = settings.animations;
        if (elements.autoSaveToggle) elements.autoSaveToggle.checked = settings.autoSave;
        if (elements.newTabToggle) elements.newTabToggle.checked = settings.newTab;
        if (elements.notificationsToggle) elements.notificationsToggle.checked = settings.notifications;
        if (elements.liveSearchToggle) elements.liveSearchToggle.checked = settings.liveSearch;

        // Live wallpaper
        if (elements.wallpaperSelect) elements.wallpaperSelect.value = settings.wallpaper || 'none';
        if (elements.wallpaperIntensity) elements.wallpaperIntensity.value = settings.wallpaperIntensity || 'normal';
        if (elements.wallpaperSpeed) elements.wallpaperSpeed.value = settings.wallpaperSpeed || 'normal';
        if (elements.wallpaperDensity) elements.wallpaperDensity.value = settings.wallpaperDensity || 'normal';
        if (elements.wallpaperColor) elements.wallpaperColor.value = settings.wallpaperColor || 'auto';
        
        console.log('Интерфейс настроек инициализирован');
    }

    function setupEventListeners() {
        // Обработчики переключателей
        if (elements.darkThemeToggle) {
            elements.darkThemeToggle.addEventListener('change', function() {
                settingsManager.updateSetting('darkTheme', this.checked);
                showNotification('Тема изменена', 'success');
            });
        }
        
        if (elements.colorScheme) {
            elements.colorScheme.addEventListener('change', function() {
                settingsManager.updateSetting('colorScheme', this.value);
                showNotification('Цветовая схема изменена', 'success');
            });
        }
        
        if (elements.fontSize) {
            elements.fontSize.addEventListener('change', function() {
                settingsManager.updateSetting('fontSize', this.value);
                showNotification('Размер шрифта изменен', 'success');
            });
        }
        
        if (elements.animationsToggle) {
            elements.animationsToggle.addEventListener('change', function() {
                settingsManager.updateSetting('animations', this.checked);
                showNotification(this.checked ? 'Анимации включены' : 'Анимации отключены', 'success');
            });
        }
        
        if (elements.autoSaveToggle) {
            elements.autoSaveToggle.addEventListener('change', function() {
                settingsManager.updateSetting('autoSave', this.checked);
                showNotification(this.checked ? 'Автосохранение включено' : 'Автосохранение отключено', 'success');
            });
        }
        
        if (elements.newTabToggle) {
            elements.newTabToggle.addEventListener('change', function() {
                settingsManager.updateSetting('newTab', this.checked);
                showNotification(this.checked ? 'Ссылки открываются в новой вкладке' : 'Ссылки открываются в текущей вкладке', 'success');
            });
        }
        
        if (elements.notificationsToggle) {
            elements.notificationsToggle.addEventListener('change', function() {
                settingsManager.updateSetting('notifications', this.checked);
                showNotification(this.checked ? 'Уведомления включены' : 'Уведомления отключены', 'success');
            });
        }
        
        if (elements.liveSearchToggle) {
            elements.liveSearchToggle.addEventListener('change', function() {
                settingsManager.updateSetting('liveSearch', this.checked);
                showNotification(this.checked ? 'Поиск при вводе включен' : 'Поиск при вводе отключен', 'success');
            });
        }

        // Live wallpaper
        if (elements.wallpaperSelect) {
            elements.wallpaperSelect.addEventListener('change', function() {
                settingsManager.updateSetting('wallpaper', this.value);
                showNotification('Живые обои обновлены', 'success');
            });
        }
        if (elements.wallpaperIntensity) {
            elements.wallpaperIntensity.addEventListener('change', function() {
                settingsManager.updateSetting('wallpaperIntensity', this.value);
                showNotification('Интенсивность обоев обновлена', 'success');
            });
        }
        
        
        if (elements.wallpaperSpeed) {
            elements.wallpaperSpeed.addEventListener('change', function() {
                settingsManager.updateSetting('wallpaperSpeed', this.value);
                showNotification('Скорость обоев обновлена', 'success');
            });
        }
        if (elements.wallpaperDensity) {
            elements.wallpaperDensity.addEventListener('change', function() {
                settingsManager.updateSetting('wallpaperDensity', this.value);
                showNotification('Плотность обоев обновлена', 'success');
            });
        }
        if (elements.wallpaperColor) {
            elements.wallpaperColor.addEventListener('change', function() {
                settingsManager.updateSetting('wallpaperColor', this.value);
                showNotification('Цвет обоев обновлён', 'success');
            });
        }
// Кнопки действий
        if (elements.saveSettingsBtn) {
            elements.saveSettingsBtn.addEventListener('click', function() {
                const success = settingsManager.saveSettings();
                if (success) {
                    showNotification('Настройки сохранены!', 'success');
                } else {
                    showNotification('Ошибка сохранения настроек', 'error');
                }
            });
        }
        
        if (elements.resetToDefaultBtn) {
            elements.resetToDefaultBtn.addEventListener('click', function() {
                showConfirmModal(
                    'Сброс к умолчанию',
                    'Все настройки будут сброшены к значениям по умолчанию. Продолжить?',
                    function() {
                        settingsManager.resetToDefault();
                        initSettingsInterface();
                        showNotification('Настройки сброшены к умолчанию', 'success');
                    }
                );
            });
        }
        
        if (elements.exportDataBtn) {
            elements.exportDataBtn.addEventListener('click', exportData);
        }
        
        if (elements.importDataBtn) {
            elements.importDataBtn.addEventListener('click', () => {
                if (elements.importFile) elements.importFile.click();
            });
        }
        
        if (elements.importFile) {
            elements.importFile.addEventListener('change', importData);
        }

        if (elements.clearStorageBtn) {
            elements.clearStorageBtn.addEventListener('click', () => showConfirmModal(
                'Очистить кэш',
                'Будут удалены локальные данные сайта (закладки, история, настройки). Продолжить?',
                clearCache
            ));
        }
        
        if (elements.resetBookmarksBtn) {
            elements.resetBookmarksBtn.addEventListener('click', () => showConfirmModal(
                'Сброс закладок',
                'Вы уверены, что хотите удалить все закладки? Это действие нельзя отменить.',
                resetBookmarks
            ));
        }
        
        if (elements.resetSettingsBtn) {
            elements.resetSettingsBtn.addEventListener('click', () => showConfirmModal(
                'Сброс настроек',
                'Все настройки будут сброшены к значениям по умолчанию. Продолжить?',
                resetSettings
            ));
        }
        
        // Модальное окно
        if (elements.confirmActionBtn) {
            elements.confirmActionBtn.addEventListener('click', function() {
                if (currentAction) {
                    currentAction();
                }
                hideConfirmModal();
            });
        }
        
        if (elements.cancelActionBtn) {
            elements.cancelActionBtn.addEventListener('click', hideConfirmModal);
        }
        
        if (elements.confirmModal) {
            elements.confirmModal.addEventListener('click', function(e) {
                if (e.target === elements.confirmModal) {
                    hideConfirmModal();
                }
            });
        }
        
        // Слушаем изменения настроек для обновления интерфейса
        document.addEventListener('settingsChanged', function(event) {
            console.log('Настройка изменена:', event.detail);
            updateStats();
        });
        
        console.log('Обработчики событий настроены');
    }
    
    function updateStats() {
        // Закладки
        try {
            // В проекте используются ud:library (map). Поддерживаем и legacy.
            const lib = JSON.parse(localStorage.getItem('ud:library') || '{}');
            const legacy = JSON.parse(localStorage.getItem('ud:bookmarks') || '[]');
            const count = lib && typeof lib === 'object' ? Object.keys(lib).length : (Array.isArray(legacy) ? legacy.length : 0);
            if (elements.totalBookmarks) elements.totalBookmarks.textContent = count;
        } catch (e) {
            console.error('Ошибка загрузки закладок:', e);
        }
        
        // Ресурсы
        let resourceCount = 0;
        try {
            if (window.itResources) resourceCount += window.itResources.length;
            if (window.customizationResources) resourceCount += window.customizationResources.length;
        } catch(e) {
            resourceCount = 0;
        }
        if (elements.totalResources) {
            elements.totalResources.textContent = resourceCount;
        }
        
        // Использование хранилища
        const storage = calculateStorageUsage();
        const usagePercent = Math.min(100, Math.round((storage.used / storage.total) * 100));
        const usedMB = storage.used / (1024 * 1024);
        if (elements.storageUsed) elements.storageUsed.textContent = `${usagePercent}%`;
        if (elements.storageProgress) elements.storageProgress.style.width = `${usagePercent}%`;
        updateStorageCard(storage, usagePercent, usedMB);
        drawStoragePie(storage, usagePercent);
        
        // Количество настроек
        const settings = settingsManager.getSettings();
        if (elements.settingsCount) {
            elements.settingsCount.textContent = Object.keys(settings).length;
        }
        
        console.log('Статистика обновлена');
    }

    function updateStorageCard(storage, usagePercent, usedMB) {
        if (elements.storagePercent) elements.storagePercent.textContent = `${usagePercent}%`;
        if (elements.storageSize) elements.storageSize.textContent = `${usedMB.toFixed(2)} MB из ${(storage.total / (1024*1024)).toFixed(0)} MB`;

        if (elements.storageBar) {
            elements.storageBar.style.width = `${usagePercent}%`;
            elements.storageBar.classList.remove('storage-ok', 'storage-warn', 'storage-danger');
            if (usagePercent >= 90) elements.storageBar.classList.add('storage-danger');
            else if (usagePercent >= 70) elements.storageBar.classList.add('storage-warn');
            else elements.storageBar.classList.add('storage-ok');
        }

        if (elements.storageDetails) {
            const kb = (b) => (b / 1024).toFixed(1);
            elements.storageDetails.innerHTML = [
                `<div class="row"><span><strong>Закладки</strong></span><span>${kb(storage.groups.bookmarks)} KB</span></div>`,
                `<div class="row"><span><strong>Настройки</strong></span><span>${kb(storage.groups.settings)} KB</span></div>`,
                `<div class="row"><span><strong>История</strong></span><span>${kb(storage.groups.history)} KB</span></div>`,
                `<div class="row"><span><strong>Прочее</strong></span><span>${kb(storage.groups.other)} KB</span></div>`
            ].join('');
        }
    }

    function drawStoragePie(storage, usagePercent) {
        if (!elements.storagePie) return;
        const c = elements.storagePie;
        const ctx = c.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const cssSize = 120;
        if (c.width !== cssSize * dpr) {
            c.width = cssSize * dpr;
            c.height = cssSize * dpr;
            c.style.width = cssSize + 'px';
            c.style.height = cssSize + 'px';
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const center = cssSize / 2;
        const r = 54;
        const hole = 34;

        ctx.clearRect(0, 0, cssSize, cssSize);

        const totalUsed = Object.values(storage.groups).reduce((a,b)=>a+b,0) || 1;
        const segs = [
            { k: 'bookmarks', label: 'B', color: '#60a5fa' },
            { k: 'settings',  label: 'S', color: '#a78bfa' },
            { k: 'history',   label: 'H', color: '#facc15' },
            { k: 'other',     label: 'O', color: '#22c55e' },
        ];

        let a = -Math.PI / 2;
        for (const s of segs) {
            const v = storage.groups[s.k] || 0;
            const da = (v / totalUsed) * Math.PI * 2;
            if (da <= 0) continue;
            ctx.beginPath();
            ctx.moveTo(center, center);
            ctx.arc(center, center, r, a, a + da);
            ctx.closePath();
            ctx.fillStyle = s.color;
            ctx.fill();
            a += da;
        }

        // donut hole
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(center, center, hole, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';

        // center text
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--aa-text') || '#111';
        ctx.font = '700 18px system-ui, -apple-system, Segoe UI, Roboto, Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${usagePercent}%`, center, center - 2);
        ctx.font = '500 10px system-ui, -apple-system, Segoe UI, Roboto, Arial';
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--aa-text-muted') || '#666';
        ctx.fillText('localStorage', center, center + 14);
    }
    
    function bytesUTF16(str) {
        return (str ? String(str).length : 0) * 2;
    }

    // Группируем ключи, чтобы показать детализацию (закладки/настройки/история/прочее)
    function classifyKey(key) {
        if (!key) return 'other';
        if (key === 'bookmarks' || key.startsWith('ud:')) return 'bookmarks';
        if (key === 'syntax_syndicate_settings' || key === 'ss:theme' || key.startsWith('ss:')) return 'settings';
        if (key === 'tagHistory' || key === 'tagsViewHistory' || key.toLowerCase().includes('history')) return 'history';
        return 'other';
    }

    function calculateStorageUsage() {
        const groups = { bookmarks: 0, settings: 0, history: 0, other: 0 };
        let used = 0;
        
        try {
            if (typeof Storage !== 'undefined') {
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    const value = localStorage.getItem(key) || '';
                    const bytes = bytesUTF16(key) + bytesUTF16(value);
                    used += bytes;
                    const bucket = classifyKey(key);
                    groups[bucket] += bytes;
                }
            }
        } catch (e) {
            console.warn('localStorage недоступен:', e);
        }

        // На практике quota зависит от браузера. Делаем “честную” шкалу для UI (20MB) + защиту.
        const total = 20 * 1024 * 1024;
        return { used, total, groups };
    }
    
    function exportData() {
        try {
            const entries = {};
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                entries[k] = localStorage.getItem(k);
            }

            const storage = calculateStorageUsage();
            const usedMB = storage.used / (1024 * 1024);

            const data = {
                version: '3.0',
                exportedAt: new Date().toISOString(),
                app: 'Syntax Syndicate',
                entries,
                summary: {
                    usedMB: Number(usedMB.toFixed(2)),
                    groupsKB: {
                        bookmarks: Number((storage.groups.bookmarks / 1024).toFixed(1)),
                        settings: Number((storage.groups.settings / 1024).toFixed(1)),
                        history: Number((storage.groups.history / 1024).toFixed(1)),
                        other: Number((storage.groups.other / 1024).toFixed(1))
                    }
                }
            };

            const dataStr = JSON.stringify(data, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `syntax_syndicate_backup_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            showNotification('Данные успешно экспортированы!', 'success');
        } catch (error) {
            console.error('Ошибка экспорта данных:', error);
            showNotification('Ошибка экспорта данных', 'error');
        }
    }
    
    function importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const data = JSON.parse(e.target.result);
                const entries = data && data.entries && typeof data.entries === 'object' ? data.entries : null;

                if (!entries) {
                    showNotification('Файл не похож на резервную копию (нет поля entries)', 'error');
                    event.target.value = '';
                    return;
                }

                showConfirmModal(
                    'Импорт данных',
                    'Импорт заменит текущие локальные данные сайта. Продолжить?',
                    function () {
                        try {
                            localStorage.clear();
                            Object.keys(entries).forEach((k) => {
                                if (entries[k] === null || typeof entries[k] === 'undefined') return;
                                localStorage.setItem(k, String(entries[k]));
                            });

                            // Перечитываем и применяем настройки
                            try {
                                settingsManager.loadSettings?.();
                                settingsManager.applySettings?.();
                            } catch {}
                            initSettingsInterface();
                            updateStats();

                            showNotification('Данные успешно импортированы!', 'success');
                            event.target.value = '';
                        } catch (importError) {
                            console.error('Ошибка импорта данных:', importError);
                            showNotification('Ошибка импорта данных', 'error');
                        }
                    }
                );
            } catch (error) {
                console.error('Ошибка чтения файла:', error);
                showNotification('Ошибка при чтении файла: ' + error.message, 'error');
            }
        };
        reader.onerror = function () {
            showNotification('Ошибка чтения файла', 'error');
        };
        reader.readAsText(file);
    }

    function clearCache() {
        try {
            const keep = new Map();
            // Сохраним режим темы, чтобы после очистки не было “мигания”
            const themeKey = window.__SS_THEME__?.key || 'ss:theme';
            const themeVal = localStorage.getItem(themeKey);
            if (themeVal) keep.set(themeKey, themeVal);

            localStorage.clear();
            for (const [k, v] of keep.entries()) {
                localStorage.setItem(k, v);
            }

            try {
                settingsManager.resetToDefault?.();
            } catch {}
            initSettingsInterface();
            updateStats();
            showNotification('Кэш очищен', 'success');
        } catch (e) {
            console.error('Ошибка очистки кэша:', e);
            showNotification('Не удалось очистить кэш', 'error');
        }
    }
    
    function resetBookmarks() {
        try {
            localStorage.setItem('bookmarks', JSON.stringify([]));
            showNotification('Все закладки удалены!', 'success');
            updateStats();
            console.log('Закладки сброшены');
        } catch (error) {
            console.error('Ошибка сброса закладок:', error);
            showNotification('Ошибка сброса закладок', 'error');
        }
    }
    
    function resetSettings() {
        settingsManager.resetToDefault();
        initSettingsInterface();
        showNotification('Настройки сброшены к умолчанию', 'success');
        console.log('Настройки сброшены');
    }
    
    function showConfirmModal(title, message, action) {
        if (elements.modalTitle) elements.modalTitle.textContent = title;
        if (elements.modalMessage) elements.modalMessage.textContent = message;
        currentAction = action;
        if (elements.confirmModal) {
            elements.confirmModal.style.display = 'flex';
            elements.confirmModal.style.opacity = '0';
            
            requestAnimationFrame(() => {
                elements.confirmModal.style.opacity = '1';
            });
        }
    }
    
    function hideConfirmModal() {
        if (elements.confirmModal) {
            elements.confirmModal.style.opacity = '0';
            setTimeout(() => {
                elements.confirmModal.style.display = 'none';
            }, 300);
        }
        currentAction = null;
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `settings-notification settings-notification-${type}`;
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
        `;
        
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

    // Инициализация
    if (checkElements()) {
        initSettingsInterface();
        updateStats();
        setupEventListeners();
    } else {
        console.error('Не все элементы настроек найдены на странице');
        // Все равно пытаемся инициализировать то, что есть
        initSettingsInterface();
        updateStats();
        setupEventListeners();
    }
    
    // Периодическое обновление статистики
    setInterval(updateStats, 30000);
    
    console.log('Settings.js полностью загружен и инициализирован');
});


