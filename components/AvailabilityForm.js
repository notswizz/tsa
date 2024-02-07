import React, { useState } from 'react';

const AvailabilityForm = () => {
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
    availability: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // To manage form steps

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/getUsername?username=${username}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch user info');
      }
      setUserInfo({ ...userInfo, ...data });
      setStep(2); // Proceed to next step if successful
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit the userInfo state to your API or backend service
    console.log(userInfo);
    // Implement submission logic here
  };

 return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {step === 1 ? (
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
              <button type="button" onClick={handleUsernameSubmit} className="btn">Fetch User Info</button>
            </>
          )}
        </>
      ) : (
        <>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={userInfo.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={userInfo.phone}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="instagram">Instagram:</label>
          <input
            type="text"
            name="instagram"
            id="instagram"
            value={userInfo.instagram}
            onChange={handleChange}
          />
          <label htmlFor="size">Size:</label>
          <input
            type="text"
            name="size"
            id="size"
            value={userInfo.size}
            onChange={handleChange}
          />
          <label htmlFor="shoeSize">Shoe Size:</label>
          <input
            type="text"
            name="shoeSize"
            id="shoeSize"
            value={userInfo.shoeSize}
            onChange={handleChange}
          />
          <label htmlFor="college">College:</label>
          <input
            type="text"
            name="college"
            id="college"
            value={userInfo.college}
            onChange={handleChange}
          />
          <label htmlFor="salesExp">Sales Experience:</label>
          <input
            type="text"
            name="salesExp"
            id="salesExp"
            value={userInfo.salesExp}
            onChange={handleChange}
          />
          <label>
            <input
              type="checkbox"
              name="availability"
              checked={userInfo.availability}
              onChange={handleChange}
            />
            Are you available?
          </label>
          <button type="submit" className="btn">Submit Availability</button>
        </>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default AvailabilityForm;