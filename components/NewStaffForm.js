import React, { useState } from 'react';

export default function NewStaffForm({ isOpen, onClose }) {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        username: '',
        password: '', // Include password in the form data
        name: '',
        phone: '',
        email: '',
        instagram: '',
        size: '',
        shoeSize: '',
        college: '',
        salesExp: '',
        availability: []
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Log the form data to the console (for debugging purposes)
        console.log('Form data submitted:', formData);

        try {
            // Send the form data to the /api/addStaff endpoint using the Fetch API
            const response = await fetch('/api/addStaff', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Form submitted successfully!');
                setFormData({
                    username: '',
                    password: '',
                    name: '',
                    phone: '',
                    email: '',
                    instagram: '',
                    size: '',
                    shoeSize: '',
                    college: '',
                    salesExp: '',
                });
                onClose(); // Close the form
            } else {
                const error = await response.json();
                throw new Error(error.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Failed to submit form:', error);
            alert(`Failed to submit form: ${error.message}`);
        }
    };

    // Only render the modal content if isOpen is true
    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? "modal-open" : ""} p-4 overflow-auto`} style={{ maxHeight: '100vh' }}>
            <div className="modal-box relative max-h-full overflow-auto">
                <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={onClose}>✕</button>

{step === 0 && (
    <div className="space-y-4 p-4 bg-white shadow-md rounded-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800">Welcome to the New Staff Form</h2>
        <p className="text-gray-600">Please click "Begin" to start entering your information.</p>
        <button className="btn btn-primary" onClick={() => setStep(1)}>Begin</button>
    </div>
)}

                {step === 1 && (
                    <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
                        <div className="form-control">
                            <label htmlFor="username" className="label">
                                <span className="label-text">Username:</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="password" className="label">
                                <span className="label-text">Password:</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="input input-bordered"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">Next</button>
                    </form>
                )}

            {step === 2 && (
                <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-4">
                    <div className="form-control">
                        <label htmlFor="name" className="label">
                            <span className="label-text">Name:</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="input input-bordered"
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="phone" className="label">
                            <span className="label-text">Phone:</span>
                        </label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="input input-bordered"
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="email" className="label">
                            <span className="label-text">Email:</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="input input-bordered"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">Next</button>
                </form>
            )}

            {step === 3 && (
                <form onSubmit={(e) => { e.preventDefault(); setStep(4); }} className="space-y-4">
                    <div className="form-control">
                        <label htmlFor="instagram" className="label">
                            <span className="label-text">Instagram:</span>
                        </label>
                        <input
                            type="text"
                            name="instagram"
                            id="instagram"
                            value={formData.instagram}
                            onChange={handleChange}
                            className="input input-bordered"
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="size" className="label">
                            <span className="label-text">Size (0-14):</span>
                        </label>
                        <input
                            type="number"
                            name="size"
                            id="size"
                            value={formData.size}
                            onChange={handleChange}
                            min="0"
                            max="14"
                            required
                            className="input input-bordered"
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="shoeSize" className="label">
                            <span className="label-text">Shoe Size (0-10):</span>
                        </label>
                        <input
                            type="number"
                            name="shoeSize"
                            id="shoeSize"
                            value={formData.shoeSize}
                            onChange={handleChange}
                            min="0"
                            max="10"
                            required
                            className="input input-bordered"
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="college" className="label">
                            <span className="label-text">College:</span>
                        </label>
                        <input
                            type="text"
                            name="college"
                            id="college"
                            value={formData.college}
                            onChange={handleChange}
                            className="input input-bordered"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">Next</button>
                </form>
            )}

            {step === 4 && (
                <form onSubmit={(e) => { e.preventDefault(); /* Submit form data here */ }} className="space-y-4">
                    <div className="form-control">
                        <label htmlFor="salesExp" className="label">
                            <span className="label-text">Sales Experience:</span>
                        </label>
                        <textarea
                            name="salesExp"
                            id="salesExp"
                            value={formData.salesExp}
                            onChange={handleChange}
                            rows="4"
                            className="textarea textarea-bordered"
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary w-full" onClick={handleSubmit}>Submit</button>
                </form>
            )}
        </div>
    </div>
);
}