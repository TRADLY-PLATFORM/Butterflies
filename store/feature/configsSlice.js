/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tradly from 'tradly';

 

export const configsSlice = createSlice({
  name: 'configs',
  initialState: {
    general_configs: null,
    accounts_configs: null,
  },
  reducers: {
     
    setGeneralConfig: (state, { payload }) => {
      state.general_configs = payload?.general_configs;
      return state;
    },
    setAccountConfig: (state, { payload }) => {
      state.accounts_configs = payload?.accounts_configs;
      return state;
    },
  },
  extraReducers: {},
});

export const { setGeneralConfig, setAccountConfig } = configsSlice.actions;
export const configsSelector = (state) => state.configs;
