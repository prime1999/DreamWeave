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
	console.log(sales);
	return sales;
};