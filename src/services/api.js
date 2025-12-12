import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // URL Backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// TAMBAHKAN INTERCEPTOR INI
// Fungsinya: Setiap kali request dikirim, cek apakah ada token di localStorage.
// Jika ada, masukkan ke header 'x-auth-token'.
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;