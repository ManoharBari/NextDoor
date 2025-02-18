import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { SearchBar } from './components/search/SearchBar';
import { CategoryFilter } from './components/search/CategoryFilter';
import { ServiceGrid } from './components/service/ServiceGrid';
import { ProviderProfile } from './components/provider/ProviderProfile';
import { BookingPage } from './components/booking/BookingPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { ChatDialog } from './components/chat/ChatDialog';
import { OrderHistoryPage } from './components/orders/OrderHistoryPage';
import { ProviderDashboard } from './components/dashboard/ProviderDashboard';
import UserContext from './context/auth/userContext';
import ServiceContext from './context/service/serviceContext';
import { Service } from './types/index';
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const {
    services,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory
  } = useContext(ServiceContext);

  const { isAuthenticated, user, showUser } = useContext(UserContext);
  const [selectedService, setSelectedService] = useState(Service || null);
  const [selectedProviderId, setSelectedProviderId] = useState("" || null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      showUser();
    }
  }, [isAuthenticated])

  // Get the selected provider and their services
  const selectedProvider = selectedProviderId
    ? services.find(s => s.provider._id === selectedProviderId)?.provider
    : null;
  const providerServices = selectedProvider
    ? services.filter(s => s.provider._id === selectedProviderId)
    : [];

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

  const handleOpenFilters = () => {
    console.log('Opening filters modal');
  };

  const handleProviderClick = (providerId) => {
    setSelectedProviderId(providerId);
    navigate(`/provider/${providerId}`);
  };

  return (
    <>
      <Header />
      <Routes>

        <Route
          path="/"
          element={
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} onOpenFilters={handleOpenFilters} />
                <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
              </div>
              <ServiceGrid services={services} onBook={handleBookService} onChat={handleChat} onProviderClick={handleProviderClick} />
            </div>
          }
        />

        <Route path="/dashboard" element={<ProviderDashboard />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/provider/:providerId"
          element={<ProviderProfile provider={selectedProvider} services={providerServices} />}
        />

        <Route
          path="/booking"
          element={selectedService ? <BookingPage serviceId={selectedService._id} userId={user.id} amount={selectedService.price} service={selectedService} /> : <Navigate to="/" />}
        />

        <Route path="/orders" element={<OrderHistoryPage />} />
      </Routes>
      {selectedService && <ChatDialog isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} provider={selectedService.provider} />}
    </>
  )
}