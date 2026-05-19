// Main Application
let uiManager;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI Manager
    uiManager = new UIManager();

    // Load API key if exists
    const apiKey = Storage.getApiKey();
    if (!apiKey) {
        setTimeout(() => {
            alert('Welcome to Complex AI Agent! Please configure your Gemini API key in Settings to get started.');
            uiManager.openSettingsModal();
        }, 500);
    }

    console.log('Complex AI Agent initialized successfully');
});

// Handle errors
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});
