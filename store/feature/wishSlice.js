/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import tradly from 'tradly';

export const listingLike = createAsyncThunk(
  'wish/listingLike',
  async ({ id, isLiked, authKey }, thunkAPI) => {
    try {
      const response = await axios.post('/api/wish/like', { id, isLiked });
      const { data } = await response;
      if (!response.data.error) {
        return data;
      } else {
        const { error } = await response.data;
        return error;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getWishListListings = createAsyncThunk(
  'wish/getWishListListings',
  async ({ prams, authKey }, thunkAPI) => {
    try {
      const response = await axios.get('/api/wish', { params: prams });
      const { data } = await response;
      if (!response.data.error) {
        return data;
      } else {
        const { error } = await response.data;
        return error;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const wishSlice = createSlice({
  name: 'wish',
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    listings: null,
    page: '',
    total_records: '',
  },
  reducers: {
    clearWishState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = '';
      return state;
    },

    clearWish: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = '';
      state.listings = null;
      state.page = '';
      state.total_records = '';
      return state;
    },
  },
  extraReducers: {
    [listingLike.fulfilled]: (state, { payload }) => {
      if (payload.code) {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      } else {
        state.isError = false;
        state.isFetching = false;
        state.isSuccess = true;
      }
    },
    [listingLike.pending]: (state) => {
      state.isSuccess = false;
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [listingLike.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload?.message;
    },
    [getWishListListings.fulfilled]: (state, { payload }) => {
      if (payload.code) {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      } else {
        state.isError = false;
        state.isFetching = false;
        state.isSuccess = true;
        state.listings = payload?.listings;
        state.page = payload?.page;
        state.total_records = payload?.total_records;
      }
    },
    [getWishListListings.pending]: (state) => {
      state.isSuccess = false;
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [getWishListListings.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload?.message;
    },
  },
});

export const { clearWish, clearWishState } = wishSlice.actions;
export const wishSelector = (state) => state.wish;
