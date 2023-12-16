import { USERS_URL } from "@/Contants";
import { apiSlice } from "./ApiSlice";
import { UserType } from "@/DataTypes/UserType";

// inject the register users API into the apiSlice created
export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// use the mutate on the function (for handling data changes)
		registerUser: builder.mutation<UserType, any>({
			query: (userData) => ({
				url: `${USERS_URL}/registerUser`,
				method: "POST",
				body: userData,
			}),
		}),
		logUserIn: builder.mutation<UserType, any>({
			query: (userData) => ({
				url: `${USERS_URL}/authUser`,
				method: "POST",
				body: userData,
			}),
		}),
		updateUser: builder.mutation<any, any>({
			query: (updateDetails) => ({
				url: `${USERS_URL}/updateUser`,
				method: "PATCH",
			}),
		}),
		logUserOut: builder.mutation<any, any>({
			query: (cartItems) => ({
				url: `${USERS_URL}/logUserOut`,
				method: "POST",
				body: cartItems,
			}),
		}),
	}),
});

export const useRegisterUserMutation =
	userApiSlice.endpoints.registerUser.useMutation;
export const useLogUserInMutation =
	userApiSlice.endpoints.logUserIn.useMutation;
export const useLogUserOutMutation =
	userApiSlice.endpoints.logUserOut.useMutation;
