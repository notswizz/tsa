import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie

const AvailabilityForm = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [userInfo, setUserInfo] = useState({
    phone: '',
    name: '',
    email: '',
    instagram: '',
    size: '',
    shoeSize: '',
    college: '',
    salesExp: '',
    availability: [], // Now correctly initialized as an array
    workPreferences: {
      setup: false,
      fullShow: false,
      partialShow: false,
    },
    unavailableDays: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [dateRange, setDateRange] = useState([]);

  useEffect(() => {
    // Fetch user information based on the username from the cookie
    const fetchUserInfo = async () => {
      const username = Cookies.get('username'); // Get username from cookie
      if (!username) {
        console.error('No username found in cookie.');
        return;
      }
      
      setUsername(username); // Set username state

      setIsLoading(true);
      try {
        const response = await fetch(`/api/getUserInfo?username=${username}`);
        if (!response.ok) throw new Error('Failed to fetch user info');
        const data = await response.json();
        setUserInfo({ ...userInfo, ...data });
      } catch (error) {
        console.error('Error fetching user info:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);
  

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch('/api/getShows');
        const data = await response.json();
        if (!response.ok) throw new Error('Failed to fetch shows');
        setShows(data);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };
    fetchShows();
  }, []);

  useEffect(() => {
    if (selectedShow) {
      const startDate = new Date(selectedShow.startDate);
      const endDate = new Date(selectedShow.endDate);
      const dates = [];
      for (let dt = new Date(startDate); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
        dates.push(new Date(dt).toISOString().split('T')[0]);
      }
      setDateRange(dates);
    }
  }, [selectedShow]);

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`/api/getUsername?username=${username}`);
      if (!response.ok) throw new Error('Failed to fetch user info');
      const data = await response.json();
      setUserInfo({ ...userInfo, ...data });
      setStep(2);
    } catch (error) {
      console.error('Error fetching user info:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "show") {
      const selected = shows.find(show => show._id === value);
      setSelectedShow(selected);
    } else if (name in userInfo.workPreferences) {
      // This part now needs reevaluation for the array structure
    } else {
      setUserInfo(prevState => ({ ...prevState, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  // This function needs to be adapted to handle changes in array structure for availability
  const handleAvailabilityChange = (showId, workPreference, value) => {
    // Logic to update availability array goes here
  };

  const handleWorkPreferenceChange = (e) => {
    const { name, checked } = e.target;
    if (!selectedShow) return;
    // Adjusted logic to handle work preference change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
      });
      if (!response.ok) throw new Error('Failed to submit form');
      const result = await response.json();
      console.log('Form submitted successfully:', result);
      onClose();
    } catch (error) {
      console.error('Failed to submit form:', error);
      setError(error.message);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box relative">
        <button onClick={onClose} className="btn btn-square btn-error absolute right-0 top-0 m-2">X</button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
  {step === 1 ? (
    isLoading ? (
      <p className="text-center">Loading...</p>
    ) : (
      <>
        <div className="form-control">
          <label htmlFor="username" className="label">
            <span className="label-text">Username:</span>
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered input-primary w-full max-w-xs"
            required
          />
        </div>
        <div className="modal-action">
          <button type="button" onClick={handleUsernameSubmit} className="btn w-full btn-primary">Login</button>
        </div>
      </>
    )
  ) : (
    <>
      <div className="form-control">
        <label htmlFor="name" className="label text-lg font-bold">
      
        </label>
        <span className="badge badge-outline text-lg p-2">{userInfo.name}</span>
      </div>
     
      <div className="form-control">
        <label htmlFor="show" className="label">
          <span className="label-text">Select a Show:</span>
        </label>
        <select
          name="show"
          id="show"
          onChange={(e) => {
            handleChange(e);
            // Assuming additional logic to update state based on the selected show
          }}
          className="select select-bordered w-full max-w-xs"
          required
        >
          <option disabled selected>Choose a show</option>
          {shows.map((show) => (
            <option key={show._id} value={show._id}>
              {`${show.location} - ${show.month}`}
            </option>
          ))}
        </select>
      </div>
      {/* Dynamically generated checkboxes for availability */}
      {dateRange.length > 0 && (
        <>
          <p className="text-sm font-semibold">Select Available Dates:</p>
          {dateRange.map((date, index) => (
            <div key={index} className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text mr-2">{date}</span>
                <input
                  type="checkbox"
                  name={`availability-${date}`}
                  onChange={handleChange}
                  className="toggle toggle-primary"
                />
              </label>
            </div>
          ))}
        </>
      )}
      {/* Work Preferences Toggles */}
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Work Setup</span>
          <input
            type="checkbox"
            name="setup"
            checked={userInfo.workPreferences.setup}
            onChange={handleChange}
            className="toggle toggle-primary"
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Work Full Show</span>
          <input
            type="checkbox"
            name="fullShow"
            checked={userInfo.workPreferences.fullShow}
            onChange={handleChange}
            className="toggle toggle-primary"
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Work Partial Show</span>
          <input
            type="checkbox"
            name="partialShow"
            checked={userInfo.workPreferences.partialShow}
            onChange={handleChange}
            className="toggle toggle-primary"
          />
        </label>
        {userInfo.workPreferences.partialShow && (
          <input
            type="text"
            name="unavailableDays"
            value={userInfo.unavailableDays}
            onChange={handleChange}
            placeholder="Days you can't work"
            className="input input-bordered mt-2"
          />
        )}
      </div>
      <div className="modal-action">
        <button type="submit" className="btn w-full btn-primary">Submit Availability</button>
      </div>
    </>
  )}
</form>

      </div>
    </div>
  );
};

export default AvailabilityForm;