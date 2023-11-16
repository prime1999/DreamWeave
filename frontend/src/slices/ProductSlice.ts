import { PRODUCTS_URL } from "@/Contants";
import { apiSlice } from "./ApiSlice";
import { ProductType } from "@/DataTypes/ProductType";

export const productSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query<ProductType[], undefined>({
			query: () => ({
				url: PRODUCTS_URL as string,
			}),
			keepUnusedDataFor: 5,
			providesTags: ["Product"],
		}),
	}),
});

// Import useGetProductsQuery directly from productSlice.endpoints
export const useGetProductsQuery = productSlice.endpoints.getProducts.useQuery;
