import User from "../models/UserModel.js";
import Cart from "../models/CartModel.js";
import { isEqual } from "../Utils/CheckCartEquality.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../Utils/GenerateToken.js";

// ------------------------ function to register a user ------------------------------------ //
const registerUser = asyncHandler(async (req, res) => {
	// make a try-catch block
	try {
		// get the details entered by the user from the request body
		const { name, email, password } = req.body;
		// check if the user already exist
		const userExist = await User.findOne({ email });
		// if the  user exist then:
		if (userExist) {
			// send an error message back to the frontend
			throw new Error("User already exist");
		}
		// if the user doesn't exist, then:
		// use the details to create the data to send to the DB
		const userData = {
			name,
			email,
			password,
		};
		// create the user in the DB
		const user = await User.create(userData);
		// if the user has been created then
		if (user) {
			// generate a token using the user's id
			generateToken(res, user._id);
			// send this details back to the frontend
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			});
		}
	} catch (error) {
		// if an error occured in the try block, then
		res.status(400);
		throw new Error(error.message);
	}
});
// ----------------------------- function to authorize a user ----------------------------- //
const authUser = asyncHandler(async (req, res) => {
	// make a try-catch block
	try {
		// get the user's details from the request body
		const { email, password } = req.body;
		// check if the user is registered
		const user = await User.findOne({ email });

		// if the user has been registered then:
		if (user && (await user.matchPassword(password))) {
			generateToken(res, user._id);
			// check if the user has any items in their cart
			const checkCart = await Cart.find({ user: user._id }).populate(
				"items.product"
			);
			let cartItems;
			if (checkCart.length > 0) {
				// add the quantity to each product in the cart
				cartItems = checkCart[0].items.map((item) => {
					const productObject = item.product.toObject(); // Convert the Mongoose document to a plain object
					productObject.qty = item.quantity; // Add the qty property
					return productObject;
				});
			}

			// send this details back to the frontend
			res.status(200).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				cart: checkCart.length > 0 ? { _id: checkCart[0]._id, cartItems } : {},
				isAdmin: user.isAdmin,
			});
		} else {
			// throw an error
			throw new Error("Invalid email or password");
		}
	} catch (error) {
		// if an error occured in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

// -------------------------------- function to log a user out ------------------------------ //
const logUserOut = asyncHandler(async (req, res) => {
	// check if the user is authorized
	const userExist = await User.findById(req.user._id);

	// if the user does not exist, then
	if (!userExist) {
		throw new Error("User not authorized");
	}

	// if the user is authorized, then
	// make a try-catch block
	try {
		// get the cart currenty in the local storage
		const localCart = req.body.cartItems;

		// get the current user's cart from te DB
		const dbCart = await Cart.findOne({ user: req.user._id });

		// check if any of the items in the cart are different
		const cartDiffer = !isEqual(localCart, dbCart);

		// if the cart are different, then:
		if (cartDiffer) {
			let newCart = [];
			// update the cart in the DB
			// Iterate through localCart array
			for (const cartItem of localCart) {
				const { _id, qty } = cartItem;

				// Update or insert the item in the database
				let cart = await Cart.findOneAndUpdate(
					{ user: req.user._id, "items.product": _id },
					{
						$set: { "items.$.quantity": qty }, // Set the quantity if the product exists
					},
					{ new: true }
				);
				newCart.push(cart);
			}
			// if the cart was updated then
			if (newCart) {
				// proceed to log user out
				// clear the cookie "jwt"
				res.cookie("jwt", "", {
					httpOnly: true,
					expires: new Date(0),
				});
				// send a message  to the frontend
				res
					.status(200)
					.json({ cart: newCart, message: "User logged out successfully" });
			}
		} else {
			// proceed to log user out
			// clear the cookie "jwt"
			res.cookie("jwt", "", {
				httpOnly: true,
				expires: new Date(0),
			});
			// send a message  to the frontend
			res.status(200).json({ message: "User logged out successfully" });
		}
	} catch (error) {
		// if an error occured in the try block, then:
		res.status(400);
		throw new Error(error.message);
	}
});

export { registerUser, authUser, logUserOut };
