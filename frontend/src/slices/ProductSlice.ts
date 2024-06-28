import { PRODUCTS_URL, UPLOAD_URL } from "@/Contants";
import { apiSlice } from "./ApiSlice";
import { DataType } from "@/DataTypes/DataType";
import { ProductType } from "@/DataTypes/ProductType";

type dataType = {
	products: ProductType[];
	category: string;
	page: number;
	pages: number;
};

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
		getAllProducts: builder.query<DataType, any>({
			query: () => ({
				url: `${PRODUCTS_URL}/allProducts`,
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
		getProductsByCategory: builder.query<dataType, any>({
			query: ({ category }) => ({
				url: `${PRODUCTS_URL}/category/${category}`,
			}),
			keepUnusedDataFor: 5,
			providesTags: ["Product"],
		}),
		getProductsWithSimilarCategory: builder.query<ProductType[], any>({
			query: ({ productId }) => ({
				url: `${PRODUCTS_URL}/category/similar/${productId}`,
			}),
			keepUnusedDataFor: 5,
			providesTags: ["Product"],
		}),
		addProduct: builder.mutation<any, any>({
			query: ({ productDetails }) => ({
				url: `${PRODUCTS_URL}/product/add`,
				method: "POST",
				body: { ...productDetails },
			}),
		}),
		updateProduct: builder.mutation<any, any>({
			query: ({ productDetails, id }) => ({
				url: `${PRODUCTS_URL}/update/product/${id}`,
				method: "PUT",
				body: { ...productDetails },
			}),
		}),
		deleteProduct: builder.mutation<any, any>({
			query: (id) => ({
				url: `${PRODUCTS_URL}/delete/${id}`,
				method: "DELETE",
			}),
		}),
		filterProduct: builder.mutation<any, any>({
			query: (details) => ({
				url: `${PRODUCTS_URL}/filterProducts`,
				method: "POST",
				body: details,
			}),
		}),
		uploadProductImage: builder.mutation<any, any>({
			query: (data) => ({
				url: `${UPLOAD_URL}`,
				method: "POST",
				body: data,
			}),
		}),
	}),
});

// Import useGetProductsQuery directly from productSlice.endpoints
export const useGetProductsQuery = productSlice.endpoints.getProducts.useQuery;
// Import useGetProductsQuery directly from productSlice.endpoints
export const useGetAllProductsQuery =
	productSlice.endpoints.getAllProducts.useQuery;
//
export const useGetHighlyRatedProductsQuery =
	productSlice.endpoints.getHighlyRatedProducts.useQuery;
//
export const useGetSinlgeProductQuery =
	productSlice.endpoints.getSingleProduct.useQuery;
//
export const useGetProductsByCategoryQuery =
	productSlice.endpoints.getProductsByCategory.useQuery;
//
export const useGetProductsWithSimilarCategoryQuery =
	productSlice.endpoints.getProductsWithSimilarCategory.useQuery;
//
export const useAddProductMutation =
	productSlice.endpoints.addProduct.useMutation;
//
export const useUpdateProductMutation =
	productSlice.endpoints.updateProduct.useMutation;
//
export const useDeleteProductMutation =
	productSlice.endpoints.deleteProduct.useMutation;
//
export const useFilterProductMutation =
	productSlice.endpoints.filterProduct.useMutation;
//
export const useUploadProductImageMutation =
	productSlice.endpoints.uploadProductImage.useMutation;
