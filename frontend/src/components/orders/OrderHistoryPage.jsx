import React, { useContext, useEffect } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import UserContext from '../../context/auth/userContext';
import { formatPrice, formatDate } from '../../utils/format';
import OrderContext from '../../context/order/orderContext';


const mockBookings = [
  {
    id: '1',
    serviceId: '1',
    userId: '1',
    date: '2024-03-15',
    time: '14:00',
    status: 'completed',
    service: {
      title: 'Professional House Cleaning',
      price: 35,
      provider: {
        name: 'Sarah Johnson',
        avatar: 'https://source.unsplash.com/100x100/?portrait-woman-1'
      }
    },
    totalAmount: 70,
    duration: 2,
    address: '123 Main St, New York, NY 10001',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card'
  },
  {
    id: '2',
    serviceId: '2',
    userId: '1',
    date: '2024-03-20',
    time: '10:00',
    status: 'pending',
    service: {
      title: 'Garden Maintenance',
      price: 45,
      provider: {
        name: 'Emily Chen',
        avatar: 'https://source.unsplash.com/100x100/?portrait-woman-2'
      }
    },
    totalAmount: 90,
    duration: 2,
    address: '456 Park Ave, New York, NY 10002',
    paymentStatus: 'pending',
    paymentMethod: 'credit_card'
  }
];

function getStatusColor(status) {
  switch (status) {
    case 'paid':
      return 'text-green-600 bg-green-50';
    case 'created':
      return 'text-yellow-600 bg-yellow-50';
    case 'cancelled':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

function getStatusIcon(status) {
  switch (status) {
    case 'paid':
      return <CheckCircle className="w-5 h-5" />;
    case 'created':
      return <AlertCircle className="w-5 h-5" />;
    case 'cancelled':
      return <XCircle className="w-5 h-5" />;
    default:
      return <AlertCircle className="w-5 h-5" />;
  }
}

export function OrderHistoryPage({ service }) {
  const { user } = useContext(UserContext);
  const { orderData, ShowAllOrder } = useContext(OrderContext);

  useEffect(() => {
    if (user) {
      ShowAllOrder();
    }
  }, []);
  
  // const filteredBookings = orderData.filter((booking) => booking.userId._id === user._id);
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Please sign in to view your orders</h2>
          <p className="mt-2 text-gray-600">You need to be signed in to access your order history.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="mt-2 text-gray-600">Track and manage your service bookings</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {orderData.map((booking) => (
            <div
              key={booking._id}
              className="p-6 border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-center gap-4">
                  <img
                    src={booking.userId.profilePicture}
                    alt={booking.userId.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {booking.serviceId.title}
                    </h3>
                    <p className="text-gray-600">{service.provider.name}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span>{booking.bookingTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span className="truncate max-w-xs">{booking.address}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    <span className="capitalize">{booking.status}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatPrice(booking.amount)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-4">
                {booking.status === 'created' && (
                  <>
                    <button
                      onClick={() => console.log('Cancel booking:', booking.id)}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Cancel Booking
                    </button>
                    <button
                      onClick={() => console.log('Reschedule booking:', booking.id)}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Reschedule
                    </button>
                  </>
                )}
                {booking.status === 'paid' && (
                  <button
                    onClick={() => console.log('Book again:', booking.id)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Book Again
                  </button>
                )}
                <button
                  onClick={() => console.log('View details:', booking.id)}
                  className="text-gray-600 hover:text-gray-700 font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}