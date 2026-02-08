import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    try {
      const currentUrl = window.location.href;
      
      // Check for valid protocol to avoid errors in environments like 'about:blank'
      if (currentUrl.startsWith('http')) {
        // Construct absolute URL safely
        const swUrl = new URL('sw.js', currentUrl).href;

        navigator.serviceWorker.register(swUrl)
          .then((registration) => {
            console.log('SW registered with scope:', registration.scope);
          })
          .catch((error) => {
            console.warn('SW registration failed:', error);
          });
      }
    } catch (e) {
      console.warn('Service Worker initialization skipped:', e);
    }
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);