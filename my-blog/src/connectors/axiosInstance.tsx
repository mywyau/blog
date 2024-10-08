// connectors/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
    // Optionally add interceptors here for error handling, authentication, etc.
});

export default axiosInstance;
