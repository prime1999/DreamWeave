import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/UserModel.js";
import Cart from "../models/CartModel.js";
import Order from "../models/OrderModel.js";
import Revenue from "../models/RevenueModel.js";
import { calcPrice } from "../Utils/CalcPrice.js";
import { formatDate } from "../Utils/FormatDate.js";
import { verifyPayPalPayment, checkIfNewTransaction } from "../Utils/paypal.js";

// ------------------------------ function to place an order ------------------------------------- //
const placeOrder = asyncHandler(async (req, res) => {
	// check if the user is authorized
	const userExist = await User.findById(req.user._id);

	// if no:
	if (!userExist) {
		throw new Error("User not authorized");
	}
	// if yes
	// make a try-catch block
	try {
		// get the following info from the request body
		const { shippingDetails, paymentMethod } = req.body;
		const { shippingAddress, phoneNumber } = shippingDetails;
		// find the cart of items the user wants to order using the user's id
		const orderCart = await Cart.find({ user: req.user._id }).populate(
			"items.product"
		);

		if (!orderCart) {
			throw new Error("cart not found");
		}

		// calculate the prices needed for the order
		const { shippingPrice, taxPrice, itemsPrice, totalPrice } = calcPrice(
			orderCart[0].items
		);
		// create the user's order and save it to the DB
		const newOrder = await Order.create({
			user: req.user._id,
			items: orderCart[0].items,
			itemsPrice,
			shippingAddress,
			contactInfo: phoneNumber,
			paymentMethod,
			shippingPrice,
			taxPrice,
			totalAmount: totalPrice,
			status: "pending",
		});
		// send there response to the frontend
		res.status(201).json(newOrder);
	} catch (error) {
		// if an error occured in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

// --------------------------- function to get all the order of a user ------------------------------- //
const getUserOrder = asyncHandler(async (req, res) => {
	// check if the user is authorized
	const userExist = await User.findById(req.user._id);

	// if no:
	if (!userExist) {
		throw new Error("User not authorized");
	}
	// if yes
	// make a try-catch block
	try {
		// find the user's order in the DB
		const userOrder = await Order.find({ user: req.user._id }).populate(
			"items.product"
		);
		// if the user has not placed any orders, the
		if (!userOrder) {
			throw new Error("User has not placed any order");
		}
		// if the order was found then send the order to the frontend
		res.status(200).json(userOrder);
	} catch (error) {
		// if an error occured in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

// ------------------------------- function to get all orders placed by users ----------------------------------- //
const getOrders = asyncHandler(async (req, res) => {
	// check if the user is authorized
	const userExist = await User.findById(req.user._id);

	// if no:
	if (!userExist) {
		throw new Error("User not authorized");
	}
	// if yes
	// make a try-catch block
	try {
		// get all theh placed orders
		const orders = await Order.find({});
		// send the orders to the frontend
		res.status(200).json(orders);
	} catch (error) {
		// if an error occured in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

// ------------------------- function to get a certain order of a user ---------------------------------- //
const getOneOrder = asyncHandler(async (req, res) => {
	// check if the user is authorized
	const userExist = await User.findById(req.user._id);

	// if no:
	if (!userExist) {
		throw new Error("User not authorized");
	}
	// if yes
	// make a try-catch block
	try {
		// check if the order is in the database
		const order = await Order.find({
			_id: req.params.orderId,
			user: req.user._id,
		});
		// if the order is not in the DB
		if (order.length === 0) {
			throw new Error("Order not placed");
		}
		// if the order was found, then:
		res.status(200).json(order);
	} catch (error) {
		// if an error occured in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

// ------------------------- function to get orders based on there status ------------------------- //
const getStatusOrder = asyncHandler(async (req, res) => {
	// check if the user is authorized
	const userExist = await User.findById(req.user._id);

	// if no:
	if (!userExist) {
		throw new Error("User not authorized");
	}
	// if yes
	// make a try-catch block
	try {
		// get the order from the request params
		const orders = await Order.find({ status: req.params.status });
		// if there is no order of that status
		if (orders.length === 0) {
			res.status(200).json({ orders: [] });
		}
		// if there is an order of that status
		res.status(200).json({ orders: orders });
	} catch (error) {
		// if an error occured in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

// ------------------------------ function to update order to paid ----------------------------------- //
const payOrder = asyncHandler(async (req, res) => {
	// check if the user is authorized
	const userExist = await User.findById(req.user._id);

	// if no:
	if (!userExist) {
		throw new Error("User not authorized");
	}
	// if yes
	// make a try-catch block
	try {
		// check if the transaction is a new transaction
		const newTransaction = await checkIfNewTransaction(Order, req.body.id);
		// if the order is not a new transaction, then:
		if (!newTransaction) {
			throw new Order("Transaction has been used");
		}
		// verify the payment on paypal
		const { verified, value } = await verifyPayPalPayment(req.body.id);
		// if the paymant is not verified
		if (!verified) {
			throw new Error("Payment not verified");
		}
		// get the order from the request params
		const order = await Order.findById(req.params.orderId);
		// if the order was not found then
		if (!order) {
			throw new Error("order not placed");
		}
		// check if the order was cancelled
		if (order.status === "cancelled") {
			throw new Error("This Order was cancelled");
		}
		// get the amount to pay for the order
		const paidCorrectAmount = order.totalAmount.toString() === value;
		// if the correct amount is not what is been paid, then
		if (!paidCorrectAmount) {
			throw new Error("Incorrect Amoun paid");
		}
		// if all the checks is passed then we proceed
		order.isPaid = true;
		order.status = "processing";
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};
		// save the updated order to the DB
		const updatedOrder = await order.save();
		res.status(201).json(updatedOrder);
	} catch (error) {
		// if an error occured in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

// ------------------------------ function to delete an order ----------------------------------- //
const deleteOrder = asyncHandler(async (req, res) => {
	// check if the user is authorized
	const userExist = await User.findById(req.user._id);

	// if no:
	if (!userExist) {
		throw new Error("User not authorized");
	}
	// if yes
	// make a try-catch block
	try {
		const deletedOrder = await Order.findOneAndDelete({
			_id: req.params.orderId,
		});
		// show the deleted order in response
		res.json(200).json(deletedOrder);
	} catch (error) {
		// if an error occured in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

// -------------------------------- function to update shipping address ----------------------------------- //
const updateShippingAddress = asyncHandler(async (req, res) => {
	// check if the user is authorized
	const userExist = await User.findById(req.user._id);

	// if no:
	if (!userExist) {
		throw new Error("User not authorized");
	}
	// if yes
	// make a try-catch block
	try {
		// get the order based on it's Id
		const order = await Order.findById(req.params.orderId);
		const { contactInfo, shippingAddress } = req.body;
		if (contactInfo === "" || shippingAddress == {}) {
			throw new Error("No Update Info");
		}
		order.shippingAddress = shippingAddress;
		order.contactInfo = contactInfo;

		await order.save();
		res.status(200).json(order);
	} catch (error) {
		// if an error occured in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

// --------------------------- function to update order status ------------------------------ //
const updateOrderStatus = asyncHandler(async (req, res) => {
	// check if the user is authorized
	const userExist = await User.findById(req.user._id);

	// if no:
	if (!userExist) {
		throw new Error("User not authorized");
	}

	// if yes
	// make a try-catch block
	try {
		// get the order to update from the DB
		const order = await Order.findOne({ _id: req.params.id });
		// check if the order exist
		if (!order) {
			throw new Error("Order not found");
		}

		// update the other status
		order.status = req.body.status;
		// save the order to the database
		await order.save();
		// send the updated order to the frontend
		res.status(200).json(order);
	} catch (error) {
		// if an error occured in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

// ----------------------------------- function to get sales revenue ------------------------------ //

const getSalesRevenue = asyncHandler(async (req, res) => {
	// check if the user is authorized
	const userExist = await User.findById(req.user._id);

	// if no:
	if (!userExist) {
		throw new Error("User not authorized");
	}

	// if yes
	// make a try-catch block
	try {
		// get all orders that have been paid
		const paidOrders = await Order.find({ isPaid: true }).select(
			"totalAmount paymentResult.update_time"
		);

		// Get the current year and previous year
		const currentYear = new Date().getFullYear();
		const previousYear = currentYear - 1;

		// Initialize an object to store revenue data
		const revenueData = [];

		// loop through each previous and current year
		for (let year of [previousYear, currentYear]) {
			// loop through each month in both years
			for (let monthIndex = 1; monthIndex <= 12; monthIndex++) {
				// Convert update_time to a JavaScript Date object
				const checkDate = `${year}-${monthIndex}`;

				// Filter and map orders based on the condition
				const formattedOrders = paidOrders.map((order) => {
					const orderDate = formatDate(order.paymentResult.update_time);

					const check = orderDate === checkDate;

					return check ? order : { ...order, totalAmount: 0 };
				});

				const mappedOrder = formattedOrders.map((order) => ({
					year,
					month: monthIndex,
					sales: order.totalAmount,
				}));

				// Sum the totalAmount for each unique combination of year and monthIndex
				const groupedOrders = mappedOrder.reduce((acc, order) => {
					const key = `${order.year}-${order.month}`;

					if (!acc[key]) {
						acc[key] = {
							year: order.year,
							month: order.month,
							sales: 0,
						};
					}

					acc[key].sales += order.sales;

					return acc;
				}, {});

				// Push the grouped orders to the revenueData array
				revenueData.push(...Object.values(groupedOrders));
			}
		}

		const previousRevenue = [];
		const currentRevenue = [];

		revenueData.map((data) => {
			data.year === new Date().getFullYear()
				? currentRevenue.push(data)
				: previousRevenue.push(data);
		});

		await Revenue.deleteMany();
		await Revenue.insertMany(revenueData);
		// Do something with revenueData...

		res.json({ previousRevenue, currentRevenue });
	} catch (error) {
		// if an error occured in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

export {
	placeOrder,
	getUserOrder,
	getOrders,
	getStatusOrder,
	getOneOrder,
	payOrder,
	deleteOrder,
	updateShippingAddress,
	updateOrderStatus,
	getSalesRevenue,
};
