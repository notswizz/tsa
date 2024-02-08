import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie
import Router from 'next/router'; // Import Next.js router

function UserCard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Read the username from the cookie
    const cookieUsername = Cookies.get('username');
    if (cookieUsername) {
      console.log("Logged in as:", cookieUsername); // Print the username to console
      fetchUserData(cookieUsername);
    } else {
      // Redirect to index.html (or home page in Next.js) if not logged in
   
    }
  }, []);

  async function fetchUserData(username) {
    try {
      const response = await fetch(`/api/getUser?username=${username}`);
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        console.error('Failed to fetch user data', response.statusText);
      }
    } catch (error) {
      console.error('Fetch user data error:', error);
    }
  }
  

  if (!user) return <div>Loading...</div>;

return (
    <div className="flex justify-center p-4">
        <div className="card card-side bg-base-100 shadow-xl max-w-xl mx-auto glass">
            <figure className="pl-5 pt-5">
                <img src={"/tsablack.png"} alt="User" className="rounded-full w-24 h-24" />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-2xl">
                    <a href={`https://www.instagram.com/${user.instagram}`} target="_blank" rel="noopener noreferrer">
                        {user.name || 'New User'}
                    </a>
                </h2>
                <ul className="list-none space-y-2">
                    <li><strong></strong> {user.email}</li>
                    <li><strong></strong> {user.phone}</li>
            
                </ul>
              
            </div>
        </div>
    </div>
);
  
}

export default UserCard;
