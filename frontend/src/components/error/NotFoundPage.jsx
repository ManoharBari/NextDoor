import React from 'react';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl p-8 md:p-12"
                >
                    {/* Animated 404 Text */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                        }}
                        className="mb-8"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{
                                    rotate: [0, -5, 5, -5, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="text-8xl md:text-9xl font-bold text-blue-600 opacity-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            >
                                404
                            </motion.div>
                            <h1 className="text-8xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                404
                            </h1>
                        </div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl font-bold text-gray-900 mb-4"
                    >
                        Page Not Found
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-600 mb-8"
                    >
                        Oops! The page you're looking for seems to have wandered off. Let's help you find your way back.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <motion.button
                            onClick={() => navigate('/')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg inline-flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                        >
                            <Home className="w-5 h-5" />
                            <span>Go Home</span>
                        </motion.button>

                        <motion.button
                            onClick={() => navigate(-1)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg inline-flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Go Back</span>
                        </motion.button>
                    </motion.div>

                    {/* Search Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 max-w-md mx-auto"
                    >
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search for services..."
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Quick Links */}
                        <div className="mt-6">
                            <p className="text-sm text-gray-600 mb-3">Popular pages</p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {['Home', 'Services', 'About Us', 'Contact'].map((link, index) => (
                                    <motion.button
                                        key={link}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 + (index * 0.1) }}
                                        className="px-4 py-2 rounded-full bg-gray-100 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                                    >
                                        {link}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}