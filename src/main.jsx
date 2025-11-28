import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { defaultHikes } from './hooks/useDefaultHikes.js';

// Initialiser localStorage avec les hikes par défaut
if (!localStorage.getItem('hikesData')) {
  localStorage.setItem('hikesData', JSON.stringify(defaultHikes));
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
