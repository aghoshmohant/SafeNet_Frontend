import axios from 'axios';

const instance = axios.create({
  baseURL: 'http:// 192.168.20.:5000/api', // Adjust according to your server address
  timeout: 10000,
});

export default instance;
