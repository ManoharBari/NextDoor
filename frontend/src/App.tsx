import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { SearchBar } from './components/search/SearchBar';
import { CategoryFilter } from './components/search/CategoryFilter';
import { ServiceGrid } from './components/service/ServiceGrid';
import { ProviderProfile } from './components/provider/ProviderProfile';
import { BookingPage } from './components/booking/BookingPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { ChatDialog } from './components/chat/ChatDialog';
import { useServices } from './hooks/useServices';
import { useAuth } from './hooks/useAuth';
import type { Service } from './types';

export default function App() {
  const {
    services,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory
  } = useServices();

  const { isAuthenticated } = useAuth();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const handleBookService = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      if (!isAuthenticated) {
        setShowRegister(true);
      } else {
        setSelectedService(service);
        setShowBooking(true);
      }
    }
  };

  const handleChat = (providerId: string) => {
    const service = services.find(s => s.provider.id === providerId);
    if (service) {
      if (!isAuthenticated) {
        setShowRegister(true);
      } else {
        setSelectedService(service);
        setIsChatOpen(true);
      }
    }
  };

  const handleOpenFilters = () => {
    console.log('Opening filters modal');
  };

  const handleProviderClick = (providerId: string) => {
    setSelectedProviderId(providerId);
  };

  const handleBookingSubmit = (bookingData: any) => {
    console.log('Booking submitted:', bookingData);
    setShowBooking(false);
  };

  // Get the selected provider and their services
  const selectedProvider = selectedProviderId 
    ? services.find(s => s.provider.id === selectedProviderId)?.provider 
    : null;
  const providerServices = selectedProvider 
    ? services.filter(s => s.provider.id === selectedProviderId)
    : [];

  if (showRegister) {
    return <RegisterPage />;
  }
  
  if (showBooking && selectedService) {
    return <BookingPage service={selectedService} onSubmit={handleBookingSubmit} />;
  }

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
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onOpenFilters={handleOpenFilters}
              />
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
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
        <ChatDialog
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          provider={selectedService.provider}
        />
      )}
    </div>
  );
}