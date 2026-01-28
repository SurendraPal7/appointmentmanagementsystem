import React from 'react';
import { ArrowRight, Leaf, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const TreatmentCard = ({ treatment }) => {
    const [imgSrc, setImgSrc] = React.useState(treatment.image || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80");

    const handleError = () => {
        // Fallback to a generic safe image or a placeholder service if Unsplash fails
        setImgSrc("https://placehold.co/600x400/e2e8f0/1e293b?text=Ayurveda");
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="h-48 overflow-hidden relative">
                <img
                    src={imgSrc}
                    alt={treatment.title}
                    onError={handleError}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-ayur-primary uppercase tracking-wider shadow-sm">
                    {treatment.type}
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                    <span className="bg-ayur-secondary/20 text-ayur-primary px-3 py-1 rounded-full text-xs font-semibold">
                        {treatment.disease}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif">{treatment.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {treatment.description}
                </p>

                <div className="space-y-3 mb-6">
                    {treatment.duration && (
                        <div className="flex items-center text-gray-500 text-sm">
                            <Clock className="w-4 h-4 mr-2 text-ayur-secondary" />
                            <span>{treatment.duration}</span>
                        </div>
                    )}
                </div>

                <Link to={`/treatments/${treatment._id}`} className="block w-full">
                    <button className="w-full bg-ayur-primary text-white py-3 rounded-lg font-medium hover:bg-ayur-primary/90 transition flex items-center justify-center group">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default TreatmentCard;
