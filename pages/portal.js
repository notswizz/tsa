import React, { useState } from 'react';
import Router from 'next/router';
import UserCard from '../components/UserCard';
import Cookies from 'js-cookie'; // Import js-cookie
import Wall from '../components/Wall';

const Portal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        Cookies.remove('username'); // Clear the username from the cookies
        Router.push('/'); // Redirect the user to the home page or login page after logging out
    };

    // Function to toggle modal visibility
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    // Simple modal component
    const Modal = ({ isOpen, onClose }) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
               <Wall/>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 h-screen">
            <UserCard />

            <div className="grid grid-cols-2 gap-4 mt-4">
                <button className="btn btn-primary">Contracts</button>
                <button className="btn btn-secondary">Availability</button>
                <button onClick={toggleModal} className="btn btn-info">Message</button>
                <button className="btn btn-accent">Info</button>
                <button className="btn btn-warning">Events</button>
                <button className="btn btn-success">Bookings</button>
            </div>

            {/* Modal for the Message button */}
            <Modal isOpen={isModalOpen} onClose={toggleModal} />

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
