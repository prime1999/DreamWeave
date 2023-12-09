const getDecimal = (num) => {
	return Math.round((num * 100) / 100).toFixed(2);
};

export const calcPrice = (cartItems) => {
	const itemsPrice = cartItems.reduce(
		(acc, item) => acc + (item.product.price * 100 * item.quantity) / 100,
		0
	);

	const shippingPrice = itemsPrice > 100 ? 0 : 10;
	const taxPrice = Number(itemsPrice * 0.15);
	const totalPrice = Number(itemsPrice + shippingPrice + taxPrice);

	return {
		itemsPrice: getDecimal(itemsPrice),
		taxPrice: getDecimal(taxPrice),
		totalPrice: getDecimal(totalPrice),
		shippingPrice: getDecimal(shippingPrice),
	};
};
