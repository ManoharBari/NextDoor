import React from 'react';
import { ServiceCard } from './ServiceCard';
import type { Service } from '../../types';

interface ServiceGridProps {
  services: Service[];
  onBook: (serviceId: string) => void;
  onChat: (providerId: string) => void;
  onProviderClick?: (providerId: string) => void;
}

export function ServiceGrid({ services, onBook, onChat, onProviderClick }: ServiceGridProps) {
  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No services found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onBook={onBook}
          onChat={onChat}
          onProviderClick={onProviderClick}
        />
      ))}
    </div>
  );
}