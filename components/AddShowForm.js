import { useState } from 'react';

export default function AddShowForm({ isOpen, setIsOpen }) {
  const [show, setShow] = useState({
    location: '',
    month: '',
    type: '',
    setupStartDate: '',
    setupEndDate: '',
    showStartDate: '',
    showEndDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShow({
      ...show,
      [name]: value
    });
  };

 // Inside your AddShowForm component

// Inside AddShowForm component

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/addShow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(show),
      });
  
      const data = await response.json();
      
      if (response.ok) {
        console.log(data.message); // Display success message
        // Optionally reset form or navigate user
        setShow({
          location: '',
          month: '',
          type: '',
          startDate: '',
          endDate: ''
        });
      } else {
        console.error('Form submission error:', data.error);
      }
    } catch (error) {
      console.error('Failed to submit the form:', error);
    }
  };
  
  

  const closeModal = () => setIsOpen(false);

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box relative">
        {/* Close button at the top-right corner */}
        <button
          onClick={closeModal}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit} className="space-y-4" id="yourFormId">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <select name="location" value={show.location} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
              <option value="ATL">ATL</option>
              <option value="NYC">NYC</option>
              <option value="LA">LA</option>
              <option value="DAL">DAL</option>
              <option value="NASH">NASH</option>
            </select>
          </div>
          <div>
            <label htmlFor="month" className="block text-sm font-medium text-gray-700">Month</label>
            <select name="month" value={show.month} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
            <select name="type" value={show.type} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
              <option value="Gift">Gift</option>
              <option value="Apparel">Apparel</option>
              <option value="Bridal">Bridal</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="setupStartDate" className="block text-sm font-medium text-gray-700">Setup Start Date</label>
            <input type="date" name="setupStartDate" value={show.setupStartDate} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label htmlFor="setupEndDate" className="block text-sm font-medium text-gray-700">Setup End Date</label>
            <input type="date" name="setupEndDate" value={show.setupEndDate} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label htmlFor="showStartDate" className="block text-sm font-medium text-gray-700">Show Start Date</label>
            <input type="date" name="showStartDate" value={show.showStartDate} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div>
            <label htmlFor="showEndDate" className="block text-sm font-medium text-gray-700">Show End Date</label>
            <input type="date" name="showEndDate" value={show.showEndDate} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
        </form>

        <div className="modal-action">
          <button type="submit" form="yourFormId" className="btn w-full btn-primary">Add Show</button>
        </div>
      </div>
    </div>
  );
}