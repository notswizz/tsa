import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { toReadableDate } from '../utils/date'; 

const AvailabilityForm = ({ isOpen, onClose }) => {
  const [availability, setAvailability] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedShowId, setSelectedShowId] = useState(""); // New state for tracking selected show's ObjectId
  const [dateRange, setDateRange] = useState([]);
  const [step, setStep] = useState(1);
const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchShows = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/getShows');
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error('Error fetching shows:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchShows();
  }, []);

  useEffect(() => {
    if (selectedShow) {
      console.log('Selected Show:', selectedShow); // Confirm selected show details are correct

      const startDate = new Date(selectedShow.setupStartDate);
      const endDate = new Date(selectedShow.showEndDate);
      const dates = [];
      for (let dt = new Date(startDate); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
        dates.push(new Date(dt).toISOString().split('T')[0]);
      }
      setDateRange(dates);
    } else {
      setDateRange([]);
    }
  }, [selectedShow]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name.startsWith('availability-')) {
      const date = name.split('availability-')[1];
      if (checked) {
        setAvailability(prev => [...prev, date]);
      } else {
        setAvailability(prev => prev.filter(d => d !== date));
      }
    } else if (name === "show") {
      // Reset availability when a new show is selected
      setAvailability([]);
      
      // Find the selected show based on the composite key (location-month)
      const selected = shows.find(show => `${show.location}-${show.month}` === value);
      console.log('Selected Show:', selected);
      setSelectedShow(selected);
      // Use the composite key as the unique identifier
      setSelectedShowId(value); // This is `${selected.location}-${selected.month}`
    } else if (name === "notes") {
      setNotes(value);
    }
  };
  
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const username = Cookies.get('username');
    if (!username) {
      setError('Username is not found in cookies. Please login again.');
      setIsLoading(false);
      return;
    }

    const dataToSubmit = {
      username,
      selectedShowId, // This is now a composite key like "ATL-February"
      availability,
      notes,
    };

    try {
      const response = await fetch('/api/addAvailability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      });
      if (!response.ok) throw new Error('Failed to submit availability');
      console.log('Availability submitted successfully');
      onClose();
    } catch (error) {
      console.error('Failed to submit availability:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box relative">
        <button onClick={onClose} className="btn btn-square btn-error absolute right-0 top-0 m-2">X</button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {step === 1 && (
            <>
              <div className="form-control">
                <label htmlFor="show" className="label">
                  <span className="label-text">Select a Show:</span>
                </label>
                <select
                  name="show"
                  id="show"
                  onChange={handleChange}
                  className="select select-bordered w-full max-w-xs"
                  required
                >
                  <option disabled selected>Choose a show</option>
                  {shows.map((show, index) => (
                    <option key={index} value={`${show.location}-${show.month}`}>
                      {`${show.location} - ${show.month}`}
                    </option>
                  ))}
                </select>
              </div>
              {dateRange.length > 0 && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Select Your Available Dates:</span>
                  </label>
                  {dateRange.map((dateStr, index) => {
                    const formattedDate = toReadableDate(new Date(new Date(dateStr).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
                    return (
                      <label key={index} className="label cursor-pointer flex justify-start gap-2">
                        <input
                          type="checkbox"
                          name={`availability-${dateStr}`}
                          onChange={handleChange}
                          className="checkbox checkbox-primary"
                          checked={availability.includes(dateStr)}
                        />
                        <span>{formattedDate}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </>
          )}
          {step === 2 && (
            <div className="form-control">
              <label htmlFor="notes" className="label">
                <span className="label-text">Notes:</span>
              </label>
              <textarea
                name="notes"
                id="notes"
                onChange={handleChange}
                className="textarea textarea-bordered w-full max-w-xs"
                value={notes}
              />
            </div>
          )}
       <div className="modal-action">
    {step === 1 ? (
      <button type="button" onClick={() => setStep(2)} className="btn w-full btn-primary" disabled={isLoading}>
        Next
      </button>
    ) : (
      <button type="button" onClick={handleSubmit} className="btn w-full btn-primary" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit Availability'}
      </button>
    )}
  </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AvailabilityForm;
