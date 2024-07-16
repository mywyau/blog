// src/AppWithRouter.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const AppWithRouter: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWithRouter;
