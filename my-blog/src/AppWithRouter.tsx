// src/AppWithRouter.tsx
import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import App from './App';
import NavbarPages from './models/ADTs/NavbarPages';
import Navbar from './views/components/navigation_bar/NavBar';

const AppWithRouter: React.FC = () => {

  return (
    <Router>
        <App />
    </Router>
  );
};

export default AppWithRouter;
