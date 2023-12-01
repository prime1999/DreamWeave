import { createSlice } from "@reduxjs/toolkit";

type UserInfo = {
	// Define the properties of UserInfo as needed
	username: string;
	email: string;
	// ...
};

type initialStateType = {
	userInfo: UserInfo | null;
};

const storedUserInfoString = localStorage.getItem("userInfo");
const parsedUserInfo: UserInfo | null = storedUserInfoString
	? JSON.parse(storedUserInfoString)
	: null;

const initialState: initialStateType = {
	userInfo: parsedUserInfo,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.userInfo = action.payload;

			localStorage.setItem("userInfo", JSON.stringify(action.payload));
		},
	},
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
