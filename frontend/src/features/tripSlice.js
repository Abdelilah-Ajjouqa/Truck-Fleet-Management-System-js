import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tripService from '../services/tripService';

const initialState = {
    trips: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
};

// Create Trip
export const createTrip = createAsyncThunk('trips/create', async (tripData, thunkAPI) => {
    try {
        return await tripService.createTrip(tripData);
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Get Trips
export const getTrips = createAsyncThunk('trips/getAll', async (_, thunkAPI) => {
    try {
        return await tripService.getTrips();
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete Trip
export const deleteTrip = createAsyncThunk('trips/delete', async (id, thunkAPI) => {
    try {
        await tripService.deleteTrip(id);
        return id;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const tripSlice = createSlice({
    name: 'trips',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            // Get Trips
            .addCase(getTrips.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTrips.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trips = action.payload;
            })
            .addCase(getTrips.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            
            // Create Trip
            .addCase(createTrip.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trips.push(action.payload);
            })
            
            // Delete Trip
            .addCase(deleteTrip.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trips = state.trips.filter((trip) => trip._id !== action.payload);
            });
    }
});

export const { reset } = tripSlice.actions;
export default tripSlice.reducer;