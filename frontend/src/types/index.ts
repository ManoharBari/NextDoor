export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  provider: Provider;
  rating: number;
  reviews: Review[];
}

export interface Provider {
  id: string;
  name: string;
  avatar: string;
  profession: string;
  rating: number;
  location: {
    lat: number;
    lng: number;
  };
  email: string;
  phone: string;
  about: string;
  reviews?: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  userId: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}