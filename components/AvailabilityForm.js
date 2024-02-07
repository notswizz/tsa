import React, { useState } from 'react';

const AvailabilityForm = () => {
  const [username, setUsername] = useState('');
  const [userInfo, setUserInfo] = useState({ phone: '', isAvailable: false });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // Added for error feedback

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Reset any previous error
    try {
      const response = await fetch(`/api/getUsername?username=${username}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch');
      }
      setUserInfo({ ...userInfo, ...data });
      setStep(2); // Proceed to the next step if successful
    } catch (error) {
      console.error(error);
      setError(error.message); // Display the error message from the API
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit the userInfo state to your API or backend service
    console.log(userInfo);
    // Implement submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {userInfo.phone ? (
        <>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={userInfo.phone}
            onChange={handleChange}
            required
          />
          <label>
            <input
              type="checkbox"
              name="isAvailable"
              checked={userInfo.isAvailable}
              onChange={handleChange}
            />
            Are you available?
          </label>
          <button type="submit" className="btn">Submit Availability</button>
        </>
      ) : (
        <>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <button onClick={handleUsernameSubmit} className="btn">Fetch User Info</button>
            </>
          )}
        </>
      )}
    {error && <p className="text-red-500">{error}</p>} {/* Display error message if present */}
    </form>
  );
};

export default AvailabilityForm;