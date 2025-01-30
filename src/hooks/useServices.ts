import { useState, useEffect, useMemo } from 'react';
import { mockServices } from '../data/mockServices';
import type { Service } from '../types';

export function useServices() {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [services, searchTerm, selectedCategory]);

  return {
    services: filteredServices,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory
  };
}