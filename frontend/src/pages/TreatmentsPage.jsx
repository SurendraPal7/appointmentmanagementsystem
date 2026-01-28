import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import TreatmentCard from '../components/TreatmentCard';
import axios from 'axios';

const TreatmentsPage = () => {
    const [treatments, setTreatments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTreatments = async () => {
            try {
                // If you have a proxy set up in vite.config.js, use relative URL. Otherwise headers logic needed.
                // Assuming Vite proxy to localhost:5000 is needed or CORS is set. 
                // Using hardcoded URL for certainty unless store/config is available.
                // But axios usually needs base URL.
                const { data } = await axios.get('http://localhost:5000/api/treatments');
                setTreatments(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching treatments:', error);
                setLoading(false);
            }
        };

        fetchTreatments();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Header Section */}
            <div className="relative pt-32 pb-20 px-4 min-h-[400px] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                        alt="Ayurvedic Herbs"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-ayur-primary/95 to-ayur-primary/80"></div>
                </div>

                <div className="container mx-auto max-w-6xl text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white leading-tight">
                        Ayurvedic Treatments <br /> & Home Remedies
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 font-light">
                        Discover ancient wisdom for modern ailments. Natural cures and holistic healing therapies.
                    </p>

                    {/* Removed Search Bar */}
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-16">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ayur-primary mx-auto"></div>
                        <p className="text-gray-500 mt-4 text-lg">Loading Treatments...</p>
                    </div>
                ) : (
                    <>
                        {treatments.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-xl text-gray-600">No treatments found.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {treatments.map((treatment) => (
                                    <TreatmentCard key={treatment._id} treatment={treatment} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default TreatmentsPage;
