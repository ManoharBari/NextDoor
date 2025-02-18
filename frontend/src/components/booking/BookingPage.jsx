import React, { useContext, useEffect, useState } from 'react';
import { Calendar, Clock, CreditCard, MapPin, MessageSquare } from 'lucide-react';
import { formatPrice } from '../../utils/format';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function BookingPage({ serviceId, amount, userId, service }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    address: '',
    notes: '',
    paymentMethod: 'credit_card'
  });

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadRazorpay();
  }, []);

  const handlePayment = async () => {
    try {
      const { data } = await axios.post("http://localhost:8080/orders/create-order", {
        userId,
        serviceId,
        amount,
        bookingDate: formData.date,
        bookingTime: formData.time,
        address: formData.address
      }, {
        headers: {
          "Content-Type": "application/json",
          token: `${localStorage.getItem('token')}`,
        },
      });

      const options = {
        key: `${import.meta.env.VITE_REACT_APP_RAZORPAY_KEY_ID}`,
        amount: data.order.amount,
        currency: "INR",
        name: "NextDoor",
        description: "Service Booking Payment",
        image: "/logo.png",
        order_id: data.order.id,
        handler: async (response) => {
          await axios.post("http://localhost:8080/orders/verify-payment", response,
            {
              headers: {
                "Content-Type": "application/json",
                token: `${localStorage.getItem('token')}`,
              },
            });
          alert("Payment successful!");
          navigate("/orders");
        },
        prefill: {
          email: "contact@nextdoor.com",
          contact: "9876543210",
        },
        theme: {
          color: "#2563eb",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Preview */}
          <div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64">
                <img
                  src={"https://media.istockphoto.com/id/1049775258/photo/smiling-handsome-electrician-repairing-electrical-box-with-pliers-in-corridor-and-looking-at.jpg?s=1024x1024&w=is&k=20&c=I8Fxr-SRoAovM3W5Ijd36Vv3cYFqrEErd6mKvPUjmzs="}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h1 className="text-2xl font-bold">{service.title}</h1>
                  <p className="text-lg">{service.provider.name}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Service Details</h2>
                  <p className="text-gray-600">{service.description}</p>
                </div>

                <div className="flex items-center justify-between py-4 border-t">
                  <span className="text-gray-600">Price</span>
                  <span className="text-2xl font-bold">{formatPrice(service.price)}/visit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Book Service</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handlePayment()
            }} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="pl-10 py-1 px-4 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="pl-10 py-1 px-4 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="pl-10 py-2 px-4 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your address..."
                    rows={2}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="pl-10 py-2 px-4 w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    rows={2}
                    placeholder="Any special instructions or requirements..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Pay Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}