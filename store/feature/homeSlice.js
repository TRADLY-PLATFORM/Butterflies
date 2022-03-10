/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import tradly from 'tradly';

export const homeCollections = createAsyncThunk(
  'home/homeCollections',

  async ({ authKey }, thunkAPI) => {
    try {
      const response = await axios.get('/api/home');
      const { data } = await response;
      if (!response.data.error) {
        return data;
      } else {
        const { error } = await response.data;
        return error;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const AllPromoBanners = createAsyncThunk(
  'home/AllPromoBanners',

  async ({ authKey, bodyParam }, thunkAPI) => {
    try {
      const response = await axios.get(`/api/banners`, { params: bodyParam });
      const { data } = await response;
      if (!response.data.error) {
        return data;
      } else {
        const { error } = await response.data;
        return error;
      }
      return error;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    collections: null,
    categories: null,
    promo_banners: null,
    page_promo_banners: null,
  },
  // reducers: {
  // 	clearState: (state) => {
  // 		state.isError = false;
  // 		state.isSuccess = false;
  // 		state.isFetching = false;

  // 		return state;
  // 	},
  // },
  extraReducers: {
 
    [homeCollections.fulfilled]: (state, { payload }) => {
      if (payload.code) {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload?.message;
      } else {
        state.isFetching = false;
        state.isSuccess = true;
        state.isError = false;
        state.collections = payload?.collections;
        state.categories = payload?.categories;
        state.promo_banners = payload?.promo_banners;
      }
    },
 
    [homeCollections.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
  
    [homeCollections.rejected]: (state, { payload }) => {
     state.isFetching = false;
     state.isError = true;
     state.errorMessage = payload?.message;
    },
    [AllPromoBanners.fulfilled]: (state, { payload }) => {
      if (payload.code) {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload?.message;
      } else {
        state.isFetching = false;
        state.isSuccess = true;
        state.isError = false;
        state.page_promo_banners = payload?.promo_banners;
      }
    },
  
    [AllPromoBanners.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
  
    [AllPromoBanners.rejected]: (state, { payload }) => {
       state.isFetching = false;
       state.isError = true;
       state.errorMessage = payload?.message;
    },
  },
});

export const homeSelector = (state) => state.home;
