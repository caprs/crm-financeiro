import axios from 'axios';

const brasilApi = axios.create({
  baseURL: 'https://brasilapi.com.br/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default brasilApi;