import type { Service } from '../types';

export const mockServices: Service[] = [
  {
    id: '1',
    title: 'Professional House Cleaning',
    category: 'Cleaning',
    description: 'Thorough house cleaning service with eco-friendly products',
    price: 35,
    provider: {
      id: 'p1',
      name: 'Sarah Johnson',
      avatar: 'https://source.unsplash.com/100x100/?portrait-woman-1',
      profession: 'Professional House Cleaner',
      rating: 4.8,
      location: { lat: 40.7128, lng: -74.0060 },
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 123-4567',
      about: 'With over 5 years of experience in professional house cleaning, I take pride in providing thorough, eco-friendly cleaning services. I specialize in deep cleaning, organization, and maintaining a healthy living environment for my clients.\n\nI use only premium, environmentally safe cleaning products and follow a detailed checklist to ensure no spot is missed. Available for regular maintenance cleaning as well as one-time deep cleaning services.',
      reviews: [
        {
          id: 'r1',
          userId: 'u1',
          userName: 'Emily Chen',
          rating: 5,
          comment: 'Sarah did an amazing job! My house has never been cleaner. Very professional and thorough.',
          date: '2024-02-15'
        },
        {
          id: 'r2',
          userId: 'u2',
          userName: 'Michael Brown',
          rating: 4.5,
          comment: 'Great attention to detail and very reliable. Highly recommended!',
          date: '2024-02-10'
        }
      ]
    },
    rating: 4.8,
    reviews: []
  },
  {
    id: '2',
    title: 'Deep House Cleaning',
    category: 'Cleaning',
    description: 'Comprehensive deep cleaning service for all rooms',
    price: 45,
    provider: {
      id: 'p1',
      name: 'Sarah Johnson',
      avatar: 'https://source.unsplash.com/100x100/?portrait-woman-1',
      profession: 'Professional House Cleaner',
      rating: 4.8,
      location: { lat: 40.7128, lng: -74.0060 },
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 123-4567',
      about: 'With over 5 years of experience in professional house cleaning, I take pride in providing thorough, eco-friendly cleaning services. I specialize in deep cleaning, organization, and maintaining a healthy living environment for my clients.\n\nI use only premium, environmentally safe cleaning products and follow a detailed checklist to ensure no spot is missed. Available for regular maintenance cleaning as well as one-time deep cleaning services.',
      reviews: [
        {
          id: 'r1',
          userId: 'u1',
          userName: 'Emily Chen',
          rating: 5,
          comment: 'Sarah did an amazing job! My house has never been cleaner. Very professional and thorough.',
          date: '2024-02-15'
        },
        {
          id: 'r2',
          userId: 'u2',
          userName: 'Michael Brown',
          rating: 4.5,
          comment: 'Great attention to detail and very reliable. Highly recommended!',
          date: '2024-02-10'
        }
      ]
    },
    rating: 4.8,
    reviews: []
  },
  {
    id: '3',
    title: 'Garden Maintenance',
    category: 'Gardening',
    description: 'Professional garden care and landscaping services',
    price: 45,
    provider: {
      id: 'p3',
      name: 'Emily Chen',
      avatar: 'https://source.unsplash.com/100x100/?portrait-woman-2',
      profession: 'Professional Landscape Designer',
      rating: 4.7,
      location: { lat: 40.7128, lng: -74.0060 },
      email: 'emily.chen@example.com',
      phone: '+1 (555) 987-6543',
      about: 'As a certified landscape designer with a degree in Horticulture, I bring creativity and expertise to every garden project. My services include garden maintenance, landscape design, plant selection, and seasonal care.\n\nI believe in creating sustainable, beautiful outdoor spaces that enhance both the aesthetic and value of your property. Each project is tailored to the specific needs of the client and the local climate.',
      reviews: []
    },
    rating: 4.7,
    reviews: []
  }
];