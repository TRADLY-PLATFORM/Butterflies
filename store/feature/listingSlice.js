/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 import tradly from "tradly";

export const listingDetails = createAsyncThunk(
	"listing/listingDetails",
	async ({ id, authKey }, thunkAPI) => {
		try {
			 
			const response = await tradly.app.getListingDetail({
				id,
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
export const listingLike = createAsyncThunk(
	"listing/listingLike",
	async ({ id, isLiked, authKey }, thunkAPI) => {
		try {
			const response = await tradly.app.likeListing({
				id,
				authKey,
				isLiked,
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
export const getAllListings = createAsyncThunk(
	"listing/getAllListings",
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

export const listingSlice = createSlice({
	name: "listing",
	initialState: {
		isFetching: false,
		isSuccess: false,
		isError: false,
		errorMessage: "",
		listing_details: null,
		rating_data: {},
		listings: null,
		page: "",
		total_records: "",
	},
	reducers: {
		clearListingState: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isFetching = false;
			state.errorMessage = "";
			return state;
		},
		clearListingDetails: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isFetching = false;
			state.errorMessage = "";
			state.listing_details = null;
			state.rating_data = {};
			return state;
		},
		clearListings: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isFetching = false;
			state.errorMessage = "";
			state.listings = null;
			state.page = "";
			state.total_records = "";
			return state;
		},
	},
	extraReducers: {
		[listingDetails.fulfilled]: (state, { payload }) => {
			if (payload.code) {
				state.isFetching = false;
				state.isError = true;
				state.isSuccess = false;
				state.errorMessage = payload?.message;
			} else {
				state.isError = false;
				state.isFetching = false;
				state.isSuccess = true;
				state.listing_details = payload?.listing;
				state.rating_data = payload?.rating_data;
			}
		},
		[listingDetails.pending]: (state) => {
			state.isSuccess = false;
			state.isFetching = true;
			state.isError = false;
			state.errorMessage = "";
		},
		[listingDetails.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload?.message;
		},
		[listingLike.fulfilled]: (state, { payload }) => {
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
		[listingLike.pending]: (state) => {
			state.isSuccess = false;
			state.isFetching = true;
			state.isError = false;
			state.errorMessage = "";
		},
		[listingLike.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload?.message;
		},
		[getAllListings.fulfilled]: (state, { payload }) => {
			if (payload.code) {
				state.isFetching = false;
				state.isError = true;
				state.isSuccess = false;
				state.errorMessage = payload?.message;
			} else {
				state.isError = false;
				state.isFetching = false;
				state.isSuccess = true;
				state.listings = payload?.listings;
				state.page = payload?.page;
				state.total_records = payload?.total_records;
			}
		},
		[getAllListings.pending]: (state) => {
			state.isSuccess = false;
			state.isFetching = true;
			state.isError = false;
			state.errorMessage = "";
		},
		[getAllListings.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload?.message;
		},
	},
});


export const { clearListingState, clearListingDetails, clearListings } =
	listingSlice.actions;
export const listingSelector = (state) => state.listing;
