// Local Storage Management
class Storage {
    static saveApiKey(apiKey) {
        localStorage.setItem(CONFIG.STORAGE.API_KEY, apiKey);
    }

    static getApiKey() {
        return localStorage.getItem(CONFIG.STORAGE.API_KEY);
    }

    static saveChatHistory(history) {
        try {
            localStorage.setItem(CONFIG.STORAGE.CHAT_HISTORY, JSON.stringify(history));
        } catch (error) {
            console.error('Error saving chat history:', error);
        }
    }

    static getChatHistory() {
        try {
            const history = localStorage.getItem(CONFIG.STORAGE.CHAT_HISTORY);
            return history ? JSON.parse(history) : [];
        } catch (error) {
            console.error('Error retrieving chat history:', error);
            return [];
        }
    }

    static addToHistory(title, messages) {
        const history = this.getChatHistory();
        const chatSession = {
            id: Date.now(),
            title: title || 'Untitled Chat',
            timestamp: new Date().toISOString(),
            messages: messages || []
        };
        history.unshift(chatSession);
        // Keep only last 50 sessions
        if (history.length > CONFIG.UI.MAX_HISTORY_ITEMS) {
            history.pop();
        }
        this.saveChatHistory(history);
        return chatSession;
    }

    static updateHistoryMessages(chatId, messages) {
        const history = this.getChatHistory();
        const index = history.findIndex(chat => chat.id === chatId);
        if (index !== -1) {
            history[index].messages = messages;
            this.saveChatHistory(history);
        }
    }

    static deleteFromHistory(chatId) {
        let history = this.getChatHistory();
        history = history.filter(chat => chat.id !== chatId);
        this.saveChatHistory(history);
    }

    static clearAllHistory() {
        localStorage.removeItem(CONFIG.STORAGE.CHAT_HISTORY);
    }

    static saveSettings(settings) {
        try {
            localStorage.setItem(CONFIG.STORAGE.USER_SETTINGS, JSON.stringify(settings));
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    }

    static getSettings() {
        try {
            const settings = localStorage.getItem(CONFIG.STORAGE.USER_SETTINGS);
            return settings ? JSON.parse(settings) : {
                model: CONFIG.API.DEFAULT_MODEL,
                temperature: CONFIG.API.DEFAULT_TEMPERATURE
            };
        } catch (error) {
            console.error('Error retrieving settings:', error);
            return {
                model: CONFIG.API.DEFAULT_MODEL,
                temperature: CONFIG.API.DEFAULT_TEMPERATURE
            };
        }
    }

    static setTheme(theme) {
        localStorage.setItem(CONFIG.STORAGE.THEME, theme);
        document.documentElement.setAttribute('data-theme', theme);
    }

    static getTheme() {
        const theme = localStorage.getItem(CONFIG.STORAGE.THEME) || 'light';
        return theme;
    }
}
