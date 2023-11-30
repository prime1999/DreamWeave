import User from "../models/UserModel.js";
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
			// send this details back to the frontend
			res.status(200).json({
				_id: user._id,
				name: user.name,
				email: user.email,
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
	// clear the cookie "jwt"
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0),
	});
	// send a message  to the frontend
	res.status(200).json({ message: "User logged out successfully" });
});

export { registerUser, authUser, logUserOut };
