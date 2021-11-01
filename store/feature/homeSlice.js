import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 import tradly from "tradly";

export const homeCollections = createAsyncThunk(
	"home/homeCollections",

	async ({ authKey }, thunkAPI) => {
		try {
 console.log('====================================');
 console.log(authKey);
 console.log('====================================');
			const response = await tradly.app.home({
				authKey: authKey,
			});
			const { data } = await response;
			if (!response.error) {
				return data;
			} else {
				const { error } = await response;
				return error;
			}
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data);
		}
	}
);

export const homeSlice = createSlice({
	name: "home",
	initialState: {
		isFetching: false,
		isSuccess: false,
		isError: false,
		errorMessage: "",
		collections: null,
		categories: null,
		promo_banners:null,
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
		// @ts-ignore
		[homeCollections.fulfilled]: (state, { meta, payload }) => {
			if (payload.code) {
				state.isFetching = false;
				state.isError = true;
				state.errorMessage = payload?.message;
			} else {
				 
				state.isFetching = false;
				state.isSuccess = true;
				state.isError = false;
				state.collections = payload?.collections;
				state.categories = payload?.categories;
				state.promo_banners = payload?.promo_banners;
			}
		},
		// @ts-ignore
		[homeCollections.pending]: (state) => {
			state.isFetching = true;
			state.isError = false;
			state.errorMessage = '';
		},
		// @ts-ignore
		[homeCollections.rejected]: (state, { meta, payload, error }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload?.message;
		},
	},
});

export const homeSelector = (state) => state.home;
