export const formattedDate = (dateInput) => {
  const date = new Date(dateInput);

  if (isNaN(date)) {
    throw new Error("Invalid date");
  }

  const startTime = new Date(date);
  startTime.setUTCHours(0, 0, 0, 0);

  const endTime = new Date(date);
  endTime.setUTCHours(23, 59, 59, 999);

  return { startTime, endTime };
};
