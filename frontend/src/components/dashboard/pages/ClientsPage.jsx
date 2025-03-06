import React from 'react';
import { Mail, Phone, MapPin, Calendar, Star } from 'lucide-react';



const mockClients = [
  {
    id: '1',
    name: 'Vishal Desai',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY',
    joinedDate: '2024-01-15',
    bookings: 5,
    totalSpent: 450,
    avatar: 'https://img.freepik.com/premium-photo/portrait-young-man-against-gray-background_1048944-7971045.jpg',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Arnav Gupta',
    email: 'sarah.smith@example.com',
    phone: '+1 (555) 987-6543',
    address: '456 Park Ave, New York, NY',
    joinedDate: '2024-02-01',
    bookings: 3,
    totalSpent: 280,
    avatar: 'https://img.freepik.com/free-photo/front-view-smiley-man-seaside_23-2149737022.jpg',
    rating: 4.9
  }
];

export function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Clients</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search clients..."
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Time</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockClients.map((client) => (
          <div key={client.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex gap-4">
              <img
                src={client.avatar}
                alt={client.name}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{client.name}</h3>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span>{client.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{client.bookings}</div>
                    <div className="text-sm text-gray-600">bookings</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-5 h-5" />
                <a href={`mailto:${client.email}`} className="hover:text-blue-600">
                  {client.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-5 h-5" />
                <a href={`tel:${client.phone}`} className="hover:text-blue-600">
                  {client.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{client.address}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>Joined {new Date(client.joinedDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between items-center">
              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                View Bookings
              </button>
              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                Send Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}