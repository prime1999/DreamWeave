import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "@/DataTypes/ProductType";
import { updateCart } from "@/utils/CartUtils";

type cartStateType = {
	cartItems: ProductType[];
	user?: string;
};

const storedCartData = localStorage.getItem("Cart");
const initialState: cartStateType = storedCartData
	? JSON.parse(storedCartData)
	: { cartItems: [] };

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			// get the product to add to the cart
			const item = action.payload;
			// check if the item alreadwy exist in the cart
			const itemExist =
				state.cartItems && state.cartItems.find((x) => x._id === item._id);
			if (!itemExist) {
				state.cartItems = [...state.cartItems, item];
			} else {
				state.cartItems = state.cartItems.map((x) =>
					x._id === item._id ? item : x
				);
			}

			updateCart(state);
		},
		removeItem: (state, action) => {
			state.cartItems = state.cartItems.filter(
				(item) => item._id !== action.payload
			);
			return updateCart(state);
		},
		clearCartItems: (state) => {
			state.cartItems = [];
			return updateCart(state);
		},
	},
});

export const { addToCart, clearCartItems, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
