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
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
