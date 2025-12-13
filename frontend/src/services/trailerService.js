import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/trailers`;

const getToken = () => {
    const token = localStorage.getItem('token');
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

// GET /api/trailers/
const getAllTrailers = async () => {
    const response = await axios.get(API_URL, getToken());
    return response.data;
};

// GET /api/trailers/:id
const getTrailerById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, getToken());
    return response.data;
};

// POST /api/trailers/
const createTrailer = async (trailerData) => {
    const response = await axios.post(API_URL, trailerData, getToken());
    return response.data;
};

// PUT /api/trailers/:id
const updateTrailer = async (id, trailerData) => {
    const response = await axios.put(`${API_URL}/${id}`, trailerData, getToken());
    return response.data;
};

// DELETE /api/trailers/:id
const deleteTrailer = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, getToken());
    return response.data;
};

const trailerService = {
    getAllTrailers,
    getTrailerById,
    createTrailer,
    updateTrailer,
    deleteTrailer
};

export default trailerService;