import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import tradly from "tradly";

export const addToCart = createAsyncThunk(
	"cart/addToCart",
	async ({ authKey, data }, thunkAPI) => {
		const sendData = { ...data };
		try {
			const response = await tradly.app.addToCart({
				authKey: authKey,
				data: sendData,
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

export const cartList = createAsyncThunk(
	"cart/cartList",
	async ({ authKey }, thunkAPI) => {
		try {
			const response = await tradly.app.getCarts({
				authKey: authKey,
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
export const shippingMethods = createAsyncThunk(
	"cart/shippingMethod",
	async ({ authKey }, thunkAPI) => {
		try {
			const response = await tradly.app.getShippingMethods({
				authKey: authKey,
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
export const paymentMethods = createAsyncThunk(
	"cart/paymentMethod",
	async ({ authKey }, thunkAPI) => {
		try {
			const response = await tradly.app.getPaymentMethods({
				authKey: authKey,
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
export const getAddress = createAsyncThunk(
	"cart/getAddress",
	async ({ bodyParam, authKey }, thunkAPI) => {
		try {
			const response = await tradly.app.getAddress({
				bodyParam: bodyParam,
				authKey: authKey,
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
export const checkout = createAsyncThunk(
	"cart/checkout",
	async ({ authKey, checkoutData }, thunkAPI) => {
		try {
			console.log("====================================");
			console.log(checkoutData);
			console.log("====================================");
			const response = await tradly.app.checkout({
				authKey: authKey,
				data: checkoutData,
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

export const cartSlice = createSlice({
	name: "cart",
	initialState: {
		isFetching: false,
		isCheckoutFetching:false,
		isSuccess: false,
		isError: false,
		errorMessage: "",
		cart: null,
		cart_details: null,
		shipping_methods: null,
		payment_methods: null,
	},
	reducers: {
		clearCartState: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isFetching = false;
			state.errorMessage = "";
			return state;
		},
		clearCartDetails: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isFetching = false;
			state.errorMessage = "";
			state.listing_details = null;
			state.rating_data = {};
			return state;
		},
	},
	extraReducers: {
		[addToCart.fulfilled]: (state, { payload }) => {
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
		[addToCart.pending]: (state) => {
			state.isSuccess = false;
			state.isFetching = true;
			state.isError = false;
			state.errorMessage = "";
		},
		[addToCart.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload?.message;
		},
		[cartList.fulfilled]: (state, { payload }) => {
			if (payload.code) {
				state.isFetching = false;
				state.isError = true;
				state.isSuccess = false;
				state.errorMessage = payload?.message;
			} else {
				state.isError = false;
				state.isFetching = false;
				state.isSuccess = true;
				state.cart = payload.cart;
				state.cart_details = payload.cart_details;
			}
		},
		[cartList.pending]: (state) => {
			state.isSuccess = false;
			state.isFetching = true;
			state.isError = false;
			state.errorMessage = "";
		},
		[cartList.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload?.message;
		},
		[shippingMethods.fulfilled]: (state, { payload }) => {
			if (payload.code) {
				state.isFetching = false;
				state.isError = true;
				state.isSuccess = false;
				state.errorMessage = payload?.message;
			} else {
				state.isError = false;
				state.isFetching = false;
				state.isSuccess = true;
				state.shipping_methods = payload.shipping_methods;
			}
		},
		[shippingMethods.pending]: (state) => {
			state.isSuccess = false;
			state.isFetching = true;
			state.isError = false;
			state.errorMessage = "";
		},
		[shippingMethods.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload?.message;
		},
		[paymentMethods.fulfilled]: (state, { payload }) => {
			if (payload.code) {
				state.isFetching = false;
				state.isError = true;
				state.isSuccess = false;
				state.errorMessage = payload?.message;
			} else {
				state.isError = false;
				state.isFetching = false;
				state.isSuccess = true;
				state.payment_methods = payload.payment_methods;
			}
		},
		[paymentMethods.pending]: (state) => {
			state.isSuccess = false;
			state.isFetching = true;
			state.isError = false;
			state.errorMessage = "";
		},
		[paymentMethods.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload?.message;
		},
		[checkout.fulfilled]: (state, { payload }) => {
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
		[checkout.pending]: (state) => {
			state.isSuccess = false;
			state.isCheckoutFetching = true;
			state.isError = false;
			state.errorMessage = "";
		},
		[checkout.rejected]: (state, { payload }) => {
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload?.message;
		},
	},
});

export const { clearCartState, clearCartDetails } = cartSlice.actions;
export const cartSelector = (state) => state.cart;
