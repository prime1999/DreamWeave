import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/ApiSlice";
import CartSliceReducer from "@/slices/CartSlice";
import AuthSliceReducer from "@/slices/AuthSlice";

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		cart: CartSliceReducer,
		auth: AuthSliceReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});

export default store;
