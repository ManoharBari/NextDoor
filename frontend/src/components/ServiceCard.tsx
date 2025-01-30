import React from 'react';
import { Star, MapPin, Clock } from 'lucide-react';
import type { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onBook: (serviceId: string) => void;
}

export function ServiceCard({ service, onBook }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={`https://source.unsplash.com/800x600/?${service.category.toLowerCase()}`}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="font-medium">{service.rating.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">2.5 miles away</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Available today</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold">${service.price}</span>
            <span className="text-gray-600">/hour</span>
          </div>
          <button
            onClick={() => onBook(service.id)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}