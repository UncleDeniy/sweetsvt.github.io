// settings-main.js - Упрощенные настройки для главной страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем менеджер настроек если его нет
    if (typeof window.settingsManager === 'undefined') {
        if (typeof SettingsManager !== 'undefined') {
            window.settingsManager = new SettingsManager();
        } else {
            console.warn('SettingsManager не доступен на главной странице');
            // Создаем минимальную функциональность
            window.settingsManager = {
                getSettings: () => ({}),
                updateSetting: () => true,
                applySettings: () => {}
            };
            return;
        }
    }

    const settingsManager = window.settingsManager;

    // Применяем настройки при загрузке
    settingsManager.applySettings();

    // Обновляем счетчик закладок
    function updateBookmarkCount() {
        try {
            const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
            const bookmarkCount = document.getElementById('bookmarkCount');
            if (bookmarkCount) {
                bookmarkCount.textContent = bookmarks.length;
            }
        } catch (e) {
            console.error('Ошибка обновления счетчика закладок:', e);
        }
    }

    // Инициализация для главной страницы
    function initMainPage() {
        updateBookmarkCount();
        
        // Обновляем счетчик каждые 10 секунд
        setInterval(updateBookmarkCount, 10000);
        
        console.log('Настройки для главной страницы инициализированы');
    }

    initMainPage();
});