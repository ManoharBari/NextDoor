import React, { useContext, useState } from 'react';
import { Header } from './components/layout/Header';
import { SearchBar } from './components/search/SearchBar';
import { CategoryFilter } from './components/search/CategoryFilter';
import { ServiceGrid } from './components/service/ServiceGrid';
import { ProviderProfile } from './components/provider/ProviderProfile';
import { BookingPage } from './components/booking/BookingPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { ChatDialog } from './components/chat/ChatDialog';
import { useServices } from './context/useServices';
import UserContext from './context/auth/userContext';
import { Service } from './types/index';

export default function App() {
  const { services, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory } = useServices();
  const { isAuthenticated } = useContext(UserContext);

  const [selectedService, setSelectedService] = useState(Service || null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState("" || null);
  const [showRegister, setShowRegister] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const resetState = () => {
    setSelectedService(null);
    setIsChatOpen(false);
    setSelectedProviderId(null);
    setShowRegister(false);
    setShowBooking(false);
  };

  const handleBookService = (serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    if (!isAuthenticated) {
      setShowRegister(true);
    } else {
      setSelectedService(service);
      setShowBooking(true);
    }
  };

  const handleChat = (providerId) => {
    const service = services.find((s) => s.provider.id === providerId);
    if (!service) return;

    if (!isAuthenticated) {
      setShowRegister(true);
    } else {
      setSelectedService(service);
      setIsChatOpen(true);
    }
  };

  const handleProviderClick = (providerId) => {
    setSelectedProviderId(providerId);
  };

  const handleBookingSubmit = (bookingData) => {
    console.log('Booking submitted:', bookingData);
    resetState();
  };

  const selectedProvider = services.find((s) => s.provider.id === selectedProviderId)?.provider || null;
  const providerServices = selectedProvider ? services.filter((s) => s.provider.id === selectedProviderId) : [];

  if (showRegister) return <RegisterPage />;
  if (showBooking && selectedService) return <BookingPage service={selectedService} onSubmit={handleBookingSubmit} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {selectedProvider ? (
          <ProviderProfile
            provider={selectedProvider}
            services={providerServices}
            onBook={handleBookService}
            onChat={handleChat}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
              <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
            </div>

            <ServiceGrid
              services={services}
              onBook={handleBookService}
              onChat={handleChat}
              onProviderClick={handleProviderClick}
            />
          </div>
        )}
      </main>

      {selectedService && (
        <ChatDialog isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} provider={selectedService.provider} />
      )}
    </div>
  )
}
