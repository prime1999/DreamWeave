import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";

// ------------------------- function to get all the products in the DB based on pagination ----------------------------- //
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

// ---------------------------- function to get all the products in the DB ----------------------------------- //
const getAllProducts = asyncHandler(async (req, res) => {
	try {
		// get all the products in the DB
		const products = await Product.find({});
		// send the products to the frontend
		res.status(200).json(products);
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

// ---------------------------- funcntion to get a single product ------------------------------------ //
const getSingleProduct = asyncHandler(async (req, res) => {
	// make a try-catch block
	try {
		// get the product that as has the same id as the d sent from the frontend from the DB
		const product = await Product.findById(req.params.productId);
		// send the found product to the frontend
		res.status(200).json(product);
	} catch (error) {
		// if an error occurs in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

// --------------------------------- function to get products based on there category ------------------------ //
const getProductsByCategory = asyncHandler(async (req, res) => {
	// make a try-catch block
	try {
		// get the product that as has the same id as the d sent from the frontend from the DB
		const product = await Product.find({ _id: req.params.productId });
		// show error message if the product does noot exist in the DB
		if (!product) {
			throw new Error("Product not in stock");
		}
		// find the products that have the same brand as the brand in the found product
		const products = await Product.find({ category: product[0].category });
		// send the found products to the frontend
		res.status(200).json(products);
	} catch (error) {
		// if an error occurs in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

// --------------------------- function to add a product -------------------------------- //
const addProduct = asyncHandler(async (req, res) => {
	// check if the user is authorized
	const userExist = await User.findById(req.user._id);

	// if no:
	if (!userExist) {
		throw new Error("User not authorized");
	}

	// if yes
	// make a try-catch block
	try {
		// get the data object sent with the request
		const { productDetails } = req.body;
		// create the data to send to the DB
		const productData = {
			user: req.user._id,
			name: productDetails.name,
			brand: productDetails.brand,
			image: productDetails.image,
			category: productDetails.category,
			description: productDetails.desc,
			rating: productDetails.rating,
			price: productDetails.price,
			countInStock: productDetails.countInStock,
			reviews: [],
		};
		// create the product
		const newProduct = await Product.create(productData);
		// send the new product to the frontend
		res.status(201).json(newProduct);
	} catch (error) {
		// if an error occurs in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

export {
	getProducts,
	getAllProducts,
	getHighlyRatedProducts,
	getSingleProduct,
	getProductsByCategory,
	addProduct,
};
