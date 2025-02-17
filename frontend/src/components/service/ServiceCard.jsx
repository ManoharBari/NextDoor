import React from 'react';
import { Star, MapPin, Clock, MessageCircle } from 'lucide-react';
import { formatPrice } from '../../utils/format';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function ServiceCard({ service, onBook, onChat, onProviderClick }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={"https://media.istockphoto.com/id/1049775258/photo/smiling-handsome-electrician-repairing-electrical-box-with-pliers-in-corridor-and-looking-at.jpg?s=1024x1024&w=is&k=20&c=I8Fxr-SRoAovM3W5Ijd36Vv3cYFqrEErd6mKvPUjmzs="}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="font-medium">{service.rating}4.6</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={"https://media.istockphoto.com/id/1288538088/photo/portrait-young-confident-smart-asian-businessman-look-at-camera-and-smile.webp?a=1&b=1&s=612x612&w=0&k=20&c=paMxlHje19nxRQGaGI-gz3QbGx1lgenKyTHVDfrhOlc="}
            alt={service.provider.name}
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={() => onProviderClick?.(service.provider._id)}
          />
          <div>
            <h3 className="text-lg font-semibold">{service.title}</h3>
            <p
              className="text-sm text-gray-600 cursor-pointer hover:text-blue-600"
              onClick={() => onProviderClick?.(service.provider._id)}
            >
              {service.provider.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{service.provider.location}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{service.availability ? "Available" : "Not Available"}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold">{formatPrice(service.price)}</span>
            <span className="text-gray-600">/visit</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onChat(service.provider._id)}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
           
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => {
                onBook(service._id)
                navigate(`/booking?serviceId=${service._id}&amount=${service.price}`)
              }}
            >
              Book Now
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}