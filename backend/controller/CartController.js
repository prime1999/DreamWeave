import asyncHandler from "../middleware/asyncHandler.js";
import Cart from "../models/CartModel.js";

// --------------------------------- function to add products to cart ------------------------------- //
const addToCart = asyncHandler(async (req, res) => {
	// make a try-catch block
	try {
		// add the details sent from the front end to the DB
		const cart = await Cart.create(req.body);
		// send the result to the frontend
		res.status(201).json(cart);
	} catch (error) {
		// if an error occured in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

export { addToCart };
