import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3002';

export const register = async (userData) => {
    try {
        const res = await axios.post(`${url}/api/auth/register`, userData);
        if (res.data.user && res.data.token) {
            localStorage.setItem('token', res.data.token);
            return res.data;
        } else {
            return null;
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
        throw new Error(`Cannot register: ${errorMessage}`);
    }
}

export const login = async (userData) => {
    try {
        const res = await axios.post(`${url}/api/auth/login`, userData);
        if (res.data.user && res.data.token) {
            localStorage.setItem('token', res.data.token);
            return res.data
        } else {
            return null;
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Login failed';
        throw new Error(`Cannot login: ${errorMessage}`);
    }
}