export const getTimeArea = () => {
  const date = new Date();
  const hours = date.getHours();
  return hours <= 12 ? 'Morning' : hours >= 17 ? 'Night' : 'Afternoon';
};
