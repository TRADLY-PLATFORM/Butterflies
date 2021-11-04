/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 import tradly from "tradly";

export const homeCollections = createAsyncThunk(
	"home/homeCollections",

	async ({ authKey }, thunkAPI) => {
		try {
 
			const response = await tradly.app.home({
				authKey,
			});
			const { data } = await response;
			if (!response.error) {
				return data;
			} 
				const { error } = await response;
				return error;
			
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data);
		}
	}
);


export const AllPromoBanners = createAsyncThunk(
	"home/AllPromoBanners",

	async ({ authKey, bodyParam }, thunkAPI) => {
		try {
			const response = await tradly.app.getPromoBanner({
				authKey,
				bodyParam,
			});
			const { data } = await response;
			if (!response.error) {
				return data;
			}
			const { error } = await response;
			return error;
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
		promo_banners: null,
		page_promo_banners:null,
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
		[homeCollections.fulfilled]: (state, { payload }) => {
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
			state.errorMessage = "";
		},
		// @ts-ignore
		[homeCollections.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload?.message;
		},
		[AllPromoBanners.fulfilled]: (state, { payload }) => {
			if (payload.code) {
				state.isFetching = false;
				state.isError = true;
				state.errorMessage = payload?.message;
			} else {
				state.isFetching = false;
				state.isSuccess = true;
				state.isError = false;
				state.page_promo_banners=payload?.promo_banners
			}
		},
		// @ts-ignore
		[AllPromoBanners.pending]: (state) => {
			state.isFetching = true;
			state.isError = false;
			state.errorMessage = "";
		},
		// @ts-ignore
		[AllPromoBanners.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload?.message;
		},
	},
});

export const homeSelector = (state) => state.home;
