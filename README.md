# upVirüS Antivirus — Professional Security Dashboard

**upVirüS** — Next-generation antivirus protection dashboard with multi-language support (EN, TR, DE, FR, ES, RU), real-time threat detection interface, and comprehensive security management.

## Features

✅ **Dashboard** — System status, protection level, active defenses
✅ **System Scan** — Quick scan (5 min), Full scan (45 min), Custom scan options
✅ **Threat Detection** — Real-time threat monitoring and removal
✅ **Quarantine** — Isolated threats and suspicious files management
✅ **Reports** — Weekly statistics and threat type analytics
✅ **Settings** — Scan scheduling, real-time protection, auto-updates
✅ **Multi-Language** — EN, TR, DE, FR, ES, RU with auto-detection & persistence
✅ **Professional UI** — Dark mode, responsive design, smooth animations
✅ **Mobile Optimized** — Full functionality on smartphones and tablets

## Files

- `index.html` — Main interface structure
- `styles.css` — Professional dark theme + responsive layout (1200+ lines)
- `script.js` — Interactive features, scan simulation, notifications
- `i18n.js` — 6-language internationalization system

## Installation

### Termux / Local

```bash
cd upvirus
# Just open index.html in browser or run local server
python3 -m http.server 8000
# Visit http://localhost:8000
```

### GitHub + Vercel Deploy

1. **Create GitHub repo:**
```bash
git init
git add .
git commit -m "upVirüS Antivirus Dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/upvirus.git
git push -u origin main
```

2. **Deploy to Vercel:**
   - Go to vercel.com
   - Click "Add New Project"
   - Select your GitHub repo
   - Framework: **Other** (static site)
   - Click **Deploy**
   - Done! Your site is live in 30 seconds

3. **Auto-updates:**
   - Every `git push` triggers automatic Vercel deployment
   - No build step needed, pure static HTML/CSS/JS

## Multi-Language System

Supports 6 languages with automatic detection and persistence:

- **EN** — English
- **TR** — Turkish (Türkçe)
- **DE** — Deutsch
- **FR** — Français
- **ES** — Español
- **RU** — Русский

Language preference is saved to localStorage and persists across sessions.

## Usage

### Navigation
- Click menu items to switch between Dashboard, Scan, Threats, Quarantine, Reports, Settings
- Mobile hamburger menu on screens < 768px

### Scanning
- **Quick Scan** — Scans 1500 files in ~5 minutes
- **Full Scan** — Scans 8000 files in ~45 minutes
- **Custom Scan** — User-defined locations

### Real-time Features
- Live threat detection updates (every 5 seconds)
- Auto-refresh threat counts
- Toast notifications for events
- Status indicators and progress tracking

### Settings
- Toggle real-time protection, email scanning, firewall
- Schedule automatic daily scans
- Enable archive scanning
- Auto-update threat definitions

## Customization

### Change App Name
Edit `index.html` line 7:
```html
<title>YOUR_APP_NAME — Professional Protection</title>
```

### Add Custom Language
Edit `i18n.js`, add new language object:
```javascript
custom: {
  nav_dashboard: 'Your Translation',
  // ... all other keys
}
```

Then add button in HTML:
```html
<button data-lang="custom">CUSTOM</button>
```

### Modify Colors
Edit `styles.css` `:root`:
```css
--accent-green: #22c55e;
--accent-red: #ef4444;
--accent-orange: #f97316;
--accent-cyan: #06b6d4;
```

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Zero external dependencies
- Pure vanilla JavaScript (no frameworks)
- ~50KB total (HTML+CSS+JS gzipped)
- Instant loading, smooth 60fps animations

## License

Professional use — Feel free to customize and deploy.

---

**Built with** 🚀 HTML5 • CSS3 • Vanilla JS • i18n System
