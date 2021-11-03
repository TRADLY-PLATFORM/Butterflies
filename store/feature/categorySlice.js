/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tradly from "tradly";

export const categories = createAsyncThunk(
	"category/categories",

	async ({ prams, authKey }, thunkAPI) => {
		try {
			const response = await tradly.app.getCategory({
				bodyParam: prams,
				authKey,
			});
			const { data } = await response;
			if (!response.error) {
				return data;
			}
			const { error } = await response;
			return error;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);
export const categoryListings = createAsyncThunk(
	"category/categoryListings",

	async ({ prams, authKey }, thunkAPI) => {
		try {
			const response = await tradly.app.getListings({
				bodyParam: prams,
				authKey,
			});
			const { data } = await response;
			if (!response.error) {
				return data;
			}
			const { error } = await response;
			return error;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const categorySlice = createSlice({
	name: "category",
	initialState: {
		isFetching: false,
		isSuccess: false,
		isError: false,
		errorMessage: "",
		all_categories: null,
		category_listings: null,
		page: "",
		total_records: "",
	},
	reducers: {
		clearCategoryListings: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isFetching = false;
			state.errorMessage = "";
			state.category_listings = null;
			state.page = "";
			state.total_records = "";
			return state;
		},
	},
	extraReducers: {
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
				state.errorMessage = "";
				state.all_categories = payload?.categories;
			}
		},

		[categories.pending]: (state) => {
			state.isFetching = true;
			state.isError = false;
			state.errorMessage = "";
		},
		[categories.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload?.message;
		},

		[categoryListings.fulfilled]: (state, { payload }) => {
			if (payload.code) {
				state.isFetching = false;
				state.isError = true;
				state.isSuccess = false;
				state.errorMessage = payload?.message;
			} else {
				state.isError = false;
				state.isFetching = false;
				state.isSuccess = true;
				state.errorMessage = "";
				state.category_listings = payload?.listings;
				state.page = payload?.page;
				state.total_records = payload?.total_records;
			}
		},

		[categoryListings.pending]: (state) => {
			state.isFetching = true;
			state.isError = false;
			state.errorMessage = "";
		},
		[categoryListings.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload?.message;
		},
	},
});

export const { clearCategoryListings } = categorySlice.actions;
export const categorySelector = (state) => state.category;
