import React, { useState, useEffect } from 'react';

const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
  "retro", "cyberpunk", "valentine", "garden",
  "aqua", "lofi", "pastel", "fantasy", "wireframe", "dracula", "cmyk", "autumn", "acid", "lemonade",
  "coffee", "winter", "dim", "sunset"
];

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme') || 'cupcake';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const setTheme = (themeName) => {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('selectedTheme', themeName);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50 m-4 glass">
      <button onClick={toggleDropdown} className="btn btn-ghost">
        Theme
      </button>
      {isOpen && (
        <div className="dropdown-content mt-8 p-2 shadow-lg bg-base-100 rounded-box w-80 absolute right-0 glass" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.5rem', overflow: 'auto', maxHeight: '300px', zIndex: '50' }}>
          {themes.map((theme, index) => (
            <button
              key={index}
              className="p-2 hover:bg-base-200 cursor-pointer text-center rounded"
              onClick={() => setTheme(theme)}
              style={{ transition: 'background-color 0.2s ease-in-out' }}
            >
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
