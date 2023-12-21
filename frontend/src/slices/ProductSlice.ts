import { PRODUCTS_URL } from "@/Contants";
import { apiSlice } from "./ApiSlice";
import { DataType } from "@/DataTypes/DataType";
import { ProductType } from "@/DataTypes/ProductType";

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
		getHighlyRatedProducts: builder.query<ProductType[], any>({
			query: () => ({
				url: `${PRODUCTS_URL}/highlyRated`,
			}),
			keepUnusedDataFor: 5,
			providesTags: ["Product"],
		}),
		getSingleProduct: builder.query<ProductType, any>({
			query: ({ productId }) => ({
				url: `${PRODUCTS_URL}/${productId}`,
			}),
			keepUnusedDataFor: 5,
			providesTags: ["Product"],
		}),
		getProductsByCategory: builder.query<ProductType[], any>({
			query: ({ productId }) => ({
				url: `${PRODUCTS_URL}/category/${productId}`,
			}),
			keepUnusedDataFor: 5,
			providesTags: ["Product"],
		}),
	}),
});

// Import useGetProductsQuery directly from productSlice.endpoints
export const useGetProductsQuery = productSlice.endpoints.getProducts.useQuery;
//
export const useGetHighlyRatedProductsQuery =
	productSlice.endpoints.getHighlyRatedProducts.useQuery;
//
export const useGetSinlgeProductQuery =
	productSlice.endpoints.getSingleProduct.useQuery;
//
export const useGetProductsByCategoryQuery =
	productSlice.endpoints.getProductsByCategory.useQuery;
