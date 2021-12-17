/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tradly from 'tradly';

export const signIn = createAsyncThunk(
  'auth/signIn',

  async ({ prams }, thunkAPI) => {
    try {
      const response = await tradly.user.login({ data: prams });
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
export const refreshPage = createAsyncThunk(
  'auth/refreshPage',

  async ({ key }, thunkAPI) => {
    try {
      const response = await tradly.init.refreshAPI(key);
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

export const signUp = createAsyncThunk(
  'auth/signUp',

  async ({ prams }, thunkAPI) => {
    try {
      const response = await tradly.user.register({
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

export const verifyUser = createAsyncThunk(
  'auth/verifyUser',

  async ({ prams }, thunkAPI) => {
    try {
      const response = await tradly.user.verify({ data: prams });
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

export const verifyUserEmail = createAsyncThunk(
  'auth/verifyUserEmail',

  async ({ prams }, thunkAPI) => {
    try {
      const response = await tradly.user.forgotPassword({ data: prams });
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

export const updateUserInfo = createAsyncThunk(
  'auth/updateUserInfo',

  async ({ userId,auth_key }, thunkAPI) => {
    try {
      const response = await tradly.app.commonFuntion({
        path: `/v1/users/${userId}`,
        bodyParam: '',
        Method: 'GET',
        authKey: auth_key,
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

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    verifyId: '',
    login: false,
    user_email: '',
    first_name: '',
    last_name: '',
    auth_key: '',
    refresh_key: '',
    profile_pic: '',
    user_details: '',
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = '';
      return state;
    },
    logout: (state, { payload }) => {
      state.login = false;
      state.user_email = '';
      state.first_name = '';
      state.last_name = '';
      state.auth_key = '';
      state.refresh_key = '';
      state.profile_pic = '';
      state.user_details = '';
      localStorage.clear();
      payload.router.push('/').then(() => {
        window.location.reload();
      });
      return state;
    },
  },
  extraReducers: {
    [signIn.fulfilled]: (state, { payload }) => {
      if (payload.code) {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      } else {
        const expirationDate = new Date(new Date().getTime() + 899 * 1000);
        state.isError = false;
        state.isFetching = false;
        state.isSuccess = true;
        state.login = true;
        state.errorMessage = '';
        state.user_email = payload?.user.email;
        state.first_name = payload?.user.first_name;
        state.last_name = payload?.user.last_name;
        state.profile_pic = payload?.user?.profile_pic;
        state.auth_key = payload?.user?.key.auth_key;
        state.refresh_key = payload?.user?.key.refresh_key;
        state.user_details = payload?.user;
        localStorage.setItem('auth_key', payload?.user?.key.auth_key);
        localStorage.setItem('refresh_key', payload?.user?.key.refresh_key);
        localStorage.setItem('user_details', JSON.stringify(payload?.user));
        localStorage.setItem('expiration_time', expirationDate);
        localStorage.setItem('login', true);
      }
    },
    [signIn.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [signIn.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
    [refreshPage.fulfilled]: (state, { payload }) => {
      if (payload.code) {
        // state.isFetching = false;
        // state.isError = true;
        // state.isSuccess = false;
        // state.errorMessage = payload?.message;
      } else {
        const userDetails = JSON.parse(localStorage.getItem('user_details'));
        state.login = true;
        state.user_email = userDetails?.email;
        state.first_name = userDetails.first_name;
        state.last_name = userDetails.last_name;
        state.profile_pic = userDetails.profile_pic;
        state.auth_key = payload?.user?.key.auth_key;
        state.refresh_key = payload?.user?.key.refresh_key;
        state.user_details = userDetails;
        localStorage.setItem('auth_key', payload?.user?.key.auth_key);
        localStorage.setItem('refresh_key', payload?.user?.key.refresh_key);
        localStorage.setItem('login', true);
      }
    },

    [signUp.fulfilled]: (state, { payload }) => {
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
        state.verifyId = payload.verify_id;
          localStorage.setItem('new_user_verify_id', payload.verify_id);
      }
    },
    [signUp.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [signUp.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
    [verifyUser.fulfilled]: (state, { payload }) => {
      if (payload.code) {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      } else {
        const expirationDate = new Date(new Date().getTime() + 899 * 1000);
        state.isError = false;
        state.isFetching = false;
        state.isSuccess = true;
        state.login = true;
        state.errorMessage = '';
        state.user_email = payload?.user.email;
        state.first_name = payload?.user.first_name;
        state.last_name = payload?.user.last_name;
        state.profile_pic = payload?.user?.profile_pic;
        state.auth_key = payload?.user?.key.auth_key;
        state.refresh_key = payload?.user?.key.refresh_key;
        state.user_details = payload?.user;
        localStorage.setItem('auth_key', payload?.user?.key.auth_key);
        localStorage.setItem('refresh_key', payload?.user?.key.refresh_key);
        localStorage.setItem('user_details', JSON.stringify(payload?.user));
        localStorage.setItem('expiration_time', expirationDate);
        localStorage.setItem('login', true);
      }
    },
    [verifyUser.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [verifyUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
    [verifyUserEmail.fulfilled]: (state, { payload }) => {
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
    [verifyUserEmail.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.errorMessage = '';
    },
    [verifyUserEmail.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
    [updateUserInfo.fulfilled]: (state, { payload }) => {
      if (payload.code) {
        state.isFetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = payload?.message;
      } else {
        state.isError = false;
        state.isFetching = false;
        state.isSuccess = true;
        state.user_email = payload?.user.email;
        state.first_name = payload?.user.first_name;
        state.last_name = payload?.user.last_name;
         state.profile_pic = payload?.user?.profile_pic;
        state.user_details = payload?.user;
        localStorage.setItem('user_details', JSON.stringify(payload?.user));
      }
    },
  },
});

export const { clearState, logout } = authSlice.actions;
export const authSelector = (state) => state.auth;
