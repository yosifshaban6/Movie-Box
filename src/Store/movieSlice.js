import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bannerData: [],
  favorites: [],
  watching: [],
  watched: [],  
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    SetBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
    ToggleFavorite: (state, action) => {
      const movieId = action.payload;
      if (state.favorites.includes(movieId)) {
        state.favorites = state.favorites.filter((id) => id !== movieId);
      } else {
        state.favorites.push(movieId);
      }
    },
    ToggleWatching: (state, action) => {
      const movieId = action.payload;
      if (state.watching.includes(movieId)) {
        state.watching = state.watching.filter((id) => id !== movieId);
      } else {
        state.watching.push(movieId);
      }
    },
    ToggleWatched: (state, action) => {  
      const movieId = action.payload;
      if (state.watched.includes(movieId)) {
        state.watched = state.watched.filter((id) => id !== movieId);
      } else {
        state.watched.push(movieId);
      }
    },
    RemoveFromFavorites: (state, action) => {  
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    RemoveFromWatching: (state, action) => {  
      state.watching = state.watching.filter(id => id !== action.payload);
    },
    RemoveFromWatched: (state, action) => {  
      state.watched = state.watched.filter(id => id !== action.payload);
    },
  },
});

export const {
  SetBannerData,
  ToggleFavorite,
  ToggleWatching,
  ToggleWatched,
  RemoveFromFavorites,
  RemoveFromWatching,
  RemoveFromWatched,
} = movieSlice.actions;

export default movieSlice.reducer;
