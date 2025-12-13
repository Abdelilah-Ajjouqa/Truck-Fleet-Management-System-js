import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice.js';
import truckReducer from '../features/truckSlice.js';
import trailerReducer from '../features/trailerSlice.js';

const appStore = configureStore({
    reducer: {
        auth: authReducer,
        trucks: truckReducer,
        trailer: trailerReducer,
    }
})

export default appStore;