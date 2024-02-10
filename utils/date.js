// utils/date.js

export const adjustDateToLocalStartOfDay = (isoDateString) => {
    const [year, month, day] = isoDateString.split('-').map(num => parseInt(num, 10));
    const adjustedDate = new Date(year, month - 1, day);
    return adjustedDate.toISOString().split('T')[0];
  };
  
  export const toReadableDate = (isoDateString) => {
    // Now it's safe to call adjustDateToLocalStartOfDay since it's defined above
    const adjustedIsoDateString = adjustDateToLocalStartOfDay(isoDateString);
    const date = new Date(adjustedIsoDateString);
    
    return date.toLocaleDateString("en-US", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  