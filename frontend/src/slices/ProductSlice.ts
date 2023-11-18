import { PRODUCTS_URL } from "@/Contants";
import { apiSlice } from "./ApiSlice";
import { DataType } from "@/DataTypes/DataType";

export const productSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query<DataType, any>({
			query: ({ pageNumber }) => ({
				url: PRODUCTS_URL as string,
				params: {
					pageNumber,
				},
			}),
			keepUnusedDataFor: 5,
			providesTags: ["Product"],
		}),
	}),
});

// Import useGetProductsQuery directly from productSlice.endpoints
export const useGetProductsQuery = productSlice.endpoints.getProducts.useQuery;
