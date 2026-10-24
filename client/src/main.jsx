import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './contexts/ThemeContext';
import { VisitorProvider } from './contexts/VisitorContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <VisitorProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </VisitorProvider>
    </HelmetProvider>
  </StrictMode>,
);
