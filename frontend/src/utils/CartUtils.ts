import { ProductType } from "@/DataTypes/ProductType";

export const getDecimal = (num: number) => {
	return Number(Math.round((num * 100) / 100).toFixed(2));
};

type cartStateType = {
	cartItems: ProductType[];
	itemsPrice?: number;
	shippingPrice?: number;
	taxPrice?: number;
	totalPrice?: number;
};

export const updateCart = (state: cartStateType) => {
	// to get the total item price of the products in the cart
	const num = state.cartItems.reduce((acc, item) => {
		// Check if item.qty is defined before using it in the calculation
		const quantity = item.qty !== undefined ? item.qty : 0;
		return acc + item.price * quantity;
	}, 0);

	state.itemsPrice = getDecimal(num);

	//state.shippingPrice = getDecimal(state.itemsPrice > 100 ? 10 : 0);

	//state.taxPrice = getDecimal(Number((0.15 * state.itemsPrice).toFixed(2)));

	state.totalPrice = getDecimal(state.itemsPrice);
	localStorage.setItem("Cart", JSON.stringify(state));

	return state;
};
