import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from '../services/authService.js';

export const register = createAsyncThunk(
    'auth/register',
    async (userData, thunkAPI) => {
        try {
            return await authService.register(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
        try {
            return await authService.login(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: user ? user : null,
        token: token ? token : null,
        loading: false,
        error: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        logout: (state) => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            //register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.token = action.payload.token;
                localStorage.setItem('user', JSON.stringify(action.payload));
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;