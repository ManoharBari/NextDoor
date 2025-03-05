import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function NoOrdersPage() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl p-8 md:p-12"
                >
                    {/* Animated Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.2
                        }}
                        className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8"
                    >
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Package className="w-12 h-12 text-blue-600" />
                        </motion.div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-bold text-gray-900 mb-4"
                    >
                        No Orders Yet
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-600 mb-8"
                    >
                        Looks like you haven't placed any orders yet. Start exploring our services and book your first service today!
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-4"
                    >
                        <motion.button
                            onClick={() => navigate('/services')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg inline-flex items-center gap-2 hover:bg-blue-700 transition-colors"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            <span>Browse Services</span>
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>

                        {/* Animated Features */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                            {[
                                { title: 'Verified Providers', description: 'All service providers are thoroughly vetted' },
                                { title: 'Secure Payments', description: 'Safe and secure payment methods' },
                                { title: 'Quality Service', description: 'Satisfaction guaranteed' },
                                { title: '24/7 Support', description: 'Help whenever you need it' }
                            ].map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 + (index * 0.1) }}
                                    className="bg-gray-50 p-4 rounded-lg text-left"
                                >
                                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                                    <p className="text-sm text-gray-600">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}