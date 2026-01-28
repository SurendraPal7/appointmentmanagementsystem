import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-ayur-text text-gray-300 mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-ayur-secondary mb-4">AyurCare</h3>
                        <p className="text-sm leading-relaxed mb-4">
                            Restoring balance to your life through the ancient science of Ayurveda. Holistic healing for mind, body, and soul.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-ayur-secondary transition"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-ayur-secondary transition"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-ayur-secondary transition"><Instagram className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-ayur-secondary transition">About Us</a></li>
                            <li><a href="#" className="hover:text-ayur-secondary transition">Our Treatments</a></li>
                            <li><a href="#" className="hover:text-ayur-secondary transition">Find a Doctor</a></li>
                            <li><a href="#" className="hover:text-ayur-secondary transition">Book Appointment</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Therapies</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-ayur-secondary transition">Panchakarma</a></li>
                            <li><a href="#" className="hover:text-ayur-secondary transition">Abhyanga</a></li>
                            <li><a href="#" className="hover:text-ayur-secondary transition">Shirodhara</a></li>
                            <li><a href="#" className="hover:text-ayur-secondary transition">Yoga & Meditation</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="w-5 h-5 mr-2 text-ayur-secondary shrink-0" />
                                <span>123 Wellness Street, Green Valley, India</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="w-5 h-5 mr-2 text-ayur-secondary" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="w-5 h-5 mr-2 text-ayur-secondary" />
                                <span>info@ayurcare.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 bg-gray-900 py-4">
                <div className="container mx-auto px-4 text-center text-sm">
                    <p>&copy; 2025 AyurCare. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
