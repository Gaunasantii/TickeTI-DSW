import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { TemaProvider } from './context/TemaContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <TemaProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </TemaProvider>
    </BrowserRouter>
  </React.StrictMode>,
);