import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. Los estilos primero para que Tailwind esté listo
import './index.css'; 
// 2. La configuración de idiomas
import './i18n/i18n';
// 3. Tu aplicación
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);