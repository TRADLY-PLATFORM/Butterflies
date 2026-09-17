// @ts-nocheck
/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import tradly from 'tradly';

export const myStore = createAsyncThunk(
  'store/myStore',

  async ({ prams, authKey }, thunkAPI) => {
    try {
      const response = await axios.get('/api/a/my_account', { params: prams });
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

export const getAddressSearch = createAsyncThunk(
  'store/getAddressSearch',

  async ({ searchKey, authKey }, thunkAPI) => {
    try {
      const response = await axios.get(`/api/address/${searchKey}`);
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

export const categories = createAsyncThunk(
  'store/categories',

  async ({ prams, authKey }, thunkAPI) => {
    try {
      const response = await axios.get('/api/categories', { params: prams });
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
export const listingCategories = createAsyncThunk(
  'store/listingCategories',

  async ({ prams, authKey }, thunkAPI) => {
    try {
      const response = await axios.get('/api/categories', { params: prams });
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

export const accountAttribute = createAsyncThunk(
  'store/accountAttribute',

  async ({ prams, authKey }, thunkAPI) => {
    try {
      const response = await axios.get('/api/attributes', { params: prams });
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

export const postStore = createAsyncThunk(
  'store/postStore',

  async ({ id, prams, authKey }, thunkAPI) => {
    try {
      const response = await axios.post('/api/a/my_account', { id, prams });
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

export const myAccountListings = createAsyncThunk(
  'store/myAccountListings',

  async ({ prams, authKey }, thunkAPI) => {
    try {
      const response = await axios.get('/api/l', { params: prams });
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
export const myAccountListingDetails = createAsyncThunk(
  'store/myAccountListingDetails',

  async ({ id, authKey }, thunkAPI) => {
    try {
      const response = await axios.get(`/api/l/${id}`);
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

export const currencies = createAsyncThunk(
  'store/currencies',

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

export const get_all_accounts = createAsyncThunk(
  'store/get_all_accounts',

  async ({ bodyParam, authKey }, thunkAPI) => {
    try {
      const response = await axios.get('/api/a', { params: bodyParam });
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

export const account_full_details = createAsyncThunk(
  'store/account_full_details',

  async ({ id, authKey }, thunkAPI) => {
    
    try {
      const response = await axios.get(`/api/a/${id}`);
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

export const storeSlice = createSlice({
  name: 'store',
  initialState: {
    isFetching: false,
    isAllAccountsFetching: false,
    addressFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    my_stores: null,
    account_categories: null,
    listing_categories: null,
    search_addresses: null,
    attributes: null,
    my_store_listings: null,
    my_store_listings_page: '',
    my_store_listings_total_records: '',
    listing_configs: null,
    currencies: null,
    my_account_listing_details: null,
    all_accounts: [],
    all_accounts_total_records: '',
    all_accounts_page: '',
    my_account_details: null,
  },
  reducers: {
    clearStoreState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = '';
      return state;
    },
    setListingConfig: (state, { payload }) => {
      state.listing_configs = payload?.listing_configs;
      return state;
    },
    clearAccountDetails: (state) => {
      state.my_account_details = null;
    },
    clearAccountListingDetails: (state) => {
      state.my_account_listing_details = null;
      state.attributes = null;
    },
    setAccountDetail: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.my_account_details = payload?.account ?? state.my_account_details;
      if (payload?.listings) {
        state.my_store_listings = payload.listings;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(myStore.fulfilled, (state, { payload }) => {
        if (payload.code) {
          state.isFetching = false;
          state.isError = true;
          state.isSuccess = false;
          state.errorMessage = payload?.message;
        } else {
          state.isError = false;
          state.isFetching = false;
          state.isSuccess = true;
          state.errorMessage = '';
          state.my_stores = payload?.accounts;
        }
      })
      .addCase(myStore.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(myStore.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      })
      .addCase(getAddressSearch.fulfilled, (state, { payload }) => {
        if (payload.code) {
          state.addressFetching = false;
          state.isError = true;
          state.isSuccess = false;
          state.errorMessage = payload?.message;
        } else {
          state.isError = false;
          state.addressFetching = false;
          state.isSuccess = true;
          state.errorMessage = '';
          state.search_addresses = payload?.addresses;
        }
      })
      .addCase(getAddressSearch.pending, (state) => {
        state.addressFetching = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(getAddressSearch.rejected, (state, { payload }) => {
        state.addressFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      })
      .addCase(categories.fulfilled, (state, { payload }) => {
        if (payload.code) {
          state.isFetching = false;
          state.isError = true;
          state.isSuccess = false;
          state.errorMessage = payload?.message;
        } else {
          state.isError = false;
          state.isFetching = false;
          state.isSuccess = true;
          state.errorMessage = '';
          state.account_categories = payload?.categories;
        }
      })
      .addCase(categories.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(categories.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      })
      .addCase(listingCategories.fulfilled, (state, { payload }) => {
        if (payload.code) {
          state.isFetching = false;
          state.isError = true;
          state.isSuccess = false;
          state.errorMessage = payload?.message;
        } else {
          state.isError = false;
          state.isFetching = false;
          state.isSuccess = true;
          state.errorMessage = '';
          state.listing_categories = payload?.categories;
        }
      })
      .addCase(listingCategories.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(listingCategories.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      })
      .addCase(myAccountListingDetails.fulfilled, (state, { payload }) => {
        if (payload.code) {
          state.isFetching = false;
          state.isError = true;
          state.isSuccess = false;
          state.errorMessage = payload?.message;
        } else {
          state.isError = false;
          state.isFetching = false;
          state.isSuccess = true;
          state.errorMessage = '';
          state.my_account_listing_details = payload?.listing;
        }
      })
      .addCase(myAccountListingDetails.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(myAccountListingDetails.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      })
      .addCase(accountAttribute.fulfilled, (state, { payload }) => {
        if (payload.code) {
          state.isFetching = false;
          state.isError = true;
          state.isSuccess = false;
          state.errorMessage = payload?.message;
        } else {
          state.isError = false;
          state.isFetching = false;
          state.isSuccess = true;
          state.errorMessage = '';
          state.attributes = payload?.attributes;
        }
      })
      .addCase(accountAttribute.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(accountAttribute.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      })
      .addCase(myAccountListings.fulfilled, (state, { payload }) => {
        if (payload.code) {
          state.isFetching = false;
          state.isError = true;
          state.isSuccess = false;
          state.errorMessage = payload?.message;
        } else {
          state.isError = false;
          state.isFetching = false;
          state.isSuccess = true;
          state.errorMessage = '';
          state.my_store_listings = payload?.listings;
          state.my_store_listings_page = payload?.page;
          state.my_store_listings_total_records = payload?.total_records;
        }
      })
      .addCase(myAccountListings.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(myAccountListings.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      })
      .addCase(currencies.fulfilled, (state, { payload }) => {
        if (payload.code) {
          state.isFetching = false;
          state.isError = true;
          state.isSuccess = false;
          state.errorMessage = payload?.message;
        } else {
          state.isError = false;
          state.isFetching = false;
          state.isSuccess = true;
          state.errorMessage = '';
          state.currencies = payload?.currencies;
        }
      })
      .addCase(currencies.pending, (state) => {
        state.isFetching = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(currencies.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      })
      .addCase(get_all_accounts.fulfilled, (state, { payload }) => {
        if (payload.code) {
          state.isAllAccountsFetching = false;
          state.isError = true;
          state.isSuccess = false;
          state.errorMessage = payload?.message;
        } else {
          state.isError = false;
          state.isAllAccountsFetching = false;
          state.isSuccess = true;
          state.errorMessage = '';
          state.all_accounts = payload?.accounts;
          state.all_accounts_page = payload?.page;
          state.all_accounts_total_records = payload?.total_records;
        }
      })
      .addCase(get_all_accounts.pending, (state) => {
        state.isAllAccountsFetching = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(get_all_accounts.rejected, (state, { payload }) => {
        state.isAllAccountsFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      })
      .addCase(account_full_details.fulfilled, (state, { payload }) => {
        if (payload.code) {
          state.isFetching = false;
          state.isError = true;
          state.isSuccess = false;
          state.errorMessage = payload?.message;
        } else {
          state.isError = false;
          state.isFetching = false;
          state.isSuccess = true;
          state.errorMessage = '';
          state.my_account_details = payload?.account;
        }
      })
      .addCase(account_full_details.pending, (state) => {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      })
      .addCase(account_full_details.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      });
  },
});

export const {
  clearStoreState,
  setListingConfig,
  clearAccountDetails,
  clearAccountListingDetails,
  setAccountDetail,
} = storeSlice.actions;
export const storeSelector = (state) => state.store;
