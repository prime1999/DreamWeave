import { CART_URL } from "@/Contants";
import { apiSlice } from "./ApiSlice";

export const CartApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		addToCart: builder.mutation<any, any>({
			query: (cartDetails) => ({
				url: `${CART_URL}/addToCart`,
				method: "POST",
				body: cartDetails,
			}),
		}),
		getUserCart: builder.query<any, any>({
			query: () => ({
				url: `${CART_URL}`,
			}),
			keepUnusedDataFor: 5,
			providesTags: ["Cart"],
		}),
		removeItemFromCart: builder.mutation<any, any>({
			query: (itemId) => ({
				url: `${CART_URL}/removeItem`,
				method: "PATCH",
				body: itemId,
			}),
		}),
		clearCart: builder.mutation<any, any>({
			query: () => ({
				url: `${CART_URL}/clearCart`,
				method: "DELETE",
			}),
		}),
	}),
});

//
export const useAddToCartMutation =
	CartApiSlice.endpoints.addToCart.useMutation;
//
export const useGetUserCartQuery = CartApiSlice.endpoints.getUserCart.useQuery;
//
export const useRemoveItemFromCartMutation =
	CartApiSlice.endpoints.removeItemFromCart.useMutation;
//
export const useClearCartMutation =
	CartApiSlice.endpoints.clearCart.useMutation;
