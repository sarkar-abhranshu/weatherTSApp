# Weather TypeScript App 🌤️

A modern, responsive weather application built with React, TypeScript, and Tailwind CSS. Get real-time weather information for any city worldwide using the OpenWeatherMap API.

## ✨ Features

- **Real-time Weather Data**: Get current weather conditions for any city
- **Responsive Design**: Beautiful UI that works on desktop and mobile devices
- **TypeScript**: Full type safety and better development experience
- **Modern Stack**: Built with React 19, Vite, and Tailwind CSS
- **Error Handling**: Comprehensive error handling for API failures and invalid cities
- **Clean Architecture**: Well-organized component structure and API layer

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **API**: OpenWeatherMap API
- **Linting**: ESLint

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- OpenWeatherMap API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weatherTSApp
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```
   
   Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🏗️ Project Structure

```
weatherTSApp/
├── public/                 # Static assets
├── src/
│   ├── api/               # API layer
│   │   └── weather.ts     # Weather API functions
│   ├── components/        # React components
│   │   ├── searchBar.tsx  # City search component
│   │   └── weatherCard.tsx # Weather display component
│   ├── types/             # TypeScript type definitions
│   │   └── weatherTypes.ts
│   ├── assets/            # Images and other assets
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── package.json          # Project dependencies
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## 🌐 API Integration

This app uses the OpenWeatherMap API to fetch:

- Current weather conditions
- Temperature (with feels-like temperature)
- Humidity and atmospheric pressure
- Wind speed
- Weather descriptions and icons
- Sunrise and sunset times

The API integration includes:
- Geocoding to convert city names to coordinates
- Error handling for invalid API keys and cities
- Type-safe response handling with TypeScript

## 🎨 UI/UX Features

- **Gradient Background**: Beautiful blue gradient background
- **Responsive Layout**: Works seamlessly on all device sizes
- **Weather Cards**: Clean, card-based design for weather information
- **Error States**: User-friendly error messages with icons
- **Loading States**: Smooth user experience during API calls
- **Search Interface**: Intuitive city search functionality

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v4 with PostCSS configuration for styling.

### TypeScript
Multiple TypeScript configurations:
- `tsconfig.json` - Base configuration
- `tsconfig.app.json` - Application-specific settings
- `tsconfig.node.json` - Node.js specific settings

### ESLint
Configured with React-specific rules and TypeScript support.

## 🌍 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENWEATHER_API_KEY` | Your OpenWeatherMap API key | Yes |

## 🚀 Deployment

1. **Build the project**
   ```bash
   pnpm build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3
   - Any static hosting service

3. **Set environment variables** in your hosting platform's settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [React](https://reactjs.org/) for the UI framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Vite](https://vitejs.dev/) for the build tool

## 📞 Support

If you have any questions or run into issues, please [open an issue](../../issues) on GitHub.

---

Made with ❤️ using React + TypeScript + Tailwind CSS