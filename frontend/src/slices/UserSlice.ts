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
	}),
});

export const useRegisterUserMutation =
	userApiSlice.endpoints.registerUser.useMutation;
