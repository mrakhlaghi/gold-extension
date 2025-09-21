# TGJU Gold Extension Setup Guide

## 📦 Installed Dependencies

### Core Dependencies

- **React 19.1.1** - UI framework
- **React DOM 19.1.1** - DOM rendering
- **WXT 0.20.6** - Extension development framework

### Styling Dependencies

- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **@tailwindcss/typography** - Typography plugin

### Development Dependencies

- **TypeScript 5.9.2** - Type checking
- **@types/react** - React type definitions
- **@types/react-dom** - React DOM type definitions

## 🎨 Configuration Files

### 1. Tailwind Configuration (`tailwind.config.js`)

- ✅ Custom Persian font family (Vazir)
- ✅ Extended color palette with gold theme
- ✅ Custom animations (spin-slow, pulse-slow, bounce-slow)
- ✅ Content paths for all entrypoints
- ✅ Typography plugin enabled

### 2. PostCSS Configuration (`postcss.config.js`)

- ✅ Tailwind CSS processing
- ✅ Autoprefixer for vendor prefixes

### 3. WXT Configuration (`wxt.config.ts`)

- ✅ React module integration
- ✅ PostCSS integration with Vite
- ✅ Extension manifest configuration
- ✅ Required permissions for TGJU API access

### 4. CSS Files Updated

- ✅ `entrypoints/popup/App.css` - Tailwind directives + Persian font
- ✅ `entrypoints/popup/style.css` - Extension-specific styles + RTL support

## 🚀 Available Scripts

```bash
# Development
npm run dev              # Chrome development
npm run dev:firefox      # Firefox development

# Build
npm run build            # Chrome build
npm run build:firefox    # Firefox build

# Package
npm run zip              # Chrome package
npm run zip:firefox      # Firefox package

# Type checking
npm run compile          # TypeScript compilation check
```

## 🎯 Features Implemented

### UI Components

- ✅ Beautiful mobile-first table design
- ✅ Colorful gradient backgrounds
- ✅ Glass morphism effects
- ✅ Persian typography with Vazir font
- ✅ RTL (Right-to-Left) text direction

### Animations

- ✅ Rotating gold coin loading animation
- ✅ Glowing effects with custom keyframes
- ✅ Smooth transitions and hover effects
- ✅ Custom scrollbar styling

### Data Display

- ✅ Current price (green theme)
- ✅ Highest price (blue theme)
- ✅ Lowest price (red theme)
- ✅ Opening price (purple theme)
- ✅ Price change indicators (bullish/bearish)
- ✅ Persian number formatting

### Technical Features

- ✅ Real-time data fetching every 2 seconds
- ✅ Error handling with Persian messages
- ✅ Loading states with beautiful animations
- ✅ Extension manifest configuration
- ✅ TypeScript type safety

## 📱 Mobile Optimization

The extension is optimized for mobile screens with:

- Maximum width of 400px
- Touch-friendly spacing
- Responsive design
- Proper viewport handling
- Mobile-first approach

## 🔧 Next Steps

1. **Test the extension**: Run `npm run dev` to test in development
2. **Build for production**: Run `npm run build` to create production build
3. **Package for distribution**: Run `npm run zip` to create installable package

## 📝 Notes

- All Persian text uses Vazir font family
- Tailwind classes are fully integrated
- Extension popup size is optimized for mobile
- API calls are made to TGJU with proper headers
- Error handling includes Persian error messages

The extension is now ready for development and testing! 🎉

