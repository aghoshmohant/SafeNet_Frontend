import axios from 'axios';

const instance = axios.create({
<<<<<<< HEAD
  baseURL: 'http:// 192.168.20.:5000/api', // Adjust according to your server address
=======

  baseURL: 'http://192.168.169.34:5000/api', // Adjust according to your server address
>>>>>>> 6d09878541ca788fb43707e8d6c2780a03acf4f3
  timeout: 10000,
});

export default instance;
