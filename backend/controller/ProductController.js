import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";

// ------------------------- function to get all the products in the DB ----------------------------- //
const getProducts = asyncHandler(async (req, res) => {
	// make a try-catch block
	try {
		// get the products from the frontend
		const products = await Product.find({});
		// if there are no products in the DB, then
		if (!products) {
			// throw an error
			throw new Error("No product available");
		}
		// if there are send them to the frontend
		res.status(200).json(products);
	} catch (error) {
		// if an error occured in te try block
		res.status(400);
		throw new Error(error.message);
	}
});

export { getProducts };
