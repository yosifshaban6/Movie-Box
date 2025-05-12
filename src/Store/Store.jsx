import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';
import seriesReducer from './seriesSlice';

export const store = configureStore({
  reducer: {
    movieData : movieReducer,
    seriesData: seriesReducer,
    movie: movieReducer,
  },
})