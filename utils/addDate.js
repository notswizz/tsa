// utils/addDate.js (or wherever adjustDateToLocalStartOfDay is located)

export const adjustDateToLocalStartOfDay = (isoDateString) => {
    // Parse the ISO date string to get year, month, and day
    const [year, month, day] = isoDateString.split('-').map(num => parseInt(num, 10));
  
    // Create a Date object using local time zone
    const adjustedDate = new Date(year, month - 1, day);
  
    // Return the ISO string without changing the time zone
    return adjustedDate.toISOString().split('T')[0];
  };
  