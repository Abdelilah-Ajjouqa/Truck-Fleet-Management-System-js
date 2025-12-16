import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import truckService from '../services/truckService';

export const getTrucks = createAsyncThunk('trucks/getAll', async (_, thunkAPI) => {
    try {
        return await truckService.getAllTrucks();
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const createTruck = createAsyncThunk('trucks/create', async (truckData, thunkAPI) => {
    try {
        return await truckService.createTruck(truckData);
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateTruck = createAsyncThunk('trucks/update', async ({ id, data }, thunkAPI) => {
    try {
        return await truckService.updateTruck(id, data);
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteTruck = createAsyncThunk('trucks/delete', async (id, thunkAPI) => {
    try {
        await truckService.deleteTruck(id);
        return id;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const truckSlice = createSlice({
    name: 'truck',
    initialState: {
        trucks: [],
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: ''
    },
    reducers: {
        resetAll: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            // --- Get Trucks ---
            .addCase(getTrucks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTrucks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trucks = action.payload;
            })
            .addCase(getTrucks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // --- Create Truck ---
            .addCase(createTruck.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trucks.push(action.payload);
            })
            .addCase(createTruck.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // --- Update Truck ---
            .addCase(updateTruck.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trucks = state.trucks.map(truck =>
                    truck._id === action.payload._id ? action.payload : truck
                );
            })

            // --- Delete Truck ---
            .addCase(deleteTruck.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trucks = state.trucks.filter((truck) => truck._id !== action.payload);
            });
    }
});

export const { resetAll } = truckSlice.actions;
export default truckSlice.reducer;