import React, { useState } from 'react';
import { X, Calendar, Clock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Service } from '../../types';
import { formatPrice } from '../../utils/format';

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
}

export function BookingDialog({ isOpen, onClose, service }: BookingDialogProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const { isAuthenticated } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call to create the booking
    console.log('Booking submitted:', { service, date, time });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
        <p className="text-gray-600 mb-4">
          Provider: {service.provider.name}
        </p>
        <p className="text-xl font-bold mb-6">
          {formatPrice(service.price)}/hour
        </p>

        {!isAuthenticated ? (
          <div className="text-center py-4">
            <p className="text-gray-600 mb-4">Please sign in to book this service</p>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-10 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="pl-10 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Confirm Booking
            </button>
          </form>
        )}
      </div>
    </div>
  );
}