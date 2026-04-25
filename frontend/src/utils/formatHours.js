export const formatTime = (time) => {
  const [hour, min] = time.split(":");
  const h = Number(hour);
  const ampm = h >= 12 ? "PM" : "AM";
  const formatted = h % 12 || 12;

  return `${formatted}:${min} ${ampm}`; // e.g., "2:30 PM"
};

export const formatWorkingHours = (hours) => {
  if (!hours) return "N/A";
  return `${formatTime(hours.start)} - ${formatTime(hours.end)}`;
};
