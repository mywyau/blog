// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import AppWithRouter from './AppWithRouter';

import './index.css';

// Add the Google Fonts link dynamically
const googleFontsLink = document.createElement('link');
googleFontsLink.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap';
googleFontsLink.rel = 'stylesheet';
document.head.appendChild(googleFontsLink);

ReactDOM.render(
  <React.StrictMode>
    <AppWithRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
