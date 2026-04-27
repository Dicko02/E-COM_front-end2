import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './input.css';
import './styles/images.css';
import './utils/logger'; // Désactive les logs en production

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);