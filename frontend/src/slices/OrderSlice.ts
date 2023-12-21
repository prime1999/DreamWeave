import { apiSlice } from "./ApiSlice";
import { ORDER_URL, PAYPAL_URL } from "@/Contants";

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
		getAllOrders: builder.query({
			query: () => ({
				url: `${ORDER_URL}/all`,
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
		payOrder: builder.mutation<any, any>({
			query: ({ orderId, details }) => ({
				url: `${ORDER_URL}/payOrder/${orderId}`,
				method: "PUT",
				body: { ...details },
			}),
		}),
		deleteOrder: builder.mutation<string, any>({
			query: (orderId) => ({
				url: `${ORDER_URL}/deleteOrder/${orderId}`,
				method: "DELETE",
			}),
		}),
		getPayPalClientId: builder.query<any, any>({
			query: () => ({
				url: `${PAYPAL_URL}`,
			}),
		}),
		updateOrder: builder.mutation<any, any>({
			query: ({ orderId, details }) => ({
				url: `${ORDER_URL}/updateOrder/${orderId}`,
				method: "PUT",
				body: { ...details },
			}),
		}),
		getSalesRevenue: builder.query({
			query: () => ({
				url: `${ORDER_URL}/sales/totalRevenue`,
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
export const useGetAllOrdersQuery = OrderSlice.endpoints.getAllOrders.useQuery;
//
export const useGetAnOrderQuery = OrderSlice.endpoints.getAnOrder.useQuery;
//
export const useGetPayPalClientIdQuery =
	OrderSlice.endpoints.getPayPalClientId.useQuery;
//
export const usePayOrderMutation = OrderSlice.endpoints.payOrder.useMutation;
//
export const useDeleteOrderMutation =
	OrderSlice.endpoints.deleteOrder.useMutation;
//
export const useUpdateOrderMutation =
	OrderSlice.endpoints.updateOrder.useMutation;
//
export const useGetSalesRevenueQuery =
	OrderSlice.endpoints.getSalesRevenue.useQuery;
