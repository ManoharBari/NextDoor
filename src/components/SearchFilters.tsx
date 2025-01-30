import React from 'react';
import { Search, Sliders } from 'lucide-react';

export function SearchFilters() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search services..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <Sliders className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>
      
      <div className="flex gap-2 mt-4">
        {['All', 'Cleaning', 'Plumbing', 'Electrical', 'Gardening', 'Moving'].map((category) => (
          <button
            key={category}
            className="px-4 py-1 rounded-full text-sm bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}