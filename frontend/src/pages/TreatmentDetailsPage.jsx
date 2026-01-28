import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Clock, AlertTriangle, Leaf, CheckCircle } from 'lucide-react';

const TreatmentDetailsPage = () => {
    const { id } = useParams();
    const [treatment, setTreatment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        const fetchTreatment = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/treatments/${id}`);
                setTreatment(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching treatment details:', error);
                setLoading(false);
            }
        };

        fetchTreatment();
    }, [id]);

    useEffect(() => {
        if (treatment) {
            setImgSrc(treatment.image || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80");
        }
    }, [treatment]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ayur-primary mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading details...</p>
                </div>
            </div>
        );
    }

    if (!treatment) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Treatment Not Found</h2>
                    <Link to="/treatments" className="text-ayur-primary hover:underline">Back to Treatments</Link>
                </div>
            </div>
        );
    }

    const handleError = () => {
        setImgSrc("https://placehold.co/1200x600/e2e8f0/1e293b?text=Ayurveda");
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 pb-20">
            {/* Hero Image Section */}
            <div className="h-[400px] relative w-full overflow-hidden">
                <img
                    src={imgSrc}
                    alt={treatment?.title}
                    onError={handleError}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                    <div className="container mx-auto px-4 pb-12">
                        <div className="max-w-4xl">
                            <Link to="/treatments" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition">
                                <ArrowLeft className="w-5 h-5 mr-2" /> Back to Treatments
                            </Link>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-ayur-secondary text-ayur-primary px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                                    {treatment.type}
                                </span>
                                <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium border border-white/30">
                                    {treatment.disease}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 shadow-sm">
                                {treatment.title}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 -mt-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description Card */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-serif font-bold text-ayur-primary mb-4 flex items-center">
                                <Leaf className="w-6 h-6 mr-2" /> Overview
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {treatment.description}
                            </p>
                        </div>

                        {/* Steps Card */}
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-serif font-bold text-ayur-primary mb-6 flex items-center">
                                <CheckCircle className="w-6 h-6 mr-2" /> Preparation & Usage
                            </h2>
                            <ul className="space-y-4">
                                {treatment.steps.map((step, index) => (
                                    <li key={index} className="flex items-start">
                                        <div className="flex-shrink-0 w-8 h-8 bg-ayur-primary/10 rounded-full flex items-center justify-center text-ayur-primary font-bold mr-4 mt-1">
                                            {index + 1}
                                        </div>
                                        <p className="text-gray-700 text-lg">{step}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Quick Info */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-ayur-secondary">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Details</h3>

                            {treatment.duration && (
                                <div className="flex items-center text-gray-700 mb-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <Clock className="w-5 h-5 mr-3 text-ayur-primary" />
                                    <div>
                                        <span className="block text-xs uppercase text-gray-500 font-bold">Duration</span>
                                        <span className="font-medium">{treatment.duration}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Precautions */}
                        {treatment.precautions && treatment.precautions.length > 0 && (
                            <div className="bg-red-50 rounded-xl shadow-lg p-6 border-l-4 border-red-400">
                                <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                                    <AlertTriangle className="w-5 h-5 mr-2" /> Precautions
                                </h3>
                                <ul className="space-y-2">
                                    {treatment.precautions.map((item, index) => (
                                        <li key={index} className="text-red-700 flex items-start">
                                            <span className="mr-2">•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TreatmentDetailsPage;
