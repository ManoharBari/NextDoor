import React from 'react';
import { ServiceCard } from './ServiceCard';

export function ServiceGrid({ services, onBook, onChat, onProviderClick }) {
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