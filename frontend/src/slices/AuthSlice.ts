import { createSlice } from "@reduxjs/toolkit";

type UserInfo = {
	username: string;
	email: string;
	isAdmin: boolean;
	_id: string;
	cart: object;
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
		// function to set the user details to the localstorage and redux auth store
		setCredentials: (state, action) => {
			// store to the redux auth store
			state.userInfo = action.payload;
			// save the details to local storage
			localStorage.setItem("userInfo", JSON.stringify(action.payload));
			// Calculate the milliseconds in 30 days
			const millisecondsInADay = 24 * 60 * 60 * 1000;
			const millisecondsIn30Days = 30 * millisecondsInADay;
			// log the current user out after 30 days
			setTimeout(() => {
				if (state.userInfo !== null) {
					state.userInfo = null;
				}
			}, millisecondsIn30Days);
		},
		// function to clear the userInfo from the local storage and redux auth store (log a user out)
		logOut: (state) => {
			// clear the state
			state.userInfo = null;
			// clear the local storage
			localStorage.clear();
		},
		clearUserInfoCart: (state) => {
			// cler the cart in the userInfo
			state.userInfo = {
				...(state.userInfo as UserInfo),
				cart: {},
			};
			// save the details to local storage
			localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
		},
	},
});

export const { setCredentials, logOut, clearUserInfoCart } = authSlice.actions;

export default authSlice.reducer;
