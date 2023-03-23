import axios from 'axios';

const API_URL = 'https://images-api.nasa.gov';
export const dataAPI = axios.create({ baseURL: API_URL });
