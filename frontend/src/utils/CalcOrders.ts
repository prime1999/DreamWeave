// fuctions to deal with orders calculation
// function to calculate the total sales
export const calcSales = (data: any) => {
	// get the paid orders
	const paidOrders = data.filter((order: any) => order.isPaid);
	// calculate the sum of the amount paid for the orders
	const sales = paidOrders.reduce((acc: any, order: any) => {
		acc += order.totalAmount;
		return acc;
	}, 0);

	return sales;
};

// function to calculate total price of orders
export const calcOrders = (data: any) => {
	// calculate the sum of the amount for the orders
	const sales = data.reduce((acc: any, order: any) => {
		acc += order.totalAmount;
		return acc;
	}, 0);
	return sales;
};

// functio to get the orders length based on there status
export const calcOrdersLength = (orders: any, status: string) => {
	// filter the orders
	const filteredOrders = orders?.filter(
		(order: any) => order.status === status
	);
	// return te length of the filtered orders
	return filteredOrders.length;
};
