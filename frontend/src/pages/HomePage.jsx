import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage = () => {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")' }}
                >
                    <div className="absolute inset-0 bg-ayur-primary/70 mix-blend-multiply"></div>
                </div>

                <div className="relative z-10 text-center container mx-auto px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-serif font-bold mb-6 text-ayur-secondary drop-shadow-md"
                    >
                        Ancient Wisdom, <br /> Modern Healing
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light text-gray-100"
                    >
                        Experience holistic wellness with our expert Ayurvedic treatments tailored for your body and mind.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Link
                            to="/login"
                            className="inline-flex items-center px-8 py-4 bg-ayur-secondary text-ayur-primary text-lg font-bold rounded-full hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg"
                        >
                            Book an Appointment <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-ayur-bg">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif text-ayur-primary font-bold mb-4">Why Choose AyurCare?</h2>
                        <div className="w-24 h-1 bg-ayur-secondary mx-auto rounded"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <FeatureCard
                            icon={<ShieldCheck className="w-12 h-12 text-ayur-secondary" />}
                            title="Expert Doctors"
                            description="Consult with certified Ayurvedic practitioners with decades of experience."
                        />
                        <FeatureCard
                            icon={<Heart className="w-12 h-12 text-ayur-secondary" />}
                            title="Natural Treatments"
                            description="100% organic herbs and traditional therapies for zero side-effects."
                        />
                        <FeatureCard
                            icon={<Calendar className="w-12 h-12 text-ayur-secondary" />}
                            title="Easy Booking"
                            description="Seamless online appointment scheduling at your convenience."
                        />
                    </div>
                </div>
            </section>

            {/* Wellness Blog Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif text-ayur-primary font-bold mb-4">Ayurvedic Health Blog</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Explore ancient wisdom for modern living with our curated health tips and articles.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <BlogCard
                            image="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                            category="Diet & Nutrition"
                            title="5 Ayurvedic Superfoods for Immunity"
                            desc="Discover the power of Turmeric, Amla, and Ashwagandha in boosting your natural defenses."
                        />
                        <BlogCard
                            image="https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                            category="Lifestyle"
                            title="Dinacharya: The Ideal Daily Routine"
                            desc="Align your daily habits with nature's rhythm for optimal energy and health."
                        />
                        <BlogCard
                            image="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                            category="Mental Health"
                            title="Meditation Techniques for Stress"
                            desc="Simple breathing exercises and mindfulness practices to calm the Vata mind."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center"
    >
        <div className="bg-green-50 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-ayur-accent mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </motion.div>
);

const BlogCard = ({ image, category, title, desc }) => (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
        <div className="relative h-56 overflow-hidden">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 bg-ayur-secondary text-ayur-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {category}
            </div>
        </div>
        <div className="p-6">
            <h3 className="text-xl font-serif font-bold text-ayur-primary mb-3 group-hover:text-ayur-accent transition-colors">{title}</h3>
            <p className="text-gray-600 mb-4 text-sm line-clamp-2">{desc}</p>
            <button className="flex items-center text-ayur-primary font-bold hover:text-ayur-secondary transition text-sm uppercase tracking-wide">
                Read More <ArrowRight className="w-4 h-4 ml-1" />
            </button>
        </div>
    </div>
);

export default HomePage;
