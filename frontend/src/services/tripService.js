import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/trips/`;

const getToken = () => {
    const token = localStorage.getItem('token');
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

const createTrip = async (tripData) => {
    const response = await axios.post(API_URL, tripData, getToken());
    return response.data;
};

const updateTripStatus = async (id, statusData) => {
    const response = await axios.patch(API_URL + id + '/status', statusData, getToken());
    return response.data;
};

const getTrips = async () => {
    const response = await axios.get(API_URL, getToken());
    return response.data;
};

const deleteTrip = async (id) => {
    const response = await axios.delete(API_URL + id, getToken());
    return response.data;
};

const tripService = {
    createTrip,
    getTrips,
    deleteTrip,
    updateTripStatus
};

export default tripService;