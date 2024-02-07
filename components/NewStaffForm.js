import React, { useState } from 'react';

export default function NewStaffForm({ isOpen, onClose }) {
  const [step, setStep] = useState(0); // Initial step for the information page
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    phone: '',
    email: '',
    instagram: '',
    size: '',
    shoeSize: '',
    college: '',
    salesExp: '',
    availability: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Log the form data to the console (for debugging purposes)
    console.log('Form data submitted:', formData);
  
    try {
      // Send the form data to the /api/submit endpoint using the Fetch API
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Check if the request was successful
      if (response.ok) {
        // Handle success - for example, you can clear the form or display a success message
        alert('Form submitted successfully!');
        // Reset the form data state if needed
        setFormData({
          name: '',
          phone: '',
          email: '',
          instagram: '',
          size: '',
          shoeSize: '',
          college: '',
          salesExp: '',
        });
      } else {
        // Handle errors if the server response was not ok
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
      }
    } catch (error) {
      // Log or display the error if the request failed
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
          <div className="space-y-4 p-4">
            <h2 className="text-lg font-semibold">TSA Staff Application</h2>
            <p>Please provide a username for your TSA account and some additional info. If we feel there may be a fit, we will be in contact shortly!</p>
            <button className="btn btn-primary" onClick={() => setStep(1)}>Get Started</button>
          </div>
        )}

{step === 1 && (
  <form onSubmit={(e) => { e.preventDefault(); setUsername(formData.username); }} className="space-y-4">
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
    <button type="submit" className="btn btn-primary w-full">Start Application</button>
  </form>
)}


        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields here */}
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
          
          <button type="submit" className="btn btn-primary w-full">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}