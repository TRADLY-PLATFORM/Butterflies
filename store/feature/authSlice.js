 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
 import tradly from "tradly";

export const signIn = createAsyncThunk(
	"auth/signIn",

	async ({prams,key},thunkAPI) => {
        try {
 
			const response = await  tradly.user.login(prams,key);
 			 const { data } = await response;
		if (!response.error) {
				return data;
            }
        else {
            const { error } = await response;
				return error;
            }
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
)

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		isFetching: false,
		isSuccess: false,
		isError: false,
		errorMessage: "",
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
        [signIn.fulfilled]: (state, { payload }) => {

			state.isFetching = false;
			state.isSuccess = true;
 		},
 		[signIn.pending]: (state) => {
			state.isFetching = true;
		},
        [signIn.rejected]: (state, { payload }) => {
                console.log('====================================');
                console.log(payload);
                console.log('====================================');
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload?.message;
		},
	},
});

 
export const authSelector = (state) => state.auth;