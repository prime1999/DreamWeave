import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import Cart from "../models/CartModel.js";
import Order from "../models/OrderModel.js";
import { calcPrice } from "../Utils/CalcPrice.js";

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
		const { shippingAddress, paymentMethod } = req.body;
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

// --------------------------- function to get the order of a user ------------------------------- //
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
			throw new Error("User had not placed any order");
		}
		// if the order was found then send the order to the frontend
		res.status(200).json(userOrder);
	} catch (error) {
		// if an error occured in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

export { placeOrder, getUserOrder };
