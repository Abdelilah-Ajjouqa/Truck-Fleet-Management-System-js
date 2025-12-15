import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tripService from '../services/tripService';

const initialState = {
    trips: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
};

export const createTrip = createAsyncThunk('trips/create', async (data, thunkAPI) => {
    try {
        return await tripService.createTrip(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const getTrips = createAsyncThunk('trips/getAll', async (_, thunkAPI) => {
    try {
        return await tripService.getTrips();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const deleteTrip = createAsyncThunk('trips/delete', async (id, thunkAPI) => {
    try {
        await tripService.deleteTrip(id);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
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
            .addCase(getTrips.pending, (state) => { state.isLoading = true; })
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
            .addCase(createTrip.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trips.push(action.payload);
            })
            .addCase(deleteTrip.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trips = state.trips.filter((t) => t._id !== action.payload);
            });
    }
});

export const { reset } = tripSlice.actions;
export default tripSlice.reducer;