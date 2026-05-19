// Configuration file for the Complex AI Agent
const CONFIG = {
    // API Configuration
    API: {
        BASE_URL: 'https://generativelanguage.googleapis.com/v1beta/models',
        DEFAULT_MODEL: 'gemini-pro',
        VISION_MODEL: 'gemini-pro-vision',
        DEFAULT_TEMPERATURE: 0.7,
        MAX_TOKENS: 2048
    },

    // Storage Keys
    STORAGE: {
        API_KEY: 'complex_ai_api_key',
        CHAT_HISTORY: 'complex_ai_chat_history',
        USER_SETTINGS: 'complex_ai_settings',
        THEME: 'complex_ai_theme'
    },

    // UI Configuration
    UI: {
        MAX_HISTORY_ITEMS: 50,
        MESSAGE_ANIMATION_DURATION: 300,
        AUTO_SCROLL: true
    },

    // Feature Flags
    FEATURES: {
        IMAGE_ANALYSIS: true,
        CODE_GENERATION: true,
        HISTORY: true,
        THEME_TOGGLE: true,
        EXPORT_CHAT: false
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}