// axiosInstance.js
import axios from "axios";

// Créez une instance avec les configurations par défaut
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Activer l'envoi des cookies avec chaque requête
});

export default axiosInstance;
