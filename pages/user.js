import React, { useState } from 'react';
import Router from 'next/router';
import UserCard from '../components/UserCard';
import Cookies from 'js-cookie';
import AvailabilityForm from '../components/AvailabilityForm'; // Import the AvailabilityForm component

const Portal = () => {
    const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);

    const handleLogout = () => {
        Cookies.remove('username');
        Router.push('/');
    };

    // Function to toggle availability modal visibility
    const toggleAvailabilityModal = () => setIsAvailabilityModalOpen(!isAvailabilityModalOpen);

    return (
        <div className="flex flex-col items-center justify-center p-4 h-screen">
            <UserCard />

            <div className="grid grid-cols-2 gap-4 mt-4">
                <button className="btn btn-primary">Contracts</button>
                <button onClick={toggleAvailabilityModal} className="btn btn-secondary">Availability</button>
                <button className="btn btn-info">Message</button>
                <button className="btn btn-accent">Info</button>
                <button className="btn btn-warning">Events</button>
                <button className="btn btn-success">Bookings</button>
            </div>

              {/* AvailabilityForm modal */}
              {isAvailabilityModalOpen && (
                <AvailabilityForm isOpen={isAvailabilityModalOpen} onClose={toggleAvailabilityModal} />
            )}

            {/* Position the Log Out button at the bottom of the page */}
            <div className="mt-auto">
                <button onClick={handleLogout} className="btn text-red-500 bg-transparent hover:bg-blue-100 mt-4">
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Portal;