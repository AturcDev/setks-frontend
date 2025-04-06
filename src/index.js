import React from 'react';
import { createRoot } from 'react-dom/client'; // createRoot'u import et
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { TemaProvider } from './context/TemaContext';

// React 18'de createRoot kullanımı
const container = document.getElementById('root');
const root = createRoot(container); // createRoot ile kök elementi oluştur

root.render(
  <React.StrictMode>
    <AuthProvider>
      <TemaProvider>
        <App />
      </TemaProvider>
    </AuthProvider>
  </React.StrictMode>
);