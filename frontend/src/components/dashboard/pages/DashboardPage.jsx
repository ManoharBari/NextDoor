import React from 'react';
import {
  TrendingUp,
  Users,
  Calendar,
  IndianRupee,
  Star,
  Clock,
} from 'lucide-react';
import { formatPrice } from '../../../utils/format';

const mockStats = {
  totalBookings: 156,
  activeBookings: 12,
  totalEarnings: 4850,
  averageRating: 4.8,
  totalClients: 98,
  totalServices: 5,
  recentBookings: [
    {
      id: '1',
      clientName: 'Ritesh Jain',
      service: 'House Cleaning',
      date: '2024-03-15',
      time: '14:00',
      status: 'confirmed',
      amount: 75
    },
    {
      id: '2',
      clientName: 'Ganesh Sardesai',
      service: 'Deep Cleaning',
      date: '2024-03-16',
      time: '10:00',
      status: 'pending',
      amount: 120
    },
    {
      id: '3',
      clientName: 'Pratham Patil',
      service: 'Plimbing Services',
      date: '2024-03-18',
      time: '12:00',
      status: 'pending',
      amount: 240
    }
  ],
  monthlyEarnings: [
    { month: 'Jan', amount: 750 },
    { month: 'Feb', amount: 980 },
    { month: 'Mar', amount: 1650 }
  ],
  metrics: {
    bookingsGrowth: 12,
    earningsGrowth: 8,
    clientsGrowth: 5,
    ratingGrowth: 2
  }
};

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            {mockStats.metrics.bookingsGrowth > 0 ? (
              <div className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>{mockStats.metrics.bookingsGrowth}%</span>
              </div>
            ) : (
              <div className="flex items-center text-red-600">
                <ArrowDownRight className="w-4 h-4 mr-1" />
                <span>{Math.abs(mockStats.metrics.bookingsGrowth)}%</span>
              </div>
            )}
          </div>
          <h3 className="text-2xl font-bold">{mockStats.totalBookings}</h3>
          <p className="text-gray-600">Total Bookings</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <IndianRupee className="w-6 h-6 text-green-600" />
            </div>
            {mockStats.metrics.earningsGrowth > 0 ? (
              <div className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>{mockStats.metrics.earningsGrowth}%</span>
              </div>
            ) : (
              <div className="flex items-center text-red-600">
                <ArrowDownRight className="w-4 h-4 mr-1" />
                <span>{Math.abs(mockStats.metrics.earningsGrowth)}%</span>
              </div>
            )}
          </div>
          <h3 className="text-2xl font-bold">{formatPrice(mockStats.totalEarnings)}</h3>
          <p className="text-gray-600">Total Earnings</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            {mockStats.metrics.clientsGrowth > 0 ? (
              <div className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>{mockStats.metrics.clientsGrowth}%</span>
              </div>
            ) : (
              <div className="flex items-center text-red-600">
                <ArrowDownRight className="w-4 h-4 mr-1" />
                <span>{Math.abs(mockStats.metrics.clientsGrowth)}%</span>
              </div>
            )}
          </div>
          <h3 className="text-2xl font-bold">{mockStats.totalClients}</h3>
          <p className="text-gray-600">Total Clients</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            {mockStats.metrics.ratingGrowth > 0 ? (
              <div className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>{mockStats.metrics.ratingGrowth}%</span>
              </div>
            ) : (
              <div className="flex items-center text-red-600">
                <ArrowDownRight className="w-4 h-4 mr-1" />
                <span>{Math.abs(mockStats.metrics.ratingGrowth)}%</span>
              </div>
            )}
          </div>
          <h3 className="text-2xl font-bold">{mockStats.averageRating}</h3>
          <p className="text-gray-600">Average Rating</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Monthly Earnings</h2>
          <div className="h-64 flex items-end justify-between gap-2">
            {mockStats.monthlyEarnings.map((data) => (
              <div key={data.month} className="flex flex-col items-center gap-2">
                <div
                  className="w-16 bg-blue-600 rounded-t-lg transition-all hover:bg-blue-700"
                  style={{ height: `${(data.amount / 1100) * 100}px` }}
                />
                <span className="text-sm text-gray-600">{data.month}</span>
                <span className="font-medium">{formatPrice(data.amount)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Recent Bookings</h2>
            <button className="text-blue-600 hover:text-blue-700">View all</button>
          </div>
          <div className="space-y-4">
            {mockStats.recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{booking.clientName}</h3>
                    <p className="text-sm text-gray-600">{booking.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatPrice(booking.amount)}</div>
                  <div className="text-sm text-gray-600">
                    {new Date(booking.date).toLocaleDateString()} at {booking.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}