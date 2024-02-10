import React, { useState } from 'react';
import Router from 'next/router';


const Login = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Implement login logic here, potentially calling your API
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            // Forward user to portal page upon successful login
            Router.push('/user');
        } else {
            // Handle login failure (e.g., show error message)
            alert('Failed to log in');
        }
    };

    const handleClose = () => { // Add this function
        setIsOpen(false);
    };

    if (!isOpen) { // Add this condition
        return null;
    }

  

    return (
        <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-box relative">
                <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
                <h2 className="text-2xl">Login</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="label">
                            <span className="label-text">Username:</span>
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input input-bordered"
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Password:</span>
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary w-full">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;