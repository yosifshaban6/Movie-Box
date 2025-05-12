import axios from "axios";
export const axiosMovies= axios.create({baseURL: import.meta.env.VITE_APP_API_MOVIES_URL})
export const axiosSeries = axios.create({baseURL: import.meta.env.VITE_APP_API_SERIES_URL})
export const apiKey = import.meta.env.VITE_APP_API_KEY;
export const axiosInstance = axios.create({baseURL: import.meta.env.VITE_APP_API_MOVIES_URL})
