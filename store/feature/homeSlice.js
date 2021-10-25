import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import tradly from "tradly";

export const homeCollections = createAsyncThunk(
	"home/homeCollections",

	async (thunkAPI) => {
		try {
			const response = await tradly.app.home();
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
		collections: [],
		categories: [],
		promo_banners:[],
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
				console.log('====================================');
				console.log(payload);
				console.log('====================================');
				state.isFetching = false;
				state.isSuccess = true;
				state.collections = payload?.collections;
				state.categories = payload?.categories;
				state.promo_banners = payload?.promo_banners;
			}
		},
		// @ts-ignore
		[homeCollections.pending]: (state) => {
			state.isFetching = true;
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
