import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import UserProvider from './context/auth/userState';
import ServiceProvider from './context/service/serviceState';
import OrderProvider from './context/order/orderState';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ServiceProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </ServiceProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);