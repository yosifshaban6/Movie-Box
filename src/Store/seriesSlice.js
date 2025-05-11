import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bannerData: [],
  favorites: [],
  watching: [],
};

export const seriesSlice = createSlice({
  name: 'seriesData',
  initialState,
  reducers: {
    SetBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
    ToggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((favId) => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
    ToggleWatching: (state, action) => {
      const id = action.payload;
      if (state.watching.includes(id)) {
        state.watching = state.watching.filter((watchId) => watchId !== id);
      } else {
        state.watching.push(id);
      }
    },
    RemoveFromFavorites: (state, action) => {
      const id = action.payload;
      state.favorites = state.favorites.filter((favId) => favId !== id);
    },
    RemoveFromWatching: (state, action) => {
      const id = action.payload;
      state.watching = state.watching.filter((watchId) => watchId !== id);
    },
  },
});

export const {
  SetBannerData,
  ToggleFavorite,
  ToggleWatching,
  RemoveFromFavorites,
  RemoveFromWatching,
} = seriesSlice.actions;

export default seriesSlice.reducer;
