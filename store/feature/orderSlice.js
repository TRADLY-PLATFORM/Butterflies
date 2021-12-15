/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tradly from 'tradly';

export const get_orders = createAsyncThunk(
  'order/get_orders',
  async ({ authKey, bodyParam }, thunkAPI) => {
    try {
      const response = await tradly.app.getOrders({
        authKey,
        bodyParam,
      });
      const { data } = await response;
      if (!response.error) {
        return data;
      }
      const { error } = await response;
      return error;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const get_order_details = createAsyncThunk(
  'order/get_order_details',
  async ({ authKey, id }, thunkAPI) => {
    try {
      const response = await tradly.app.getOrderDetail({
        authKey,
        id,
      });
      const { data } = await response;
      if (!response.error) {
        return data;
      }
      const { error } = await response;
      return error;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const changeOrderStatus = createAsyncThunk(
  'order/changeOrderStatus',
  async ({ authKey, id, sendData }, thunkAPI) => {
    try {
      const response = await tradly.app.updateOrderStatus({
        authKey,
        id,
        data: sendData,
      });
      const { data } = await response;
      if (!response.error) {
        return data;
      }
      const { error } = await response;
      return error;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    isFetching: false,
    isChangeStatusFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    orders: null,
    order_details: null,
    total_records: '',
    page: '',
  },
  reducers: {
    clearOrderState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = '';
      return state;
    },
    clearOrderDetails: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = '';
      state.order_details = null;
      return state;
    },
  },
  extraReducers: {
    [get_orders.fulfilled]: (state, { payload }) => {
      if (payload.code) {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      } else {
        state.isError = false;
        state.isFetching = false;
        state.isSuccess = true;
        state.orders = payload?.orders;
        state.total_records=payload?.total_records
        state.page=payload?.page
      }
    },
    [get_orders.pending]: (state) => {
      state.isSuccess = false;
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [get_orders.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
    [get_order_details.fulfilled]: (state, { payload }) => {
      if (payload.code) {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      } else {
        state.isError = false;
        state.isFetching = false;
        state.isSuccess = true;
        state.order_details = payload?.order;
      }
    },
    [get_order_details.pending]: (state) => {
      state.isSuccess = false;
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [get_order_details.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
    [changeOrderStatus.fulfilled]: (state, { payload }) => {
      if (payload.code) {
        state.isChangeStatusFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      } else {
        state.isError = false;
        state.isChangeStatusFetching = false;
        state.isSuccess = true;
      }
    },
    [changeOrderStatus.pending]: (state) => {
      state.isSuccess = false;
      state.isChangeStatusFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [changeOrderStatus.rejected]: (state, { payload }) => {
      state.isChangeStatusFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
  },
});

export const { clearOrderState, clearCOrderDetails } = orderSlice.actions;
export const orderSelector = (state) => state.order;
