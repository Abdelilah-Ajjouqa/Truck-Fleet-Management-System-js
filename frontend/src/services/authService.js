import axios from "axios";

const url = import.meta.env.BACKEND_URL;

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
        console.error(error);
        throw new Error('cannot register() ', error.message);
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
        console.error(error);
        throw new Error('cannot login() ', error.message);
    }
}