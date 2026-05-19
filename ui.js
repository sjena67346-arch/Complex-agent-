// UI Management
class UIManager {
    constructor() {
        this.currentChatId = null;
        this.messages = [];
        this.selectedImage = null;
        this.isLoading = false;
        this.initializeElements();
        this.attachEventListeners();
        this.loadTheme();
        this.renderHistory();
    }

    initializeElements() {
        // Main elements
        this.messagesArea = document.getElementById('messagesArea');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.inputForm = document.getElementById('inputForm');
        this.newChatBtn = document.getElementById('newChatBtn');
        this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
        this.settingsBtn = document.getElementById('settingsBtn');
        this.themeBtn = document.getElementById('themeBtn');

        // Modals
        this.settingsModal = document.getElementById('settingsModal');
        this.codeModal = document.getElementById('codeModal');
        this.closeSettingsBtn = document.getElementById('closeSettingsBtn');
        this.closeCodeBtn = document.getElementById('closeCodeBtn');
        this.saveSettingsBtn = document.getElementById('savSettingsBtn');
        this.insertCodeBtn = document.getElementById('insertCodeBtn');
        this.cancelCodeBtn = document.getElementById('cancelCodeBtn');

        // Settings inputs
        this.apiKeyInput = document.getElementById('apiKeyInput');
        this.modelSelect = document.getElementById('modelSelect');
        this.temperatureSlider = document.getElementById('temperatureSlider');
        this.temperatureValue = document.getElementById('temperatureValue');

        // Code modal inputs
        this.codeInput = document.getElementById('codeInput');
        this.languageSelect = document.getElementById('languageSelect');

        // Image handling
        this.imageUploadBtn = document.getElementById('imageUploadBtn');
        this.imageInput = document.getElementById('imageInput');
        this.imagePreview = document.getElementById('imagePreview');
        this.previewImage = document.getElementById('previewImage');
        this.removeImageBtn = document.getElementById('removeImageBtn');

        // Tools
        this.imageUploadBtn = document.getElementById('imageUploadBtn');
        this.codeBtn = document.getElementById('codeBtn');

        // History list
        this.historyList = document.getElementById('historyList');
    }

    attachEventListeners() {
        // Chat events
        this.inputForm.addEventListener('submit', (e) => this.handleSendMessage(e));
        this.newChatBtn.addEventListener('click', () => this.newChat());
        this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());

        // Settings events
        this.settingsBtn.addEventListener('click', () => this.openSettingsModal());
        this.closeSettingsBtn.addEventListener('click', () => this.closeModal(this.settingsModal));
        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        this.temperatureSlider.addEventListener('input', (e) => {
            this.temperatureValue.textContent = e.target.value;
        });

        // Code modal events
        this.codeBtn.addEventListener('click', () => this.openCodeModal());
        this.closeCodeBtn.addEventListener('click', () => this.closeModal(this.codeModal));
        this.insertCodeBtn.addEventListener('click', () => this.insertCode());
        this.cancelCodeBtn.addEventListener('click', () => this.closeModal(this.codeModal));

        // Image events
        this.imageUploadBtn.addEventListener('click', () => this.imageInput.click());
        this.imageInput.addEventListener('change', (e) => this.handleImageUpload(e));
        this.removeImageBtn.addEventListener('click', () => this.removeImage());

        // Theme toggle
        this.themeBtn.addEventListener('click', () => this.toggleTheme());

