import React, { useState } from 'react';

const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
  "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
  "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
  "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
  "night", "coffee", "winter", "dim", "nord", "sunset"
]; // Add more themes as needed

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const setTheme = (themeName) => {
    document.documentElement.setAttribute('data-theme', themeName);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="absolute top-0 right-0 m-4">
      <button onClick={toggleDropdown} className="btn btn-ghost">
        Change Theme
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
