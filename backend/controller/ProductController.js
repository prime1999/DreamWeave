import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";

// ------------------------- function to get all the products in the DB ----------------------------- //
const getProducts = asyncHandler(async (req, res) => {
	// make a try-catch block
	try {
		// get the page size form the .env file
		const pageSize = process.env.PAGE_SIZE;
		// get the page number query from the frontend or use one incase there is none
		const page = Number(req.query.pageNumber) || 1;
		// get the number of documents available in the produts collection in the DB
		const count = await Product.countDocuments({});
		// get the products from the frontend
		const products = await Product.find({})
			// linit the number of products to get to the page size you want
			.limit(pageSize)
			// leave out the once that are not to be on the page
			.skip(pageSize * (page - 1));
		// if there are no products in the DB, then
		if (!products) {
			// throw an error
			throw new Error("No product available");
		}
		// if there are send them to the frontend
		res
			.status(200)
			.json({ products, page, pages: Math.ceil(count / pageSize) });
	} catch (error) {
		// if an error occured in te try block
		res.status(400);
		throw new Error(error.message);
	}
});

// --------------------------- function to get highly rated products (>= 4.5) ----------------------------- //
const getHighlyRatedProducts = asyncHandler(async (req, res) => {
	try {
		// find the products in the DB that have their rating above 4.5
		const products = await Product.find({ rating: { $gt: 4.5 } });
		// send the products to the frontend
		res.status(200).json(products);
	} catch (error) {
		// if an error occurs in the try block, then:
		res.satus(400);
		throw new Error(error.message);
	}
});

export { getProducts, getHighlyRatedProducts };
