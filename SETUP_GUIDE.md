# Complex AI Agent - Setup Guide

## Quick Start (5 minutes)

### Step 1: Get Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API key"
4. Copy the generated API key

### Step 2: Open the Application
- **Option A: Local File**
  - Download or clone the repository
  - Open `index.html` in your browser
  - Click "Settings"
  - Paste your API key
  - Click "Save Settings"

- **Option B: GitHub Pages (Recommended)**
  - Enable GitHub Pages in repository settings
  - Access the live version online
  - No setup required on your computer

### Step 3: Start Chatting!
- Type your first message
- Press Enter or click send
- Enjoy AI-powered responses!

## Detailed Configuration

### API Key Setup

1. **Getting Your API Key:**
   ```
   Visit: https://makersuite.google.com/app/apikey
   Click: "Create API key in new project"
   Copy: The generated key
   ```

2. **Adding to Complex AI Agent:**
   - Click ⚙️ Settings button
   - Paste API key in "Gemini API Key" field
   - Adjust temperature if desired (0-1)
   - Click "Save Settings"

3. **Securing Your API Key:**
   - API key is stored only in your browser
   - Clear browser data to delete it
   - Regenerate key if compromised
   - Never share your API key publicly

### Model Selection

**Gemini Pro (Default)**
- Best for: Text generation, Q&A, coding
- Speed: Fast
- Cost: Efficient

**Gemini Pro Vision**
- Best for: Image analysis
- Speed: Slightly slower
- Cost: Same as Pro
- Auto-selected when uploading images

### Temperature Setting

**0.0 - 0.3**: Focused, Predictable
- Use for: Facts, code, structured data
- Example: "Generate a Python function"

**0.4 - 0.7**: Balanced (Default: 0.7)
- Use for: General conversations
- Example: "Explain quantum computing"

**0.8 - 1.0**: Creative, Varied
- Use for: Creative writing, brainstorming
- Example: "Write a short sci-fi story"

## Features Guide

### 💬 Chat
- Type messages and press Enter
- Supports markdown formatting
- Code blocks with syntax highlighting

### 📷 Image Analysis
1. Click image button
2. Select image file
3. Ask about the image
4. Send message
5. Get AI analysis

**Supported formats:** JPEG, PNG, GIF, WebP
**Size limit:** Usually 5MB

### 💻 Code Features
1. Click code button
2. Paste or type code
3. Select language
4. Click "Insert Code"
5. Ask for help/review

**Supported languages:**
- Python
- JavaScript
- Java
- C++
- HTML
- CSS
- And more...

### 📚 History
- Automatically saved
- Click to resume chat
- Sidebar shows last 50 chats
- Clear all with trash icon

### 🌙 Theme
- Click sun/moon icon
- Switches dark/light theme
- Preference automatically saved

## Troubleshooting

### Problem: "API Key not set"
**Solution:**
1. Go to Settings (⚙️)
2. Enter your API key
3. Click "Save Settings"
4. Refresh the page

### Problem: Images not uploading
**Solution:**
1. Check file size (< 5MB)
2. Try JPEG or PNG format
3. Clear browser cache
4. Check browser file permissions

### Problem: Slow responses
**Solution:**
1. Check internet connection
2. Try simpler prompts first
3. Close other browser tabs
4. Wait a moment (API might be busy)

### Problem: History not saving
**Solution:**
1. Check browser's local storage is enabled
2. Try private/incognito window (won't save)
3. Clear cookies and try again
4. Check available disk space

### Problem: "Invalid API Key"
**Solution:**
1. Get a new key: https://makersuite.google.com/app/apikey
2. Delete and re-enter in Settings
3. Ensure no extra spaces
4. Check key isn't expired

## Tips & Tricks

### Better Results
- Be specific in your prompts
- Provide context when needed
- Ask follow-up questions
- Use examples in your prompts

### Using Code Features
- Include language in code blocks
- Ask for debugging help
- Request optimizations
- Get explanations

### Image Analysis
- Describe what you want analyzed
- Ask specific questions
- Upload multiple for comparison
- Get detailed descriptions

### Privacy
- Data stays in your browser
- No tracking implemented
- API calls go directly to Google
- Clear history anytime

## Advanced Configuration

### Edit config.js

```javascript
// Change default settings
CONFIG.API.DEFAULT_MODEL = 'gemini-pro'
CONFIG.API.DEFAULT_TEMPERATURE = 0.7
CONFIG.UI.MAX_HISTORY_ITEMS = 50
```

### Custom Styling
Edit `styles.css` to customize:
- Colors
- Fonts
- Layout
- Animations

## Deployment

### GitHub Pages
1. Push code to repository
2. Go to Settings → Pages
3. Select "main" branch
4. Access your live site

### Self-Hosted
1. Upload files to web server
2. No backend needed
3. Works with any static host
4. Examples: Netlify, Vercel, Firebase

### Local File
1. Save all files locally
2. Open index.html in browser
3. Works offline (without API calls)

## Performance Optimization

- History limited to last 50 chats
- Message caching in localStorage
- Lazy loading for images
- Efficient DOM updates
- Optimized CSS animations

## Security Notes

- API key stored only in browser
- No server-side processing
- HTTPS recommended for online use
- Clear history before sharing device
- Regenerate API key if compromised

## Getting Help

1. **Check Documentation:** This guide
2. **Search Issues:** GitHub Issues
3. **Report Bug:** Create new issue
4. **Google AI Docs:** https://ai.google.dev/
5. **Community:** Discussions tab

## Next Steps

1. ✅ Get API key
2. ✅ Add key to settings
3. ✅ Try first prompt
4. ✅ Explore image upload
5. ✅ Test code features
6. ✅ Adjust temperature
7. ✅ Toggle theme
8. ✅ Review history

## Support

For issues or questions:
- Open an issue on GitHub
- Check existing discussions
- Provide error messages
- Include browser/OS info

---

**Happy Chatting! 🚀**
