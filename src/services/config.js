import axios from "axios";
export const axiosMovies = axios.create({baseURL: import.meta.env.VITE_APP_API_BASE_URL})