import asyncHandler from "../middleware/asyncHandler.js";
import Cart from "../models/CartModel.js";

// --------------------------------- function to add products to cart ------------------------------- //
const addToCart = asyncHandler(async (req, res) => {
	// make a try-catch block
	try {
		// create the cart data to send to the DB
		const cartData = {
			items: [req.body],
			user: req.user._id,
		};
		// add the details sent from the cart data to the DB
		const cart = await Cart.create(cartData);
		// send the result to the frontend
		res.status(201).json(cart);
	} catch (error) {
		// if an error occured in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

// --------------------------------------- function to get the cart items of a user --------------------- //

export { addToCart };
