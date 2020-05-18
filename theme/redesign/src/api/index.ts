import axios from 'axios';

const baseUrl = 'https://titanium-wisdom.s3-eu-west-1.amazonaws.com';

const request = async () => {
  return await axios.get(`${baseUrl}/wisdoms.json`);
};

export const getWisdoms = async () => {
  const result = await request();
  return result.data;
};
