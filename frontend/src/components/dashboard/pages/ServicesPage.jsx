import React, { useState } from 'react';
import { Plus, Edit, Trash, Star } from 'lucide-react';
import { formatPrice } from '../../../utils/format';

const mockServices = [
  {
    id: '1',
    title: 'House Cleaning',
    description: 'Professional house cleaning service with eco-friendly products',
    price: 35,
    duration: 2,
    category: 'Cleaning',
    image: 'https://source.unsplash.com/800x600/?cleaning',
    rating: 4.8,
    bookings: 156
  },
  {
    id: '2',
    title: 'Deep Cleaning',
    description: 'Thorough deep cleaning service for all rooms',
    price: 45,
    duration: 4,
    category: 'Cleaning',
    image: 'https://source.unsplash.com/800x600/?deep-cleaning',
    rating: 4.9,
    bookings: 98
  }
];

export function ServicesPage() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Services</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockServices.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-48">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">{service.rating}</span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-2xl font-bold">{formatPrice(service.price)}</span>
                  <span className="text-gray-600">/hour</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{service.bookings}</div>
                  <div className="text-sm text-gray-600">bookings</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Edit className="w-5 h-5" />
                  Edit
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                  <Trash className="w-5 h-5" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New Service</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (per hour)
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (hours)
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                  <option>Cleaning</option>
                  <option>Plumbing</option>
                  <option>Electrical</option>
                  <option>Gardening</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Service
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}