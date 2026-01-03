// settings-core.js - Базовый менеджер настроек
class SettingsManager {
    constructor() {
        this.settings = this.getDefaultSettings();
        this.loadSettings();
        this.applySettings();
        this.initAutoSave();
    }

    getDefaultSettings() {
        return {
            version: '1.0',
            darkTheme: false,
            colorScheme: 'default',
            fontSize: 'medium',
            animations: true,
            autoSave: true,
            newTab: true,
            notifications: true,
            liveSearch: true
        };
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('syntax_syndicate_settings');
            if (saved) {
                const parsed = JSON.parse(saved);
                Object.keys(parsed).forEach(key => {
                    if (this.settings.hasOwnProperty(key)) {
                        this.settings[key] = parsed[key];
                    }
                });
            }
        } catch (error) {
            console.error('Ошибка загрузки настроек:', error);
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('syntax_syndicate_settings', JSON.stringify(this.settings));
            this.applySettings();
            return true;
        } catch (error) {
            console.error('Ошибка сохранения настроек:', error);
            return false;
        }
    }

    applySettings() {
        // Применяем тему
        const wantDark = !!this.settings.darkTheme;
        document.body.classList.toggle('dark-theme', wantDark);
        // Единый источник истины для новой темы (CSS vars)
        if (window.__SS_THEME__) {
            window.__SS_THEME__.set(wantDark ? 'dark' : 'light');
        } else {
            // fallback: на всякий случай, если theme.js не подключился
            document.documentElement.dataset.theme = wantDark ? 'dark' : 'light';
        }
        
        // Применяем цветовую схему
        document.body.classList.remove('color-scheme-green', 'color-scheme-purple', 'color-scheme-orange');
        if (this.settings.colorScheme !== 'default') {
            document.body.classList.add(`color-scheme-${this.settings.colorScheme}`);
        }
        
        // Применяем размер шрифта
        const sizes = { 'small': '14px', 'medium': '16px', 'large': '18px', 'xlarge': '20px' };
        document.documentElement.style.fontSize = sizes[this.settings.fontSize] || '16px';
        
        // Применяем анимации
        if (this.settings.animations) {
            document.body.classList.remove('no-animations');
        } else {
            document.body.classList.add('no-animations');
        }
    }

    initAutoSave() {
        // Автосохранение при изменении настроек
        if (this.settings.autoSave) {
            document.addEventListener('settingsChanged', () => {
                this.saveSettings();
            });
        }
    }

    updateSetting(key, value) {
        if (this.settings.hasOwnProperty(key)) {
            this.settings[key] = value;
            
            if (this.settings.autoSave) {
                this.saveSettings();
            } else {
                this.applySettings();
            }
            
            const event = new CustomEvent('settingsChanged', {
                detail: { key, value }
            });
            document.dispatchEvent(event);
            
            return true;
        }
        return false;
    }

    getSettings() {
        return { ...this.settings };
    }

    resetToDefault() {
        this.settings = this.getDefaultSettings();
        this.saveSettings();
    }

    // Метод для показа уведомлений
    showNotification(message, type = 'info') {
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
}

// Глобальный экземпляр
if (typeof window !== 'undefined') {
    window.SettingsManager = SettingsManager;
    window.settingsManager = new SettingsManager();
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.settingsManager) {
        window.settingsManager.applySettings();
    }
});