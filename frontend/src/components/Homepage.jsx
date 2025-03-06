import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, Shield, Clock, CheckCircle, MapPin, Calendar, CreditCard, Home, ClipboardList, Award, ArrowRight, } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ServiceContext from '../context/service/serviceContext';

export function HomePage() {
    const navigate = useNavigate()
    const [selectedCategory, setSelectedCategory] = useState('All');
    const { searchTerm, setSearchTerm } = useContext(ServiceContext)

    const bookingSteps = [
        {
            icon: Search,
            title: 'Search a Service',
            description: 'Browse our wide range of professional services.',
            color: 'bg-blue-50'
        },
        {
            icon: ClipboardList,
            title: 'Choose a Provider',
            description: 'Select from our verified and highly-rated service providers.',
            color: 'bg-purple-50'
        },
        {
            icon: Calendar,
            title: 'Book Appointment',
            description: 'Pick a convenient date and time for your service.',
            color: 'bg-green-50'
        },
        {
            icon: CreditCard,
            title: 'Make Payment',
            description: 'Pay securely using your preferred payment method.',
            color: 'bg-orange-50'
        },
        {
            icon: CheckCircle,
            title: 'Get Confirmation',
            description: 'Receive instant confirmation and service details.',
            color: 'bg-pink-50'
        },
        {
            icon: Home,
            title: 'Enjoy the Service',
            description: 'Sit back while our professionals handle your needs.',
            color: 'bg-yellow-50'
        }
    ];

    const features = [
        {
            icon: Shield,
            title: 'Verified Providers',
            description: 'All service providers are thoroughly vetted and background-checked'
        },
        {
            icon: Clock,
            title: 'Flexible Scheduling',
            description: 'Book services at your convenience, 7 days a week'
        },
        {
            icon: Star,
            title: 'Quality Guaranteed',
            description: 'Satisfaction guaranteed or your money back'
        },
        {
            icon: Award,
            title: 'Expert Service',
            description: 'Skilled professionals with years of experience'
        }
    ];

    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Homeowner',
            image: 'https://t4.ftcdn.net/jpg/11/70/74/75/360_F_1170747517_cpGtv16ShOyiZBEp6nQcc4R8vmsbnsUv.jpg',
            content: 'Found an amazing cleaning service through this platform. The booking process was seamless!',
            rating: 5
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Business Owner',
            image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
            content: 'Great platform for finding reliable service providers. Highly recommended!',
            rating: 5
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative h-[600px] flex items-center justify-center"
            >
                <div className="absolute flex items-baseline justify-center inset-0">
                    <img
                        src="hero.jpg"
                        alt="Home Services"
                        className="md:w-[80vw] w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50" />
                </div>

                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6"
                    >
                        Find Trusted Service Providers
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl text-gray-200 mb-8"
                    >
                        Book reliable service providers for all your needs
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white p-4 rounded-lg shadow-lg max-w-2xl mx-auto"
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="What service do you need?"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Your location"
                                    className="w-full md:w-48 pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <button onClick={() => navigate('/services')} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                Search
                            </button>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Categories Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Popular Services</h2>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
                    >
                        {['Cleaning', 'Plumbing', 'Electrical', 'Gardening'].map((category, index) => (
                            <motion.button
                                key={category}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedCategory(category)}
                                className={`p-4 rounded-lg text-center transition-all transform hover:scale-105 ${selectedCategory === category
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-800 hover:bg-gray-50'
                                    }`}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white p-6 rounded-lg shadow-sm text-center"
                            >
                                <div className="w-16 shadow-lg h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <feature.icon className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white p-6 rounded-lg shadow-sm"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{testimonial.name}</h3>
                                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                                    </div>
                                    <div className="ml-auto flex">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-700">{testimonial.content}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* booking steps */}
            <section className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold mb-4">How to Book Your Service</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Booking a service is quick and easy. Follow these simple steps to get started.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {bookingSteps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`${step.color} p-3 rounded-xl`}>
                                        <step.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold">
                                                {index + 1}
                                            </span>
                                            <h3 className="font-semibold text-lg">{step.title}</h3>
                                        </div>
                                        <p className="text-gray-600">{step.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 mx-5 shadow-lg my-10 rounded-3xl bg-blue-600">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
                        <p className="text-blue-100 mb-8">Join thousands of satisfied customers who trust our platform</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/services")}
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 hover:bg-blue-50 transition-colors"
                        >
                            Book a Service
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}