        // Click outside modal to close
        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) {
                this.closeModal(this.settingsModal);
            }
        });

        this.codeModal.addEventListener('click', (e) => {
            if (e.target === this.codeModal) {
                this.closeModal(this.codeModal);
            }
        });
    }

    loadTheme() {
        const theme = Storage.getTheme();
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeButton(theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        Storage.setTheme(newTheme);
        this.updateThemeButton(newTheme);
    }

    updateThemeButton(theme) {
        const icon = this.themeBtn.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    newChat() {
        this.currentChatId = null;
        this.messages = [];
        this.clearMessages();
        this.messageInput.focus();
        this.renderHistory();
    }

    clearHistory() {
        if (confirm('Are you sure you want to clear all chat history? This action cannot be undone.')) {
            Storage.clearAllHistory();
            this.newChat();
            this.renderHistory();
        }
    }

    async handleSendMessage(e) {
        e.preventDefault();

        const message = this.messageInput.value.trim();
        if (!message && !this.selectedImage) return;

        if (this.isLoading) return;

        // Create chat session if needed
        if (!this.currentChatId) {
            const chatTitle = message.substring(0, 30) + (message.length > 30 ? '...' : '');
            const chatSession = Storage.addToHistory(chatTitle, []);
            this.currentChatId = chatSession.id;
        }

        // Add user message
        const userMessage = {
            role: 'user',
            content: message,
            image: this.selectedImage,
            timestamp: new Date().toISOString()
        };

        this.messages.push(userMessage);
        this.addMessageToDOM(userMessage);
        this.messageInput.value = '';
        this.removeImage();
        this.scrollToBottom();

        // Send to API
        this.isLoading = true;
        this.sendBtn.disabled = true;

        try {
            const response = await geminiAPI.sendMessage(message, this.selectedImage);

            const assistantMessage = {
                role: 'assistant',
                content: response,
                timestamp: new Date().toISOString()
            };

            this.messages.push(assistantMessage);
            this.addMessageToDOM(assistantMessage);
            Storage.updateHistoryMessages(this.currentChatId, this.messages);
            this.scrollToBottom();
        } catch (error) {
            const errorMessage = {
                role: 'assistant',
                content: `Error: ${error.message}`,
                isError: true,
                timestamp: new Date().toISOString()
            };
            this.messages.push(errorMessage);
            this.addMessageToDOM(errorMessage);
        } finally {
            this.isLoading = false;
            this.sendBtn.disabled = false;
            this.messageInput.focus();
        }
    }

    addMessageToDOM(message) {
        const messageEl = document.createElement('div');
        messageEl.classList.add('message', message.role);

        const avatarEl = document.createElement('div');
        avatarEl.classList.add('message-avatar');
        avatarEl.innerHTML = message.role === 'user'
            ? '<i class="fas fa-user"></i>'
            : '<i class="fas fa-robot"></i>';

        const contentEl = document.createElement('div');
        contentEl.classList.add('message-content');

        if (message.image) {
            const imgEl = document.createElement('img');
            imgEl.src = message.image;
            imgEl.classList.add('message-image');
            contentEl.appendChild(imgEl);
        }

        if (message.isError) {
            contentEl.style.borderLeft = '3px solid #f87171';
            contentEl.innerHTML = `<p style="color: #dc2626;"><strong>Error:</strong> ${message.content}</p>`;
        } else {
            const textEl = document.createElement('div');
            textEl.innerHTML = this.formatMessage(message.content);
            contentEl.appendChild(textEl);
        }

        messageEl.appendChild(avatarEl);
        messageEl.appendChild(contentEl);
        this.messagesArea.appendChild(messageEl);
    }

    formatMessage(text) {
        // Convert markdown-like formatting to HTML
        let html = text
            .replace(/```([\s\S]*?)```/g, (match, code) => {
                return `<pre><code>${this.escapeHtml(code)}</code></pre>`;
            })
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\*([^*]+)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
        return html;
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    clearMessages() {
        this.messagesArea.innerHTML = `
            <div class="message welcome-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <h2>Welcome to Complex AI Agent</h2>
                    <p>I'm your advanced AI assistant powered by Google Gemini. I can help you with:</p>
                    <ul>
                        <li><strong>Questions & Answers:</strong> Ask me anything and get detailed answers</li>
                        <li><strong>Code Generation:</strong> Write, debug, and optimize code</li>
                        <li><strong>Image Analysis:</strong> Upload images for analysis and description</li>
                        <li><strong>Creative Writing:</strong> Help with stories, essays, and content</li>
                        <li><strong>Data Analysis:</strong> Process and analyze information</li>
                    </ul>
                </div>
            </div>
        `;
    }

    renderHistory() {
        const history = Storage.getChatHistory();
        this.historyList.innerHTML = '';

        if (history.length === 0) {
            this.historyList.innerHTML = '<p style="color: var(--text-secondary); font-size: 12px; padding: 12px; text-align: center;">No chat history</p>';
            return;
        }

        history.forEach(chat => {
            const item = document.createElement('div');
            item.classList.add('history-item');
            if (this.currentChatId === chat.id) {
                item.classList.add('active');
            }
            item.textContent = chat.title;
            item.addEventListener('click', () => this.loadChat(chat));
            this.historyList.appendChild(item);
        });
    }

    loadChat(chat) {
        this.currentChatId = chat.id;
        this.messages = chat.messages || [];
        this.clearMessages();
        this.messages.forEach(msg => {
            this.addMessageToDOM(msg);
        });
        this.scrollToBottom();
        this.renderHistory();
    }

    handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            this.selectedImage = event.target.result;
            this.previewImage.src = this.selectedImage;
            this.imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    removeImage() {
        this.selectedImage = null;
        this.imagePreview.style.display = 'none';
        this.imageInput.value = '';
    }

    openSettingsModal() {
        const settings = Storage.getSettings();
        this.apiKeyInput.value = Storage.getApiKey() || '';
        this.modelSelect.value = settings.model || CONFIG.API.DEFAULT_MODEL;
        this.temperatureSlider.value = settings.temperature || CONFIG.API.DEFAULT_TEMPERATURE;
        this.temperatureValue.textContent = this.temperatureSlider.value;
        this.openModal(this.settingsModal);
    }

    saveSettings() {
        const apiKey = this.apiKeyInput.value.trim();
        if (!apiKey) {
            alert('Please enter your Gemini API key');
            return;
        }

        geminiAPI.setApiKey(apiKey);
        const settings = {
            model: this.modelSelect.value,
            temperature: parseFloat(this.temperatureSlider.value)
        };
        geminiAPI.updateSettings(settings);
        alert('Settings saved successfully!');
        this.closeModal(this.settingsModal);
    }

    openCodeModal() {
        this.codeInput.value = '';
        this.languageSelect.value = '';
        this.openModal(this.codeModal);
    }

    insertCode() {
        const code = this.codeInput.value.trim();
        const language = this.languageSelect.value;

        if (!code) {
            alert('Please enter some code');
            return;
        }

        let formattedCode = language ? `\`\`\`${language}\n${code}\n\`\`\`` : `\`\`\`\n${code}\n\`\`\``;
        this.messageInput.value += formattedCode;
        this.closeModal(this.codeModal);
        this.messageInput.focus();
    }

    openModal(modal) {
        modal.classList.add('active');
    }

    closeModal(modal) {
        modal.classList.remove('active');
    }

    scrollToBottom() {
        setTimeout(() => {
            this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
        }, 100);
    }
}
