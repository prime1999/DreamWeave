import {
	fetchBaseQuery,
	createApi,
	BaseQueryFn,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
	FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/Contants";

// Define your base query function
const baseQuery: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError,
	{},
	FetchBaseQueryMeta
> = fetchBaseQuery({
	baseUrl: BASE_URL as string, // Explicitly cast PRODUCTS_URL to primitive string
});

export const apiSlice = createApi({
	baseQuery,
	tagTypes: ["Product", "Cart", "Order", "User"],
	endpoints: () => ({}), // You can define your endpoints here
});
