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
	}),
});

export const useAddToCartMutation =
	CartApiSlice.endpoints.addToCart.useMutation;
