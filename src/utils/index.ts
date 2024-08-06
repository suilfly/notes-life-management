export const getTimeArea = () => {
  const date = new Date();
  const hours = date.getHours();
  return hours <= 12 ? 'Morning' : hours >= 17 ? 'Night' : 'Afternoon';
};

export const generateRandomString = (length = 10) => {
  const rand =
    'cacnkdcd23ds9cxl01savbn2g4z3vxsafafsgrevfwrqdadhfadhjyhfyfhyloh';
  let res = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.ceil(Math.random() * length);
    res += rand.charAt(randomIndex);
  }

  return res;
};
