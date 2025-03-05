import React, { useContext, useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { formatPrice } from '../../../utils/format';
import OrderContext from '../../../context/order/orderContext';
import UserContext from '../../../context/auth/userContext';


const mockBookings = [
  {
    id: '1',
    clientName: 'John Doe',
    service: 'House Cleaning',
    date: '2024-03-15',
    time: '14:00',
    duration: 3,
    address: '123 Main St, New York, NY',
    status: 'created',
    amount: 105
  },
  {
    id: '2',
    clientName: 'Sarah Smith',
    service: 'Deep Cleaning',
    date: '2024-03-16',
    time: '10:00',
    duration: 4,
    address: '456 Park Ave, New York, NY',
    status: 'confirmed',
    amount: 180
  },
  {
    id: '3',
    clientName: 'Mike Johnson',
    service: 'House Cleaning',
    date: '2024-03-14',
    time: '09:00',
    duration: 2,
    address: '789 Broadway, New York, NY',
    status: 'paid',
    amount: 70
  }
];

function getStatusColor(status) {
  switch (status) {
    case 'paid':
      return 'text-green-600 bg-green-50';
    case 'confirmed':
      return 'text-blue-600 bg-blue-50';
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
    case 'confirmed':
      return <CheckCircle className="w-5 h-5" />;
    case 'created':
      return <AlertCircle className="w-5 h-5" />;
    case 'cancelled':
      return <XCircle className="w-5 h-5" />;
    default:
      return <AlertCircle className="w-5 h-5" />;
  }
}

export function BookingsPage() {
  const [filter, setFilter] = useState('all');
  const { user } = useContext(UserContext);
  const { orderData, ShowAllOrder } = useContext(OrderContext);

  useEffect(() => {
    ShowAllOrder()
  }, []);


  const filteredBookings = orderData.filter(booking =>
    (filter === 'all' || booking.status === filter) && booking.serviceId.provider._id === user.id
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Bookings</h2>
        <div className="flex gap-2">
          {['all', 'created', 'confirmed', 'paid'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg capitalize ${filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
                }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredBookings.map((booking) => (
          <div
            key={booking._id}
            className="p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{booking.userId.name}</h3>
                <p className="text-gray-600">{booking.serviceId.title}</p>
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
                  <span>{booking.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${getStatusColor(booking.status)}`}>
                  {getStatusIcon(booking.status)}
                  <span className="capitalize">{booking.status}</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{formatPrice(booking.amount)}</div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              {booking.status === 'created' && (
                <>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Confirm
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Decline
                  </button>
                </>
              )}
              {booking.status === 'paid' && (
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Mark as Completed
                </button>
              )}
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}