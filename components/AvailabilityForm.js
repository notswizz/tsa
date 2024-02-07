import React, { useState } from 'react';

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
    <div className={`modal modal-open`}>
      <div className="modal-box relative">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {step === 1 ? (
            <>
              {isLoading ? (
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
              )}
            </>
          ) : (
            <>
             
              <div className="form-control">
                <label htmlFor="name" className="label">
                  <span className="label-text">Name:</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={userInfo.name}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                  required
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
                  value={userInfo.phone}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                  required
                />
              </div>
              {/* ... repeat for each input field */}
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-2">Are you available?</span>
                  <input
                    type="checkbox"
                    name="availability"
                    checked={userInfo.availability}
                    onChange={handleChange}
                    className="toggle toggle-primary"
                  />
                </label>
              </div>
              <div className="modal-action">
                <button type="submit" className="btn w-full btn-primary">Submit Availability</button>
              </div>
            </>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
  
};

export default AvailabilityForm;