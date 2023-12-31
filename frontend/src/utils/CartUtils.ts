import { ProductType } from "@/DataTypes/ProductType";

export const getDecimal = (num: number) => {
	return Number(Math.round((num * 100) / 100).toFixed(2));
};

type cartStateType = {
	cartItems: ProductType[];
	_id?: string;
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

	state.shippingPrice = getDecimal(state.itemsPrice > 100 ? 0 : 10);

	state.taxPrice = getDecimal(Number((0.15 * state.itemsPrice).toFixed(2)));

	state.totalPrice = getDecimal(
		state.itemsPrice + state.shippingPrice + state.taxPrice
	);
	localStorage.setItem("Cart", JSON.stringify(state));

	return state;
};

export const setLocalCart = (items: any) => {
	localStorage.setItem("Cart", JSON.stringify(items));
};

export const cartPrice = (cart: any) => {
	const cartItems = cart[0].items;
	const cartTotal = cartItems.reduce((acc: any, item: any) => {
		acc += item.product.price;
		return acc;
	}, 0);
	return cartTotal;
};
