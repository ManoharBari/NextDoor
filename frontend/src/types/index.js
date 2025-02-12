export const Service = {
  id: "", // Unique service ID
  title: "",
  category: "",
  description: "",
  price: 0,
  provider: {
    id: "",
    name: "",
    rating: 0,
  },
  rating: 0,
  reviews: [], // Optional array
};

export const Provider = {
  id: "",
  name: "",
  avatar: "",
  profession: "",
  rating: 0,
  location: {
    lat: 0,
    lng: 0,
  },
  email: "",
  phone: "",
  about: "",
  reviews: [], // Optional array
};

export const Review = {
  id: "",
  userId: "",
  userName: "",
  rating: 0,
  comment: "",
  date: new Date(), // Use JS Date object instead of ""
};

export const Booking = {
  id: "",
  serviceId: "",
  userId: "",
  date: "",
  time: "",
  status: "pending" | "confirmed" | "completed" | "cancelled",
  service: {
    title: "",
    price: 0,
    provider: {
      name: "",
      avatar: "",
    },
  },
  totalAmount: 0,
  duration: 0,
  address: "",
  paymentStatus: "pending" | "paid" | "failed",
  paymentMethod: "",
};
