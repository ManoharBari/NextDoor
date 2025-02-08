import React from 'react';
import { Star, MapPin, Clock, MessageCircle } from 'lucide-react';
import { formatDistance } from '../../utils/distance';
import { formatPrice } from '../../utils/format';

export function ServiceCard({ service, onBook, onChat, onProviderClick }) {
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
        <div className="flex items-center gap-2 mb-2">
          <img
            src={service.provider.avatar}
            alt={service.provider.name}
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={() => onProviderClick?.(service.provider.id)}
          />
          <div>
            <h3 className="text-lg font-semibold">{service.title}</h3>
            <p
              className="text-sm text-gray-600 cursor-pointer hover:text-blue-600"
              onClick={() => onProviderClick?.(service.provider.id)}
            >
              {service.provider.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{formatDistance(service.provider.location)}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Available today</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold">{formatPrice(service.price)}</span>
            <span className="text-gray-600">/hour</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onChat(service.provider.id)}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => onBook(service.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}