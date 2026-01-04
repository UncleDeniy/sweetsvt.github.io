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
            const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
            if (elements.totalBookmarks) {
                elements.totalBookmarks.textContent = bookmarks.length;
            }
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
        if (elements.storageUsed) {
            elements.storageUsed.textContent = `${usagePercent}%`;
        }
        if (elements.storageProgress) {
            elements.storageProgress.style.width = `${usagePercent}%`;
        }
        
        // Количество настроек
        const settings = settingsManager.getSettings();
        if (elements.settingsCount) {
            elements.settingsCount.textContent = Object.keys(settings).length;
        }
        
        console.log('Статистика обновлена');
    }
    
    function calculateStorageUsage() {
        let total = 0;
        let used = 0;
        
        try {
            if (typeof Storage !== 'undefined') {
                for (let key in localStorage) {
                    if (localStorage.hasOwnProperty(key)) {
                        const value = localStorage.getItem(key);
                        used += key.length + (value ? value.length : 0);
                    }
                }
                total = 5 * 1024 * 1024; // 5MB
            }
        } catch(e) {
            console.warn('localStorage недоступен:', e);
            total = 1;
            used = 0;
        }
        
        return { used, total };
    }
    
    function exportData() {
        try {
            const data = {
                version: '2.0',
                exportDate: new Date().toISOString(),
                bookmarks: JSON.parse(localStorage.getItem('bookmarks') || '[]'),
                settings: settingsManager.getSettings(),
                tagsHistory: JSON.parse(localStorage.getItem('tagsViewHistory') || '{}')
            };
            
            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `syntax_syndicate_backup_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            showNotification('Данные успешно экспортированы!', 'success');
            console.log('Данные экспортированы');
        } catch (error) {
            console.error('Ошибка экспорта данных:', error);
            showNotification('Ошибка экспорта данных', 'error');
        }
    }
    
    function importData(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                
                showConfirmModal(
                    'Импорт данных',
                    'Вы уверены, что хотите импортировать данные? Существующие данные могут быть перезаписаны.',
                    function() {
                        try {
                            if (data.bookmarks) {
                                localStorage.setItem('bookmarks', JSON.stringify(data.bookmarks));
                            }
                            
                            if (data.settings) {
                                Object.keys(data.settings).forEach(key => {
                                    settingsManager.updateSetting(key, data.settings[key]);
                                });
                                initSettingsInterface();
                            }
                            
                            if (data.tagsHistory) {
                                localStorage.setItem('tagsViewHistory', JSON.stringify(data.tagsHistory));
                            }
                            
                            showNotification('Данные успешно импортированы!', 'success');
                            updateStats();
                            event.target.value = '';
                            console.log('Данные импортированы');
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
        reader.onerror = function() {
            showNotification('Ошибка чтения файла', 'error');
        };
        reader.readAsText(file);
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


