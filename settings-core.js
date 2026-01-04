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
            version: '1.1',
            darkTheme: false,
            colorScheme: 'default',
            fontSize: 'medium',
            animations: true,
            autoSave: true,
            newTab: true,
            notifications: true,
            liveSearch: true,

            // Live wallpaper (global background layer)
            wallpaper: 'none',
            wallpaperIntensity: 'normal'
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
        
        // Live wallpaper
        try {
            document.documentElement.dataset.wallpaper = this.settings.wallpaper || 'none';
            document.documentElement.dataset.wallpaperIntensity = this.settings.wallpaperIntensity || 'normal';
        } catch {}

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
        // Respect user preference
        if (this.settings && this.settings.notifications === false) return;

        const containerId = 'aaToasts';
        let host = document.getElementById(containerId);
        if (!host) {
            host = document.createElement('div');
            host.id = containerId;
            host.className = 'aa-toasts';
            host.setAttribute('aria-live', 'polite');
            host.setAttribute('aria-relevant', 'additions');
            document.body.appendChild(host);
        }

        const toast = document.createElement('div');
        toast.className = `aa-toast aa-toast-${type}`;
        toast.setAttribute('role', 'status');

        const icon = document.createElement('div');
        icon.className = 'aa-toast__icon';
        icon.innerHTML = type === 'success' ? '✓' : (type === 'error' ? '!' : 'i');

        const text = document.createElement('div');
        text.className = 'aa-toast__text';
        text.textContent = message;

        const close = document.createElement('button');
        close.type = 'button';
        close.className = 'aa-toast__close';
        close.setAttribute('aria-label', 'Закрыть уведомление');
        close.textContent = '×';

        toast.appendChild(icon);
        toast.appendChild(text);
        toast.appendChild(close);

        const remove = () => {
            toast.classList.add('is-leaving');
            setTimeout(() => toast.remove(), 200);
        };

        close.addEventListener('click', remove);

        host.appendChild(toast);

        // Auto-hide
        setTimeout(remove, 3200);
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