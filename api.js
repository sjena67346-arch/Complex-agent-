// Gemini API Integration
class GeminiAPI {
    constructor() {
        this.apiKey = Storage.getApiKey();
        this.settings = Storage.getSettings();
    }

    setApiKey(apiKey) {
        this.apiKey = apiKey;
        Storage.saveApiKey(apiKey);
    }

    async sendMessage(prompt, imageData = null) {
        if (!this.apiKey) {
            throw new Error('API Key not set. Please configure your Gemini API key in settings.');
        }

        try {
            const endpoint = imageData ? CONFIG.API.VISION_MODEL : this.settings.model;
            const url = `${CONFIG.API.BASE_URL}/${endpoint}:generateContent?key=${this.apiKey}`;

            const requestBody = this.buildRequestBody(prompt, imageData);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'API request failed');
            }

            const data = await response.json();
            return this.extractResponseText(data);
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    buildRequestBody(prompt, imageData) {
        const parts = [];

        if (imageData) {
            parts.push({
                inlineData: {
                    mimeType: 'image/jpeg',
                    data: imageData.split(',')[1] // Remove data:image/jpeg;base64, prefix
                }
            });
        }

        parts.push({
            text: prompt
        });

        return {
            contents: [
                {
                    parts: parts
                }
            ],
            generationConfig: {
                temperature: this.settings.temperature,
                maxOutputTokens: CONFIG.API.MAX_TOKENS,
                topP: 0.95,
                topK: 40
            }
        };
    }

    extractResponseText(response) {
        try {
            const text = response.candidates[0]?.content?.parts[0]?.text;
            if (!text) {
                throw new Error('No valid response from API');
            }
            return text;
        } catch (error) {
            console.error('Error extracting response:', error);
            throw new Error('Failed to parse API response');
        }
    }

    updateSettings(settings) {
        this.settings = settings;
        Storage.saveSettings(settings);
    }

    async testConnection() {
        try {
            const response = await this.sendMessage('Hello');
            return response ? true : false;
        } catch (error) {
            console.error('Connection test failed:', error);
            return false;
        }
    }
}

// Initialize API
const geminiAPI = new GeminiAPI();
