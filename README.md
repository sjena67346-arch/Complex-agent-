# Complex AI Agent

A sophisticated AI agent powered by Google Gemini API, featuring a Gemini-like interface with advanced capabilities.

## Features

✨ **Rich Feature Set:**
- 🤖 **Advanced AI Conversations** - Powered by Google Gemini Pro
- 🖼️ **Image Analysis** - Upload and analyze images with AI
- 💻 **Code Generation** - Write, debug, and optimize code
- 💬 **Q&A** - Get detailed answers to any question
- 📝 **Text Processing** - Summarize, rewrite, and analyze text
- 🎨 **Creative Writing** - Help with stories, essays, and content
- 📊 **Data Analysis** - Process and analyze information

🎯 **User Interface:**
- Clean, modern Gemini-like design
- Dark/Light theme toggle
- Chat history management
- Responsive design for all devices
- Real-time message streaming
- Syntax highlighting for code

⚙️ **Customization:**
- Adjustable temperature for creativity
- Multiple AI models support
- Persistent chat history
- Customizable settings

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Google Gemini API key (free from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sjena67346-arch/Complex-agent-.git
   cd Complex-agent-
   ```

2. **Get your Gemini API Key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Click "Create API key"
   - Copy your API key

3. **Open the application:**
   - Open `index.html` in your web browser
   - Or deploy to a web server
   - Or use GitHub Pages for free hosting

4. **Configure API Key:**
   - Click "Settings" button
   - Paste your Gemini API key
   - Adjust other settings as desired
   - Click "Save Settings"

## Usage

### Basic Chat
1. Type your message in the input field
2. Press Enter or click the send button
3. Wait for the AI response
4. Your conversation is automatically saved

### Image Analysis
1. Click the 📷 (image) button
2. Select an image from your computer
3. Add your question about the image
4. Send the message
5. The AI will analyze and describe the image

### Code Generation
1. Click the 💻 (code) button
2. Paste your code or write code
3. Select the programming language
4. Click "Insert Code"
5. The formatted code will be added to your message
6. Send the message for AI feedback

### Chat History
- All conversations are automatically saved
- Click any chat in the History sidebar to resume it
- Clear all history with the trash icon

### Theme Toggle
- Click the 🌙/☀️ button to switch between dark and light themes
- Your preference is automatically saved

## File Structure

```
Complex-agent-/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── config.js           # Configuration settings
├── storage.js          # Local storage management
├── api.js              # Gemini API integration
├── ui.js               # UI management
├── app.js              # Main application logic
└── README.md           # This file
```

## Configuration

### Adjusting Settings

1. **Temperature (Creativity)**
   - 0.0 = More predictable, focused answers
   - 1.0 = More creative, varied responses
   - Default: 0.7

2. **AI Model**
   - `gemini-pro`: Best for text
   - `gemini-pro-vision`: Best for images and text

3. **Storage**
   - Chat history stored locally (browser)
   - API key stored securely in browser
   - No data sent to external servers except Gemini API

## API Keys & Security

- Your API key is stored locally in your browser
- API requests go directly to Google's Gemini API
- No API keys or chat data is logged on external servers
- Always keep your API key confidential
- Regenerate your API key if it's compromised

## Browser Compatibility

- ✅ Chrome/Chromium (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Edge (v90+)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### "API Key not set" error
- Open Settings and ensure your API key is entered correctly
- Get a fresh API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Image upload not working
- Check browser permissions for file access
- Ensure image file is less than 5MB
- Try a different image format (JPEG, PNG, GIF, WebP)

### Chat history not saving
- Check browser's local storage is enabled
- Try clearing browser cache
- Check if you have available storage space

### Slow responses
- Check your internet connection
- Try with a simpler prompt
- Check API rate limits in Google AI Studio

## Advanced Features

### Keyboard Shortcuts
- `Enter` - Send message
- `Shift + Enter` - New line in message
- `Escape` - Close modal

### Customization
Edit `config.js` to customize:
- API endpoints
- Storage keys
- UI settings
- Feature flags

## Roadmap

- [ ] Voice input support
- [ ] Export conversations as PDF
- [ ] Multi-language support
- [ ] Conversation branching
- [ ] Advanced search in history
- [ ] Custom system prompts
- [ ] Plugin system

## Contributing

Contributions are welcome! Please feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues, questions, or suggestions:
1. Open an issue on GitHub
2. Check existing issues for similar problems
3. Provide detailed information about your problem

## Acknowledgments

- Built with Google Gemini API
- Inspired by ChatGPT and Google Gemini
- Uses Font Awesome for icons
- Modern CSS for beautiful UI

## Legal

This project is not affiliated with Google or OpenAI. 
"Gemini" is a trademark of Google LLC.

---

**Made with ❤️ by Your AI Development Team**

**Get your API key:** [Google AI Studio](https://makersuite.google.com/app/apikey)
