import axios from 'axios';

//backup https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/burgers

export const fetchBurgers = async () => {
  const response = await axios.get('https://68103cb727f2fdac2410a610.mockapi.io/api/elective2/burgers');
  return response.data;
};
