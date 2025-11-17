# Komari Glass Vision Pro

<div align="center">

![Version](https://img.shields.io/badge/version-1.3.2-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178c6.svg)
![Platform](https://img.shields.io/badge/platform-Web-brightgreen.svg)
![Mobile](https://img.shields.io/badge/mobile-optimized-ff69b4.svg)

🌟 **Professional Komari Monitoring Theme** - Perfect Apple Vision Pro Liquid Glass Aesthetics

*Making server monitoring elegant and intuitive*

English | [简体中文](README.md) | [Live Demo](#) | [Quick Start](#-quick-start)

</div>

---

## 🎯 Project Overview

**Komari Glass Vision Pro** is a premium theme designed for the Komari server monitoring platform, inspired by Apple Vision Pro's liquid glass design language. It's not just a theme, but a complete monitoring experience solution.

### 🏆 Why Choose Glass Vision Pro?

- **🎨 Visual Impact** - Authentic liquid glass effects rivaling native iOS apps
- **📊 Feature Rich** - Global stats, multi-view modes, real-time monitoring
- **📱 Perfect Adaptation** - Dual optimization for desktop and mobile
- **⚡ High Performance** - Smooth animations, smart optimization, low resource usage
- **🛠️ Highly Customizable** - 6 theme colors, 100+ personalization options
- **🔧 Ready to Use** - One-click build scripts, zero-configuration deployment

## ✨ Features

### 🎨 Visual Effects
- **Authentic Liquid Glass Effect** - Perfect recreation of iOS 26 liquid glass texture
- **Real-time Background Refraction** - Dynamic light refraction animation during scrolling
- **6 Theme Colors** - Blue, Purple, Green, Orange, Pink, Cyan
- **Full Range Customization** - Opacity, blur, corner radius (0-100%)
- **Smart Appearance Mode** - Dark/Light/Follow System

### 📊 Rich Functionality
- **Global Statistics** - Real-time display of total network speed and traffic for all servers
- **Multiple View Modes** - Grid, Compact, Table display options
- **Detailed Monitoring** - Complete information including CPU, Memory, Disk, Network, Connections
- **Historical Data** - 24-hour historical record viewing
- **Network Status** - Smart reconnection and status notifications

### 📱 Perfect Adaptation
- **Responsive Design** - Perfect support for desktop and mobile
- **Mobile Optimization** - Dedicated mobile layout and interactions
- **Dual Background** - Separate background images for desktop and mobile
- **Adaptive Text** - Smart line wrapping and layout adjustment for mobile

## 🚀 Quick Start

### Requirements
- Node.js 16+
- npm 7+

### Installation

1. **Clone Project**
```bash
git clone https://github.com/your-username/komari-liquid-glass-theme.git
cd komari-liquid-glass-theme
```

2. **Install Dependencies**
```bash
npm install
```

3. **Build Theme**
```bash
npm run pack
```

4. **Deploy to Komari**
   - Upload the generated `komari-liquid-glass-theme.zip` to Komari admin panel
   - Enable "Liquid Glass iOS 26" theme

### Development Mode

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview build result
```

## ⚙️ Theme Configuration

### Appearance Settings
- **Theme Color** - 6 preset color options
- **Glass Opacity** - 0-100% precise adjustment
- **Glass Blur** - 0-100px free setting
- **Card Corner Radius** - 8-40px corner size
- **Appearance Mode** - Follow System/Light/Dark mode

### Background Management
- **Desktop Background** - Custom desktop background image URL
- **Mobile Background** - Dedicated mobile background image
- **Alignment** - Center/Stretch/Tile/Top/Bottom

### Global Statistics
- **Global Speed** - Display total network speed of all servers
- **Global Traffic** - Display transmission traffic statistics
- **Speed Unit** - MB/s or Mbps selection

### Performance Optimization
- **Animation Control** - Option to disable animations
- **Performance Mode** - Optimization for low-performance devices

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **API Integration**: Complete Komari API support

## 📁 Project Structure

```
komari-liquid-glass-theme/
├── src/
│   ├── components/          # React components
│   │   ├── GlobalStats.tsx      # Global statistics
│   │   ├── NetworkStatusNotification.tsx  # Network status notifications
│   │   ├── NodeCard.tsx         # Node cards
│   │   ├── NodeDetail.tsx       # Node details
│   │   ├── SettingsPanel.tsx    # Settings panel
│   │   └── ...
│   ├── hooks/               # Custom Hooks
│   │   ├── useKomariAPI.ts      # API data management
│   │   ├── useMobile.ts         # Mobile detection
│   │   └── useTheme.ts          # Theme management
│   ├── contexts/            # React contexts
│   ├── types/               # TypeScript types
│   ├── utils/               # Utility functions
│   └── ...
├── komari-theme.json        # Theme configuration
├── build-ultimate.js        # Build script
└── package.json
```

## 🌟 Key Features Showcase

### Liquid Glass Effect
- Authentic glass texture and perspective effects
- Dynamic light refraction animation during scrolling
- Interactive feedback on mouse hover

### Smart Adaptation
- Automatic mobile device detection
- Responsive layout and text typography
- Perfect touch interaction experience

### Rich Statistics
- Real-time global network speed monitoring
- Detailed traffic statistics information
- Online/offline status statistics

## 🔧 Troubleshooting

### Common Issues

**Build Failed**
```bash
# Clean dependencies and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Mobile Display Issues**
- Ensure mobile-specific background image is set
- Check if browser supports modern CSS features

**Theme Settings Not Working**
- Confirm Komari server version >= 1.0.5
- Try refreshing page or clearing cache

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

## 🤝 Contributing

Issues and Pull Requests are welcome!

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Create Pull Request

## 🙏 Acknowledgments

- [Komari Monitor](https://github.com/komari-monitor/komari) - Powerful server monitoring platform
- Apple iOS 26 - Liquid glass design inspiration
- All contributors and users for their support

---

<div align="center">

**If this project helps you, please give it a ⭐ Star!**

</div>