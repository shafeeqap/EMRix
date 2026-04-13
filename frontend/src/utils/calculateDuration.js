export const getDuration = (workinghours) => {
  const toMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  return toMinutes(workinghours.end) - toMinutes(workinghours.start);
};
