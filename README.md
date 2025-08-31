# 🚀 Owais Khan - Portfolio Website

A modern, accessible, and performant portfolio website showcasing full-stack development skills. Built with React, powered by Firebase, and designed with user experience at its core.

[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-100%2F100-brightgreen)](https://developers.google.com/web/tools/lighthouse)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)](https://github.com/ReaperOAK/portfolio)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## ✨ Features

### 🎯 Smart Visitor Segmentation
- Immersive full-page visitor selector with animated segments
- Personalized themes and content for Recruiters, Clients, Developers, and Creative Souls
- Persistent user preferences with localStorage

### 🎨 Modern UI/UX
- **Dark-first design** with multiple theme variants
- **Smooth animations** powered by Framer Motion
- **Interactive 3D elements** using React Three Fiber
- **Fully responsive** mobile-first design
- **Accessibility-focused** with ARIA labels, keyboard navigation, and focus management

### 🔧 Technical Excellence
- **React 19** with Vite for blazing-fast development
- **TailwindCSS** for utility-first styling
- **TypeScript-ready** architecture
- **Firebase Functions** for serverless backend
- **Comprehensive testing** with Vitest and React Testing Library

### 📧 Smart Contact System
- **Conversational contact form** with contextual messaging
- **Terminal-style interface** for tech-savvy visitors
- **Spam protection** with rate limiting and validation
- **Auto-response emails** with Nodemailer integration

### 🚀 Performance & SEO
- **React Helmet** for dynamic meta tags
- **Code splitting** and lazy loading
- **Optimized images** and assets
- **Perfect Lighthouse scores**
- **Sitemap and robots.txt** included

## 🛠 Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **Vite** - Next-generation frontend tooling
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **React Three Fiber** - React renderer for Three.js
- **React Helmet Async** - Document head management
- **Zustand** - Small, fast state management

### Backend
- **Firebase Functions** - Serverless cloud functions
- **Express.js** - Web application framework
- **Nodemailer** - Email sending library
- **Express Validator** - Input validation middleware

### Development
- **Vitest** - Blazing fast unit testing
- **React Testing Library** - Simple testing utilities
- **ESLint** - Code linting and formatting
- **Firebase CLI** - Development and deployment tools

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase CLI (`npm install -g firebase-tools`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ReaperOAK/portfolio.git
   cd portfolio
   ```

2. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install function dependencies**
   ```bash
   cd ../functions
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # Client environment
   cd ../client
   cp .env.example .env
   
   # Functions environment
   cd ../functions
   cp .env.example .env
   ```

5. **Start development servers**
   ```bash
   # Start React dev server
   cd client
   npm run dev
   
   # Start Firebase emulator (in another terminal)
   cd ..
   firebase emulators:start
   ```

### Environment Setup

**Client (.env)**
```env
VITE_APP_NAME=Owais Portfolio
VITE_API_BASE_URL=
```

**Functions (.env)**
```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
NODE_ENV=development
```

## 📁 Project Structure

```
portfolio/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Route components
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom hooks
│   │   ├── data/          # Static data
│   │   └── test/          # Test files
│   └── package.json
├── functions/             # Firebase Functions
│   ├── src/              # Function source code
│   └── package.json
├── planning and docs/     # Documentation
└── firebase.json         # Firebase configuration
```

## 🧪 Testing

```bash
# Run all tests
cd client
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Firebase Hosting + Functions

1. **Build the client**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   cd ..
   firebase deploy
   ```

### Environment Variables for Production

Make sure to set production environment variables in Firebase Functions:

```bash
firebase functions:config:set email.user="your_email@gmail.com"
firebase functions:config:set email.pass="your_app_password"
```

## 🎨 Customization

### Themes
Edit `client/src/themes/index.js` to customize color schemes for different visitor types.

### Content
- **Projects**: Update `client/src/data/projects.js`
- **Skills**: Update `client/src/data/skills.js` 
- **Personal Info**: Update `client/src/data/story.js`

### Styling
The design system uses TailwindCSS with custom theme tokens. See `client/tailwind.config.js` for configuration.

## 📊 Performance

- ⚡ **Perfect Lighthouse Scores** (100/100 across all metrics)
- 🚀 **Sub-second load times** with code splitting
- 📱 **Mobile-first responsive** design
- ♿ **WCAG 2.1 AA compliant** accessibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [owais.dev](https://owais.dev)
- **GitHub**: [ReaperOAK/portfolio](https://github.com/ReaperOAK/portfolio)
- **LinkedIn**: [Owais Khan](https://linkedin.com/in/owais-khan)

## 💡 Inspiration

This portfolio demonstrates modern web development practices including:

- **Accessibility-first development**
- **Performance optimization techniques**
- **Modern React patterns and hooks**
- **Serverless architecture**
- **Progressive enhancement**
- **Mobile-first responsive design**

---

Built with ❤️ by [Owais Khan](https://github.com/ReaperOAK)
