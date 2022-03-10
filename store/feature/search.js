/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import tradly from 'tradly';

export const listingLike = createAsyncThunk(
  'search/listingLike',
  async ({ id, isLiked, authKey }, thunkAPI) => {
    try {
      const response = await axios.post('/api/search/like', { id, isLiked });
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

export const getSearchListings = createAsyncThunk(
  'search/getSearchListings',
  async ({ prams, authKey }, thunkAPI) => {
    try {
      const response = await axios.get('/api/search', { params: prams });
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

export const searchSlice = createSlice({
  name: 'search',
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
    clearSearchState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = '';
      return state;
    },

    clearSearch: (state) => {
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
    [getSearchListings.fulfilled]: (state, { payload }) => {
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
    [getSearchListings.pending]: (state) => {
      state.isSuccess = false;
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [getSearchListings.rejected]: (state, { payload }) => {
       state.isFetching = false;
       state.isError = true;
       state.isSuccess = false;
       state.errorMessage = payload?.message;
    },
  },
});

export const { clearSearch, clearSearchState } = searchSlice.actions;
export const searchSelector = (state) => state.search;
