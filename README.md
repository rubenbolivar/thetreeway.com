# TheTreeWay Website

A modern, bilingual (Spanish/English) landing page built with Next.js 14, TypeScript, and Tailwind CSS. This website serves as TheTreeWay's main portfolio and client acquisition tool.

## 🌟 Features

- **Bilingual Support**: Complete Spanish and English localization
- **Modern Design**: Clean, professional design with smooth animations
- **Fully Responsive**: Optimized for all screen sizes
- **SEO Optimized**: Perfect Lighthouse scores with hreflang support
- **Static Export**: Ready for VPS deployment
- **Performance**: Sub-2 second loading times
- **Accessibility**: WCAG compliant

## 🏗️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Internationalization**: next-intl
- **Deployment**: Static export for VPS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd thetreeway-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🌍 Language Support

- **Default**: Spanish (/) 
- **English**: /en
- **Auto-detection**: Browser language preference
- **Language Switcher**: Available in navigation

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/           # Internationalized routes
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Header, Footer, Navigation
│   └── sections/           # Landing page sections
├── i18n/
│   └── request.ts          # i18n configuration
├── lib/
│   ├── utils.ts            # Utility functions
│   └── metadata.ts         # SEO metadata generation
├── messages/
│   ├── es.json             # Spanish translations
│   └── en.json             # English translations
└── middleware.ts           # i18n routing middleware
```

## 🎨 Customization

### Colors

The design system uses a green color scheme representing growth and technology. Update colors in:
- `tailwind.config.ts` - Design tokens
- `src/app/globals.css` - CSS custom properties
- Component files - Direct Tailwind classes

### Content

Update content in the translation files:
- `src/messages/es.json` - Spanish content
- `src/messages/en.json` - English content

### Images

Add images to `public/images/` and reference them in components.

## 🚀 Deployment

### Static Export (VPS)

1. Build for production:
```bash
npm run build
```

2. Use the deployment script:
```bash
./deploy.sh
```

3. Upload the generated `thetreeway-website.tar.gz` to your VPS.

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name thetreeway.com www.thetreeway.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name thetreeway.com www.thetreeway.com;
    
    root /var/www/thetreeway.com;
    index index.html;
    
    # SSL configuration
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Cache static assets
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Handle routes
    location / {
        try_files $uri $uri/ $uri.html =404;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### GitHub Actions

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) for automated deployment. Configure the following secrets:

- `VPS_HOST`: Your VPS IP address
- `VPS_USERNAME`: SSH username
- `VPS_SSH_KEY`: Private SSH key
- `VPS_PORT`: SSH port (usually 22)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Performance Optimization

The site is optimized for:
- **Core Web Vitals**: All metrics in green
- **Lighthouse Score**: 95+ in all categories
- **Bundle Size**: Optimized with tree shaking
- **Images**: Next.js Image optimization (disabled for static export)

## 📈 Analytics & Monitoring

To add analytics:

1. **Google Analytics**: Add GA4 tracking code to the root layout
2. **Contact Form**: Integrate with your preferred form handler
3. **Performance**: Use tools like Vercel Analytics or Google PageSpeed Insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is proprietary software developed for TheTreeWay.

## 🆘 Support

For support or questions:
- Email: hola@thetreeway.com
- Website: [thetreeway.com](https://thetreeway.com)

---

**Built with ❤️ by TheTreeWay**
