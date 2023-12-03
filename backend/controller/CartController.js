import asyncHandler from "../middleware/asyncHandler.js";
import Cart from "../models/CartModel.js";

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
		// send the result to the frontend
		res.status(201).json(newCart);
	} catch (error) {
		// if an error occured in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

// --------------------------------------- function to get the cart items of a user --------------------- //

export { addToCart };
