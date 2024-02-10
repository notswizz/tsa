import Head from 'next/head';
import ThemeSwitcher from '../components/ThemeSwitcher';
import Login from '../components/Login';
import NewStaffForm from '../components/NewStaffForm';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isNewStaffFormOpen, setIsNewStaffFormOpen] = useState(false);

  const toggleLoginModal = () => setIsLoginOpen(!isLoginOpen);
  const toggleNewStaffFormModal = () => setIsNewStaffFormOpen(!isNewStaffFormOpen);
  const [showTitle, setShowTitle] = useState('');


  // Example static start date definition
  const [startDate, setStartDate] = useState('');

// Inside HomePage useEffect hook
useEffect(() => {
  const fetchShows = async () => {
    const response = await fetch('/api/getShows');
    const shows = await response.json();
    if (shows.length > 0) {
      const nextShow = shows[0]; // Assuming the next show is the first one in the array
      setStartDate(nextShow.startDate);
      setShowTitle(nextShow.title); // Ensure you have useState for showTitle
    }
  };

  fetchShows();
}, []);


return (
  <>
    {/* ThemeSwitcher positioned fixed at the very top left of the page */}
    <div className="fixed top-0 left-0 z-50">
      <ThemeSwitcher />
    </div>

    <div className="bg-base-200">
      <Head>
        <title>The Smith Agency</title>
      </Head>
      
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="hero bg-base-100 rounded-lg shadow-xl overflow-hidden transform transition-all hover:scale-105 duration-500 w-full relative z-10 mb-8">
          {/* Login button styled as an overlay on the top right of the hero section */}
          <div className="absolute top-4 right-4 z-20">
            <button onClick={toggleLoginModal} className="btn btn-primary">Login</button>
          </div>
          <div className="hero-content flex-col lg:flex-row-reverse gap-8">
            <img src="/tsablack.png" alt="TSA Logo" className="rounded-full border-4 border-secondary w-32 h-32 lg:w-48 lg:h-48" />
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold">The Smith Agency</h1>
              <p className="py-6 text-lg">Premiere Boutique Staffing</p>
              {/* Apply to TSA button remains centered */}
              <div className="flex gap-4 mt-6 justify-center">
                <button onClick={toggleNewStaffFormModal} className="btn btn-secondary shadow-lg transform transition hover:scale-105 duration-300">Apply to TSA</button>
              </div>
            </div>
          </div>
        </div>

       
        {/* Render the Login and NewStaffForm components when their state is true */}
        {isLoginOpen && <Login isOpen={isLoginOpen} onClose={toggleLoginModal} />}
        {isNewStaffFormOpen && <NewStaffForm isOpen={isNewStaffFormOpen} onClose={toggleNewStaffFormModal} />}
      </main>
    </div>
  </>
);

}
