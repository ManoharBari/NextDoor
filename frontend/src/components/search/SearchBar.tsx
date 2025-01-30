import React from 'react';
import { Search, Sliders } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onOpenFilters: () => void;
}

export function SearchBar({ searchTerm, onSearchChange, onOpenFilters }: SearchBarProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search services..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <button 
        onClick={onOpenFilters}
        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
      >
        <Sliders className="w-5 h-5" />
        <span>Filters</span>
      </button>
    </div>
  );
}