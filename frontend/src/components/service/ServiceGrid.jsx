import React, { useContext, useEffect } from 'react';
import { ServiceCard } from './ServiceCard';
import ServiceContext from '../../context/service/serviceContext';

export function ServiceGrid({ services, onBook, onChat }) {
  const { ShowAllServices } = useContext(ServiceContext);

  useEffect(() => {
    ShowAllServices();
  }, []);

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No services found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid mb-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard
          key={service._id}
          service={service}
          onBook={onBook}
          onChat={onChat}
        />
      ))}
    </div>
  );
}