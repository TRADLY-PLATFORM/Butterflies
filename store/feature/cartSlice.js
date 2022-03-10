/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import tradly from 'tradly';

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ authKey, data }, thunkAPI) => {
    const sendData = { ...data };
    try {
      const response = await axios.post('/api/cart/add_cart', { sendData });
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
export const deleteCart = createAsyncThunk(
  'cart/deleteCart',
  async ({ authKey, data }, thunkAPI) => {
    const sendData = { ...data };
    try {
      const response = await axios.post('/api/cart/delete_cart', { sendData });
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

export const cartList = createAsyncThunk(
  'cart/cartList',
  async ({ authKey, bodyParam, currency }, thunkAPI) => {
    try {
      const response = await axios.post('/api/cart', { bodyParam, currency });
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
export const shippingMethods = createAsyncThunk(
  'cart/shippingMethod',
  async ({ authKey }, thunkAPI) => {
    try {
      const response = await axios.get('/api/shipping_method');
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

export const paymentMethods = createAsyncThunk(
  'cart/paymentMethod',
  async ({ authKey }, thunkAPI) => {
    try {
      const response = await axios.get('/api/payment/payment_method');
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

export const getCurrencies = createAsyncThunk(
  'cart/getCurrencies',
  async ({ authKey }, thunkAPI) => {
    try {
      const response = await axios.get('/api/currencies');
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

export const save_address = createAsyncThunk(
  'cart/save_address',
  async ({ id, addressData, authKey }, thunkAPI) => {
    try {
      const response = await axios.post('/api/address/save_address', {
        id,
        addressData,
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
export const getAddress = createAsyncThunk(
  'cart/getAddress',
  async ({ bodyParam, authKey }, thunkAPI) => {
    try {
      const response = await axios.get('/api/address/get_address', {
        params: bodyParam,
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

export const getStorageHubAddress = createAsyncThunk(
  'cart/getStorageHubAddress',
  async ({ bodyParam, authKey }, thunkAPI) => {
    try {
      const response = await axios.get('/api/address/get_address', {
        params: bodyParam,
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

export const checkout = createAsyncThunk(
  'cart/checkout',
  async ({ authKey, checkoutData, currency }, thunkAPI) => {
    try {
      const response = await axios.post('/api/cart/checkout', {
        checkoutData,
        currency,
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

export const directCheckout = createAsyncThunk(
  'cart/directCheckout',
  async ({ authKey, checkoutData, id, currency }, thunkAPI) => {
    try {
      const response = await axios.post('/api/cart/direct_checkout', {
        checkoutData,
        id,
        currency,
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

export const EphemeralKey = createAsyncThunk(
  'cart/EphemeralKey',
  async ({ authKey }, thunkAPI) => {
    try {
      const send_data = { api_version: '2019-09-09' };
      const response = await axios.post('/api/payment/get_ephermal_key', {
        send_data,
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

export const paymentIntent = createAsyncThunk(
  'cart/paymentIntent',
  async ({ authKey, sendData }, thunkAPI) => {
    try {
      const response = await axios.post('/api/payment/get_payment_intent_key', {
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

export const getSchedulesData = createAsyncThunk(
  'cart/getSchedulesData',
  async ({ id, bodyParam, authKey }, thunkAPI) => {
    try {
      const response = await axios.post('/api/schedules', { id, bodyParam });
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

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    isFetching: false,
    isCheckoutFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    currencies: null,
    addresses: null,
    storage_hub_addresses: null,
    cart: null,
    cart_details: null,
    shipping_methods: null,
    payment_methods: null,
    order_reference: null,
    client_secret: '',
  },
  reducers: {
    clearCartState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = '';
      return state;
    },
    clearCartDetails: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = '';
      state.listing_details = null;
      state.rating_data = {};
      return state;
    },
  },
  extraReducers: {
    [addToCart.fulfilled]: (state, { payload }) => {
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
    [addToCart.pending]: (state) => {
      state.isSuccess = false;
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [addToCart.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload?.message;
    },
    [getCurrencies.fulfilled]: (state, { payload }) => {
      if (payload.code) {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      } else {
        state.isError = false;
        state.isFetching = false;
        state.isSuccess = true;
        state.currencies = payload?.currencies;
      }
    },
    [getCurrencies.pending]: (state) => {
      state.isSuccess = false;
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [getCurrencies.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload?.message;
    },
    [save_address.fulfilled]: (state, { payload }) => {
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
    [save_address.pending]: (state) => {
      state.isSuccess = false;
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [save_address.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload?.message;
    },
    [getStorageHubAddress.fulfilled]: (state, { payload }) => {
      if (payload.code) {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      } else {
        state.isError = false;
        state.isFetching = false;
        state.isSuccess = true;
        state.storage_hub_addresses = payload?.addresses;
      }
    },
    [getStorageHubAddress.pending]: (state) => {
      state.isSuccess = false;
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [getStorageHubAddress.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload?.message;
    },
    [getAddress.fulfilled]: (state, { payload }) => {
      if (payload.code) {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      } else {
        state.isError = false;
        state.isFetching = false;
        state.isSuccess = true;
        state.addresses = payload?.addresses;
      }
    },
    [getAddress.pending]: (state) => {
      state.isSuccess = false;
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [getAddress.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload?.message;
    },
    [cartList.fulfilled]: (state, { payload }) => {
      if (payload.code) {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      } else {
        state.isError = false;
        state.isFetching = false;
        state.isSuccess = true;
        state.cart = payload.cart;
        state.cart_details = payload.cart_details;
      }
    },
    [cartList.pending]: (state) => {
      state.isSuccess = false;
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [cartList.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload?.message;
    },
    [shippingMethods.fulfilled]: (state, { payload }) => {
      if (payload.code) {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      } else {
        state.isError = false;
        state.isFetching = false;
        state.isSuccess = true;
        state.shipping_methods = payload.shipping_methods;
      }
    },
    [shippingMethods.pending]: (state) => {
      state.isSuccess = false;
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [shippingMethods.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload?.message;
    },
    [paymentMethods.fulfilled]: (state, { payload }) => {
      if (payload.code) {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      } else {
        state.isError = false;
        state.isFetching = false;
        state.isSuccess = true;
        state.payment_methods = payload.payment_methods;
      }
    },
    [paymentMethods.pending]: (state) => {
      state.isSuccess = false;
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [paymentMethods.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload?.message;
    },
    [checkout.fulfilled]: (state, { payload }) => {
      if (payload.code) {
        state.isCheckoutFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      } else {
        state.isError = false;
        state.isCheckoutFetching = false;
        state.isSuccess = true;
        state.order_reference = payload.order_reference;
      }
    },
    [checkout.pending]: (state) => {
      state.isSuccess = false;
      state.isCheckoutFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [checkout.rejected]: (state, { payload }) => {
      state.isCheckoutFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload?.message;
    },
    [directCheckout.fulfilled]: (state, { payload }) => {
      if (payload.code) {
        state.isCheckoutFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      } else {
        state.isError = false;
        state.isCheckoutFetching = false;
        state.isSuccess = true;
        state.order_reference = payload.order_reference;
      }
    },
    [directCheckout.pending]: (state) => {
      state.isSuccess = false;
      state.isCheckoutFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [directCheckout.rejected]: (state, { payload }) => {
      state.isCheckoutFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload?.message;
    },
    [paymentIntent.fulfilled]: (state, { payload }) => {
      if (payload.code) {
        state.isCheckoutFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      } else {
        state.isError = false;
        state.isCheckoutFetching = false;
        state.isSuccess = true;
        state.client_secret = payload?.client_secret;
      }
    },
    [paymentIntent.pending]: (state) => {
      state.isSuccess = false;
      state.isCheckoutFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [paymentIntent.rejected]: (state, { payload }) => {
      state.isCheckoutFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = payload?.message;
    },
  },
});

export const { clearCartState, clearCartDetails } = cartSlice.actions;
export const cartSelector = (state) => state.cart;
