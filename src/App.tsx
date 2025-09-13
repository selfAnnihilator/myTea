import React, { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import ArticlesSection from './components/sections/ArticlesSection';
import StaticRoomBackground from './components/layout/StaticRoomBackground';
import ErrorBoundary from './components/ui/ErrorBoundary';

const App: React.FC = () => {
  useEffect(() => {
    const loader = document.getElementById('global-loader');
    
    // Define a minimum display time for the loader to ensure the animation is visible.
    const minDisplayTime = 2500; // 2.5 seconds

    const hideLoader = () => {
      if (loader) {
        // Start the fade out transition
        loader.classList.add('fade-out');

        // After the fade-out animation (500ms), set display to none to remove it from the layout
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }
    };

    // Set a timeout to ensure the loader is visible for the minimum duration
    const timer = setTimeout(hideLoader, minDisplayTime);

    // Cleanup the timeout if the component unmounts before the timer finishes
    return () => clearTimeout(timer);
  }, []);

  // SVG logo encoded as a data URI to be passed as a prop
  const logoSvg = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="28px" height="28px"><path d="M18.5 3H6c-1.1 0-2 .9-2 2v5.71c0 3.83 2.95 7.18 6.78 7.29 3.96.11 7.22-3.06 7.22-7v-1h.5c1.93 0 3.5-1.57 3.5-3.5S20.93 3 19 3h-.5zm-2 0h-1v1h1V3zm-3 0h-1v1h1V3zm-3 0H9v1h1V3zm-3 1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S5 6.83 5 6s.67-1.5 1.5-1.5zM6 8h10v1c0 2.76-2.24 5-5 5s-5-2.24-5-5V8zm12.5-1.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM4 21h16v-2H4v2z" /></svg>`
  )}`;

  const navItems = [
    {
      label: "Home",
      bgColor: "#f0f0f0",
      textColor: "#000",
      links: [
        { label: "Top of Page", href: "#", ariaLabel: "Go to the top of the page" },
      ]
    },
    {
      label: "Articles", 
      bgColor: "#e0e0e0",
      textColor: "#000",
      links: [
        { label: "View Latest", href: "#articles", ariaLabel: "View the latest articles" }
      ]
    },
    {
      label: "About",
      bgColor: "#d0d0d0", 
      textColor: "#000",
      links: [
        { label: "Learn More", href: "#", ariaLabel: "Learn more about our project" },
      ]
    }
  ];

  return (
    <ErrorBoundary>
      <div 
        className="font-sans antialiased text-white selection:bg-teal-300 selection:text-black min-h-screen bg-transparent isolate"
      >
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        <StaticRoomBackground />

        <main id="main-content" role="main">
          <Navbar
            logo={logoSvg}
            logoAlt="MyTea Logo"
            items={navItems}
            baseColor="#fff"
            menuColor="#000"
            buttonBgColor="#111"
            buttonTextColor="#fff"
            ease="power3.out"
          />
          <HeroSection />
          <ArticlesSection />
          <footer className="text-center py-8 text-white/50" role="contentinfo">
            <p>&copy; {new Date().getFullYear()} MyTea. All Rights Reserved.</p>
          </footer>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default App;