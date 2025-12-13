import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/trucks`;

const getToken = () => {
    const token = localStorage.getItem('token');
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

// GET /api/trucks/
const getAllTrucks = async () => {
    const response = await axios.get(API_URL, getToken());
    return response.data;
};

// GET /api/trucks/:id
const getTruckById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, getToken());
    return response.data;
};

// POST /api/trucks/
const createTruck = async (truckData) => {
    const response = await axios.post(API_URL, truckData, getToken());
    return response.data;
};

// PUT /api/trucks/:id
const updateTruck = async (id, truckData) => {
    const response = await axios.put(`${API_URL}/${id}`, truckData, getToken());
    return response.data;
};

// DELETE /api/trucks/:id
const deleteTruck = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, getToken());
    return response.data;
};

const truckService = {
    getAllTrucks,
    getTruckById,
    createTruck,
    updateTruck,
    deleteTruck
};

export default truckService;