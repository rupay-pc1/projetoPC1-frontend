import axios from 'axios';

// const baseURL = 'http://localhost:8081/';
const baseURL = 'https://d0ad-2804-29b8-505d-d6bd-66d3-7d80-d5df-f98f.ngrok-free.app/';


const apiService = axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'ngrok-skip-browser-warning': "1234" // Adiciona o cabeçalho desejado aqui
  }
});

export default apiService;