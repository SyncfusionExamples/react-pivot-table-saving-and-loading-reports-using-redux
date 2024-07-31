import { configureStore } from '@reduxjs/toolkit';
import reportReducer from './reportSlice'; // Ensure this is the correct path to your reducer

const store = configureStore({
    reducer: {
        reports: reportReducer,
    },
});

export default store;
