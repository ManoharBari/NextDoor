import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { SearchBar } from './components/search/SearchBar';
import { CategoryFilter } from './components/search/CategoryFilter';
import { ServiceGrid } from './components/service/ServiceGrid';
import { ProviderProfile } from './components/provider/ProviderProfile';
import { BookingPage } from './components/booking/BookingPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { ChatDialog } from './components/chat/ChatDialog';
import { OrderHistoryPage } from './components/orders/OrderHistoryPage';
import { PaymentPage } from './components/payment/PaymentPage';
import { ProviderDashboard } from './components/dashboard/ProviderDashboard';
import { useServices } from './context/useServices';
import UserContext from './context/auth/userContext';
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
  } = useServices();

  const { isAuthenticated, user } = useContext(UserContext);
  const [selectedService, setSelectedService] = useState(Service || null);
  const [selectedProviderId, setSelectedProviderId] = useState("" || null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  // Get the selected provider and their services
  const selectedProvider = selectedProviderId
    ? services.find(s => s.provider.id === selectedProviderId)?.provider
    : null;
  const providerServices = selectedProvider
    ? services.filter(s => s.provider.id === selectedProviderId)
    : [];

  const handleBookService = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
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
    const service = services.find(s => s.provider.id === providerId);
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
  };

  const handleBookingSubmit = (bookingData) => {
    setBookingDetails(bookingData);
    navigate('/payment');
  };

  const handlePaymentComplete = () => {
    setBookingDetails(null);
    navigate('/orders');
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
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/provider/:providerId"
          element={<ProviderProfile provider={selectedProvider} services={providerServices} />}
        />
        <Route
          path="/booking"
          element={selectedService ? <BookingPage service={selectedService} onSubmit={handleBookingSubmit} /> : <Navigate to="/" />}
        />
        <Route
          path="/payment"
          element={selectedService && bookingDetails ? <PaymentPage service={selectedService} bookingDetails={bookingDetails} onPaymentComplete={handlePaymentComplete} /> : <Navigate to="/" />}
        />
        <Route path="/orders" element={<OrderHistoryPage />} />
        {isAuthenticated && user.role === 'provider' && <Route path="/dashboard" element={<ProviderDashboard />} />}
      </Routes>
      {selectedService && <ChatDialog isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} provider={selectedService.provider} />}
    </>
  )
}