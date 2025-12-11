import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice.js';

const appStore = configureStore({
    reducer: {
        auth: authReducer,
    }
})

export default appStore;