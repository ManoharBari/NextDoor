import React from 'react';
import { Navigation } from './Navigation';
import { DoorOpen } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="md:text-3xl text-2xl font-bold text-gray-900 flex justify-center items-end gap-1"><DoorOpen size={36} />NextDoor</h1>
          <Navigation />
        </div>
      </div>
    </header>
  );
}