import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bannerData: [],
  favorites: [],
  watching: [],
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
    RemoveFromFavorites: (state, action) => {
      const movieId = action.payload;
      state.favorites = state.favorites.filter((id) => id !== movieId);
    },
  },
});

export const {
  SetBannerData,
  ToggleFavorite,
  ToggleWatching,
  RemoveFromFavorites,
} = movieSlice.actions;

export default movieSlice.reducer;
