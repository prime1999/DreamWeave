import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/ApiSlice";
import CartSliceReducer from "@/slices/CartSlice";

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		cart: CartSliceReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});

export default store;
