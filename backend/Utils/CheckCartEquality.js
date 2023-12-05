export const isEqual = (localCart, dbCart) => {
	if (!localCart || !dbCart) {
		return false;
	}

	if (localCart.length !== dbCart.items.length) {
		return false;
	}

	for (let i = 0; i < localCart.length; i++) {
		const item1 = localCart[i];
		const item2 = dbCart.items[i];

		if (item1.qty !== item2.quantity) {
			return false;
		}
	}

	return true;
};
