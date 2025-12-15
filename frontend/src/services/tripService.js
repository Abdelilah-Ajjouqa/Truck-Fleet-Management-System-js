import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/trips/`;

const getToken = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// Create new trip
const createTrip = async (tripData) => {
    const response = await axios.post(API_URL, tripData, getToken());
    return response.data;
};

// Get all trips (Admin) or My Trips (Driver)
const getTrips = async () => {
    const response = await axios.get(API_URL, getToken());
    return response.data;
};

// Delete trip
const deleteTrip = async (id) => {
    const response = await axios.delete(API_URL + id, getToken());
    return response.data;
};

// Update trip status
const updateTripStatus = async (id, status) => {
    const response = await axios.patch(API_URL + id + '/status', { status }, getToken());
    return response.data;
};

const tripService = {
    createTrip,
    getTrips,
    deleteTrip,
    updateTripStatus
};

export default tripService;