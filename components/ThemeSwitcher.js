import React, { useState, useEffect } from 'react';

const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
  "retro", "cyberpunk", "valentine", "garden",
  "aqua", "lofi", "pastel", "fantasy", "wireframe", "dracula", "cmyk", "autumn",  "acid", "lemonade",
 "coffee", "winter", "dim", "sunset"
]; // Add more themes as needed

export default function ThemeSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
  
    // Set 'cupcake' as the default theme when the component mounts
    useEffect(() => {
      document.documentElement.setAttribute('data-theme', 'cupcake');
    }, []);
  
    const toggleDropdown = () => setIsOpen(!isOpen);
  
    const setTheme = (themeName) => {
      document.documentElement.setAttribute('data-theme', themeName);
      localStorage.setItem('selectedTheme', themeName); // Optionally save to localStorage
      setIsOpen(false); // Close the dropdown after selection
    };

    return (
        <div className="absolute top-0 right-0 m-4">
          <button onClick={toggleDropdown} className="btn btn-ghost">
            Theme
          </button>
          {isOpen && (
            <div className="dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box" style={{ width: 'auto', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1rem' }}>
              {themes.map((theme, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-base-200 cursor-pointer text-center"
                  onClick={() => setTheme(theme)}
                >
                  {theme}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    