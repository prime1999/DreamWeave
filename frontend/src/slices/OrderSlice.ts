import { apiSlice } from "./ApiSlice";
import { ORDER_URL } from "@/Contants";

export const OrderSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		placeOrder: builder.mutation<any, any>({
			query: (orderDetails) => ({
				url: `${ORDER_URL}/placeOrder`,
				method: "POST",
				body: orderDetails,
			}),
		}),
		getUserOrder: builder.query<any, any>({
			query: ({}) => ({
				url: `${ORDER_URL}`,
			}),
			keepUnusedDataFor: 5,
			providesTags: ["Order"],
		}),
		getAnOrder: builder.query<any, any>({
			query: (orderId) => ({
				url: `${ORDER_URL}`,
				params: orderId,
			}),
		}),
	}),
});

//
export const usePlaceOrderMutation =
	OrderSlice.endpoints.placeOrder.useMutation;
//
export const useGetUserOrderQuery = OrderSlice.endpoints.getUserOrder.useQuery;
//
export const useGetAnOrderQuery = OrderSlice.endpoints.getAnOrder.useQuery;