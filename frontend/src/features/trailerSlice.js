import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import trailerService from '../services/trailerService';

const initialState = {
    trailers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// Get All
export const getTrailers = createAsyncThunk('trailers/getAll', async (_, thunkAPI) => {
    try {
        return await trailerService.getAllTrailers();
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Create
export const createTrailer = createAsyncThunk('trailers/create', async (data, thunkAPI) => {
    try {
        return await trailerService.createTrailer(data);
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Update
export const updateTrailer = createAsyncThunk('trailers/update', async ({ id, data }, thunkAPI) => {
    try {
        return await trailerService.updateTrailer(id, data);
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete
export const deleteTrailer = createAsyncThunk('trailers/delete', async (id, thunkAPI) => {
    try {
        await trailerService.deleteTrailer(id);
        return id;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
    }
});

export const trailerSlice = createSlice({
    name: 'trailer',
    initialState,
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
            .addCase(getTrailers.pending, (state) => { state.isLoading = true; })
            .addCase(getTrailers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trailers = action.payload;
            })
            .addCase(getTrailers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createTrailer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trailers.push(action.payload);
            })
            .addCase(updateTrailer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trailers = state.trailers.map(trailer =>
                    trailer._id === action.payload._id ? action.payload : trailer
                );
            })
            .addCase(deleteTrailer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.trailers = state.trailers.filter((t) => t._id !== action.payload);
            });
    }
});

export const { resetAll } = trailerSlice.actions;
export default trailerSlice.reducer;