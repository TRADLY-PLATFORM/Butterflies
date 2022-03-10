/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import tradly from 'tradly';

export const callStripeConnect = createAsyncThunk(
  'payout/callStripeConnect',
  async ({ authKey, id }, thunkAPI) => {
    try {
      const response = await axios.post('/api/payment/stripe_connect', { id });
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
export const callExpressLogin = createAsyncThunk(
  'payout/callExpressLogin',
  async ({ authKey, sendData }, thunkAPI) => {
    try {
      const response = await axios.post('/api/payment/express_login', {
        sendData,
      });
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

export const payoutSlice = createSlice({
  name: 'payout',
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    stripe_connect: null,
    express_login_link: null,
  },
  reducers: {
    clearPayoutState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = '';
      return state;
    },
  },
  extraReducers: {
    [callStripeConnect.fulfilled]: (state, { payload }) => {
      if (payload.code) {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      } else {
        state.isError = false;
        state.isFetching = false;
        state.isSuccess = true;
        state.stripe_connect = payload;
      }
    },
    [callStripeConnect.pending]: (state) => {
      state.isSuccess = false;
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [callStripeConnect.rejected]: (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
    },
    [callExpressLogin.fulfilled]: (state, { payload }) => {
      if (payload.code) {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      } else {
        state.isError = false;
        state.isFetching = false;
        state.isSuccess = true;
        state.express_login_link = payload.login_link;
      }
    },
    [callExpressLogin.pending]: (state) => {
      state.isSuccess = false;
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [callExpressLogin.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload?.message;
    },
  },
});

export const { clearPayoutState } = payoutSlice.actions;
export const payoutSelector = (state) => state.payout;
