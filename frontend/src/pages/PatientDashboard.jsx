import React from 'react';
import { useSelector } from 'react-redux';

const PatientDashboard = () => {
    const { userInfo } = useSelector((state) => state.auth);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar / Menu */}
            <div className="md:col-span-1 bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4 text-ayur-primary">Menu</h3>
                <ul className="space-y-2">
                    <li className="p-2 bg-ayur-bg rounded hover:bg-green-100 cursor-pointer text-ayur-primary">My Appointments</li>
                    <li className="p-2 hover:bg-gray-100 rounded cursor-pointer">Book Appointment</li>
                    <li className="p-2 hover:bg-gray-100 rounded cursor-pointer">Profile Settings</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <h2 className="text-2xl font-serif text-ayur-primary mb-2">Hello, {userInfo?.name}</h2>
                    <p className="text-gray-600">Welcome to your health dashboard. Manage your appointments and treatments here.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                        <h3 className="font-bold text-lg mb-2 text-ayur-primary">Upcoming Appointment</h3>
                        <p className="text-gray-600">No upcoming appointments scheduled.</p>
                        <button className="mt-4 bg-ayur-primary text-white px-4 py-2 rounded hover:bg-green-800 transition">Book Now</button>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                        <h3 className="font-bold text-lg mb-2 text-yellow-800">Health Tips</h3>
                        <p className="text-gray-600">Drink warm water in the morning to aid digestion.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
