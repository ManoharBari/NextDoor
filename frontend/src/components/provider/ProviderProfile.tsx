import React from 'react';
import { MapPin, Star, Clock, Calendar, Mail, Phone } from 'lucide-react';
import { ServiceCard } from '../service/ServiceCard';
import { formatDistance } from '../../utils/distance';
import type { Provider, Service } from '../../types';

interface ProviderProfileProps {
  provider: Provider;
  services: Service[];
  onBook: (serviceId: string) => void;
  onChat: (providerId: string) => void;
}

export function ProviderProfile({ provider, services, onBook, onChat }: ProviderProfileProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
        <img
          src={`https://source.unsplash.com/1600x900/?${provider.profession.toLowerCase()}`}
          alt={provider.profession}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Provider Info */}
      <div className="relative z-10 -mt-32 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-32 h-32 rounded-xl object-cover border-4 border-white shadow-md"
            />
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{provider.name}</h1>
                  <p className="text-lg text-gray-600">{provider.profession}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{provider.rating.toFixed(1)}</span>
                  </div>
                  <button
                    onClick={() => onChat(provider.id)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Contact
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{formatDistance(provider.location)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>Available today</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>5+ years experience</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href={`mailto:${provider.email}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                  <Mail className="w-5 h-5" />
                  <span>{provider.email}</span>
                </a>
                <a href={`tel:${provider.phone}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                  <Phone className="w-5 h-5" />
                  <span>{provider.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">About</h2>
        <p className="text-gray-600 whitespace-pre-line">{provider.about}</p>
      </div>

      {/* Services Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Services ({services.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBook={onBook}
              onChat={onChat}
            />
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        {provider.reviews?.length ? (
          <div className="space-y-6">
            {provider.reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{review.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-600">{review.userName}</span>
                  <span className="text-gray-400">{review.date}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No reviews yet</p>
        )}
      </div>
    </div>
  );
}