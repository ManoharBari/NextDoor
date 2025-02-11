import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useAuthProvider } from './hooks/useAuth';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <useAuthProvider>
      <App />
    </useAuthProvider>
  </StrictMode>
);