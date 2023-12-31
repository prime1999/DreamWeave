import asyncHandler from "../middleware/asyncHandler.js";
import Cart from "../models/CartModel.js";
import User from "../models/UserModel.js";

// --------------------------------- function to add products to cart ------------------------------- //
const addToCart = asyncHandler(async (req, res) => {
	// make a try-catch block
	try {
		// Check if the product already exists in the cart
		const existingCartItem = await Cart.findOne({
			user: req.user._id,
			"items.product": req.body.product,
		});

		if (existingCartItem) {
			throw new Error("item already in cart");
		}

		// Use findOneAndUpdate to add the item to the cart
		const newCart = await Cart.findOneAndUpdate(
			{ user: req.user._id },
			{
				$addToSet: {
					// Use $addToSet to add the item only if it doesn't exist in the cart
					items: { product: req.body.product, quantity: req.body.quantity },
				},
			},
			{ upsert: true, new: true }
		);

		if (!newCart) {
			const cartDetails = {
				user: req.user._id,
				cartItems: [{ product: req.body.product, quantity: req.body.quantity }],
			};
			const cart = await Cart.create(cartDetails);
			res.status(201).json(cart);
		}
		// send the result to the frontend
		res.status(201).json(newCart);
	} catch (error) {
		// if an error occured in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

// ------------------------------------- function to get the cart items of a user -------------------------- //
const getUserCart = asyncHandler(async (req, res) => {
	// check if the user is authorized
	const userExist = await User.findById(req.user._id);

	// if no:
	if (!userExist) {
		throw new Error("User not authorized");
	}
	// if yes
	// make a try-catch block
	try {
		// get the cart based on the user id
		const cart = await Cart.find({ user: req.user._id }).populate(
			"items.product"
		);
		// if no cart was found then
		if (!cart) {
			throw new Error("No items in user's cart");
		}
		// add the quantity to each product in the cart
		const cartItems = cart[0].items.map((item) => {
			const productObject = item.product.toObject(); // Convert the Mongoose document to a plain object
			productObject.qty = item.quantity; // Add the qty property
			return productObject;
		});

		// if an item is in the user's cart, then send the cartItems to the frontend
		res.status(200).json({ _id: cart[0]._id, cartItems });
	} catch (error) {
		// if an error occured in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

// ------------------------------- function to update cart item ----------------------------- //
const removeCartItem = asyncHandler(async (req, res) => {
	// check if the user is authorized
	const userExist = await User.findById(req.user._id);

	// if the user does not exist, then
	if (!userExist) {
		throw new Error("User not authorized");
	}

	// if the user is authorized, then
	// make a try-catch block
	try {
		// find the user's cart and update
		const newCart = await Cart.findOneAndUpdate(
			{ user: req.user._id },
			{ $pull: { items: { product: req.body.itemId } } },
			{ new: true }
		);

		res.status(200).json(newCart);
	} catch (error) {
		// if an error occured in the try block then
		res.status(400);
		throw new Error(error.message);
	}
});

// ------------------------------- function to clear all items in a cart ------------------------------ //
const clearAllItems = asyncHandler(async (req, res) => {
	// check if the user is authorized
	const userExist = await User.findById(req.user._id);

	// if the user does not exist, then
	if (!userExist) {
		throw new Error("User not authorized");
	}

	// if the user is authorized, then
	// make a try-catch block
	try {
		// find the user's cart and delete it
		await Cart.findOneAndDelete({ user: req.user._id });
		//send a success message to the frontend
		res.status(200).json({ messae: "Cart cleared" });
	} catch (error) {
		// if an error occured in the try block then
		res.status(400);
		throw new Error(error.message);
	}
});

export { addToCart, getUserCart, removeCartItem, clearAllItems };
