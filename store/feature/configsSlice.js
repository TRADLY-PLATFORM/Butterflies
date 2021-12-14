/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tradly from 'tradly';

 

export const configsSlice = createSlice({
  name: 'configs',
  initialState: {
    general_configs: null,
    accounts_configs: null,
    listings_configs: null,
    marketplace_type: null,
    marketplace_module:null,
  },
  reducers: {
    setGeneralConfig: (state, { payload }) => {
      state.general_configs = payload?.general_configs;
      state.marketplace_type = payload?.general_configs?.type;
      state.marketplace_module = payload?.general_configs?.sub_type;
      return state;
    },
    setAccountConfig: (state, { payload }) => {
      state.accounts_configs = payload?.accounts_configs;
      return state;
    },
    setListingConfig: (state, { payload }) => {
      state.listings_configs = payload?.listings_configs;
      return state;
    },
  },
  extraReducers: {},
});

export const { setGeneralConfig, setAccountConfig, setListingConfig } =
  configsSlice.actions;
export const configsSelector = (state) => state.configs;
