import axios from 'axios';

const baseUrl = 'https://raw.githubusercontent.com/AlexanderC/nakla.fun/master/stories';

const request = async () => {
  return await axios.get(`${baseUrl}/wisdoms.json`);
};

export const getWisdoms = async () => {
  const result = await request();
  return result.data;
};
