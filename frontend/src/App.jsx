import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { HomePage } from './components/Homepage';
import { SearchBar } from './components/search/SearchBar';
import { CategoryFilter } from './components/search/CategoryFilter';
import { ServiceGrid } from './components/service/ServiceGrid';
import { BookingPage } from './components/booking/BookingPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { ChatDialog } from './components/chat/ChatDialog';
import { OrderHistoryPage } from './components/orders/OrderHistoryPage';
import { NotFoundPage } from './components/error/NotFoundPage';
import { ProviderDashboard } from './components/dashboard/ProviderDashboard';
import UserContext from './context/auth/userContext';
import ServiceContext from './context/service/serviceContext';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    services,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory
  } = useContext(ServiceContext);

  const { isAuthenticated, user, showUser } = useContext(UserContext);
  const [selectedService, setSelectedService] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      showUser();
    }
  }, [])

  const handleBookService = (serviceId) => {
    const service = services.find(s => s._id === serviceId);
    if (service) {
      if (!isAuthenticated) {
        navigate('/register');
      } else {
        setSelectedService(service);
        navigate('/booking');
      }
    }
  };

  const handleChat = (providerId) => {
    const service = services.find(s => s.provider._id === providerId);
    if (service) {
      if (!isAuthenticated) {
        navigate('/register');
      } else {
        setSelectedService(service);
        setIsChatOpen(true);
      }
    }
  };

  return (
    <>
      <MantineProvider>
        <Header />
        <Routes>

          <Route path="/" element={<HomePage />} />

          <Route path="*" element={<NotFoundPage />} /> {/* Catch-all route */}

          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/services"
            element={
              <div className="max-w-7xl mx-auto px-6 py-2">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                  <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                  <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
                </div>
                <ServiceGrid services={services} onBook={handleBookService} onChat={handleChat} />
              </div>
            }
          />

          <Route path="/dashboard" element={<ProviderDashboard />} />

          <Route
            path="/booking"
            element={selectedService ? <BookingPage serviceId={selectedService.id} userId={user.id} amount={selectedService.price} service={selectedService} /> : <Navigate to="/" replace/>}
          />

          <Route path="/orders" element={<OrderHistoryPage />} />
        </Routes>
        
        {selectedService && <ChatDialog isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} provider={selectedService.provider} />}
        {location.pathname != '/dashboard' && <Footer />}

        <Toaster position="top-center" />

      </MantineProvider>
    </>
  )
}