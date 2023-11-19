import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "@/DataTypes/ProductType";
import { updateCart } from "@/utils/CartUtils";

type cartStateType = {
	cartItems: ProductType[];
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
		clearCartItems: (state) => {
			state.cartItems = [];
			return updateCart(state);
		},
	},
});

export const { addToCart, clearCartItems } = cartSlice.actions;

export default cartSlice.reducer;
