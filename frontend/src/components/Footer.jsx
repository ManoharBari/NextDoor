import React from 'react'
import { DoorOpen, Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

function Footer() {
    const socialLinks = [
        { href: "https://facebook.com/nextdoor", icon: Facebook, label: "Facebook" },
        { href: "https://twitter.com/nextdoor", icon: Twitter, label: "Twitter" },
        { href: "https://instagram.com/nextdoor", icon: Instagram, label: "Instagram" },
    ];

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Section */}
                    <div>
                        <h2 className="text-4xl flex items-center gap-2 font-bold mb-4"><DoorOpen size={40} />NextDoor</h2>
                        <p className="text-gray-400">
                            Connecting service providers with clients seamlessly.
                            find, book, and chat with trusted professionals.
                            secure payments, verified profiles, and a hassle-free experience.
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <Mail className="h-5 w-5 mr-2" />
                                <a href="mailto:contact@eventura.com" className="text-gray-400 hover:text-white">
                                    support@nextdoor.com
                                </a>
                            </div>
                            <div className="flex items-center">
                                <Phone className="h-5 w-5 mr-2" />
                                <a href="tel:+1234567890" className="text-gray-400 hover:text-white">
                                    (+91) 987 654 3210
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Social Media Section */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            {socialLinks.map(({ href, icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="text-gray-400 hover:text-white transition duration-300"
                                >
                                    <Icon className="h-6 w-6" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} NextDoor. All rights reserved.</p>
                </div>
            </div>
        </footer>

    )
}

export default Footer
