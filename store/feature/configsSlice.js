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
    MARKETPLACE_MODULES: null,
    MARKETPLACE_FLAVOURS: null,
  },
  reducers: {
    setGeneralConfig: (state, { payload }) => {
      state.general_configs = payload?.general_configs;
      state.MARKETPLACE_MODULES = payload?.general_configs?.type;
      state.MARKETPLACE_FLAVOURS = payload?.general_configs?.sub_type;
      return state;
    },
    setAccountConfig: (state, { payload }) => {
      state.accounts_configs = payload?.accounts_configs;
      return state;
    },
    setListingConfig: (state, { payload }) => {
      state.listings_configs = payload?.listing_configs;
      return state;
    },
  },
  extraReducers: {},
});

export const { setGeneralConfig, setAccountConfig, setListingConfig } =
  configsSlice.actions;
export const configsSelector = (state) => state.configs;
