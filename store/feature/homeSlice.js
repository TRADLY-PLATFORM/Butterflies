import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
 
export const homeCollections = createAsyncThunk(
	"home/homeCollections",
	// @ts-ignore
	async () => {
		try {
			const response = await api.get("products/v1/home/");
			const data = await response.json();
			if (response.status === 200) {
				return { ...data };
			}
			return thunkAPI.rejectWithValue(data);
		} catch (e) {
			return thunkAPI.rejectWithValue(e.response.data);
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
		collections:[],
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
			state.isFetching = false;
			state.isSuccess = true;
			// state.collections = payload.user.email;
 		},
		// @ts-ignore
		[homeCollections.pending]: (state) => {
			state.isFetching = true;
		},
		// @ts-ignore
		[homeCollections.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload?.message;
		},
	},
});

 
export const userSelector = (state) => state.home;
