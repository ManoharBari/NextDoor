import React from 'react';

interface BookingButtonProps {
  serviceId: string;
  onBook: (serviceId: string) => void;
}

export function BookingButton({ serviceId, onBook }: BookingButtonProps) {
  return (
    <button
      onClick={() => onBook(serviceId)}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Book Now
    </button>
  );
}