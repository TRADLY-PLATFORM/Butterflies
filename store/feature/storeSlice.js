/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tradly from 'tradly';

export const myStore = createAsyncThunk(
  'store/myStore',

  async ({ prams, authKey }, thunkAPI) => {
    try {
      const response = await tradly.app.getAccounts({
        bodyParam: prams,
        authKey,
      });
      const { data } = await response;
      if (!response.error) {
        return data;
      } else {
        const { error } = await response;
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
      const response = await tradly.app.searchAddress({
        searchKey,
        authKey,
      });
      const { data } = await response;
      if (!response.error) {
        return data;
      } else {
        const { error } = await response;
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
      const response = await tradly.app.getCategory({
        bodyParam: prams,
        authKey,
      });
      const { data } = await response;
      if (!response.error) {
        return data;
      } else {
        const { error } = await response;
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
      const response = await tradly.app.getCategory({
        bodyParam: prams,
        authKey,
      });
      const { data } = await response;
      if (!response.error) {
        return data;
      } else {
        const { error } = await response;
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
      const response = await tradly.app.getAttribute({
        bodyParam: prams,
        authKey,
      });
      const { data } = await response;
      if (!response.error) {
        return data;
      } else {
        const { error } = await response;
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
      const response = await tradly.app.postAccounts({
        id,
        authKey,
        data: prams,
      });
      const { data } = await response;
      if (!response.error) {
        return data;
      } else {
        const { error } = await response;
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
      const response = await tradly.app.getListings({
        bodyParam: prams,
        authKey,
      });
      const { data } = await response;
      if (!response.error) {
        return data;
      } else {
        const { error } = await response;
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
      const response = await tradly.app.getListingDetail({
        id,
        authKey,
      });
      const { data } = await response;
      if (!response.error) {
        return data;
      } else {
        const { error } = await response;
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
      const response = await tradly.app.getCurrency({
        authKey,
      });
      const { data } = await response;
      if (!response.error) {
        return data;
      } else {
        const { error } = await response;
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
      const response = await tradly.app.getAccounts({
        bodyParam,
        authKey,
      });
      const { data } = await response;
      if (!response.error) {
        return data;
      } else {
        const { error } = await response;
        return error;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const accountDetails = createAsyncThunk(
  'store/accountDetails',

  async ({ id, authKey }, thunkAPI) => {
    try {
      const response = await tradly.app.commonFuntion({
        path: `/v1/accounts/${id}`,
        bodyParam: '',
        authKey,
        Method: 'Get',
      });
      const { data } = await response;
      if (!response.error) {
        return data;
      } else {
        const { error } = await response;
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
  },
  extraReducers: {
    [myStore.fulfilled]: (state, { payload }) => {
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
    },
    [myStore.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [myStore.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
    [getAddressSearch.fulfilled]: (state, { payload }) => {
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
    },
    [getAddressSearch.pending]: (state) => {
      state.addressFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [getAddressSearch.rejected]: (state, { payload }) => {
      state.addressFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
    [categories.fulfilled]: (state, { payload }) => {
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
    },
    [categories.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [categories.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
    [listingCategories.fulfilled]: (state, { payload }) => {
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
    },
    [listingCategories.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [listingCategories.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
    [myAccountListingDetails.fulfilled]: (state, { payload }) => {
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
    },
    [myAccountListingDetails.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [myAccountListingDetails.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
    [accountAttribute.fulfilled]: (state, { payload }) => {
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
    },
    [accountAttribute.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [accountAttribute.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
    [myAccountListings.fulfilled]: (state, { payload }) => {
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
    },
    [myAccountListings.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [myAccountListings.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
    [currencies.fulfilled]: (state, { payload }) => {
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
    },
    [currencies.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [currencies.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
    [get_all_accounts.fulfilled]: (state, { payload }) => {
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
    },
    [get_all_accounts.pending]: (state) => {
      state.isAllAccountsFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [get_all_accounts.rejected]: (state, { payload }) => {
      state.isAllAccountsFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
    [accountDetails.fulfilled]: (state, { payload }) => {
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
    },
    [accountDetails.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [accountDetails.rejected]: (state, { payload }) => {
      state.isAllAccountsFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
  },
});

export const { clearStoreState, setListingConfig, clearAccountDetails } =
  storeSlice.actions;
export const storeSelector = (state) => state.store;
