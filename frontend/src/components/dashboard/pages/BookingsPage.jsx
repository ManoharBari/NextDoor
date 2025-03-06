import React, { useContext, useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { formatPrice } from '../../../utils/format';
import OrderContext from '../../../context/order/orderContext';
import UserContext from '../../../context/auth/userContext';

function getStatusColor(status) {
  switch (status) {
    case 'confirmed':
      return 'text-green-600 bg-green-50';
    case 'completed':
      return 'text-blue-600 bg-blue-50';
    case 'pending':
      return 'text-yellow-600 bg-yellow-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

function getStatusIcon(status) {
  switch (status) {
    case 'confirmed':
      return <CheckCircle className="w-5 h-5" />;
    case 'completed':
      return <CheckCircle className="w-5 h-5" />;
    case 'pending':
      return <AlertCircle className="w-5 h-5" />;
    default:
      return <AlertCircle className="w-5 h-5" />;
  }
}

export function BookingsPage() {
  const [filter, setFilter] = useState('all');
  const { user } = useContext(UserContext);
  const { orderData, ShowAllOrder, markAs } = useContext(OrderContext);

  useEffect(() => {
    ShowAllOrder()
  }, []);


  const filteredBookings = orderData.filter(booking =>
    (filter === 'all' || booking.status === filter) && booking.serviceId.provider._id === user.id
  );

  return (
    <div className="space-y-6">
      <div className="flex overflow-auto justify-between items-center">
        <h2 className="text-2xl mr-5 font-bold">Bookings</h2>
        <div className="flex gap-2">
          {['all', 'pending', 'confirmed', 'completed'].map((status) => (
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
              {booking.status === 'pending' && (
                <>
                  <button
                    onClick={() => markAs(booking._id, 'confirmed')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Confirm
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Decline
                  </button>
                </>
              )}
              {booking.status === 'confirmed' && (
                <button
                  onClick={() => markAs(booking._id, 'completed')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}