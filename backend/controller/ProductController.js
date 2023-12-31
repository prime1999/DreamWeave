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
			.populate("user", "-password")
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
		const products = await Product.find({}).populate("user", "-password");
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
		// find products based on there category
		const categoryRegex = new RegExp(req.params.category, "i");
		const products = await Product.find({ category: categoryRegex });

		// send the found products to the frontend
		res.status(200).json(products);
	} catch (error) {
		// if an error occurs in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

// --------------------------------- function to get productswith similar category ------------------------ //
const getProductsWithSimilarCategory = asyncHandler(async (req, res) => {
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
		// create the data to send to the DB
		const productData = {
			user: req.user._id,
			name: req.body.name,
			brand: req.body.brand,
			image: req.body.image,
			category: req.body.category,
			description: req.body.desc,
			rating: req.body.rating,
			price: req.body.price,
			countInStock: req.body.countInStock,
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

// ---------------------------- function to delete a product -------------------------------- //
const deleteProduct = asyncHandler(async (req, res) => {
	// check if the user is authorized
	const userExist = await User.findById(req.user._id);

	// if no:
	if (!userExist) {
		throw new Error("User not authorized");
	}

	// if yes
	// make a try-catch block
	try {
		// find the product by it's id and delete
		const deletedProduct = await Product.findOneAndDelete({
			_id: req.params.id,
		});
		// send the deleted roduct to the frontend
		res.status(200).json(deletedProduct);
	} catch (error) {
		// if an error occurs in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

// ------------------------------ function to update the products ------------------------------- //
const updateProduct = asyncHandler(async (req, res) => {
	// check if the user is authorized
	const userExist = await User.findById(req.user._id);

	// if no:
	if (!userExist) {
		throw new Error("User not authorized");
	}

	// if yes
	// make a try-catch block
	try {
		// get the product details sent from the frontend
		const productDetails = req.body;
		// get the product to be updated from the DB
		const product = await Product.findOne({ _id: req.params.id });
		// iterate over the productDetails
		for (const key in productDetails) {
			// check if the key exist in the product object
			if (Object.hasOwnProperty.call(productDetails, key)) {
				// get the value of the current key
				const value = productDetails[key];
				// if key exist in the product
				product[key] = value;
			} else {
				// if key does not exist
				throw new Error(`${key} is not valid`);
			}
		}
		// save the updated product to the DB
		await product.save();
		// send the product to the frontend
		res.status(200).json(product);
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
	getProductsWithSimilarCategory,
	addProduct,
	deleteProduct,
	updateProduct,
};
