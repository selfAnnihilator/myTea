# MyTea ☕ - Your Daily Brew of News

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/your-username/mytea/blob/main/LICENSE)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)

A modern, visually appealing news aggregator that serves fresh articles and stories from various categories. Built with React, TypeScript, and Vite, featuring smooth animations, responsive design, and a unique card-based navigation.

## 🌟 Features

- **Real-time News**: Fetches latest articles from multiple categories
- **Smooth Animations**: Powered by GSAP for engaging user experience
- **Responsive Design**: Works beautifully on all device sizes
- **Category Filtering**: Browse articles by Business, Entertainment, Health, Politics, Science, Sports, and Technology
- **Infinite Scrolling**: Load more articles as you browse
- **Modern UI**: Card-based navigation with sleek animations
- **Typing Effects**: Dynamic text animations in hero section
- **Performance Optimized**: Lazy loading and efficient data fetching
- **Robust Error Handling**: Retry mechanisms and user-friendly error messages

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mytea.git
   cd mytea
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your NewsAPI key:
   ```env
   NEWS_API_KEY=your_actual_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

### Running in Production

```bash
# Build the frontend first
npm run build

# Start the production server
npm start
```

### Building for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 🛠️ Technologies Used

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite 6
- **Animations**: GSAP
- **Backend**: Vercel Serverless Functions
- **API**: NewsAPI
- **Deployment**: Vercel, Docker

## 🛡️ Error Handling

The application implements comprehensive error handling strategies:

- **Network Resilience**: Automatic retry mechanisms for failed API requests
- **User-Friendly Messages**: Clear, actionable error messages for different failure scenarios
- **Graceful Degradation**: Components continue to function even when non-critical errors occur
- **Error Boundaries**: Prevents application crashes from unhandled exceptions
- **Type Safety**: TypeScript ensures fewer runtime errors through compile-time checking

## 📦 Deployment Options

### Vercel (Recommended)

1. Fork this repository to your GitHub account
2. Create an account at [Vercel](https://vercel.com/)
3. Create a new project and connect it to your repository
4. Add your `NEWS_API_KEY` as an environment variable in your Vercel project settings:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add a new variable with the key `NEWS_API_KEY` and your actual API key as the value
5. Deploy!

### Docker

```bash
# Build the Docker image
docker build -t mytea .

# Run the container with environment variable
docker run -p 8080:8080 -e NEWS_API_KEY=your_actual_api_key_here mytea
```

### Self-hosted

1. Clone the repository to your server
2. Install Node.js (v16 or higher)
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set the environment variable for the NewsAPI key:
   ```bash
   export NEWS_API_KEY=your_actual_api_key_here
   ```
5. Build the frontend:
   ```bash
   npm run build
   ```
6. Start the server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:8080`

## 📁 Project Structure

```
mytea/
├── api/                 # Vercel serverless functions
├── components/          # React components
├── hooks/               # Custom React hooks
├── services/            # API service functions
├── public/              # Static assets
├── src/                 # Main source files
├── App.tsx             # Main application component
├── index.html          # HTML entry point
├── index.tsx           # React DOM renderer
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── vercel.json         # Vercel deployment configuration
```

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [NewsAPI](https://newsapi.org/) for providing the news data
- [GSAP](https://greensock.com/gsap/) for the animation library
- [Vite](https://vitejs.dev/) for the amazing build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---
<p align="center">Made with ☕ and ❤️</p>