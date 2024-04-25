import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const apiService = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "ngrok-skip-browser-warning": "1234", // Adiciona o cabeçalho desejado aqui
  },
});

export default apiService;
